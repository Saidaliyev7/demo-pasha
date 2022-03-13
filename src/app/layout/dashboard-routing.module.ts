import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'user', loadChildren: () => import('./pages/user-add/user-add.module').then(m => m.UserAddModule)},
      { path: 'user/:id', loadChildren: () => import('./pages/user-add/user-add.module').then(m => m.UserAddModule)},
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
