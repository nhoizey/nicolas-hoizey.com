---
title:      "flickRate, pour améliorer les favoris de Flickr"
date: 2005-06-26 12:00:00 +02:00
lang:       fr
tags:       [photography, Flickr, development, Greasemonkey]
---

Voilà trop longtemps que je n'ai rien écrit ici. Ce n'est pas la seule raison, mais [flickRate](http://flickrate.gasteroprod.com/) occupe pas mal mon esprit ces derniers temps, il est temps d'en parler.

flickRate est né d'une frustration que j'avais vis à vis des favoris de [Flickr](https://flickr.com/).

Vous pouvez voir par exemple dans [mes favoris](https://www.flickr.com/photos/nicolas-hoizey/favorites/) qu'il n'y a pas de ligne directrice, que certaines photos sélectionnées le sont pour leur esthétisme, et d'autres pour leur humour…

Afin de gérer mieux mes propres favoris, et tant qu'à faire offrir cette même possibilité à d'autres, j'ai créé l'application flickRate, qui permet de **donner des notes à des photos** postées publiquement sur Flickr. Les trois critères proposés pour l'instant sont l'**esthétisme**, l'**originalité**, et le «**fun**». Cela pourrait évoluer, ce n'est pas réellement satisfaisant. Il sera aussi sans doute possible un jour de ne voter que pour un ou deux de ces critères.

A ce jour, flickRate a déjà rassemblé 206 utilisateurs, qui ont voté pour [1090 photos](http://flickrate.gasteroprod.com/browse.php?nb=32&who=all&when=all&criteria=aesthetics) !

## S'inscrire

La première chose à faire, si ce n'est déjà fait, est de [s'inscrire](http://flickrate.gasteroprod.com/register.php). Seule une adresse e-mail est nécessaire, afin de valider la création d'un compte par envoi d'un mail de confirmation.

Dans un futur relativement proche, dès que la [nouvelle API d'authentification de Flickr](https://flickr.com/services/api/auth.spec.html) sera disponible, un compte Flickr devrait suffire, ce qui permettra aussi éventuellement de rendre le système plus équitable en n'autorisant pas les inscrits à voter pour leurs propres photos.

## Comment voter ?

Il existe deux moyens de voter pour des photos avec flickRate, tous deux présents sur la page de flickRate réservée aux [outils](http://flickrate.gasteroprod.com/tools.php) :

**Un bookmarklet**

Le premier moyen est assez traditionnel, il s'agit d'un bookmarklet qui ouvre une popup de vote.

![](flickrate_bookmarklet.jpg "Voter dans une popup. Popup ouverte par le bookmarklet flickRate depuis une page de photo")

Ce bookmarklet est normalement utilisable avec tous les navigateurs, mais n'hésitez pas à signaler si ce n'est pas le cas.

**Un script Greasemonkey**

Si ce nom [Greasemonkey](http://greasemonkey.mozdev.org/) ne vous est pas familier, sachez qu'il s'agit d'une extension formidable pour Mozilla Firefox qui permet de créer des scripts modifiant l'interface des sites Web visités.

Il existe [des tonnes](http://blogmarks.net/tag/greasemonkey) de [scripts Greasemonkey](http://dunck.us/collab/GreaseMonkeyUserScripts) permettant d'améliorer ou modifier des sites existants, dont [Flickr](http://dunck.us/collab/GreaseMonkeyUserScripts#head-bf3e38f5cf2d4219b5d85be3de046038aa959e0d).

Pour faire simple, dans le cas de flickRate, cela permet d'afficher l'interface de vote de flickRate directement sous les photos dans les pages de Flickr !

![](flickrate_greasemonkey.jpg "flickRate intégré à Flickr. Grâce à Greasemonkey, l'interface de vote de flickRate est intégrée à Flickr !")

Ce script Greasemonkey a aussi été [compilé](http://www.letitblog.com/greasemonkey-compiler/) sous forme d'une extension Firefox, si vous ne souhaitez pas installer l'extension Greasemonkey.

## Naviguer dans flickRate

La navigation dans flickRate permet de voir quelles sont les photos les mieux classées selon les trois critères, et même de restreindre la visualisation à une période calendaire donnée, voir à [ses propres votes](http://flickrate.gasteroprod.com/browse.php?nb=32&who=you&when=all&criteria=aesthetics) ou [uniquement ceux des autres](http://flickrate.gasteroprod.com/browse.php?nb=32&who=others&when=all&criteria=aesthetics).

![](flickrate_browse.jpg "Navigation dans flickRate. Les options de filtre et tri sont nombreuses dans flickRate pour naviguer selon ses propres intérêts")

Afin de récolter les remarques des utilisateurs et discuter des évolutions de flickRate, j'ai créé un [groupe flickRate](https://www.flickr.com/groups/flickrate/) sur Flickr.

## Et ça donne quoi ?

Pour finir en beauté[^t1], voici à ce jour les 20 photos les plus appréciées des utilisateurs de flickRate[^t2] depuis son lancement :

<a href="https://www.flickr.com/photos/84796723@N00/1558605/" title="longtail on the beach, by dogsbody"><img src="http://photos2.flickr.com/1558605_af64edfa42_s.jpg" width="75" height="75" /></a>
<a href="https://www.flickr.com/photos/47689490@N00/11757131/" title="Lucy In The Sky With Diamonds, by noqontrol"><img src="http://photos6.flickr.com/11757131_c7e7c32baf_s.jpg" width="75" height="75" /></a>
<a href="https://www.flickr.com/photos/64235932@N00/13512288/" title="Under Rain, by Foad 2Fun"><img src="https://photos10.flickr.com/13512288_f9a2dd2e78_s.jpg" width="75" height="75" /></a>
<a href="https://www.flickr.com/photos/38608514@N00/13466833/" title="L&apos;intÃ©rieur de la basilique de Lisieux, by Nicolas Hoizey"><img src="https://photos11.flickr.com/13466833_cf31714fa7_s.jpg" width="75" height="75" /></a>
<a href="https://www.flickr.com/photos/59171457@N00/13251523/" title="IMG_1973, by conceptDawg"><img src="https://photos11.flickr.com/13251523_75cfb52b06_s.jpg" width="75" height="75" /></a>
<a href="https://www.flickr.com/photos/43671131372@N01/4271300/" title="Wolf Moon, by notraces"><img src="http://photos4.flickr.com/4271300_9fc9235f4e_s.jpg" width="75" height="75" /></a>
<a href="https://www.flickr.com/photos/49503111054@N01/9887123/" title="sun, by lil aNNa"><img src="http://photos5.flickr.com/9887123_8005cb4929_s.jpg" width="75" height="75" /></a>
<a href="https://www.flickr.com/photos/11823401@N00/11668682/" title="Curve 70, by Crinity"><img src="https://photos10.flickr.com/11668682_f9af877357_s.jpg" width="75" height="75" /></a>
<a href="https://www.flickr.com/photos/15297893@N00/5762084/" title="Winter in spring #2, by solea"><img src="http://photos6.flickr.com/5762084_496b9624bf_s.jpg" width="75" height="75" /></a>
<a href="https://www.flickr.com/photos/80866212@N00/9185047/" title="China Image 0039, by Jackson Lee"><img src="http://photos4.flickr.com/9185047_be635d551a_s.jpg" width="75" height="75" /></a>
<a href="https://www.flickr.com/photos/66812927@N00/8109304/" title="Asaf-ud-Daula&apos;s Imambara, by madviks"><img src="http://photos6.flickr.com/8109304_d03036bac0_s.jpg" width="75" height="75" /></a>
<a href="https://www.flickr.com/photos/35277602@N00/1290277/" title="Chevrons, by BombDog"><img src="http://photos2.flickr.com/1290277_172122f428_s.jpg" width="75" height="75" /></a>
<a href="https://www.flickr.com/photos/15264742@N00/4594639/" title="Fusca, by Josa Jr"><img src="http://photos3.flickr.com/4594639_7d92a87b69_s.jpg" width="75" height="75" /></a>
<a href="https://www.flickr.com/photos/89826592@N00/14295396/" title="Let the light shine, by Mark, The"><img src="https://photos14.flickr.com/14295396_b1982fbf29_s.jpg" width="75" height="75" /></a>
<a href="https://www.flickr.com/photos/38608514@N00/3057330/" title="Le TrÃ©port, Normandie, France, by Nicolas Hoizey"><img src="https://photos1.flickr.com/3057330_e284624052_s.jpg" width="75" height="75" /></a>
<a href="https://www.flickr.com/photos/74813207@N00/20717912/" title="La Jolla Shores #06, by mutbka"><img src="https://photos16.flickr.com/20717912_0eda5882a1_s.jpg" width="75" height="75" /></a>
<a href="https://www.flickr.com/photos/43671131372@N01/19602128/" title="Moon on Ice, by notraces"><img src="https://photos14.flickr.com/19602128_ce8843acbd_s.jpg" width="75" height="75" /></a>
<a href="https://www.flickr.com/photos/43671131372@N01/20275216/" title="Look to the Sky, by notraces"><img src="https://photos17.flickr.com/20275216_e9a6dc096c_s.jpg" width="75" height="75" /></a>
<a href="https://www.flickr.com/photos/92362770@N00/20233031/" title="2002-202A, by aquanerds"><img src="https://photos17.flickr.com/20233031_41fa2f9a79_s.jpg" width="75" height="75" /></a>
<a href="https://www.flickr.com/photos/92362770@N00/20039694/" title="2000-032A, by aquanerds"><img src="https://photos15.flickr.com/20039694_81b5500cb5_s.jpg" width="75" height="75" /></a>

[^t1]: Oui, je sais, elle était facile celle-là…

[^t2]: Au moins deux d'entre eux ont voté pour ces photos
