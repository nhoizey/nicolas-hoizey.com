---
title:      Yahoo va fermer Pipes, et je suis bien malheureux
date: 2015-06-09 12:00:00 +02:00
lang:        fr
tags:       [Yahoo, feed, Pinboard]
---

[Yahoo a annoncé](http://pipes.yqlblog.net/post/120705592639/pipes-end-of-life-announcement) la fermeture prochaine de son service [Yahoo Pipes](http://pipes.yahoo.com/), que j'utilise au quotidien depuis 2007. Comment vais-je faire ?

Entendons-nous bien, Yahoo Pipes bosse pour moi au quotidien, mais je ne vais dans son interface que de temps à autre, pour modifier un *Pipe* existant ou en créer un nouveau.

# Un exemple

Voici [un exemple de *Pipe*](http://pipes.yahoo.com/pipes/pipe.edit?_id=bfe78fd60a9e342daa10715d03b51584), qui me permet de publier [de jolis tweets](https://twitter.com/nhoizey/status/605637245945675776) pour [mes bookmarks Pinboard](/tags/pinboard/) destinés aux [CleverMarks](https://twitter.com/CleverMarks) :

![](yahoo-pipes-pinboard-twitter.png "Vue graphique d'un *Pipe* de transformation de flux RSS")

Plus exactement, ce *Pipe* transforme le flux RSS fourni par Pinboard en un autre branché dans [IFTTT](https://ifttt.com/) pour alimenter [Buffer](https://buffer.com/), qui va lui poster le tweet. Compliqué ? Un peu, mais si utile.

Par exemple, [ce bookmark](https://pinboard.in/u:nhoizey/b:602669af0bcf) :

![](pinboard-bookmark.png "Un bookmark dans Pinboard")

…va devenir ce tweet, sans aucune action de ma part :

https://twitter.com/nhoizey/status/606834636120072192

# Et maintenant ?

Avec la disparition de Yahoo Pipes, j'ai plusieurs constructions de flux qui ne fonctionneront plus.

Pour certaines assez simples, je pourrais bien entendu faire un petit développement spécifique auto-hébergé, mais c'est laborieux et cela nécessite de la maintenance.

Nico m'a signalé via Twitter une solution potentielle, nécessitant un hébergement Node.JS, il faut que je creuse…

https://twitter.com/nsteinmetz/status/607081632827351040
