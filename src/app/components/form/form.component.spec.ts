import { TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { ProductService } from '../../services/product.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: any;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    // Crear espía del servicio
    const productServiceSpy = jasmine.createSpyObj<ProductService>('ProductService', ['createProduct']);

    await TestBed.configureTestingModule({
      imports: [FormComponent, ReactiveFormsModule, HttpClientTestingModule, MatDialogModule, BrowserAnimationsModule ],
      providers: [
        FormBuilder,
        { provide: ProductService, useValue: productServiceSpy },
        { provide: MatDialogRef, useValue: jasmine.createSpyObj('MatDialogRef', ['close']) }, // Mock de MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: {} } // Mock de MAT_DIALOG_DATA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;

    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe validar que los campos sean obligatorios', () => {
    component.productForm.setValue({
      id: null,
      name: '',
      category: '',
      price: null,
      stock: null
    });

    expect(component.productForm.valid).toBeFalse();
    expect(component.productForm.controls['name'].hasError('required')).toBeTrue();
    expect(component.productForm.controls['category'].hasError('required')).toBeTrue();
    expect(component.productForm.controls['price'].hasError('required')).toBeTrue();
    expect(component.productForm.controls['stock'].hasError('required')).toBeTrue();
  });
});
