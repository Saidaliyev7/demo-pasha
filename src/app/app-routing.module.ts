import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: "dashboard",
    loadChildren: () => import('./layout/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path:'posts/:id',
    loadChildren:()=>import('./pages/posts/posts.module').then(m=>m.PostModule)
  },
  {path: '**', redirectTo: 'dashboard'}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
