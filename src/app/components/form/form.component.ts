import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../models/product.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatCardModule, MatFormFieldModule,
    MatInputModule,
    MatButtonModule]
})
export class FormComponent {
  productForm: FormGroup;
  saving = false;
  error = '';

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
      stock: [data?.stock ?? 0, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]]
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  submitForm(): void {
    if (this.productForm.valid && !this.saving) {
      const product = this.productForm.value;
      this.saving = true;
      this.error = '';
      const request = product.id ? this.productService.updateProduct(product.id, product) : this.productService.createProduct(product);
      request.pipe(finalize(() => this.saving = false)).subscribe({
        next: () => this.dialogRef.close(true),
        error: () => this.error = 'No se pudo guardar. Tus datos siguen aquí; puedes intentarlo de nuevo.'
      });
    }
  }
}
