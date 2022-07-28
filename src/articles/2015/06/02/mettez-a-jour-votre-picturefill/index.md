---
title:      Mettez à jour votre Picturefill !
date: 2015-06-02 12:00:00 +02:00
lang:       fr
tags:       [responsive, image]
---

Si vous êtes un peu à jour dans vos développements responsives, vous avez adopté [le dernier standard pour les images](http://responsiveimages.org/) —`srcset`, `sizes` et éventuellement `picture`— et bien entendu l'excellent polyfill [Picturefill](https://scottjehl.github.io/picturefill/) qui apporte cette révolution à tous les navigateurs qui n'en disposent pas encore nativement. Si vous n'utilisez pas encore la [version 2.3.1](https://github.com/scottjehl/picturefill/releases/tag/2.3.1), [la dernière stable](https://github.com/scottjehl/picturefill/releases) à cet instant, **dépêchez-vous de faire la mise à jour !**

![](/assets/logos/ricg.png){.logo}

Si vous ne mettez pas à jour, les personnes qui visiteront votre site avec les dernières versions de développement de webkit[^nightly] ou Microsoft Edge[^edge] ne verront tout simplement aucune image.

[^nightly]: On parle de versions « nightly » car elles sont compilées chaque nuit à partir des développements du jour.
[^edge]: Microsoft Edge —ex Spartan, qu'est-ce qu'on rigole avec les noms de code— est le futur remplaçant de Microsoft Internet Explorer, qui arrivera cet été avec Windows 10. Non, il n'y aura pas de Windows 9… mais c'est une autre histoire…

Avouez que ça peut être gênant.

Gênant au point que si trop de sites restent sur une ancienne version de Picturefill qui fait planter la fonctionnalité enfin disponible nativement, **les navigateurs susnommés pourraient bien la désactiver**, cette fonctionnalité native, de peur qu'on les accuse d'avoir mal fait leur travail et d'être la cause de ce soucis. Ce serait un méchant coup de frein pour ce standard si nécessaire au Web moderne.

Si vous n'êtes pas convaincus, lisez —en anglais— ces mots de Mat Marquis, _chair_ du [Responsive Issues Community Group](http://ricg.io/)[^issues] : [Please Update Picturefill](https://css-tricks.com/please-update-picturefill/).

[^issues]: _Issues_ et non plus _images_, parce qu'ils travaillent maintenant sur d'autres problématiques, dont les Media Queries liées aux éléments et non plus au _viewport_ uniquement.

Allez, soyez sympa, **mettez tout de suite à jour votre Picturefill, au moins[^aumoins] en 2.3.1**.

[^aumoins]: On ne sait jamais, la v3 en cours de développement sera peut-être sortie quand vous lirez ce billet.

Et si vous n'utilisez pas encore Picturefill, c'est que vous n'avez pas adopté le standard pour les images responsives, j'espère que ce billet attisera votre curiosité et que vous vous lancerez. En suivant [ma formation](http://clever-institut.com/formation/formation-responsive-web-design) éventuellement… 😉

Parce que franchement, le support des images responsives se développe vraiment, alors n'hésitez pas :

{% caniuse "srcset" %}

{% caniuse "picture" %}
