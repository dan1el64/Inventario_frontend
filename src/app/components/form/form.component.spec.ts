import { TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { ProductService } from '../../services/product.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
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
  it('preserves form data after a failed save and prevents duplicate submissions', () => {
    const pending = new Subject<any>();
    productService.createProduct.and.returnValue(pending);
    component.productForm.setValue({ id: null, name: 'Sensor', category: 'Demo', price: 12.5, stock: 2 });
    component.submitForm();
    component.submitForm();
    expect(productService.createProduct).toHaveBeenCalledTimes(1);
    pending.error(new Error('offline'));
    expect(component.saving).toBeFalse();
    expect(component.productForm.value.name).toBe('Sensor');
    expect(component.error).toContain('Tus datos siguen aquí');
  });

  it('rejects fractional stock before making a request', () => {
    component.productForm.setValue({ id: null, name: 'Sensor', category: 'Demo', price: 12.5, stock: 1.5 });
    component.submitForm();
    expect(component.productForm.valid).toBeFalse();
    expect(productService.createProduct).not.toHaveBeenCalled();
  });
});
