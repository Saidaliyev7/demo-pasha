import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TokenInterceptorService } from 'src/app/interceptors/token-service.interceptor';
import { TableComponent } from './components/table/table.component';

import { PostsComponent } from './pages/posts.component';
import { PostsService } from './service/posts.service';

@NgModule({
    imports: [],
    exports: [],
    declarations: [
        PostsComponent,
        TableComponent
    ],
    providers: [PostsService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        },],
})
export class PostModule { }
