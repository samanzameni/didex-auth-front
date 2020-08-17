import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './modules/auth.module';
import { WidgetModule } from '@widget/widget.module';
import { DdxSignupCredentialsComponent } from './pages/ddx-signup-page/ddx-signup-credentials/ddx-signup-credentials/ddx-signup-credentials.component';

@NgModule({
  declarations: [DdxSignupCredentialsComponent],
  imports: [CommonModule, AuthModule, WidgetModule],
  providers: [],
  bootstrap: [],
})
export class FeatureModule {}
