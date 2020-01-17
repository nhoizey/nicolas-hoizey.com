---
title: Lister des contenus similaires avec Jekyll
date: 2017-01-23 12:00:00 +02:00
lang:  fr
tags:  [Jekyll, plugin]
---

Arrivé à la fin d'un billet, il est toujours intéressant de pouvoir facilement continuer la lecture avec un autre billet, sans changer de site. C'est l'objet des liens « billet précédent » / « billet suivant » que l'on trouve sur de nombreux blogs. Mais les sujets traités sur ce site étant très variés, il y a peu de chance qu'un lecteur puisse être intéressé par un autre billet qui ne serait proche que chronologiquement de celui qu'il vient de lire. Les propositions de rebond doivent être plus intelligentes que cela.

![](/assets/logos/jekyll.png "Jekyll"){.logo }

Jekyll disposait nativement dans sa version 2 d'un système de calcul de contenus similaires, sous la forme d'[une option LSI pour la génération du site](https://jekyllrb.com/docs/configuration/#build-command-options)[^lsi], qui permettait de remplir un tableau `site.related_posts`[^post_site]. LSI signifie [Latent Semantic Analysis](https://en.wikipedia.org/wiki/Latent_semantic_analysis#Latent_semantic_indexing). Je sais, ça ne vous avance pas à grand chose.

[^lsi]: Cette option est à activer avec le paramètre `--lsi` pour les commandes `build` ou `serve` de Jekyll, ou directement — ce que je préfère — dans le paramétrage du `_config.yml` avec une entrée `lsi: true`.

[^post_site]: Je n'ai pas encore compris pourquoi c'est [une variable du site](https://jekyllrb.com/docs/variables/#site-variables) (`site.related_posts`) et non du billet (`post.related_posts`), mais là n'est pas la question…

Dans sa version 3, sortie [il y a déjà 15 mois](https://jekyllrb.com/docs/history/#v3-0-0), la doc indique toujours cette option, mais il faut essuyer une erreur de génération de site et retrouver dans un moteur de recherche une référence à la [procédure de migration de Jekyll 2 vers Jekyll 3](https://jekyllrb.com/docs/upgrading/2-to-3/) pour comprendre que ce qui était auparavant natif ne l'est plus, et [nécessite maintenant](https://jekyllrb.com/docs/upgrading/2-to-3/#dropped-dependencies) d'installer et référencer explicitement le plugin [`classifier-reborn`](https://github.com/jekyll/classifier-reborn) via Bundler et la configuration `Gemfile`.

De manière générale, c'est une très bonne idée de réduire l'étendue du cœur de l'application, pour améliorer sa stabilité et faciliter sa maintenance, donc j'approuve la démarche, mais Jekyll ne gère malheureusement pas (encore ?) des documentations par version, d'où cet imbroglio.

Une fois le plugin installé, il suffit d'ajouter un bout de code tel que celui-ci au gabarit `_layouts/post.html` pour lister les billets similaires :

{% raw %}

```liquid
<ul>
  {% for post in site.related_posts limit:6 %}

    <li><a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}

</div>
```
{% endraw %}

Ensuite, lancez la commande `bundle exec jekyll build --lsi` et…

…partez vous balader.

…retournez vous balader, la génération du site n'est pas terminée. Ou plutôt, l'indexation LSI n'est pas terminée.

Personnellement, je n'ai pas attendu la fin du processus, je l'ai tué au bout de plus de 2h, bien énervé. J'ai 512 billets sur mon site à l'heure actuelle. La génération sans ce LSI prend environ 5 minutes. J'avais déjà eu ce souci avec seulement 80 billets [il y a un an](http://stackoverflow.com/questions/30038899/jekyll-build-stuck-in-rebuilding-index-stage), et j'avais abandonné.

Entre temps, j'avais testé une approche en pur Liquid se basant uniquement sur les tags, mais ce n'était vraiment pas satisfaisant, et plutôt long là aussi. J'avais aussi testé le plugin [jekyll-related-posts](https://github.com/alfanick/jekyll-related-posts), mais les résultats n'étaient pas aussi bons que le LSI « standard » de Jekyll, et [un bug récent](https://github.com/alfanick/jekyll-related-posts/issues/3) empêchant `jekyll serve` m'a fait fuir.

C'est que j'avais malheureusement raté [une réponse très pertinente](http://stackoverflow.com/a/35495234/717195) arrivée depuis. Pour accélérer le traitement LSI, il faut utiliser un composant plus proche du système, et de ses performances, que l'implémentation en Ruby. [Merci donc à Brad Greenlee pour l'astuce](http://footle.org/2014/11/06/speeding-up-jekylls-lsi/), qui consiste à installer la [GNU Scientific Library](http://www.gnu.org/software/gsl/) (GSL) et la [gem Ruby gsl](https://rubygems.org/gems/gsl) qui permet de l'exploiter.

Sur macOS, installer GSL est simple avec Homebrew :

```shell
brew install gsl
```

Ensuite, la gem doit être ajoutée au `Gemfile` tout comme `classifier-reborn`, mais hors de la section `:jekyll_plugins` puisque ce n'est pas un plugin Jekyll, et l'installation se fait avec la commande `bundle install`.

Vous pouvez regarder [mon propre `Gemfile`](https://github.com/nhoizey/nicolas-hoizey.com/blob/master/Gemfile) si vous avez un doute.

Avec ces ingrédients magiques, l'indexation LSI ne prend plus que 5 minutes en gros, c'est devenu largement acceptable !
