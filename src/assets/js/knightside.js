// Maps for 4-hour interval
export const Anggolt = [
  "Training Grounds of Victory",
  "Rally Point of Victory",
  "Conquest of Victory",
];

export const Kiaron = [
  "Assault Point of Victory",
  "Marching Point of Victory",
];

export const Grish = [
  "Confrontation Point of Victory",
  "Conflict Point of Victory",
];

export const Inferno = [
  "High Ground Summit",
  "Cloud Path Watchtower",
];

export const Anggolt430 = [
  "Training Grounds of Belligerence",
  "Rally Point of Belligerence",
  "Conquest of Belligerence",
   "Rally Point of Unity",
  "Conquest of Unity",
  "Training Ground of Unity",
];

export const Kiaron430 = [
  "Assault Point of Belligerence",
  "Marching Point of Belligerence",
  "Assault Point of Unity",
  "Marching Point of Unity"
];

export const Grish430 = [
  "Confrontation Point of Belligerence",
  "Conflict Point of Belligerence",
  "Confrontation Point of Unity",
  "Conflict Point of Unity",
];

export const Inferno430 = [
  "Newbreeze Border",
  "Rocky Mountain Cliff",
  "Horizon Peaks",
  "Stonegrave Summit",
];

const spawnknightData = {
  Anggolt: {
    intervalHours: 4,
    intervalMinutes: 0,
    maps: Anggolt
  },
  Kiaron: {
    intervalHours: 4,
    intervalMinutes: 0,
    maps: Kiaron
  },
  Grish: {
    intervalHours: 4,
    intervalMinutes: 0,
    maps: Grish
  },
  Inferno: {
    intervalHours: 4,
    intervalMinutes: 0,
    maps: Inferno
  },
  Anggolt430: {
    intervalHours: 4,
    intervalMinutes: 30,
    maps: Anggolt430
  },
  Kiaron430: {
    intervalHours: 5,
    intervalMinutes: 30,
    maps: Kiaron430
  },
  Grish430: {
    intervalHours: 6,
    intervalMinutes: 30,
    maps: Grish430
  },
  Inferno430: {
    intervalHours: 7,
    intervalMinutes: 30,
    maps: Inferno430
  }
};

export default spawnknightData;
