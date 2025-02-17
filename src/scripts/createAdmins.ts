import { userRepository } from '../core/repositories';
import { UserCreate } from '../core/types';
import { hashPassword } from '../core/utils';

const ADMINS = [
  {
    firstName: 'Predrag',
    lastName: 'Kovacevic',
    mail: 'predrag.kovacevic@underit.rs',
    password: 'admin',
    isAdmin: true,
  },
  {
    firstName: 'Davor',
    lastName: 'Lovric',
    mail: 'davor.lovric@underit.rs',
    password: 'admin',
    isAdmin: true,
  },
  {
    firstName: 'Aleksej',
    lastName: 'Trailovic',
    mail: 'aleksej.trailovic@gmail.com',
    password: 'admin',
    isAdmin: true,
  },
  {
    firstName: 'Dunja',
    lastName: 'Crnomarkovic',
    mail: 'crnomarkovicd7@gmail.com',
    password: 'admin',
    isAdmin: true,
  },
  {
    firstName: 'Stevan',
    lastName: 'Radic',
    mail: 'stevan.radic@underit.rs',
    password: 'admin',
    isAdmin: true,
  },
];

const createAdmin = async (admin: UserCreate) => {
  const hashedPasswords = await hashPassword(admin.password);
  await userRepository.createOne({ ...admin, password: hashedPasswords });
};

const createAdmins = async () => {
  await Promise.all(ADMINS.map((admin) => createAdmin(admin)));
};

(async () => {
  await createAdmins();
})();
