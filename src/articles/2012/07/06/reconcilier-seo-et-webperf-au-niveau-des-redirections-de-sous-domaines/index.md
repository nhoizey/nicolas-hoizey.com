---
title:      Réconcilier SEO et WebPerf au niveau des redirections de (sous)domaines
date: 2012-07-06 12:00:00 +02:00
lang:       fr
tags:       [SEO, WebPerf]
---

Le SEO et la performance Web sont deux disciplines très différentes liées à la mise en ligne de sites Web, avec des objectifs qui parfois peuvent être contradictoires. Mais des fois, ce qui paraît contradictoire ne l'est en fait pas si on y regarde de plus près, avec un peu de pragmatisme.

# SEO : un seul (sous-)domaine tu présenteras

Vous le savez sans doute si vous connaissez un peu le sujet du SEO — c'est certain si vous appliquez [la bonne pratique nº78 de la liste Opquast SEO](https://checklists.opquast.com/seo/criteria/16253/) — il est conseillé de toujours servir un contenu donné depuis un même (sous-)domaine afin d'éviter ce que l'on appelle le *duplicate content*. Le *duplicate content* est mal vu par les moteurs de recherche comme Google qui peuvent prendre cela pour du SPAM, et vous pénaliser dans les résultats de recherche.

Il est donc généralement conseillé de faire une redirection permanente — code HTTP 301 — en cas de requête vers un autre (sous-)domaine.

Par exemple, je préfère que mes pages soient accédées à l'URL [http://gasteroprod.com/](http://gasteroprod.com/) plutôt que [http://www.gasteroprod.com/](http://www.gasteroprod.com/), le `www.` n'ayant franchement aucun intérêt. On va dire que j'adhère au mouvement [no-www](http://no-www.org/).

J'avais donc mis dans ma configuration Apache les directives suivantes :

```apacheconf
RewriteCond %{HTTP_HOST} ^www\.gasteroprod\.com [NC]
RewriteRule ^(.*) http://gasteroprod.com/$1 [QSA,R=301,L]
```

# WebPerf : les redirections tu éviteras

Malheureusement, chaque redirection provoque une attente supplémentaire pour le visiteur, qui peut être néfaste pour sa perception de qualité de service du site.

Il est donc recommandé par tous les experts WebPerf — [Yahoo! YSlow](http://developer.yahoo.com/performance/rules.html/#redirects) et [Google PageSpeed](https://developers.google.com/speed/docs/best-practices/rtt#AvoidRedirects) notamment[^1] — de provoquer un minimum de redirections, particulièrement lors de l'accès à une page.

On est d'accord, cela peut ne représenter que 150 ms par redirection, mais j'ai vu des sites enchaînant plusieurs redirections avant de fournir le contenu.

Si vous utilisez — et vous le devez — [WebPageTest](http://webpagetest.org/) pour tester la performance de vos sites, il vous suffit de repérer les lignes jaunes sur la cascade, ce sont les redirections.

La [page d'accueil de la FNAC](http://fnac.fr/) est par exemple finalisée après 11 redirections. L'une — qui impacte le plus l'utilisateur — pour rediriger de [http://fnac.fr/](http://fnac.fr/) vers [http://www.fnac.com/](http://www.fnac.com/) et les 10 autres à cause de services de publicité et statistiques :

![](waterfall-fnac-20120706.png)

Mais alors comment faire, puisque le SEO me demande de faire des redirections ?

# Tout le monde, tu contenteras

C'est en fait assez simple techniquement, mais il faut surtout comprendre deux choses essentielles :

- L'Internaute moyen[^2] s'en fiche royalement de naviguer sur [http://gasteroprod.com/](http://gasteroprod.com/) ou sur [http://www.gasteroprod.com/](http://www.gasteroprod.com/), c'est le contenu qui l'intéresse[^3];
- Seuls les moteurs de recherche sont intéressés par des redirections qui leur permettent de réduire leur travail d'identification de potentiel *duplicate content*.

Du coup, c'est effectivement simple, il suffit de ne faire les redirections que pour les moteurs de recherche, en les identifiant à l'aide de leur signature `User Agent`. Oui, je sais, [le *User Agent Sniffing* c'est mal](http://my.opera.com/karlcow/blog/index.dml/tag/user%20agent%20sniffing), mais là c'est un cas extrême, on n'essaie pas de servir différents contenus et/ou présentations à des navigateurs.

Voilà donc ce que cela donne en réduisant la cible à [Googlebot](http://www.useragentstring.com/pages/Googlebot/), la signature du robot d'indexation de Google :

```apacheconf
RewriteCond %{HTTP_USER_AGENT} Googlebot
RewriteCond %{HTTP_HOST} ^www\.gasteroprod\.com [NC]
RewriteRule ^(.*) http://gasteroprod.com/$1 [QSA,R=301,L]
```

Vous pouvez bien entendu ajouter d'autres robots si cela vous chante…

[^1]: Et même peut-être un jour [une bonne pratique Opquast webperf](https://checklists.opquast.com/webperf/workshops/criterion/19918)…

[^2]: Ce n'est pas péjoratif.

[^3]: Enfin j'espère…
