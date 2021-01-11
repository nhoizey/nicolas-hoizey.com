---
title:      Nouvelle tempête sur les flux RSS, réduisons les intermédiaires !
date: 2008-09-26 12:00:00 +02:00
lang:       fr
tags:       [Google, feed, RSS, Yahoo, FeedBurner]
---

Alors que je me — et vous — demandais il y a quelque temps si je devais [faire du ménage dans mes flux](/2008/07/faut-il-que-je-revienne-a-un-unique-flux-rss.html), et que la migration de FeedBurner vers Google[^i1] ne semble pas bien se passer pour tout le monde[^i2], j'ai l'impression que mes flux disponibles via FeedBurner ont de plus en plus de hoquets.

[^i1]: Suite au [rachat](http://googleblog.blogspot.com/2007/06/adding-more-flare.html) il y a plus d'un an déjà.

[^i2]: C'est par exemple le cas de [Benoit Descary](http://descary.com/feedburner-integre-a-google-rien-ne-va-plus/), mais [les problèmes sont récurrents](http://groups.google.com/group/feedburner/web/known-issues-workarounds)…

Il y a quelques jours, c'est l'ensemble des items de mon flux complet qui reprenaient un statut « non lu » dans mon [NetNewsWire](http://www.newsgator.com/Individuals/NetNewsWire/)[^1]. Hier, deux anciens articles seulement redevenaient non lus.

Les URL de ces contenus — utilisées aussi comme guid — n'ayant à priori pas été modifiées, par quel mystère sont-il ressucités ?

Avez-vous aussi été témoins de ces problèmes ?

Vu que je suis aussi abonné au flux par mail auprès de FeedBurner[^2], je sais que le problème ne vient pas de mon client local NetNewsWire, c'est déjà ça.

Il reste donc deux maillons potentiellement faibles dans l'histoire, [Yahoo! Pipes](http://pipes.yahoo.com/) que j'utilise pour [agréger trois flux en un](/2008/02/avis-de-turbulences-dans-les-flux-rss-de-gastero-prod.html), et [FeedBurner](http://www.feedburner.com/) qui digère (presque) tous mes flux pour vous les distribuer.

# Yahoo! Pipes

Cela fait déjà pas mal de temps que je veux me passer de Yahoo! Pipes, mon vaillant petit [SPIP](http://www.spip.net/) pouvant faire la même chose en mieux. L'expérimentation a été amusante, mais présente au final plus de défauts que d'avantages. Yahoo! Pipes reste toujours très utile pour divers usages[^3], mais je vais m'en débarrasser pour mes flux RSS, c'est décidé.

# FeedBurner

La position de FeedBurner est plus délicate. J'y vois toujours deux gros intérêts, et m'en passer sera plus difficile.

D'une part, bien entendu, FeedBurner me fourni des statistiques d'abonnement aux flux. Rien de tel qu'un nombre d'abonnés dérisoire pour relativiser la pertinence d'un classement Wikio[^4] ! 😉

D'autre part, même si c'est une fonction à laquelle peu d'utilisateurs semblent penser, FeedBurner assure une fonction de proxy qui soulage énormément mon serveur[^5]. Certes, le nombre réduit d'abonnés ne doit pas générer un trafic délirant, mais je pari sans frémir qu'au moins les trois quarts des abonnés[^6] — volontairement ou en utilisant un mauvais client — ne respectent pas le TTL (*Time To Live*) que j'ai fixé dans mes flux à 60 minutes, et mettent ainsi en évidence la principale faiblesse de la syndication par *pull* qui sature tant les serveurs fournissant les contenus que les bandes passantes. Ce qui me rappelle au passage que je voulais mettre en place une syndication en *push* par XMPP[^jabber].

[^jabber]: [Jabber, Inc. a été racheté ces derniers jours par Cisco](http://newsroom.cisco.com/dlls/2008/corp_091908.html), tiens.

Autre problème de FeedBurner, c'est que les URL des flux changent suite au rachat par Google, mais je n'ai pas encore regardé si les anciennes URL seront tout de même conservées pour ne pas dérouter les utilisateurs. Pour l'instant, c'est dommage, la redirection est indiquée comme temporaire (code 302) et non permanente (code 301), donc les clients ne vont pas se mettre à jour…

![](feedburner-to-google-302.png)

Il se pourrait que je continue à utiliser ce service en migrant vers Google, mais en passant au passage à des [adresses de flux avec mon propre nom de domaine](http://lapin-blanc.net/30/03/2008/feedburner-votre-nom-domaine/).

Je vais aussi sans doute réduire le nombre de flux pour encore plus simplifier et arrêter d'embêter mes lecteurs avec des choix à faire.

Enfin bref, si vous avez une solution plus pertinente à me proposer pour remplacer les statistiques et la partie proxy fournies par FeedBurner, je suis preneur !

[^1]: Oui, je suis abonné à mes propres flux pour contrôler qu'ils fonctionnent bien, et j'en connais qui devraient faire de même…

[^2]: Deux précautions valent mieux qu'une…

[^3]: Allez donc voir [mes Yahoo! Pipes](http://pipes.yahoo.com/nicolashoizey).

[^4]: Je compte faire un billet sur le sujet prochainement.

[^5]: Ou plutôt mes parts de serveur, chez Gandi

[^6]: Et je suis gentil !
