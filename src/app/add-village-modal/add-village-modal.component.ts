import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IRegion, IVillage} from '../interfaces';
import {MapService} from '../map.service';

@Component({
  selector: 'app-add-village-modal',
  templateUrl: './add-village-modal.component.html',
  styleUrls: ['./add-village-modal.component.css']
})
export class AddVillageModalComponent implements OnInit{
  regions: IRegion[];

  constructor(
    public dialogRef: MatDialogRef<AddVillageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IVillage,
    private mapService: MapService
    ) { }

    ngOnInit(): void {
      this.mapService.getRegions().subscribe(
        (data) => { this.regions = data.filter( el => el.id !== 1); },
        (error) => { console.warn(error); }
      );
    }

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }

}
