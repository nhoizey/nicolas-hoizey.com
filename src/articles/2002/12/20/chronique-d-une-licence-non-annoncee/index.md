---
title:      "Chronique d'une licence non annoncée"
date: 2002-12-20 12:00:00 +02:00
lang:       fr
tags:       [development, PHP, phpHeaven, opensource]
---

La [version 3 de la licence de PHP](http://www.php.net/license/3_0.txt) est sortie. Vous ne le saviez pas ? Normal, elle est un peu passée en douceur, sans faire de bruit.


## Petite chronologie

Le **12 juin 2002**, Stig Bakken, leader du développement de PHP pour sa version 4.3, [met à jour](http://cvs.php.net/diff.php/php4/LICENSE?login=2&r1=1.17&r2=1.18&ty=h) la licence pour cette version. Le paragraphe 6 qui indiquait que le Zend Engine est inclu dans PHP est supprimé, et est remplacé par une simple mention de ce Zend Engine en fin de texte. Le numéro de licence passe du même coup de 2.02 à 3.0a1.

Le **21 juillet 2002**, Stig Bakken, toujours lui, intervient plusieurs fois sur la licence, principalement pour scinder en deux le paragraphe  3 qui parle à la fois du nom *PHP* et de l'usage qu'il en est fait pour nommer les logiciels développés en PHP. La séparation en deux paragraphe simplifie la compréhension de la seconde partie, qui devient donc le paragraphe 4 suivant :

*Products derived from this software may not be called "PHP", nor may "PHP" appear in their name, without prior written permission from group@php.net.  You may indicate that your software works in conjunction with PHP by saying "Foo for PHP" instead of calling it "PHP Foo" or "phpfoo"*

Soit en français :

*Les produits dérivés de ce logiciel ne devraient pas être appelés "PHP", et "PHP" ne devrait pas apparaître dans leur nom, sans autorisation écrite préalable de group@php.net. Vous pouvez indiquer que votre logiciel fonctionne avec PHP en disant "Foo pour PHP" plutôt qu'en l'appelant "PHP Foo" ou "phpfoo".*

Dans la foulée, Derick Rethans [demande](http://marc.theaimsgroup.com/?l=php-cvs&m=102727165608460&w=2) dans la mailing-list [php-cvs](http://marc.theaimsgroup.com/?l=php-cvs&r=1&w=2) si [phpMyAdmin](http://www.phpmyadmin.net/) et [phpOpenTracker](http://phpopentracker.de/) sont considérés comme des logiciels *dérivés* de PHP, selon le nouveau sens proposé par la licence.

Le **5 août 2002**, Sebastian Bergmann, créateur de phpOpenTracker, [répond](http://marc.theaimsgroup.com/?l=php-dev&m=102858914124505&w=2) en passant dans la mailing-list plus appropriée [php-dev](http://marc.theaimsgroup.com/?l=php-dev&r=1&w=2) qu'il est naturellement lui aussi intéressé, puisque directement concerné.

C'est alors que Rasmus Lerdorf, créateur de PHP que l'on ne présente plus, [intervient](http://marc.theaimsgroup.com/?l=php-dev&m=102859018225314&w=2)  pour préciser ce qu'il en pense et en a déjà dit à plusieurs reprises auparavant. En synthèse, les projets développés en PHP n'ont aucune raison d'avoir des noms comportant *PHP*, alors que cela n'est pratiqué dans aucune autre technologie.

Le **4 septembre 2002**, sans doute pour l'exemple, Rasmus Lerdorf [interpèle](http://www.advogato.org/person/rasmus/diary.html?start=69)   [Michael Glazer](http://www.advogato.org/person/mglazer/), créateur du projet [PHPortal](http://freshmeat.net/projects/phportal/), pour lui demander pourquoi le nom de son projet contient 'php'.

Le **6 septembre 2002**, Rasmus, toujours lui, [annonce](http://marc.theaimsgroup.com/?l=pear-dev&m=103134676127239&w=2) dans la mailing-list [pear-dev](http://marc.theaimsgroup.com/?l=pear-dev&r=1&w=2) que suite à une discussion avec Richard M. Stallman, la [liste des licences logiciel libre non compatibles avec la GNU/GPL](http://www.gnu.org/licenses/license-list.html#GPLIncompatibleLicenses) a été mise à jour pour prendre en compte la nouvelle version de la licence PHP et ôter les réserves importantes qui étaient faites sur la pertinence de la version précédente.

## A bin oui, mais alors…

Cette habitude de mettre *PHP* dans le nom des logiciels, très particulière en effet, a sans doute trouvé sa source dans phpMyAdmin, assurément le plus fameux des projets PHP.

C'est d'ailleurs exactement ce qui a conduit aux noms de [phpMyChat](http://www.phpheaven.net/phpmychat:home), qui était initialement basé uniquement sur PHP et MySQL, mais aussi de [phpLang](http://www.phpheaven.net/phplang:home), phpApp, phpXMLP et phpSyndication.

Pour les autres projets, cela n'aurait sans doute que peu d'impact, mais un changement de nom de phpMyChat est-il envisageable alors qu'il est depuis déjà pas mal de temps connu de miliers d'utilisateurs ?

## Bonus

Toutes ses discussions auront aussi permis de [découvrir](http://marc.theaimsgroup.com/?l=php-cvs&m=102738953806371&w=2) grâce à Yasuo Ohgaki que *PHP* est une marque déposée en 1947 au Japon par l'éditeur *PHP Sougou Kennkyusho*.
