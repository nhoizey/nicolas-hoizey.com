---
date: 2019-07-26 08:50:48 +02:00
title: "Improving the Speed and Accuracy of the Item Page with Light Service"
lang: en
link: https://www.ebayinc.com/stories/blogs/tech/item-fast-light-service/
authors:
  - name: "Ramesh Periyathambi"
    twitter: "ebaytech"
    site: "https://www.ebayinc.com/stories/blogs/tech/"
tags: [WebPerf]
---

Ramesh Periyathambi explains why eBay developed a dedicated "light" service to get critical informations about products, to speed up presentation of accurate content to buyers, and why it was worth the additional effort.

> One of the top engineering efforts in eBay is to improve the site speed of critical page flows to provide a better user experience. The item page is one of the critical pages in the buyer experience. We explored multiple ways of improving site speed for the item page using this light service.

One of the key way to get these critical informations as fast as possible (less than 10ms !) is to get it directly "from the primary source tables", "using a highly tuned SQL".

We use to say the easiest performance gains are on the front/network side, but when you're already really fast like eBay, some optimizations require getting back to the backend.
