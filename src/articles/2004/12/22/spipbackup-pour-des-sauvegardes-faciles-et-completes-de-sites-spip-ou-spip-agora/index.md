---
title:      "spipBackup, pour des sauvegardes faciles et complètes de sites SPIP ou SPIP-Agora"
date: 2004-12-22 12:00:00 +02:00
lang:       fr
tags:       [SPIP, backup]
---

Quel webmestre n'a jamais eu de sueurs froides en s'appercevant que le serveur ne fonctionnait plus, ou que la base de données était corrompue ? Faire des sauvegardes régulières des contenus d'un site est plus que nécessaire, surtout si ces contenus sont gérés directement en ligne[^c1] et que la plateforme d'hébergement ne prend pas en charge ces sauvegardes.

[^c1]: Et encore plus pour les données de type forums, statistiques, etc.

## Quelles sont les données à sauvegarder ?

- les données de la base ne pouvant être reconstruites à partir d'autres données, c'est à dire finalement toutes les tables sauf celles d'indexation
- les documents attachés aux articles ou rubriques, c'est à dire le répertoire `IMG/` au complet

## Installation de l'outil de sauvegarde

L'exécution de ce script requiert les composants [PEAR](http://pear.php.net/) suivants[^t1] :

- [DB](http://pear.php.net/package/DB)
- [Archive_Tar](http://pear.php.net/package/Archive_Tar)

Le composant suivant est optionnel :

- [HTML_Progress](http://pear.php.net/package/HTML_Progress)

Il suffit ensuite de télécharger le script présent dans le Zip suivant :

[spipBackup-1.0.0.zip](spipBackup-1.0.0.zip)

Ensuite, il faut configurer le script en l'ouvrant dans n'importe quel éditeur, comme expliqué dans la section suivante, puis de le placer à la racine du site SPIP auquel il est destiné.

## Configuration

Le début du script est à modifier en fonction de la configuration de la base de données et des options d'utilisation choisies.

Le code présent initialement correspond à ce que l'on trouve en général sur les installations par défaut pour MySQL.

```php
// Directory where the files will be created
define('DIRECTORY', 'backup');
define('ARCHIVE_PREFIX', 'mon_site_spip');

// Database connection parameters
define('BASE_HOST', 'localhost');
define('BASE_NAME', 'spip');
define('BASE_USERNAME', 'root');
define('BASE_USERPASS', '');

// Number of archives to keep (0 for all)
define('ARCHIVES_NUMBER', 2);

// Use visualy improved version
define('VISUAL_FRIENDLY', false);
```

| **Constante**     | **Rôle**                                                                          |
|-------------------|-----------------------------------------------------------------------------------|
| `DIRECTORY`       | Répertoire dans lequel doivent être placées les sauvegardes                       |
| `ARCHIVE_PREFIX`  | Préfixe des noms de fichier des sauvegardes                                       |
| `BASE_HOST`       | Serveur sur lequel se trouve la base de données                                   |
| `BASE_NAME`       | Nom de la base de données                                                         |
| `BASE_USERNAME`   | Utilisateur de la base de données                                                 |
| `BASE_USERPASS`   | Mot de passe de l'utilisateur de la base de données                               |
| `ARCHIVES_NUMBER` | Nombre de fichiers d'archive à conserver. En mettant 0, on retire la limite.[^t2] |
| `VISUAL_FRIENDLY` | Utilisation de l'interface plus riche indiquant la progression des actions        |

## Utilisation

Voici un apperçu de l'interface de l'outil :

![](spip_backup.png "L'interface de l'outil")

Son utilisation est normalement intuitive…

[^t1]: Une version purement SPIP sans nécessité de ces composants externes est à l'étude… ;)

[^t2]: Pour éviter de surcharger le disque dur, il est vivement recommandé de ne pas conserver trop de fichiers d'archives.
