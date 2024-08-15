export interface Service {
  serviceId: number;
  userId: number;
  name: string;
  categoryId: number;
  providerName: string;
  description: string;
  price: number;
  unitId: number;
  paymentMethodIds: number[];
  location: string;
};
