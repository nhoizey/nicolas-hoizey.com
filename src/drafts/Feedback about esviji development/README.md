# retour d'expérience sur le développement de esviji en SVG

## 2009-05-11 Début d'intérêt pour le Web comme plateforme de jeu avec Canvas
http://www.lafermeduweb.net/billet/-tutorial-creer-un-jeu-web-avec-du-html-5-canvas-et-javascript-390.html

## Un démarrage en Raphael.js pour son support IE via WML

## 2011-12-05 Abandon de RaphaelJS au profit de SVG natif
https://twitter.com/esviji/status/276380791905337344

## 2012-06-05 Opera ne sait pas gérer simultanément plusieurs <use> d'un même élément SVG
http://nhoizey.github.com/tests/svg_image_use/
https://twitter.com/nhoizey/status/210344450659057665
2012-06-14 Corrigé dans Opera 12 (Opera.Next à l'époque)

## 2012-07-24 Safari et Chrome ne permettent pas de s'abonner à l'événement "endEvent" en JavaScript
http://codepen.io/nhoizey/details/ydsqm
https://bugs.webkit.org/show_bug.cgi?id=63727#c22

## 2012-07-25 Firefox supporte l'événement "endEvent", mais MDN donnait un exemple trompeur avec "end"
http://nhoizey.github.com/tests/svg_jq_dd/
https://github.com/nhoizey/nhoizey.github.com/commit/906fdab2c5822f8b5956e50282828d89ae5af580

## 2012-08-07 Matthias développe un polyfill pour supporter l'événement endEvent dans Safari et Chrome
https://github.com/madsgraphics/SVGEventListener/
http://codepen.io/nhoizey/details/mLtcn

## 2012-11-27 Je demande son avis à Christer Kaitila, développeur de jeux
https://twitter.com/nhoizey/status/273218011291332608

## 2012-12-04 Firefox est le seul à savoir styler un foreignObject
https://twitter.com/nhoizey/status/276107306717028352
[Un exemple simple sur CodePen.io](http://codepen.io/nhoizey/pen/sALzK)
[Bug ouvert sur le Bugzilla de WebKit](https://bugs.webkit.org/show_bug.cgi?id=104095)

## 2012-12-04 Un bout de SVG/CSS qui fait planter webkit…
https://twitter.com/nhoizey/status/276107897874825216
https://twitter.com/nhoizey/status/276107984730484736/photo/1
[La version qui fait crasher WebKit](http://webkit-crasher.esviji.com/)
Fait planter tous les webkit stables (Safari 6.0.2, Chrome 23.0.1271.95, Safari Mobile iOS 6) mais pas Webkit Nightly.

## 2013-01-23 Ajout du manifeste pour Firefox OS et ajout à Firefox Marketplace
https://marketplace.firefox.com/app/esviji/

## 2013-01-24 j'arrive à figer l'iPhone
"Je suis trop balaise, mon jeu @esviji installé en webapp fige parfois mon iPhone, et une autre webapp se lance toute seule… #bug"
https://twitter.com/nhoizey/status/294593304564219905

## 2013-01-23 Première soumission sur la Firefox Marketplace
https://marketplace.firefox.com/app/esviji/
Refusée à juste titre à cause  d'une erreur de manifeste

## 2013-01-25 Vincent Valentin crée une jolie icône respectant les conseils de Firefox OS
http://www.mozilla.org/en-US/styleguide/products/firefoxos/icons/
https://twitter.com/htmlzg/status/294733783788290048

## 2013-01-26 esviji fait partie des "staff picks" parmi les 35 démos présentées à l'issu des Firefox OS Apps Days \o/
http://www.flickr.com/photos/nitot/sets/72157632623533104/
https://twitter.com/nhoizey/status/295298421269614592

Ouverture et/ou confirmation de bugs :

- https://github.com/mozilla/r2d2b2g/issues/258#issuecomment-12732720
- https://github.com/mozilla/r2d2b2g/issues/166#issuecomment-12809317
- https://github.com/mozilla/r2d2b2g/issues/6#issuecomment-12809345
- https://bugzilla.mozilla.org/show_bug.cgi?id=835042
- https://bugzilla.mozilla.org/show_bug.cgi?id=835041
- https://bugzilla.mozilla.org/show_bug.cgi?id=832222#c16

Nouvelle soumission sur la Firefox Marketplace

## 2013-01-27 Inscription à la compétition Game On organisée par Mozilla

## 2013-02-19 Abandon des gradients dans le fond et les balles pour gagner en performances

- https://bugzilla.mozilla.org/show_bug.cgi?id=835041#c3
- https://twitter.com/esviji/status/303927501720281088
- https://twitter.com/gstraymond/status/303978829779726337
- https://twitter.com/sojul/status/304004347556143105

## 2013-02-26 Ajout d'un panneau pour le classement des meilleurs scores

# Enseignements
S'énerver sur des bugs ça défoule, mais les signaler publiquement, ça permet surtout :

- s'ils sont avérés de les faire corriger
- si ce ne sont pas des bugs de constater :
	- que des docs / tutoriels sont erronés
	- que c'est notre utilisation qui n'est pas bonne, et donc d'apprendre

## [Faites des remontées de bugs !](http://rik.github.com/browserfeatures/)

- Chez Apple : https://bugreport.apple.com/
