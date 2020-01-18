---
title:      Le Backup Day, c'est tous les jours !
date: 2012-08-07 12:00:00 +02:00
lang:       fr
tags:       [backup, CrashPlan, Drobo]
---

Éric a encore écrit un billet très intéressant, consacré cette fois à la problématique trop souvent ignorée des sauvegardes informatiques, mais je ne suis pas d'accord sur tout, alors je propose mon propre point de vue pour compléter.

Déjà, le titre de son billet — «[Ce week-end c’était Backup day](http://n.survol.fr/n/ce-week-end-cetait-backup-day)» — ne me plait pas du tout, comme le titre de ce billet vous l'aura déjà fait deviner. Dire qu'il y a un jour particulier pour faire les sauvegardes, c'est risquer d'oublier de le faire. Et s'il est possible d'automatiser les sauvegardes pour ne pas les oublier, pourquoi ne pas les faire en permanence ?

Tout comme Éric, j'ai de plus en plus de données numériques auxquelles je tiens, et j'ai déjà eu une mauvaise expérience[^1], donc j'ai pris en compte cette problématique assez vite au sérieux.

Le postulat de base de Éric, auquel je souscris complètement, est celui-ci :

> Il vous faut deux *backups*, dont au moins un non synchrone ou avec historique, dont un hors site, avec quelque chose qui vous alerte dès que l’un des deux devient inutilisable. Hors cela, point de salut.

Or la sauvegarde hors site de Éric est constituée de supports optiques — CD, DVD, BluRay — alors que c'est un support très peu fiable. Même en y faisant attention — température, lumière, humidité, etc. — j'ai déjà perdu des backups faits sur CD, heureusement que j'avais des doubles.

L'objectif d'une sauvegarde, c'est bien entendu de retrouver ses données en cas de perte à la source, soit par plantage du support — physique ou logiciel — soit par le fait d'une mauvaise opération humaine[^2].

Dans les deux cas, il faut bien entendu avoir une image des données perdues la plus récente possible, mais il faut aussi en avoir au moins une plus ancienne, au cas où la plus récente serait déjà altérée.

Si vous utilisez Dropbox pour synchroniser vos fichiers entre plusieurs appareils[^3], vous avez déjà un [historique de 30 jours (en)](https://www.dropbox.com/help/11/en) des modifications et suppressions de fichiers, ça peut aider. Si vous pensez avoir besoin de plus de 30 jours de délai, il y a bien le [package Packrat (en)](https://www.dropbox.com/help/113/en) qui retire la limitation, mais c'est surtout que vous avez besoin d'une vraie solution de sauvegarde historisée, car comme le rappelle Éric, «une synchronisation n’est pas une sauvegarde».

Éric attend d'avoir une grosse bande passante montante pour se lancer dans la sauvegarde en ligne via Internet, disant ceci :

> Sauvegarder 100 Go par une ligne ADSL, même de bonne qualité, ça va vite ne pas être raisonnable. Vous ne profiterez réellement de Crashplan ou de ses concurrents qu’avec la fibre.

Je conseille plutôt de s'y mettre tout de suite, cela étant devenu plutôt simple de nos jours, et les sauvegardes incrémentales étant transparentes, très rapides, une fois la sauvegarde initiale réalisée. Certes, le délai de réalisation de celle-ci dépendra évidemment du volume à sauvegarder et de votre bande passante montante, cela m'a pris plus d'un mois pour quelques centaines de Go, parce que j'ai une très mauvaise connexion ADSL. Mais il est très clair que je veux bien attendre quelques semaines pour cette initialisation si cela me permet une meilleure protection par la suite.

![](/assets/logos/crashplan.png){.logo}

J'avais choisi [Mozy](/2007/05/une-sauvegarde-de-fichiers-en-ligne-tres-simple-pour-pas-cher.html) il y a quelques années, mais leur politique tarifaire a complètement changé et est devenue bien moins intéressante pour les gros volumes, donc j'ai changé pour l'offre [CrashPlan+ Family Unlimited](http://www.crashplan.com/consumer/crashplan-plus.html) pour sauvegarder tous les ordinateurs de la famille.

Pour la seconde sauvegarde, je n'ai pas pour l'instant de stratégie bien déterminée, chaque ordinateur ayant un usage différent. Mon MacBook Air est sauvegardé avec Time Machine sur le merveilleux disque dur externe [LaCie Little Disk](http://www.lacie.com/support/support_manifest.htm?id=10252)[^4], mais heureusement que Time Machine m'alerte de temps en temps parce que je ne pense pas à le brancher suffisamment souvent.

![](drobo-s.png "onethird")

Mon Mac mini qui me sert essentiellement de *media center* est sauvegardé avec Time Machine sur une [baie de 5 disques Drobo-S](http://www.drobo.com/products/professionals/drobo-s/index.php) reliée en Firewire 800. L'usage de Time Machine sur le réseau étant impossible de base[^5], je vais plutôt faire des sauvegardes des autres machines sur cette même baie grâce au logiciel CrashPlan qui sait gérer plusieurs destinations de sauvegarde simultanément.

Je compte de plus ajouter à cette artillerie des clones d'au moins certains de mes ordinateurs, afin de pouvoir les réinitialiser très rapidement en cas de gros plantage[^6]. J'ai acheté [Carbon Copy Cloner](http://www.bombich.com/) pour cela[^7], c'est la référence depuis des années sur les Mac.

[^1]: J'ai perdu presque toutes les photos d'un voyage de 2 semaines en Andalousie, heureusement que j'ai pu en récupérer quelques-unes — les plus importantes — sur le service où je les avait envoyées pour impression !

[^2]: J'en connais qui ont déjà fait un `rm -rf /*` sur un serveur Linux…

[^3]: Si ce n'est pas encore le cas, vous ratez vraiment une solution simple et élégante de synchronisation de fichiers, je vous invite à [tester au moins l'offre gratuite](http://db.tt/IiHrXJst) de 2,5 Go !

[^4]: USB 2 avec câble intégré et Firewire 800, 500 Go

[^5]: Il y a bien [des astuces mais avec des défauts notamment de performance](/2008/12/backup-d-un-mac-sur-un-nas-facile-et-sans-bidouille-c-est-possible.html) qui sont rédhibitoires pour moi.

[^6]: Réinstaller un système complet, les applications, et restaurer les données peut prendre énormément de temps.

[^7]: La promo de 25% à l'occasion de la sortie de Mountain Lion et le plantage récent de mon MacBook Pro professionnel ont achevé de me convaincre.
