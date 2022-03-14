import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './pages/posts.component';



const routes: Routes = [
    {
        path: '', component: PostsComponent, children: [
          { path: 'post', loadChildren: () => import('./pages/post-add/post-add.module').then(m => m.PostAddModule)},
          { path: 'post/:id', loadChildren: () => import('./pages/post-add/post-add.module').then(m => m.PostAddModule)},
        ]
    },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
