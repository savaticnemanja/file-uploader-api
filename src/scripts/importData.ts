// eslint-disable-next-line
import { faker } from '@faker-js/faker';
import { userModel, projectModel, paymentModel } from '../core/modules';
import { hashPassword, createProjectLink } from '../core/utils';

const LENGTH = {
  USER: 4,
  PROJECT: 10,
  USER_PROJECT_CONNECTIONS: 20,
  PAYMENT: 30,
  DOCUMENTATIONS: 4,
};

const getRandomItem = <T>(arr: Array<T>) => arr[Math.floor(Math.random() * arr.length)];

const calcNumberOfDays = (startDate: Date, endDate: Date) => {
  const differenceInTime = endDate.getTime() - startDate.getTime();
  const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
};

const createUsers = async () => {
  const hashedPasswords = await Promise.all(
    Array(LENGTH.USER)
      .fill(0)
      .map(() => hashPassword(faker.internet.password())),
  );

  await Promise.all(
    Array(LENGTH.USER)
      .fill(0)
      .map((_, i) =>
        userModel.create({
          data: {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            mail: faker.internet.email(),
            password: hashedPasswords[i],
            isAdmin: false,
          },
        }),
      ),
  );
};

const createProjects = async () => {
  const links = await Promise.all(
    Array(LENGTH.PROJECT)
      .fill(0)
      .map(() => createProjectLink()),
  );

  await Promise.all(
    Array(LENGTH.PROJECT)
      .fill(0)
      .map((_, i) => {
        const startDate = faker.date.past();
        const endDate = faker.date.future();

        return projectModel.create({
          data: {
            name: faker.company.name(),
            location: faker.location.city(),
            startDate,
            endDate,
            timeLimit: calcNumberOfDays(startDate, endDate),
            value: faker.number.int({ max: 40000, min: 30000 }),
            link: links[i],
          },
        });
      }),
  );
};

const connectUsersToProjects = async () => {
  const users = await userModel.findMany();
  const projects = await projectModel.findMany();

  await Promise.all(
    Array(LENGTH.USER_PROJECT_CONNECTIONS)
      .fill(0)
      .map(() => {
        const user = getRandomItem(users);
        const project = getRandomItem(projects);

        return userModel.update({
          where: { id: user.id },
          data: { projects: { connect: { id: project.id } } },
        });
      }),
  );
};

const createPayments = async () => {
  const projects = await projectModel.findMany();

  await Promise.all(
    Array(LENGTH.PAYMENT)
      .fill(0)
      .map(() => {
        const project = getRandomItem(projects);

        return paymentModel.create({
          data: {
            amount: faker.number.int({ max: 5000 }),
            date: faker.date.future(),
            project: {
              connect: { id: project.id },
            },
          },
        });
      }),
  );
};

// const createDocumentation = async () => {
//   await Promise.all(
//     Array(LENGTH.DOCUMENTATIONS)
//       .fill(0)
//       .map(() => documentationModel.create({ data: { name: faker.company.name() } })),
//   );
// };

(async () => {
  await createUsers();
  await createProjects();
  await connectUsersToProjects();
  await createPayments();
  // await createDocumentation();
})();
