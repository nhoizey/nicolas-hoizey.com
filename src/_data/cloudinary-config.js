module.exports = {
  "cloud_name": "nho",
  "presets": {
    "default": {
      "fallbackWidth": 800,
      "minWidth": 360,
      "maxWidth": 1600,
      "steps": 5,
      "sizes": "(max-width: 67rem) 90vw, 60rem",
      "figure": "always",
      "classes": "",
      "attributes": {
        "loading": "lazy"
      }
    },
    "twothirds": {
      "fallbackWidth": 600,
      "minWidth": 240,
      "maxWidth": 1120,
      "steps": 5,
      "sizes": "(max-width: 20rem) 45vw, (max-width: 67rem) 60vw, 40rem",
      "figure": "always",
      "classes": "twothirds",
    },
    "onehalf": {
      "fallbackWidth": 400,
      "minWidth": 180,
      "maxWidth": 800,
      "steps": 5,
      "sizes": "(max-width: 67rem) 45vw, 30rem",
      "figure": "always",
      "classes": "onehalf",
    },
    "onethird": {
      "fallbackWidth": 300,
      "minWidth": 120,
      "maxWidth": 560,
      "steps": 5,
      "sizes": "(max-width: 20rem) 45vw, (max-width: 67rem) 30vw, 20rem",
      "figure": "always",
      "classes": "onethird right",
      "attributes": {
        "toto": "tata"
      }
    },
    "onefourth": {
      "fallbackWidth": 200,
      "minWidth": 100,
      "maxWidth": 400,
      "steps": 5,
      "sizes": "(max-width: 20rem) 45vw, (max-width: 30rem) 30vw, (max-width: 67rem) 22.5vw, 15rem",
      "figure": "always",
      "classes": "onefourth right"
    },
    "logo": {
      "fallbackWidth": 300,
      "minWidth": 120,
      "maxWidth": 560,
      "steps": 5,
      "sizes": "(max-width: 20rem) 45vw, (max-width: 67rem) 30vw, 20rem",
      "figure": "never",
      "classes": "logo"
    }
  }
}
