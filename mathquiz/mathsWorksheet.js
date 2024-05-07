
function genQuestions(){
      var typeSel = document.getElementById("type").value
        var typeVal="??"
        switch(typeSel) {
          case  "Addition":typeVal = " + ";break
           case "Subtraction":typeVal = " - ";break      	
          case  "Multiplication":typeVal = " X ";break
          case  "Division":typeVal = " &#47 ";break;
        }
        var str = "<ul>";
        var inputrange = document.getElementById("range")
        var range = inputrange.value
        for(i=1;i<=10;i++){ 
            var n2 = Math.floor(Math.random()*range)+1;
                var n1 = Math.floor(Math.random()*range)+1;
        
        if(n1<n2){
           t1 = n1;n1 = n2;n2 = t1         
        }
        if(typeSel=="Division")
        {    
             var rt =Math.floor( Math.sqrt(range))+1;
             var  t1 = Math.floor(Math.random()*rt)+2;
             var t2 = Math.floor(Math.random()*rt)+Math.floor(rt/3);
             n1 = t1*t2;
             n2 = t1;
                 
        }
        ans = getAnswer(n1,n2,typeVal)
        
        str = str+"<li>  "+n1 +typeVal+"   "+n2+"   =   <span class='hiddenanswer' style='display:none;'>"+ans+"</span></li>" ;
        }
        str=str+"</ul>"
        return str;
}

   function showQuestion() {
        var str = genQuestions()
            var qnBox = document.getElementById('qn1');
        qnBox.innerHTML =str;
       
       str = genQuestions()
            var qnBox = document.getElementById('qn2');
         qnBox.innerHTML = str;
         
              var str = genQuestions()
            var qnBox = document.getElementById('qn3');
        qnBox.innerHTML =str;

            
   }
   function getAnswer(n1,n2,str){
         var operator =str.trim()
			switch(operator) {
			case "+": return n1+n2
			case "-": return n1-n2
			case "X": return n1*n2
			}
			 
			if(operator=="&#47")
			 return n1/n2
				
			
   }
   function  findAnswer(){
         var qnBox = document.getElementById("qn1");
         var str = qnBox.innerHTML;
         var arr = str.split("+");
         arr[0] = arr[0].replace("<br>","");
         arr[1] = arr[1].replace("<br>","");
         var n1 = Number.parseInt(arr[0]);
         var n2 =Number.parseInt(arr[1]);
         
         return n1+n2;
   }
   
    function showAnswers(){
         var arr = document.getElementsByClassName('hiddenanswer')
         for(i=0;i<arr.length;i++){
         	var element = arr[i]
         	element.style.display="inline"
         }
			    
    }
