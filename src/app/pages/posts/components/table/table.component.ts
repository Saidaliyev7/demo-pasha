import { Component, Input, OnInit } from '@angular/core';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import SwalConfigForDelete from 'src/app/configs/swal.config';
import getPaginationIndex from 'src/app/functions/get-pagination-index';
import Swal from 'sweetalert2';
import { PostsService } from '../../service/posts.service';

@Component({
    selector: 'post-table',
    templateUrl: 'table.component.html',
    styleUrls:['table.component.scss']
})

export class TableComponent implements OnInit {
    
    displayedColumns: string[] = ['position', 'Başlıq', 'Mətn','əməliyyatlar'];
    postData:any[]=[];
    subscription$=new Subject();
    paginationData:any
    constructor(private postsSerice:PostsService) { }

    ngOnInit() {

        this.postsSerice.posts$.pipe(takeUntil(this.subscription$)).subscribe(users=>{
            this.postsSerice.postsPaginationData$.pipe(takeUntil(this.subscription$)).subscribe(paginationDatas=>{
                if(paginationDatas.totalData){
                    this.paginationData=paginationDatas;
                    this.postData=users.map((user,index)=>{
                        user.position= getPaginationIndex(this.paginationData?.currentPage,this.paginationData?.limit,index);
                        return user;
                    });
                }
            });
        })
     }

     ngOnDestroy(): void {
        this.subscription$.unsubscribe();    
     }

     onDelete(post:any){
        Swal.fire(SwalConfigForDelete).then((result) => {
            if (result.value) {
                this.postsSerice.deletePost(Number(post.user_id),Number(post.id)).pipe(catchError(err=>{
                    Swal.fire(
                        'Xəta baş verdi',
                        '',
                        'error'
                      )
                    return throwError(err) 
                })).subscribe(res=>{
                    console.log(res)
                    Swal.fire(
                        'Uğurla silindi',
                        '',
                        'success'
                    )
                    this.postsSerice.getPosts();
                })
                
            }
          })
     }
}