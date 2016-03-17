---
title:  Je m'appelle Nicolas Hoizey
layout: page
---

Je suis **passionné par le Web et la photographie**, entre nombreux autres centres d'intérêt.

## J'aime le Web

Je suis passionné par le Web, que j'ai découvert en 1996 durant mes études supérieures à l'[EISTI](https://www.eisti.fr/). J'ai donc naturellement créé ou participé à la création de nombreux sites au fil des années[^sites], autant de prétextes à explorer les nouveautés technologiques des standards du Web.

[^sites]: J'essaie de remettre en ligne tous les vieux sites dont j'ai gardé ou retrouvé les sources, comme [Ciné Files](http://archeologie.nicolas-hoizey.com/1998-cine-files/) qui date de 1998…

Toujours **soucieux de qualité**, j'ai participé au projet communautaire [Opquast](http://opquast.com/fr/), un référentiel de qualité pour le Web initié par [Temesis](http://temesis.com/). Je participe aussi régulièrement, parfois même en tant qu'orateur, à de belles conférences telles que [Paris Web](https://www.paris-web.fr/) ou [Sud Web](http://sudweb.fr/).

À titre professionnel, je suis **co-fondateur (en 2001) et directeur de l'innovation de [Clever Age](http://www.clever-age.com/)**, où je fais essentiellement du conseil en architecture Web (e-commerce, gestion de contenu, collaboratif, etc.) et de l'expertise *front end*, notamment Responsive Web Design et webperf. J'anime aussi quelques séminaires et formations sur ces sujets.

Un peu (trop ?) curieux et touche à tout en matière de Web, avec des connaissances des plus basses couches techniques réseau et système (ma spécialisation à l'EISTI) jusqu'à l'intégration *front end* de qualité intégrant notamment l'accessibilité universelle, je me qualifie moi-même aujourd'hui de **faciliteur de Web**, ayant à cœur de faire profiter les autres de mes connaissances, que ce soient mes clients, mes collègues ou d'autres membres de la communauté.

## J'aime la photographie

En dehors du Web, je suis aussi passionné de photographie. Jeune, j'ai beaucoup observé mon père utilisant son reflex argentique, surtout pour des photos de paysage ou de famille, et j'ai vite voulu m'y mettre aussi.

Je n'ai pas de thème ou sujet qui se démarque vraiment des autres dans ma production photographique, mais j'ai **une forte préférence pour le naturel**, qu'il s'agisse de paysages de nature ou urbains, ou de portraits.

Mon portfolio s'intitule [Photo Synthèse](http://photosynthese.net), et vous pouvez aussi retrouver mes photos sur les sites communautaires [500px](https://500px.com/nhoizey/) et [Flickr](https://www.flickr.com/photos/nicolas-hoizey/), ou sur [ma page Facebook](https://www.facebook.com/photo.synthese.nicolas.hoizey).

J'ai rejoint fin 2014 le [Photo Club de Draveil](http://photoclubdraveil.fr/) qui était en train de se créer, et participé depuis à plusieurs expositions collectives, l'occasion de **confronter son travail aux yeux de parfaits inconnus**, ce qui me paraît nécessaire pour progresser.

J'ai aussi récemment intégré l'équipe du magazine photo online [Phototrend](http://phototrend.fr/author/nicolas-hoizey/), où je publie surtout des tests de matériels et logiciels, mais aussi des actus du monde de la photo.

## Voici comment je gère ce site

### Le statique, c'est fantastique

Ce site est statique, c'est à dire que les pages et leurs contenus venant du même domaine sont envoyées tel quel par le serveur, sans aucune création à la volée.  Difficile donc d'incriminer une quelconque application serveur en cas de lenteur… ;-)

Tout le site est généré par [Jekyll](http://jekyllrb.com/) à partir de documents rédigés en syntaxe Kramdown[^kramdown]. Il a été généré pour la dernière fois le&nbsp;{{ site.time | date: "%d/%m/%Y"}}.

[^kramdown]: [Kramdown](http://kramdown.gettalong.org/) est une variante plus sympa de [Markdown](http://fr.wikipedia.org/wiki/Markdown), permettant notamment cette note de bas de page.

Pour migrer les centaines de contenus rédigés depuis 2001 en syntaxe spécifique [SPIP](http://spip.net)[^spip], j'ai développé un [plugin SPIP → Markdown](https://github.com/nhoizey/spip2markdown) qui transforme tant que possible cette syntaxe spécifique en syntaxe Kramdown, y compris avec le [YAML Front Matter](http://jekyllrb.com/docs/frontmatter/).

[^spip]: SPIP est un excellent outil libre français de gestion de contenu, particulièrement pertinent pour les contenus éditoriaux.

### Les plugins

De [nombreux](http://jekyllrb.com/docs/plugins/#available-plugins) [plugins](http://www.jekyll-plugins.com/) existent dans l'écosystème Jekyll pour enrichir la solution de base, mais comme partout tous ne fonctionnent pas, certains imposent des modes de fonctionnement contradictoire, ou tout simplement ne sont pas suffisamment configurables. Attention, la plupart de ces plugins empêchent d'utiliser les [Github Pages](https://help.github.com/articles/using-jekyll-with-pages/).

Les images bénéficient du plugin [Jekyll Picture Tag](https://github.com/robwierzbowski/jekyll-picture-tag)[^fork] qui implémente le nouveau standard `<picture>` pour les images responsives[^srcset].

[^fork]: D'ailleurs, [mon fork de jekyll-picture-tag](https://github.com/nhoizey/jekyll-picture-tag/) facilite l'usage en permettant de stocker les images source au même endroit que les fichiers Markdown, mais la PR correspondante n'a pas été acceptée par le mainteneur.

[^srcset]: Ce qui est déjà très bien, en attendant le support de `srcset/sizes`, qui serait suffisant et bien plus léger.

Les tags sont supportés nativement par Jekyll, mais largement améliorés par le plugin [Jekyll Tagging](https://github.com/pattex/jekyll-tagging) qui génère les pages individuelles pour chaque tag, ainsi que le nuage de tags visible en page d'accueil.

Les pages d'archives par année et mois sont générées par le plugin [Jekyll Archives](https://github.com/jekyll/jekyll-archives)[^arch-tags].

[^arch-tags]: Ce plugin peut aussi générer les archives de catégories et tags, mais je n'utilise pas les premières, et les secondes sont déjà générées par le plugin dédié.

Dans la mesure du possible, les ressources externes sont chargées en asynchrone pour ne pas pénaliser votre navigation, voire même uniquement à la demande, comme c'est le cas des vidéos Youtube grâce au plugin [Jekyll Youtube Lazyloading](https://github.com/erossignon/jekyll-youtube-lazyloading) qui n'affiche qu'une image en attendant que le visiteur clique pour vraiment charger la vidéo.

Les tweets sont chargés à l'aide du tag Liquid fourni par le [Jekyll Twitter Plugin](https://github.com/rob-murray/jekyll-twitter-plugin).

Les images pour illustrer les pages de tags, ainsi que les meta opengraph, utilisent le plugin [Jekyll File Exists](https://github.com/michaelx/jekyll_file_exists).

### La webperf

La performance des sites Web fait partie de mes dadas depuis plusieurs années, étant avant tout [frustré en tant que simple visiteur](https://twitter.com/nhoizey/status/562873571073355776/photo/1) par les sites plus lourds et lents les uns que les autres.

Produire un site en statique aide à optimiser cette performance, la génération de pages à la volée n'étant plus nécessaire. Mais je me suis attaché à vraiment proposer une expérience très agréable aux visiteurs, avec un site particulièrement performant.

Pour cela, plusieurs recettes ont été combinées :

Pour les opérations de base type concaténation et minification des CSS et JS, plus ajout d'un hash pour forcer un cache long au navigateur, le [plugin Jekyll Assets](https://github.com/jekyll-assets/jekyll-assets), basé sur [Sprockets](https://github.com/sstephenson/sprockets#readme), est incontournable. Il permet même de facilement insérer dans le HTML généré des bouts de CSS, JS et même SVG.

Pour les fontes, j'ai adapté ce que Zach Leatherman —de Filament Group— présente dans son billet [Flash Of Faux Text (FOFT) approach](http://www.zachleat.com/web/foft/) : la fonte de base Roman est chargée en appliquant les [font events](http://www.filamentgroup.com/lab/font-events.html) présentés par Scott Jehl —lui aussi de Filament Group—, et les variantes (gras, italique, combinaison des deux) sont ensuite chargées dans une autre CSS en tant que Data URIs encodées en base64, avec [loadCSS](https://github.com/filamentgroup/loadCSS), comme expliqué   dans [ce billet précédent de Zach](http://www.filamentgroup.com/lab/font-loading.html). Un brin complexe à expliquer, mais le résultat est impressionnant par rapport aux pratiques les plus courantes.

Pour les images, `<picture>` dans un premier temps, pour gérer au mieux l'aspect responsive du site, en attendant d'avoir la syntaxe `<img srcset sizes>` qui suffit dans 95% des cas, est plus légère dans le HTML, et plus optimisable par les navigateurs.

Les ressources externes, sources potentielles de troubles, sont principalement :

- les *players* de vidéos, dont Youtube, Vimeo ou Dailymotion
- les *widgets* de certains services, dont Ulule
- Google Analytics, pour savoir un peu ce qu'il se passe sur le site

### Les commentaires

Passer au statique m'a fait perdre les commentaires que j'avais nativement dans SPIP, et je me suis résolu à passer à Disqus pour ne pas perdre l'apport des discussions, bien que je n'aime pas trop que les commentaires soient du coup hébergé ailleurs.

Je commence aussi à implémenter WebMention[^wmio] pour explorer une [nouvelle technique standard de dialogue inter-blogs](https://www.w3.org/TR/2016/WD-webmention-20160112/).

[^wmio]: Notamment grâce à un service tiers, [webmention.io](http://webmention.io/), en attendant une éventuelle implémentation auto-hébergée.

### Et la recherche

La mise en place d'un moteur de recherche interne sur un site statique n'est pas plus simple que pour les commentaires. Il faut nécessairement faire du dynamique, trouver des éléments répondant aux critères de recherche et les lister.

Avec un site dynamique, il est possible d'indexer directement les contenus présents dans le dépôt de contenus, en général une base de données. Certains CMS intègrent même directement cette fonctionnalité, plus ou moins clef en main.

[Algolia](https://www.algolia.com/) est un moteur de recherche en mode SaaS intégralement pilotable par une API REST extrêmement riche. C'est [le choix que j'ai fait](https://nicolas-hoizey.com/2015/06/un-moteur-de-recherche-sur-un-site-statique-facile-avec-algolia.html) pour proposer [un moteur de recherche sur ce site](/recherche.html).

### Mais…

Publier un nouveau contenu est devenu plus compliqué, puisqu'il faut produire le Markdown et les éventuelles illustrations, puis lancer la compilation par Jekyll, avant de déployer.

Tout cela pourrait être facilité avec les Github Pages, mais c'est trop restrictif fonctionnellement.

Je pourrais aussi utiliser une solution d'intégration continue, [comme Boris](https://borisschapira.com/), mais j'ai encore quelques soucis de génération du site qui m'en empêchent pour l'instant.

Mais avoir une source de contenus propre, dans un format plus standard, et  versionnée dans Github, est un gain considérable.
