---
date: 2024-10-07 20:18:42 +00:00
title: "Building a Single-Page App with htmx"
lang: en
link: https://jakelazaroff.com/words/building-a-single-page-app-with-htmx/
authors:
  - "Jake Lazaroff"
tags: [Service Worker, htmx]
---

> It’s a simple proof of concept todo list. Once the page is loaded, there is *no additional communication with a server*. Everything happens locally on the client.
> 
> How does that work, given that htmx is focused on managing hypermedia exchanges over the network?
> 
> With one simple trick: the “server-side” code runs in a service worker.
