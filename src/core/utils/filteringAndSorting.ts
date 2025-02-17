import { AdminGetUsersQuery, ProjectQuery, DocumentationQuery } from '../types';

export const filter = {
  project: (query: ProjectQuery) => ({
    name: query.name ? { contains: query.name } : undefined,
    phase: query.phase ? { equals: Number(query.phase) } : undefined,
    location: query.location ? { contains: query.location } : undefined,
    startDate: {
      gte: query.startDate ? new Date(query.startDate) : undefined,
      lte: query.startDateRangeEnd ? new Date(query.startDateRangeEnd) : undefined,
    },
    endDate:
      query.endDate || query.endDateRangeEnd
        ? {
            gte: query.endDate ? new Date(query.endDate) : undefined,
            lte: query.endDateRangeEnd ? new Date(query.endDateRangeEnd) : undefined,
          }
        : undefined,
    timeLimit: query.timeLimit ? { equals: Number(query.timeLimit) } : undefined,
    value: query.value ? { equals: Number(query.value) } : undefined,
  }),
  user: (query: AdminGetUsersQuery) => ({
    firstName: query.firstName ? { contains: query.firstName } : undefined,
    lastName: query.lastName ? { contains: query.lastName } : undefined,
    mail: query.mail ? { contains: query.mail } : undefined,
    isAdmin: query.isAdmin ? query.isAdmin === 'true' : undefined,
  }),
  document: (query: DocumentationQuery) => ({
    name: query.name ? { contains: query.name } : undefined,
  }),
};
