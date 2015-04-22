---
title:      À propos de ce site
layout:			page
---

## L'auteur

Je m'appelle Nicolas Hoizey.

Je suis passionné par le Web depuis que je l'ai découvert en 1996, durant mes études supérieures à l'École Internationale des Siences du Traitement de l'Information ([EISTI](https://www.eisti.fr/)). J'ai donc naturellement créé de nombreux sites au fil des années[^sites], autant de prétextes à explorer les nouveautés technologiques des standads du Web.

[^sites]: [Ciné Files](http://back-to-1998.gasteroprod.com/) par exemple en 1998…

Toujours soucieux de qualité, j'ai participé très rapidement au beau projet [Opquast](http://opquast.com/fr/), un référenciel de qualité pour le Web. Je participe aussi régulièrement, parfois même en tant qu'orateur, à de belles conférences telles que [Paris Web](https://www.paris-web.fr/).

Hors Web, je suis aussi passionné de photo. Mon portfolio s'intitule [Photo Synthèse](http://photosynthese.net), mais vous pouvez aussi retrouver mes photos sur les sites de partage [500px](https://500px.com/nhoizey/) et [Flickr](https://www.flickr.com/photos/nicolas-hoizey/), ou sur [ma page Facebook](https://www.facebook.com/photo.synthese.nicolas.hoizey). J'ai aussi intégré l'équipe de [Phototrend](http://phototrend.fr/author/nicolas-hoizey/), où je publie des tests de matériels et logiciels, ainsi que des actus du monde de la photo.

À titre professionnel, je suis co-fondateur (en 2001) et directeur de l'innovation de [Clever Age](http://www.clever-age.com/).

## Les contenus

Ce site personnel est essentiellement un blog, dans lequel je publie mes réflexions et retours d'expériences sur des sujets très variés, dominés par les technologies et usages du Web, et la photographie.

Je ne m'interdis pas de publier aussi des billets complètement inutiles et/ou fun, surtout les [vendredi](/tags/tgif.html).

## La technique

### Le statique, c'est fantastique

Ce site est statique, c'est à dire que les pages et leurs contenus venant du même domaine sont envoyées tel quel par le serveur, sans aucune création à la volée. Difficile donc d'incriminer une quelconque application serveur en cas de lenteur… ;-)

Tout le site est généré par [Jekyll](http://jekyllrb.com/) à partir de documents rédigés en syntaxe [Markdown](http://fr.wikipedia.org/wiki/Markdown)[^kramdown].

[^kramdown]: Ou plutôt en [Kramdown](http://kramdown.gettalong.org/), une variante plus sympa permettant notamment cette note de bas de page, mais c'est un détail.

Pour migrer les centaines de contenus rédigés depuis 2001 en syntaxe spécifique [SPIP](http://spip.net), j'ai développé un [plugin SPIP → Markdown](https://github.com/nhoizey/spip2markdown) qui transforme tant que possible cette syntaxe spécifique en syntaxe Kramdown, y compris avec le [YAML Front Matter](http://jekyllrb.com/docs/frontmatter/).

### Les plugins

De [nombreux](http://jekyllrb.com/docs/plugins/#available-plugins) [plugins](http://www.jekyll-plugins.com/) existent dans l'écosystème Jekyll pour enrichir la solution de base, mais comme partout tous ne fonctionnent pas, certains imposent des modes de fonctionnement contradictoire, ou tout simplement ne sont pas suffisamment configurables. Attention, la plupart de ces plugins empêchent d'utiliser les [Github Pages](https://help.github.com/articles/using-jekyll-with-pages/).

Les images bénéficient du plugin [Jekyll Picture Tag](https://github.com/robwierzbowski/jekyll-picture-tag)[^pr] qui implémente le nouveau standard `<picture>` pour les images responsives[^srcset].

[^pr]: D'ailleurs, j'ai fait une petite [pull request](https://github.com/robwierzbowski/jekyll-picture-tag/pull/60) sympa pour faciliter l'usage, faut pas hésiter à la commenter !

[^srcset]: Ce qui est déjà très bien, en attendant le support de `srcset/sizes`qui devrait être suffisant et bien plus léger.

Les tags sont supportés nativement par Jekyll, mais largement améliorés par le plugin [Jekyll Tagging](https://github.com/pattex/jekyll-tagging) qui génère les pages individuelles pour chaque tag[^accents], ainsi que le nuage de tags visible en page d'accueil.

[^accents]: Bon, il reste [un petit bug à corriger](https://github.com/pattex/jekyll-tagging/issues/34) —où une amélioration à apporter, c'est une question de point de vue— mais c'est déjà très utile.

Dans la mesure du possible, les ressources externes sont chargées en asynchrone pour ne pas pénaliser votre navigation, voire même uniquement à la demande, comme c'est le cas des vidéos Youtube grâce au plugin [Jekyll Youtube Lazyloading](https://github.com/erossignon/jekyll-youtube-lazyloading) qui n'affiche qu'une image en attendant que le visiteur clique pour vraiment charger la vidéo.

Les tweets sont chargés à l'aide du tag Liquid fourni par le [Jekyll Twitter Plugin](https://github.com/rob-murray/jekyll-twitter-plugin).

### La webperf 

La performance des sites Web fait partie de mes dadas depuis plusieurs années, étant avant tout [frustré en tant que simple visiteur](https://twitter.com/nhoizey/status/562873571073355776/photo/1) par les sites plus lourds et lents les uns que les autres.

Produire un site en statique aide à optimiser cette performance, la génération de pages à la volée n'étant plus nécessaire. Mais je me suis attaché à vraiment proposer une expérience très agréable aux visiteurs, avec un site particulièrement performant.

Pour cela, plusieurs recettes ont été combinées :

Pour les fontes, j'ai adapté ce que Zach Leatherman —de Filament Group— présente dans son billet [Flash Of Faux Text (FOFT) approach](http://www.zachleat.com/web/foft/) : la fonte de base Roman est chargée en appliquant les [font events](http://www.filamentgroup.com/lab/font-events.html) présentés par Scott Jehl —lui aussi de Filament Group—, et les variantes (gras, italique, combinaison des deux) sont ensuite chargées dans une autre CSS en tant que Data URIs encodées en base64, avec [loadCSS](https://github.com/filamentgroup/loadCSS), comme expliqué   dans [ce billet précédent de Zach](http://www.filamentgroup.com/lab/font-loading.html). Un brin complexe à expliquer, mais le résultat est impressionnant par rapport aux pratiques les plus courantes.

Pour les images, `<picture>` dans un premier temps, pour gérer au mieux l'aspect responsive du site, en attendant d'avoir la syntaxe `<img srcset sizes>` qui suffit dans 95% des cas, est plus légère dans le HTML, et plus optimisable par les navigateurs.

Les ressources externes, sources potentielles de troubles, sont principalement :

- les *players* de vidéos, dont Youtube, Vimeo ou Dailymotion
- les *widgets* de certains services, dont Ulule
- Google Analytics, pour savoir un peu ce qu'il se passe sur le site

### Mais…

Passer au statique m'a fait perdre les commentaires, dans lesquels se trouvent parfois plus de choses intéressantes que dans mes billets qui initient les discussions. Je vais implémenter WebMention pour essayer de compenser au moins partiellement.

Publier un nouveau contenu est aussi plus compliqué, puisqu'il faut produire le Markdown et les éventuelles illustrations, puis lancer la compilation par Jekyll, puis déployer. Tout cela pourrait être facilité avec les Github Pages, mais c'est trop restrictif fonctionnellement.