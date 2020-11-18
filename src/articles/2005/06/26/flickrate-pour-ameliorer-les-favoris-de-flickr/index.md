---
title:      "flickRate, pour améliorer les favoris de Flickr"
date: 2005-06-26 12:00:00 +02:00
lang:       fr
tags:       [photography, Flickr, development, Greasemonkey]
---

Voilà trop longtemps que je n'ai rien écrit ici. Ce n'est pas la seule raison, mais [flickRate](https://flickrate.gasteroprod.com/) occupe pas mal mon esprit ces derniers temps, il est temps d'en parler.

flickRate est né d'une frustration que j'avais vis à vis des favoris de [Flickr](https://flickr.com/).

Vous pouvez voir par exemple dans [mes favoris](https://www.flickr.com/photos/nicolas-hoizey/favorites/) qu'il n'y a pas de ligne directrice, que certaines photos sélectionnées le sont pour leur esthétisme, et d'autres pour leur humour…

Afin de gérer mieux mes propres favoris, et tant qu'à faire offrir cette même possibilité à d'autres, j'ai créé l'application flickRate, qui permet de **donner des notes à des photos** postées publiquement sur Flickr. Les trois critères proposés pour l'instant sont l'**esthétisme**, l'**originalité**, et le «**fun**». Cela pourrait évoluer, ce n'est pas réellement satisfaisant. Il sera aussi sans doute possible un jour de ne voter que pour un ou deux de ces critères.

A ce jour, flickRate a déjà rassemblé 206 utilisateurs, qui ont voté pour [1090 photos](http://flickrate.gasteroprod.com/browse.php?nb=32&who=all&when=all&criteria=aesthetics) !

## S'inscrire

La première chose à faire, si ce n'est déjà fait, est de [s'inscrire](http://flickrate.gasteroprod.com/register.php). Seule une adresse e-mail est nécessaire, afin de valider la création d'un compte par envoi d'un mail de confirmation.

Dans un futur relativement proche, dès que la [nouvelle API d'authentification de Flickr](https://flickr.com/services/api/auth.spec.html) sera disponible, un compte Flickr devrait suffire, ce qui permettra aussi éventuellement de rendre le système plus équitable en n'autorisant pas les inscrits à voter pour leurs propres photos.

## Comment voter ?

Il existe deux moyens de voter pour des photos avec flickRate, tous deux présents sur la page de flickRate réservée aux [outils](http://flickrate.gasteroprod.com/tools.php) :

### Un bookmarklet

Le premier moyen est assez traditionnel, il s'agit d'un bookmarklet qui ouvre une popup de vote.

![](flickrate_bookmarklet.jpg "Voter dans une popup. Popup ouverte par le bookmarklet flickRate depuis une page de photo")

Ce bookmarklet est normalement utilisable avec tous les navigateurs, mais n'hésitez pas à signaler si ce n'est pas le cas.

### Un script Greasemonkey

Si ce nom [Greasemonkey](http://greasemonkey.mozdev.org/) ne vous est pas familier, sachez qu'il s'agit d'une extension formidable pour Mozilla Firefox qui permet de créer des scripts modifiant l'interface des sites Web visités.

Il existe [des tonnes](http://blogmarks.net/tag/greasemonkey) de [scripts Greasemonkey](http://dunck.us/collab/GreaseMonkeyUserScripts) permettant d'améliorer ou modifier des sites existants, dont [Flickr](http://dunck.us/collab/GreaseMonkeyUserScripts#head-bf3e38f5cf2d4219b5d85be3de046038aa959e0d).

Pour faire simple, dans le cas de flickRate, cela permet d'afficher l'interface de vote de flickRate directement sous les photos dans les pages de Flickr !

![](flickrate_greasemonkey.jpg "flickRate intégré à Flickr. Grâce à Greasemonkey, l'interface de vote de flickRate est intégrée à Flickr !")

Ce script Greasemonkey a aussi été [compilé](http://www.letitblog.com/greasemonkey-compiler/) sous forme d'une extension Firefox, si vous ne souhaitez pas installer l'extension Greasemonkey.

## Naviguer dans flickRate

La navigation dans flickRate permet de voir quelles sont les photos les mieux classées selon les trois critères, et même de restreindre la visualisation à une période calendaire donnée, voir à [ses propres votes](http://flickrate.gasteroprod.com/browse.php?nb=32&who=you&when=all&criteria=aesthetics) ou [uniquement ceux des autres](http://flickrate.gasteroprod.com/browse.php?nb=32&who=others&when=all&criteria=aesthetics).

![](flickrate_browse.jpg "Navigation dans flickRate. Les options de filtre et tri sont nombreuses dans flickRate pour naviguer selon ses propres intérêts")

Afin de récolter les remarques des utilisateurs et discuter des évolutions de flickRate, j'ai créé un [groupe flickRate](https://www.flickr.com/groups/flickrate/) sur Flickr.

[^t1]: Oui, je sais, elle était facile celle-là…

[^t2]: Au moins deux d'entre eux ont voté pour ces photos
