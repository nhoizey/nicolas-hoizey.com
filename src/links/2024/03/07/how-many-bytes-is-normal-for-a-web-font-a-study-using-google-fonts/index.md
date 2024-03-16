---
date: 2024-03-07 11:46:59 +00:00
title: "How many bytes is “normal” for a web font: a study using Google fonts"
lang: en
link: https://www.phpied.com/bytes-normal-web-font-study-google-fonts/
authors:
  - "Stoyan Stefanov"
tags: [font, WebPerf]
---

> So here it is, folks, a web font file that supports extended Latin characters, your Às and your Ás and Â, Ã, Ä, Å... should weigh around 20K. Anything a little over (or a lot over) 20K is up to you to decide. Is the font worth it, can it be subset, etc, etc.

Here's the subset I used for some French sites I worked on, where there is no user-generated content (really safe with 276 characters):

```
 !"#$%&'()+,-./+,-./0123456789:;<=>?:;<=>?@ABCDEFGHIJKLMNOJKLMNOPQRSTUVWXYZ[\]^Z[\]^`abcdefghijklmnojklmnopqrstuvwxyz{|}~z{|}~€‚…ˆ‹Œ‘’“”•–—˜™›œ£¨©«®´»ÀÂÆÇÈÉÊËÎÏÔÙÛÜàâæçèéêëîïôùûüÿ £¨©«®¯°±²³´µ·¹º»¼½¾ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖ×ÙÚÛÜÝàáâãäåæçèéêëìíîïñòóôõö÷ùúûüýÿŒœŸˆ˚˜–—‘’‚“”„•…‹›€™
```

Here's the larger subset (375 characters) I currently use on [my photography site](https://nicolas-hoizey.photo), where I have many characters from non latin languages ([Arabic](https://nicolas-hoizey.photo/tags/qsyr/), [Berber](https://nicolas-hoizey.photo/tags/%E2%B4%B0%E2%B5%9F%E2%B5%8D%E2%B4%B0%E2%B5%99-%E2%B5%8E%E2%B5%A5%E2%B5%89%E2%B5%A2%E2%B5%8F/), [Chinese](https://nicolas-hoizey.photo/tags/%E5%BC%B5%E4%BF%9D%E4%BB%94/), [Georgian](https://nicolas-hoizey.photo/tags/saqartvelo/), etc.), but still no user-generated content. The font weights 39 KB, and is updated regularly:

```
 !"#&'(),-./0123456789:;?aAbBcCdDeEfFgGhHIiJjkKlLmMnNoOPpqQRrsStTuUvVWwxXyYzZÂ Â°Ã—Ã€Ã Ã¡Ã¢Ã¤Ã…Ã¥Ã§Ã¨Ã©Ã‰ÃªÃ«Ã­ÃŽÃ®Ã¯Ã±Ã³Ã´Ã–ÃºÃ»ÄÄ«Å“Å¡Æ’Ê¿Î¬Î‰Î®Î±Î²Î“Î´Î•ÎµÎ·ÎšÎ»Î¼Î¿ÏÏƒÏ„ÏØ£Ø§Ø¨ØªØ¯Ø±Ø³ØµØ·ØºÙ€Ù‚ÙƒÙ„Ù†Ù‡ÙˆÙŠÙŽÙÙ’áƒáƒ‘áƒ“áƒ”áƒ•áƒ—áƒ˜áƒ™áƒšáƒ›áƒœáƒáƒ áƒ¡áƒ¢áƒ£áƒ¥áƒ§áƒªáƒ¬áƒ®áƒ¯á¹­áº“â€Žâ€“â€™â€œâ€â€¦â´°â´³â´·âµ‰âµâµŽâµâµ”âµ™âµŸâµ¢âµ¥ä»”ä½›ä¿å‹•å£‡å¤§å¤©å¼µæ‹³æ³¢
```

*The subset doesn't render properly here, because some characters are not supported by the font used for this site.*