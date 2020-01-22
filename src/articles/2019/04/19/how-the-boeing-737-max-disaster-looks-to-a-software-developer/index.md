---
title: "How the Boeing 737 Max Disaster Looks to a Software Developer"
date: 2019-04-19 12:00:00 +02:00
lang:  en
tags:  [KISS]
---

Experienced plane pilot and software developer [Gregory Travis](https://twitter.com/greg_travis) explains in details what led to [Boeing 737 Max](https://en.wikipedia.org/wiki/Boeing_737_MAX) recent disasters in this long article: [How the Boeing 737 Max Disaster Looks to a Software Developer](https://spectrum.ieee.org/aerospace/aviation/how-the-boeing-737-max-disaster-looks-to-a-software-developer).

# Why do I even care?

**My family and I were in one of these** Ethiopian Airlines' Boeing 737 Max just two weeks before [the crash of flight 302](https://en.wikipedia.org/wiki/Ethiopian_Airlines_Flight_302), on the same flight from Addis Ababa to Nairobi!

The one that crashed was registered [ET-AVJ](https://aviation-safety.net/database/record.php?id=20190310-0). The one we took was registered ET-AVI[^flightradar]. Very close. I guess both <del>have</del> had the very same hardware and software.

[^flightradar]: Thanks [myFlightradar24](https://my.flightradar24.com/nhoizey) for the information…

It gives me chills every time I think about it.

# So, what is it about?

I don't know much about planes, but this article explains everything very well. **You should read it all**, but here are some quotes (emphases are mine):

> In the 737 Max, the engine nacelles themselves can, at high angles of attack, work as a wing and produce lift. And the lift they produce is well ahead of the wing’s center of lift, meaning the nacelles will cause the 737 Max at a high angle of attack to go to a *higher* angle of attack. This is **aerodynamic malpractice of the worst kind**.

> The airframe, the hardware, should **get it right the first time and not need a lot of added bells and whistles to fly predictably**. This has been [an aviation canon](https://en.wikipedia.org/wiki/KISS_principle) from the day the Wright brothers first flew at Kitty Hawk.

> the flight management computer can put a *lot* of force into that [pilot’s control] column—indeed, so much force that a human pilot can quickly become exhausted trying to pull the column back, **trying to tell the computer that this really, really should not be happening**.

> Those lines of code were no doubt created by people at the direction of managers. **Neither such coders nor their managers are as in touch with the particular culture and mores of the aviation world as much as the people who are down on the factory floor**, riveting wings on, designing control yokes, and fitting landing gears.

![](HAL9000.png "“2001, A Space Odyssey”'s HAL9000 rogue computer"){.onefourth }

> Like someone with narcissistic personality disorder, MCAS (Maneuvering Characteristics Augmentation System) gaslights the pilots. And **it turns out badly for everyone**. “Raise the nose, HAL.” “I’m sorry, Dave, I’m afraid I can’t do that.”

> I believe the relative ease—not to mention the lack of tangible cost—of software updates has created **a cultural laziness within the software engineering community**. Moreover, because more and more of the hardware that we create is monitored and controlled by software, that cultural laziness is now creeping into hardware engineering—like building airliners. **Less thought is now given to getting a design correct and simple up front because it’s so easy to fix what you didn’t get right later**.

**This is infuriating!** These people gamble with human lives.

Let's try at least to learn from our mistakes and get some good advice out of it…

# So, why do I really care?

Apart from the fact that my family and I might have been in this crashed plane, I also care because I know there are similar issues everywhere in the industry, including software development.

This is not fate, this is a consequence of a chain of bad decisions (or lack of). Considering the number of people involved, it should never have happened. But there is (a lot of) money involved. And lazyness.

We often say, at least in software development, that laziness is a virtue. I believe it's not.

Improving our processes, automating repetitive tasks, is beneficial for the quality of what we produce. It lowers the hassle caused by some of our tasks, which laziness would make us “forget” sooner or later. So laziness is not the virtue that makes us improve this, it's the vice we have to fight.

The real virtue is in the efforts produced to compensate this lazyness.

# Keep It Simple, Stupid

The amount of efforts required depends on the complexity of what we want to achieve, and how we plan to achieve it. If we plan for something really complicated, and imagine convoluted solutions to achieve it, we get exponential complexity.

I always talk about the [KISS principle](https://en.wikipedia.org/wiki/KISS_principle) when I teach software architecture and development. Several times a day.

I will definitely add a quote from Gregory Travis' article in my slides:

> Every increment, every increase in complexity, ultimately leads to decreasing rates of return and, finally, to negative returns. Trying to patch and then repatch such a system in an attempt to make it safer can end up making it less safe.

Similarly, [Ray Ozzie](https://en.wikipedia.org/wiki/Ray_Ozzie), once CTO of Microsoft, and previously creator of Lotus Notes[^lotusnotes], [once said](https://www.azquotes.com/quote/585933):

> **Complexity kills.** It sucks the life out of developers, it makes products difficult to plan, build and test, **it introduces security challenges**, and it causes end-user and administrator frustration.

[^lotusnotes]: Well… maybe not a good idea to keep it in his resume…

[Tony Hoare](https://en.wikipedia.org/wiki/Tony_Hoare), the British computer scientist who developed quicksort, the sorting algorithm every developer learns sooner or later, also [said](https://en.wikiquote.org/wiki/C._A._R._Hoare#The_Emperor's_Old_Clothes):

> There are two ways of constructing a software design: One way is to make it so simple that there are obviously no deficiencies, and the other way is to make it so complicated that there are no obvious deficiencies. The first method is far more difficult.

We need to make things simple so that our lazyness has less opportunities to lead us to make mistakes.

# Updates

- February 21st 2019, a reader [comments a French article about Transavia potentialy buying 100 Boeing 737 MAX](https://www.air-journal.fr/2019-02-21-transavia-une-annee-record-des-737-max-a-lhorizon-5210570.html#comment-413823):
  > This all 737 policy is not very good at all. The competitive process is always preferable. Imagine if this aircraft is grounded for one reason or another, it's a disaster for TO and others…
- May 5th, 2019: [Boeing Knew About Safety-Alert Problem for a Year Before Telling FAA, Airlines](https://www.wsj.com/articles/boeing-knew-about-safety-alert-problem-for-a-year-before-telling-faa-airlines-11557087129) (Wall Street Journal)
- June 28th, 2019: [Boeing’s 737 Max Software Outsourced to $9-an-Hour Engineers](https://www.bloomberg.com/news/articles/2019-06-28/boeing-s-737-max-software-outsourced-to-9-an-hour-engineers) (Bloomberg)
- October 18th, 2019: [Boeing lead pilot warned about flight-control system tied to 737 Max crashes, then told regulators to delete it from manuals](https://www.cnbc.com/2019/10/18/boeing-shares-slide-on-report-faa-is-concerned-it-was-misled-about-737-max.html) (CNBC)
- December 11th, 2019: [US regulator failed to ground Boeing 737 Max despite risks](https://www.ft.com/content/04f6f45e-1c2c-11ea-97df-cc63de1d73f4) (Financial Times)
- January 10th, 2020: [‘Designed by Clowns and Supervised by Monkeys’: The 737 Max Story](https://www.bloomberg.com/opinion/articles/2020-01-10/-designed-by-clowns-and-supervised-by-monkeys-the-737-max-story) (Bloomberg)
- January 14th, 2020: [Boeing Mocked Lion Air Calls for More 737 Max Training Before Crash](https://www.bloomberg.com/news/articles/2020-01-14/lion-air-idiots-sought-more-max-training-boeing-thwarted-it) (Bloomberg)
- January 20th, 2020: [How Boeing’s Responsibility in a Deadly Crash ‘Got Buried’](https://www.nytimes.com/2020/01/20/business/boeing-737-accidents.html) (The New York Times)
