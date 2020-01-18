---
title:      Homebrew sur Mountain Lion
date: 2012-08-02 12:00:00 +02:00
lang:       fr
tags:       [software, Mac]
---

Passé un peu forcé à Mountain Lion la semaine dernière à cause d'un plantage de mon MBP pro, je réinstalle tout ce dont j'ai besoin[^1]. Si désactiver [Gatekeeper](http://www.apple.com/fr/osx/whats-new/features.html#gatekeeper) permet d'installer toutes les applications Mac sans soucis, certains changements système peuvent compliquer l'installation de Homebrew et ses packages.

[^1]: Je prépare un billet listant tous les softs incontournables, ça me servira de check-list pour la prochaine fois et vous pourrez vous en inspirer.

Homebrew annonce par exemple savoir fonctionner juste avec XCode 4.4, mais [installer les Command Line Tools est en fait nécessaire](https://github.com/mxcl/homebrew/issues/13768#issuecomment-7387081), c'est [en téléchargement sur Apple Developer](https://developer.apple.com/downloads/).

Si vous voulez installer Subversion ou tout autre package dépendant de `serf`, il faudra [faire un lien symbolique](https://github.com/mxcl/homebrew/issues/13586#issuecomment-7303394), le chemin de `OSX10.8.xctoolchain` ayant changé :

~~~ bash
sudo ln -s /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain /Applications/Xcode.app/Contents/Developer/Toolchains/OSX10.8.xctoolchain
~~~

Pour l'installation de l'éditeur `joe` — que je préfère à `vi` —, il faut corriger [un défaut avec sed](https://github.com/mxcl/homebrew/issues/13818) en [forçant la locale](https://github.com/mxcl/homebrew/pull/13787#issuecomment-7439013) :

~~~ bash
export LANG=en_EN ; brew install joe
~~~

Je complèterais au fur et à mesure si je trouve d'autres bugs et leurs corrections…
