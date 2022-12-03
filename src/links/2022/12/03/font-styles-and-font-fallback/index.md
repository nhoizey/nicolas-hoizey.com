---
date: 2022-12-03 21:29:04 +00:00
title: "Font styles & font fallback"
lang: en
link: https://www.w3.org/International/articles/typography/fontstyles.en.html
authors:
  - "Richard Ishida"
tags: [language, font]
---

This is a great page on the W3C site showing multiple languages requiring different font styles and fallback.

Not everybody has to know all of this, but I think everyone should be aware of this variety that exists in languages and characters.

An example:

> The Kano font style is a common way of writing Hausa, especially in Northern Nigeria, in the ajami script, and like other West African writing it is based on Warsh (Warš) forms, which incorporate Maghribi (North African) characteristics. Text written in the Kano style will include glyphs for a number of African characters that may not be available in the average naskh font.
>
> <mark>Falling back to an arbitrary font will remove the identity of the content, and is likely to cause rendering failures for African characters</mark>.

Managing languages with characters different from latin is not easy, as most of the tools we use are made by and for west european and north american users/developers.

Something conceptualy simple — like computing a slug from a word — can be really difficult with some languages. I learned that when I wanted to use local names in content and tags on [my photography site](https://nicolas-hoizey.com).

Here's კავკასია for example, in Georgian, for which the latin slug is "kavkasia": https://nicolas-hoizey.photo/tags/kavkasia/

But I couldn't find a latin slug for ⴰⵟⵍⴰⵙ ⴰⵎⵥⵢⴰⵏ, which means Anti-Atlas (the moutains chain in North Africa) in Berber language: https://nicolas-hoizey.photo/tags/%E2%B4%B0%E2%B5%9F%E2%B5%8D%E2%B4%B0%E2%B5%99-%E2%B4%B0%E2%B5%8E%E2%B5%A5%E2%B5%A2%E2%B4%B0%E2%B5%8F/

I even wonder if using latin character slugs for other languages is a good idea…
