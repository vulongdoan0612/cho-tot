export interface IGetVoucher {
  slice?: any;
  id: string;
  saId: string;
  type: number;
  amount: number;
  assetId: string;
  assetName: string;
  giftCode: string;
  gameId: string[];
  imageAssetUrl: string;
  timeExpired: number;
  desc: string;
  redirectUrl: string;
  isUsed: number;
  createdAt: number;
}
export interface IGetModal {
  slice?: any;
  id?: string;
  saId?: string;
  eventId?: string;
  eventName?: string;
  eventRoute?: string;
  type?: number;
  link?: string;
  amount?: number;
  image?: string;
  name?: string;
  gameAvatar?: string;
  totalTicket?: number;
  boxNumber?: number;
  available?: IGetVoucher[] | number;
  assetId?: string;
  assetName?: string;
  giftCode?: string;
  gameId: string[] | string;
  imageAssetUrl?: string;
  timeExpired?: number;
  desc?: string;
  redirectUrl?: string;
  isUsed?: number;
}
export interface IGetRaffleTicket {
  data: any;
  id: string;
  saId: string;
  eventId: string;
  eventName: string;
  image: string;
  gameId: string;
  eventRoute: string;
  totalTicket: number;
}

export interface ICommonState {
  selectedItemFav: any;
  modalConfirmSwitchFav: boolean;
  modalConfirmSwitch: boolean;
  modalConfirmSwitchCCCD: boolean;
  dateCCCD: any;
  fullName: string;
  cccd: string;
  location: string;
  rememberName: string;
  cityValue: string;
  districtValue: string;
  birth: string;
  introducing: string;
  numberFax: string;
  sex: string;
  wardValue: string;
  detailAddress: string;
  fullCCCD: string;
  fullAddress: string;
  fullFav: any;
  cities: any;
  districts: any;
  wards: any;
  activeIndices: any;
}
export interface IListBoxItem {
  name: string;
  gameAvatar: string;
  available: IGetVoucher[] | number; // Update the type according to your needs
  boxNumber: number;
}
export interface ListRaffleType {
  id: string;
  saId: string;
  eventId: string;
  eventName: string;
  image: string;
  gameId: string[];
  eventRoute: string;
  totalTicket: number;
}

export interface IVoucherNotUsed {
  id: string;
  saId: string;
  type: number;
  amount: number;
  assetId: string;
  assetName: string;
  giftCode: string;
  gameId: string[];
  imageAssetUrl: string;
  timeExpired: number;
  desc: string;
  redirectUrl: string;
  isUsed: number;
}
