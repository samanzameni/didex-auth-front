import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExternalUrlRedirectorComponent } from '@widget/components';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
