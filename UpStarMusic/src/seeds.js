import _ from 'lodash';
import faker from 'faker';
import { MongoClient } from 'mongodb';
import { GENRES } from './constants';

const url = 'mongodb://localhost:27017';
const dbName = 'upstar_music';

const MINIMUM_ARTISTS = 200;
const ARTISTS_TO_ADD = 15000;

MongoClient.connect(url, function(err, client) {
  let artistsCollection = client.db(dbName).collection('artists');
  artistsCollection
    .count({})
    .then((count) => {
      if (count < MINIMUM_ARTISTS) {
        const artists = _.times(ARTISTS_TO_ADD, () => createArtist());

        artistsCollection.insertMany(artists);
      }
    })
    .catch((e) => console.log(e));
});

function createArtist() {
  return {
    name: faker.name.findName(),
    age: randomBetween(15, 45),
    yearsActive: randomBetween(0, 15),
    image: faker.image.avatar(),
    genre: getGenre(),
    website: faker.internet.url(),
    netWorth: randomBetween(0, 5000000),
    labelName: faker.company.companyName(),
    retired: faker.random.boolean(),
    albums: getAlbums()
  };
}

function getAlbums() {
  return _.times(randomBetween(0, 5), () => {
    const copiesSold = randomBetween(0, 1000000);

    return {
      title: _.capitalize(faker.random.words()),
      date: faker.date.past(),
      copiesSold,
      numberTracks: randomBetween(1, 20),
      image: getAlbumImage(),
      revenue: copiesSold * 12.99
    };
  });
}

function getAlbumImage() {
  const types = _.keys(faker.image);
  const method = randomEntry(types);

  return faker.image[method]();
}

function getGenre() {
  return randomEntry(GENRES);
}

function randomEntry(array) {
  return array[~~(Math.random() * array.length)];
}

function randomBetween(min, max) {
  return ~~(Math.random() * (max - min)) + min;
}
