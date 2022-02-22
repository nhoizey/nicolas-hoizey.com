---
date: 2022-02-22 22:07:53 +01:00
tags: [IndieWeb]
---

Cool, [Véro lance une nouvelle section dans son site pour des petites notes](https://www.carnetsderoutes.me/+Des-p-tites-notes+.html), ça laisse espérer plus de régularité dans les publications. 🎉

---

J'ai eu deux bonnes idées ce soir pour améliorer la gestion du [code de mon site photo](https://github.com/nhoizey/nicolas-hoizey.photo):
- mettre un *hook* Git `pre-push` pour éviter d'envoyer en ligne des photos sans date[^processus]
- mettre en place [Git Large File Storage](https://git-lfs.github.com/) (aka `git-lfs`) pour les photos d'origine, qui sont trop volumineuses pour le Git de base, d'autant plus que je les modifie parfois donc elles sont plusieurs fois dans l'historique

[^processus]: Un jour j'expliquerai comment fonctionne mon processus de publication de photos…

Je ne sais pas pourquoi j'ai eu ces deux idées le même soir. Mais j'aurai dû n'avoir qu'une des deux idées, ça aurait été plus simple.

J'ai commencé par le *hook* `pre-commit`, en m'aidant de [Husky](https://typicode.github.io/husky/), c'était plutôt facile. 💪

Mais au début de l'installation de `git-lfs`, bam, conflit avec le *hook* ! 😭

```shell
$ git lfs install
Hook already exists: pre-push

	#!/bin/sh
	. "$(dirname "$0")/_/husky.sh"

	npm run add-dates

To resolve this, either:
  1: run `git lfs update --manual` for instructions on how to merge hooks.
  2: run `git lfs update --force` to overwrite your hook.
```

Git ne supporte pas plusieurs *hooks* sur le même événement.

`git lfs update --manual` n'étant pas d'une grande aide, j'ai abandonné pour l'instant… 🤷‍♂️
