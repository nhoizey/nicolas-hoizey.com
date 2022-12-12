---
title:      La navigation ne se fige plus en haut de l'écran lors du scroll
date: 2011-04-11 12:00:00 +02:00
lang:       fr
tags:       [UX, JavaScript, WebPerf]
---

Vous l'avez peut-être constaté par vous-même, le menu de navigation de ce site[^ancien] ne se fige plus en haut de l'écran quand vous descendez dans la page. Ce fonctionnement que j'avais trouvé très [sexy](/2009/12/un-menu-de-navigation-toujours-visible.html) s'avère poser plusieurs problèmes, donc j'ai préféré le supprimer.

[^ancien]: L'ancien site en fait, sur http://gasteroprod.com/

# Un problème ergonomique

Le premier problème — le plus important — est ergonomique.

Comme le met en évidence Stéphane dans son billet «[Le problème de position:fixed](http://www.nota-bene.org/Le-probleme-de-position-fixed)» illustré par le cas concret du [site de Jérémie](http://jeremie.patonnier.net/), fixer des éléments en haut ou bas de page conduit à masquer une partie du contenu lorsque l'on scroll par à coups, avec les touches <kbd>page suivante</kbd> / <kbd>page précédente</kbd> du clavier.

Pour éviter cela, il faudrait redécaler le scroll dans le sens inverse de celui provoqué par l'utilisateur, avec un effet visuel sans doute déplaisant[^1].

[^1]: Je n'ai même pas osé essayer…

# Un problème de performance

Le second problème — qui pourrait être très important mais sur lequel il est plus facile de corriger le tir — concerne la performance.

Dans le code que j'avais mis en ligne initialement, basé sur le tutoriel «[Fixed Floating Elements](http://jqueryfordesigners.com/fixed-floating-elements/)» de [jQuery for Designers](http://jqueryfordesigners.com/), le traitement était provoqué par l'événement `window.onscroll`. Chaque mouvement, même infime, de l'ascenseur provoquait donc l'appel de mon code. L'effet dans les vieux navigateurs au moteur JavaScript pas du tout optimisé était désastreux.

Heureusement, [un billet de John Resig sur un problème similaire trouvé chez Twitter](http://ejohn.org/blog/learning-from-twitter/) m'avait permis de bien améliorer le système, en passant à un contrôle de la position de *scroll* toutes les 100 millisecondes plutôt qu'à chaque mouvement.

# Un problème d'eXpérience Utilisateur

Malheureusement, cette nouvelle version du code, si elle était bien plus performante et impactait beaucoup moins les navigateurs obsolètes, faisait qu'il y avait un effet désagréable de saut du menu quand l'utilisateur descendait dans la page.

Le passage au point névralgique devant faire passer en `position: fixed;` ne se faisait effectivement que rarement au moment précis d'une itération de contrôle, donc le menu commençait à disparaître en haut, avant de revenir soudainement en place, de manière que j'ai jugée trop désagréable à l’œil pour pouvoir la conserver.

