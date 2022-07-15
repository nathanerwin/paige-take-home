import {Component, OnInit} from '@angular/core';
import {PagedProductInterface, ProductInterface} from "../product.interface";
import {FormControl} from "@angular/forms";
import {ProductsService} from "../products.service";
import {mergeMap, Observable, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public products: ProductInterface[] = []
  public colors = this.productService.colors()
  public page = 0
  public filteredProducts: ProductInterface[] = []
  public filteredColors = new Set()
  public totalCount = this.products.length
  public totalPages = Math.ceil(this.totalCount / 10)
  public searchInput = new FormControl('')

  constructor(
    private productService: ProductsService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.productService.getPaged().subscribe(res => this.setData(res))

    this.searchInput.valueChanges
      .pipe(
        tap(x => this.products = []),
        mergeMap((query) => this.filter()))
      .subscribe((res) => this.setData(res))
  }

  public setData(res: PagedProductInterface): void {
    this.products = res.data
    this.totalCount = res.totalCount
    this.totalPages = Math.ceil(this.totalCount / 10)
  }

  public filterColor(color: string): void {
    this.filteredColors.has(color) ? this.filteredColors.delete(color) : this.filteredColors.add(color)
    this.filter().subscribe((res) => this.setData(res))
  }

  public navigatePage(down = false): void {
    this.page = down ? Math.max(0, this.page - 1) : Math.ceil(Math.min(this.page + 1, this.totalCount / 10))
    this.filter().subscribe((res) => this.setData(res))
  }

  public delete(sku: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(res => {
      if (res) this.productService.delete(sku)
    })
  }

  private filter(): Observable<PagedProductInterface> {
    return this.productService.getPaged(this.page, this.searchInput.value, Array.from(this.filteredColors) as string[])
  }

}
