import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../models/product.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatCardModule, MatFormFieldModule,
    MatInputModule,
    MatButtonModule]
})
export class FormComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product | null
  ) {
    this.productForm = this.fb.group({
      id: [data?.id ?? null],
      name: [data?.name ?? '', Validators.required],
      category: [data?.category ?? '', Validators.required],
      price: [data?.price ?? 0, [Validators.required, Validators.min(0.01)]],
      stock: [data?.stock ?? 0, [Validators.required, Validators.min(0)]]
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  submitForm(): void {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      if (product.id) {
        this.productService.updateProduct(product.id, product).subscribe(() => {
          alert('Producto actualizado');
          this.dialogRef.close();
        });
      } else {
        this.productService.createProduct(product).subscribe(() => {
          alert('Producto agregado');
          this.dialogRef.close();
        });
      }
    }
  }
}
