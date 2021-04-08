---
title:      Avis de turbulences dans les flux RSS de Gastero Prod
date: 2008-02-27 12:00:00 +02:00
lang:       fr
tags:       [feed, Yahoo, FeedBurner]
---

Certains d'entre vous, chers abonnés, m'ont signalé des problèmes dans les flux RSS de Gastero Prod, avec notamment l'apparition de nouveaux éléments dans [le flux RSS principal](http://feeds.feedburner.com/GasteroProd). Pas de panique, ces turbulences sont passagères, et dues principalement à la mise à jour du bloc « Ambiance musicale » en bas de page, et à la création d'un réel flux complet, reprenant en plus des articles du blog les photos et les liens que vous trouvez aussi sur le site.

## Ambiance musicale

J'avais mis dans le pied de page un [*widget* LastFM](http://www.lastfm.fr/widgets/) permettant d'indiquer en temps réel ce que j'écoute comme musique, mais cela rendait pénible la navigation sur le site en provoquant pour chaque page le rechargement du Widget depuis [LastFM](http://www.lastfm.fr/).

J'ai donc décidé d'internaliser cette fonctionnalité, et de gérer sous forme d'articles dans SPIP une mise en avant des albums que j'écoute le plus régulièrement, histoire de partager un peu mes goûts musicaux — fort éclectiques vous le verrez — et éventuellement vous faire découvrir des pépites insoupçonnées.

Malheureusement, j'avais oublié de filtrer les rubriques présentées dans [le flux RSS du blog](http://feeds.feedburner.com/GasteroProd/Blog), et vous vous êtes retrouvés avec une quinzaine d'articles en plus, un pour chaque album présenté. J'en suis désolé, c'est maintenant corrigé.

Au passage, vous noterez que j'ai aussi supprimé le [*widget* BoxedUp](http://www.boxedup.com/get/widgetstart), qui était encore pire que celui de LastFM, malgré l'utilisation de Amazon S3 pour le stockage des images.

## Un flux pour les alerter tous…

    Trois Flux pour les Internautes qui le souhaitent
    Un Flux pour les aggréger tous, un Flux pour simplifier
    Un Flux pour les alerter tous et dans les méandre de Gastero Prod les lier
    Au pays de la blogosphère où s’étendent les ombres…

Ca pète, hein… 😉[^1]

Bon, sérieusement, avec trois flux RSS principaux disponibles sur Gastero Prod — l'un pour les articles, le second pour les photos et le troisième pour les liens[^2] — il devenait compliqué pour un Internaute « moyen »[^3] de s'abonner pour être au courant de tous les nouveaux contenus du site.

J'ai donc décidé de créer un flux maître, complet, reprenant le contenu des trois autres. Encore fallait-il trouver un moyen de le faire, chaque flux provenant en fait d'une source différente.

J'aurais pu utiliser SPIP, qui sait faire cela sans soucis, mais vu que j'utilise déjà [FeedBurner](http://www.feedburner.com) en intermédiaire pour servir les flux, je me suis laissé tenté par une utilisation enfin effective — plutôt que simplement expérimentale — des géniaux [Yahoo! Pipes](http://pipes.yahoo.com/).

Voici donc mon [Yahoo! Pipe aggrégeant les trois flux RSS de Gastero Prod pour en constituer un complet, avec préfixe sur chaque *item* pour faciliter la lecture](http://pipes.yahoo.com/nicolashoizey/gasteroprod)[^4]. Je vous invite à regarder son « code source »[^5], qui montre notamment un exemple de factorisation de « code » par l'usage d'un autre [Yahoo! Pipe permettant de simplement préfixer tous les *items* d'un flux](http://pipes.yahoo.com/nicolashoizey/feeditemprefix).

![](yahoo-pipe-flux-rss-gastero-prod.png)

Malheureusement, le flux ainsi obtenu, servi à nouveau par FeedBurner, ne dispose pas de mon icône habituelle, qui est remplacée par celle de Yahoo!, ce qui fait un peut tâche dans un aggrégateur. Ceci ne sera corrigé que quand Yahoo! ajoutera la [possibilité de manipuler dans un Yahoo! Pipe le flux lui-même, et non seulement ses *items*](http://suggestions.yahoo.com/detail/?prop=Pipes&fid=73084)[^6].

## Et donc ?

Au final, si vous souhaitez être alerté pour toutes nouvelle publication sur Gastero Prod, tant pour les articles que pour les photos ou liens, ne changez rien, le flux maître a pris l'adresse de l'ancien flux des articles. Vous devrez par contre éventuellement vous désabonner des flux des photos et des liens.

Si par contre vous ne souhaitez être alerté que pour les nouveaux articles, comme avant, vous devez vous désinscrire du flux maître, et vous abonner au seul flux des articles.

En synthèse, voici la liste des flux disponibles :

- Flux complet de Gastero Prod
    - <http://feeds.feedburner.com/GasteroProd>

- Flux du blog de Gastero Prod
    - <http://feeds.feedburner.com/GasteroProd/Blog>

- Flux des photos de Gastero Prod
    - <http://feeds.feedburner.com/GasteroProd/Photos>

- Flux des liens de Gastero Prod
    - <http://feeds.feedburner.com/GasteroProd/Liens>

A vous de jouer !

[^1]: Si vous ne reconnaissez pas la référence, désolé pour vous…

[^2]: Sans même parler des liens disponibles pour chaque *tag* et pour chaque discussion associée à un article !

[^3]: C'est quoi, d'ailleurs, un internaute « moyen », de nos jours ?

[^4]: Étonnement, il affiche les *enclosures* du flux des photos alors qu'il ne le fait pas en mode RSS

[^5]: Sont marrants chez Yahoo! de parler de code source alors que tout se fait graphiquement et par configuration.

[^6]: Oui, vous pouvez voter… 😉
