---
date: 2020-01-14 16:32:48 +02:00
title: "Intent to Deprecate and Freeze: The User-Agent string"
lang: en
link: https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/-2JIRNMWJ7s/yHe4tQNLCgAJ
authors:
  - "Yoav Weiss"
tags: [Web,privacy,User-Agent]
---

User-Agent sniffing, used for example to (try to) perform dynamic serving instead of true responsive web design, has always been a really bad practice, for different reasons:

> The User-Agent string is an abundant source of passive <mark>fingerprinting information about our users</mark>. It contains many details about the user’s browser and device as well as many lies ("Mozilla/5.0", anyone?) that were or are needed for compatibility purposes, as servers grew reliant on bad User-Agent sniffing.
>
> On top of those privacy issues, User-Agent sniffing is an <mark>abundant source of compatibility issues</mark>, in particular for minority browsers, resulting in browsers lying about themselves (generally or to specific sites), and sites (including Google properties) being broken in some browsers for no good reason.

(Did you see this *"including Google properties"*? 😉)

Evolution of this intent can be tracked in [Chrome Platform Status](https://www.chromestatus.com/feature/5704553745874944).
