--- 
title:      Attention au détournement SEO de vos URL ! 
date: 2012-01-17 12:00:00 +02:00
lang:       fr 
tags:       [fail, SEO, URL]
---

On le sait bien, les termes qui se trouvent dans une URL sont utilisés par les moteurs de recherche dans leurs index. Au point que certains consultants SEO passent leur temps à optimiser ces termes, leurs valeurs, nombre et positionnement. Malheureusement, peu de sites s'assurent que l'URL ainsi définie soit la seule permettant d'arriver à la page correspondante. Le détournement d'URL est alors possible.

Un exemple découvert récemment est le site e-commerce [cDiscount](http://www.cdiscount.com/), sur lequel l'URL suivante ne donne pas le résultat escompté :

- <http://www.cdiscount.com/electromenager/machines-a-coudre/singer/f-107092205-qa988ea.html>

De même avec cette URL sur le site du journal [Libération](http://www.liberation.fr/) :

- <http://www.liberation.fr/societe/01012383917-les-francais-inquiet-de-l-augmentation-du-prix-des-fraises>

Les exemples sont malheureusement légion, en voici quelques-uns parmi d'autres :

- <http://www.tourmag.com/perte-du-tripple-a-naufrage-de-la-france_a49271.html>

Vous allez me dire qu'il n'y a pas mort d'homme, que je suis vraiment un g33k tordu pour aller modifier une URL. Mais cette possibilité de modifier l'URL de votre site en introduisant des termes allant à l'encontre de votre image ou de votre message ne faciliterait-elle pas un éventuel [bombardement Google](http://fr.wikipedia.org/wiki/Bombardement_Google)[^1] que l'un de vos concurrents voudrait lancer ?

Même sans être aussi paranoïaque, cela ne risque-t-il pas de conduire au référencement de multiples URL pour un unique contenu, ayant pour conséquence au mieux une dilution dudit référencement, au pire une pénalisation pour *duplicate content* ?

C'est tout bête, reprenons l'URL de Libération, mais la vraie cette fois :

- <http://www.liberation.fr/societe/01012383917-les-francais-inquiet-de-l-augmentation-des-frais-de-sante>

Un fan de grammaire tout aussi tordu que moi[^2] verra rapidement en lisant l'URL que le terme «inquiet» n'est pas au pluriel, alors qu'il l'est bien dans la page. Coquille corrigée dans le texte après création de l'URL ? Sans doute. Mais pourquoi ne pas avoir changé l'URL après correction, que ce soit cohérent ? Pour éviter ce fameux effet de *duplicate content* que j'évoquais ? Et les redirections HTTP avec code 301, c'est pour les autres, hein ? Et bien non, [Google aime les redirections 301](http://support.google.com/webmasters/bin/answer.py?hl=fr&answer=93633), alors usez-en.

Mais je m'écarte du sujet initial, alors juste pour conclure, figurez-vous que dans SPIP, si vous utilisez l'une des formes d'URL propres — je vous recommande particulièrement la forme arborescente, dont je vous partagerais la configuration —, tout renommage de titre pourra être pris en compte dans l'URL, et l'appel de l'ancienne URL redirigera automatiquement, et proprement, vers la nouvelle.

[^1]: Bombardement Google ??? Mais si, vous devez bien vous souvenir de [miserable failure (en)](http://searchenginewatch.com/article/2064793/Googles-and-Inktomis-Miserable-Failure), ou au moins d'[Iznogoud](http://www.presidentielle-2007.net/actualite/index.php/2005/10/06/22-google-bombing-sarkozy-iznogoud)…

[^2]: Oui, oui, je suis vraiment tordu…
