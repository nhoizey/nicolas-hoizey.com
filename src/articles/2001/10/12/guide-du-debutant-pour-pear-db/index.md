--- 
title:      "Guide du débutant pour PEAR DB" 
date: 2001-10-12 12:00:00 +02:00
lang:       fr 
tags:       [development, PHP, PEAR]
---

Traduction du tutoriel de [Tomas V. V. Cox](mailto:cox@idecnet.com) publié en anglais à l'adresse suivante : <http://vulcanonet.com/soft/?pack=pear_tut>

# Introduction (à écrire !)

Ceci est un tutoriel sur l'utilisation de l'extension PEAR DB.

PEAR DB est un ensemble de classe proposant :

- abstraction de bases de données
- gestion avancée des erreurs
- etc 

# Obtenir et installer Pear

Pour le moment, le projet PEAR est encore fortement en développement, donc le meilleur moyen de l'obtenir est depuis le CVS (la distribution de PEAR DB livrée avec PHP est obsolète, même celle avec PHP 4.0.6 !). Ensuite, la seule chose que vous avez à faire est d'ajouter le répertoire racine de PEAR au paramètre *include_path* de votre fichier *php.ini*. Vous pouvez aussi procéder comme ceci :

```php
<?php
ini_set('include_path', '/pear_base_dir');
?>
```

Voici un exemple pas à pas :

```bash
# Placez-vous là où vous voulez que soient les sources de PEAR
cd /usr/local/lib

# Connectez-vous au CVS (utilisez "phpfi" comme mot de passe)
cvs -d :pserver:cvsread@cvs.php.net:/repository login

# Lancez la commande suivante pour récupérer tous les fichiers
# de PEAR. Vous pouvez également l'utiliser pour mettre à jour
# des fichiers déjà récupérés. D'autres options possibles sont
# "today", "last month", …
cvs -d :pserver:cvsread@cvs.php.net:/repository export -D "last week" php4/pear

# Editez votre php.ini et ajoutez le répertoire /usr/local/lib/php4/pear
# à votre paramètre include_path. Si vous n'avez pas accès au
# fichier php.ini, vous pouvez utiliser
ini_set('include_path', 'path_to_pear'); dans votre code.
```

La documentation complète du CVS PHP peut être trouvée [ici](http://cvs.php.net/).

Notez que PEAR DB nécessite PHP > 4.0.4, mais d'autres packages  de PEAR comme le parser XML Parser ou le script *pear installer* nécessitent PHP >= 4.0.5.

Pour l'instant, ce guide couvre la dernière version CVS de PEAR DB, mais il peut être valide pour toute version récente.

# Utilisation de PEAR DB

## Se connecter et se déconnecter d'une base de données

```php
<?php
// The pear base directory must be in your include_path
require_once 'DB.php';
$user = 'foo';
$pass = 'bar';
$host = 'localhost';
$db_name = 'clients_db';
// Data Source Name: This is the universal connection string
$dsn = "mysql://$user:$pass@$host/$db_name";
// DB::connect will return a Pear DB object on success
// or a Pear DB Error object on error
// You can also set to TRUE the second param
// if you want a persistent connection:
// $db = DB::connect($dsn, true);
$db = DB::connect($dsn);
// With DB::isError you can diferentiate between an error or
// a valid conection.
if (DB::isError($db)) {
  die ($db->getMessage());
}
….
// You can disconnect from the database with:
$db->disconnect();
```

La chaine de connexion Data Source Name (paramètre *$dsn* dans l'exemple ci-dessus) peut avoir les formats autorisés suivants (copie directe de la méthode parseDSN de pear/DB.php) :

```php
*  phptype: Database backend used in PHP (mysql, odbc etc.)
*  dbsyntax: Database used with regards to SQL syntax etc.
*  protocol: Communication protocol to use (tcp, unix etc.)
*  hostspec: Host specification (hostname[:port])
*  database: Database to use on the DBMS server
*  username: User name for login
*  password: Password for login
*
* The format of the supplied DSN is in its fullest form:
*
*  phptype(dbsyntax)://username:password@protocol+hostspec/database
*
* Most variations are allowed:
*
*  phptype://username:password@protocol+hostspec:110//usr/db_file.db
*  phptype://username:password@hostspec/database_name
*  phptype://username:password@hostspec
*  phptype://username@hostspec
*  phptype://hostspec/database
*  phptype://hostspec
*  phptype(dbsyntax)
*  phptype
```

Les bases de données actuellement supportées (partie *phptype* du DSN) sont :

| **phptype** | **Base**                          |
|-------------|-----------------------------------|
| mysql       | MySQL                             |
| pgsql       | PostgreSQL                        |
| ibase       | InterBase                         |
| msql        | Mini SQL                          |
| mssql       | Microsoft SQL Server              |
| oci8        | Oracle 7/8/8i                     |
| odbc        | ODBC (Open Database Connectivity) |
| sybase      | SyBase                            |
| ifx         | Informix                          |
| fbsql       | FrontBase                         |

Notez que certaines fonctionnalités peuvent ne pas être supportées par tous les gestionnaires de bases de données. Référez-vous au document donnant le status des extensions PEAR DB situé dans *&lt;pear base dir>/DB/STATUS* pour avoir la liste détaillée.

## Effectuer une requête dans la base de données

```php
<?php
// Once you have a valid DB object
…
$sql = "select * from clients";
// If the query is a "SELECT", $db->query will return
// a DB Result object on success.
// Else it simply will return a DB_OK
// On failure it will return a DB Error object.
$result = $db->query($sql);
// Always check that $result is not an error
if (DB::isError($result)) {
  die ($result->getMessage());
}
…
```

## Récupérer les enregistrements résultant de la requête

### Fonctions fetch

```php
<?php
// Once you have a valid DB Result object
…
// Get each row of data on each iteration until
// there is no more rows
while ($row = $result->fetchRow()) {
  $id = $row[0];
}
```

Plutôt que *fetchRow()* vous pouvez utiliser * **fetchInto()** * qui renseigne directement la valeur *$row* :

```php
<?php
…
while ($result->fetchInto($row)) {
  $id = $row[0];
}
```

### Sélectionner le format de l'enregistrement récupéré

Les modes de *fetch* supportés sont *DB_FETCHMODE_ORDERED* (par défaut), *DB_FETCHMODE_ASSOC* et *DB_FETCHMODE_OBJECT*.

Exemples de structures de données retournées par les méthodes *fetch* :

```php
<?php
$res = $db->query('select id, name, email from users');
$row = $res->fetchRow($mode);
//With $mode = DB_FETCHMODE_ORDERED
//The default behavior is to return an ordered array.
$row = array (
  0 => <column "id" data>,
  1 => <column "name" data>,
  2 => <column "email" data>
);
$id = $row[0];
//With $mode = DB_FETCHMODE_ASSOC
//Returns an associative array with column names as array keys:
$row = array (
  'id'    => <column "id" data>,
  'name'  => <column "name" data>,
  'email' => <column "email" data>
);
$id = $row['id'];
//With $mode = DB_FETCHMODE_OBJECT
//Returns a DB_row object with column names as properties:
$row = db_row Object
(
  [id]    => <column "id" data>,
  [name]  => <column "name" data>,
  [email] => <column "email" data>
)
$id = $row->id;
```

### Configurer le format des enregistrements retournés

Vous pouvez indiquer quel mode de retour utiliser aux méthodes *fetchRow()* et *fetchInto()* ou définir un mode par défaut pour l'instance de DB.

```php
<?php
…
// 1) Set the mode per call:
while ($row = $result->fetchRow(DB_FETCHMODE_ASSOC)) {
  [..]
}
while ($result->fetchInto($row, DB_FETCHMODE_ASSOC)) {
  [..]
}
// 2) Set the mode for all calls:
$db = DB::connect($dsn);
// this will set a default fetchmode for this Pear DB instance
// (for all queries)
$db->setFetchMode(DB_FETCHMODE_ASSOC);
$result = $db->query(…);
while ($row = $result->fetchRow()) {
  $id = $row['id'];
}
```

### Récupérer les enregistrements par indice

Le système de *fetch* de PEAR DB supporte aussi un autre paramètre pour permettre de récupérer les enregistrement par leur indice numérique. Cela est particulièrement intéressant si vous souhaitez exploiter seulement une partie d'un ensemble de résultats (par exemple pour contruire des [listes paginées](http://vulcanonet.com/soft/index.php?pack=pager)), récupérer les enregistrements dans un ordre particulier, etc.

```php
<?php
…
// the row to start fetching
$from = 50;
// how many results per page
$res_per_page = 10;
// the last row to fetch for this page
$to = $from + $res_per_page;
foreach (range($from, $to) as $rownum) {
  if (!$row = $res->fetchrow($fetchmode, $rownum)) {
    break;
  }
  $id = $row[0];
  ….
}
```

### Vider le résultat

Une fois que vous avez terminé d'utiliser le résultat, vous pouvez le vider avec la méthode **free()** :

```php
<?php
…
$result = $db->query('SELECT * FROM clients');
while ($row = $result->fetchRow()) {
  …
}
$result->free();
```

## Récupération rapide de données

PEAR DB fourni quelques méthodes particulières pour récupérer le résultat d'une requête sans avoir besoin d'utiliser *fetchRow()* pour le parcourir. Ce sont les méthodes *getOne*, *getRow*, *getCol*, *getAssoc* et *getAll*. Voici quelques exemples d'utilisation :

```php
<?php
require_once 'DB.php';
$db = DB::connect('pgsql://postgres@unix+localhost/clients_db');
// -----------------------------------------------------------
// getOne retrieves the first result of the first column
// from a query
$numrows = $db->getOne('select count(id) from clients');
// -----------------------------------------------------------
// getRow will fetch the first row and return it as an array
$sql = 'select name, address, phone from clients where id=1';
if (is_array($row = $db->getRow($sql))) {
  list($name, $address, $phone) = $row;
}
// -----------------------------------------------------------
// getCol will return an array with the data of the
// selected column. It accepts the column number to retrieve
// as the second param.
// The next sentence could return for example:
// $all_client_names = array('Stig', 'Jon', 'Colin');
$all_client_names = $db->getCol('select name from clients');
// -----------------------------------------------------------
// Other functions are: getAssoc() and getAll().
// For the moment refer to their in-line documentation
// at pear/DB/common.php
// -----------------------------------------------------------
```

La famille des méthodes *get*()* fait tout le "sale boulot" pour vous, c'est à dire : exécuter la requête, récupérer les données et vider le résultat. Notez que comme toutes les fonctions de PEAR DB, elles retourneront un object PEAR DB_error en cas d'erreur.

## Obtenir plus d'informations sur le résultat des requêtes (numRows, numCols, affectedRows, tableInfo)

Avec PEAR DB vous avez plusieurs façons d'obtenir des informations intéressantes sur les résultats de requêtes. Ce sont :

- **numRows()** : Donne le nombre total d'enregistrements retournés par une requête de type "SELECT".
- **numCols()** : Donne le nombre total de colonnes retournées par une requête de type "SELECT".
- **affectedRows()** : Donne le nombre d'enregistrements affectés par une requête de manipulation de données ("INSERT", "UPDATE" or "DELETE").
- **tableInfo()** : Donne un tableau associatif contenant des informations sur les champs retournés par une requête de type "SELECT". 

Exemples d'utilisation :

```php
<?php
…
$db = DB::connect($dsn);
$sql = 'select * from clients';
$res = $db->query($sql);
// Don't forget to check if the returned result from your
// action is a Pear Error object. If you get a error message
// like 'DB_error: database not capable', means that
// your database backend doesn't support this action.
//
// Number of rows
echo $res->numRows();
// Number of cols
echo $res->numCols();
// Table Info
print_r ($res->tableInfo());
// Affected rows
$sql = "delete from clients";
// remember that this statement won't return a result object
$db->query($sql);
echo 'I have deleted ' . $db->affectedRows() . 'clients';
```

## Séquences

Les séquences sont un moyen d'obtenir des IDs uniques pour les enregistrements. Si vous faites la majeure partie de votre travail avec par exemple MySQL, pensez aux séquences comme un autre moyen de gérer AUTO_INCREMENT. Cela est relativement simple, tout d'abord vous demandez un ID, puis vous insérez cette valeur dans le champ correspondant du nouvel enregistrement que vous êtes en train de créer. Vous pouvez avoir plus d'une séquence pour toutes vos tables, mais assurez-vous que vous utilisez toujours la même séquence pour une table particulière. 

```php
<?php
…
// Get an ID (if the sequence doesn't exist, it will be created)
$id = $db->nextID('mySequence');
// Use the ID in your INSERT query
$res = $db->query("INSERT INTO myTable (id,text) VALUES ($id,'foo')");
…
```

## Prepare & Execute/ExcuteMultiple (pas encore écrit)

```php
<?php
// UNTESTED CODE !!!
//
// Example inserting data
$alldata = array(
  array(1, 'one', 'en'),
  array(2, 'two', 'to'),
  array(3, 'three', 'tre'),
  array(4, 'four', 'fire')
);
$sth = $dbh->prepare("INSERT INTO numbers VALUES(?,?,?)");
foreach ($alldata as $row) {
  $dbh->execute($sth, $row);
}
//Here's an example of a file placeholder:
$myfile = "/tmp/image.jpg";
$sth = $dbh->prepare('INSERT INTO images (?, &)');
$dbh->execute($sth, array("this is me", $myfile));
//After I commit a bugfix that I have on my laptop, you can use
//parameter arrays in the getXxx methods too:
$ver = $dbh->getOne("SELECT stableversion FROM packages WHERE name = ?",
                    array($package));
```

## autoCommit, commit and rollback (pas encore écrit)

```php
<?php
//examples here
```

# Liste des méthodes disponibles

```php
<?php
/*
* From the DB_(driver) objects
*/
// get the object with, ie:
$db = DB::connect('mysql://user:pass@localhost/my_db');

// Set options
$db->setErrorHandling();
$db->setFetchmode();
// Information
$db->affectedRows();
$db->tableInfo();
// Database manipulation
$db->query();
// Data fetch
$db->nextId();
$db->getOne();
$db->getRow();
$db->getCol();
$db->getAssoc();
$db->getAll();
// Place holders and execute related
$db->quote();
$db->prepare();
$db->execute();
$db->executeMultiple();
// Transactions
$db->autoCommit();
$db->commit();
$db->rollback();
// Disconnection
$db->disconnect();

/*
* From DB_result objects
*/
// get the object with, ie:
$res = $db->query('select * from foo');

// Data fetch
$res->fetchRow();
$res->fetchInto();
// Result Info
$res->numCols();
$res->numRows();
$res->tableInfo();
// Free
$res->free();

/*
* From DB_error objects
*/
// get the object with, ie:
$error = $db->query('select * from no_table');

$error->getMessage();
$error->getDebugInfo();
$error->toString();
```

# Gestion des erreurs

## Récupérer le message d'erreur d'une erreur PEAR DB

Toutes les erreurs retournées par PEAR DB sont des objets PEAR Error. Voici un moyen de récupérer leurs informations :

```php
<?php
…
$res = $db->query('select * from no_table');
if (DB::isError($res)) {
  // get the portable error string
  echo $res->getMessage();
}
```

## Débuguer les erreurs PEAR DB

PEAR DB utilise un système de messages d'erreur portable pour signaler les erreurs à l'utilisateur. Cela a beaucoup d'avantages comme proposer un moyen simple de les transposer en autres langages ou réaliser une action spécifique en cas d'erreur spécifique. Mais cela ne donne pas beaucoup d'informations au développeur sur ce qui est arrivé. Pour récupérer l'erreur réelle donnée par le gestionnaire de bases de données ainsi que la dernière requête effectuée, vous pouvez utiliser la méthode *getDebugInfo()* :

```php
<?php
$sql = 'select * from no_table';
if (DB::isError($res = $db->query($sql))) {
  // get the native backend error
  // and the last query
  echo $res->getDebugInfo();
}
```

Normalement quand une fonction PHP échoue, un message d'erreur est affiché. Dans PEAR ce fonctionnement a été désactivé. Mais peut-être aurez-vous parfois besoin de visualiser ces messages pour ôter des erreurs obscures de votre code. Cela peut être fait avec la fonction PHP set_error_handler qui est documentée dans le manuel PHP. Voici un exemple simple :

```php
<?php
// what messages to report
error_reporting (E_ALL ^ E_NOTICE);
// this function will handle all reported errors
function my_error_handler ($errno, $errstr, $errfile, $errline) {
  echo "In $errfile, line: $errlinen<br>$errstr";
}
set_error_handler ('my_error_handler');
$db = DB::connect('pgsql://postgres@localhost/no_db');
…
```

## Exécuter autmatiquement des actions en cas d'erreur

Comme vous pouvez le voir, PEAR DB fait d'intenses vérifications et rapports d'erreurs, fonctionnalité qui oblige le développeur à toujours vérifier si le résultat de son action est ou non une erreur. PEAR DB prend aussi en charge cette tâche pénible, et propose un système très flexible pour automatiquement exécuter des actions en czas d'erreurs.

Les actions possibles sont :

- Retourne l'objet erreur (PEAR_ERROR_RETURN). C'est l'action par défaut. 
- Imprime le message d'erreur (PEAR_ERROR_PRINT) 
- Imprime le message d'erreur et arrête l'exécution (PEAR_ERROR_DIE) 
- Utilise la fonction PHP *trigger_error()* pour lever une erreur PHP (PEAR_ERROR_TRIGGER) 
- Passe l'objet erreur à une fonction ou à une méthode d'objet (PEAR_ERROR_CALLBACK) 

Un exemple simple :

```php
<?php
require_once 'DB.php';
// Set the default action to take on error
PEAR::setErrorHandling(PEAR_ERROR_DIE);
// From here you don't need to check errors any more
$db = DB::connect('pgsql://postgres@localhost/my_database');
$res = $db->query('select id from no_table');
// at this point the execution is aborted and the error message is raisen
…
```

Un exemple plus complet :

```php
<?php
// Define the app evironment (this is: what errors you want to output)
define ('DEBUG_ENV', true);
// This function will handle all errors
function handle_pear_error ($error_obj) {
  // Be verbose while developing the application
  if (DEBUG_ENV) {
    die ($error_obj->getMessage()."n".$error_obj->getDebugInfo());
	// Dump a silly message if the site is in production
  } else {
    die ('Sorry you request can not be processed now. Try again later');
  }
}
require_once 'DB.php';
// On error, call the "handle_pear_error" function back
// You can also use an object as pear error handler so:
// setErrorHandling(PEAR_ERROR_CALLBACK, array($object,'method_name');
PEAR::setErrorHandling(PEAR_ERROR_CALLBACK, 'handle_pear_error');
$db = DB::connect('pgsql://postgres@localhost/site_db');
$res = $db->query('select id from no_table');
// at this point the execution is aborted and the "handle_pear_error"
// function is called with the error object as its first argument
while ($row = $res->fetchRow()) {
  …
}
…
```

Référez-vous au [manuel de référence de PEAR](http://www.php.net/manual/en/pear.reference.php) pour obtenir la description détaillée des différentes actions possibles.

Voici une idée pour créer un système étendu de gestion d'erreurs :

```php
<?php
error_reporting (E_ALL ^ E_NOTICE);
// this function will handle all errors reported by PHP
function php_error_handler ($errno, $errstr, $errfile, $errline) {
  die ("In $errfile, line: $errlinen<br>$errstr");
}
set_error_handler ('php_error_handler');
// this function will catch errors generated by Pear,
// transform it to PHP errors and trigger them to the php_error_handler
function pear_error_handler ($err_obj) {
  $error_string = $err_obj->getMessage() . '<br>' . $error_obj->getDebugInfo();
  trigger_error ($error_string, E_USER_ERROR);
}
require 'DB.php';
PEAR::setErrorHandling (PEAR_ERROR_CALLBACK, 'pear_error_handler');
// force an error
$db = DB::connect('pgsql://postgres@localhost/no_db');
…
```

# Remerciements

Remerciements particuliers à Stig pour avoir créé le merveilleux monde de PEAR, aux personnes qui m'aident à maintenir ce document et bien sûr aussi à l'ensemble de l'équipe PEAR pour son travail permanent dessus.
