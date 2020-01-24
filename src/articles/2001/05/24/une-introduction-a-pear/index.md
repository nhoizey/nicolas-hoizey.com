--- 
title:      "Une introduction à PEAR" 
date: 2001-05-24 12:00:00 +02:00
lang:       fr 
tags:       [development, PHP, PEAR]
---

Traduction de l'article de [Joao Prado Maia](http://www.onlamp.com/pub/au/98) publié initialement le 24 mai 2001 sur [ONLamp.com](http://www.onlamp.com/pub/a/php/2001/05/24/pear.html), de O'Reilly.

Le projet PEAR (NDT : *PHP Extension and Application Repository*) a été lancé par Stig S. Bakken pour créer un outil similaire au CPAN de Perl. Son but principal est de devenir un entrepôt pour des extensions et scripts PHP. Le but le plus ambitieux du projet est de tenter de définir des standards qui puisse aider les développeurs à écrire du code portable et réutilisable. 

De la documentation sur le projet commence à apparaître sur Internet, en concéquence certainement de sa popularité grandissante. Une documentation de départ peut déjà être trouvée dans le [manuel officiel de PHP](http://www.php.net/manual/fr/pear.php) et sera augmentée. 

PEAR est encore particulièrement en travaux, notamment le "PEAR installer" et le [site dédié](http://pear.php.net/), et il devrait beaucoup croître dans les mois à venir. Il y a de nombreuses discussions sur la mailing-list des développeurs de PHP à propos de l'usage de PEAR dans les versions futures pour gérer le nombre croissant d'extensions C et aussi de l'usage du "PEAR installer" comme interface pour que les utilisateurs téléchargent et installent des extensions PHP. 

Tout cela sans mentionner la librairie de scripts PHP de PEAR, qui est souvent considéré comme une des plus propre et bien conçues disponible actuellement pour PHP. L'un de ses composants les plus populaires est PEAR::DB, la librairie d'abstraction de base de données créée pour ce projet. Bakken travaille même au portage des classes et fonctions principales en une extension C pour rendre le composant aussi rapide que possible. 

Ce nouveau projet deviendra sûrement l'un des aspects les plus importants de PHP dans le futur, autorisant les développeurs à partager du code en utilisant le site de PEAR et en donnant aux utilisateurs l'opportunité de télécharger et installer des extensions et scripts PHP. 

# Comment puis-je débuter avec PEAR ?

Comme mentionner précédemment, PEAR continue à évoluer et à s'améliorer. Cependant, un certain nombre de composants sont maintenant utilisables. Le plus populaire est PEAR::DB, qui permet au développeur d'écrire du code qui puisse être utilisé avec différents gestionnaires de bases de données. Par exemple, un développeur pourrait écrire un script qui insèrerait un enregistrement dans une table, et il fonctionnerait avec MySQL, PostgreSQL et Oracle. 

Ainsi, l'exemple ci-dessous pourrait être utiliser avec tous les types de gestionnaires de bases de données (NDT : voir l'erratum en fin de page) : 

```php
<?php
// Include the appropriate PEAR classes
require_once("DB.php");

$dsn = array(
 'phptype'  => 'mysql',
 'hostspec' => 'localhost',
 'database' => 'test_db',
 'username' => 'test_user',
 'password' => 'test_password'
);
$dbh = DB::connect($dsn);

$stmt = "SELECT id, name FROM examples ORDER BY id";
$result = $dbh->simpleQuery($stmt, DB_FETCHMODE_ASSOC);
if ($dbh->numRows($result) > 0) {
 $data = (object) $dbh->fetchRow($result, DB_FETCHMODE_ASSOC);
 echo "id   => $data->id<br>n";
 echo "name => $data->name<br>n";
}
```

C'était juste un très simple exemple pour montrer à quoi ressemblerait le code avec une librairie d'abstraction comme PEAR::DB. 

Un nouveau chapitre a été récemment ajouté au manuel de PHP, mais il est encore incertain si ce manuel contiendra la documentation complète de tous les composants de PEAR, ou si un nouveau manuel sera créé uniquement pour les composants de PEAR. 

# Procédures d'installation

Installer PEAR est en fait très simple, et je vais expliquer comment installer la dernière version du CVS de PEAR, qui change si rapidement. 

Note : Le mécanisme interne de gestion de l'entrepôt changera probablement dans le futur. Pour l'instant, les composants et librairies sont stockés dans le même arbre CVS que PHP, ce qui pose des problèmes pour gérer à la fois les entrepôts et développeurs de PHP et de PEAR. Dans un futur proche, il est prévisible que PEAR sera détaché dans son propre module. Ce module existe, mais la plupart des composants sont encore dans l'ancien. 

# Installer PEAR à partir du CVS

Si vous n'avez jamais entendu parler de CVS, jetez un oeil à sa [documentation](http://www.cvshome.org/). Ce n'est pas une technologie difficile d'usage, mais s'y accoutumer prend du temps. 

En supposant que vous avez le client CVS standard installé sur votre machine, vous devrez ouvrir une fenêtre de terminal (rxvt, xterm, ou autre) et suivre ces étapes :

```bash
cvs -z3 -d :pserver:cvsread@cvs.php.net:/repository login
Password: # Entrez 'phpfi' comme mot de passe ici
cvs -z3 -d :pserver:cvsread@cvs.php.net:/repository co php4
# Cela va créer un nouveau répertoire 'php4'
cd php4
cvs -z3 -d :pserver:cvsread@cvs.zend.com:/repository login
Password: # Entrez 'zend' comme mot de passe ici
cvs -z3 -d :pserver:cvsread@cvs.zend.com:/repository co Zend TSRM
# Cela va créer deux nouveaux répertoire dans 'php4', 'Zend' et 'TSRM'
./buildconf
```

Voilà. Lancer buildconf devrait créer le script configure standard qui peut être utilisé pour définir vos paramètres pour PHP. Pour une installation normale, PEAR devrait être automatiquement installé dans /usr/local/lib/php, mais vous pouvez installer les fichiers manuellement en allant dans 'php4/pear' et en lançant make install-su en tant que superuser. 

Ensuite, vous devriez ajouter le répertoire racine de PEAR à l'include_path de votre fichier php.ini. Le chemin par défaut devrait être /usr/local/lib/php, mais cela peut être ailleurs si vous avez effectué des modification manuelles de vos paramètres de configuration. 

# Débuter avec PEAR

Les composants de PEAR vont de l'abstraction de base de données à la gestion de cache, ce qui fait de PEAR plus qu'une simple librairie, c'est un nouveau standard pour écrire du code PHP portable et propre. L'une des plus importantes choses à faire pour un débutant avec PEAR est de lire les [styles de codage PEAR](http://www.php.net/manual/fr/pear.standards.php) qui sont publiés dans le manuel de PHP. 

Je donnerais quelques conseil pour commencer à travailler avec PEAR::DB, car c'est un des composant de PEAR les plus populaires. Vous pouvez trouver des exemples et de l'aide pour utiliser PEAR::DB en suivant ces étapes : 

- Cherchez des réponses à vos question sur [MARC](http://marc.theaimsgroup.com/), dans [pear-dev](http://marc.theaimsgroup.com/?l=pear-dev) ou [pear-general](http://marc.theaimsgroup.com/?l=pear-general). 
- Lisez les scripts de tests unitaires fournis avec le code source de PEAR. L'emplacement de ces scripts peut être trouvé dans le répertoire où se trouve votre image CVS de PHP. Dans mon cas, c'est /home/jpm/php4/pear/DB/tests/. 
- Parcourez l'excellent [tutoriel PEAR::DB](http://vulcanonet.com/soft/?pack=pear_tut) de Tomas V. V. Cox. 
J'espère que cet article a jeté un peu de lumière sur le mystérieux PEAR, et qu'il vous a fourni des informations utiles sur l'un des développements les plus prometteurs de la communauté PHP. 

Amusez-vous ! 

*[Joao Prado Maia](http://www.onlamp.com/pub/au/98) est développeur Web à San Francisco. Il a plus de quatre ans d'expérience en développement d'applications web et aime apprendre de nouvelles technologies et de nouveaux langages de développement.*
