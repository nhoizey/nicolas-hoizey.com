---
date: 2023-04-14 22:13:21 +02:00
tags: [WebPerf, TTFB, Netlify, Cloudflare]
---

I still don't understand why using Cloudflare in front of Netlify allows for a much better and stable Time To First Byte (TTFB) than Cloudflare Pages or Netlify alone… 🤷‍♂️

![SpeedCurve graph with Time To First Byte for the 3 hosting solutions](SpeedCurve-TTFB-Netlify-Cloudflare.png){.twothirds}

TTFB for static sites should always be very low.