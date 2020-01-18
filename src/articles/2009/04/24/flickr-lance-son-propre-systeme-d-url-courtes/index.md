---
title:      Flickr lance son propre système d'URL courtes
date: 2009-04-24 12:00:00 +02:00
lang:       fr
tags:       [Flickr, URL]
---

Les services de raccourci d'URL[^1] sont de plus en plus [nombreux](http://www.logiste.be/blog/155-raccourcisseurs-durl-tinyurl-like/) et [riches en fonctionnalités](http://searchengineland.com/analysis-which-url-shortening-service-should-you-use-17204), notamment parce qu'ils sont rendus nécessaires par les [Twitter](http://twitter.com/) et consorts qui ne permettent d'échanger que des messages de 140 caractères. C'est maintenant [Flickr](https://www.flickr.com/) qui dispose de son propre système d'URL courtes, comme je l'ai découvert via [ce tweet de Rasmus Lerdorf](http://twitter.com/rasmus/statuses/1601650008)[^2]

[^1]: Dont le précurseur est à priori [tinyurl.com](http://fr.wikipedia.org/wiki/TinyURL).

[^2]: Si ce nom ne vous dis rien, sachez que c'est le créateur de PHP, maintenant employé de Yahoo!, propriétaire de Flickr.

Les systèmes d'URL courtes, bien qu'indispensables pour les *Twitter-like*, ne présentent pas que des intérêts, notamment :

- parce qu'ils masquent la destination réelle vers laquelle on va se rendre en cliquant[^3]
- parce qu'ils rendent la navigation dépendante d'un service tiers, et donc de sa disponibilité

Dans le cas de Flickr, c'est un système maison, donc dédié à la réduction de taille d'URL pointant de toute façon vers le service lui-même. Le second point n'est donc pas valable.

Le premier point reste cependant valable, les URL raccourcies prenant cette forme : <http://flic.kr/p/5Z9uNn>. Bien malin celui qui pourra déduire directement que ce lien pointe vers [une de mes photos](https://www.flickr.com/photos/nicolas-hoizey/3272125121/), l'URL ne laissant pas apparaître l'identifiant du compte.

![](20090110-givre.jpg "Givre")

Alors comment connaître cette URL raccourcie ? Elle est tout simplement utilisée comme adresse de référence sur la page d'une photo, avec le code suivant :

```html
<link rev="canonical" type="text/html" href="http://flic.kr/p/5Z9uNn" />
```

Vous aurez noté le `rev="canonical"` [choisi par Flickr](http://laughingmeme.org/2009/04/03/url-shortening-hinting/)  — à ne pas confondre avec `rel="canonical"`[^4] —  alors qu'il n'y a pas encore de réel consensus sur la meilleure méthode pour indiquer dans une page Web quelle URL courte utiliser quand c'est nécessaire. La preuve avec les [discussions sur Twitter avec le tag #revcanonical](http://search.twitter.com/search?q=%23revcanonical). Personnellement, je suis plutôt de l'avis de [Anne van Kesteren](http://annevankesteren.nl/2009/04/rev-canonical) et [Ben Ramsey](http://benramsey.com/archives/a-revcanonical-rebuttal/), il faudrait plutôt utiliser ceci :

```html
<link rel="alternate shorter" type="text/html" href="http://flic.kr/p/5Z9uNn" />
```

Ce que j'ai découvert, c'est que tout utilisateur de Flickr dispose maintenant aussi d'une URL courte pour pointer — explicitement cette fois — vers sa page. Je peux ainsi mettre maintenant <http://flic.kr/nicolas-hoizey/> sur mes cartes de visites !

[^3]: A moins de mettre en place des systèmes faisant l'opération inverse, quand c'est possible, tel [ce script Greasemonkey](http://userscripts.org/scripts/show/40582).

[^4]: Que vous avez tout intérêt à utiliser [comme l'indique Google](http://googlewebmastercentral.blogspot.com/2009/02/specify-your-canonical.html).
