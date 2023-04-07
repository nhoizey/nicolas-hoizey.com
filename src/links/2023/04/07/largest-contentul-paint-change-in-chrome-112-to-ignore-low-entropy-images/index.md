---
date: 2023-04-07 13:06:04 +00:00
title: "Largest Contentul Paint change in Chrome 112 to ignore low-entropy images"
lang: en
link: https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/2023_04_lcp.md
tags: [LCP, Core Web Vitals]
---

> This may result in <mark>LCP times increasing</mark>, if a low-content background was being painted very early, or if a low-content placeholder was being used to reserve space for a more contenful image which loaded later.

Death letter to LQIP? 🙏
