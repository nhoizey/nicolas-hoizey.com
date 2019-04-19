---
title: "How the Boeing 737 Max Disaster Looks to a Software Developer"
lang:  en
tags:  [KISS]
---

Experienced plane pilot and software developer [Gregory Travis](https://twitter.com/greg_travis) explains in details what led to [Boeing 737 Max](https://en.wikipedia.org/wiki/Boeing_737_MAX) recent disasters in this long article: [How the Boeing 737 Max Disaster Looks to a Software Developer](https://spectrum.ieee.org/aerospace/aviation/how-the-boeing-737-max-disaster-looks-to-a-software-developer).

**My family and I were in one of these Ethiopian Airlines' Boeing 737 Max** just two weeks before [the crash of flight 302](https://en.wikipedia.org/wiki/Ethiopian_Airlines_Flight_302), on the same flight from Addis Ababa to Nairobi! The one that crashed was registered [ET-AVJ](https://aviation-safety.net/database/record.php?id=20190310-0). The one we took was registered ET-AVI[^flightradar]. Very close. I guess both <del>have</del> had the very same hardware and software. It gives me chills every time I think about it.

[^flightradar]: Thanks [myFlightradar24](https://my.flightradar24.com/nhoizey) for the information…

I don't know much about planes, but this article explains everything very well. **You should read it all**, but here are some quotes (emphases are mine):

> In the 737 Max, the engine nacelles themselves can, at high angles of attack, work as a wing and produce lift. And the lift they produce is well ahead of the wing’s center of lift, meaning the nacelles will cause the 737 Max at a high angle of attack to go to a *higher* angle of attack. This is **aerodynamic malpractice of the worst kind**.

> The airframe, the hardware, should **get it right the first time and not need a lot of added bells and whistles to fly predictably**. This has been [an aviation canon](https://en.wikipedia.org/wiki/KISS_principle) from the day the Wright brothers first flew at Kitty Hawk.

{% cloudinary onefourth HAL9000.png alt="“2001, A Space Odyssey”'s HAL9000 rogue computer" %}

> the flight management computer can put a *lot* of force into that [pilot’s control] column—indeed, so much force that a human pilot can quickly become exhausted trying to pull the column back, **trying to tell the computer that this really, really should not be happening**.

> Those lines of code were no doubt created by people at the direction of managers. **Neither such coders nor their managers are as in touch with the particular culture and mores of the aviation world as much as the people who are down on the factory floor**, riveting wings on, designing control yokes, and fitting landing gears.

> Like someone with narcissistic personality disorder, MCAS (Maneuvering Characteristics Augmentation System) gaslights the pilots. And **it turns out badly for everyone**. “Raise the nose, HAL.” “I’m sorry, Dave, I’m afraid I can’t do that.”

> I believe the relative ease—not to mention the lack of tangible cost—of software updates has created **a cultural laziness within the software engineering community**. Moreover, because more and more of the hardware that we create is monitored and controlled by software, that cultural laziness is now creeping into hardware engineering—like building airliners. **Less thought is now given to getting a design correct and simple up front because it’s so easy to fix what you didn’t get right later**.

**This is infuriating!** These people gamble with human lives.

Let's try to learn from our mistakes and get some good advice out of it…

I always talk about the [KISS principle](https://en.wikipedia.org/wiki/KISS_principle) when I teach software architecture and development, I will add this quote to my slides:

> Every increment, every increase in complexity, ultimately leads to decreasing rates of return and, finally, to negative returns. Trying to patch and then repatch such a system in an attempt to make it safer can end up making it less safe.

Here are a few other interesting quotes on this KISS topic:

[Tony Hoare](https://en.wikipedia.org/wiki/Tony_Hoare), the British computer scientist who developed quicksort, the sorting algorithm every developer learns sooner or later, [said](https://en.wikiquote.org/wiki/C._A._R._Hoare#The_Emperor's_Old_Clothes):

> There are two ways of constructing a software design: One way is to make it so simple that there are obviously no deficiencies, and the other way is to make it so complicated that there are no obvious deficiencies. The first method is far more difficult.

[Ray Ozzie](https://en.wikipedia.org/wiki/Ray_Ozzie), once CTO of Microsoft, and previously creator of Lotus Notes[^lotusnotes], [said](https://www.azquotes.com/quote/585933):

> **Complexity kills.** It sucks the life out of developers, it makes products difficult to plan, build and test, **it introduces security challenges**, and it causes end-user and administrator frustration.

[^lotusnotes]: Ahem… maybe not a good idea to keep it visible in his resume…
