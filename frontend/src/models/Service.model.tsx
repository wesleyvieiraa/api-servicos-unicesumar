export interface Service {
  serviceId?: number;
  userId?: number;
  name: string;
  categoryId: number | string;
  providerName: string;
  description: string;
  price: number | string;
  unitId: number | string;
  paymentMethodIds: number[];
  location?: string;
};
