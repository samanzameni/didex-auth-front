import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './modules/auth.module';
import { WidgetModule } from '@widget/widget.module';
import { DdxWrongPageComponent } from './pages/ddx-wrong-page/ddx-wrong-page.component';

@NgModule({
  declarations: [DdxWrongPageComponent],
  imports: [CommonModule, AuthModule, WidgetModule],
  providers: [],
  bootstrap: [],
})
export class FeatureModule {}
