import { projectRepository } from '../repositories';

export const get = async () => {
  const totalProjects = await projectRepository.count();
  const activeProjects = await projectRepository.countActive();
  const totalValue = await projectRepository.sumUpPrices();
  const unfinishedValue = await projectRepository.sumUpActivePrices();

  return { totalProjects, activeProjects, totalValue, unfinishedValue };
};
