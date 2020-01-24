---
title:      "En attendant Windows Vista, la version 3.0 du framework .NET donne plus de visibilité à WinFX"
date: 2006-06-21 12:00:00 +02:00
lang:       fr
tags:       [Microsoft, Windows]
---

*Article initialement publié dans [le weblog de Clever Age](http://www.clever-age.com/veille/weblog/attendant-windows-vista-version-3-dot-0-du-framework-dot-net-donne-plus-visibilite-winfx-512.html).*

Ayant déjà pris plusieurs fois du retard, la sortie de [Windows Vista](http://www.microsoft.com/windowsvista/) se précise néanmoins, au travers notamment de la mise à disposition anticipée de plusieurs de ses composants techniques.

Suite au succès de [l'équivalent aux Etats-Unis](http://www.microsoft.com/events/mix/) sur trois jours, Microsoft France a décidé de faire de même en France sur une journée avec le [MIX 06](http://www.microsoft.com/france/msdn/mix/), le 27 avril dernier au théâtre Marigny[^1]. Steve Balmer était invité à animer une partie du show, centré sur la vision de Microsoft du Web du futur, du fameux (fumeux ?) [Web 2.0](http://www.clever-age.com/veille/weblog/internet-2-dot-0-459.html).

Orientée principalement vers les décideurs plutôt que vers les développeurs, cette manifestation a été l'occasion de s'ennuyer pas mal lors de présentations plus pénibles qu'intéressantes[^2], mais aussi de découvrir certains composants majeurs de la future plateforme Microsoft.

## Le futur de la plateforme Microsoft se nommait alors WinFX…

On a notamment pu voir au cours de l'intervention de Steve Balmer une [présentation épatante d'un prototype](http://microsoft.brainsonic.com/customers/microsoft/20060427/Steve_Ballmer_VO/files/demo.htm?Media=5) réalisé conjointement par EMAP France[^3] et Microsoft France pour démontrer la richesse de la partie Windows Presentation Foundation (WPF pour les intimes, ex « Avalon »). La richesse des interfaces obtenues permet d'envisager des ergonomies très novatrices et intuitives.

On a aussi pu voir une tentative [^4] de mettre en évidence les capacités de la brique Windows Communication Foundation (WCF, ex « Indigo ») pour assurer une bonne qualité de service avec SOAP et les extensions WS-Reliability.

On n'a par contre pas vu ni réellement entendu parlé de [Windows Workflow Foundation](http://www.workflow-foundation.com/) ([WF, et non WWF, attention !](http://www.theserverside.net/tt/cartoons/WWFDating/WWFDating.jpg)), qui est pourtant un composant qui risque de se retrouver dans la plupart des applications Microsoft, dont Office 2007, Sharepoint Portal et BizTalk, la gestion de workflows documentaires et de processus devenant native sur la plateforme.

On a par contre pu voir une démo — peu convaincante elle aussi — de la nouvelle gamme d'outils [Expression](http://www.microsoft.com/products/expression/en/default.mspx), censée notamment concurrencer Dreamweaver et faciliter le partage des tâches entre designers et développeurs.

Finalement, l'une des interventions les plus intéressantes aura été la présentation de la [syndication RSS/Atom](http://blogs.microsoft.fr/clauer/archive/2006/05/18/29178.aspx) par Christophe Lauer, sur un mode très singulier inspiré de Dick Hardt[^5]. Cette syndication sera elle aussi prise en charge nativement par la plateforme [Windows RSS Platform](http://sessions.mix06.com/view.asp?sessionChoice=2000&disc=&pid=BTB033&yearChoice=2005)[^6], et intégrée notamment à Internet Explorer 7.

D'autres présentations et démonstrations ont eu lieu sur le nouveau MSN, les différents services « Microsoft Live », le framework Ajax ATLAS et la dernière version de Messenger…

##…et s'appelle maintenant .NET 3.0 !

Jusqu'à présent, tous ces éléments de WinFX étaient présentés comme des composants supplémentaires à déployer sur le framework .NET 2.0, mais cet ensemble framework .NET 2.0 + WinFX est maintenant appelé framework [.NET 3.0](http://blogs.microsoft.fr/clauer/archive/2006/06/10/33203.aspx). On garde tout ce qu'il y a dans le 2.0, y compris le moteur d'exécution — la *Common Language Runtime* --, on saupoudre de quelques gros composants supplémentaires, et on dit que c'est une évolution majeure du framework. Un peu exagéré, il me semble, mais que ne ferait-on pas pour faire parler de soi…

En gros, si vous arrivez à suivre les vraies évolutions techniques de la plateforme Microsoft sans succomber aux attaques de son marketing, bravo !

Il reste que ces nouveaux composants sont réellement intéressants, et Microsoft a pris la bonne habitude de proposer au téléchargement des pré versions, donc il n'y a plus qu'à se lancer ![^7]

[^1]: Voir le compte rendu de [Frédéric Marty](http://www.damienanfroy.net/index.php?2006/05/02/40-compte-rendu-du-mix06-paris) , et si vous avez le temps [les webcast mis à disposition par Microsoft](http://www.microsoft.com/france/msdn/mix/webcast.mspx)

[^2]: Dédicace spéciale à Michel Meyer (fondateur de The (Virtual) Baguette et Multimania) et Pierre Chappaz (fondateur de Kelkoo) qui sont plus venus faire leur propre promo qu'autre chose

[^3]: Qui passe actuellement [dans les mains de Silvio Berlusconi](http://bourse.tf1.fr/detail_actualite.phtml?news=3508959) !

[^4]: Tentative pas très réussie, mais il faut avouer qu'il est difficile de montrer ce genre de chose, surtout à un public constitué à 60% de non techniciens

[^5]: Voir cette épatante présentation [Identity 2.0](http://www.identity20.com/media/OSCON2005/)

[^6]: Qui intègre la gestion des flux Atom malgré son nom…

[^7]: Nous allons notamment vous reparler ultérieurement de Windows Workflow Foundation, que nous allons comparer à d'autres solutions de Workflow
