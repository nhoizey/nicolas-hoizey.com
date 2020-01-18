---
title:      Photo.fr n'est pas en form
date: 2009-03-10 12:00:00 +02:00
lang:       fr
tags:       [fail, HTML, form]
---

Sur son site déjà récemment revu, le célèbre magazine [Photo](http://www.photo.fr/) a prévu la possibilité pour les internaute de saisir leur adresse e-mail afin d'être prévenus de la sortie du futur nouveau site. Sauf que le champ n'est pas dans un formulaire, et est donc inopérant.

Voilà à quoi ressemble cette petite zone de la page d'accueil :

![](photo-fr-form-mail.png)

C'est beau, bien dans le style du site, mais ça ne fait rien.

J'ai découvert cela en navigant avec Safari sur mon iPhone, mais trouvant cela étrange que le formulaire ne fonctionne pas — rien ne se passe quand on clique sur le bouton « OK » — j'ai réessayé avec mon bon vieux Firefox 3 sur Mac, sans succès.

En regardant le code source[^1], j'ai découvert qu'il n'y a tout simplement pas de formulaire déclaré — vous savez, la balise `<form>` — donc pas étonnant que les deux `<input />` du champ de saisie et du bouton ne donnent rien, ils ne peuvent pas deviner quelle est l'`action` à réaliser :

![](photo-fr-form-mail-code.png)

Vous noterez au passage la délicieuse intrusion de code JavaScript en ligne directement dans l'`input`, pas accessible du tout…

**Mise à jour du 11/03** : Photo.fr a réagit très vite au mail que je leur ai envoyé, ce soucis est maintenant corrigé, vous pouvez vous inscrire. Bravo pour cette belle réactivité !

[^1]: Non mais quel g33k, hein !
