


export type SuccessResponse<T> = {
    status:'success',
    data:{
        msg:string,
        payload:T 
    }

}

export type ErrorResponse<T> = {
    status:'error'
    data:{
        error:T
    }
}