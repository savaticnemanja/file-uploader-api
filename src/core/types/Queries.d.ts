export type DocumentationQuery = {
  page?: string;
  take?: string;
  name?: string;
};

export type ProjectQuery = {
  page?: string;
  take?: string;
  name?: string;
  phase?: string;
  location?: string;
  startDate?: string;
  startDateRangeEnd?: string;
  endDate?: string;
  endDateRangeEnd?: string;
  timeLimit?: string;
  value?: string;

};

export type AdminGetUsersQuery = {
  page?: string;
  take?: string;
  firstName?: string;
  lastName?: string;
  mail?: string;
  isAdmin?: 'true' | 'false';
};
