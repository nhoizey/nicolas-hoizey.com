---
title:      LCL nous dit « Demandez plus à votre banque », alors essayons…
lang:       fr
tags:       [Web, qualité, banque, LCL]
---

Je suis client de la banque [LCL](http://particuliers.lcl.fr/) parce que c'est celle qui m'a fait la meilleure offre quand j'ai voulu acheter une maison, et qu'une condition à ce prêt était que je domicilie mes comptes courants chez eux. Je regrette ce choix chaque fois que je dois accéder à l'interface en ligne…
<figure>
  {% picture lcl-demandez-plus.jpg %}
</figure>

Jusqu'à présent, l'interface était vraiment nulle, pas ergonomique du tout, moche, etc.

Mais une nouvelle version a été déployée le 29 janvier, l'espoir était donc permis…

…sauf que je n'ai rien vu de changé dans l'interface, toujours aussi nulle, pas ergonomique du tout, moche, etc. Oui, je me répète, mais ils le valent bien.

En tout cas, ils imposent l'acceptation de nouvelles « Conditions générales du service » pour accéder à l'interface, lesquelles conditions sont proposées sous forme… d'image !

<figure>
  {% picture lcl-cgu-fail.png %}
  <figcaption>
    Les nouvelles « conditions générales du service » sont proposées en… image !
  </figcaption>
</figure>

Une fois connecté, ils ont quand même mis une page qui liste les nouveautés[^1]. Sauf que cette page a une hauteur fixée, et un contenu qui en dépasse très nettement :

<figure>
  {% picture lcl-changelog-fail.png %}
  <figcaption>
    Impossible de lire la fin des nouveautés annoncées avec ma taille de texte à 18px
  </figcaption>
</figure>

Bien sûr, je me suis dit « suis-je bête, encore [un site qui se moque éperdument des préférences de ses utilisateurs](/2013/03/lachez-prise.html), c'est à cause de ma taille de texte définie à 18px ». Sauf que même en 16px, même si le contenu texte devient lisible intégralement, le picto en bas à droite reste indéchiffrable :

<figure>
  {% picture lcl-changelog-bas-16px.png %}
  <figcaption>
    C'est mieux pour le texte en 16px, mais reste ce picto étrange à droite…
  </figcaption>
</figure>

Il faut aller inspecter le code pour trouver l'URL de l'image en question :
`https://particuliers.secure.lcl.fr/PSP/nouveautes-espace-gestion/Ressources/Gemc/StyleSheet/Ressources/Gemc/Images/NewsCli/bkg-bas.jpg`

Vu que je suis un peu dingue, j'ai tout de suite vu qu'il y a une répétition de `Ressources/Gemc/` entre `Ressources/Gemc/StyleSheet/` et `Ressources/Gemc/Images/`, donc je me suis dit qu'il y a un peu de laxisme côté URL des ressources et réécritures d'URL. Bingo, cette URL fonctionne aussi et donne la même image :

`https://particuliers.secure.lcl.fr/PSP/nouveautes-espace-gestion/Ressources/Gemc/Images/NewsCli/bkg-bas.jpg`

Voici donc l'image en question :

<figure>
  {% picture lcl-changelog-bas-image.jpg %}
  <figcaption>
    L'image qui illustre le bas des informations. Superbe, c'est vraiment dommage de la masquer… ou pas.
  </figcaption>
</figure>

Bon, quand on va sur le site de sa banque, en général, c'est pour consulter ses comptes. Et là, nouvelle surprise[^2], les intitulés des comptes ont du plomb dans l'aile :

<figure>
  {% picture lcl-synthe_se-comptes-fail.png %}
  <figcaption>
    Vous aussi vous avez des « Compte de d¿¿s » dans votre banque ?
  </figcaption>
</figure>

Cela me déprime.

J'ai donc une chose à demander à ma banque. Et on ne peut pas vraiment dire que je demande « plus », cela me semble un minimum :

**S'il vous plait, faites des tests d'ergonomie avec de vrais utilisateurs, et surtout testez vos développements avant de déployer pour vos clients, qu'ils ne vous servent pas de beta testeurs.**

Sachant que je me fais peu d'illusion sur la réaction de LCL face à ces erreurs manifestes, que de toute façon je change de « conseiller » tous les ans depuis quelques années et n'en reçois aucun conseil malgré les frais non négligeables qui me sont prélevés, je sens que je vais me mettre très activement en recherche d'une banque dont le service en ligne est digne de ce nom…

[^1]: L'équivalent est proposé [avant connexion](http://particuliers.lcl.fr/info-cli/?xtatc=INT-253), je m'en suis rendu compte plus tard.

[^2]: Quoique à ce niveau, on ne devrait plus s'étonner de rien…
