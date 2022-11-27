---
date: 2020-08-12 09:45:21 +02:00
title: "Update for Customers Using PhoneGap and PhoneGap Build"
lang: en
link: https://blog.phonegap.com/update-for-customers-using-phonegap-and-phonegap-build-cc701c77502c
authors:
  - "Adobe PhoneGap"
tags: [Adobe, PhoneGap, PWA, esviji, Google, TWA]
---

> Since [PhoneGap]’s beginning in 2008, the market has evolved and <mark>Progressive Web Apps (PWAs) now bring the power of native apps to web applications</mark>. PWAs are increasingly bridging the gap between web and native mobile apps through capabilities such as offline support, push notifications, home-screen icons and full-screen view control without the need for containers.

Thanks to these great improvements of the Web platform, Adobe can finally make this great announcement:

> Today, we are announcing the end of development for PhoneGap and PhoneGap Build and the end of our investment in Apache Cordova.

Apache Cordova, the open source project PhoneGap is built upon will still exist, but this announcement shows how much PWAs have bridged the gap. There are still many things to add to the Web (and to closed ecosystem still lacking some of their features), but most apps developed with Cordova/PhoneGap can now live a better life as simple Web sites/apps.

I don't really like how [Project Fugu](https://web.dev/fugu-status/) is marketed first as a Google project (with Intel) instead of a Google participation to a global Web project[^google-devrel], I'm really sad Mozilla lacks capacity to better follow the path (I understand why they don't want to provide some APIs), and I'm really mad at Apple for being so late for providing the PWA basics to iOS (my main mobile device is an iPhone… 🤷‍♂️).

[^google-devrel]: I know many people at Google, developers relation team at least, love the Web and would like all browser vendors to better work on this together, but I really don't like Google marketing.

But at least Google provides interesting features for PWAs, and has improved the discovery/validation process with Origin Trials.

On Android, it's even better with Trusted Web Apps that can be distributed through the Google Play Store. PWAs can also be distributed in Microsoft's Windows Store, but they still use the old Edge engine, not the one based on Chromium, so some features are still lacking.

Back in 2016, I tried to use PhoneGap to bring [esviji](https://play.esviji.com/), my Web game, to Android and iOS users preferring apps installed from a store. The [code is still there](https://github.com/esviji/esviji-phonegap) for archeologists but, even if it gave interesting results very fast, [I quickly stopped my experimentation](https://esviji.com/2016/02/android-and-ios-apps-development-stopped.html) because big issues started to pile up, and I started to lose a lot of time trying to fix them instead of working on other planned evolutions of the standard Web version.

Now, with TWA and tools like [PWABuilder](https://www.pwabuilder.com/) or [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap), I've been able to [bring esviji back to the Google Play Store](https://play.google.com/store/apps/details?id=com.esviji.twa) much easily, with a really small impact on the source code. 🎉
