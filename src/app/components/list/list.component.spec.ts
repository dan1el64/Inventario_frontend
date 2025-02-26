import { TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { ProductService } from '../../services/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { ApiResponse } from '../../models/product.model';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: any;
  let productService: jasmine.SpyObj<ProductService>;

  const mockProducts = [
    { id: 1, name: 'Teclado', category: 'Accesorios', price: 50.0, stock: 30 }
  ];

  const mockResponse: ApiResponse<typeof mockProducts> = {
    success: true,
    message: 'Productos obtenidos',
    data: mockProducts
  };

  beforeEach(async () => {
    // Crear espía del servicio con el método getProducts correctamente definido
    const productServiceSpy = jasmine.createSpyObj<ProductService>('ProductService', ['getProducts']);

    await TestBed.configureTestingModule({
      imports: [ListComponent, HttpClientTestingModule, MatDialogModule, MatTableModule],
      providers: [{ provide: ProductService, useValue: productServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;

    // Simular respuesta del servicio correctamente
    productService.getProducts.and.returnValue(of(mockResponse));

    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe listar productos desde el servicio', () => {
    expect(component.products.length).toBe(1);
    expect(component.products[0].name).toBe('Teclado');
  });
});
