---
title:      Un petit bug pas méchant dans l'App Store
date: 2008-10-07 12:00:00 +02:00
lang:       fr
tags:       [fail, Apple, iPhone]
---

C'est sans doute très bête, mais ça me fait toujours sourire de voir des petits bugs pas méchants sur des sites ou applications développées par des boîtes de renom genre Apple.

Là, le micro bug est dans la liste des applications que les clients qui ont téléchargé l'application en cours de visualisation ont aussi téléchargé. Toujours là ? On appelle ça du *cross selling* si je ne m'abuse, et là en l'occurrence Apple a beau parler de « téléchargement », il faut bien comprendre « achat », dans certains cas.

Exemple avec la fiche de l'excellent [Remote](http://www.happy-iphone.com/applications/musique/remote-pour-piloter-itunes-et-apple-tv-depuis-un-iphone), dont voici le bloc « LES CLIENTS ONT ÉGALEMENT TÉLÉCHA… »[^1] :

![](appstore-remote-cross1.png)

Alors certes, toutes ces applications sont bien des divertissements, comme la plupart des applications de l'App Store, mais quand on clique sur le lien « Tout afficher », on arrive sur une liste complète[^2] présentant les « vraies » catégories :

![](appstore-remote-cross2.png)

La première liste est donc erronée, j'ai débusqué un bug !

[^1]: Ou comment l'abus de majuscules illisibles transforme un simple message marketing en hommage subtil à une célèbre ancienne série TV… ;-)

[^2]: Bon, avec une seule appli en plus, manque de pertinence leur truc.
