---
date: 2020-03-29 14:43:12 +02:00
---

I guess (without proof) #Eleventy builds including assets bundling/minifying could be accelerated with memoization.

Did this for the slugify filter (I use @sindresorhus's one instead of the default) called multiple times with the same string:
https://github.com/nhoizey/nicolas-hoizey.com/blob/master/src/_utils/slugify.js
