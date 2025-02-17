/* eslint-disable no-await-in-loop */
import prisma from '../connection';

(async () => {
  const tableNames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public';`;

  console.log(tableNames);

  let names = '';
  tableNames.forEach((el, i) => {
    names = `${names}"${el.tablename}"${i === tableNames.length - 1 ? '' : ','}`;
  });

  await prisma.$executeRawUnsafe(`DROP TABLE ${names};`);
})();
