---
date: 2021-03-08 17:25:32 +02:00
title: "Semantic Versioning Will Not Save You"
lang: en
link: https://hynek.me/articles/semver-will-not-save-you/
authors:
  - "Hynek Schlawack"
tags: [development]
---

As a maintainer of [several open source projects](https://github.com/nhoizey) (both in Ruby and JavaScript), I agree with everything Hynek says about the difficulty for a maintainer to define versions and give a hint about potential compatibility issues.

> even *if* the maintainer is pure of heart, extremely diligent, and super conservative with what constitutes a breaking change, it is **impossible to predict the ways a change can affect your users**.

I still find [semver](https://semver.org/) better than [calver](https://calver.org/), both as a maintainer and a user, and as Hynek says:

> If you’re a **maintainer** and you *like SemVer* as an extra service to your users: go wild! I’m not here to tell you how to spend your time. <mark>There *is* value to adding semantic meaning to versions</mark>.
