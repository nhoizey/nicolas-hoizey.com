--- 
title:      Mes conventions de codage 
date: 2008-07-31 12:00:00 +02:00
lang:       fr 
tags:       [development, JavaScript, CSS]
---

[Oncle Tom](http://case.oncle-tom.net/) m'a envoyé en douce il y a quelques jours une [patate chaude](http://case.oncle-tom.net/2008/07/23/conventions-de-programmation-necessaire-maturite/) en m'invitant à vous parler de mes conventions de codage. Vaste sujet, et surtout très vite trollesque, de quoi se régaler.

J'avais commencé à mettre le sujet en perspective avec un bref historique de mon expérience du développement informatique, mais ce qui devait être bref s'est révélé plutôt étoffé, donc c'est devenu un article à part entière sur mes aventures informatiques, et il y a tellement à dire que je ne l'ai pas fini… bref, passons tout de suite au cœur du sujet !

En fait, au risque de décevoir, j'ai plus des habitudes que des conventions strictes de codage, et même si j'ai des préférences personnelles, j'essaie en général de m'en tenir aux conventions qui me sont dictées par les projets auxquels je participe.

Après quelques projets sur lesquels j'étais plutôt isolé, comme [phpMyChat](http://sourceforge.net/projects/phpmychat/), et des discussions sur les newsgroups [fciwap](news://fr.comp.internet.www.auteurs.php) puis [fclp](news://fr.comp.lang.php), ma première grosse expérience en matière de conventions de codage est venue avec [PEAR](/2001/05/une-introduction-a-pear.html)[^1]. Des discussions interminables et passionnées[^2] ont eu lieu sur les mailing-lists du projet lors de l'élaboration des [conventions de codage](http://pear.php.net/manual/fr/standards.php), à laquelle j'ai participé fin 2001. Il était notamment question du choix d'[espaces ou tabulations pour l'indentation du code](http://article.gmane.org/gmane.comp.php.pear.devel/359)[^3] ou du positionnement des accolades…

J'approuve au final le choix d'espaces pour les indentations, mais j'étais auparavant plutôt habitué aux tabulations, tout simplement parce que les éditeurs que j'utilisais à l'époque ne savaient pas gérer ces espaces lors de l'utilisation de la touche de tabulation, et surtout que je ne me préoccupais pas du rendu dans un autre éditeur, étant le seul à travailler sur mes projets. Je ne retrouve malheureusement pas l'exemple qui avait fini par convaincre presque tout le monde — dont moi — que les espaces étaient la meilleure solution.

Après, entre 2 et 4 espaces, je trouve que 2 espaces évitent d'avoir trop de décalage quand on a beaucoup de niveaux imbriqués, tout en préservant une bonne lisibilité. « C'est mon choix ».

Quoi qu'il en soit, il ne faut pas oublier non plus que ces conventions de codage sont comme toutes les bonnes pratiques, elles s'enrichissent au fur et à mesure des expériences, et elles [évoluent](http://pear.php.net/manual/fr/pear2cs.php) toujours petit à petit, par ajustements successifs.

Côté PHP, donc, j'étais plutôt utilisateur des conventions de PEAR, mais comme je l'ai indiqué plus tôt, j'adopte systématiquement les conventions déjà en place sur les projets auxquels je participe, donc je m'intéresse maintenant à celles de [symfony](http://www.clever-age.com/veille/blog/tags/symfony/).

Pour le JavaScript, rien de bien original, j'utilise *grosso modo* les mêmes qu'Oncle Tom, mais pour les CSS, je reste basique, pas d'indentation selon la cascade, et un ordre logique plutôt qu'alphabétique.

Bon, la patate est encore chaude bien que passée entre de nombreuses mains, je la refile vite fait à [Oliv](http://www.glagla.org/weblog/) même s'il a fait un rapide commentaire chez Oncle Tom, [NiCoS](http://www.unelectronlibre.info/) histoire d'avoir l'avis d'un fan de Django et [Clochix](http://www.clochix.net/) !

[^1]: Pour ceux qui ne connaissent pas, PEAR est un entrepôt de classes — et non réellement un [*framework*](http://blog.clever-age.com/fr/tag/framework/), même si ce terme est plus attractif — PHP répondant aux problématiques les plus courantes des développements Web.

[^2]: Oui, OK, trollesques, on peut le dire…

[^3]: Certains ont même proposer de [mélanger tabulations et espaces](http://article.gmane.org/gmane.comp.php.pear.devel/378) !
