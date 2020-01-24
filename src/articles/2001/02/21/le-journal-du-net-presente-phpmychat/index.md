---
title:      "Le Journal du Net présente phpMyChat !"
date: 2001-02-21 12:00:00 +02:00
lang:       fr
tags:       [me, development, PHP, phpHeaven, opensource, phpMyChat]
---

# phpMyChat : le chat en open source

![](jdnet_phpmychat.png "L'article dans le JdNet"){.onethird }

Il est possible de confier la mise en place d'un service de chat à un prestataire, mais il est aussi possible de le faire soi même, de nombreuses applications disponibles sur le net le permettant. C'est par exemple le cas de [phpMyChat](http://www.phpheaven.net/phpmychat:home), une application [PHP](http://www.php.net/) développée en open source par Nicolas Hoizey (qui travaille par ailleurs pour la web agency [SQLI](http://www.sqli.fr/)), et Loïc Chapeaux, ainsi que de nombreux contributeurs disséminés de par le monde. Ainsi, l'application est disponible en 32 langues. Elle est actuellement utilisée par de nombreux sites, comme par exemple [Gastero Prod](http://www.gasteroprod.com/). Des prestataires de services l'utilisent aussi pour mettre en place des solutions de chat pour leurs clients. En effet, cette application étant open source, il est possible de l'adapter à des besoins particuliers.

# Une solution fonctionnelle rapidement

Selon Nicolas Hoizey, créateur de la solution, "si l'on dispose d'une plate-forme avec Apache, PHP et MySQL, le chat est opérationnel en 5 minutes". Il est ainsi possible de l'installer rapidement chez la plupart des hébergeurs en colocation, et même chez des hébergeurs gratuits comme [Free](http://www.free.fr/). L'application est paramétrable, notamment à l'aide d'une feuille de style CSS, ce qui permet de l'adpater à une charte graphique précise. Les bases de données MySQL, PostGreSQL sont supportées, ainsi que celles qui sont accessibles en ODBC. La connexion à la plate-forme s'effectue par le biais d'une simple page HTML contenant des frames invisibles rafraîchies périodiquement et assurant l'affichage des nouveaux messages. Une telle solution technique permet notamment un maximum de compatibilité et une utilisation derrière un firewall.

# Les avantages du développement collaboratif

Les utilisateurs du chat peuvent, avec cette solution, créer leur propre salon. Des fonctions de modération sont aussi incluses. Il est ainsi possible de définir une liste de mots qui seront automatiquement remplacés par des caractères déterminés. Il est aussi possible d'exclure des utilisateurs abusifs. Par contre, il est impossible d'être alerté de l'utilisation de certains mots, mais cette fonction peut facilement être implémentée. Une liste de diffusion regroupe en effet plusieurs centaines d'utilisateurs de PHPMyChat, ce qui permet aux développeurs de coller à leurs attentes. Au programme des prochaines évolutions : l'intégration de l'identification à une identification générale, une couche d'abstraction pour les bases de données, et un renforcement de la sécurité.

[Ludovic Blin](http://solutions.journaldunet.com/contact/redaction.shtml), JdNet.

L'article original est disponible à l'adresse suivante :

<http://solutions.journaldunet.com/0102/010221phpmychat.shtml>
