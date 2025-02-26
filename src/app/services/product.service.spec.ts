import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/api/v1/products';

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
      expect(products).toEqual(mockProducts as any);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('debe agregar un producto', () => {
    const newProduct: Product = { id: 2, name: 'Mouse', category: 'Accesorios', price: 20, stock: 15 };

    service.createProduct(newProduct).subscribe((product) => {
      expect(product).toEqual(newProduct as any);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newProduct);
  });

  it('debe modificar un producto', () => {
    const updatedProduct: Product = { id: 1, name: 'Teclado Gamer', category: 'Accesorios', price: 60, stock: 25 };

    service.updateProduct(1, updatedProduct).subscribe((product) => {
      expect(product).toEqual(updatedProduct as any);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedProduct);
  });

  it('debe eliminar un producto', () => {
    service.deleteProduct(1).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
