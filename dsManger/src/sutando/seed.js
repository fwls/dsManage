const sutando = require("../config/database");
const md5 = require("md5");

const userData = [
  {
    username: "admin",
    name: "Alice",
    email: "alice@sutando.org",
    password: "123456",
  },
  {
    username: "admin1",
    name: "Nilu",
    email: "nilu@sutando.org",
    password: "123456",
  },
  {
    username: "admin2",
    name: "Mahmoud",
    email: "mahmoud@sutando.org",
    password: "123456",
  },
];

const main = async () => {
  console.log(`Start seeding ...`);

  for (let u of userData) {
    await sutando.connection().table("users").insert({
      username: u.username,
      name: u.name,
      email: u.email,
      password: md5(u.password),
    });
  }

  console.log(`Seeding finished.`);

    await sutando.destroyAll();
};

main();
