import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DialogBoxComponent } from './dialog-box.component';

describe('Teste do componente DialogBoxComponent', () => {
  let component: DialogBoxComponent;
  let fixture: ComponentFixture<DialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule, // desabilitar animações
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
      ],
      declarations: [ DialogBoxComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: () => { } }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {  id: '1', name: 'fake', price: 1, quantity: 1, action: 'Adicionar' }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deverá ser criado componente DialogBoxComponent', () => {
    expect(component).toBeTruthy();
  });

  it('deverá verificar o método doAction', () => {
    const action = 'Adicionar';
    const local_data = { id: '1', name: 'fake', price: 1, quantity: 1, action: 'Adicionar' };
    component.action=action
    component.local_data=local_data
    spyOn(component.dialogRef, 'close')
    component.doAction();
    expect(component.dialogRef.close).toHaveBeenCalledWith({ event: action, data: local_data });
  });

  it('deverá verificar o método closeDialog', () => {
    spyOn(component.dialogRef, 'close')
    component.closeDialog();
    expect(component.dialogRef.close).toHaveBeenCalledWith({ event: 'Cancel' });
  });

});
