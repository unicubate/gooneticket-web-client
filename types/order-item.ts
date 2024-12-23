import { ModelType, PaginationResponse } from '@/utils/paginations';
import { KeyAsString } from '@/utils/utils';
import { EventModel } from './event';
import { EventDateModel } from './event-date';
import { ProductModel } from './product';
import { ProfileItemModel } from './profile';
import { TicketModel } from './ticket';
import { UploadModel } from './upload';
import { UserAddressModel } from './user-address';

export type ResponseOrderItemModel = {
  value: Array<OrderItemModel>;
} & PaginationResponse;

export type StatusOderProduct =
  | 'PENDING'
  | 'ACCEPTED'
  | 'OR_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export const statusOderProductLists: KeyAsString = {
  PENDING: 'primary',
  ACCEPTED: 'success',
  CANCELLED: 'danger',
};

export const statusOderItemArray = [
  { id: 'PENDING', name: 'PENDING' },
  { id: 'ACCEPTED', name: 'ACCEPTED' },
  { id: 'DELIVERED', name: 'DELIVERED' },
  { id: 'CANCELLED', name: 'CANCELLED' },
];

export type OrderItemModel = {
  createdAt: Date;
  confirmedAt: Date;
  id: string;
  orderNumber: string;
  quantity: string;
  percentDiscount: string;
  price: string;
  fullName: string;
  email: string;
  priceDiscount: string;
  priceTotal: number;
  organizationBuyerId: string;
  organizationSellerId: string;
  model: ModelType;
  status: StatusOderProduct;
  currency: string;
  productId: string;
  orderId: string;
  ticket: TicketModel;
  userId: string;
  bookingId: string;
  ticketName: string;
  address: {
    fullName: string;
    email: string;
  };
  booking: {
    id: string;
    confirmedAt: Date;
  };
  order: {
    orderNumber: string;
    transaction: {
      id: string;
    };
  };
  profile: ProfileItemModel;
  organizationSeller: { name: string; image: string };
  profileSeller: ProfileItemModel;
  product: ProductModel;
  event: EventModel;
  eventDate: EventDateModel;
  uploadFilesTicket: UploadModel;
};

export type OrderModel = {
  createdAt: Date;
  id: string;
  orderNumber: string;
  amountTotal: number;
  quantity: string;
  currency: string;
  country: string;
  ticketName: string;
  ticket: TicketModel;
  address: UserAddressModel;
  organizationBuyerId: string;
  organizationSellerId: string;
  event: EventModel;
  transaction: { id: string };
  oneUploadImage: UploadModel;
};

export interface OrderItemFormModel {
  status: StatusOderProduct;
  orderItemId: string;
  fullName: string;
  email: string;
  customer: 'buyer';
}
