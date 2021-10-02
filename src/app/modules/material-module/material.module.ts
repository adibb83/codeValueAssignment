import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

const MATERIAL_IMPORTS = [
  CommonModule,
  FormsModule,
  MatButtonModule,
  MatListModule,
  MatPaginatorModule,
  MatIconModule,
  MatInputModule,
];

@NgModule({
  declarations: [],
  imports: MATERIAL_IMPORTS,
  exports: MATERIAL_IMPORTS,
})
export class MaterialModule {}
