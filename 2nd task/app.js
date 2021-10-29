function solve() {
    const lb = document.querySelector('#info span')
    const btndepart = document.getElementById('depart')
    const btnarrive = document.getElementById('arrive')
    let stop = {
        next :'depot'
    };
    async function depart() {
        btndepart.disabled=true
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`
        const res = await fetch(url)
         stop = await res.json()
       lb.textContent = `Next stop ${stop.name}`
       
       btnarrive.disabled=false
       
    }

    function arrive() {
        lb.textContent = `Arriving at ${stop.name}`
        
        btndepart.disabled=false
        btnarrive.disabled=true
    }

    return {
        depart,
        arrive
    };
}

let result = solve();