import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { Binding } from '../binding'
import { BindingService } from '../binding.service'

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css']
})
export class BindingComponent implements OnInit {
  displayedColumns = ['ip', 'pod', 'ns', 'ctrl'];
  dataSource: MatTableDataSource<Binding>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  bindings: Binding[];
  constructor(
    private bindingService: BindingService
  ) { }

  ngOnInit() {
    this.getBinding();
  }

  getBinding(): void {
    this.bindingService.getBinding()
      .subscribe(result => {
        this.bindings = result;
        this.dataSource = new MatTableDataSource<Binding>(this.bindings);
        this.dataSource.paginator = this.paginator;
      });
  }

}
