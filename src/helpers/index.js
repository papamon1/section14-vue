export const rejectError = ({response=null}) =>{

    let message = 'Ooops something went wrong'
debugger
    if(response && response.data && response.data.errors ){
        message=response.data.errors.message        
    }
    return Promise.reject(message)
}