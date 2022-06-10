import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path:'', component: AppComponent},
  { path:'about', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule ) },
];

@NgModule({
  // PreloadAllModules: carrega todos os módulos
  //
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy:  PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
