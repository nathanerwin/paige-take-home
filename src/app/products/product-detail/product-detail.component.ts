import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../products.service";
import {ProductInterface} from "../product.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public product: ProductInterface | undefined;
  public form: FormGroup = new FormGroup<any>({
    name: new FormControl('', [Validators.required, Validators.maxLength(56)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(56)]),
    type: new FormControl('', [Validators.required, Validators.maxLength(56)]),
    color: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    sku: new FormControl('')
  })

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=> {
      this.product = this.productsService.get(params['sku'])

      if (this.product) {
        this.form.patchValue(this.product)
      } else {
        this.router.navigate(['product-list'])
      }

    })

    this.form.valueChanges.subscribe(res => console.log(res))
  }

  public update() {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      this.productsService.update(this.form.getRawValue())
      this.router.navigate(['/'])
    }
  }
}
