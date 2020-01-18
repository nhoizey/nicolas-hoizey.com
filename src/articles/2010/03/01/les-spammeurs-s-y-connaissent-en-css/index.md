---
title:      Les spammeurs s'y connaissent en CSS
date: 2010-03-01 12:00:00 +02:00
lang:       fr
tags:       [spam, CSS]
---

Un p'tit malin qui se fait appeler Sylvain a laissé un commentaire très sympathique sur [mon billet précédent](/2010/02/tumblr-aime-mes-meduses.html). Mais il a aussi glissé subrepticement un lien vers un site de *poker fashion*…

Voilà à quoi ressemblait le commentaire avant que je le retire :

![](gp-spam.png)

C'est la flèche orange sous le texte —indiquant normalement un lien vers un autre site— qui m'a mis la puce à l'oreille, et après vérification, il y a bien un tel lien, vers un site marchand.

Ce petit malin de Sylvain a cru me duper, et ainsi gagner facilement du référencement avec un nouveau lien entrant, en masquant son lien avec un peu de CSS[^1] :

![](gp-spam-code.png)

Dommage pour lui, pris sur le fait !

[^1]: Le `<span class="sprite"></span>` est de moi, c'est lui qui permet l'affichage de la flèche.
