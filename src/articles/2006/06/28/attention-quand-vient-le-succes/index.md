---
title:      "Attention quand vient le succès…"
date: 2006-06-28 12:00:00 +02:00
lang:       fr
tags:       [PHP, opensource, DotClear]
---

Alors que je m'interroge sur un éventuel [abandon de SPIP au profit de DotClear](/2006/06/faut-il-que-j-abandonne-spip-pour-dotclear.html), surtout avec [la première beta de DotClear 2.0 enfin disponible](http://www.dotclear.net/forum/viewtopic.php?id=19175), je dois avouer que le [modèle de mail à envoyer aux hébergeurs ne disposant pas de PHP5](http://www.dotclear.net/forum/viewtopic.php?id=19176)[^1] proposé à ceux qui veulent adopter DotClear 2.0 me laisse rêveur…

[^1]: Reproduit ici au cas où :
>
> Bonjour,
>
> Je constate avec surprise et regret que votre hébergement n'offre qu'une version ancienne de PHP et ne me permettra donc pas d'installer l'outil de blog que j'ai choisi.
>
> En effet, DotClear nécessite PHP5 ainsi que les extensions iconv mbstring, simplexml et le support des fonctions OB [à adapter aux carences révélées par le test]. Ces prérequis sont loin de pouvoir être considérés comme extravagants si l'on tient compte du fait que PHP5 est disponible depuis près de deux ans et que cette version est stable.
>
> Il me semble donc d'évidence que mettre à jour votre version de PHP fait partie de vos projets immédiats et j'aimerais connaître le délai dans lequel vous pensez le faire.
>
> Vous remerciant par avance de l'attention que vous portez aux demandes de vos clients, je vous salue cordialement.
>
> Amélie Poulain.
>

Malheureusement, le forum dans lequel est proposé ce modèle n'est pas ouvert aux commentaires, donc je réagis ici, au risque de faire gonfler l'affaire plus que nécessaire…

Je comprends qu'il soit très confortable, quand on développe un logiciel, de s'appuyer uniquement sur le dernier cri des fonctionnalités d'une technologie.

Mais de là à exiger des hébergeurs qu'ils suivent le mouvement sous prétexte que le logiciel en question est populaire[^2], il me semble qu'on n'est pas loin de l'abus de position dominante.

C'est à chaque hébergeur de se faire sa propre idée en ce qui concerne la pertinence du passage à PHP5. Il ne suffit pas de dire que « PHP5 est disponible depuis près de deux ans et que cette version est stable », même si c'est vrai, pour que ce passage devienne une « évidence » pour l'hébergeur !

Quelques points en vrac qui pourraient justifier mes propos :

- PHP4 est à priori plus stable que PHP5, puisqu'il y a plus d'historique et toujours une maintenance active[^3]. La stabilité de PHP5, même bonne, est donc toute relative.
- La plupart des projets logiciel libre ou développés en spécifique par tout un chacun sont clairement plus probablement faits en — et pour — PHP4, et ne fonctionnent pas — ou mal — en PHP5. Si l'hébergeur change de version, ce sont la plupart de ses clients qui risquent de changer de crèmerie, ce qu'aucune société commerciale n'est à priori prête à risquer.
- D'autres projets se permettent de tirer profit des nouveautés de PHP5 s'il est disponible, mais continuent à bien fonctionner sur PHP4.

Je pense donc qu'il faut absolument :

- d'une part que DotClear 1 continue à vivre — longtemps s'il le faut[^4] — et soit mis à jour quand des bugs ou failles de sécurité sont identifiés
- d'autre part que les développeurs de logiciels libres qui visent le grand public soit toujours humbles, surtout quand leur communauté commence à grossir

## Ajout du 7 juillet

Apparemment, [Free est maintenant compatible avec DotClear 2.0](http://callmepep.org/blog/2006/07/05/364-je-t-aime-moi-non-plus)[^5], ce qui est un élément à mon avis essentiel pour la propagation de cette nouvelle version.

[^2]:  [Supporté par Gandi](http://www.gandi.net/soutient/dotclear/) notamment, qui y voit sans doute un bon moyen de [se diversifier à moindre frais](http://www.lebardegandi.net/post/2006/06/23/GandiBlog-Beta)… tant mieux pour DotClear tant que ce n'est qu'un soutient

[^3]: Grâce à la présence encore aujourd'hui d'énormément de plateformes qui l'utilisent, soit dit au passage. Et là je me tire dans le pied, puisque s'il y avait moins de gens sur PHP4, il y en aurait sans doute plus sur PHP5, et sa stabilité serait encore meilleure… mais bon.

[^4]: PHP6 pointera le bout de son nez avant que tous les PHP4 soient éradiqués, à n'en pas douter

[^5]: Et il semblerait qu'il ne soit [pas le seul](http://www.dotclear.net/forum/viewtopic.php?id=19282)

Je ne m'attaque pas à [Olivier Meunier](http://www.neokraft.net/) en personne, puisque cette proposition de lettre ne semble de toute façon pas être de lui, et DotClear ne fait finalement que l'exemple opportuniste d'un sujet qui me traine en tête depuis bien longtemps…
