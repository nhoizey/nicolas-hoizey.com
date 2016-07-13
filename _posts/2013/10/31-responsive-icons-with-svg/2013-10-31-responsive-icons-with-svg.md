---
title:      Responsive Icons with SVG
lang:       en
tags:       [Web, design, CSS, Responsive Web Design]
---

There have already been [some explorations on responsive SVG images](http://blog.cloudfour.com/media-queries-in-svg-images/) a while back, but when [Joe Harrison](http://www.joeharrison.co.uk/) posted [a responsive icon concept](http://dribbble.com/shots/1290195-New-Project-Responsive-Icons) on Dribbble and even a working version on [a dedicated website](http://responsiveicons.co.uk/), a few people thought this was [so wrong](http://xkcd.com/386/) they had to make their own version. I must admit I'm one of them… ;-)

{% cloudinary responsive-icons.png %}

[Mariusz Ciesla](http://mariusz.cc/) made [a version](http://codepen.io/mariusz/pen/azBne) with one single div, using one single sprite image:

<p data-height="300" data-theme-id="2148" data-slug-hash="azBne" data-user="mariusz" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/mariusz/pen/azBne'>Responsive icons</a> by Mariusz Ciesla (<a href='http://codepen.io/mariusz'>@mariusz</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

(you need to open it on [CodePen](http://codepen.io/) or resize you window to see the effect, as for following examples.)

[Justin Avery](http://justinavery.me/), famous for [the Responsive Design Weekly newsletter](http://responsivedesignweekly.com/) made [his own version](http://responsivedesign.is/articles/responsive-icons) also with a single SVG image, but with Media Queries inside the SVG itself:

<p data-height="450" data-theme-id="2148" data-slug-hash="cgLHo" data-user="justincavery" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/justincavery/pen/cgLHo'>Responsive Icons</a> by Justin Avery (<a href='http://codepen.io/justincavery'>@justincavery</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

My own attempt tries to really use SVG features, by using sub elements as progressively revealed building blocks, instead of full houses for every breakpoint. The purpose is to remove as much redundancy as possible, and add some semantic on the way.

There have been concerns in the Dribble comments that the original have too much variation for a single icon, that will affect memorability and recognition. I tend to agree and did only improve details without modifying the whole design of the icon at the larger size.

SVG is even inline in the HTML, so there is no additional request at all.

[Here it is](http://codepen.io/nhoizey/pen/ICJvA):

<p data-height="266" data-theme-id="2148" data-slug-hash="ICJvA" data-default-tab="result" data-user="nhoizey" class='codepen'>See the Pen <a href='http://codepen.io/nhoizey/pen/ICJvA/'>SVG Responsive Icons</a> by Nicolas Hoizey (<a href='http://codepen.io/nhoizey'>@nhoizey</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

I made a little screencast for those who don't have SVG support in their browser:
https://www.youtube.com/watch?v=y1d1dDWs4_4

There are still some parts missing:

- maybe more detailed icon for huge sizes;
- a fallback for browsers lacking SVG support.

**March, 5th 2014 update:** There is a more detailed post now on [Smashing Magazine](http://smashingmagazine.com/), written by [Ilya Pukhalski](http://blog.pukhalski.com/): [Rethinking Responsive SVG](http://coding.smashingmagazine.com/2014/03/05/rethinking-responsive-svg/)
