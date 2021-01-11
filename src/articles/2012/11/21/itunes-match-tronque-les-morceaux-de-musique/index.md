---
title:      iTunes Match tronque les morceaux de musique
date: 2012-11-21 12:00:00 +02:00
lang:       fr
tags:       [music, iTunes, Apple]
---

N'écoutant que rarement de la musique sur mon Mac, j'ai constaté sur mon vieil iPhone 3Gs que la lecture de certains morceaux de musique s'arrêtait soudainement, en plein milieu, pour passer au morceaux suivant. Sans avoir creusé plus que ça, j'étais alors convaincu que ce n'était qu'un symptôme supplémentaire de la vétusté de mon iPhone. Mais le changement d'iPhone n'a rien changé, et j'ai constaté hier le même problème sur le Mac. J'ai donc creusé un peu le sujet.

J'ai rapidement constaté que je suis loin d'être seul à avoir ce problème, de multiple discussions ayant été lancées sur le support Apple, dont une qui occupe déjà 17 pages de mécontents : «[itunes chopping off end of songs now that i signed up for match (en)](https://discussions.apple.com/message/16872529#16872529)».

Mon entourage[^1] est aussi touché, c'est donc bien relativement fréquent[^2] :

https://twitter.com/mauriz/status/270927112330952704

https://twitter.com/vlemaire/status/270970098213322752

En fouillant un peu[^3], on peut trouver un billet de Kirk McElhearn intitulé «[What’s Going On With Truncated iTunes Downloads? (en)](http://www.mcelhearn.com/2012/07/30/whats-going-on-with-truncated-itunes-downloads/)» avec quelques explications, et surtout un lien vers un script iTunes développé par Doug Adams[^4] permettant d'identifier les morceaux tronqués : «[Find Truncated Tracks (en)](http://dougscripts.com/itunes/2012/10/find-truncated-tracks/)».

Je vous laisse lire ses explications sur le fonctionnement du script, mais il faut juste retenir qu'il va parcourir une de vos *playlists* et mettre les morceaux tronqués dans une nouvelle *playlist* nommée «*_Truncated Tracks*».

Ensuite, la méthode recommandée sur le support Apple[^5] est de supprimer ces morceaux de votre iTunes — mais surtout pas de iTunes Match — puis de les télécharger à nouveau.

Pour supprimer un morceau depuis une *playlist*, il ne suffit pas de presser la touche <kbd>Suppr</kbd> qui va juste supprimer le morceau de la playlist. La page des [raccourcis clavier iTunes](http://www.apple.com/fr/itunes/how-to/shortcuts.html) proposée par Apple indique qu'il faut presser <kbd>Option</kbd> et <kbd>Suppr</kbd> en même temps.

J'espère que iTunes / iTunes Match sera corrigé pour détecter automatiquement ces morceaux tronqués et les télécharger intégralement…

[^1]: Puis-je encore dire que ma communauté ego centrée de followers Twitter fait partie de «mon entourage» ? 😉

[^2]: Saleté de widget Twitter qui inclus le tweet initial quand on veut afficher sa réponse, mais ne permet pas l'inverse !

[^3]: Bon, d'accord, en quelques millisecondes avec [une recherche sur Google](https://www.google.fr/search?q=itunes+match+truncated)…

[^4]: Son nombre préféré doit être 42…

[^5]: Pas par les gens d'Apple, qui ne semblent malheureusement pas être impliqués dans les discussions…
