---
title:      esviji v2 sera complètement responsive
date: 2015-03-10 12:00:00 +02:00
lang:       fr
tags:       [game, RWD, SVG, esviji]
---

Voilà plus d'un an que je travaille sur une nouvelle version de mon jeu *esviji* développé en technologies Web, et plus particulièrement en SVG. Avant la sortie prochaine de cette v2 sur tous vos écrans, voici déjà un petit *teasing* de son interface devenue complètement responsive.

![](esviji2-landscape.jpg "esviji v2 en vue horizontale")

Cette v2 a été l'occasion de revoir complètement l'interface pour passer d'un mode purement fluide homothétique[^fluide] à un mode réellement responsive, permettant de profiter du maximum de surface de votre écran, quelle qu'en soit la taille —du *feature phone* de 240×240 pixels à la dernière TV [4K](http://fr.wikipedia.org/wiki/4K) de 3 840×2 160 pixels, en paysage comme en portrait[^tv], et quelle que soit la densité de l'écran[^iphone6p].

{% youtube "R2rxU9cVSqw" %}

L'occasion du coup de tester différentes nouveautés CSS —flexbox, les viewport units— et d'améliorer l'usage de SVG.

Cette v2 sortira bientôt, mais la v1 restera aussi sans doute toujours [jouable en ligne](http://play.esviji.com/)[^enligne] pour les navigateurs qui ne supportent pas encore bien ces nouveautés.

Les deux versions cohabiteront aussi très certainement [dans la marketplace Firefox](https://marketplace.firefox.com/app/esviji), mais la v2 sera sans doute packagée afin de ne pas nécessiter de nouveau téléchargement hors mise à jour.

Stay tuned!

[^fluide]: L'interface plutôt verticale prend un maximum de l'espace disponible, mais juste en se redimensionnant, laissant du coup beaucoup de vide sur écrans en paysage.

[^tv]: Vous faites ce que vous voulez de votre TV…

[^iphone6p]: Oui, oui, c'est aussi « optimisé » pour iPhone 6 Plus, mais je ne garanti pas le fonctionnement sur *Smart Watch*…

[^enligne]: Comme c'est le cas depuis début 2013.
