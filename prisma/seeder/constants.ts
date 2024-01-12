export type CarMakes =
  | 'Toyota'
  | 'Honda'
  | 'Ford'
  | 'Chevrolet'
  | 'BMW'
  | 'Mercedes-Benz'
  | 'Audi'
  | 'Nissan'
  | 'Volkswagen'
  | 'Tesla';
export type CarRecordsByMake = Record<CarMakes, string[]>;

// create list of car makes, models, etc
export const MAX_NUM = 100;
export const carImages = [
  '/assets/cars/benzcar.png',
  '/assets/cars/volkswagoncar.png',
  '/assets/cars/toyotacar.png',
];
export const carMakesArray: CarMakes[] = [
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Nissan',
  'Volkswagen',
  'Tesla',
  'Toyota',
  'Honda',
  'Ford',
  'Chevrolet',
];
export const carModelsByMake: CarRecordsByMake = {
  Toyota: ['Camry', 'Corolla', 'Rav4', 'Highlander', 'Prius'],
  Honda: ['Accord', 'Civic', 'CR-V', 'Pilot', 'Odyssey'],
  Ford: ['Fusion', 'Focus', 'Escape', 'Explorer', 'Mustang'],
  Chevrolet: ['Malibu', 'Cruze', 'Equinox', 'Tahoe', 'Suburban'],
  BMW: ['3 Series', '5 Series', 'X3', 'X5', '7 Series'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class'],
  Audi: ['A4', 'A6', 'Q5', 'Q7', 'TT'],
  Nissan: ['Altima', 'Maxima', 'Rogue', 'Murano', 'Pathfinder'],
  Volkswagen: ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'Golf'],
  Tesla: ['Model 3', 'Model S', 'Model X', 'Model Y', 'Cybertruck'],
};
export const colors = [
  'Red',
  'Blue',
  'Green',
  'White',
  'Black',
  'Silver',
  'Gray',
  'Yellow',
  'Orange',
  'Purple',
];
export const locationsArray = [
  {
    location: 'New York, NY, USA',
    lat: '40.7127753',
    lng: '-74.0059728',
  },
  {
    location: 'Dallas, TX, USA',
    lat: '32.7766642',
    lng: '-96.79698789999999',
  },
  {
    location: 'Kansas City, MO, USA',
    lat: '39.0997265',
    lng: '-94.5785667',
  },
  {
    location: 'Boston, MA, USA',
    lat: '42.3600825',
    lng: '-71.0588801',
  },
  {
    location: 'Paris, France',
    lat: '48.856614',
    lng: '2.3522219',
  },
  {
    location: 'Frankfurt, Germany',
    lat: '50.1109221',
    lng: '8.6821267',
  },
  {
    location: 'London, UK',
    lat: '51.5072178',
    lng: '-0.1275862',
  },
  {
    location: 'Jersey City, NJ, USA',
    lat: '40.7177545',
    lng: '-74.0431435',
  },
  {
    location: 'Sheffield, UK',
    lat: '53.38112899999999',
    lng: '-1.470085',
  },
  {
    location: 'Oklahoma City, OK, USA',
    lat: '35.4675602',
    lng: '-97.5164276',
  },
];
