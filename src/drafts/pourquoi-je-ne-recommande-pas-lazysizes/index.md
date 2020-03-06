---
title: Pourquoi je ne recommande pas LazySizes
lang:  fr
tags:  [ ]
---

Revenons à Lazysizes. C'est pour les flemmards, d'où le nom. </troll>

Sérieusement, ça calcule à la volée les valeurs pour `sizes` selon les dimensions réelles de l'images souhaitée (donc plutôt son conteneur), obtenues en JS.

Pour avoir cette dimension, le rendu de la page doit être fini.
Donc on attend d'avoir tout chargé, d'avoir fait le rendu, pour savoir quelle image charger.

C'est donc bien du lazyload, ça arrive en dernier.

Donc c'est pourri quand c'est sur la première image d'une page, notamment en tête des articles dans la presse.

Dans les navigateurs qui se servent de Picturefill parce qu'ils n'ont pas l'implémentation native, ça ne change pas grand chose, certes.

Mais ils commencent à être rares : http://caniuse.com/srcset

Dans un navigateur qui supporte le standard, le preloader regarde le HTML au fur et à mesure qu'il arrive pour savoir quelles autres ressources il faut charger.

Il regarde notamment les `srcset` et `sizes`, comme ça il sait quelle image il doit télécharger, avant même que le parser principal ai fait son boulot de rendering. Bin oui, il connait le viewport, qui ne dépend pas de la page, ni de CSS, ni de JS, donc `srcset` et `sizes` et suffisent.

Du coup, l'image peut parfois être téléchargée avant même que toutes les autres ressources de la page le soit, donc le rendu est immédiat.
