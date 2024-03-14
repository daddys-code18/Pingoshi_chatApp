import { User } from "../models/userModel.js";
import { faker } from "@faker-js/faker";

const createUser = async (numUsers) => {
  try {
    const usersPromise = [];
    for (let i = 0; i < numUsers; i++) {
      const tempuser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      usersPromise.push(tempuser);
    }
    await Promise.all(usersPromise);
    console.log("users creaed", numUsers);
    process.exit(1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
export { createUser };
