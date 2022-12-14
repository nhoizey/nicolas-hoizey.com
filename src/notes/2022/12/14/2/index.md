---
date: 2022-12-14 13:56:37 +01:00
tags: [JavaScript]
---

I needed a JavaScript way to verify if two arrays contain the same (all different) values.

I then found a better solution for my use case, but it might be useful later, so here it is:

```javascript
const sameValues = (array1, array2) =>
  array1.length === array2.length &&
  array1.every((element) => array2.includes(element));
```
