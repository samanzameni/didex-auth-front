import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './modules/auth.module';
import { WidgetModule } from '@widget/widget.module';
import { DdxWrongPageComponent } from './pages/ddx-wrong-page/ddx-wrong-page.component';
import { LocalePipeModule } from '@widget/modules/locale-pipe.module';

@NgModule({
  declarations: [DdxWrongPageComponent],
  imports: [CommonModule, AuthModule, WidgetModule, LocalePipeModule],
  providers: [],
  bootstrap: [],
})
export class FeatureModule {}
