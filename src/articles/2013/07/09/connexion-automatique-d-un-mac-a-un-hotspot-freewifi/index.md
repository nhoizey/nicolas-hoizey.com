---
title:      Connexion automatique d'un Mac à un HotSpot FreeWifi
date: 2013-07-09 12:00:00 +02:00
lang:       fr
tags:       [macOS, WiFi]
---

Si vous êtes freenaute —c'est à dire abonné à l'offre ADSL Free— [vous pouvez vous connecter aux Freebox des autres freenautes](http://www.free.fr/adsl/pages/internet/connexion/acces-hotspot-wifiFree.html) quand vous voyagez.

Pour cela, vous devez vous connecter au HotSpot nommé `FreeWifi` puis saisir vos paramètres de connexion. Cette dernière étape est souvent laborieuse, l'identifiant FreeWifi n'étant pas simple à mémoriser.

Voici un petit script permettant de simplifier la chose en réalisant la connexion à votre place.

``` shell
#!/bin/sh
url="https://wifi.free.fr/Auth"
login="votre identifiant numérique"
password="votre mot de passe"
okmatch="CONNEXION AU SERVICE REUSSIE"

curl -s -F "login=${login}" -F "password=${password}" "${url}" | grep -q "${okmatch}" && growlnotify -m "Connecté à FreeWifi" "FreeWifi"
```

Ce script nécessite `curl`, et utilise [growlnotify](http://growl.info/downloads) pour notifier lorsque la connexion est réussie.

Je conseille d'automatiser l'exécution de ce script à l'aide de [ControlPlane](http://www.controlplaneapp.com/), une application *open source* permettant d'automatiser certaines tâches en fonction de détections d'événements, dont le changement de SSID WiFi.

J'ai aussi posté [ce script sur coderwall](https://coderwall.com/p/3ackwq), si vous y avez un compte…
