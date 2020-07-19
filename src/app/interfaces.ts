export interface IRegion {
  id?: number;
  province: string;
  coordinates: {
    lat: number,
    lng: number
  };
}

export interface ICity {
  id?: number;
  regionId?: number;
  name: string;
  coordinates: {
    lat: number,
    lng: number
  };
}

export interface IVillage {
  id?: number;
  regionId?: number;
  name: string;
  coordinates: {
    lat: number,
    lng: number
  };
}

export  interface IDistrict {
  id?: number;
  cityId: number;
  regionId: number;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface IStreet {
  id?: number;
  cityId?: number;
  districtId: number;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ICoordinates {
  lat: number;
  lng: number;
}

