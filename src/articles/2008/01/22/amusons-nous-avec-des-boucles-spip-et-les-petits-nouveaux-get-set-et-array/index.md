--- 
title:      "Amusons nous avec des boucles SPIP et les petits nouveaux #GET, #SET et #ARRAY"
date: 2008-01-22 12:00:00 +02:00
lang:       fr 
tags:       [SPIP, trick]
---

Je suis tombé il y a quelque temps sur une problématique que je n'avais jamais rencontrée au cours de mes nombreuses expériences avec SPIP, et il s'avère qu'une solution très élégante est possible en n'utilisant que la syntaxe de SPIP, là où il aurait fallu, il n'y a pas si longtemps que cela, utiliser du code PHP dans le squelette. Suivez le guide…

Imaginez que vous ayez dans votre site de nombreux sites référencés, avec la syndication activée, et des mots clefs thématiques associés à ces sites. Cela peut vous rappeler Sedna, sauf que les mots clefs peuvent être multiples pour un site alors que Sedna utilise des rubriques, forcément uniques pour chaque site.

Imaginez maintenant que vous souhaitiez afficher dans une page les dernières nouveautés de tous les sites ayant un mot clef donné.

La solution simple — qui fonctionne depuis longtemps avec SPIP — est de lister les sites qui ont le mot clef, et de lister pour chacun les derniers articles syndiqués. Le problème de cette solution, c'est que vous devez vérifier chaque site pour savoir s'il y a du nouveau. Le problème est encore plus grave si vous souhaitez utiliser une pagination, puisqu'elle sera nécessairement sur les sites plutôt que sur les articles syndiqués.

Ma problématique du jour était donc de lister tous les articles syndiqués dans leur ordre chronologique, donc sans devoir passer par les sites au préalable, et voici la solution :

```
{% raw %}
<BOUCLE_mot_courant(MOTS){titre=mot_clef}>
  #SET{sites,#ARRAY}
  <B_sites>
  <BOUCLE_sites(SITES){id_mot}>
    [(#SET{sites,[(#GET{sites}|push{#ID_SYNDIC})]})]
  </BOUCLE_sites>
    <B_derniers_liens>
      #ANCRE_PAGINATION
      <dt><span>Actualité du Web</span></dt>
      <dd id="actu-web">
        [(#PAGINATION{accessible})]
        <dl>
          <BOUCLE_derniers_liens(SYNDIC_ARTICLES){id_syndic IN #GET**{sites}}{pagination 5}{par date}{inverse}>
            <dt>#TITRE</dt>
            <dd class="origine">Sur <a href="#URL_ARTICLE">#NOM_SITE</a></dd>
            <dd class="date">[(#DATE|affdate)]</dd>
            [<dd class="auteur"><cite>(#LESAUTEURS)</cite></dd>]
            [<dd><blockquote><p>(#DESCRIPTIF)</p></blockquote></dd>]
          </BOUCLE_derniers_liens>
        </dl>
        [(#PAGINATION{accessible})]
      </dd>
    </B_derniers_liens>
  </B_sites>
  <//B_sites>
</BOUCLE_mot_courant>
{% endraw %}
```

Ce code fonctionne avec SPIP 1.9.2c si on ajoute ce filtre `push` :

```php
function push($array, $val) {
	if($array == '' OR !array_push($array, $val)) return '';
	return $array;
}
```

Mais ne devrait plus être nécessaire avec SPIP 1.9.3, la boucle `SYNDIC_ARTICLES` [acceptant maintenant](http://trac.rezo.net/trac/spip/changeset/11019) le paramètre `{id_mot_syndic}` !
