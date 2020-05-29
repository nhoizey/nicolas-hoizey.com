---
title: "Identify which Apache rewrite rules are used"
lang:  en
tags:  [Apache, shell]
---

I have many rewrite rules in my Apache configuration for redirections, some dating from more than 15 years ago. So I wanted to know which ones are really useful, because there's maybe some cleaning to do. I'll explain here how I got the list.

# Get some logs

First, I had to tell [Apache's `mod_rewrite` module](https://httpd.apache.org/docs/2.4/en/mod/mod_rewrite.html)[^mod_alias] to log more information than it usually does, but not too much either.

[^mod_alias]: I use `mod_rewrite` for redirections because I need advanced URL manipulations [`mod_alias`](https://httpd.apache.org/docs/2.4/en/mod/mod_alias.html) doesn't allow.

Here's what I added to my Apache configuration[^htaccess] with the [LogLevel directive](https://httpd.apache.org/docs/2.4/en/mod/core.html#loglevel):

[^htaccess]: Unfortunately, this can not be set in an [`.htaccess` file](https://httpd.apache.org/docs/2.4/en/howto/htaccess.html) in your `DOCUMENT_ROOT`, so you have to be able to change your Apache configuration, like my hosting [AlwaysData](https://www.alwaysdata.com/en/) allows.

```apacheconf
LogLevel warn rewrite:trace2
```

`warn` is Apache's default log level, and `trace2` is much more verbose, so I add it only for the `rewrite` module.

# Filter the logs for useful informations

The logs I get with this are really verbose, and contain messages from Apache and all the active modules.

Here is just a small extract for **one single request** to `articles/2018/06/users-do-change-font-size/`.

This is an old URL format where I didn't put the day as I do now, so there's a redirection:

```
[Thu May 28 23:28:29.299495 2020] [rewrite:trace2] [pid 1241533:tid 140624745461504] mod_rewrite.c(483): [client 92.169.204.166:0] 92.169.204.166 - - [nicolas-hoizey.com/sid#7fe7132989d8][rid#7fe7104af0a0/initial] [perdir /home/nhoizey/www/nicolas-hoizey.com/www/] rewrite 'articles/2018/06/users-do-change-font-size/' -> 'https://nicolas-hoizey.com/articles/2018/06/15/users-do-change-font-size/'
[Thu May 28 23:28:29.299518 2020] [rewrite:trace2] [pid 1241533:tid 140624745461504] mod_rewrite.c(483): [client 92.169.204.166:0] 92.169.204.166 - - [nicolas-hoizey.com/sid#7fe7132989d8][rid#7fe7104af0a0/initial] [perdir /home/nhoizey/www/nicolas-hoizey.com/www/] explicitly forcing redirect with https://nicolas-hoizey.com/articles/2018/06/15/users-do-change-font-size/
[Thu May 28 23:28:29.299528 2020] [rewrite:trace2] [pid 1241533:tid 140624745461504] mod_rewrite.c(483): [client 92.169.204.166:0] 92.169.204.166 - - [nicolas-hoizey.com/sid#7fe7132989d8][rid#7fe7104af0a0/initial] [perdir /home/nhoizey/www/nicolas-hoizey.com/www/] trying to replace prefix /home/nhoizey/www/nicolas-hoizey.com/www/ with /
[Thu May 28 23:28:29.299531 2020] [rewrite:trace1] [pid 1241533:tid 140624745461504] mod_rewrite.c(483): [client 92.169.204.166:0] 92.169.204.166 - - [nicolas-hoizey.com/sid#7fe7132989d8][rid#7fe7104af0a0/initial] [perdir /home/nhoizey/www/nicolas-hoizey.com/www/] escaping https://nicolas-hoizey.com/articles/2018/06/15/users-do-change-font-size/ for redirect
[Thu May 28 23:28:29.299534 2020] [rewrite:trace1] [pid 1241533:tid 140624745461504] mod_rewrite.c(483): [client 92.169.204.166:0] 92.169.204.166 - - [nicolas-hoizey.com/sid#7fe7132989d8][rid#7fe7104af0a0/initial] [perdir /home/nhoizey/www/nicolas-hoizey.com/www/] redirect to https://nicolas-hoizey.com/articles/2018/06/15/users-do-change-font-size/ [REDIRECT/301]
[Thu May 28 23:28:29.327806 2020] [rewrite:trace1] [pid 1241533:tid 140624871286528] mod_rewrite.c(483): [client 92.169.204.166:0] 92.169.204.166 - - [nicolas-hoizey.com/sid#7fe7132989d8][rid#7fe7100390a0/initial] [perdir /home/nhoizey/www/nicolas-hoizey.com/www/] pass through /home/nhoizey/www/nicolas-hoizey.com/www/articles/2018/06/15/users-do-change-font-size/
[Thu May 28 23:28:29.327852 2020] [rewrite:trace1] [pid 1241533:tid 140624871286528] mod_rewrite.c(483): [client 92.169.204.166:0] 92.169.204.166 - - [nicolas-hoizey.com/sid#7fe7132989d8][rid#7fe6e47970a0/subreq] [perdir /home/nhoizey/www/nicolas-hoizey.com/www/] pass through /home/nhoizey/www/nicolas-hoizey.com/www/articles/2018/06/15/users-do-change-font-size/index.php
[Thu May 28 23:28:29.327872 2020] [rewrite:trace1] [pid 1241533:tid 140624871286528] mod_rewrite.c(483): [client 92.169.204.166:0] 92.169.204.166 - - [nicolas-hoizey.com/sid#7fe7132989d8][rid#7fe6e479d0a0/subreq] [perdir /home/nhoizey/www/nicolas-hoizey.com/www/] pass through /home/nhoizey/www/nicolas-hoizey.com/www/articles/2018/06/15/users-do-change-font-size/index.html
```

The log file contains many lines like this, for all requests, on multiple domains sharing the same host. I had **more than 4000 log lines per day**, even before adding the detailed logs for the `rewrite` module, so it's impossible to navigate in these to get the information.

Only the first of the eight lines above is useful to identify the redirection.

So I chose to use simple shell tools[^tools] to filter the raw data and get only the useful lines.

[^tools]: I'm sure there are better tools, more powerful, but these ones allowed me to get the result I wanted.

```bash
cat apache.log | grep 'nicolas-hoizey.com' | grep "] rewrite '"
```

`cat` prints the content of the log file on the standard output, and then `grep` filters lines containing three strings:

- `nicolas-hoizey.com` to get only logs for my domain[^domain]
- `] rewrite '` to make sure I get the rewrite instruction, not the others (`explicitly forcing redirect`, `trying to replace prefix`, `escaping`, etc.)

[^domain]: you might have a log file dedicated to one single domain, which would be easier to parse.

So with that, I get all lines for redirections, great first step.

But the useful data is "hidden" at the end of the line, after many things that can probably be useful sometimes, but not for my current use case.

# Extract the useful value from the remaining logs

Here is the full line broken into pieces (I won't explain it, just split the parts):

- `[Thu May 28 23:28:29.299495 2020]`
- `[rewrite:trace2]`
- `[pid 1241533:tid 140624745461504]`
- `mod_rewrite.c(483):`
- `[client 92.169.204.166:0]`
- `92.169.204.166`
- ` - - `
- `[nicolas-hoizey.com/sid#7fe7132989d8]`
- `[rid#7fe7104af0a0/initial]`
- `[perdir /home/nhoizey/www/nicolas-hoizey.com/www/]`
- `rewrite 'articles/2018/06/users-do-change-font-size/' -> 'https://nicolas-hoizey.com/articles/2018/06/15/users-do-change-font-size/'`

The only useful part is the last one. I can remove everything before.

I chose to use `sed`[^awk] to replace everything from the beginning of the line to the `] rewrite ` string:

[^awk]: I know `awk` is more powerful, but I always forget the syntax, so `sed` is fine. KISS.

```bash
cat apache.log | grep 'nicolas-hoizey.com' | grep "] rewrite '" | sed 's/^.*\] rewrite //'
```

I then chose to get the list as a CSV file, so I also replaced the arrow in the middle (` -> `) with a semi-colon, and I removed the domain from the second part to ease reading it:

```bash
cat apache.log | grep 'nicolas-hoizey.com' | grep "] rewrite '" | sed 's/^.*\] rewrite //' | sed 's/ -> /;/' | sed 's/https:\/\/nicolas-hoizey.com\///'
```

Here's what I now get:

```
'articles/2018/06/users-do-change-font-size/';'articles/2018/06/15/users-do-change-font-size/'
```

But with logs for multiple days, I get some identical redirections many times, so I chose to sort them and keep only one of each:

```bash
cat apache.log | grep 'nicolas-hoizey.com' | grep "] rewrite '" | sed 's/^.*\] rewrite //' | sed 's/ -> /;/' | sed 's/https:\/\/nicolas-hoizey.com\///' | sort -u
```

Finally, I chose to put all this in a file for later use:

```bash
cat apache.log | grep 'nicolas-hoizey.com' | grep "] rewrite '" | sed 's/^.*\] rewrite //' | sed 's/ -> /;/' | sed 's/https:\/\/nicolas-hoizey.com\///' | sort -u > ~/rewrites.csv
```

I can now run this script, open the `.csv` file in a spreadsheet, and see which of my redirections are still useful.

After less than one single day with the log directive, I already have **181 different redirections** performed. I will wait for a few days, and I'll have to understand which ones are legitimate, and which others I can safely remove.

For some of these redirections, the log also contains the referer, so I might be able to fix the URL at the source, like [I just did in the IndieWeb wiki](https://indieweb.org/wiki/index.php?title=Webmention&type=revision&diff=70110&oldid=69713).
