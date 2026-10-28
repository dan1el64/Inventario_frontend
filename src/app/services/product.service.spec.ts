import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const apiUrl = '/api/v1/products';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe obtener productos', () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Teclado', category: 'Accesorios', price: 50.0, stock: 30 },
    ];

    service.getProducts().subscribe((products) => {
      expect(products.data).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush({ success: true, message: 'OK', data: mockProducts });
  });

  it('debe agregar un producto', () => {
    const newProduct: Product = { id: 2, name: 'Mouse', category: 'Accesorios', price: 20, stock: 15 };

    service.createProduct(newProduct).subscribe((product) => {
      expect(product.data).toEqual(newProduct);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush({ success: true, message: 'OK', data: newProduct });
  });

  it('debe modificar un producto', () => {
    const updatedProduct: Product = { id: 1, name: 'Teclado Gamer', category: 'Accesorios', price: 60, stock: 25 };

    service.updateProduct(1, updatedProduct).subscribe((product) => {
      expect(product.data).toEqual(updatedProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({ success: true, message: 'OK', data: updatedProduct });
  });

  it('debe eliminar un producto', () => {
    service.deleteProduct(1).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
