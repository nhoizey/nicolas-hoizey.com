---
title:      Checklist de réinstallation complète de Mozilla Firefox
date: 2008-03-18 12:00:00 +02:00
lang:       fr
tags:       [Flickr, Firefox, PicLens]
---

J'ai eu le malheur de voir mes Firefox[^1] sur mon Mac cesser de fonctionner tout à coup, sans savoir quel pouvait en être la raison. Ne pouvant bidouiller mes profils en tâtonnant pour trouver d'où venait le problème, j'ai décidé de tout réinstaller. Voici tout ce que j'ai dû faire, au cas où cela m'arriverait de nouveau, à moins que vous puissiez me suggérer une façon simple de faire des sauvegardes de tout ça.

[^1]: J'utilise conjointement les versions 2 et 3 dans sa dernière beta

# Les extensions

Certaines de cet extensions ne sont malheureusement pas encore compatibles avec Firefox 3, mais ce dernier étant tellement plus performant et modeste en consommation mémoire que Firefox 2, je le privilégie tant que possible.

## Pour la vie de tous les jours

- [Greasemonkey](http://www.greasespot.net/) pour ajouter des fonctionnalités aux sites dynamiquement avec du JavaScript
- [SwitchProxy](https://addons.mozilla.org/fr/firefox/addon/125) pour changer facilement de configuration entre plusieurs proxy
- [PicLens](http://www.piclens.com/site/firefox/mac/) pour se balader de façon beaucoup plus ludique dans les galeries de photo, de Flickr par exemple
- [Better GMail 2](http://lifehacker.com/software/exclusive-lifehacker-download/better-gmail-2-firefox-extension-for-new-gmail-320618.php) pour améliorer GMail avec des macro et la gestion des labels arborescents
- [Pearl Crescent Page Saver](http://pearlcrescent.com/products/pagesaver/) pour faire des copies visuelles des pages
- [DownThemAll!](https://addons.mozilla.org/fr/firefox/addon/201) pour télécharger facilement tous les fichiers pointés par les liens d'une page
- [S3Fox](https://addons.mozilla.org/fr/firefox/addon/3247) pour accéder facilement au service de stockage S3 d'Amazon
- [TinEye](http://tineye.com/plugin) pour trouver d'autres versions d'une image en ligne

## Pour le développement

- [Firebug](http://www.getfirebug.com/) et [Web Developer](http://chrispederick.com/work/web-developer/) pour auditer le XHTML, les CSS et le JavaScript, les désactiver à la volée, et même les modifier, incontournables !
- [Firecookie](http://www.softwareishard.com/blog/?page_id=5), une extension de Firebug permettant de manipuler les cookies
- [YSlow](http://developer.yahoo.com/yslow/) pour auditer et améliorer la performance des pages
- [ColorZilla](https://addons.mozilla.org/fr/firefox/addon/271) pour récupérer facilement le code d'une couleur présente dans une page
- [Fangs](http://www.standards-schmandards.com/projects/fangs/) pour simuler visuellement le rendu d'une synthèse vocale, très instructif pour l'accessibilité

# Les scripts Greasemonkey

## Pour Flickr

- [FlickPM](http://userscripts.org/scripts/show/1378) pour avoir des liens rapides à côté des icônes des membres pour accéder à différents services
- [Flickr Buddy Interestingness](http://6v8.gamboni.org/Flickr-Buddy-Interestingness.html?lang=fr) pour avoir rapidement les photos les plus « intéressantes »[^2] d'un utilisateur ou d'un groupe
- [Flickr Fav and Sets Magnifier](http://www.goston.net/2007/05/07/835/) pour afficher les photos complètes lors de leur survol dans les listes où ne se trouvent que des recadrages carrés
- [Flickr Contacts Organiser](https://flickr.com/groups/flickrhacks/discuss/72157594223205825/) pour mettre des tags sur les contacts et mes retrouver plus facilement
- [Flickr Groups Organiser](https://flickr.com/groups/flickrhacks/discuss/72057594139485596/) pour faire la même chose avec les groupes
- [Flickr Multi Group Sender](http://userscripts.org/scripts/show/1543) pour envoyer une photo dans plusieurs groupes en une seule fois
- [Flickr Group Pool Admin: Warn+Delete](https://www.flickr.com/groups/flickrhacks/discuss/72157594144963684/) pour modérer facilement les groupes dont on est administrateur ou modérateur
- [Flickr Favorite Users](http://userscripts.org/scripts/show/5346) pour avoir un rappel dans la page de contact des personnes dont vous avez mis au moins une photo dans vos favoris
- [More info in new contact mail](http://6v8.gamboni.org/Flickr-More-info-in-mails.html) pour en savoir plus sur ceux qui vous ajoutent dans leurs contacts et sur les groupes dans lesquels on vous invite
- [Add referrer into comments](http://6v8.gamboni.org/Flickr-Add-referer-into-comments.html) pour indiquer dans vos commentaires d'où vous venez
- [Pool Date](http://6v8.gamboni.org/Flickr-Pool-Date.html) pour savoir quand une photo a été ajoutée à un groupe
- [Sort Tags and Groups/Sets in photo page](https://www.flickr.com/groups/flickrhacks/discuss/72157594255139330/) pour trier alphabétiquement les groupes et les tags dans la page d'une photo
- [Flickr Commented On](http://userscripts.org/scripts/show/10382) pour savoir si vous avez déjà commenté une photo
- [Flickr 2→ Ipernity](http://www.ipernity.com/apps/gm) pour importer des photos Flickr dans son concurrent français [ipernity](http://www.ipernity.com/)

# Les personnalisations d'interface

- [Les *favicon* pour les favoris de la barre personnelle](/2008/01/afficher-les-favicon-dans-la-barre-personnelle-de-firefox-sous-mac-os.html)

[^2]: Selon l'algorithme de Flickr en tout cas
