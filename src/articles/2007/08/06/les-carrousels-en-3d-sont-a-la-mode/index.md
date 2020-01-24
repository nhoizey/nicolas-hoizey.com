---
title:      Les carrousels en 3D sont à la mode
date: 2007-08-06 12:00:00 +02:00
lang:       fr
tags:       [UX, jQuery, JavaScript]
---

J'ai vu apparaître ces derniers jours des carrousels en 3D sur les pages des sites de vente en ligne [Amazon](http://www.amazon.fr/) et [Alapage](http://www.alapage.com/), drôle de coïncidence !

![](manege-carrousel.png "onethird")

D'après [Wikipedia](http://fr.wikipedia.org/), un carrousel est — [notamment](http://fr.wikipedia.org/wiki/Carrousel) — « [une attraction de type manège consistant en une plateforme tournante avec des sièges pour des passagers](http://fr.wikipedia.org/wiki/Carrousel_%28loisir%29) », c'est à dire ni plus ni moins qu'un manège.

![](projecteur-diapos-carrousel.jpg){.onethird}

Ce terme est aussi utilisé en photographie pour désigner les bacs circulaires que l'on utilise avec les projecteurs de diapositives, ou en musique pour désigner les supports des disques dans les jukeboxes.

Au niveau des interfaces graphiques, la navigation dans une liste représentée par un carrousel en 3 dimensions fait petit à petit son chemin. Elle donne une impression de manipulation physique des objets qui améliore l'ergonomie et l'intuitivité de l'interface.

Apple l'a bien compris en rachetant [CoverFlow](http://www.apple.com/itunes/jukebox/coverflow.html), un carrousel — non circulaire celui-ci — permettant de sélectionner de la musique dans iTunes en visualisant les pochettes :

![](apple-itunes-coverflow.png "CoverFlow. Navigation en 3D dans la discothèque iTunes")

Microsoft a aussi fait la démonstration des capacités 3D de Windows Presentation Foundation et de Silverlight — dans [Popfly](http://www.popfly.com/) par exemple — à l'aide de carrousels.

Le carrousel d'Amazon est en Flash, une technologie vectorielle, et donc particulièrement bien adaptée à la simulation de la 3D par déformation :

![](caroussel-3d-amazon.png "Le carrousel d'Amazon")

Mais il n'est pas nécessaire de disposer d'une technologie spécifiquement dédiée ou adaptée à la 3D pour réaliser de tels carrousels, comme le montre aujourd'hui Alapage :

![](carroussel-3d-alapage-3.png "Le carrousel d'Alapage")

Ce carrousel s'appuie tout simplement sur l'élément « [3D Carousel](http://interface.eyecon.ro/docs/carousel) » de l'excellent plugin [Interface](http://interface.eyecon.ro/) de la [librairie JavaScript jQuery](http://www.jquery.com/).
