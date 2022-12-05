---
date: 2022-12-05 17:31:06 +01:00
tags: [regex]
---

I always forget how to extract the content of matching HTML tags with a REGEX, so here it is:

```javascript
content.match(/<pre>(((?!<\/pre>).)*)<\/pre>/gs)
```

It uses [negative lookahead](https://javascript.info/regexp-lookahead-lookbehind#negative-lookahead).

(I know I should use the DOM API instead… 🤷‍♂️)
