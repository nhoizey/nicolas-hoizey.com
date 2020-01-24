---
title:      "L'ombre d'un doute…"
date: 2004-05-24 12:00:00 +02:00
lang:       fr
tags:       [creation, standards, CSS]
---

Un effet graphique assez répandu, au point d'envahir notamment les interfaces graphiques des différents OS, est celui des ombrages. Les ombres permettent de donner du relief aux interfaces, principalement pour mettre en évidence la supperposition de différentes « couches » graphiques.

Dans le cas du web, le support des ombres n'est pas encore généralisé. Il est prévu dans CSS3, mais en attendant il faut trouver des astuces…

Une des premières références en la matière est l'article [Easy CSS drop shadows](http://1976design.com/blog/archive/2003/11/14/shadows/) publié le 14 novembre 2003 par [Dunstan Orchard](http://1976design.com/).

Mais une référence plus visible puisque publié sur le fameux [A List Apart](http://alistapart.com/) est le couple d'articles publiés par [Sergio Villarreal](http://overcaffeinated.net/) :

- [CSS Drop Shadows](http://alistapart.com/articles/cssdropshadows/) publié le 27 février 2004
- [CSS Drop Shadows II: Fuzzy Shadows](http://alistapart.com/articles/cssdrop2/), publié le 23 avril 2004

A peine un mois plus tard, [Brian Williams](http://alistapart.com/authors/brianwilliams/) proposait sur A List Apart sa propre version intitulée [Onion Skinned Drop Shadows](http://alistapart.com/articles/onionskin/). Cette version apportait l'avantage d'être assez souple pour s'adapter à toute taille de contenu, mais nécessitait l'usage de 3 `div` imbriqués, pas terrible pour ce qui est de la « qualité » du XHTML produit.

Mais voilà qu'est proposée une nouvelle approche intitulée [:BefTer Drop Shadows](http://www.hszk.bme.hu/~hj130/css/before_after/befter_dropshadow/index_nopos.html), qui utilise les pseudo éléments `:before` et `:after` et ne nécessite ainsi qu'un unique `div`.

Il existe de nombreuses autres ressources à propos des ombres gérées via des CSS, mais celles présentées ici devraient suffire à se faire une idée, en attendant la prochaine idée révolutionnaire…
