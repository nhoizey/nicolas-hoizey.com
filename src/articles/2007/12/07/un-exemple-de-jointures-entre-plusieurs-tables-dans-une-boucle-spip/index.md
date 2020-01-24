--- 
title:      Un exemple de jointures entre plusieurs tables dans une boucle SPIP 
date: 2007-12-07 12:00:00 +02:00
lang:       fr 
tags:       [SPIP]
---

Les [jointures](http://www.spip.net/fr_article3368.html) sont disponibles depuis quelque temps dans SPIP, mais tout comme plein de nouveautés des dernières versions, je n'y avait pas encore goûté. C'est maintenant fait, et aux quelques errements initiaux près, c'est vraiment à connaitre. Voici un exemple très concret.

Utilisant le [plugin Agenda](http://www.spip-contrib.net/Plugin-Agenda) pour gérer des événements[^1], j'ai eu besoin de lister chronologiquement les événements rattachés à des articles ayant un mot clef particulier.

Le code du squelette aurait été beaucoup plus simple si les mots clefs étaient rattachés directement aux événements, mais je préfère largement attacher les mots clefs aux articles, l'ajout aux événements étant laborieux.

Le problème, donc, est de lister `{par date}` des `(EVENEMENTS)` liés à des `(ARTICLES)` qui ont au moins un mot clef avec `{id_mot=3}`.

La technique traditionnelle serait de faire une boucle `(ARTICLES)` pour filtrer selon le mot clef, puis dans son corps une boucle sur les `(EVENEMENTS)` de chaque article.

Malheureusement, cela ne permet pas un classement `{par date}` de l'ensemble des `(EVENEMENTS)`, mais seulement article par article.

C'est là que les jointures arrivent à la rescousse. L'idée est donc de faire une unique boucle, qui porte sur deux sources de données, les `(ARTICLES)` et les `(EVENEMENTS)`, le lien étant l'`id_article`.

Voici ce que cela donne pour lister des événements passés rattachés aux articles de la rubrique courante ayant un mot clef avec `{id_mot=3}` :

```
<BOUCLE_evenements(EVENEMENTS articles mots_articles){par date}{inverse}{id_rubrique}{id_mot=3}{age>0}>
  <li>[(#DATE_DEBUT|affdate{'d/m/Y'})]</li>
</BOUCLE_evenements>
```

Il faut tester différentes syntaxes pour arriver au résultat, mais globalement, quelques règles découvertes sur le tas peuvent aider :

- La première donnée peut être identifiée par son *alias*, mais les autres doivent être identifiées par leur nom de table, hors préfixe
- Il semble que le compilateur de SPIP comprend bien que l'age demandé est celui des `(EVENEMENTS)` et non celui des `(ARTICLES)`, sans doute parce que les `(EVENEMENTS)` sont l'élément principal de la boucle
- Alors que le critère `{id_mot=3}` fonctionne sur une boucle `(ARTICLES)`, il ne fonctionne pas sur la table `articles`, d'où nécessité d'ajouter la seconde jointure sur la table `mots_articles`

A vous de tester !

[^1]: En remplacement de [mon vieil agenda](/2005/11/la-fin-de-l-agenda-gastero-prod.html) développé il y a quelques années
