import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(private dialog: MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit(): void {
  }

  public delete(): void {
    this.dialog.close(true)
  }
}