import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { Product } from '../../models/product.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [NgFor, NgIf, MatTableModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, CurrencyPipe], 
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error = '';
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['name', 'category', 'price', 'stock', 'actions'];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';
    this.productService.getProducts().pipe(finalize(() => this.loading = false)).subscribe({
      next: response => {
        if (response.success) this.products = response.data;
        else this.error = 'No se pudieron cargar los productos. Intenta de nuevo.';
      },
      error: () => this.error = 'No se pudo conectar con el inventario. Intenta de nuevo.'
    });
  }

  openForm(product?: Product): void {
    const dialogRef = this.dialog.open(FormComponent, {
      data: product || null,
      width: '500px', // Ajusta según necesidad
      maxWidth: '90vw', // Evita que el modal sea demasiado grande en pantallas pequeñas
      disableClose: true // Evita que se cierre accidentalmente
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadProducts();
    });
  }

  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: () => this.error = 'No se pudo eliminar el producto. Intenta de nuevo.'
      });
    }
  }
}
