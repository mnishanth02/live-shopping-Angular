export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ShopLocation extends Coordinates {
  address: string;
  staticMapImageUrl: string;
}
