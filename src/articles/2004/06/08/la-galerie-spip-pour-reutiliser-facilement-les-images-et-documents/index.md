--- 
title:      "La galerie SPIP, pour réutiliser facilement les images et documents" 
date: 2004-06-08 12:00:00 +02:00
lang:       fr 
tags:       [SPIP]
---

Une fonctionnalité intéressante de SPIP, si elle est bien exploitée, est de pouvoir utiliser tout document (ou image) attaché à un article ou une rubrique dans n'importe quel autre élément. Il est ainsi possible de gagner de l'espace disque en évitant les doublons.

Le problème est qu'il faut pour cela connaître l'identifiant du document en question, ce qui peut s'avérer pénible quand on se souvient l'avoir déjà utilisé, mais sans savoir où.

Heureusement, voilà une galerie qui va simplifier la procédure !

L'idée est tout simplement d'ajouter dans la barre d'aide à la saisie un bouton qui lance dans une autre fenêtre une galerie de tous les documents déjà présents dans SPIP.

Depuis cette fenêtre, il est alors possible de se déplacer dans l'arborescence des rubriques et articles du site, et ainsi de visualiser tous les documents qui leurs sont attachés.

Une fois le bon document retrouvé, des liens permettent d'ajouter simplement le bon raccourci typographique à la zone de saisie qui était active.

## Démonstration en images

**1 - Ouvrez la galerie**

Tout d'abord, cliquez sur le nouveau bouton de la barre d'aide à la saisie des raccourcis typographiques :

![](galerie_spip_1.png)

**2 - Naviguez dans l'arborescence**

Déplacez-vous dans l'arborescence du site pour y retrouver le document ou l'image qui vous intéresse :

![](galerie_spip_2.png)

**3 - Visualisez l'élément et ses liens d'ajout**

Une fois le bon élément retrouvé, cliquez sur le lien correspondant à l'affichahe souhaité :

![](galerie_spip_3.png)

**4 - Continuez à travailler normalement**

Après avoir cliqué sur l'un des liens, le code correspondant est ajouté à la zone de saisie et la galerie est refermée :

![](galerie_spip_4.png)

## Installation

Tout d'abord, téléchargez cette archive :

[galerie.zip](galerie.zip)

Elle contient les quatre fichiers suivants :

- `galerie.php3` est le script qui affiche la galerie, il est à placer dans le répertoire `ecrire/`
  

- `galerie.png` est une nouvelle icône pour la barre, elle est à placer dans le répertoire `IMG/icones_barre/`, et elle pourra être avantageusement remplacée par une autre plus jolie

- `inc_barre.php3` est une version modifiée de la version  fournie avec SPIP 1.7.2. La seule différence est l'ajout des lignes 69 à 72 suivantes :
```php
  // Galerie
  if (!$forum) {
    $ret .= bouton_barre_racc ("javascript:barre_galerie('$champ')",
'galerie.png', 'Ouvrir la galerie', $formulaire, $texte);
  }
```

- `spip_barre.js` est une version modifiée de la version fournie avec SPIP 1.7.2. La seule différence est l'ajout des lignes 89 à 91 de la fonction `barre_galerie()` :
```php
  function barre_galerie(champ) {
    window.open('galerie.php3?field=' + champ, 'galerie',
'width=550,height=400,menubar=no,scrollbars=yes')
  }
```


Cette galerie a également été testée avec succès avec la version 1.8 alpha 1 CVS du 7 juin 2004.
