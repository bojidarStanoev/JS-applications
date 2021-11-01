async function solution() {
    //TODO .....
   const main= document.getElementById('main')
   let url = 'http://localhost:3030/jsonstore/advanced/articles/list'
    let res = await fetch(url)
    let str = await res.json()
    for(let article of Object.keys(str)){
        
        let btn = e('button',{id:str[article]._id},"More")
        btn.classList.add('button')
        
        let head= e('div',{},
        e('span',{},str[article].title),
        btn
        )
        
        let text= await getText(str[article]._id)
        let extra = e('div',{},
        e('p',{},text)
        )
        btn.addEventListener('click',showHide.bind(null,btn,extra))
        head.classList.add('head')
       extra.classList.add('extra')
       extra.style.display='none'
      
        let accordion = e('div',{},
        head,
        extra
        )
        accordion.classList.add('accordion')
        console.log(accordion)
     
        main.appendChild(accordion)
        }
}
function showHide(btn,extra){
    console.log('in')
if(extra.style.display=='none')
{
    extra.style.display='block'
    btn.textContent = 'Less'
}
else{
    extra.style.display='none'
    btn.textContent='More'
}

}
async function getText(id){
    let url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`
    let res = await fetch(url)
    let str = await res.json()
    

return str.content

}
function e(type,attr, ...content){
    let  el = document.createElement(type)
      for(let prop in attr){

          el[prop] =attr[prop]
      }
      for(let item of content){
          if(typeof item == 'string' || typeof item =='number'){
              item=document.createTextNode(item)
          }
          el.appendChild(item)
      }
      return el;
  }
solution()