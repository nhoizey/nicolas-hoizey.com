---
date: 2022-06-28 16:12:21 +02:00
tags: [npm]
---

I don't understand how [`npm outdated`](https://docs.npmjs.com/cli/v8/commands/npm-outdated) works.

On my machine, packages from both `dependencies` and `devDependencies` are listed.

[In a GitHub Action](https://github.com/nhoizey/nicolas-hoizey.com/runs/7093410894), I only get packages from `dependencies`, but duplicated, and with status `MISSING`…

![Screenshot of the `npm outdated` command](github-action-npm-outdated.png)

🤷‍♂️
