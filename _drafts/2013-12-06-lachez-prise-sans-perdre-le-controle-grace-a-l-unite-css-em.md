---
title:			Lâchez prise sans perdre le contrôle grâce à l’unité CSS em
lang:				fr
tags: 			[CSS, em, accessibilité]
---

Cela fait déjà bien longtemps qu'il est recommandé d'utiliser des unités relatives pour définir les tailles de texte, avec une préférence pour em plutôt que %. «[A DAO Of Web Design](http://alistapart.com/article/dao) »[^dao], écrit en 2000 par John Allsopp, est un article fondateur de l'intégration Web de qualité :

[^dao]: Article traduit par les Pompeurs, bien entendu, sous le titre « [Le tao du design Web](http://www.pompage.net/traduction/dao) ».

> C'est la nature du web d'être flexible, et il en va de notre rôle en tant que concepteurs et développeurs d'embrasser cette flexibilité et de produire des pages qui, en étant flexible, sont accessibles à tous. Faire des pages qui s'adaptent aux besoins d'un lecteur, dont la vue est plus qu'imparfaite, et qui souhaitent lire des pages avec une grande taille de police.

Ces principes sont tellement essentiels qu'ils font parti des critères d'accessibilité du W3C[^wcag2] et de leur déclinaison française AccessiWeb[^accessiweb], et assez naturellement des Bonnes Pratiques qualité d'[Opquast](http://www.opquast.com/)[^opquast].

[^wcag2]: Le [critère 1.4.4 des WCAG 2.0](http://www.w3.org/Translations/WCAG20-fr/#visual-audio-contrast-scale) indique que « […] le texte peut être redimensionné jusqu'à 200% sans l'aide d'une technologie d'assistance et sans perte de contenu ou de fonctionnalité ». Les [techniques de mise en œuvre](http://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-scale) associées indiquent clairement qu’il est nécessaire d’utiliser des dimensions en em.

[^accessiweb]: Le [critère 10.4 du label AccessiWeb 2.2](http://www.accessiweb.org/index.php/accessiweb_2.2_liste_generale.html#crit-10-4) demande « dans chaque page Web, le texte reste-t-il lisible lorsque la taille des caractères est augmentée jusqu'à 200%, au moins ? ».

[^opquast]: Le [critère 142 de la liste Opquast v2](http://checklists.opquast.com/11/criteria/641/) indique clairement que « la taille des polices destinées à l'affichage écran est exprimée en taille variable et non en taille fixe. »

La volonté très — trop — courante de maîtriser complètement la façon dont les contenus s'affichent sur les écrans, à tel point qu'on parle de « Pixel Perfect », va complètement à l'encontre de cette diversité de supports et de préférences des utilisateurs.

Aujourd'hui, je parcours le Web principalement sur un ordinateur, mais aussi de plus en plus souvent sur un smartphone, occasionnellement sur une tablette, parfois sur un ordinateur connecté à une télévision, mais par contre plutôt rarement sur une liseuse. Je ne suis pas une exception, ces nouveaux modes de navigation sur le Web sont de plus en plus largement utilisés[^comscore] et de plus en plus nombreux et variés. Vous pouvez au moins ajouter à ma liste les consoles de jeux de salon et portables[^], les boitiers d'accès Internet, les télévisions connectées, les lunettes et les montres.

[^comscore]: Plusieurs études, dont celle de comScore citée dans [ces slides](http://fr.slideshare.net/favril/jumptap-screen-jumpingstudy), indiquent que le temps passer à naviguer sur smartphones et tablettes a maintenant dépassé celui sur PC.

Nous ne savons de plus pas de quoi sera fait le futur du Web, donc il est important de s'attacher à accepter que les contextes de navigation changent, et faire en sorte que les dégâts sur nos réalisations soient les plus faibles possibles. C'est le principe «[Future Friendly](http://futurefriend.ly/) » que nous devons embrasser.

## Les interfaces doivent être adaptées à des conditions de consultations variables

Les nouveaux moyens de navigation sur le Web doivent donc être pris en compte dans la conception des sites. Ces différents appareils ont bien entendu des tailles physiques et formats — paysage ou portrait notamment — très différents. Nous les utilisons aussi à des distances différentes, et avec des moyens d'interaction très variables, de la souris à la gestuelle en passant par le tactile, la voix, une télécommande ou manette de jeux, etc. Mais un sujet à la fois, concentrons nous ici sur l'affichage.

La diversité de tailles et distances de visualisation des écrans impose de concevoir la présentation afin que celle-ci soit pertinente de base pour un maximum d'utilisateurs, mais aussi adaptable aux préférences ou nécessités éventuelles de certains d'entre eux.

Il existe pour cela plusieurs techniques, parfois complémentaires.

## Le pixel de référence

Avant, un pixel était un pixel physique, et même si [la densité de pixels physiques variait déjà pas mal](http://www.lesintegristes.net/2011/05/06/web-resolution-72dpi/), une dimensions exprimée en pixel était appliquée directement sur de « vrais » pixels.

Afin de retrouver des mesures cohérentes d'un appareil à un autre, le W3C a donné [une nouvelle définition au pixel CSS, appelé maintenant pixel de référence](http://www.w3.org/TR/CSS2/syndata.html#img-pixel1).

Ainsi, si l'on s'intéresse à la taille réelle d'un bloc de 10 lignes de texte avec une font-size de 16px et une line-height de 1.5 — soit une hauteur de 240 pixels —, la dimension physique verticale devra être de l'ordre de [quatre centimètres et demi à une distance de visualisation de cinquante centimètres](http://sizecalc.com/#distance=0.5meters&perceived-size=240rpx&physical-size-units=millimeters) — un ordinateur ou une tablette par exemple :

![Taille physique nécessaire pour visualiser 10 lignes de texte à 50cm de distance](http://media.24joursdeweb.fr/2013/12/image01.png)

Elle devra être de l'ordre de [trente six centimètres à une distance de visualisation de quatre mètres](http://sizecalc.com/#distance=4meters&perceived-size=240rpx&physical-size-units=millimeters) — une télévision à priori :

![Taille physique nécessaire pour visualiser ces mêmes 10 lignes de texte à 4m de distance](http://media.24joursdeweb.fr/2013/12/image02.png)

Malheureusement, tous les fabricants ne respectent pas cette définition du pixel de référence, et on se retrouve avec [des variations assez importantes qui pénalisent les utilisateurs](http://alistapart.com/article/a-pixel-identity-crisis/), et peuvent nécessiter des adaptations spécifiques.

## Le viewport

Pour permettre un affichage confortable sur ses écrans « Retina » — ou HiDPI — à forte densité de pixels tant de sites prévus pour mobiles que de sites à grande largeur, Apple a inventé la balise , une dimension virtuelle supplémentaire permettant d'ajuster la taille des pixels CSS. Avec ce viewport associé à une dimension virtuelle device-width[^], le pixel CSS doit rester de taille relativement constante d'un appareil à l'autre à distance de vision similaire, quelle que soit la densité de pixels réels, c'est à dire proche du pixel de référence.

Cependant, afin de permettre l'affichage des nombreux sites non adaptés aux mobiles, les smartphones utilisent souvent un viewport par défaut très grand, bien plus que celui donnant des pixels CSS à la taille de référence. Par exemple, le viewport par défaut de l'iPhone 4, premier smartphone HiDPI avec 640 pixels physiques en largeur, est de 980 pixels. Le viewport optimal sur mobile — [défini principalement avec width=device-width](http://blog.goetter.fr/post/32513655620/viewport-adieu-width-device-width) — est par contre de 320 pixels.[^]

Apple a aussi inventé la propriété CSS device-pixel-ratio pour indiquer le rapport entre les pixels CSS et pixels réels, propriété remplacée depuis par l'unité standard dppx[^]. Les premiers appareils HiDPI avaient quatre fois plus de pixels réels que de pixels CSS — soit 2dppx — mais le marché s'est énormément diversifié.

De même, de nombreuses télévisions connectées et consoles de jeu de salon ont [un viewport inférieur à leur résolution native Full HD](https://speakerdeck.com/steveworkman/are-you-browsing-comfortably?slide=13) — 1920x1080 pixels — afin de permettre une bonne lisibilité à grande distance. Mais certaines conservent le viewport natif[^].

![Les viewports de certaines consoles de salon et TV connectées](http://media.24joursdeweb.fr/2013/12/image03-860x482.png)

Associé à ce viewport, on peut aujourd'hui mettre en place des présentations adaptatives des contenus à l'aide de Media Queries CSS[^].

Malheureusement, [même un viewport adapté ne suffit pas forcément](http://www.lukew.com/ff/entry.asp?1816) pour indiquer à un site comment proposer une présentation optimisée.

De plus, le viewport est défini par le constructeur, est donc le même pour tous les utilisateurs d'un même matériel, alors que leurs besoins ne sont pas les mêmes.

## Le zoom

Une autre façon d'adapter la présentation à une forte densité de pixels ou une grande distance de consultation, en conservant une taille de pixel CSS plus petite, égale ou proche de sa taille réelle, est de grossir les éléments eux-mêmes.

Une étude faite par Facebook[^] montre que 15% de ses visiteurs ont un niveau de zoom différent de 100%. Même s'il est probable qu'une partie de ces zooms sont involontaires[^], surtout les 5% réduisant la taille, il y a probablement une partie des 10% agrandissant la taille qui sont volontaires. Malheureusement, l'étude ne dit pas s'il s'agit du zoom global ou du zoom texte. Étant donnée la configuration par défaut de la plupart des navigateurs de nos jours, c'est probablement le zoom global.

## Le zoom global

Un moyen simple de grossir les éléments de l'interface sans aucun travail spécifique est tout simplement de laisser l'utilisateur le faire lui-même en autorisant le zoom global[^].

Ce zoom global est disponible sur tous les navigateurs depuis [Opera 2.10 en 1996](http://www.opera.com/docs/history/presto/), puis surtout [Internet Explorer 7](http://fr.wikipedia.org/wiki/Internet_Explorer_7) en 2006[^]. Il est indispensable sur smartphones et tablettes pour consulter les sites qui ne proposent ni adaptation automatique en RWD ni version dédiée mobile. Une fonction de loupe/zoom global est aussi disponible dans les systèmes d'exploitation depuis longtemps.

Sur petits écrans, ce zoom permet de consulter les sites non adaptatifs en focalisant la lecture sur une zone particulière de la page. Il est d'ailleurs facilité par des manipulations tactiles simples inventées pour l'occasion. Un double tap — s'il est bien géré — permet d'accéder rapidement au niveau de zoom exactement adapté à l'élément concerné, ou revenir en plein écran.

![Illustration du double tap](http://media.24joursdeweb.fr/2013/12/image04-860x297.jpg)

Illustration du double tap issue du site[ androidpatterns.com](http://www.androidpatterns.com/)

Sur plus grands écrans, le zoom global s'effectue en général à l'aide d'une combinaison de touches, d'une touche et du scroll souris ou trackpad, voire d'un menu.

Un défaut du zoom global est que sur la plupart des sites, visités dans une fenêtre de navigateur de taille raisonnable — je ne parle donc pas ici des navigateurs mis en plein écran sur un 27 pouces de résolution gigantesque —, le site dépasse vite du navigateur en largeur, nécessitant un mélange de scroll vertical et horizontal pour naviguer. Si cela est encore accepté sur mobile pour les sites non adaptés, cela est très peu satisfaisant sur ordinateur.

Heureusement, le zoom global sur ordinateur prend aujourd'hui en compte les Media Queries du Responsive Web Design, simulant une diminution du viewport. Par contre, ce n'est pas le cas du zoom global tactile — double tap ou _pinch to zoom_ — sur smartphones et tablettes[^].

Malheureusement, peu de sites ont déjà évolué vers le Responsive Web Design, continuent à utiliser des tailles de texte ridicules, et débordent vite de l'écran quand on fait un zoom global pour améliorer la lisibilité. Le zoom global n'est donc pas encore la solution parfaite à ce niveau là.

Un autre défaut du zoom global est l'altération de la qualité de rendu des éléments graphiques de type bitmap. Le navigateur doit créer des pixels inexistants dans la source pour afficher une image dans une dimension supérieure à celle native, et la plupart des algorithmes de ce type conduisent à [un rendu paraissant flou](http://blogs.msdn.com/b/ie/archive/2006/02/07/page-zoom-in-ie7.aspx).

![Illustration de l'effet flou du zoom d'images bitmap](http://media.24joursdeweb.fr/2013/12/image05.png)

L'effet est bien entendu proportionnel au niveau de zoom utilisé, mais les personnes ayant besoin de zoomer régulièrement de façon importante peuvent être gênées par ce rendu. Avec l'arrivée des écrans Retina, l'utilisation d'images de plus grandes dimensions que leur zone d'affichage permet aussi de réduire cet effet partiellement. Utiliser des images vectorielles permet par contre d'annuler complètement ce défaut, mais tout n'est pas faisable en vectoriel.

## Le zoom texte, zoom historique

Le plus ancien zoom disponible dans les navigateurs est le zoom texte. Il porte un peu mal son nom, puisque qu'il ne permettait pas initialement de grossir les textes définis en tailles absolues — px, pt, etc. — mais uniquement ceux définis en tailles relatives — em, %, ex, etc.

Aujourd'hui, le zoom texte permet effectivement d'agrandir tous les textes, quelle que soit l'unité définissant leur taille, dans tous les navigateurs qui le proposent[^], sauf Internet Explorer, qui persiste encore dans sa version 10[^], à bloquer les tailles définies en pixels.

Une [étude menée en mai 2012 par WebAIM](http://webaim.org/projects/screenreadersurvey4/#visual) montre que 8% des utilisateurs de lecteurs d'écran interrogés utilisent le zoom texte du navigateur. Une population certes réduite 19, mais qu'il ne faut pas négliger.

L'utilisation d'unités relatives, pour les tailles de texte au moins, est donc toujours une bonne pratique d'actualité.

Une faiblesse du zoom texte, en supposant que les sites soient bien intégrés en unités relatives, reste que celui-ci doit être défini site par site. Il faut donc s'intéresser aux paramétrages du navigateur pour définir une taille de texte par défaut valable sur tous les sites.[^]

## La définition de la taille de texte par défaut

Ces paramétrages sont simples sur tous les navigateurs, les voilà sur Firefox et Chrome par exemple :

![Configuration de la taille de texte par défaut dans Firefox en pixels](http://media.24joursdeweb.fr/2013/12/image06.png)

![Configuration de la taille de texte par défaut dans Chrome, sans valeur exacte visible, ce qui n'est pas plus mal pour la plupart des utilisateurs](http://media.24joursdeweb.fr/2013/12/image07.png)

La diversité de tailles et distances de visualisation des écrans que j'utilise m'a ainsi par exemple poussé à configurer certains de mes navigateurs avec des tailles de texte par défaut différentes de 16px. Sur mes ordinateurs portables, professionnel et personnel, qui ont tous les deux une assez forte densité de pixels, sans pour autant être HiDPI, je suis passé à 18px. Faible différence vous me direz, mais le gain en confort de lecture est immédiat. Sur ma télévision, ou plutôt sur l'ordinateur branché dessus avec une résolution native Full HD, je suis passé à 24px, la distance de visualisation d'environ quatre mètres associée à une taille d'écran de 128 centimètres — 52 pouces — de diagonale rendant le texte illisible en taille par défaut.

Sur les sites qui prennent en compte ces préférences de leurs visiteurs, tout se passe bien, je lis plus facilement les contenus, le site gagne des points dans l'avis que je m'en fais[^].

Mais pas de miracle, définir une taille de texte par défaut différente de 16px dans un navigateur ne change toujours rien aux textes dont la taille est définie en tailles absolues, quel que soit le navigateur. Sur ces sites qui ignorent — ou savent mais décident délibérément d'oublier — que ces réglages sont possibles, les effets de bord vont de l'anecdotique au critique, souvent selon le facteur de grossissement appliqué par rapport aux 16px les plus courants, mais pas uniquement.

Sur cDiscount[^], l'un des principaux sites e-commerce en France, le simple passage de 16px à 18px a un effet désastreux, cette simple augmentation de deux pixels de la taille du texte fait disparaître le contenu le plus important de la page. :

![Une page produit sur cDiscount avec une taille de texte de 18px](http://media.24joursdeweb.fr/2013/12/image08-860x647.jpg)

Ce contenu ne disparaît en fait pas vraiment, mais est déplacé en dessous du menu de navigation de gauche, qui est plutôt long :

![La zone de contenu principal déplacée sous la navigation sur cDiscount avec une taille de texte de 18px](http://media.24joursdeweb.fr/2013/12/image09-860x647.jpg)

L'affichage réagit au changement de taille de texte, donc au moins une partie de ces éléments ont des dimensions définies en unités relatives, mais le travail n'a pas été fait complètement. Dans ce cas précis, tout fixer en px ne serait pas réellement satisfaisant, mais aurait au moins le mérite de ne pas tout casser en cas de taille de texte différente de 16px.

## La taille par défaut de 16px n'est pas un standard

De fait, on trouve la plupart du temps une taille par défaut de 16px dans les navigateurs d'ordinateurs, smartphones ou tablettes. Mais il est important de savoir qu'au delà du fait que certains utilisateurs changent cette valeur par choix, certains appareil et/ou navigateurs sont fournis avec une taille par défaut différente.

Sur ma liseuse [Cybook Odyssey](http://www.bookeen.com/fr/cybook/odyssey) par exemple, c'est le constructeur Bookeen qui a lui-même fait le choix de définir une taille de texte par défaut à 21px. C'est le cas de plusieurs constructeurs, notamment Amazon sur certains Kindle.

A l'inverse, certains navigateurs sont configurés avec une taille de texte par défaut inférieure à 16px.

J'ai développé un tout petit [outil en ligne pour déterminer la taille de texte par défaut d'un navigateur](http://lab.gasteroprod.com/rfs/) :

![Testez votre taille de texte par défaut avec http://lab.gasteroprod.com/rfs/](http://media.24joursdeweb.fr/2013/12/image10.png)

Les données sont collectées [via Browserscope](http://www.browserscope.org/browse?category=usertest_agt1YS1wcm9maWxlcnINCxIEVGVzdBj1uvsUDA), ce qui m'a permis de découvrir des valeurs atypiques :

| Navigateur                    | Taille de base |
| ----------------------------- | -------------- |
| Opera Mini 4.5                | 13             |
| Palm webOS 2.0 & webOS TouchPad| 14             |
| Opera Mini 7                  | 17             |
| AOL 9                         | 20             |
| Cybook Odyssey                | 21             |
| Blackberry 6.0                | 22             |
| NetFront NX                   | 23             |
| Kindle 3                      | 26             |

Pour continuer à compliquer la situation, il peut être utile de savoir que sur mobiles certains navigateurs peuvent [prendre l'initiative de grossir eux-mêmes une partie des textes d'une page](https://developer.apple.com/library/ios/DOCUMENTATION/AppleApplications/Reference/SafariWebContent/AdjustingtheTextSize/AdjustingtheTextSize.html#//apple_ref/doc/uid/TP40006510-SW16), afin d'en améliorer la lisibilité. La [propriété css-size-adjust en cours d'élaboration au W3C](http://dev.w3.org/csswg/css-size-adjust/) permet de contrôler ce comportement.

La dimension des textes n'est donc vraiment que difficilement contrôlable, au grand dam des adeptes du pixel perfect.

## Et pour les sites qui utilisent des tailles minuscules en px ?

Malheureusement, une grande quantité de sites utilisent des tailles de texte en px, et encore pire, avec des valeurs délirantes de 10px ou 11px.

C'est le cas du site [Arrêt sur Images](http://arretsurimages.net/) qui force une taille de 11px sur certains textes :

![La page d'accueil de Arrêt sur Image, illisible](http://media.24joursdeweb.fr/2013/12/image12-860x717.jpg)

Modifier ma taille de texte par défaut ne suffit alors pas, puisque celle-ci n'est pas respectée si les tailles sont définies en px. Heureusement, pour ces cas extrêmes il est possible de forcer une taille minimale dans les préférences des navigateurs, comme ici dans Firefox et Chrome :

![Réglage de la taille minimale de texte dans Firefox](http://media.24joursdeweb.fr/2013/12/image13.png)

![Réglage de la taille minimale de texte dans Chrome](http://media.24joursdeweb.fr/2013/12/image14.png)

L'effet a bien entendu plus d'impact que celui de la taille par défaut ou du zoom texte, et en a même potentiellement sur les sites utilisant des tailles de texte proportionnelles, car les textes trop petits sont grossis alors que ceux de taille suffisante ne le sont pas.

L'effet sur Arrêt sur Images est effectivement désastreux, de nombreux textes sortants de leur conteneur — qui n'en est donc pas vraiment un — ou se superposants :

![La page d'accueil d'Arrêt sur Images encore plus inexploitable avec une taille de texte forcée à 14px au minimum](http://media.24joursdeweb.fr/2013/12/image15-860x723.jpg)

L'effet est désastreux parce que le site force l'utilisateur à employer les grands moyens, plutôt que simplement respecter ses préférences.

Tout ceci ne se produirait pas si des tailles proportionnelles étaient utilisées pour le texte, et si les conteneurs s'adaptaient à leurs contenus.

## Des em pour toutes les tailles verticales…

Afin qu'un site puisse s'adapter sans problème à des tailles relatives de texte, il est impératif que les dimensions verticales au moins soient elles aussi relatives. Les blocs peuvent bien entendu s'adapter automatiquement à leurs contenus, mais cela ne suffit pas. Il est nécessaire de préciser les dimensions verticales de certains éléments, en utilisant les mêmes unités relatives afin de conserver un bon rythme vertical dans [la macro typographie des pages](http://typographisme.net/post/Macro-typographie-sur-le-Web-Quelques-outils).

Comme le dit Chris Armstrong dans « [The Infinite Grid](http://www.alistapart.com/articles/the-infinite-grid/) »[^], « avec les pixels et autres unités absolues, une mise en page ne fonctionne que dans certaines situations précises : ces unités imposent donc une sorte de date de péremption. Les unités proportionnelles (em, rem et pourcentages) vous permettent de définir les relations importantes entre les éléments, et sont un premier pas indispensable pour aboutir à une grille indépendante des dimensions du navigateur. »

## …mais aussi pour les tailles horizontales

Ainsi, il est intéressant d'utiliser ces mêmes unités relatives — à la taille de texte, donc plutôt em ou rem que % — pour définir les largeurs de blocs, notamment de paragraphes[^].

Cela permet d'assurer une présentation optimale du texte, notamment en conservant un nombre optimal de caractères par ligne — de 55 à 65, à affiner selon les langues concernées — quelle que soit la taille du texte. Pour cela, une largeur de 30em est une valeur courante, à ajuster évidemment selon la nature de la police de caractères. [^]

## Comment gérer les valeurs en em ?

En 2004, Richard Rutter proposait de [définir une font-size de 62,5% sur l'élément body](http://clagnut.com/blog/348/) afin de se placer sur une base 10px, en supposant que la taille par défaut du navigateur était de 16px. Cela permettait ainsi de définir facilement les tailles des éléments en em, en divisant par 10 la valeur souhaitée en pixels.

On pouvait ainsi écrire ce qui suit :

    body { font-size: 62.5%; }
    h1 { font-size: 2.4em; }
    h2 { font-size: 2.1em; }
    p { font-size: 1.6em; }

Malheureusement, définir ainsi une base à 10px impose de redéfinir toutes les tailles des éléments de la page, et le risque d'obtenir un jour des éléments à cette taille de 10px n'est pas négligeable. Laisser la taille par défaut du navigateur, ou la valeur choisie par l'utilisateur, comme valeur de base des tailles de texte semble bien évidemment plus prudent.

En 2007, ce même Richard Rutter proposa finalement de [définir plutôt une font-size de base sur le body à 100%](http://alistapart.com/article/howtosizetextincss), conduisant ainsi à l'écriture suivante :

    body { font-size: 100%; }
    h1 { font-size: 1.5em; }
    h2 { font-size: 1.3125em; }
    p { font-size: 1em; }

La CSS est ainsi bien sûr plus difficile à écrire, mais si c'était effectivement le cas en 2007, ce ne l'est plus vraiment en 2013 grâce aux préprocesseurs CSS tels que LESS, Sass ou Stylus.

Voici par exemple une méthode simple à exploiter en Sass :

    $base-font-size: 16px;
    @function em($target, $context: $base-font-size) {
    	@if $target == 0 { @return 0 }
    	@return $target / $context + 0em;
    }
    body { font-size: 100%; }
    h1 { font-size: em(24px); }
    h2 { font-size: em(21px); }
    p { font-size: em(16px); }
    ul { font-size: em(14px); }
    ul ul { font-size: em(14, 14px); }

D'autre part, les Media Queries ne tiennent pas compte de la définition de font-size du body, même si elles sont définies en em, donc elles ne sont plus cohérentes avec les contenus qu'elles tentent d'adapter au contexte. Avec un font-size : 62.5% sur le body, un élément dont on définirait la largeur à 50em serait moins large que le seuil de déclenchement d'une Media Query basée sur cette même valeur de 50em. La première valeur, à supposer que l'élément soit enfant direct du body, serait évaluée à 500px (50 fois 10) — avec une taille de base de 16px — alors que la Media Query serait évaluée à 800px (50 fois 16).

Au final, il semble recommandé, comme suggéré par le Filament Group dans « [How we learned to leave default font-size alone and embrace the em](http://filamentgroup.com/lab/how_we_learned_to_leave_body_font_size_alone/) », de ne pas toucher du tout à la taille de texte globale héritée de la configuration — par défaut ou personnalisée — du navigateur, et donc ne pas mettre de font-size sur le body.

## Simplifions nous la vie avec rem… ou pas

L'unité rem, récente mais déjà plutôt bien supportée dans les navigateurs, permet de définir des tailles relatives comme em, mais en prenant la taille de html comme référence plutôt que l'élément parent.

rem permet donc d'éviter la dernière ligne du code ci-dessus, qui est nécessaire pour éviter que les listes imbriquées soient de plus en plus petites par récursivité. Avec rem, plus besoin de « trainer » le contexte systématiquement, cela évite certains maux de crâne.

Malheureusement, cette force est aussi une faiblesse potentielle.

Effectivement, définir certaines tailles par rapport à leur contexte à beaucoup plus de sens, notamment les espacements entre contenus — des titres et paragraphes par exemple — avec margin et padding.

De plus, si vous souhaitez modifier la taille d'un composant dans la page[^], vous devrez modifier la taille de tous ses éléments constituants, alors qu'en em vous pourriez modifier uniquement la taille de l'élément conteneur, comme démontré dans l'article « [Sizing (Web) components](https://medium.com/p/8f433689736f) » de simurai.

![Dimensionnement simple d'un composant grâce aux em](http://media.24joursdeweb.fr/2013/12/image16.png)

Si l'on ne tient pas compte du fait qu'il faut de plus prévoir des fallbacks en px — hum… — pour les vieux navigateurs[^], il pourra donc être tout de même intéressant d'utiliser des rem pour les éléments racine des composants, et des em pour leurs sous éléments. À condition d'être sûr de pouvoir identifier ces composants.

## Tout n'est pas si simple

Que l'on utilise des em ou des rem, différentes problématiques peuvent complexifier la tâche.

Tout d'abord, il faut bien comprendre que de nombreuses conversions entre unités sont effectuées entre les px encore souvent utilisés dans la tête des graphistes[^] et les px utilisés au final par le moteur de rendu des navigateurs :

* Application directe des px issus de la création graphique dans le code destiné au préprocesseur CSS, aucun problème ;
* Conversion des px en em par le préprocesseur avec arrondi systématique 29, première source d'approximation ;
* Calcul de la « vraie » dimension déclarée d'un élément à partir de sa taille définie en em et de sa cascade de contexte 30, seconde source d'approximation ;
* Application de la taille par défaut du navigateur, qu'elle soit d'origine ou modifiée par l'utilisateur, si la dimension est en unité relative 31, troisième source d'approximation ;
* Conversion de cette dimension en pixels CSS si l'unité est différente, quatrième source d'approximation ;
* Conversion des pixels CSS en « vrais » pixels pour effectivement dessiner l'élément, cinquième source d'approximation.

Le cumul des conversions et arrondis éventuels peut conduire au final à des rendus erronés, ou tout du moins peu satisfaisants, que l'on soit ou non adepte du pixel perfect. Rassurez-vous, définir toutes les tailles en px ne règlera pas — pas complètement en tout cas — le problème, donc ce n'est pas un argument vraiment valide contre les unités relatives.

Une autre difficulté concerne les images. Celles qui sont en SVG, donc vectorielles, peuvent avoir sans problème des dimensions définies en valeurs relatives, et donc s'ajuster avec les tailles de texte. Celles qui sont en formats bitmap, par contre, supportent potentiellement assez mal les redimensionnements, comme cela a été évoqué au sujet du zoom global. Il faut donc décider si on applique tout de même des dimensions relatives afin de conserver des proportions constantes, ou si on conserve pour ces images leurs dimensions « réelles », en ajustant le positionnement des éléments qui les entourent ou voisinent. Le choix est relativement simple pour des illustrations flottant au sein d'un texte, bien moins pour des éléments d'interface. Privilégier SVG pour ces derniers est donc préférable.

Toujours concernant les images, un point particulier concerne la technique des sprites, pour laquelle la dimension et le positionnement de la zone utile doivent s'ajuster selon la dimension de son élément conteneur. Je vous invite à décortiquer les « [mixins magiques](http://marieguillaumet.com/refonte-mon-portfolio-du-responsive-en-em-seconde-partie/) » de Marie pour couvrir ce besoin.

## La principale limite du design élastique est résolue par le Responsive Web Design

Une autre limite souvent citée pour refuser le design élastique — c'est à dire avec des largeurs de blocks définies en em — est qu'il fini par sortir du cadre du navigateur quand la taille de texte est agrandie.

Si cela était vrai il y a quelque temps, le Responsive Web Design permet aujourd'hui de gérer cela de manière plus que satisfaisante, comme le défend l'article « [The EMs have it: Proportional Media Queries FTW!](http://blog.cloudfour.com/the-ems-have-it-proportional-media-queries-ftw/) » de Liza Gardner et l'illustre parfaitement la « [Goldilocks Approach](http://goldilocksapproach.com/) ».

![Design élastique avec une taille de texte de base de 16px](http://media.24joursdeweb.fr/2013/12/image17-860x687.png)

![Le même design élastique avec une taille de base de 20px](http://media.24joursdeweb.fr/2013/12/image18-860x687.png)

![Le même design élastique avec une taille de base de 24px déclenche une Media Query ajustant l'affichage à l'espace disponible](http://media.24joursdeweb.fr/2013/12/image19-860x687.png)

Je pourrais écrire encore beaucoup au sujet du Responsive Web Design élastique, mais je crains de vous assommer définitivement. Des exemples à explorer pour se convaincre sont les sites de [Marie Guillaumet](http://marieguillaumet.com/)[^], [Smashing Magazine](http://www.smashingmagazine.com/), [Clearleft](http://www.clearleft.com/), ou [celui de votre humble serviteur](http://gasteroprod.com/).

## Ce qu'il faut retenir, c'est que vous n'avez pas le choix, qu'il faut lâcher prise…

Votre objectif est — devrait être — de diffuser un message, un service, et d'atteindre un public le plus large possible en lui proposant une expérience positive.

Respecter son public et s'adapter à ses préférences — tant que possible — est bien évidemment une bonne pratique.

## …mais que cela ne nécessite pas de perdre le contrôle !

L'intégration en Responsive Web Design élastique est — aujourd'hui, à mon avis — le meilleur moyen de choisir vous-même comment votre site s'affiche, tout en respectant les préférences de vos visiteurs.

L'utilisateur peut choisir quelle est la taille le texte la plus confortable pour sa lecture, selon l'appareil qu'il utilise, et vous décidez comment votre site doit s'afficher avec ce paramétrage.
