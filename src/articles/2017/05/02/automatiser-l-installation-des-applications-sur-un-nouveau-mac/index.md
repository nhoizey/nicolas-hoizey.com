---
title: Automatiser l'installation des applications sur un nouveau Mac
date: 2017-05-02 12:00:00 +02:00
lang:  fr
tags:  [macOS, software]
---

Voici [un script](https://github.com/nhoizey/macOS-init) qui automatise complètement l'installation de vos applications préférées sur un Mac avec un macOS vierge, et récupère la plupart de vos paramétrages issus d'une installation précédente ou d'un autre Mac.

La migration d'un ancien à un nouveau Mac est extrêmement simple, presque magique, mais elle signifie que tout ce qui n'allait pas sur l'ancien se retrouve sur le nouveau. Je préfère donc depuis quelques années toujours repartir d'une base saine lorsque je commence à utiliser un nouveau Mac.

Au delà de cette installation initiale d'un nouveau Mac, il est aussi parfois utile de remettre à zéro un Mac déjà un peu ancien, afin d'optimiser ses ressources, et se débarasser de toutes sortes de choses que l'on a installé en test, puis mal désinstallé. Le faire lors de chaque mise à jour majeure de macOS, par exemple, est une bonne idée.

Mais cela peut prendre pas mal de temps et donner des migraines, si l'on a peur d'oublier certaines applications ou paramétrages, d'où l'automatisation nécessaire.

# Comment ce script fonctionne-t-il ?

![](/assets/logos/homebrew.png "Homebrew"){.logo }

Ce script était initialement très largement inspiré de [celui de Nicolas Furno](https://github.com/nicolinuxfr/macOS-post-installation)[^furno], mais est ensuite passé à l'utilisation de [Homebrew Bundle](https://github.com/Homebrew/homebrew-bundle) grâce à la suggestion de [Thomas Parisot](https://twitter.com/oncletom). Il permet d'installer presque tous les logiciels que j'utilise, et de configurer quelques paramètres automatiquement après l'installation de macOS.

[^furno]: Script qu'il a [décrit dans un article MacGénération](https://www.macg.co/logiciels/2017/01/un-script-pour-configurer-automatiquement-un-nouveau-mac-96652).

Ce script exploite exclusivement des lignes de commande Shell et il n'a ainsi aucune dépendance. Quelques pré-requis toutefois :

- Il faut être administrateur du Mac pour l'utiliser (il exploite la commande `sudo`) ;
- Il faut s'être connecté au préalable dans le Mac App Store ;
- Les apps à installer depuis la boutique d'Apple doivent déjà être associées à votre compte iTunes Store, donc avoir déjà été achetées, ou téléchargées au moins une fois si elles sont gratuites.

Le script utilise 4 applications pour automatiser cela :

- [Homebrew](http://brew.sh "Homebrew — The missing package manager for macOS") permet d'installer automatiquement des applications système ;
- [Homebrew Cask](https://caskroom.github.io) permet d'installer des applications macOS qui sont disponibles hors du Mac App Store ;
- [mas](https://github.com/mas-cli/mas) permet d'installer des applications du Mac App Store, à condition qu'elles aient déjà été achetées ou téléchargées au moins une fois si elles sont gratuites ;
- [Mackup](https://github.com/lra/mackup) enfin permet de restaurer les préférences d'applications depuis une installation précédente ou un autre Mac.

# Comment l'utiliser ?

Voici comment utiliser les deux scripts :

## Installation initiale de l'OS vierge

1. Installez macOS
1. Lancez le Mac App Store et connectez-vous à votre compte

**Attention**, si vous migrez depuis une autre machine ou faites une réinstallation complète, utilisez tant que possible le même *username*, sinon Mackup ne fera pas les bonnes actions pour récupérer les paramètres des applications.

## Première étape

1. Téléchargez la dernière version du projet ([lien direct](https://github.com/nhoizey/macOS-init/archive/master.zip)) ;
1. Ouvrez les fichiers `post-install.sh` et `Brewfile`, et modifiez ce qui est installé par défaut ;
1. Pensez à changer les lignes `brew cask install dropbox` et `open -a Dropbox` de [`post-install.sh`](https://github.com/nhoizey/macOS-init/blob/master/post-install.sh) en fonction du service Cloud utilisé, ou alors à la supprimer si vous ne voulez pas en utilisez ;
1. À partir de la ligne `## *** CONFIGURATION ***`, le script configure quelques réglages par défaut, à modifier selon vos besoins ;
1. [Ouvrez ensuite le Terminal de macOS](http://fr.wikihow.com/ouvrir-le-Terminal-sur-un-Mac), glissez le fichier `post-install.sh` depuis le Finder vers le Terminal, et appuyez sur la touche <kbd>Entrée</kbd> et accrochez votre ceinture ;

Le script fonctionnera largement sans votre intervention, sauf :

  - pour valider l'installation de Homebrew ;
  - pour saisir le mot de passe administrateur pour Homebrew ;
  - pour le mot de passe administrateur nécessaire pour Cask ;
  - pour certains logiciels qui nécessitent un accès admin ;

Si tout va bien, il se terminera normalement sans erreur, mais en cas d'erreur, vous pourrez relancer le script et seul ce qui n'a pas déjà été installé, sera installé ;

## Seconde étape

Quand le premier script est terminé, et quand vos données sont synchronisées depuis le cloud :

1. Ouvrez le fichier `post-cloud.sh` et modifiez la [ligne 8](https://github.com/nhoizey/macOS-init/blob/master/post-cloud.sh#L8) en fonction du service de Cloud choisi, ou laissez-la en commentaire si vous utilisez Dropbox (choix par défaut) ;
1. Glissez le fichier `post-cloud.sh` du Finder vers le Terminal, et appuyez sur la touche <kbd>Entrée</kbd> pour finir l'installation.

Voilà, c'est opérationnel.

## Mises à jour ultérieures

1. Lancez le script `update.sh` pour mettre à jour toutes les applications qui le nécessitent.

# L'automatisation ultime

Je me suis encore plus facilité la tâche avec une automatisation supplémentaire qui lance directement l'installation de **ma propre sélection** d'applications, sans avoir à passer par toutes les autres étapes ci-dessus :

```shell
$ curl -sfL https://nhoizey.github.io/macOS-init/run.sh | sh
```

Bien entendu, ne lancez pas cette commande directement si vous ne souhaitez pas installer les mêmes applications que moi, ce qui est probable.

Pour conclure et achever de vous convaincre de l'intérêt de ce script, sachez que je me suis « amusé » à installer complètement trois fois un même Mac en une après-midi, alors qu'il me fallait avant bien deux jours pour arriver au même résultat manuellement.
