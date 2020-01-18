---
title:      Utiliser SPIP 3 chez AlwaysData
date: 2012-03-08 12:00:00 +02:00
lang:       fr
tags:       [SPIP, AlwaysData]
---

Je suis passé il y a déjà quelque temps chez [AlwaysData](https://www.alwaysdata.com/) pour héberger plusieurs sites, dont certains sous SPIP. Voici quelques trucs à savoir si vous envisagez de faire de même. Je mettrais le billet à jour au fur et à mesure de mes découvertes.

![](/assets/logos/alwaysdata.png){.logo}

# Faire fonctionner les sauvegardes SQLite

Il faut ajouter le support de SQLite et le driver PDO associé, ce qui est simple en utilisant les [extensions PHP déjà installées](http://wiki.alwaysdata.com/wiki/Activer_une_extension_PHP_pr%C3%A9-install%C3%A9e).

Dans le champ «php.ini pour PHP 5», ajouter les lignes suivantes :

```ini
extension=sqlite3.so
extension=pdo_sqlite.so
```
