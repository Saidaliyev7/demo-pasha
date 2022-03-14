import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take, takeLast } from 'rxjs';

@Injectable({providedIn: 'root'})
export class QueryService {
    
    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) {}
    
    changeQuery(params:any) {
        this.router.navigate([], { relativeTo: this.route, queryParams: { ...params }});
    }
    getQueryParams(){
        return this.route.queryParams
    }

    getIdFromParams(){
      return window.location.href.split("/")[window.location.href.split("/").length-1];
    }

    getIdFromParamsPosts(){
        if(this.getIdFromParams()=='post'){
            return window.location.href.split("/")[window.location.href.split("/").length-2];
        }else{
           return  this.getIdFromParams();
        }
    }
    
}