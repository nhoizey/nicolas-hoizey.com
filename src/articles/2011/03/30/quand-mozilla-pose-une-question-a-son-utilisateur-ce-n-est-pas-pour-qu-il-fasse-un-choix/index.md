---
title:      Quand Mozilla pose une question à son utilisateur, ce n'est pas pour qu'il fasse un choix…
date: 2011-03-30 12:00:00 +02:00
lang:       fr
tags:       [UX, Mozilla, form]
---

Je me suis enfin décidé à faire un peu de ménage dans [mes collections d'extensions Firefox](https://addons.mozilla.org/fr/firefox/collections/nhoizey/), et quand j'ai voulu supprimer les collections résiduelles, j'ai été surpris par la façon dont Mozilla demande confirmation, qui ne me paraît pas très ergonomique.

J'ai donc fait du ménage pour ne garder que deux collections complémentaires bien distinctes, l'une pour quand j'utilise [Firefox pour naviguer](https://addons.mozilla.org/fr/firefox/collections/nhoizey/navigation/) et l'autre pour quand j'utilise [Firefox comme outil de développement](https://addons.mozilla.org/fr/firefox/collections/nhoizey/webdev/).

Quand j'ai voulu supprimer une collection, voilà l'écran que Mozilla m'a montré pour demander confirmation de cette suppression :

![](mozilla-addons-suppression-ko.png)

Ces points me paraissent mauvais en termes d'ergonomie :

- il n'y a qu'un bouton, alors que si l'on veut demander confirmation à l'utilisateur, c'est à priori qu'on veut lui permettre deux actions, confirmer ou annuler la commande
- le bouton — unique donc — n'a pas un libellé indiquant une réponse[^1] ou une action[^2], mais la question elle-même

[^1]: «oui» ou «non» par exemple

[^2]: «supprimer» ou «annuler» par exemple

Voici ce que je propose rapidement[^3] comme solution plus ergonomique :

[^3]: Merci Firebug !

![](mozilla-addons-suppression-ok.png)

Qu'en dites-vous ?

# Mise à jour du 31 mars

Je suis allé créer le ticket dans le Bugzilla de Mozilla[^4] : [When asking the user for confirmation when deleting a collection, there should be two choices, "yes" and "no"](https://bugzilla.mozilla.org/show_bug.cgi?id=646781)

[^4]: Bon sang que c'est moche et compliqué !

N'hésitez pas à aller commenter et *plussoiner*[^5] si vous êtes d'accord avec moi !

[^5]: Mettre un +1, quoi, rooh…

