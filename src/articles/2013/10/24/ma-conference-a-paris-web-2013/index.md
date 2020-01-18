---
title:      Ma conférence à Paris Web 2013
date: 2013-10-24 12:00:00 +02:00
lang:       fr
tags:       [Paris Web, conference, RWD, em]
poster:     nicolas_hoizey_-_paris_web_2013_-_photo_par_fabrice_le_guernec_pour_paris_web.jpg
---

Après y avoir assisté plusieurs années en tant qu'auditeur, j'ai eu la joie — le privilège — d'être sélectionné parmi les orateurs de l'édition 2013. Sélectionné qui plus est avec un sujet plutôt pointu, sur une bonne pratique que tout le monde devrait appliquer depuis plus de 10 ans, mais qui est très largement sous estimée.

![](paris-web-2013-j-y-etais.jpg)

# Le *pitch*

Voici l'accroche que j'avais rédigée pour ma conférence, intitulée donc « Un petit pas pour l'em, un grand pas pour le Web », afin de la soumettre à l'équipe de Paris Web :

> Aujourd'hui, je parcours le Web principalement sur mon ordinateur portable, très souvent sur mon smartphone, parfois sur ma tablette et ma TV, et plutôt exceptionnellement sur ma liseuse. Ces différents appareils ont bien entendu des formats — paysage ou portrait — et tailles très différents, ce que les adeptes du *Responsive Web Design* ont bien intégré dans leur conception du Web.
>
> Mais ils ont aussi des tailles de base de police de caractère très différents —une échelle de 16 à 24px dans mon cas—, ce que presque tous les intégrateurs Web ignorent, ou choisissent d'ignorer pour se faciliter la tâche. Cela fait pourtant déjà quelque temps que l'on sait qu'il faut utiliser une unité proportionnelle et non fixe pour définir les hauteurs de texte, mais ce n'est que trop peu appliqué, les intégrateurs refusant souvent de [lâcher prise](/2013/03/lachez-prise.html).
>
> L'étape suivante, qui devrait être un enchainement naturel —mais pose plus de contraintes—, est d'utiliser ces mêmes unités pour d'autres dimensions, notamment les largeurs de « boîtes » et les seuils de Media Queries.
>
> L'objectif de cette conférence est d'illustrer les avantages et inconvénients d'une telle intégration complètement élastique, en espérant convaincre que les uns l'emportent suffisamment sur les autres pour améliorer notre pratique de l'intégration Web.

# Bilan de ma prestation

Bien entendu stressé jusqu'à la dernière seconde avant de monter sur scène, avec des slides modifiés — pour améliorer la conclusion notamment — encore une heure avant, je suis très satisfait du résultat.

J'ai réussi à faire passer mon message, j'ai tenu pile poil mon *timing*[^1].

Les retours que l'on m'a fait de vive voix ou que j'ai pu lire dans différents blogs semblent montrer non seulement que cette conférence était utile, mais qu'en plus elle a été appréciée tant sur le fond que sur la forme.

Certains m'ont dit dans les jours qui ont suivi avoir déjà commencé à modifier leurs CSS pour adopter l'`em` plutôt que les `px` !

Il me reste à répondre plus complètement à une question que j'ai évoquée dans ma conférence, et sur laquelle [les discussions reviennent régulièrement](http://marieguillaumet.com/refonte-mon-portfolio-du-responsive-en-em-seconde-partie/#comment-3209) depuis : pourquoi utiliser `em` plutôt que `rem` ?

Je vais rédiger dans les prochaines semaines une version détaillée de ma conférence, et j'ai prévu d'approfondir ce sujet pour donner mon point de vue[^2].

![](nicolas_hoizey_-_paris_web_2013_-_photo_par_fabrice_le_guernec_pour_paris_web.jpg "Nicolas Hoizey à Paris Web 2013. [Photo](https://www.flickr.com/photos/parisweb/10401233525/) de [Fabrice Le Guernec](http://twitter.com/Fab_incident) pour Paris-Web")

# Je n'aurais pas pu faire ça tout seul

Je tiens à remercier tous ceux qui m'ont aidé dans la préparation de cette conférence.

Je commence bien sûr par [Marie](http://marieguillaumet.com/), qui n'a pas flanché quand je lui ai suggéré sur un projet de revoir certaines de ses pratiques d'intégration, pour passer des `px` aux `em`, défit relevé haut la main au point d'adopter à son tour ce principe comme la meilleure façon de procéder, et de pousser le sujet dans ses derniers retranchements pour l'intégration de son [#PortfolioOfDoom](http://marieguillaumet.com/tag/portfolioofdoom/)[^3]. Ce n'est pas pour rien que je l'ai citée plusieurs fois dans ma conférence.

[Vincent](http://vincent-valentin.name/) ensuite, qui m'a fait découvrir petit à petit les merveilles des [grilles typographiques](http://fr.clever-age.com/veille/blog/introduction-aux-grilles-typographiques.html), avec lequel j'ai échangé à plusieurs reprises sur l'intérêt de l'approche élastique — en `em` donc — pour le Responsive Web Design, et qui a conçu pour [Clever Age](http://www.clever-age.com/) le [framework d'intégration Outline](https://github.com/htmlzengarden/outline) qui permet maintenant de faciliter et garantir un niveau de qualité exemplaire sur ce type de réalisation.

[Stéphane](http://nota-bene.org/) enfin, inspiration sans faille de longue date sur tout ce qui touche à la qualité sur le Web, tant dans les contenus que les contenants, qui a réussi la prouesse de me faire douter de la pertinence de mon sujet, puis de me donner les billes pour prouver qu'il était bien pertinent. Un sacré farceur.

J'ai la chance de travailler avec ces trois là, et d'autres tout aussi talentueux et curieux, un environnement très propice à l'amélioration constante de nos pratiques, à mi chemin entre l'expérimentation pointue sur les techniques les plus modernes et le respect pragmatique des contraintes du monde réel.

# Voir ou revoir la conférence

La vidéo de ma prestation a été publiée par Paris Web sur son compte Vimeo :

{% vimeo 79204119 %}

Voici [la version de mes slides hébergée sur SlideShare](https://fr.slideshare.net/nhoizey/paris-web-2013-un-petit-pas-pour-lem-un-grand-pas-pour-le-web), donc sans les animations qui ne sont visibles qu'en vidéo :

<div class="ratio-4-3 embed-video-container">
<iframe src="//fr.slideshare.net/slideshow/embed_code/key/v16thp4qiLTOXH" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>
</div>

Vous pouvez préférer [la version de mes slides hébergée sur Speaker Deck](https://speakerdeck.com/nhoizey/un-petit-pas-pour-lem-un-grand-pas-pour-le-web-paris-web-2013) :

<script async class="speakerdeck-embed" data-id="e7c0142013ec01312783065ca157100a" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

Voici également [la version de mes slides hébergée sur Notist](https://noti.st/nhoizey/HDbr1q/un-petit-pas-pour-l-em-un-grand-pas-pour-le-web).

Vous pouvez aussi bien sûr retrouver toutes les vidéos, notes et compte-rendus de Paris Web 2013 et ma conférence sur [la page que Lanyrd lui consacre](http://lanyrd.com/2013/parisweb/sckdfg/).

[^1]: Avec plus de 100 slides pour 45 minutes et aucune répétition, je remercie mes années d'expérience en conférences et formations…

[^2]: De normand, donc en gros « ça dépend », cela va de soi.

[^3]: Je vous conseille vraiment de lire et relire sa série de billets sur cette refonte, il y a plein de bonnes recettes à apprendre.
