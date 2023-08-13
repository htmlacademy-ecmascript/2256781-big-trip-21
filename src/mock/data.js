const POINTS = [{
  id: 'a293be43-b1f2-49eb-9297-3d1ea13cc306',
  basePrice: 6684,
  dateFrom: '2023-08-03T21:00:01.147Z',
  dateTo: '2023-08-13T01:00:01.147Z',
  destination: '1793ae00-0950-41e8-8e74-b17970748cd2',
  isFavorite: true,
  offers: [],
  type: 'bus'
}, {
  id: '9b2d334c-3783-461d-ba6d-0ada613fbf57',
  basePrice: 6346,
  dateFrom: '2023-08-08T21:00:01.147Z',
  dateTo: '2023-08-13T16:00:01.147Z',
  destination: 'b0b1e0b5-fdc0-426b-9b51-05ce0cd2d80d',
  isFavorite: false,
  offers: [],
  type: 'sightseeing'
}, {
  id: 'ede47450-9301-4564-8220-6303d0753b33',
  basePrice: 1301,
  dateFrom: '2023-08-01T21:00:01.147Z',
  dateTo: '2023-08-12T03:00:01.147Z',
  destination: '8d05e240-7c07-45f9-8ea5-7cb804543822',
  isFavorite: true,
  offers: [
    '7e83e639-7e78-4ba5-abe3-68f43bd65d08'
  ],
  type: 'train'
}, {
  id: '5fd17db6-ca9d-46b0-82c3-075716d9c604',
  basePrice: 9470,
  dateFrom: '2023-07-31T21:00:01.147Z',
  dateTo: '2023-08-12T23:00:01.147Z',
  destination: '1793ae00-0950-41e8-8e74-b17970748cd2',
  isFavorite: false,
  offers: [
    'fcf92685-3cea-4396-862a-653f7290fd35'
  ],
  type: 'check-in'
},{
  id: 'bc0d23d2-4b94-46bb-ba45-43784f8c8970',
  basePrice: 6172,
  dateFrom: '2023-08-07T21:00:01.147Z',
  dateTo: '2023-08-13T09:00:01.147Z',
  destination: '370a70e3-5e86-4cf7-8f22-6290b5a6683d',
  isFavorite: false,
  offers: [
    'f6fa292a-7112-49ed-a6bb-bc2dff743ee3'
  ],
  type: 'drive'
},{
  id: '91d1e0d5-cf98-4391-8ef0-7581f42b80d2',
  basePrice: 9003,
  dateFrom: '2023-08-01T21:00:01.147Z',
  dateTo: '2023-08-12T09:00:01.147Z',
  destination: '8d05e240-7c07-45f9-8ea5-7cb804543822',
  isFuavorite: true,
  offers: [
    'cc889541-5a52-4e3f-ac53-35a25e4deb47'
  ],
  type: 'restaurant'
}];

const DISTANATIONS = [
  {
    id: '370a70e3-5e86-4cf7-8f22-6290b5a6683d',
    description: 'Amsterdam - middle-eastern paradise',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'https://21.objects.pages.academy/static/destinations/13.jpg',
        description: 'Amsterdam middle-eastern paradise'
      },
      {
        src: 'https://21.objects.pages.academy/static/destinations/7.jpg',
        description: 'Amsterdam a perfect place to stay with a family'
      },
      {
        src: 'https://21.objects.pages.academy/static/destinations/14.jpg',
        description: 'Amsterdam with an embankment of a mighty river as a centre of attraction'
      },
      {
        src: 'https://21.objects.pages.academy/static/destinations/17.jpg',
        description: 'Amsterdam with crowded streets'
      }
    ]
  },
  {
    id: 'd5ffda3a-5b4c-4f00-acda-21bcc31daf43',
    description: 'Sochi - with a beautiful old town',
    name: 'Sochi',
    pictures: [
      {
        src: 'https://21.objects.pages.academy/static/destinations/10.jpg',
        description: 'Sochi for those who value comfort and coziness'
      },
      {
        src: 'https://21.objects.pages.academy/static/destinations/13.jpg',
        description: 'Sochi is a beautiful city'
      }
    ]
  },
  {
    id: '7b7b538a-2711-4dad-9707-576b7303302a',
    description: 'Paris - a perfect place to stay with a family',
    name: 'Paris',
    pictures: [
      {
        src: 'https://21.objects.pages.academy/static/destinations/7.jpg',
        description: 'Paris full of of cozy canteens where you can try the best coffee in the Middle East'
      },
      {
        src: 'https://21.objects.pages.academy/static/destinations/5.jpg',
        description: 'Paris a true asian pearl'
      }
    ]
  },
  {
    id: '8d05e240-7c07-45f9-8ea5-7cb804543822',
    description: 'Chamonix - for those who value comfort and coziness',
    name: 'Chamonix',
    pictures: []
  },
  {
    id: '9bec9ace-1333-4fef-a789-254aadf2a5b5',
    description: 'Rome - in a middle of Europe',
    name: 'Rome',
    pictures: [
      {
        src: 'https://21.objects.pages.academy/static/destinations/14.jpg',
        description: 'Rome for those who value comfort and coziness'
      },
      {
        src: 'https://21.objects.pages.academy/static/destinations/4.jpg',
        description: 'Rome a perfect place to stay with a family'
      },
      {
        src: 'https://21.objects.pages.academy/static/destinations/16.jpg',
        description: 'Rome for those who value comfort and coziness'
      }
    ]
  },
  {
    id: '2e2a51ed-23ec-4edc-ae0d-ed30da2cec6a',
    description: 'Nagasaki - for those who value comfort and coziness',
    name: 'Nagasaki',
    pictures: [
      {
        src: 'https://21.objects.pages.academy/static/destinations/11.jpg',
        description: 'Nagasaki a true asian pearl'
      },
      {
        src: 'https://21.objects.pages.academy/static/destinations/9.jpg',
        description: 'Nagasaki is a beautiful city'
      },
      {
        src: 'https://21.objects.pages.academy/static/destinations/16.jpg',
        description: 'Nagasaki with an embankment of a mighty river as a centre of attraction'
      }
    ]
  },
  {
    id: 'b0b1e0b5-fdc0-426b-9b51-05ce0cd2d80d',
    description: 'Saint Petersburg - a perfect place to stay with a family',
    name: 'Saint Petersburg',
    pictures: [
      {
        src: 'https://21.objects.pages.academy/static/destinations/14.jpg',
        description: 'Saint Petersburg a perfect place to stay with a family'
      },
      {
        src: 'https://21.objects.pages.academy/static/destinations/10.jpg',
        description: 'Saint Petersburg full of of cozy canteens where you can try the best coffee in the Middle East'
      },
      {
        src: 'https://21.objects.pages.academy/static/destinations/9.jpg',
        description: 'Saint Petersburg a perfect place to stay with a family'
      }
    ]
  },
  {
    id: '23bb1b80-9acf-4c29-8571-175e5aa6fa1a',
    description: 'Saint Petersburg - with crowded streets',
    name: 'Saint Petersburg',
    pictures: []
  },
  {
    id: '1793ae00-0950-41e8-8e74-b17970748cd2',
    name: 'Den Haag'
  },
  {
    id: 'd1d1f56f-40a2-4de5-9dab-4fbdd9e98726',
    name: 'Naples'
  }
];

const OFFERS = [
  {
    type: 'taxi',
    offers: [
      {
        id: 'ca78640b-a924-478c-9ccb-35ad88a7184b',
        title: 'Upgrade to a business class',
        price: 165
      },
      {
        id: 'fd5eb512-fe2b-4f64-b53d-9a32d437ad55',
        title: 'Choose the radio station',
        price: 48
      },
      {
        id: '93da5a38-a83b-45d6-aa0b-1a7d6c80933f',
        title: 'Choose temperature',
        price: 55
      },
      {
        id: 'db7f4251-3258-4b92-b56c-68baff7d7681',
        title: 'Drive quickly, I\'m in a hurry',
        price: 130
      },
      {
        id: 'aca11991-a0da-4a59-8a0e-fb897c7ff2a2',
        title: 'Drive slowly',
        price: 134
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: '38d212f9-2925-4038-9a1d-97c4c8fd379f',
        title: 'Infotainment system',
        price: 63
      },
      {
        id: '2fcde6e1-63c6-4c13-abe1-69151768fc52',
        title: 'Order meal',
        price: 67
      },
      {
        id: 'ca47200d-4e9d-4478-a737-d0e1777cb6f2',
        title: 'Choose seats',
        price: 137
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: '2e79ad30-6498-4d6d-8aee-be605afe6916',
        title: 'Book a taxi at the arrival point',
        price: 181
      },
      {
        id: '86e59b7a-5eeb-466f-82f8-24182d272850',
        title: 'Order a breakfast',
        price: 34
      },
      {
        id: '7e83e639-7e78-4ba5-abe3-68f43bd65d08',
        title: 'Wake up at a certain time',
        price: 142
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: '6b302345-9f18-4d54-8d07-1f3ee2d1f094',
        title: 'Choose meal',
        price: 141
      },
      {
        id: '704b25b8-1846-4fe0-8089-012abb05ace9',
        title: 'Choose seats',
        price: 117
      },
      {
        id: 'ddb34fd5-c1c9-4c13-bf3a-f53872b7927b',
        title: 'Upgrade to comfort class',
        price: 127
      },
      {
        id: '59aa3d3e-d26d-4308-a0f5-b1d64a3b53db',
        title: 'Upgrade to business class',
        price: 123
      },
      {
        id: '43c4cb50-4784-40c7-926f-a9d43506b817',
        title: 'Add luggage',
        price: 85
      },
      {
        id: 'c1cb8c91-0cbb-41ef-ad26-bc9b19dd5401',
        title: 'Business lounge',
        price: 63
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: '2fc7f802-2102-41dd-bddd-c2c89f67ff62',
        title: 'Choose the time of check-in',
        price: 172
      },
      {
        id: '14bb0bb4-6acf-48df-99a7-8a0eef5c1e49',
        title: 'Choose the time of check-out',
        price: 55
      },
      {
        id: 'c3946cfc-9eef-45c7-8f9a-958ee49622ae',
        title: 'Add breakfast',
        price: 73
      },
      {
        id: '8b43ab32-7e7b-4226-9893-c02490e4a1cf',
        title: 'Laundry',
        price: 94
      },
      {
        id: 'fcf92685-3cea-4396-862a-653f7290fd35',
        title: 'Order a meal from the restaurant',
        price: 135
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: []
  },
  {
    type: 'ship',
    offers: [
      {
        id: '655ddbbb-f8c6-4354-8eff-3a7899de0967',
        title: 'Choose meal',
        price: 84
      },
      {
        id: 'cd70479a-da15-4d9a-8efe-503b653ca2a4',
        title: 'Choose seats',
        price: 65
      },
      {
        id: '7f65f6bd-1b24-4d41-a66d-2fe2b077f2bb',
        title: 'Upgrade to comfort class',
        price: 108
      },
      {
        id: '99092e49-39f0-4c21-baa5-f2ec7ae71c08',
        title: 'Upgrade to business class',
        price: 68
      },
      {
        id: '9ca23c7e-ab16-4cde-8dda-fb67c2b71eed',
        title: 'Add luggage',
        price: 129
      },
      {
        id: 'acf7019b-ca90-48f5-be16-6339f3436003',
        title: 'Business lounge',
        price: 52
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: '062b5d3d-3a82-4c0a-b193-71c0c2ef6b7d',
        title: 'With automatic transmission',
        price: 119
      },
      {
        id: 'f6fa292a-7112-49ed-a6bb-bc2dff743ee3',
        title: 'With air conditioning',
        price: 64
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: '08a2d6b7-bdc5-49ab-90e9-6e549b85b1b8',
        title: 'Choose live music',
        price: 59
      },
      {
        id: 'cc889541-5a52-4e3f-ac53-35a25e4deb47',
        title: 'Choose VIP area',
        price: 50
      }
    ]
  }
];

const PointType = {
  TAXI: 'Taxi',
  BUS: 'Bus',
  TRAIN: 'Train',
  SHIP: 'Ship',
  DRIVE: 'Drive',
  FLIGHT:'Flight',
  CHECKIN: 'Check-in',
  SIGHTSEEING: 'Sightseeing',
  RESTAURANT: 'Restaurant',
};

const getData = (type = 'empty') => type === 'empty' ? 'Click New Event to create your first point' : {POINTS, DISTANATIONS, OFFERS, PointType};

export {getData};
