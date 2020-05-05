import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './modules/auth.module';
import { WidgetModule } from '@widget/widget.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthModule, WidgetModule],
  providers: [],
  bootstrap: [],
})
export class FeatureModule {}
