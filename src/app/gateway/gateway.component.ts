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
import { Gateway } from '../gateway';
import { GatewayService } from '../gateway.service';
import { SnackbarComponent } from "../snackbar/snackbar.component";

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.css']
})
export class GatewayComponent implements OnInit {

  displayedColumns = ['select', 'subnet', 'gw'];
  dataSource: MatTableDataSource<Gateway>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<Gateway>(true, []);
  gateways: Gateway[];
  constructor(
    private gatewayService: GatewayService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getGateways();
  }

  getGateways(): void {
    this.gatewayService.getGateway()
      .subscribe(result => {
        this.gateways = result;
        this.dataSource = new MatTableDataSource<Gateway>(this.gateways);
        this.dataSource.paginator = this.paginator;
      });
  }

  addGateway(): void {
    const dialogRef = this.dialog.open(AddGatewayDialog, {
      width: '250px',
      data: {
        // No data passed to the front end, just a type.
        gateway: Gateway
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (result['gw'] && result['subnet']) {
        this.gatewayService.addGateway(result)
          .subscribe(
            () => {
              this.snackBar.openFromComponent(SnackbarComponent, {
                data: 'Success'
              });
              // refresh
              this.getGateways();
            },
            err => {
              this.snackBar.openFromComponent(SnackbarComponent, {
                data: 'Failed'
              });
              console.error('Add gateway failed', err);
            })
      }
    });
  }

  deleteGateway(): void {
    if (this.selection && !this.selection.isEmpty()) {
      this.gatewayService.deleteGateway(this.selection.selected)
        .subscribe(
          () => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: 'Success'
            });
            this.selection.clear()
            this.getGateways();
          },
          err => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: 'Failed'
            });
            console.error('Add gateway failed', err);
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
  selector: 'add-gateway-dialog',
  template: `
<h1 mat-dialog-title>Add subnet and gateway</h1>
<div mat-dialog-content>
  <p>Subnet</p>
  <mat-form-field>
    <input matInput [(ngModel)]="data.subnet" placeholder="eg: 10.0.1.0/24">
  </mat-form-field>
</div>
<div mat-dialog-content>
  <p>Gateway</p>
  <mat-form-field>
    <input matInput [(ngModel)]="data.gw" placeholder="eg: 10.0.1.1">
  </mat-form-field>
</div>
<div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">Cancel</button>
  <button mat-button [mat-dialog-close]="data" cdkFocusInitial>OK</button>
</div>
`
})
export class AddGatewayDialog {
  constructor(
    public dialogRef: MatDialogRef<AddGatewayDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Gateway) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

