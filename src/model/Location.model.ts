export interface CoordinatesI {
  lat: number;
  lng: number;
}

export interface ShopLocationI extends CoordinatesI {
  address: string;
  staticMapImageUrl: string;
}
