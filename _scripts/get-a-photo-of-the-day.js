const fetch = require('node-fetch');

const GEOJSON_URL = 'https://nicolas-hoizey.photo/feeds/photos.json';

const today = new Date();
const dayString = today.toISOString().slice(5, 10);
const dayReg = new RegExp(`^[0-9]{4}-${dayString}`);

const fetchPhotos = async () => {
  try {
    const response = await fetch(GEOJSON_URL);
    if (response.ok) {
      let photos = await response.json();

      const photosOfTheDay = photos.filter((photo) => photo.date.match(dayReg));

      if (photosOfTheDay.length) {
        let photo =
          photosOfTheDay[Math.floor(Math.random() * photosOfTheDay.length)];

        console.log(`photo:
  title: ${photo.title}
  url: ${photo.url}
  src: ${photo.src}
  width: ${photo.width}
  height: ${photo.height}
`);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

fetchPhotos();
