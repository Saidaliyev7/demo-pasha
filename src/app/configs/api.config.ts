import { environment } from "src/environments/environment"

const baseApi=environment.baseApi;

export const API={
    Users:{
        get:baseApi+'users',
        add:baseApi+'users'
    },
    Posts:{
        get:baseApi+
    }
}