import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PostAddComponent } from './page/post-add.component';
import { PostChangeService } from './service/post-change.service';
import { PostAddRoutingModule } from './post-add-routing.module';


@NgModule({
    imports: [
        CommonModule,
        PostAddRoutingModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [PostAddComponent],
    providers: [PostChangeService],
})
export class PostAddModule { }
