---
title: Ce cas « JavaScript non disponible »
lang:  fr
tags:  [JavaScript,enrichissement progressif]
---

Cela fait déjà longtemps que je suis ébahi par ces soi-disant intégrateurs Web qui ne prennent pas la peine de s'assurer que leur production fonctionne bien[^chapo1] même si JavaScript n'est pas disponible.

![](codepo8.png)

C'est donc avec grand plaisir que j'ai lu le billet «[That “JavaScript not available” case](http://christianheilmann.com/2011/12/06/that-javascript-not-available-case/)» de Christian Heilmann, a.k.a. [codepo8](http://twitter.com/codepo8), orateur hors pair, ancien évangéliste Yahoo! et aujourd'hui Principal Developer Evangelist de [MDN|Mozilla Developer Network](https://developer.mozilla.org/fr/)[^chapo2].

Plutôt que paraphraser ce texte auquel j'adhère totalement, j'ai proposé de le traduire, pour le rendre accessible au plus grand nombre :

[^chapo1]: « bien » ne voulant pas forcément dire « à l'identique ».

[^chapo2]: Christian est allé jusqu'à formaliser sa pratique de *Developer Evangelist* dans l'excellent livre [Developer Evangelism](http://developer-evangelism.com/).

Au cours de discussions intéressantes hier sur Twitter, j'ai découvert qu'il y a aujourd'hui plus que jamais une confusion sur la dépendance vis à vis de JavaScript dans les applications et sites Web. C'est une histoire sans fin mais qui me semble flamber chaque fois que notre technologie de navigation fait un bon en avant.

J'ai rencontré cela pour la première fois du temps de [DHTML|Dynamic HTML]. Nous poussions nos navigateurs dans leurs limites avec nos charmants menus animés et logos en 3D (chose que nous avons bien sûr appris [à ne plus faire](https://www.google.com/search?q=path+menu+in+css&ie=utf-8&oe=utf-8&aq=t&rls=org.mozilla:en-US:official&client=firefox-a), hein ?) et nous étions grincheux quand on nous disait qu'il y a des environnements ailleurs où JavaScript n'est pas disponible.

## Qui désactive JavaScript ?

La première question que nous devons nous poser est quels sont ces environnements. Il y a plusieurs possibilités :

- Des mécanismes de sécurité comme [noscript](http://noscript.net/) ou des proxies d'entreprise qui filtrent le JavaScript
- Des *feature phones* comme les anciens Blackberries (je me souviens avoir changé pour Opera Mini sur le mien pour avoir une navigation un minimum supportable)
- Des environnements mobiles où les opérateurs utilisent des proxies sur les images et scripts, et les détériorent parfois
- Des utilisateurs qui ont une connexion limitée ou très lente
- Des utilisateurs qui désactivent JavaScript pour leurs raisons spécifiques
- Des utilisateurs qui en ont marre des fenêtres surgissantes et autres publicités agressives


	<p>As you can see some of them are done to our end users (proxying my companies or mobile provider), some are probably temporary (feature phones) and some are simply their own choice. So there is no way to say that only people who want to mess with our cool web stuff are affected.</p>

	<p/><h2>Why do they turn off JavaScript?</h2><p/>

	<p>As listed above, there are many reasons. When it comes to deliberately turning off JavaScript, I’d wager to guess that the main three are security concerns, advertising fatigue and slow connectivity.</p>

	<p>Security is actually very understandable. Almost every attack on a client machine happens using JavaScript (in most cases in conjunction with plugin vulnerabilities). Java of course is the biggest security hole at the moment but there is a lot of evil you can do with JavaScript via a vulnerable web site and unprotected or outdated browser and OS.</p>

	<p>Slow connectivity is a very interesting one. Quite ironic – if you think about it – as most of what we use JavaScript for is to speed up the experience of our end users. One of the first use cases for JS was client side validation of forms to avoid unnecessary server roundtrips.</p>

	<p>Now when you are on a very flaky connection (say a free wireless or bad 3G connectivity or at any web development conference) and you try to use for example Google Reader or Gmail you’ll end up with half broken interfaces. If the flakiness gets caught during first load you actually get offered a “HTML only low version” that is very likely to work better.</p>

	<p/><h2>The best of both worlds</h2><p/>

	<p>This is totally fine – it tries to give an end user the best experience depending on environment and connectivity. And this is what progressive enhancement is about, really. And there is nothing evangelical about that – it is plain and pure pragmatism.</p>

	<p>It seems just not a good plan under any circumstances to give people an interface that doesn’t work. So to avoid this, let’s generate the interface with the technologies that it is dependent on.</p>

	<p>With techniques like <a href="http://icant.co.uk/sandbox/eventdelegation/">event delegation</a> this is incredibly simple. You add click handlers to the parent elements and write out your <span class="caps">HTML</span> using innerHTML or other, newer and faster techniques.</p>

	<p/><h2>So why is this such a problem?</h2><p/>

	<p>Frankly, I really don’t know. Maybe it is because I am old school and like my localhost. Maybe it is because I have been disappointed by browsers and environments over and over again and like to play it safe. I just really don’t get why someone would go for a JS-only solution when the JS is really only needed to provide the enhanced experience on top of something that can work without it.</p>

	<p/><h2>The mythical edge case application</h2><p/>

	<p>A big thing that people keep coming up with are the “applications that need JavaScript”. If we are really honest with ourselves, then these are very rare. If pushed, I could only think of something like photoshop in the browser, or any other editor (video, <span class="caps">IDE</span> in the browser, synth) that would be <strong>dependent</strong> on JavaScript. All the others can fall back to a solution that requires a reload and server-side component.</p>

	<p>And let’s face it – in the times of Node.js the server side solution can be done in JavaScript, too. Dav Glass of Yahoo 2 years ago showed that if a widget library is written to be independent of its environment, you can re-use the same rich widget client and server side.</p>

	<p>The real reasons for the “App that needs JavaScript” seems to be a different, non-technical ones.</p>

	<p/><h2>The real reasons for “Apps that need JavaScript”</h2><p/>

	<p>Much like there are reasons for not having JavaScript there are reasons for apps that need JavaScript and deliver broken experiences.</p>

	<p/><ul><li><strong>You only know JS and think people should upgrade their browsers and stop being pussies</strong>. This is fine, but doesn’t make you the visionary you think you are as it is actually a limited view. We called that <span class="caps">DHTML</span> and it failed once – it can fail again</li><li><strong>You are building an app with a team without server side skills and want to get it out cheaply.</strong> This can work, but sounds to me like apps that “add accessibility later”, thus quadrupling the time and money needed to make that happen. Plan for that and all is good.</li><li><strong>You want to get the app out quickly and you know you’ll have to re-write it later</strong>. This is actually a pretty common thing, especially when you get highly successful or bought by someone else. Good luck to you, just don’t give people the impression that you are there to stay.</li><li><strong>Your app will run in a pure JS environment</strong>. Of course this means there is no need to make it work without JS. One example of this would be Air applications. Just make sure you bet on tech and environments that will stay on the radar of the company selling it.</li><li><strong>Your app really needs JS to work.</strong> If that is the case, just don’t offer it to people without it. Explain in a nice fashion the whys and hows (and avoid telling people they <strong>need</strong> to turn it on as they may not be able to and all you do is frustrate even more) and redirect with JS to your app.</li></ul><p/>

	<p/><h2>In summary – sort of</h2><p/>

	<p>All in all, the question of JavaScript dependence reaches much further than just the technical issues. It questions old best practices and has quite an impact on maintainability (I will write about this soon).</p>

	<p>Let’s just say that our discussions about it would be much more fruitful if we started asking the “what do we <strong>need</strong> JS for” question rather than the “why do people have no JS”. There is no point in blaming people to hold back the web when our techniques are very adaptive to different needs.</p>

	<p>There is also no point in showing people you can break their stuff by turning things in your browser on and off. That is not a representation of what happens when a normal visitor gets stuck in our apps.</p>

	<p>Maybe all of this will be moot when node.js matures and becomes as ubiquitous as the <span class="caps">LAMP</span> stack is now. I’d like to see that.</p>
