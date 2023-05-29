type IRevenueContentSection = { id: string; description: string };

type IRevenueSection = {
  id: string;
  description: string;
  contentSection: IRevenueContentSection[];
};

type IRevenue = {
  id: string;
  name: string;
  section: IRevenueSection[];
};

export { IRevenue, IRevenueSection };
