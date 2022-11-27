---
date: 2020-03-09 12:14:54 +02:00
title: "N26 and lack of JavaScript"
lang: en
link: https://kittygiraudel.com/2020/01/20/n26-and-lack-of-javascript/
authors:
  - "Kitty Giraudel"
tags: [JavaScript, React, progressive enhancement, User-Agent]
---

Great article where Kitty shows how React helps providing N26 clients the features they're looking for even if they unfortunately have JavaScript issues.

I like how Kitty reminds us that JavaScript is not a given, it can be missing for many reasons:

> JavaScript is fickle. It can fail to load. It can be disabled. It can be blocked. It can fail to run. It probably is fine most of the time, but when it fails, everything tends to go bad. And having such a hard point of failure is not ideal.

All other online services should follow N26's lead. Many don't.

I also like how Kitty shows evidence that **using the browser's User-Agent string to decide what to send to the browser is dangerous**:

> we realized we had an impressively high amount of errors coming from Internet Explorer 11, despite using Polyfill.io to provide unsupported features

[Polyfill.io](https://polyfill.io/) is a clever service built by The Financial Times that "makes it simpler to support differing browsers by **attempting** to recreate the missing features with polyfills". "Attempting" is key.

Also:

> we use ua-parser-js to <mark>(hopefully)</mark> detect the browser

Unfortunately, too many sites/apps rely on the User-Agent string to decide what to do with the request, as [Šime Vidas' experiment with an empty User-Agent string shows](https://twitter.com/simevidas/status/1233490500520468480). 😥

That's a good reason to remove (or at least simplify) the User-Agent from browsers, as Safari tried earlier, and [Chrome intends to do](/links/2020/01/14/intent-to-deprecate-and-freeze-the-user-agent-string/).
