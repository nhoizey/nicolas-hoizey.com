---
title:      Flickr ajoute de nouveaux flux RSS pour suivre l'activité du site
date: 2008-01-31 12:00:00 +02:00
lang:       fr
tags:       [Flickr, feed]
---

Sans que j'ai vu la moindre annonce officielle où que ce soit, j'ai découvert que [Flickr](https://flickr.com/) a ajouté au moins deux nouveaux types de flux RSS pour suivre l'activité du site.

## Suivre les favoris d'un utilisateur

Le premier flux est celui permettant d'être informé quand un utilisateur ajoute une photo à ses favoris.

C'est un flux que je demandais depuis déjà pas mal de temps, au point de lancer de la propagande sur [Digg](http://digg.com/software/Flickr_should_provide_RSS_feeds_for_favorites)[^1], [Jyte](http://jyte.com/cl/flickr-should-provide-rss-feeds-for-favorites) et autres, et même de proposer [ma propre solution](https://www.flickr.com/photos/nicolas-hoizey/405755351/) basée sur l'API Flickr pour la récupération des infos, et un script Greasemonkey pour l'intégration dans le site de Flickr.

Ce flux est donc maintenant proposé directement par Flickr, au même endroit sur la page que tout les autres, en bas à gauche :

![](rss-favoris-flickr.png)

Vous pouvez donc vous abonner au [flux RSS](http://api.flickr.com/services/feeds/photos_faves.gne?nsid=38608514@N00&lang=en-us&format=rss_200) de [mes favoris](https://flickr.com/photos/nicolas-hoizey/favorites/), si vous le souhaitez, qui correspond en fait aux photos que je montre comme inspirations sur ce site.

## Suivre l'activité d'un *set* de photos

Le second flux est celui permettant d'être informé quand un utilisateur ajoute une photo à l'un de ses *set*.

C'est celui que j'utilise pour publier mes photos sur ce site, simplement en les ajoutant au *set* [Published on Gastero Prod](https://www.flickr.com/photos/nicolas-hoizey/sets/72157603551083073/).

Je n'ai donc plus besoin de [ce *hack*](https://www.flickr.com/groups/flickrhacks/discuss/72157600063281311/) permettant d'obtenir la même chose via un [Yahoo! Pipe](http://pipes.yahoo.com/) et un script Greasemonkey.

[^1]: Sans trop de succès malheureusement…
