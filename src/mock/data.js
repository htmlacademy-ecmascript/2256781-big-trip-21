import {
  getRandomArrayElement,
  createRandomNumberFromRange,
} from '../utils.js';

const getPictureNumber = createRandomNumberFromRange(1, 17, true);

const POINTS = [
  {
    id: 0,
    type: 'bus',
    basePrice: 6684,
    dateFrom: new Date('2023-08-03:00'),
    dateTo: new Date('2023-08-13:22:00'),
    destination: '1793ae00-0950-41e8-8e74-b17970748cd2',
    isFavorite: true,
    offers: [1],
  },
  {
    id: 1,
    type: 'sightseeing',
    basePrice: 6346,
    dateFrom: new Date('2023-08-08:08:00'),
    dateTo: new Date('2023-08-13:21:00'),
    destination: 'b0b1e0b5-fdc0-426b-9b51-05ce0cd2d80d',
    isFavorite: false,
    offers: [],
  },
  {
    id: 2,
    type: 'train',
    basePrice: 1301,
    dateFrom: new Date('2023-08-01:01:00'),
    dateTo: new Date('2023-08-12:10:15'),
    destination: '8d05e240-7c07-45f9-8ea5-7cb804543822',
    isFavorite: true,
    offers: [1, 3],
  },
  {
    id: 3,
    type: 'check-in',
    basePrice: 9470,
    dateFrom: new Date('2023-07-31:21:00'),
    dateTo: new Date('2023-08-12:23:00'),
    destination: '1793ae00-0950-41e8-8e74-b17970748cd2',
    isFavorite: false,
    offers: [2],
  },
  {
    id: 4,
    type: 'drive',
    basePrice: 6172,
    dateFrom: new Date('2023-08-07:21:00'),
    dateTo: new Date('2023-08-13:09:00'),
    destination: '370a70e3-5e86-4cf7-8f22-6290b5a6683d',
    isFavorite: false,
    offers: [1],
  },
  {
    id: 5,
    type: 'restaurant',
    basePrice: 9003,
    dateFrom: new Date('2023-08-01:21:00'),
    dateTo: new Date('2023-08-12:09:00'),
    destination: '8d05e240-7c07-45f9-8ea5-7cb804543822',
    isFuavorite: true,
    offers: [1],
  },
  {
    id: 6,
    type: 'taxi',
    offers: [],
    destination: 2,
    basePrice: 500,
    dateFrom: new Date('2023-08-11:20:35'),
    dateTo: new Date('2023-08-12:11:25'),
  },
  {
    id: 7,
    type: 'ship',
    offers: [1, 3],
    destination: 2,
    basePrice: 80,
    dateFrom: new Date('2023-08-10:22:50'),
    dateTo: new Date('2023-08-11:22:10'),
  },
  {
    id: 8,
    type: 'flight',
    offers: [1, 2, 4],
    destination: 1,
    basePrice: 150,
    dateFrom: new Date('2023-08-10:22:55'),
    dateTo: new Date('2023-08-11:11:23'),
  },
];

const DISTANATIONS = [
  {
    id: 1,
    description: 'Amsterdam - middle-eastern paradise',
    name: 'Amsterdam',
    pictures: [
      {
        src: `https://21.objects.pages.academy/static/destinations/${getPictureNumber()}.jpg`,
        description: 'Amsterdam middle-eastern paradise',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${getPictureNumber()}.jpg`,
        description: 'Amsterdam a perfect place to stay with a family',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${getPictureNumber()}.jpg`,
        description:
          'Amsterdam with an embankment of a mighty river as a centre of attraction',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${getPictureNumber()}.jpg`,
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
        src: `https://21.objects.pages.academy/static/destinations/${getPictureNumber()}.jpg`,
        description: 'Sochi for those who value comfort and coziness',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${getPictureNumber()}.jpg`,
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
        src: `https://21.objects.pages.academy/static/destinations/${getPictureNumber()}.jpg`,
        description:
          'Paris full of of cozy canteens where you can try the best coffee in the Middle East',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${getPictureNumber()}.jpg`,
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
        src: `https://21.objects.pages.academy/static/destinations/${getPictureNumber()}.jpg`,
        description: 'Rome for those who value comfort and coziness',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${getPictureNumber()}.jpg`,
        description: 'Rome a perfect place to stay with a family',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${getPictureNumber()}.jpg`,
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
        src: `https://21.objects.pages.academy/static/destinations/${getPictureNumber()}.jpg`,
        description: 'Nagasaki a true asian pearl',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${getPictureNumber()}.jpg`,
        description: 'Nagasaki is a beautiful city',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${getPictureNumber()}.jpg`,
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
        src: `https://21.objects.pages.academy/static/destinations/${getPictureNumber()}.jpg`,
        description: 'Saint Petersburg a perfect place to stay with a family',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${getPictureNumber()}.jpg`,
        description:
          'Saint Petersburg full of of cozy canteens where you can try the best coffee in the Middle East',
      },
      {
        src: `https://21.objects.pages.academy/static/destinations/${getPictureNumber()}.jpg`,
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

const getData = (type = 'empty') =>
  type === 'empty'
    ? 'Click New Event to create your first point'
    : { POINTS, DISTANATIONS, OFFERS };

const getRandomPoint = () => getRandomArrayElement(POINTS);

export { getData, getRandomPoint };
