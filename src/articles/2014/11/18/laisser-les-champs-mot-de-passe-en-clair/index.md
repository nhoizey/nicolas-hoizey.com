---
title:      Laisser les champs mot de passe en clair
date: 2014-11-18 12:00:00 +02:00
lang:       fr
tags:       [UX, form, password]
---

J'avais découvert chez Luke Wroblewski[^i1] que la galère historique des mots de passe masqués dans les champs de formulaires Web n'est pas une fatalité, et je découvre aujourd'hui qu'il n'était pas le premier à y penser ni le mettre en œuvre. Voilà quelques ressources sur le sujet fournies par quelques-uns qui ont répondu à [mon appel à références sur Twitter](https://twitter.com/nhoizey/status/534669510708834305).

[^i1]: Monsieur « [Mobile First](http://www.amazon.fr/gp/product/2212134061/ref=as_li_tl?ie=UTF8&camp=1642&creative=19458&creativeASIN=2212134061&linkCode=as2&tag=phpheaven-21&linkId=WWJVUYX3VIWH6SNG) » entre autres…

Voici donc le premier article que j'ai lu en novembre 2012 sur le sujet, par Luke Wroblewski qui le mettait alors en œuvre sur sa plateforme Polar : « [Mobile Design Details: Hide/Show Passwords](http://www.lukew.com/ff/entry.asp?1653) ». Sur le moment, j'avais trouvé ça vraiment excellent comme idée, ne l'ayant jamais vu mise en œuvre. Cet article est d'ailleurs repris dans l'excellent e-book publié par Luke Wroblewski en synthèse de ses travaux chez Polar avant son rachat par Google : « [Mobile & Multi-Device Design: Lessons Learned](http://www.lukew.com/ff/entry.asp?1919) »[^1].

Mais il se trouve que Jakob Nielsen le disait déjà en juin 2009 dans un article intitulé « [Stop Password Masking](http://www.nngroup.com/articles/stop-password-masking/) »[^2], autant dire que ce n'est pas tout neuf.

Microsoft avait d'ailleurs mis ce fonctionnement dans le formulaire de login de Windows 8, comme cela est montré dans cet article de mars 2012 « [View Passwords in Windows 8 Password Fields](http://trekker.net/archives/view-passwords-in-windows-8-password-field/)[^3].

Un autre article d'octobre 2012 est très détaillé sur le sujet, et va même au delà du simple débat masqué / non masqué : « [Why Password Masking Can Hurt Your Sign Up Form](http://uxmovement.com/forms/why-password-masking-can-hurt-your-sign-up-form/) »[^4].

On trouve aussi mention de ce mot de passe visible dans l'étude très poussée de Mailchimp, qui portait plutôt au départ sur la pertinence des boutons de connexion via Facebook et autres réseaux sociaux : « [Social Login Buttons Aren’t Worth It](http://blog.mailchimp.com/social-login-buttons-arent-worth-it/) »[^5].

Si vous voulez simplement donner la possibilité à vos utilisateur de choisir eux mêmes entre visualiser ou masquer le mot de passe, les p'tits gars de Cloudfour ont même développé un petit plugin jQuery : [hideShowPassword](https://github.com/cloudfour/hideShowPassword)[^6].

Je vous laisse, je vais potasser tout ça…

[^1]: Merci [@eQRoeil](https://twitter.com/eQRoeil/status/534676345075556352).

[^2]: Merci [@HTeuMeuLeu](https://twitter.com/HTeuMeuLeu/status/534690741759787008).

[^3]: Merci [@m4d_z](https://twitter.com/m4d_z/status/534695349315981312).

[^4]: Merci [@dameofr](https://twitter.com/dameofr/status/534694891054702592).

[^5]: Merci [@_flexbox](https://twitter.com/_flexbox/status/534682341294477312).

[^6]: Merci [@urcadox](https://twitter.com/urcadox/status/534707776296341504) de me l'avoir rappelé.
