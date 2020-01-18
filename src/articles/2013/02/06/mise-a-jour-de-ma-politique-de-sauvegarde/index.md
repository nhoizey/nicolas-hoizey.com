---
title:      Mise à jour de ma politique de sauvegarde
date: 2013-02-06 12:00:00 +02:00
lang:       fr
tags:       [backup, CrashPlan, Drobo]
---

Je profite d'[un nouveau billet d'Éric sur le sujet](http://n.survol.fr/n/aujourdhui-cest-encore-backup-day) pour mettre un peu à jour ce que je disais il y a 6 mois dans mon billet «[Le Backup Day, c'est tous les jours !](/2012/08/le-backup-day-c-est-tous-les-jours.html)».

Je ne vais pas pouvoir l'aider sur sa recherche de solution « sans y mettre des sommes folles », mais ma configuration peut être intéressante tout de même :

J'ai donc un Mac mini avec [CrashPlan](http://crashplan.com/) qui sert d'une part, comme je l'envisageais il y a 6 mois, de destination de backup pour tous mes autres ordinateurs, et est d'autre part lui-même[^1] backupé sur [CrashPlan+](http://www.crashplan.com/consumer/crashplan-plus.html).
![](drobo-s.png)Le stockage sur le mini n'est pas suffisant pour recevoir les backups de tous mes ordinateurs, donc j'ai un [Drobo S de Data Robotics](http://www.amazon.fr/gp/product/B001CSZMRK/ref=as_li_ss_tl?ie=UTF8&camp=1642&creative=19458&creativeASIN=B001CSZMRK&linkCode=as2&tag=gasteroprod-21) connecté dessus en Firewire 800. Il contient 5 disques de 2 To et est configuré avec 2 disques de fail over pour être un peu plus sûr de ne pas avoir de problème.

J'ai par contre fait l'erreur d'acheter les 5 disques dans la même série, je m'en suis rendu compte trop tard, donc si l'un flanche à cause d'un problème de conception ou construction, la série risque de faire de même dans la foulée.

En tout cas, j'ai déjà eu une défaillance d'un disque, et j'ai eu le plaisir de constater que l'alerte était donnée rapidement, et que la reconstruction du RAID après remplacement du disque s'est faite de façon totalement transparente, sans empêcher l'accès au disque.

Autre point important, les services après vente de CrashPlan et Drobo sont exemplaires, j'ai eu à faire avec les deux à quelques semaines d’intervalle, et ils ont été tout aussi réactifs, pertinents et efficaces. Cela compte aussi beaucoup.

[^1]: Ainsi qu'un disque externe USB supplémentaire, mais là n'est pas la question.
