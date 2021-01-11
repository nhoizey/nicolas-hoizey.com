---
title:      Gandi m'a (presque) tuer, mais je n'ai pas déserté !
date: 2008-05-25 12:00:00 +02:00
lang:       fr
tags:       [hosting, Linux, Gandi, fail]
---

Si vous venez de temps en temps vous balader sur ce site[^1], vous avez peut-être eu la déception de découvrir qu'il ne répondait plus pendant une semaine. Non, je n'ai pas succombé à l'incroyable faille de sécurité SSH présente dans Debian Linux[^2] depuis deux ans, c'est tout simplement que [mon hébergeur Gandi a eu des soucis matériels](http://iwi.lebardegandi.net/post/2008/05/21/Le-filer-13-%3A-Epilogue) dont j'ai subit des effets de bord.

[^1]: Levez la main que je vous compte ! 😉

[^2]: Oui, c'est la distribution que j'utilise tant bien que mal depuis peu

Comme vous le savez déjà, [j'ai migré Gastero Prod vers Gandi](/2008/02/c-est-la-saison-migratoire.html) il y a déjà 3 mois, et j'étais jusqu'à présent totalement satisfait du rapport coût/qualité de service.

## Chronique d'une semaine sans site

Malheureusement, une des plateformes supportant l'architecture est [tombé en carafe **jeudi 15 mai** en début d'après-midi](http://www.lebardegandi.net/post/2008/05/16/Problemes-de-disques). Ma machine virtuelle ne se trouvait heureusement pas sur le « filer 13 », donc je n'ai perdu aucune donnée, mais [j'ai subit des effets de bord rendant le site indisponible](http://www.lebardegandi.net/post/2008/05/16/Problemes-de-disques#c165464).

![Le logo de Gandi](logo-gandi-hebergement.png){.logo}

Après 3 jours de petite angoisse, [Gastero Prod est finalement revenu en ligne **dimanche**](http://www.lebardegandi.net/post/2008/05/16/Problemes-de-disques#c165741)…

…pour [retomber à nouveau entre dimanche après-midi et lundi matin](http://www.lebardegandi.net/post/2008/05/18/Problemes-de-disques-en-cours-de-resolution#c165913) ! :-(

Nicolas de Gandi a heureusement réagit **lundi** pour me signaler qu'il travaillait dessus, et que [ma machine était visiblement en Kernel Panic](http://www.lebardegandi.net/post/2008/05/18/Problemes-de-disques-en-cours-de-resolution#c165926). Je partageais de plus en plus cet état, désespérant de revoir Gastero Prod en ligne sous peu.

[Sans nouvelles le **mercredi** matin](http://www.lebardegandi.net/post/2008/05/18/Problemes-de-disques-en-cours-de-resolution#c166017), [Nicolas me disait à nouveau qu'il s'occupait de moi](http://www.lebardegandi.net/post/2008/05/18/Problemes-de-disques-en-cours-de-resolution#c166022), mais j'avais de plus en plus de mal à le croire.

Histoire de détruire le peu d'espoir qu'il me restait, [Laura de Gandi suggère alors en début d'après-midi qu'une part ne suffit pas pour une plateforme LAMP](http://www.lebardegandi.net/post/2008/05/18/Problemes-de-disques-en-cours-de-resolution#c166032) — un site SPIP comme celui-ci par exemple — ce qui confirme malheureusement les [tests faits par Fil et Ben.](http://www.spip-blog.net/Premiers-tests-de-Gandi-Hosting.html), mais [Nicolas relativise en indiquant que c'est surtout le trafic qui détermine la puissance nécessaire](http://www.lebardegandi.net/post/2008/05/18/Problemes-de-disques-en-cours-de-resolution#c166037). Vu le faible trafic de Gastero Prod, une part devrait me suffire pour l'instant, mais je commande tout de même une seconde part[^3] pour être sûr que l'indisponibilité persistante ne vient pas de là.

Toujours sans nouvelles en fin d'après-midi, [je relance à tout hasard pour voir si on ne m'a pas oublié](http://www.lebardegandi.net/post/2008/05/18/Problemes-de-disques-en-cours-de-resolution#c166070), et cette fois [Greg de Gandi m'assure **jeudi** matin qu'il s'occupe de moi](http://www.lebardegandi.net/post/2008/05/18/Problemes-de-disques-en-cours-de-resolution#c166088), et m'informe que [ma VM a souffert notamment à cause d'opérations gourmandes de MySQL, mais est maintenant disponible](http://www.lebardegandi.net/post/2008/05/18/Problemes-de-disques-en-cours-de-resolution#c166095). Il m'invite à aller discuter dans le forum de support plutôt que sur le blog, [ce que je fais, visiblement sans trouver d'interlocuteur](http://groups.gandi.net/fr/topic/gandi.fr.hebergement.expert/15410).

Je fini par aussi envoyer un message au support pour obtenir un ticket d'incident, et Greg me contacte alors directement par mail **vendredi** pour m'indiquer que ma VM redémarre bien, mais ne répond pas à cause d'un problème d'I/O[^4]. Il m'indique finalement en fin d'après-midi d'activer la console et de lancer une vérification du disque[^5], ce que je ne parviens pas à faire, la console restant désespérant muette !

Ryan de Gandi — je vais finir par tous les connaître — répond à mon ticket **samedi** en fin de matinée en indiquant que mon « serveur fait partie d'un groupe plus large qui rencontre un problème de saturation qui explique bien les observations que [j'ai] remontées ». Maigre consolation, je ne suis donc pas seul à subir ces tracas.

C'est finalement **dimanche** matin, après plusieurs redémarrages, que j'arrive enfin à accéder à la console et à lancer la vérification du disque, qui a effectivement de multiples petits problèmes sans gravité, et que tout revient dans l'ordre !

## Et maintenant ?

J'avoue que j'ai eu la tentation à plusieurs reprises au cours de ces **10 jours d'indisponibilité** de quitter Gandi, mais je suis conscient que le service est encore en *beta* et que Gandi est autant victime que moi avec un fournisseur semble-t-il peu sérieux[^6].

Je tiens aussi à saluer l'équipe de Gandi — dont au moins Nicolas, Laura, Greg, et Ryan, si vous avez suivi — qui a été sur le pont toute la semaine, bien plus réactive et transparente sur les soucis rencontrés que bien d'autres professionnels auxquels j'ai pu avoir à faire à titre personnel ou professionnel.

Je vais donc rester encore un peu, avec maintenant deux parts — et peut-être un peu plus bientôt puisque d'autres sites vont rejoindre Gastero Prod — et surtout la mise en place très rapidement de sauvegardes automatiques distantes.

L'avenir dira si j'ai fait le bon choix…

[^3]: Je pourrais la résilier dès que je voudrais et ne paierait rien de plus, ça mérite une tentative

[^4]: *Input/Output*, soit entrée/sortie, les moyens de communication, quoi

[^5]: Commande `fsck` pour les connaisseurs

[^6]: Des disques durs issus d'une même série dans la baie, c'est la quasi assurance que si l'un est défectueux, les autres le seront aussi, ce n'est pas très professionnel
