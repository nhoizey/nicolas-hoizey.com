---
date: 2020-03-06 12:13:01 +02:00
title: "Updating npm packages versions in package.json"
lang:  en
tags:  [Node, npm]
---

I chose to use [`npm-check-updates`](https://github.com/tjunnone/npm-check-updates) to check for available updates of packages in my `package.json` files, and it always works without issues, so I guess I can recommend it.

I'm also using this as a reminder for my own use… 😁

Here are the steps:

# Install `npm-check-updates`

`npm-check-updates` is a `npm` package:

```bash
npm install -g npm-check-updates
```

# Check for available updates

Run `ncu` (as in **n**pm-**c**heck-**u**pdate) to list updatable packages:

```bash
ncu
```

# Automate update for all packages

If everything looks fine, update all package versions in your `package.json` file at once:

```bash
ncu -u
```

If you have doubts about at least one of the package versions, update your `package.json` file manually to test the results progressively.

# Don't forget to actually update the installed packages

`npm-check-updates` "only" updates the version numbers in your `package.json` file.

You now have to really install them.

Make sure current version of your `package-lock.json` file [is versioned](https://stackoverflow.com/a/44210813/717195) (for any rollback need), then run:

```bash
npm install
```

# What about `salita`?

There is also [`salita`](https://github.com/tbranyen/salita), which has [a few differences](https://github.com/tjunnone/npm-check-updates/wiki/npm-check-updates-vs-salita).

I prefer `npm-check-update` because its default behavior prevents accidental modification of the `package.json` file.
