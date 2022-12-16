const seed = [[]];
const names = [
  "Jason",
  "Blaise",
  "Zalzia",
  "Vincyus",
  "Valvarg",
  "Ylensia",
  "Ajmina",
];

let y = 0;
for (let i = 0; i < 400; i++) {
  if (y > 6) y = 0;
  seed[i] = {
    name: names[y],
    photo: Math.random(),
    device: y % 2 === 0 ? "Android" : "iOS",
  };
  y++;
}

export default seed;
