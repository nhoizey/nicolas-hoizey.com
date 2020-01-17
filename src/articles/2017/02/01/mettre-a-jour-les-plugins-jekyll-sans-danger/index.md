---
title: Mettre à jour les plugins Jekyll sans danger
date: 2017-02-01 12:00:00 +02:00
lang:  fr
tags:  [Jekyll, plugin]
---

Si vous n'utilisez pas [Bundler](https://bundler.io/) pour installer vos plugins Jekyll, c'est à dire [la troisième option de la documentation officielle des plugins Jekyll](https://jekyllrb.com/docs/plugins/#installing-a-plugin)[^doc], vous pouvez passer votre chemin. Ou vous y mettre, vous ne le regretterez pas ! Une fois l'installation gérée avec Bundler, voilà comment je vous conseille de gérer vos mises à jour.

[^doc]: Je préférerai d'ailleurs voir cette option en premier, tellement elle simplifie les choses.

![](/assets/logos/jekyll.png "Jekyll"){.logo }

# Connaître la liste des mises à jour disponibles

D'abord, lancez la commande suivante :

```shell
$ bundle outdated
```

Voilà un exemple de résultat, listant les plugins, ou leurs dépendances, pour lesquels des mises à jour sont disponibles :

```shell
*[master]
Fetching https://github.com/pattex/jekyll-tagging.git
Fetching gem metadata from https://rubygems.org/
Fetching version metadata from https://rubygems.org/
Fetching dependency metadata from https://rubygems.org/
Resolving dependencies…..

Outdated gems included in the bundle:
  * addressable (newest 2.5.0, installed 2.4.0)
  * concurrent-ruby (newest 1.0.4, installed 1.0.2)
  * i18n (newest 0.8.0, installed 0.7.0)
  * json (newest 2.0.3, installed 1.8.3)
  * liquid (newest 4.0.0, installed 3.0.6)
  * listen (newest 3.1.5, installed 3.0.8)
  * nokogiri (newest 1.7.0.1, installed 1.7.0)
  * nuggets (newest 1.5.0, installed 1.0.0)
  * rack (newest 2.0.1, installed 1.6.5)
  * rouge (newest 2.0.7, installed 1.11.1)
  * sprockets (newest 3.7.1, installed 3.6.3)
```

# Mettre tout à jour d'un coup (ATTENTION, DANGER !)

Pour prendre en compte toutes ces nouvelles versions, vous pouvez lancer une commande simple :

```shell
$ bundle update
```

Mais cela risque logiquement de mettre à jour plusieurs plugins en même temps, voire Jekyll lui-même, et de rendre complexe l'identification du coupable si cette mise à jour casse le fonctionnement du site.

# Mettre à jour progressivement

Afin de mettre à jour à moindre risque, il faut donc y aller étape par étape, c'est à dire plugin par plugin, et tester le résultat à chaque fois, avec au moins un `build` ou un `serve`.

Mettons par exemple à jour `nokogiri`.

Tout d'abord, faisons une copie de la liste des versions actuellement installées :

```shell
$ cp Gemfile.lock Gemfile.lock.old
```

Cela nous permettra de revenir en arrière si quelque chose ne fonctionne pas après mise à jour du plugin.

Mettons ensuite à jour `nokogiri` avec la commande suivante, utilisant l'option `--source` :

```shell
$ bundle update --source nokogiri
```

Voici un extrait du résultat :

```shell
Fetching gem metadata from https://rubygems.org/
Fetching version metadata from https://rubygems.org/
Fetching dependency metadata from https://rubygems.org/
Resolving dependencies…
[…]
Using nokogiri 1.7.0.1 (was 1.7.0)
[…]
Bundle updated!
```

La mise à jour s'est bien déroulée, il ne reste plus qu'à tester, et si tout se passe bien, on passe à la mise à jour suivante.

# Que faire si la mise à jour n'est pas satisfaisante ?

S'il y a un soucis, on peut revenir à la situation précédente en reprenant le `Gemfile.lock` précédent et en relançant l'installation :

```shell
$ cp -f Gemfile.lock.old Gemfile.lock
$ bundle install
```

# Il arrive que la commande `update` ne déclenche pas la mise à jour

Attention, ce n'est pas une erreur, certains plugins ne peuvent pas être mis à jour à cause de dépendances venant d'autres plugins.

Si par exemple je tente de mettre à jour `sprockets` avec `bundle update --source sprockets`, voici ce que j'obtiens :

```shell
*[master]
Fetching gem metadata from https://rubygems.org/……….
Fetching version metadata from https://rubygems.org/..
Fetching dependency metadata from https://rubygems.org/.
Resolving dependencies…
[…]
Using sprockets 3.6.3
[…]
Bundle updated!
```

`sprockets` est disponible en version `3.7.1` d'après `bundle outdated`, mais [`jekyll-assets` dépend encore de la version `3.6.3`](https://github.com/jekyll/jekyll-assets/blob/81a2c709938d53333dfe2898e842b4d9a2d72f9a/Gem.gemspec#L22), et `bundle update --source` respecte cette contrainte.

# Une nouvelle option à explorer ?

Une [option `--conservative` apparue avec Bundler `1.14`](https://github.com/bundler/bundler/pull/4980#issuecomment-254713686) semble produire le même résultat, mais la documentation n'est pas très claire, je n'ai pas encore compris son intérêt par rapport à `--source`. Des explications sont bienvenues en commentaire, si vous les avez… ;-)

# Mais ces précautions ne suffisent pas toujours

Un problème plus important serait d'avoir deux plugins avec une dépendance commune, mais avec des versions requises non compatibles.

Je n'ai heureusement pas encore eu ce cas à traiter.
