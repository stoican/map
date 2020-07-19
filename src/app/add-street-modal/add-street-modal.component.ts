import {Component, Inject, Input, OnInit} from '@angular/core';
import {IDistrict, IStreet} from '../interfaces';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MapService} from "../map.service";

@Component({
  selector: 'app-add-street-modal',
  templateUrl: './add-street-modal.component.html',
  styleUrls: ['./add-street-modal.component.css']
})
export class AddStreetModalComponent implements OnInit{
  districts: IDistrict[];

  constructor(
    public dialogRef: MatDialogRef<AddStreetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IStreet,
    private mapService: MapService
    ) {}

    ngOnInit(): void {
      this.mapService.getDistricts().subscribe(
        (data) => { this.districts = data; },
        (error) => {console.warn(error) }
      );
  }

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }

}
