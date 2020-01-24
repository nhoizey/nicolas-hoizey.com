---
title:      "Gastero Prod est maintenant sévèrement (Feed)Burné"
date: 2006-04-24 12:00:00 +02:00
lang:       fr
tags:       [feed, RSS, FeedBurner]
---

C'est bien beau de mettre à disposition des flux RSS, mais comment savoir si quelqu'un les utilise ? Et puis certains ont beau dire le contraire, certains[^1] préfèrent encore recevoir l'annonce de nouveaux articles par mail plutôt que par flux de syndication.

[^1]: autres, donc, si vous ne suivez pas

Il était donc temps d'enfin adopter [FeedBurner](http://www.feedburner.com/) sur Gastero Prod, après avoir hésité de nombreux mois.

Cela me permettra de savoir à peu près combien de personnes sont abonné au flux RSS.

L'[ancien flux](/atom.xml) donne donc maintenant une redirection[^2] vers le nouveau, toujours au format RSS 2.0 :

- <http://feeds.feedburner.com/GasteroProd>

Normalement, s'il est raisonnablement bien développé, votre client de syndication devrait mettre à jour tout seul l'URL. Sinon, à vous de jouer !

Comme vous vous en rendrez sans doute compte, FeedBurner a le bon goût[^3] d'insérer dans le flux [mes photos les plus récentes sur Flickr](https://www.flickr.com/photos/nicolas-hoizey/).

Au passage, FeedBurner met à disposition un formulaire d'inscription à l'envoi par e-mail des nouveautés du site, donc j'ai créé un nouveau bloc en haut à droite de la page d'accueil[^4] :

![](gp_feedburner.png)

Donc si vous êtes allergique au RSS, voilà un nouveau moyen de ne plus manquer les mises à jour du site.

C'est-y pas beau tout ça ?

**MAJ dix minutes après :** Ah bin tiens, [NiKo est aussi passé chez FeedBurner](http://www.prendreuncafe.com/blog/2006/04/24/442-amenagement-des-flux-de-syndication), belle coïncidence !
**MAJ du 25/04 :** Un point intéressant que j'avais oublié de signaler est que maintenant seul FeedBurner vient chercher le flux RSS chez Gastero Prod, donc ça devrait alléger de manière conséquente la charge serveur et la bande passante consommée. C'est [NiCoS](http://www.unelectronlibre.info/) qui va être content… ;-)

**Seconde MAJ du 25/04 :** Comme signalé par NiKo, pep propose une explication plus complète des [intérêts et limites de FeedBurner](http://www.callmepep.org/blog/2006/04/24/291-utilisation-de-feedburner-pour-les-fils-de-syndication-principaux).

[^2]: code 301, comme « déplacé définitivement », pour les techniciens

[^3]: j'espère que vous serez du même avis

[^4]: titre de niveau 3 « Abonnements » pour ceux qui naviguent par le plan de la page

Désolé pour le jeu de mots laid du titre, c'était plus fort que moi…
