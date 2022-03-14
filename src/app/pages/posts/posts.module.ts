import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TokenInterceptorService } from 'src/app/interceptors/token-service.interceptor';
import { TableComponent } from './components/table/table.component';

import { PostsComponent } from './pages/posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsService } from './service/posts.service';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { PostsFilterComponent } from './components/filter/filter.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
    imports: [
        PostsRoutingModule,
        HttpClientModule,
        MatCardModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        NgxPaginationModule,
        MatToolbarModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [],
    declarations: [
        PostsComponent,
        TableComponent,
        PostsFilterComponent
    ],
    providers: [PostsService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        },],
})
export class PostModule { }
