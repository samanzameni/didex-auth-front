import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService, AuthService, LocaleService } from './services';
import { RESTModule } from './modules/ddx-rest.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, RESTModule],
  providers: [StorageService, AuthService, LocaleService],
  bootstrap: [],
})
export class CoreModule {}
