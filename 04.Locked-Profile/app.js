async function lockedProfile() {
        container = document.getElementById('container')
    const url = 'http://localhost:3030/jsonstore/advanced/profiles'
    container.innerHTML=""
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    let count=1;
  for(var user of Object.keys(data)){
     // console.log(data[user].age)
     const img= e ('img',{},)
     img.src="./iconProfile2.png"
     img.classList.add('userIcon')
     let main = e('main',{id:"main"})
     let btn = e('button',{},"Show more")
     let locked =  e('input',{type:"radio",name:"user"+count+"Locked" ,value :"lock",checked:"true" },)
     let unlocked =  e('input',{type:"radio",name:"user"+count+"Locked" ,value :"unlock",})
     let hidden = e('div',{id:"user1HiddenFields"},
     e('hr',{},),
     e('label',{},'Email'),
     e('input',{type:"email",name:"user"+count+"Email",value :data[user].email,disabled:true,readonly:true },),
     e('label',{},'Age'),
     e('input',{type:"email",name:"user"+count+"Age" ,value :data[user].age,disabled:true,readonly:true },),
         )
        
     let prof = e('div',{},
     img,
     e('label',{},'Lock'),
   locked ,
     e('label',{},'Unlock'),
    unlocked,e('br',{},),
     e('hr',{},),
     e('label',{},'Username'),
     e('input',{type:"text",name:"user"+count+"Username" ,value :data[user].username,disabled:true,readonly:true },),
        hidden,
            btn)
        btn.addEventListener('click',show.bind(null,hidden,btn,locked,unlocked))
     prof.classList.add("profile")
     main.appendChild(prof)
    container.appendChild(main)
    count++;
  }
}
function show(el,btn,locked,unlocked){
    if(locked.checked!=true){
    if((el.style.display=='' || el.style.display=='none') && locked.checked!=true)
{el.style.display='block'
btn.textContent='Hide it'
}
else{
    el.style.display='none'  
    btn.textContent='Show more' 
}
    }
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

//lockedProfile()