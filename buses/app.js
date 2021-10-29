 async function getInfo() {
    inf = document.getElementById('stopId').value
    btn = document.getElementById('submit')
    stopName = document.getElementById('stopName')
    buses = document.getElementById('buses')
    console.log("TODO...");

    const url = `http://localhost:3030/jsonstore/bus/businfo/${inf}`
    try{
        buses.innerHTML = ''
    const res = await fetch(url)
    
    if(res.status!=200){
        throw new Error('Id not found')
    }
    const data = await res.json()
    stopName.textContent = data.name
    
    Object.entries(data.buses).forEach(e =>{
        const liEl = document.createElement('li')
        liEl.textContent = `Bus ${e[0]} arrives  in ${e[1]}minutes`
        buses.appendChild(liEl)
    })
    }catch(error){
        stopName.textContent= 'Error'
    }
}