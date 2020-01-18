---
title:      Laissons IE6 mourir sans style, et ses utilisateurs entrevoir la lumière
date: 2009-02-11 12:00:00 +02:00
lang:       fr
tags:       [fail, standards, Microsoft, CSS, Internet Explorer]
---

Bon, allez, ça va un peu les enfantillages, mais il est temps de montrer aux utilisateurs de IE6 que non, ils n'utilisent pas un bon navigateur, mais que ce sont plutôt des hordes de développeurs Web qui s'arrachent les cheveux pour qu'ils en aient l'illusion. Alors voilà, j'ai décidé d'aider ses pauvres égarés à revenir dans le droit chemin…

Bon, il faut dire que malgré mes nombreuses tentatives pour faire fonctionner convenablement ce site dans IE6, au prix de quelques poignées de touffes de cheveux, ce n'était toujours pas ça, avec des éléments de contenu qui se baladaient n'importe où dans la page, voir même qui se déplaçaient lors de leur survol par le curseur de la souris, et ce sans aucun code JavaScript !

Alors [j'ai décidé de jeter le support de IE6](http://idroppedie6.com/sites/65-httpwwwgasteroprodcom) pour de bon, avec style… enfin, sans continuer à lui envoyer des styles justement, pour que ses utilisateurs profitent pleinement de la belle structure HTML un rien sémantique que j'ai conçue, sans être pénalisés par les énormes erreurs d'interprétation des CSS :

![](gp2008-ie6-windows-2000.png "Gastero Prod dans IE6")

Pour masquer mes feuilles de styles à IE6, j'ai logiquement utilisé les [commentaires conditionnels spécifiques à Internet Explorer](http://www.blog-and-blues.org/articles/Les_syntaxes_de_commentaires_conditionnels_pour_IE_Windows), et notamment l'astuce visant à rendre les styles visibles aussi par les autres navigateurs :

``` html
<!--[if gte IE 7]> <-->
<link rel="stylesheet" href="modern-browers.css" type="text/css" />
<!--> <![endif]-->
```

Cela marche parfaitement pour IE6 qui ne voit donc aucun style, et pour les vrais navigateurs modernes — [Mozilla Firefox](http://www.mozilla.com/), [Apple Safari](http://www.apple.com/safari/), [Opera](http://www.opera.com/), pour n'en citer que trois — qui voient bien tout.

Malheureusement, IE7 et IE8 ne considèrent pas `<-->` comme une balise HTML inconnue à ignorer silencieusement, mais préfèrent l'afficher tel quel, c'eût été trop simple :

![](gp2008-ie7-windows-xp.png "Gastero Prod dans IE7")

![](gp2008-ie8rc1-windows-xp.png "Gastero Prod dans IE8 RC1")

Et je passe sur le fait que le design soit quand même légèrement explosé dans IE7, je ne sais pas si je vais faire beaucoup d'efforts sachant que [IE8](http://www.microsoft.com/windows/Internet-explorer/beta/default.aspx)[^1] pointe le bout de son nez et devrait — même s'il semble que ce ne soit pas aussi bien qu'espéré — mieux se comporter.

[^1]: Vous noterez l'humilité de Microsoft qui laisse « beta » dans l'URL alors que c'est maintenant une RC1 qui est proposée…
