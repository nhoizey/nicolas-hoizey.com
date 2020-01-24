---
title:      Une sauvegarde de fichiers en ligne très simple pour pas cher
date: 2007-05-07 12:00:00 +02:00
lang:       fr
tags:       [backup]
---

![](/assets/logos/jungledisk.png){.logo}

Cela fait déjà quelque temps que j'essaie d'utiliser le stockage proposé par [Amazon S3](http://www.amazon.com/S3-AWS-home-page-Money/b/ref=sc_fe_l_2/104-0339411-7512773?ie=UTF8&node=16427261&no=3435361&me=A36L942TSJ2AJA) [^s3] pour [vraiment pas cher](http://www.amazon.com/gp/browse.html?node=16427271&no=16427261#as11) pour faire des sauvegardes en ligne de mes fichiers importants. J'utilise pour cela [JungleDisk](http://www.jungledisk.com/) qui fourni une interface permettant de monter mon espace S3 comme un disque réseau, et surtout une gestion automatique des sauvegardes.

[^s3]: S3 = *Simple Storage Service*

Malheureusement, ce logiciel est encore en version *beta* et j'ai des soucis avec certains de mes dossiers et fichiers Mac OS, sans doute parce que leur nom contient des caractères accentués, mal supportés par de nombreux logiciels anglo-saxons. Il va de plus devenir payant, certes à [un tarif très raisonnable](http://blog.jungledisk.com/2007/02/02/pricingplans), alors que des solutions gratuites et libres — mais relativement complexes à mettre en oeuvre — existent pour [se connecter à S3](http://blog.eberly.org/2006/10/09/how-automate-your-backup-to-amazon-s3-using-s3sync/).

Il y aura certainement prochainement des alternatives tout aussi simple à utiliser que JungleDisk, donc en attendant je vais tester autre chose.

![](/assets/logos/mozy.png){.logo}

Je commence par exemple à tester [Mozy](https://mozy.com/?ref=VH5M5G)[^mozy], qui est d'une simplicité enfantine, et qui s'intègre encore mieux au Mac[^windows] que JungleDisk, en proposant non seulement de synchroniser des dossiers, mais aussi des données plus typées comme les mails, les contacts ou les préférences des applications.

[Je laisse Olivier vous présenter complètement Mozy](http://www.glagla.org/blog/index.php/2007/05/05/178-mozy-j-ai-teste-pour-vous) à grand renfort de copies d'écran, il a l'air d'en être devenu fan lui aussi…

Pour l'instant, je suis en version gratuite limitée à 2 Go de donnée[^bonus], mais si j'en suis réellement satisfait, je passerais sans doute en version payante en attendant un équivalent gratuit — et tant que possible libre.

[^mozy]: Si vous utilisez ce lien pour vous inscrire, vous gagnerez 250 Mo de stockage en plus, tout comme moi… ;)

[^windows]: Il fonctionne aussi sous (sur ?) Windows

[^bonus]: Plus [250 Mo par filleul](https://mozy.com/?ref=VH5M5G)
