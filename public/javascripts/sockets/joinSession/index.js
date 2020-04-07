

const error        = document.getElementById('error')



function appendError(message){
    error.innerHTML = '';
    const errorElement = document.createElement('div')

    errorElement.innerText = `Session doesnt Exist`
    error.append(errorElement)
    
}