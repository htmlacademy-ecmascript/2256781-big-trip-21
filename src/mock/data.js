import { getDate, createRandomNumberFromRange } from '../utils.js';
import { TYPE_POINTS } from '../const.js';

const Price = {
  MIN: 1,
  MAX: 2000,
};

const pictureNumberGenerator = createRandomNumberFromRange(1, 17, true);
const priceGenerator = createRandomNumberFromRange(Price.MIN, Price.MAX, false);
const destinationIdGenerator = createRandomNumberFromRange(1, 10, false);
const favoriteFlagGenerator = createRandomNumberFromRange(0, 1, false);
const typePointGenerator = createRandomNumberFromRange(
  0,
  TYPE_POINTS.length - 1,
  false
);

const DESTINATIONS = [
  {
    id: 1,
    description: 'Amsterdam - middle-eastern paradise',
    name: 'Amsterdam',
    pictures: [
      {
        src: `https://21.objects.pages.academy/static/destinations/${pictureNumberGenerator()}.jpg`,
        description: 'Amsterdam middle-eastern paradise',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${pictureNumberGenerator()}.jpg`,
        description: 'Amsterdam a perfect place to stay with a family',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${pictureNumberGenerator()}.jpg`,
        description:
          'Amsterdam with an embankment of a mighty river as a centre of attraction',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${pictureNumberGenerator()}.jpg`,
        description: 'Amsterdam with crowded streets',
      },
    ],
  },
  {
    id: 2,
    description: 'Sochi - with a beautiful old town',
    name: 'Sochi',
    pictures: [
      {
        src: `https://21.objects.pages.academy/static/destinations/${pictureNumberGenerator()}.jpg`,
        description: 'Sochi for those who value comfort and coziness',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${pictureNumberGenerator()}.jpg`,
        description: 'Sochi is a beautiful city',
      },
    ],
  },
  {
    id: 3,
    description: 'Paris - a perfect place to stay with a family',
    name: 'Paris',
    pictures: [
      {
        src: `https://21.objects.pages.academy/static/destinations/${pictureNumberGenerator()}.jpg`,
        description:
          'Paris full of of cozy canteens where you can try the best coffee in the Middle East',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${pictureNumberGenerator()}.jpg`,
        description: 'Paris a true asian pearl',
      },
    ],
  },
  {
    id: 4,
    description: 'Chamonix - for those who value comfort and coziness',
    name: 'Chamonix',
    pictures: [],
  },
  {
    id: 5,
    description: 'Rome - in a middle of Europe',
    name: 'Rome',
    pictures: [
      {
        src: `https://21.objects.pages.academy/static/destinations/${pictureNumberGenerator()}.jpg`,
        description: 'Rome for those who value comfort and coziness',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${pictureNumberGenerator()}.jpg`,
        description: 'Rome a perfect place to stay with a family',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${pictureNumberGenerator()}.jpg`,
        description: 'Rome for those who value comfort and coziness',
      },
    ],
  },
  {
    id: 6,
    description: 'Nagasaki - for those who value comfort and coziness',
    name: 'Nagasaki',
    pictures: [
      {
        src: `https://21.objects.pages.academy/static/destinations/${pictureNumberGenerator()}.jpg`,
        description: 'Nagasaki a true asian pearl',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${pictureNumberGenerator()}.jpg`,
        description: 'Nagasaki is a beautiful city',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${pictureNumberGenerator()}.jpg`,
        description:
          'Nagasaki with an embankment of a mighty river as a centre of attraction',
      },
    ],
  },
  {
    id: 7,
    description: 'Saint Petersburg - a perfect place to stay with a family',
    name: 'Saint Petersburg',
    pictures: [
      {
        src: `https://21.objects.pages.academy/static/destinations/${pictureNumberGenerator()}.jpg`,
        description: 'Saint Petersburg a perfect place to stay with a family',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${pictureNumberGenerator()}.jpg`,
        description:
          'Saint Petersburg full of of cozy canteens where you can try the best coffee in the Middle East',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${pictureNumberGenerator()}.jpg`,
        description: 'Saint Petersburg a perfect place to stay with a family',
      },
    ],
  },
  {
    id: 8,
    description: 'Saint Petersburg - with crowded streets',
    name: 'Saint Petersburg',
    pictures: [],
  },
  {
    id: 9,
    name: 'Den Haag',
  },
  {
    id: 10,
    name: 'Naples',
  },
];

const OFFERS = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 165,
      },
      {
        id: 2,
        title: 'Choose the radio station',
        price: 48,
      },
      {
        id: 3,
        title: 'Choose temperature',
        price: 55,
      },
      {
        id: 4,
        title: 'Drive quickly, I am in a hurry',
        price: 130,
      },
      {
        id: 5,
        title: 'Drive slowly',
        price: 134,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Infotainment system',
        price: 63,
      },
      {
        id: 2,
        title: 'Order meal',
        price: 67,
      },
      {
        id: 3,
        title: 'Choose seats',
        price: 137,
      },
    ],
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Book a taxi at the arrival point',
        price: 181,
      },
      {
        id: 2,
        title: 'Order a breakfast',
        price: 34,
      },
      {
        id: 3,
        title: 'Wake up at a certain time',
        price: 142,
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Choose meal',
        price: 141,
      },
      {
        id: 2,
        title: 'Choose seats',
        price: 117,
      },
      {
        id: 3,
        title: 'Upgrade to comfort class',
        price: 127,
      },
      {
        id: 4,
        title: 'Upgrade to business class',
        price: 123,
      },
      {
        id: 5,
        title: 'Add luggage',
        price: 85,
      },
      {
        id: 6,
        title: 'Business lounge',
        price: 63,
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Choose the time of check-in',
        price: 172,
      },
      {
        id: 2,
        title: 'Choose the time of check-out',
        price: 55,
      },
      {
        id: 3,
        title: 'Add breakfast',
        price: 73,
      },
      {
        id: 4,
        title: 'Laundry',
        price: 94,
      },
      {
        id: 5,
        title: 'Order a meal from the restaurant',
        price: 135,
      },
    ],
  },
  {
    type: 'sightseeing',
    offers: [],
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Choose meal',
        price: 84,
      },
      {
        id: 2,
        title: 'Choose seats',
        price: 65,
      },
      {
        id: 3,
        title: 'Upgrade to comfort class',
        price: 108,
      },
      {
        id: 4,
        title: 'Upgrade to business class',
        price: 68,
      },
      {
        id: 5,
        title: 'Add luggage',
        price: 129,
      },
      {
        id: 6,
        title: 'Business lounge',
        price: 52,
      },
    ],
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'With automatic transmission',
        price: 119,
      },
      {
        id: 2,
        title: 'With air conditioning',
        price: 64,
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'Choose live music',
        price: 59,
      },
      {
        id: 2,
        title: 'Choose VIP area',
        price: 50,
      },
    ],
  },
];

function getOffersByType(type) {
  const offerByType = OFFERS.find((offer) => offer.type === type);

  return offerByType?.offers
    ? offerByType.offers.map(({ id }) => id)
    : offerByType;
}

function getRandomOffersByType(type) {
  const offersByType = getOffersByType(type);
  const randomOffers = [];

  if (!offersByType || offersByType.length === 0) {
    return null;
  }

  const randomNumber = createRandomNumberFromRange(
    1,
    offersByType.length - 1,
    false
  )();

  const randomOfferGenerator = createRandomNumberFromRange(
    0,
    offersByType.length - 1,
    true
  );

  for (let i = 1; i <= randomNumber; i++) {
    randomOffers.push(offersByType[randomOfferGenerator()]);
  }

  return randomOffers;
}

function generatePoint() {
  const type = TYPE_POINTS[typePointGenerator()];
  const destination = destinationIdGenerator();
  const isFavorite = !!favoriteFlagGenerator();

  return {
    id: crypto.randomUUID(),
    basePrice: priceGenerator(),
    dateFrom: getDate({ next: false }),
    dateTo: getDate({ next: true }),
    destination,
    isFavorite,
    offers: getRandomOffersByType(type) ?? [],
    type,
  };
}

export { generatePoint, DESTINATIONS, OFFERS };
