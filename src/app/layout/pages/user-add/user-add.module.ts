import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserAddComponent } from './page/user-add.component';
import { UserChangeService } from './service/user-change.service';
import { UserAddRoutingModule } from './user-add-routing.module';


@NgModule({
    imports: [
        CommonModule,
        UserAddRoutingModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [UserAddComponent],
    providers: [UserChangeService],
})
export class UserAddModule { }
