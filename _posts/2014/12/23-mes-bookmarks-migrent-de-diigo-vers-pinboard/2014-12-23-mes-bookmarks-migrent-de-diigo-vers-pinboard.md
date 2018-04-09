---
title:      Mes bookmarks migrent de Diigo vers Pinboard
lang:       fr
tags:       [bookmarks, Diigo, Pinboard]
---

Diigo a décidé de supprimer les listes, si pratiques pour rassembler des bookmarks par thématiques ou destinations de redistribution — j'en utilise une pour les [CleverMarks](http://twitter.com/CleverMarks) par exemple — sans « polluer » les tags, au profit d'une nouvelle fonctionnalité [Outliner](http://blog.diigo.com/2014/12/04/meet-diigo-outliner-the-best-way-to-structurally-organize-your-information-and-thoughts/), bien plus proche d'un outil de prise de notes comme Evernote que d'un outil de bookmarking social. Du coup je m'en vais voir ailleurs si l'herbe est plus verte.

Ce n'est en fait que la goutte qui fait déborder le vase[^1], je trouvais déjà Diigo de plus en plus pénible à utiliser, avec une interface pas du tout ergonomique.

{% cloudinary diigo.png caption="L'interface de Diigo" %}

Après avoir échangé un peu avec d'autres utilisateurs déçus de Diigo, j'ai décidé de tenter cette nouvelle aventure avec le service Pinboard :

- Même s'il n'y a pas les listes que j'aimais dans Diigo, il y a [tout ce qu'il me faut](https://pinboard.in/tour/) par ailleurs, et même plus, dans une solution toujours activement développée, là où Delicious paraît beaucoup à l'abandon[^2]
- Il y a notamment une gestion de bundles de tags, fonction que j'attendais sur Diigo depuis des années sans l'avoir jamais vue venir
- L'interface est extrêmement sobre[^3]
- C'est payant, donc je suis sans doute un peu moins le produit
- Le support est intégré à [Tweetbot](http://tapbots.com/software/tweetbot/), mon client Twitter favori sur iOS et Mac OS, même si je n'ai pas encore décidé si je garde [Pocket](http://getpocket.com/) ou passe là aussi à Pinboard pour mes —nombreuses— lectures en attente
- Le support est intégré à [ReadKit](http://readkitapp.com/), mon client pour les flux RSS et Pocket sur Mac OS
- Karl m'en a dit beaucoup de bien plusieurs fois, et ça compte beaucoup

{% cloudinary pinboard.png caption="L'interface de Pinboard" %}

Vous pouvez bien sûr continuer à lire aussi mes bookmarks [sur Seenthis](http://seenthis.net/people/nhoizey), même si pour l'instant [les tags présents dans le flux RSS de Pinboard ne sont pas bien reconnus](http://seenthis.net/messages/324311).

{% cloudinary seenthis.png caption="L'interface de Seenthis" %}

**Mise à jour du 24 décembre :**

# Concernant le soucis avec Seenthis

Il semble que cela vienne du flux RSS de Pinboard qui mélange tous les tags dans une unique balise ```dc:subject```, je suis donc repassé à Diigo pour le flux RSS qui alimente Seenthis, Diigo étant lui-même alimenté par Pinboard via [IFTTT](https://ifttt.com/).

Voici la *recipe* IFTTT, au cas où vous voudriez faire de même :

<a href="https://ifttt.com/view_embed_recipe/232495-copy-every-new-pinboard-bookmark-to-diigo" target = "_blank" class="embed_recipe embed_recipe-l_41" id= "embed_recipe-232495"><img src= 'https://ifttt.com/recipe_embed_img/232495' alt="IFTTT Recipe: Copy every new Pinboard bookmark to Diigo connects pinboard to diigo" width="370px" style="max-width:100%"/></a><script async type="text/javascript" src= "https://ifttt.com/assets/embed_recipe.js"></script>

# Souci supplémentaire : plus de participation au groupe Web Performance sur Diigo

Mon départ de Diigo m'empêche de fait de participer au [groupe de veille Web Performance](https://groups.diigo.com/group/web-performance) créé par [Éric](https://www.diigo.com/profile/edaspet) et alimenté par une quinzaine de contributeurs.

{% cloudinary diigo-web-performance.png caption="Le groupe Web Performance sur Diigo" %}

Même en étant utilisateur de Diigo, j'ai toujours trouvé dommage de lier cet espace de veille et partage à un outil particulier, mon départ me confirme l'intérêt qu'il y aurait à avoir un espace indépendant qui agrège les flux de chacun, comme nous le faisons chez [Clever Age](http://clever-age.com/) avec les [Clever Marks](http://fr.clever-age.com/veille/clever-marks/).

[^1]: J'avais été invité à tester une beta privée il y a quelques mois, j'avais dit tout le mal que je pensais de ce changement, mais bon…

[^2]: La page permettant d'importer des bookmarks en masse liée sur [cette page](https://delicious.com/settings/manage) en en erreur 502…

[^3]: Bon, OK, parfois un peu trop, avec un abus de liens où des boutons seraient parfois plus pertinents…
