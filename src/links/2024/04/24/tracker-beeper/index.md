---
date: 2024-04-24 12:30:37 +00:00
title: "Tracker Beeper"
lang: en
link: https://berthub.eu/articles/posts/tracker-beeper/
authors:
  - "Bert Hubert"
tags: [privacy, Google]
---

> A week ago, I finally got round to implementing an idea I’d been toying with for years: <mark>what if your computer made a little bit of noise every time it sent data to Google?</mark>

I installed it on my Mac with  instructions from [the GitHub page of the project](https://github.com/berthubert/googerteller?tab=readme-ov-file#readme):

```shell
brew tap robertjakub/teller
brew install --HEAD googerteller
```

Then ran it:

```shell
sudo tcpdump -nql | teller
```

This is mind blowing. Not in a good way.
