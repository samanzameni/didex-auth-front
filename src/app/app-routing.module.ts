import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExternalUrlRedirectorComponent } from '@widget/components';
import { DdxWrongPageComponent } from '@feature/pages/ddx-wrong-page/ddx-wrong-page.component';

const routes: Routes = [
  {
    path: 'external-redirect',
    component: ExternalUrlRedirectorComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import('@feature/modules/auth.module').then(
        (module) => module.AuthModule
      ),
  },
  { path: '**', pathMatch   : 'full', component: DdxWrongPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
