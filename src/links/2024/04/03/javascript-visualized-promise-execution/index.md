---
date: 2024-04-03 11:44:56 +00:00
title: "JavaScript Visualized - Promise Execution"
lang: en
link: https://www.lydiahallie.com/blog/promise-execution
authors:
  - "Lydia Hallie"
tags: [JavaScript]
---

> The cool thing about Promises is that this can trigger an asynchronous action if a handler is attached by either `then` or `catch`. Since the handlers are pushed to the **Microtask Queue**, <mark>you can handle the eventual result in a non-blocking way</mark>. This makes it easier to handle errors, chain multiple operations together, and keep your code more readable and maintainable!
