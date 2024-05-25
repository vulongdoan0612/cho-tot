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
export interface IFilterHeader {
  searchResult: any;
  cities: any;
  activeKey: any;
  districts: any;
  searchResultDistrict: any;
  cityName: string;
  districtName: string;
  idCity: string;
  priceMin: string;
  priceMax: string;
  idDistrict: string;
  selectCity: string;
  valueRadioSit: string;
  valueRadioBrand: string;
  valueRadio: string;
  valueRadioDistrict: string;
  openSearchCity: boolean;
  openSearchDistrict: boolean;
  openFind: boolean;
  openPrice: boolean;
  openSit: boolean;
  openBrand: boolean;
  inputValueMin: number;
  inputValueMax: number;
  valuePriceMax: any;
  valuePriceMin: any;
  valueRadioAll: string;
  valueRadioAllBrand: string;
  valueRadioAllColor: string;
  valueRadioAllCountry: string;
  valueRadioAllModel: string;
  valueRadioAllFormCar: string;
  valueRadioModal: string;
  valueRadioFormCar: string;
  valueRadioCountry: string;
  valueRadioStatus: string;
  valueRadioUser: string;
  valueRadioFuel: string;
  valueRadioColor: string;
  valueRadioModel: string;
  valueRadioNumberBox: string;
  valueRadioBrandModal: string;
  date: string;
  dateMax: string;
  kmMin: string;
  kmMax: string;
}
export interface ICommonStateFillFormRenderCar {
  fillStatus: boolean;
  fillBrand: boolean;
  fillForm: boolean;
  fillDate: boolean;
  fillNumberB: boolean;
  fillFuel: boolean;
  fillCountry: boolean;
  fillModel: boolean;
  fillSit: boolean;
  fillColor: boolean;
  fillCarN: boolean;
  fillOwner: boolean;
  fillAcces: boolean;
  fillRegis: boolean;
  fillPrice: boolean;
  fillKm: boolean;
  fillTitle: boolean;
  fillIntro: boolean;
  fillYouR: boolean;
  fillAddress: boolean;
  stateFill: boolean;
}
export interface ICommonStateFormRenderCar {
  value: string;
  color: string;
  carNumber: string;
  dateCar: number | string;
  owner: string;
  country: string;
  sit: string;
  activeButton: string;
  accessories: string;
  registry: string;
  numberBox: string;
  status: string;
  form: string;
  price: number;
  km: number;
  models: any;
  model: string;
}
export interface ICommonStateFormRenderCarPost {
  spin: boolean;
  title: string;
  introducing: string;
  person: string;
  detailAddress: string;
  modalConfirmSwitch: boolean;
  wards: any;
  districts: any;
  cities: any;
  fullAddress: string;
  cityValue: string;
  wardValue: string;
  districtValue: string;
  cityValueName: string;
  districtValueName: string;
  slug: string;
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
