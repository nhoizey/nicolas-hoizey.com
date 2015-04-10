# nicolas-hoizey.com

My Jekyll blog.

## Author

**Nicolas Hoizey**
- <https://github.com/nhoizey>
- <https://twitter.com/nhoizey>

## License

Open sourced under the [MIT license](LICENSE.md).

## Built with

### Jekyll 2

### Jekyll plugins

- [Jekyll Assets](https://github.com/jekyll-assets/jekyll-assets)
- [Jekyll Youtube Lazyloading](https://github.com/erossignon/jekyll-youtube-lazyloading)
- [Jekyll plugin for tags](https://github.com/pattex/jekyll-tagging)

### WebPerf

#### Fonts

Adapting Zach Leatherman's [Flash Of Faux Text (FOFT) approach](http://www.zachleat.com/web/foft/), the base Roman font is loaded with [font events](http://www.filamentgroup.com/lab/font-events.html), and variants (bold, italic, etc.) are then loaded in another CSS as base64 Data URIs using [loadCSS](https://github.com/filamentgroup/loadCSS) like in this [previous approach](http://www.filamentgroup.com/lab/font-loading.html).
