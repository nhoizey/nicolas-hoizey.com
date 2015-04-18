---
title:      À propos de ce site
layout:			page
---

## L'auteur

Je m'appelle Nicolas Hoizey.

Je suis passionné par le Web depuis que je l'ai découvert en 1996, durant mes études supérieures à l'École Internationale des Siences du Traitement de l'Information ([EISTI](https://www.eisti.fr/)). J'ai donc naturellement créé de nombreux sites au fil des années[^sites], autant de prétextes à explorer les nouveautés technologiques des standads du Web.

[^sites]: [Ciné Files](http://back-to-1998.gasteroprod.com/) par exemple en 1998…

Toujours soucieux de qualité, j'ai participé très rapidement au beau projet [Opquast](http://opquast.com/fr/), un référenciel de qualité pour le Web. Je participe aussi régulièrement, parfois même en tant qu'orateur, à de belles conférences telles que [Paris Web](https://www.paris-web.fr/).

Hors Web, je suis aussi passionné de photo. Mon portfolio s'intitule [Photo Synthèse](http://photosynthese.net), mais vous pouvez aussi retrouver mes photos sur les sites de partage [500px](https://500px.com/nhoizey/) et [Flickr](https://www.flickr.com/photos/nicolas-hoizey/), ou sur [ma page Facebook](https://www.facebook.com/photo.synthese.nicolas.hoizey). J'ai aussi intégré l'équipe de [Phototrend](http://phototrend.fr/author/nicolas-hoizey/), où je publie des tests de matériels et logiciels, ainsi que des actus du monde de la photo.

À titre professionnel, je suis co-fondateur et directeur de l'innovation de [Clever Age](http://www.clever-age.com/).

## Les contenus

Ce site personnel est essentiellement un blog, dans lequel je publie mes réflexions et retours d'expériences sur des sujets très variés, dominés par les technologies et usages du Web, et la photographie.

## La technique

### Le statique, c'est fantastique

Ce site est statique, c'est à dire que les pages et leurs contenus venant du même domaine sont envoyées tel quel par le serveur, sans aucune création à la volée.

Tout le site est généré par [Jekyll](http://jekyllrb.com/) à partir de documents rédigés en syntaxe [Markdown](http://fr.wikipedia.org/wiki/Markdown)[^kramdown].

[^kramdown]: ou plutôt en [Kramdown](http://kramdown.gettalong.org/), une variante plus sympa permettant notamment cette note de bas de page, mais c'est un détail.

Les ressources externes sont principalement :

- les *players* de vidéos, dont Youtube, Vimeo ou Dailymotion
- les *widgets* de certains services, dont Ulule
- Google Analytics, pour savoir un peu ce qu'il se passe sur le site

Dans la mesure du possible, les ressources externes sont chargées en asynchrone pour ne pas pénaliser votre navigation, voire même uniquement à la demande, comme c'est le cas des vidéos Youtube.
