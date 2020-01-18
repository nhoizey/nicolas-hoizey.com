---
title:      En travaux
date: 2011-12-28 12:00:00 +02:00
lang:       fr
tags:       [SPIP, AlwaysData, hosting, Gandi, design]
---

Cela ne vous a sans doute pas échappé si vous avez fait un tour sur le site ces dernières heures, il n'a plus du tout la même tête. Bin oui, ce que j'avais fait à l'arrache après avoir [mis à la poubelle](/2011/01/le-design-de-gastero-prod-est-il-a-jeter-a-la-poubelle.html) ce que j'ai cru être un superbe design pendant 3 longues années[^moche] ne me plaisait finalement vraiment pas, ergonomiquement et visuellement. Mais ce n'est pas le seul changement, loin de là…

[^moche]: C'est de votre faute, vous ne m'avez pas prévenu !

# La partie émergée de l'iceberg

Ce que vous voyez à l'instant sur ce site, c'est donc un thème (presque) par défaut, fourni sous forme de plugin pour SPIP, j'ai nommé [Zpip-dist](http://plugins.spip.net/plugin600.html), créé par [Cerdic](https://twitter.com/GusLeLapin).

Il n'est pas splendide, mais a le mérite d'être plutôt épuré, donc bien moins laid que [tous les autres thèmes](http://www.spip-contrib.net/SPIP-Zen-Garden) que j'ai pu voir, il fera bien l'affaire en attendant qu'un vrai design soit réalisé.

Il a aussi l'avantage d'être basé sur [le framework HTML Z](http://www.yterium.net/Un-framework-HTML-est-il-possible) implémenté dans le plugin Z-core, que je compte continuer à utiliser pour le futur design. La transition pourra se faire sans douleur.

# La partie immergée de l'iceberg

Ce que vous n'avez sans doute pas perçu par vous-même si vous n'avez pas lu mes tweets récents, c'est que ce site à aussi connu deux évolutions techniques majeures.

## SPIP 3

L'évolution technique la plus importante pour le site lui-même, c'est le passage à SPIP 3. Toujours en version *beta*, mais déjà plutôt stable[^stable] et utilisé par de plus en plus de sites, SPIP 3 apporte une palanquée de nouveautés intéressantes par rapport aux versions précédentes, nous y reviendrons prochainement.

## So long Gandi, and thanks for all the fish

![](/assets/logos/alwaysdata.png){.logo}

L'autre évolution technique importante, mais plus pour moi que le site lui-même, est le passage d'un hébergement [Gandi Serveur](https://www.gandi.net/hebergement/serveur) où je devais tout (mal) faire moi-même, y compris la configuration et les mises à jour système, à un hébergement [AlwaysData](http://nho.io/alwaysdata) infogéré où je n'ai plus à me préoccuper que des sources de mes sites.

Un des arguments de AlwaysData face à une concurrence très large est la mise à disposition d'un accès *ssh* qui me permet de gérer les sources des sites dans un dépôt Git et faire des *pull*, plutôt que tout faire par FTP.

Il me reste à voir comment gérer proprement les sources de SPIP et des plugins issus de la communauté, je ne maîtrise pas encore suffisamment les *submodules* de Git pour cela.

[^stable]: Sachant que ce site à longtemps tourné sur le *trunk* de SPIP 2, une *beta* ne peut pas lui faire peur…
