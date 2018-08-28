import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {
  MatPaginator,
  MatTableDataSource,
  MatDialog,
  MatDialogRef,
  MatSnackBar,
  MAT_DIALOG_DATA
} from '@angular/material';

import { SelectionModel } from '@angular/cdk/collections';
import { Allocate } from '../allocate';
import { AllocateService } from '../allocate.service';
import { SnackbarComponent } from "../snackbar/snackbar.component";

@Component({
  selector: 'app-allocate',
  templateUrl: './allocate.component.html',
  styleUrls: ['./allocate.component.css']
})
export class AllocateComponent implements OnInit {

  displayedColumns = ['select', 'ns', 'ips'];
  dataSource: MatTableDataSource<Allocate>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<Allocate>(true, []);
  allocates: Allocate[];

  constructor(
    private allocateService: AllocateService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllocates();
  }

  getAllocates(): void {
    this.allocateService.getAllocate()
      .subscribe(result => {
        this.allocates = result;
        this.dataSource = new MatTableDataSource<Allocate>(this.allocates);
        this.dataSource.paginator = this.paginator;
      });
  }

  addAllocate(): void {
    const dialogRef = this.dialog.open(AddAllocateDialog, {
      width: '250px',
      data: {
        // No data passed to the front end, just a type.
        allocate: Allocate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (result['ns'] && result['ips']) {
        this.allocateService.addAllocate(result)
          .subscribe(
            () => {
              this.snackBar.openFromComponent(SnackbarComponent, {
                data: 'Success'
              });
              // refresh
              this.getAllocates();
            },
            err => {
              this.snackBar.openFromComponent(SnackbarComponent, {
                data: 'Failed'
              });
              console.error('Add Allocate failed', err);
            })
      }
    });
  }

  deleteAllocate(): void {
    if (this.selection && !this.selection.isEmpty()) {
      this.allocateService.deleteAllocate(this.selection.selected)
        .subscribe(
          () => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: 'Success'
            });
            this.selection.clear()
            this.getAllocates();
          },
          err => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: 'Failed'
            });
            console.error('Delete Allocate failed', err);
          }
        )
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}

@Component({
  selector: 'add-allocate-dialog',
  template: `
<h1 mat-dialog-title>Allocate</h1>

<div mat-dialog-content>
  <p>Namespace</p>
  <mat-form-field>
    <input matInput [(ngModel)]="data.ns" placeholder="eg: default">
  </mat-form-field>
</div>

<div mat-dialog-content>
  <p>IPs</p>
  <mat-form-field>
    <input matInput [(ngModel)]="data.ips" placeholder="eg: 10.0.1.1,10.0.4.[9-12]">
  </mat-form-field>
</div>

<div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">Cancel</button>
  <button mat-button [mat-dialog-close]="data" cdkFocusInitial>OK</button>
</div>
`
})
export class AddAllocateDialog {
  constructor(
    public dialogRef: MatDialogRef<AddAllocateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Allocate) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
