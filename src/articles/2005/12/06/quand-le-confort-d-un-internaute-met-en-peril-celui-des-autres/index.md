--- 
title:      "Quand le confort d'un internaute met en péril celui des autres" 
date: 2005-12-06 12:00:00 +02:00
lang:       fr 
tags:       [fail, Firefox, extension, hosting, Apache]
---

Le « [pré téléchargement](http://www.mozilla.org/projects/netlib/Link_Prefetching_FAQ.html) », une nouvelle fonctionnalité de [Firefox 1.5](http://www.mozilla.com/), est exploité à outrance par une extension nommée [FasterFox](http://fasterfox.mozdev.org/). Comme son nom l'indique, elle permet théoriquement de naviguer plus rapidement, puisque toutes les pages auxquelles on peut accéder depuis la courante sont déjà chargées dans Firefox. Sauf que si tout le monde fait ça en accédant à une page où il y a 79 liens - comme la page d'accueil de Gastero Prod[^1] - le nombre de requêtes sur le serveur est multiplié par 80 !!!

[^1]: Merci à la Web Developer Toolbar pour le décompte

J'ai eu l'info par [Laurent Jouanneau](http://ljouanneau.com/blog/2005/12/07/502-fasterfox-abuse-sur-le-prefetching), et je m'empresse de la relayer, parce que je trouve cela vraiment dangereux pour la santé des plateformes d'hébergement.

Je me suis aussi empressé d'adopter sur ce site la règle [mod_rewrite](http://www.webmaster-hub.com/publication/article5.html) proposée par Laurent, en espérant que je ne me ferais pas jeter par mon hébergeur :

```apacheconf
RewriteEngine On
RewriteCond %{X-moz} ^prefetch
RewriteRule ^.* - [F]
```

Au passage, je n'ose imaginer la perturbation que cela va apporter à tous les outils de statistique de consultation des sites qui ne prendront pas en considération cet en-tête HTTP `X-moz: prefetch`…

**Mise à jour du 9/12 :** J'ai laissé [un commentaire](https://addons.mozilla.org/extensions/moreinfo.php?id=1269&vid=7401&page=comments&action=successful#87434) sur la page de l'extension, et je me rends compte que je ne suis [pas](https://addons.mozilla.org/extensions/moreinfo.php?id=1269&vid=7401&page=comments&action=successful#87291) le [seul](https://addons.mozilla.org/extensions/moreinfo.php?id=1269&vid=7401&page=comments&action=successful#87432). N'hésitez pas à faire de même…
