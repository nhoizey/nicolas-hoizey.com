---
title:      "La fin du HTML pour les applications accessibles via le Web n'est pas pour tout de suite"
date: 2005-09-16 12:00:00 +02:00
lang:       fr
tags:       [standards, accessibility]
---

[Laurent Jouanneau](http://ljouanneau.com/) part de [sa réaction](http://ljouanneau.com/blog/2005/09/15/469-de-la-bonne-utilisation-des-technologies) face à l'avènement de [SVG et Canvas](http://standblog.org/blog/2005/09/15/93114367-a-propos-de-svg-et-canvas), annoncés par [Tristan Nitot](http://standblog.org/), pour dénoncer l'usage abusif qui est fait de HTML pour développer des applications alors qu'il est normalement dédié aux documents, d'autant plus que de nouvelles technologies plus orientées applications sont déjà disponibles, comme [XUL / XPFE](http://www.clever-age.com/veille/clever-link/xul-partie-visible-du-framework-mozilla-xpfe-323.html).

Je partage tout à fait les soucis de Laurent de différencier les documents et les applications, et je vois bien l'intérêt de la plateforme [XUL / XPFE](http://www.mozilla.org/xpfe/) de Mozilla ou de ses cousins [XAML / Avalon](http://www.xaml.net/)[^1] chez Microsoft, [MXML / Flex](http://www.macromedia.com/fr/software/flex/productinfo/brz_overview/) chez Macromedia[^2] ou [OpenLaszlo](http://openlaszlo.org/).

Mais comme l'indique bien cette liste — pourtant non exhaustive — de solutions disponibles, le principal problème est une fois de plus de trouver laquelle de ces technologies répond le mieux et le plus durablement à un besoin et des contraintes donnés.

Si l'on parle d'[accessibilité](http://www.clever-age.com/veille/clever-link/usabilite-accessibilite-realite-274.html),  la possibilité d'accéder à une application via le Web depuis n'importe quel navigateur est un critère important, et là XUL / XPFE[^3] et XAML / Avalon[^4] sont écartés d'office[^5], alors que MXML / Flex a l'avantage de s'appuyer sur la très largement répendue plateforme cliente Flash. Mais c'est une solution propriétaire… Reste alors son challenger logiciel libre OpenLaszlo, qui semble bien prometteur.

Dans un même temps, l'usage des technologies standards du Web évolue très rapidement[^6], et la déferlante [AJAX](http://blogmarks.net/tag/ajax) qui redonne des couleurs vives au HTML vieillissant n'est pas près de s'essoufler. On en reparle prochainement…

[^1]: Vous noterez au passage que MOBIFORM Software Ltd., qui se sert de ce site au nom de domaine opportuniste pour promouvoir son logiciel « Aurora », offre une comparaison de XAML avec d'autres technologies, mais oublie incidieusement d'y placer XUL…

[^2]: Racheté cette année par Adobe, donc l'avenir dira si les produits persistent en l'état

[^3]: Limité pour l'instant aux navigateurs utilisant Gecko, dont bien sûr Firefox

[^4]: Peut-être supporté dans le futur IE 7, mais en tout cas dans Windows Vista

[^5]: Pour l'instant en tout cas

[^6]: Sur la base de technologies déjà connues depuis quelque temps mais jusqu'alors relativement ignorées
