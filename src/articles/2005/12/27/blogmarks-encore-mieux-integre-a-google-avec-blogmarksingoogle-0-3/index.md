--- 
title:      "Blogmarks encore mieux intégré à Google avec BlogmarksInGoogle 0.3" 
date: 2005-12-27 12:00:00 +02:00
lang:       fr 
tags:       [development, Mozilla, bookmarks, Google, Firefox, Blogmarks]
---

Suite à la sortie de BlogmarksInGoogle 0.2 [il y a deux jours](/2005/12/blogmarks-integre-a-google.html), [NiKo](http://www.prendreuncafe.com/blog/) avait suggéré [d'une part](http://www.gasteroprod.com/blogmarks-integre-a-google.html#commentaire1095) que j'améliore le design, et [d'autre part](http://www.gasteroprod.com/blogmarks-integre-a-google.html#commentaire1097) que j'utilise le flux Atom plutôt que le flux RSS. Voilà qui est fait, avec d'autres améliorations au passage, et le résultat est clairement encore mieux !

Voilà donc ce que ça donne pour le design :

![](BlogmarksInGoogle-screenshot.png "BlogmarksInGoogle 0.3 en action")

Pour ce qui est des évolutions, jugez vous-même :

- Utilisation du flux Atom au lieu du flux RSS, ce qui permet notamment de récupérer la vignette sans tout l'habillage HTML
- Prise en compte de l'ordre de popularité plutôt que l'ordre chronologique
- Suppression des nombreux styles CSS *inline* au profit d'une section globale de styles
- Alternance de couleurs entre les résultats pour améliorer la lisibilité

Il reste juste un bug un peu pénible à corriger : si vous utilisez l'extension BetterSearch pour Firefox, vous risquez d'avoir les résultats Google relégués après ceux de Blogmarks, l'extension semblant ajouter un `clear: right;` sauvage…

**MAJ :** Effectivement, il manquait un [lien vers le script](http://userscripts.org/scripts/show/2243), merci NiCoS !
