---
date: 2022-07-19 18:00:49 +02:00
tags: [CSS, viewport, 100vh]
---

💡 CSS idea of the day:

```css
:root {
  --full-height: 100vh;
}

@supports(height: 100dvh) {
  :root {
    --full-height: 100dvh;
  }
}
```

Clever? Stupid? Old?
