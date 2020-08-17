import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ProButtonComponent,
  ExternalUrlRedirectorComponent,
  DropdownAutocompleteCountriesComponent,
} from './components';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import {
  ArrangeCenterDirective,
  ArrangeInlineDirective,
  ArrangeInlineWrapDirective,
  ArrangeStackDirective,
} from './directives';

@NgModule({
  declarations: [
    ArrangeCenterDirective,
    ArrangeInlineDirective,
    ArrangeInlineWrapDirective,
    ArrangeStackDirective,
    //
    ProButtonComponent,
    ExternalUrlRedirectorComponent,
    DropdownAutocompleteCountriesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    //
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
  ],
  exports: [
    ArrangeCenterDirective,
    ArrangeInlineDirective,
    ArrangeInlineWrapDirective,
    ArrangeStackDirective,
    //
    ProButtonComponent,
    ExternalUrlRedirectorComponent,
  ],
})
export class WidgetModule {}
