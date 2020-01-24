--- 
title:      session_start() et exec() ne font pas toujours bon ménage en PHP 
date: 2008-01-30 12:00:00 +02:00
lang:       fr 
tags:       [fail, SPIP, PHP]
---

SPIP utilise toujours son propre système de gestion de sessions applicatives alors que PHP les supporte depuis maintenant longtemps de façon satisfaisante. Ou pas…

Avec un SPIP 1.9.2c installé sur Windows Server 2003 SP2, avec Apache 2.2.6 et PHP 5.2.4, j'avais des plantages étranges sur la page de configuration avancée de SPIP et l'indexation ne marchait plus bien, certains articles passant au travers. Je n'avais pas ce soucis sur le même site déployé sur Linux ou Mac OS X.

Après bien des essais et lectures de code tant perso que de SPIP, il s'avère que PHP supporte mal l'usage simultané de sessions et de exec(). Le [bug #22526](http://bugs.php.net/bug.php?id=22526) a beau dater de 5 ans et être clos, le problème se pose encore, manifestement.

J'avais en fait un `session_start()` dans `mes_options.php` pour avoir une session PHP active dans toutes les pages. Du coup j'avais un plantage, tant des `exec()` de test de librairies graphiques dans la configuration avancée, que des `exec()` d'extraction de contenus des documents dans l'indexation.

De [proche](http://bugs.typo3.org/view.php?id=3731) en [proche](http://www.issociate.de/board/post/15903/PHP/Win,_exec()_und_ImageMagick/gs_Probleme.html), j'ai découvert sur différents forums que le problème est bien d'actualité, et qu'heureusement une solution existe !

Il suffit de remplacer toutes les instructions telles que la suivante :

```php
exec(…);
```

Par ceci :

```php
session_write_close();
exec(…);
session_start();
```

Bien sûr, si le `exec()` en question se trouve après du code écrivant sur la sortie standard, il faudra utiliser les fonctions de [bufferisation de sortie](http://fr.php.net/manual/fr/ref.outcontrol.php)[^1] pour éviter les *warning* dûs à l'envoi de cookie par `session_start()`.

Bien que les sources qui relatent ce problème et sa solution datent un peu, je peux vous confirmer que modifier de cette façon le source des fichiers présents dans `ecrire/extract/*.php` résout bien le problème.

Finalement, les sessions de SPIP sont meilleures que celles de PHP, au moins sur ce point… ;-)

[^1]: *output buffering* en anglais
