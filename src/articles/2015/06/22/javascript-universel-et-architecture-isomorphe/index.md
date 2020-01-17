---
title: JavaScript universel et architecture isomorphe
date: 2015-06-22 12:00:00 +02:00
lang:  fr
tags:  [JavaScript]
---

On parle depuis quelque temps de « JavaScript isomorphe » pour décrire des architectures Web dans lesquelles on abandonne les principes historiques des Single Page Applications composées de coquilles HTML vides et moult JavaScript pour les remplir. Le JavaScript isomorphe a plutôt comme principe de produire des pages HTML pleinement fonctionnelles dès la sortie du serveur, mais chargeant elles aussi moult JavaScript pour prendre le relai —si possible— afin d'améliorer l'expérience utilisateur. Je propose que l'on parle d'« architecture isomorphe », une implémentation possible étant en « JavaScript universel ».

[^deja]: Déjà vieux ?!

# Architecture isomorphe…

Ma compréhension de l'isomorphe est donc de promouvoir un fonctionnement identique d'un site Web, que la page soit générée par le serveur ou par le client, y compris au cours de la navigation, des interactions.

Cela permet notamment de répondre à des problématiques :

- de SEO, puisque c'est du HTML complet qui est envoyé au navigateur — ou robot d'indexation — et non un fragment de HTML nécessitant l'exécution de JavaScript pour récupérer du contenu et l'afficher[^google]
- de performance de chargement de la première page visitée, qui peut ainsi s'afficher beaucoup plus vite, et laisser le navigateur optimiser lui-même le chargement des ressources liées
- d'accessibilité, pour [les utilisateurs qui n'ont pas JavaScript, pour de multiples raisons que l'on a trop tendance à oublier](http://christianheilmann.com/2011/12/06/that-javascript-not-available-case/)

[^google]: Même si [Google exécute maintenant le JavaScript des pages](http://googlewebmastercentral.blogspot.com.es/2014/05/understanding-web-pages-better.html) pour améliorer le référencement naturel des pages qui en (ab)usent…

Autant dire que c'est nécessaire.

Mais cela ne nécessite pas du tout JavaScript côté serveur, il est tout à fait possible de développer dans n'importe quel langage serveur et faire tout de même de l'isomorphe.

# …et JavaScript universel

Il est cependant assez évident que pouvoir partager du code entre les deux implémentations, client et serveur, qui doivent permettre les mêmes fonctionnalités, est séduisant.

« Universel » est sans doute un terme trop fort, avec des implications énormes, mais c'est la [traduction litérale de cette proposition de Michael Jackson](https://medium.com/@mjackson/universal-javascript-4761051b7ae9)[^mj]. Universel  pour dire que c'est le même code, ou à peu de choses près, qui peut fonctionner côté serveur comme côté client.

[^mj]: On ne rigole pas.

Je ne suis pas fan du terme « portable » proposé par Joseph dans son billet « [Isomorphe ou Portable ?](https://joseph-silvestre38.cozycloud.cc/public/blog/isomorphe-ou-portable/) » suite à un échange sur Twitter, je le trouve trop vague. Un code JavaScript qui fonctionne bien sur tous les navigateurs ne peut-il pas prétendre à cette appellation ?

J'aimerais donc bien que l'on trouve un terme différent d'« universel », représentant mieux cette dualité client/serveur, mais je ne voudrais pas noyer encore le sujet dans une rhétorique contre productive. Je me permets juste de retirer la majuscule, n'abusons pas.
