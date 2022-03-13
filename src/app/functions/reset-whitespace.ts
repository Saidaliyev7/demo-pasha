const resetWhiteSpaceFromObject=(object:any)=>{
    for(let  key in object){
        object[key]?.trim()===''?delete object[key]:object[key]= object[key]?.trim();
      }
}


export default resetWhiteSpaceFromObject;