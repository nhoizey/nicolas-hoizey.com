--- 
title:      Comment définir dans jQuery ses propres filtres de sélection 
date: 2007-07-05 12:00:00 +02:00
lang:       fr 
tags:       [development, Clever Age, jQuery, JavaScript]
---

*Article initialement publié dans [le weblog de Clever Age](http://www.clever-age.com/veille/blog/comment-definir-dans-jquery-ses-propres-filtres-de-selection.html).*

La librairie JavaScript [jQuery](http://jquery.com/) est en train de se répandre à grande vitesse, mais malgré une [documentation](http://docs.jquery.com/Main_Page) assez complète, certains points restent obscurs. Voici par exemple comment créer votre propre filtre de sélection.

Le besoin particulier qui m'a conduit à trouver la solution que je vais exposer ici est de sélectionner des éléments dont le contenu texte est exactement égal à une chaine de caractères donnée.

jQuery propose le filtre [`contains()`](http://docs.jquery.com/DOM/Traversing#contains.28_str_.29) qui permet d'identifier des éléments qui contiennent la chaine de caractères 'text', de l'une des manières suivantes :

```javascript
$('element').contains('text')…
$('element:contains(text)')…
```

Malheureusement, ce filtre ne permet pas d'identifier des éléments qui contiennent exactement la chaine `'text'`, donc il faut le faire soit-même.

La solution directe, sans étendre jQuery, est d'utiliser [`filter()`](http://docs.jquery.com/DOM/Traversing#filter.28_expression_.29) :

```javascript
$('element').filter(function() {
  return $(this).text() == 'text';
}
```

Si cela est réalisable une ou deux fois dans un code relativement peu volumineux, il devient vite pénible de recopier tout ce code pour une opération qu'on imaginerait plus simple.

Heureusement, il est possible d'[étendre jQuery](http://docs.jquery.com/Plugins/Authoring), soit par des plugins soit [directement jQuery lui-même](http://docs.jquery.com/Plugins/Authoring#Using_jQuery.extend_to_extend_jQuery_itself) et ses éléments, dont ses filtres. Cette dernière possibilité n'est par contre pas bien — voire pas du tout[^1] — documentée.

Voici ce que ça donne pour le besoin particulier exprimé précédemment :

```javascript
jQuery.extend(jQuery.expr[':'], {
  containsExactly: "$(a).text() == m[3]"
});
```

Une fois ceci fait, il est possible de filtrer les éléments de la manière suivante :

```javascript
$('element:containsExactly(text)')…
```

Simple, n'est-ce pas ?

Ce qu'il faut savoir pour écrire ses propres filtres est surtout la définition des variables disponibles. Vous avez sans doute vu ces étranges `a` et `m[3]` dans le code ci-dessus. La première impression pourrait être que cela ne permet de filtrer que les éléments de type lien — balise `<a>` — mais il n'en est rien, ce `a` n'est qu'un nom de variable.

Voici donc la fameuse liste des variables, grâce à ce [mail de Danny Wachsstock sur la liste de discussion jQuery](http://www.mail-archive.com/discuss@jquery.com/msg15863.html) :

- `a` pour l'élément à filtrer
- `m[3]` pour ce qui est entre parenthèses dans le sélecteur
- `i` pour l'index de l'élément à filtrer
- `r` pour le tableau complet d'éléments

Comme indiqué dans le mail cité précédemment, vous trouverez de nombreux exemples dans cette [liste de sélecteurs aditionnels](http://www.softwareunity.com/sandbox/JQueryMoreSelectors/).

A vous de jouer !

[^1]: Espérons juste que cette absence de documentation n'implique pas une pérennité douteuse
