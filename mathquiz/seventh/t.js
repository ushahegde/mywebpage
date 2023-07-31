
function createText()
{
      let p = document.createElement("h2");
      let textEl = document.createTextNode("Hello Usha")
      p.appendChild(textEl)
      document.body.appendChild(p)
      createButton("ha")
}     
      
function createButton(buttonName)
{
           let btn = document.createElement("button")
           btn.innerHTML = "Click me"
           btn.onclick = function(){
           	     alert("ha ha")
           	  }
           document.body.appendChild(btn)
 }	  
      