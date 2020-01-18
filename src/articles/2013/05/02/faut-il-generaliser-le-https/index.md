---
title:      Faut-il généraliser le HTTPS ?
date: 2013-05-02 12:00:00 +02:00
lang:       fr
tags:       [security, HTTPS]
---

J'ai vu ces derniers jours un blog passer à [TLS par défaut](https://n.survol.fr/n/tls-par-defaut), et je me demandais justement s'il n'était pas possible maintenant de le faire sur tous les sites nécessitant un minimum de confidentialité, notamment la plupart des sites e-commerce.

# Pourquoi voudrait-on le faire ?

Déjà, sur tous les sites permettant de s'authentifier, la procédure devrait être systématiquement sécurisée avec TLS[^1], mais ce n'est malheureusement pas toujours le cas. Quand on parle de saisie de données personnelles, éventuellement confidentielles, voir sensibles —système de paiement par exemple—, il devrait de toute façon être interdit de passer outre.

# Ce que l'on fait couramment

La pratique la plus courante reste de ne sécuriser que le strict nécessaire, ce qui conduit à avoir certaines pages en HTTP et d'autres en HTTPS. Cela peut conduire —si l'on n'est pas suffisamment prudent— à des pages en HTTPS qui tentent de charger des ressources en HTTP. Jusqu'à présent, seul Internet Explorer se plaignait avec une popup incompréhensible pour le commun des mortels, mais bientôt [Firefox 23 refusera tout simplement de charger la ressource](http://blog.mozilla.org/tanvi/2013/04/10/mixed-content-blocking-enabled-in-firefox-23/). Ce qui nous poussait initialement à rester en HTTP tant que possible était si je ne m'abuse l'impact en termes de performance de TLS, tant côté serveur que client. Cet impact est à priori aujourd'hui négligeable, y compris sur la plupart des smartphones qui débordent de puissance de calcul.

Pourquoi ne pas tout mettre en HTTPS dans ce cas, être certains ainsi que tout est sécurisé, et ne plus risquer de faire des mélanges HTTPS/HTTP ?

# Pourquoi ne pas le faire ?

En discutant du sujet autour de moi, j'ai eu les alertes suivantes[^2] :

## Les performances

> Les performances de ton HTTPS vont beaucoup dépendre des performances de ton fournisseur de certificat SSL et en particulier de ses fichiers de liste de révocation.
>
> Côté performances, il y a https://revocation-report.x509labs.com qui permet déjà de ce faire une idée. Mais ça ne prends en compte que les contrats de SLA publics non négociés, et s'il existe d'autres comparateurs du même type ce sera souvent la même chose.
>
> En tout cas le mois dernier StartSSL (qui est sûrement le fournisseur SSL le moins cher du marché) [se targuait d'être en pôle position](https://twitter.com/startssl/status/324975028712116225)

## Le lien entre certificat(s) et adresse(s) IP du(des) serveur(s)

> Côté hébergement on est toujours bloqué à 1 certificat SSL par IP à cause des vieux OS, en particulier Windows XP qui ne supportent pas le SNI (pour Server Name Indication, sorte de vhost SSL pour résumer). La seule vraie solution de contournement qui fonctionne partout c'est le SAN (Subject Alternative Names) qui consiste à embed plusieurs certificats SSL en un seul, mais alors ça implique que tous tes certificats soient chez le même presta SSL.

## Les coûts

> Il y a également le coût de la requête quand on utilise des CDN. L'écart de prix est en général de 30%, comme [chez CloudFront](https://aws.amazon.com/fr/cloudfront/pricing/).

## Autre impact sur l'usage d'un CDN

> Concernant le CDN attention : ton fournisseur ne te laissera peut être pas la possibilité d'utiliser ton propre certificat, […] nous sommes obligés de charger tout le contenu CDN depuis le domaine *.cloudfront.net sous peine d'avoir une erreur de chargement SSL

## L'impact sur les choix d'architecture

> [Varnish ne gère pas le HTTPS](https://www.varnish-cache.org/docs/trunk/phk/ssl.html). Donc en fonction de tes moyens, si tu ne peux pas te payer un load balancer HTTPS, tu risques de devoir rajouter de la complexité dans ton architecture avec un reverse proxy SSL comme Pound ou Nginx devant Varnish et perdre la capacité de Varnish à gérer très rapidement les ouvertures de connexions.

Commentaire auquel un autre répond :

> Les différentes mesures que j'avais effectuées avec Pound sur une archi FreeBSD il y a 2 ans (déjà) montraient que les différences de temps de réponse entre HTTP et HTTPS devant un varnish voire un nginx ou un apache étaient négligeables.
>
> Mais ça ajoute la complexité de maintenir une archi un peu spécifique (en même temps, quand on commence à monter du varnish, c'est qu'on sait qu'on part dans des archis aux petits oignons)

# Et vous, qu'est-ce que vous en pensez ?

Finalement, il semble qu'il y ai effectivement des impacts non négligeables, mais pas insurmontables tout de même.

Qu'en dites-vous, des retours d'expérience à partager ?

[^1]: Même un mécanisme super évolué comme celui de SPIP, avec chiffrement côté client et sel à usage unique, n'est plus suffisant [si JavaScript vient à manquer, ce qui arrive plus souvent qu'on ne le croit](http://christianheilmann.com/2011/12/06/that-javascript-not-available-case/). Il a néanmoins l'avantage de fournir une bonne sécurité dans la plupart des cas, beaucoup des utilisateurs de SPIP ne pouvant mettre en œuvre TLS.

[^2]: Je ne nomme pas les personnes, elles se reconnaîtront et participeront à la discussion si elles le souhaitent…
