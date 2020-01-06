---
title: About this website
layout: page
lang: en
---

**Ce site est statique**, c'est à dire que les pages et leurs contenus venant du même domaine sont envoyées tel quel par le serveur, sans aucune création à la volée[^perf].

[^perf]: Difficile donc d'incriminer une quelconque application serveur en cas de lenteur… ;-)

*Si la technique ne vous intéresse pas, vous pouvez aussi [en apprendre plus sur moi](/about/).*

# Avec Jekyll, le statique c'est fantastique

Tout le site est généré par [Jekyll](http://jekyllrb.com/) à partir de documents rédigés en syntaxe [Markdown](http://fr.wikipedia.org/wiki/Markdown)[^kramdown]. Il a été généré pour la dernière fois le&nbsp;{{ build.timestamp }}.

[^kramdown]: En fait plutôt du [Kramdown](http://kramdown.gettalong.org/), une variante plus sympa de Markdown, permettant notamment cette note de bas de page.

Pour migrer les centaines de contenus rédigés depuis 2001 en syntaxe spécifique [SPIP](https://spip.net)[^spip], j'ai développé un [plugin SPIP → Markdown](https://github.com/nhoizey/spip2markdown) qui transforme tant que possible cette syntaxe spécifique en syntaxe Kramdown, y compris avec le [YAML Front Matter](http://jekyllrb.com/docs/frontmatter/).

[^spip]: SPIP est un excellent outil libre français de gestion de contenu, particulièrement pertinent pour les contenus éditoriaux.

## Quelques plugins

De [nombreux](https://jekyllrb.com/docs/plugins/#available-plugins) [plugins](https://www.jekyll-plugins.com/) existent dans l'écosystème Jekyll pour enrichir la solution de base, mais comme partout, tous ne fonctionnent pas bien, certains imposent des modes de fonctionnement contradictoires, ou tout simplement ne sont pas suffisamment configurables. Attention, la plupart de ces plugins empêchent d'utiliser la génération automatique de pages des [Github Pages](https://help.github.com/articles/using-jekyll-with-pages/).

Les images bénéficient de mon plugin [Jekyll Cloudinary](https://nhoizey.github.io/jekyll-cloudinary/) pour utiliser le service SaaS [Cloudinary](https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/sgyyc0j14k6p0sbt51nw) afin de générer les différentes versions nécessaires au Responsive Web Design, tout en optimisant au mieux la performance.

Concernant toujours les images, mais aussi tout autre fichier que je voudrais associer à un billet (PDF ou autre), mon plugin [jekyll-postfiles](https://nhoizey.github.io/jekyll-postfiles/) permet de les déposer dans le même endroit que le fichier Markdown, ce qui facilite grandement la publication.

Les tags sont supportés nativement par Jekyll, mais largement améliorés par le plugin [Jekyll Tagging](https://github.com/pattex/jekyll-tagging) qui génère les pages individuelles pour chaque tag, ainsi que le [nuage de tags](https://nicolas-hoizey.com/tags/).

Les pages d'archives par année et mois sont générées par le plugin [Jekyll Archives](https://github.com/jekyll/jekyll-archives)[^arch-tags].

[^arch-tags]: Ce plugin peut aussi générer les archives de catégories et tags, mais je n'utilise pas les premières, et les secondes sont déjà générées — mieux — par le plugin dédié.

Dans la mesure du possible, les ressources externes sont chargées en asynchrone pour ne pas pénaliser votre navigation, voire même uniquement à la demande, comme c'est le cas des vidéos Youtube grâce au plugin [Jekyll Youtube Lazyloading](https://github.com/erossignon/jekyll-youtube-lazyloading) qui n'affiche qu'une image en attendant que le visiteur clique pour vraiment charger la vidéo.

Les tweets sont chargés à l'aide du plugin [Lazy Tweet Embeding](https://github.com/takuti/jekyll-lazy-tweet-embedding) qui permet de juste écrire l'URL du tweet sur une ligne, difficile de faire plus simple.

Ce plugin m'a inspiré la création d'un autre similaire pour les vidéos de Youtube ou Vimeo, en cours de développement.

Les images pour illustrer les pages de tags et les meta *opengraph* utilisent le plugin [Jekyll File Exists](https://github.com/michaelx/jekyll_file_exists).

Les [Webmentions](https://www.w3.org/TR/webmention/), enfin, sont collectées par les services [Bridgy](https://brid.gy/) et [webmention.io](https://webmention.io/), et sont intégrées au site par le plugin [jekyll-webmention_io](https://github.com/aarongustafson/jekyll-webmention_io/) de [Aaron Gustafson](https://twitter.com/aarongustafson).

# La webperf

La performance des sites Web fait partie de mes dadas depuis plusieurs années, étant avant tout [frustré en tant que simple visiteur](https://twitter.com/nhoizey/status/562873571073355776/photo/1) par les sites plus lourds et lents les uns que les autres.

Produire un site en statique aide à optimiser cette performance, la génération de pages à la volée n'étant plus nécessaire. Mais je me suis attaché à vraiment proposer une expérience très agréable aux visiteurs, avec un site particulièrement performant.

Pour cela, plusieurs recettes ont été combinées :

Pour les opérations de base type concaténation et minification des CSS et JS, plus ajout d'un hash pour forcer un cache long au navigateur, le [plugin Jekyll Assets](https://github.com/jekyll-assets/jekyll-assets), basé sur [Sprockets](https://github.com/sstephenson/sprockets#readme), est incontournable. Il permet même de facilement insérer dans le HTML généré des bouts de CSS, JS et même SVG.

Pour les fontes, après avoir testé la technique [Flash Of Faux Text](https://www.zachleat.com/web/foft/) de [Zach Leatherman](https://twitter.com/zachleat), j'ai finalement abandonné les fontes chargées pour revenir à des fontes *web safe*.

Pour les images, la syntaxe standard `<img srcset="…" sizes="…" />` générée par mon plugin [Jekyll Cloudinary](https://nhoizey.github.io/jekyll-cloudinary/) est parfaite : [elle suffit dans 95% des cas](https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/){: hreflang="en"}, est plus légère dans le HTML, et plus optimisable par les navigateurs.

Les ressources externes, sources potentielles de troubles, sont principalement :

- les *players* de vidéos, dont Youtube, Vimeo ou Dailymotion
- les *widgets* de certains services, dont Ulule, Speakerdeck ou Slideshare
- Google Analytics, pour savoir un peu ce qu'il se passe sur le site

# Les commentaires

Passer au statique m'a fait perdre les commentaires que j'avais nativement dans SPIP, donc je m'étais résolu un peu plus tard à passer à Disqus pour ne pas perdre l'apport des discussions, bien que je n'aime pas trop que les commentaires soient du coup hébergés ailleurs.

J'avais aussi commencé assez vite à implémenter Webmention pour explorer une nouvelle technique standard de dialogue inter-blogs.

J'ai fini par [abandonner Disqus au profit de Webmention](/2017/07/so-long-disqus-hello-webmentions.html) seul, nous verrons ce que ça donne sur la durée.

# Et la recherche

La mise en place d'un moteur de recherche interne sur un site statique n'est pas plus simple que pour les commentaires. Il faut nécessairement faire du dynamique, trouver des éléments répondant aux critères de recherche et les lister.

Avec un site dynamique, il est possible d'indexer directement les contenus présents dans le dépôt de contenus, en général une base de données. Certains CMS intègrent même directement cette fonctionnalité, plus ou moins clef en main.

[Algolia](https://www.algolia.com/) est un moteur de recherche en mode SaaS intégralement pilotable par une API REST extrêmement riche. C'est [le choix que j'ai fait](/2015/06/un-moteur-de-recherche-sur-un-site-statique-facile-avec-algolia.html) pour proposer [un moteur de recherche sur ce site](/search/).

# Mais…

Publier un nouveau contenu est devenu plus compliqué, puisqu'il faut produire le Markdown et les éventuelles illustrations, puis lancer la compilation par Jekyll, avant de déployer.

Tout cela pourrait être facilité avec les Github Pages, mais c'est trop restrictif fonctionnellement.

Je pourrais aussi utiliser une solution d'intégration continue, [comme Boris](https://borisschapira.com/), mais j'ai encore quelques soucis de génération du site qui m'en empêchent pour l'instant.

Mais avoir une source de contenus propre, dans un format plus standard, et  versionnée dans Github, est un gain considérable.
