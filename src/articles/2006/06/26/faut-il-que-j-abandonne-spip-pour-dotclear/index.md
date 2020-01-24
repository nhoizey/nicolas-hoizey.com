---
title:      "Faut-il que j'abandonne SPIP pour DotClear ?"
date: 2006-06-26 12:00:00 +02:00
lang:       fr
tags:       [SPIP, blog, tag, opensource, DotClear]
---

Frustré de ne toujours pas avoir de trackbacks sur Gastero Prod, mais aussi surtout de pingbacks automatiques[^1], je me suis lancé dans une petite étude rapide de [DotClear](http://www.dotclear.net/), afin de voir si un changement d'outil pourrait réduire ma frustration. Je n'arrêtais pas de repousser cette étude en me disant qu'il fallait mieux que j'attende ce fabuleux DotClear 2.0 que tout le monde attend, mais j'en ai marre d'attendre cette arlésienne…

[^1]: Puisque je parle certainement beaucoup plus des autres que l'inverse…

Je ne me suis attaché ici à comparer que les fonctionnalités natives de SPIP et DotClear, n'ayant plus trop le temps de chercher[^2] pour chacun des plugins ou contributions pouvant apporter les fonctionnalités qui me manquent. Je me suis aussi surtout limité aux fonctionnalités de SPIP que j'utilise[^3], et à celles de DotClear qui viennent en plus et m'apporteraient réellement un confort ou des fonctionnalités supplémentaires.

## Installation

Même si c'est une opération qui ne fait pas partie du travail quotidien, l'installation est un bon moyen de voir si les développeurs pensent au confort de leurs utilisateurs.

Avec DotClear, cette installation est aussi simple qu'avec SPIP, c'est un pur bonheur, les néophites sont guidés pas à pas de manière très explicite.

De même, une interface publique par défaut est fournie en standard. Elle n'est malheureusement pas plus belle que celle de SPIP[^4], mais à l'intérêt de montrer tout de suite que le produit ne pourra que difficilement servir à faire autre chose qu'un blog, là où SPIP montre par contre une plus grande richesse fonctionnelle.

Je n'ai pas regardé comment sont développés les *templates*[^5], ce n'est pas un critère décisif pour moi, je suis prêt à m'investir si les fonctionnalités répondent à mes attentes.

Il faudrait aussi voir si les mises à jour sont aussi simples, mais je n'ai pas le temps pour l'instant…

## Catégorisation des contenus

La possibilité dans SPIP d'affecter un article à une rubrique et à de multiples mots clefs ne trouve pas d'équivalent dans DotClear, ou un article ne peut malheureusement être rattaché qu'à une unique catégorie. C'est bien dommage, je ne vais pas pouvoir faire de *[tag cloud](art)*…

## Rédaction d'articles

Côté syntaxe de rédaction, DotClear propose soit une syntaxe HTML libre, soit une syntaxe de type Wiki[^6].

SPIP garde un sérieux avantage à ce niveau, intégrant notamment grâce à sa syntaxe spécifique la gestion des liens internes[^7]. DotClear se rattrape avec la gestion des langues des ressources pointées, qui permet de générer l'attribut `hreflang` des liens hypertextes[^8], ce que SPIP ne fait pas encore nativement[^9].

Par contre, DotClear pêche côté notes de bas de page, qu'il a le mauvais goût de placer avant le contenu si elles sont dans le chapô, étrange comportement. Du coup, s'il y a des notes de bas de page tant dans le chapô que dans le contenu, les ancres ne sont pas bonnes !

DotClear a la bonne idée de gérer une galerie d'images partagée entre tous les contenus, mais ne permet pas de gérer des images spécifiques à un article donné, donc la galerie doit vite devenir difficile à gérer. Cette galerie ne permet en plus pas de gérer tous types de documents, ce qui est bien trop limitatif. Finalement, ma galerie de documents pour SPIP est beaucoup mieux, il faudrait que je la finalise…

DotClear n'intègre pas de correction orthographique, alors que celle de SPIP m'a permi déjà plusieurs fois d'éviter des petites horreurs. Le serveur d'orthographe de SPIP est générique, il faudrait voir comment le rendre exploitable par DotClear…

## Interactivité

Du côté des commentaires, DotClear n'intègre malheureusement pas la possibilité de gérer des *threads* de discussion[^10], tout restant désespérément à plat et sans possibilité simple de répondre de manière pertinente à un commentaire en particulier. Je n'ai pas vu beaucoup de blog utilisant — comme je le fais ici — cette notion de *thread*, alors que je la trouve plus intuitive et pratique dans les discussions puisque chaque message est bien dans son contexte[^11].

Là où DotClear apporte un énorme plus à SPIP, et c'est LA raison qui m'a fait débuter cette étude, c'est dans la gestion des trackbacks et pingbacks. Ils sont le meilleurs moyen de relier les blogs entre eux, c'est à dire d'une part de savoir quand un autre blog parle de Gastero Prod, et d'autre part de signaler à d'autres blogs que je les site.

## Bilan temporaire

Je laisse là cette étude commencée il y a plus d'un mois, faute de temps pour la boucler, et surtout parce que j'apprend que [la première *beta* de DotClear 2.0 va enfin être mise à disposition demain](http://www.neokraft.net/post/2006/06/23/GandiBlog) !

Quoi qu'il en soit, je n'aurais pas jeté SPIP pour DotClear 1.

L'avenir dira si DotClear 2 me séduit plus…

[^2]: Et surtout de tester et tenir à jour

[^3]: Une seule rubrique, un seul contributeur, pas de pétitions, pas de sites référencés ni de syndication, etc.

[^4]: Même si de gros progrès ont été faits tout dernièrement grâce notamment à [Romy](http://romy.tetue.net/)…

[^5]: « squelettes » dans le langage SPIP

[^6]: Mais ne propose malheureusement que le HTML pour les commentaires !!!

[^7]: SPIP gère aussi à priori mieux les spécificités typographiques de la langue française, mais je chipote

[^8]: Bien que la syntaxe ne permette pas d'avoir des URL finissant par « |en » ou « |fr » alors que c'est tout à fait autorisé !

[^9]: Un plugin existe pour la future version 1.9, mais les plugins sont encore un sujet instable, donc je préfère m'abstenir pour l'instant.

[^10]: Mécanisme présentant les messages de manière arborescente pour bien situer les réponses à un autre message

[^11]: Je reconnais cependant qu'elle complique la lecture pour quelqu'un qui n'arrive que tardivement, il faudrait pouvoir passer simplement d'une vue en *thread* à une vue linéaire chronologique, et inversement
