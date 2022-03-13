export const constructGetRequestHeaders=(body:any)=>{
    let params = ''
    for (const key in body) {

        if (Object.prototype.hasOwnProperty.call(body, key)) {
            if(body[key]!==null&&body[key]?.trim()!==''){
                if(typeof body[key]=='string'&&body[key]?.includes(",")){
                    body[key].split(',').map((value:any)=>{
                        params += `${key}=${value.trim()}&`
                    })
                }else{
                    params += `${key}=${body[key].trim()}&`
                }
            }
        }
    }
    return params
}