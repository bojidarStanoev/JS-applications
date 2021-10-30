function attachEvents() {
    btnGet= document.getElementById('submit')
    const locName = document.getElementById('location')
    btnGet.addEventListener('click',getForecast)
    currentF = document.getElementById('current')
    divF = document.getElementById('forecast')
    upcomingF = document.getElementById('upcoming')
    async function getForecast(){
    try{     
       let res = await getInfo(locName.value)
       console.log()
        let symbol = symbolFinder(res[0].forecast.condition)
        currentF.innerHTML = ""
        
        currentF.appendChild(e('div','label','Current conditions'))
        divF.style.display = 'block'
        let currentFdiv = e('div','forecasts',
        )
        currentFdiv.innerHTML = `<span class="condition symbol">${symbol}</span>`
        
        const degre = '°'
       
        currentFdiv.appendChild(e('span','condition',
            e('span','forecast-data' ,res[0].name),
            e('span','forecast-data' ,`${res[0].forecast.low}${degre}/${res[0].forecast.high}${degre}`),
                
            e('span','forecast-data' ,res[0].forecast.condition)


        ))
        upcomingF.innerHTML=''
        upcomingF.appendChild(e('div','label','Three-day forecast'))
        currentF.appendChild(currentFdiv)
        let forcastInfo = e('div','forecast-info',)
        res[1].forecast.forEach(el=>{
            let s = symbolFinder(el.condition)
                let span = e('span','upcoming',
                    e('span','symbol',s),
                    e('span','forecast-data',`${el.low}${degre}/${el.high}${degre}`),
                    e('span','forecast-data' ,el.condition)
                )
                forcastInfo.appendChild(span)

        })
        upcomingF.appendChild(forcastInfo)
    }catch(error){
        divF.style.display = 'block'
        const err= document.createTextNode('Error')
        divF.appendChild(err)
        
        }
        
    }
}
 function symbolFinder(str){
    
    
        switch (str) {
            case'Sunny':
                return '☀';
            case'Partly sunny':
                return '⛅';
            case'Overcast':
                return '☁';
            case'Rain':
                return '☂';
        }
   
 }
async function getInfo(name){
    let code = await getCode(name)
    
    
const [cur,upcoming] = await Promise.all(

    [
        currentForecast(code),
        upcomingForecast(code)
    ]
)
    if(cur==undefined || upcoming==undefined){
        throw new Error('err')
    }
 return  [cur,upcoming]
   
    
}

async function getCode(name){
    const url = 'http://localhost:3030/jsonstore/forecaster/locations'
    
    const res = await fetch(url)
    if(res.status!=200){
        throw new Error('no locations found')
    }
    const data = await res.json()

    let location = data.find(el=> el.name==name)
    if(location==undefined){throw new Error('no such city')}
    return location.code
    
    
}
async function currentForecast(code){
    
    const url = `http://localhost:3030/jsonstore/forecaster/today/`+code
    
    const res = await fetch(url)
    if(res.status!=200){
        throw new Error('err')
    }
    const data = await res.json()
    return data
}
   

async function upcomingForecast(code){
    const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`

    const res = await fetch(url)
    if(res.status!=200){
        throw new Error('no locations found')
    }
    const data = await res.json()
    
    return data
   
}

function e(type,attr, ...content){
    let  el = document.createElement(type)
      
      for(let item of content){
          if(typeof item == 'string' || typeof item =='number'){
              item=document.createTextNode(item)
          }
          el.appendChild(item)
      }
      el.classList.add(attr)

      return el;
  }

attachEvents();