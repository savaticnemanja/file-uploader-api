// eslint-disable-next-line
import prompts from 'prompts';
import { userModel } from '../core/modules';
import { hashPassword } from '../core/utils';

(async () => {
  // const firstName = prompt('firstName:');

  const userData = await prompts([
    {
      type: 'text',
      name: 'firstName',
      message: 'firstName',
    },
    {
      type: 'text',
      name: 'lastName',
      message: 'lastName',
    },
    {
      type: 'text',
      name: 'mail',
      message: 'mail',
    },
    {
      type: 'text',
      name: 'password',
      message: 'password',
    },
    {
      type: 'toggle',
      name: 'isAdmin',
      message: 'isAdmin',
    },
  ]);

  const hashedPassword = await hashPassword(userData.password);

  await userModel.create({
    data: { ...userData, password: hashedPassword },
  });
})();
