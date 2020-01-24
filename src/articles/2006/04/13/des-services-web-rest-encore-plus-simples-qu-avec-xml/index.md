---
title:      "Des Services Web REST encore plus simples qu'avec XML ?"
date: 2006-04-13 12:00:00 +02:00
lang:       fr
tags:       [Flickr, PHP, Clever Age, feed, Web Services]
---

*Article initialement publié dans [le weblog de Clever Age](http://www.clever-age.com/veille/weblog/services-web-rest-encore-plus-simples-avec-xml-493.html).*

Si vous avez déjà manipulé les flux de syndication de Flickr, vous avez appelé des URL de la forme suivante :

- Flux RSS 2.0 : `flickr.com/…/photos_public.gne?id=…&format=rss_200`
- Flux Atom 0.3 : `flickr.com/…/photos_public.gne?id=…&format=atom_03`

Eh bien il est possible d'utiliser d'autres valeurs du paramètre « format » de l'URL pour obtenir les données non pas en RSS ou Atom, mais dans un format plus simple à manipuler sur votre plateforme.

Le premier exemple intéressant va dans le sens de la nouvelle [version « serialized php »](http://developer.yahoo.com/common/phpserial.html) de l'[API de Yahoo](http://www.clever-age.com/veille/weblog/yahoo-ouvre-via-une-api-web-services-350.html) :
[php_serial](https://flickr.com/services/feeds/photos_public.gne?id=38608514@N00&format=php_serial)

Mais vous pouvez tenter toute sorte de formats :

- [php](https://flickr.com/services/feeds/photos_public.gne?id=38608514@N00&format=php)
- [yaml](https://flickr.com/services/feeds/photos_public.gne?id=38608514@N00&format=yaml)
- [sql](https://flickr.com/services/feeds/photos_public.gne?id=38608514@N00&format=sql)
- [json](https://flickr.com/services/feeds/photos_public.gne?id=38608514@N00&format=json)
- [rdf](https://flickr.com/services/feeds/photos_public.gne?id=38608514@N00&format=rdf)

Malheureusement, ce n'est valable que pour les flux de syndication, et pas encore pour l'[API de Flickr](https://www.flickr.com/services/), mais cela ne saurait tarder, ils travaillent dessus.

Cela devrait à n'en pas douter *booster* la [création d'applications exploitant l'API Flickr](http://developer.yahoo.com/flickr/index.html).

Alors que REST semble recevoir de plus en plus de suffrages face à la lourdeur et complexité de la constellation WS-* qui gravite autour de SOAP[^1], voilà qui pourrait bien favoriser l'éclosion d'une nouvelle race de Web Services.

Il est en effet bien plus simple de générer un tableau JavaScript à partir de contenu au format json que de parser du XML. Sans compter l'économie en bande passante et en temps de traitement, tant côté client que serveur.

Par contre, il manque deux choses pour que le modèle d'architecture REST soit respecté :
1. le type de contenu devrait être correctement indiqué dans l'en-tête HTTP de la réponse du service web (Content-Type: xxx)
1. et de même, le client devrait indiquer le format qu'il désire dans l'en-tête HTTP de sa requête et non dans une variable GET.

L'identificateur du format désiré (json, xml, rdf,…) est une méta-donnée de représentation et non pas une identification de la ressource (dans l'URL). Pour faire une analogie, on retrouve un peu ici le problème de séparation entre contenu et présentation des [outils de gestion de contenu Web](http://www.clever-age.com/veille/etudes-payantes/portails-gestion-contenu-etat-art-solutions-7.html), la spécification HTTP prévoit une en-tête pour ça (Accept)[^2].

[^1]: Voir [notre étude sur les Web Services](http://www.clever-age.com/veille/etudes-payantes/les-web-services-avenir-architectures-web-8.html), dont nous allons prochainement publier une mise à jour

[^2]: Enfin, mais c'est assez subjectif, cela fait des URLs plutôt moches…
