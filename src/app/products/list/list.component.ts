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

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [NgFor, NgIf, MatTableModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, CurrencyPipe], 
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['name', 'category', 'price', 'stock', 'actions'];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(response => {
      if (response.success) {
        this.products = response.data;
      } else {
        console.error(response.message);
      }
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
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }
}
