import {Component, OnInit, Output} from '@angular/core';
import {MapService} from '../map.service';
import {ICity, ICoordinates, IDistrict, IRegion, IStreet, IVillage} from '../interfaces';
import {AddStreetModalComponent} from '../add-street-modal/add-street-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {AddVillageModalComponent} from '../add-village-modal/add-village-modal.component';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {
  // data coming from databases
  regions: IRegion[] = [];
  cities: ICity[] = [];
  villages: IVillage[] = [];
  districts: IDistrict[] = [];
  streets: IStreet[] = [];
  // two-way binding, selected options
  regionId: number[] = [];
  cityId: number[] = [];
  villageId: number[] = [];
  districtId: number[] = [];
  streetId: number[] = [];
  // arrays of selected cities/villages/streets
  filteredCities: ICity[] = [];
  filteredVillages: IVillage[] = [];
  filteredStreets: IStreet[] = [];
  // coordinates
  defaultView: ICoordinates = {
    lat: 40.181389,
    lng: 44.514444
  };
  markers: ICoordinates[];
  // spinner
  spinner = true;
  zoom = 8;

  constructor(private mapService: MapService,
              public dialog: MatDialog
              ) { }

  ngOnInit(): void {
    this.mapService.getRegions().subscribe(
      (data) => {
        this.regions = Object.values(data);
        },
      (error) => { console.warn(error.message); }
    );
    this.mapService.getCities().subscribe(
      (data) => {
        this.cities = this.filteredCities = Object.values(data);
      },
      (error) => { console.warn(error.message); }
    );
    this.mapService.getVillages().subscribe(
      (data) => {
        this.villages = this.filteredVillages = Object.values(data);
      },
      (error) => { console.warn(error.message); }
    );
    this.mapService.getDistricts().subscribe(
      (data) => {
        this.districts = Object.values(data);
      },
      (error) => { console.warn(error.message); }
    );
    this.mapService.getStreets().subscribe(
      (data) => {
        this.streets = this.filteredStreets = Object.values(data);
        this.spinner = false;
      },
      (error) => { console.warn(error.message); }
    );
  }

  onRegionChange(): void {
    this.markers = [];
    // show coordinates of selected regions
    this.markers = this.regions.filter(el => this.regionId.includes(el.id)).map(el => el.coordinates);
    // show cities of selected regions
    this.filteredCities = this.cities;
    this.filteredCities = this.cities.filter(el => this.regionId.includes(el.regionId)); // regionId == [2, 3, 4]
    // show villages of selected regions
    this.filteredVillages = this.villages;
    this.filteredVillages = this.villages.filter(el => this.regionId.includes(el.regionId));
    // reset every other selected option
    this.cityId = [];
    this.villageId = [];
    this.districtId = [];
    this.streetId = [];
    // change google map center
    this.defaultView = this.markers[this.markers.length - 1];
    this.zoom = 8;
  }

  onCityChange(): void {
    this.markers = [];
    // show selected cities on the map
    this.markers = this.filteredCities.filter(el => this.cityId.includes(el.id)).map(el => el.coordinates);
    // filter selected streets
    this.filteredStreets = this.streets.filter(el => this.cityId.includes(el.cityId));
    // reset selected villages and streets
    this.villageId = [];
    this.streetId = this.districtId = [];
    this.zoom = 9;
    this.defaultView = this.markers[this.markers.length - 1];
  }

  onVillageChange(): void {
    this.markers = [];
    // show coordinates of selected villages
    this.markers = this.filteredVillages.filter(el => this.villageId.includes(el.id)).map(el => el.coordinates);
    this.streetId = this.districtId = [];
    // this.filteredVillages = this.villages.filter(el => this.vi)
    this.defaultView = this.markers[this.markers.length - 1];
    this.zoom = 12;
  }

  onDistrictChange(): void {
    // show districts on the map
    this.markers = this.districts.filter(el => this.districtId.includes(el.id)).map(el => el.coordinates);
    this.filteredStreets = this.streets;
    // and show new options based on selected districts
    this.filteredStreets = this.streets.filter(el => this.districtId.includes(el.districtId) );
    // empty selected streets
    this.streetId = [];
    this.defaultView = this.markers[this.markers.length - 1];
    this.zoom = 12;
  }

  onStreetChange(): void {
    // empty markers just in case if selected options has been cleared
    this.markers = [];
    // show markers of selected streets on the map
    this.markers = this.filteredStreets.filter(el => this.streetId.includes(el.id)).map(el => el.coordinates);
    this.defaultView = this.markers[this.markers.length - 1];
    this.zoom = 12;
  }

  addStreet(): void {
    const dialogRef = this.dialog.open(AddStreetModalComponent,
      {
        width: '300px',
        data: {
          districtId: null,
          id: this.streets.length + 1,
          name: '',
          coordinates: {
            lat: null,
            lng: null
          }
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !result.name || !result.coordinates || !result.id || !result.districtId) { return; }
      this.mapService.addStreet( result ).subscribe(
        () => {
          this.streets.push(result);
          if (this.districtId.includes(result.districtId)) {
            this.filteredStreets.push(result);
        }},
        (error) => { console.warn(error.message); }
      );
    });
  }

  addVillage(): void {
    const dialogRef = this.dialog.open(AddVillageModalComponent,
      {
        width: '250px',
        data:  {
          regionId: null,
          id: this.villages.length + 1,
          name: '',
          coordinates: {
            lat: null,
            lng: null
          }
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !result.name || !result.coordinates || !result.id || !result.regionId) { return; }
      this.mapService.addVillage( result ).subscribe(
        () => { this.villages.push(result); if (this.regionId.includes(result.regionId)) { this.filteredVillages.push(result); }},
        (error) => { console.warn(error.message); }
      );
    });
  }
}
