--- 
title:      "Des Gravatars avec SPIP" 
date: 2005-01-05 12:00:00 +02:00
lang:       fr 
tags:       [SPIP]
---

Nouvelle invention destinée aux blogs, le principe des gravatars n'est en fait qu'une adaptation des avatars des forums, mais globalisés. Voilà comment je les ai mis en place sur SPIP pour Gastero Prod.

## Petite présentation préliminaire

Les gravatars[^t1] sont littéralement des *avatars reconnus globalement*. Il s'agit en fait d'avatars créés sur un site unique, le bien nommé [gravatar.com](http://www.gravatar.com/) créé par [Tom Werner](http://www.mojombo.com/archives/000054.html), et utilisés par les sites pour afficher un avatar en fonction de l'adresse e-mail de l'internaute qui a posté un message.

Par exemple, si je créé un gravatar associé à mon adresse e-mail, et que j'utilise cette adresse pour poster des messages dans des blogs qui supportent ce système, mon avatar unique sera automatiquement affiché à côté de mon message.

Voyez par exemple les commentaires de l'article «<428>» :

![](gravatars.png)

Heureusement, il n'est pas possible de venir ainsi poluer tous les blogs avec des images sentencieuses, Tom Werner modère lui-même tous les avatars proposés[^t2] et leur affecte une [classification](http://www.gravatar.com/rating.php) similaire à celle des films aux Etats-Unis. Il est alors possible de spécifier quel niveau de tolérance on accepte pour les gravatars à afficher sur son propre site[^t3].

Le principal défaut que l'on peut reprocher aux gravatars, c'est que s'il y en a beaucoup à afficher sur une unique page, le temps de chargement est augmenté d'autant, comme par exemple chez [Jon Hicks](http://www.hicksdesign.co.uk/journal/631/)…

Je ne pense pas avoir un jour ce problème sur Gastero Prod, ou alors il sera de toute façon possible de retirer la fonctionnalité, donc je me suis lancé.

## Un peu de développement…

L'idée est donc de mettre en place le support des gravatars dans SPIP pour ce site Gastero Prod avec un peu de code PHP. Heureusement, cela n'a vraiment rien de compliqué.

Des choses ont déjà été faites, d'une part [sur le site gravatar.com](http://www.gravatar.com/implement.php#section_3_1) lui-même, mais aussi surtout par Richard Rutter, de [clagnut](http://www.clagnut.com/), qui a proposé [un script PHP complet de gestion des gravatars](http://www.clagnut.com/blog/1317/).

## …mais pas trop quand même !

Cependant, j'ai choisi une approche encore plus simple, avec un petit [filtre SPIP](http://www.spip.net/fr_article901.html) `gravatar_url` ajouté au fichier `mes_fonctions.php3` :

```php
function gravatar_url($email = '')
{
    if ($email != '') {
        return 'http://www.gravatar.com/avatar.php?gravatar_id='.md5($email).'&size=42&rating=PG';
    } else {
        return '';
    }
}
```

Sur Gastero Prod, les commentaires sont gérés par des forums sur abonnement, donc je suis sûr de la présence et de la validité d'une adresse e-mail pour chaque message.

Dans le cas où aucun gravatar n'est disponible pour l'adresse donnée, gravatar.com renvoi une petite image transparente.

Voilà donc en substance comment j'exploite ce nouveau filtre :

```
<BOUCLE_forums(FORUMS){id_article}…>
  <img src="[(#EMAIL|gravatar_url)]" />
</BOUCLE_forums>
```

Vous verrez ça plus en détail directement dans mon squelette [article-forum.html](http://www.gasteroprod.com/design/article-forum.html).

[^t1]: Globally Recognized Avatars

[^t2]: Ce qui explique peut-être son absence de son propre blog depuis la création de ce service…

[^t3]: PG pour l'instant sur Gastero Prod
