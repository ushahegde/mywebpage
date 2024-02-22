 class Question {
 constructor(text, choices, answer){
    this.text = text;
    this.choices = choices;
    this.answer = choices[answer-1]; 
}
 isCorrectAnswer = function(choice) {
	 
    return this.answer === choice;
}
}
var questions = [new Question("In command line arguments, argv is a/an….......<br>",["pointer to an array of character pointers","array of strings","array of character pointers","none of these"],3),
new Question("In command line arguments, <i>argc</i> is a/an….......<br> ",["String","Array of char pointers","Integer","none of these"],3),
new Question("What do c and v mean in argc and argv of command line arguments?<br><br> ",["c is configuration v is visibility","c is control and v is vertex","c is count and v is vector",""],3),
new Question("What is the correct syntax for command line arguments?<br> ",["<div class='codetext'>int main(int argc, char *argv[])</div>","<div class='codetext'>int main(char *argc,int argv)</div>","<div class='codetext'>int main(int argc,char **argv)</div>","Both 1 and 3"],4),
new Question("What is argv[0] in command line arguments?<br> ",["The first argument","Executable command","Total number of arguments","None of the above"],2),
new Question("What does the following program display if it is called as <br>./a.out hello?<br><div class='codetext'>#include&lt;stdio.h&gt;<br>int main(int argc,char *argv[])<br>{<br>&ensp;     printf('The string sent is %s',argv[1]);<br> &ensp;    return 0;<br>}<br>    <br></div>",["The string sent is hello","The string sent is ./a.out hello","The string sent is ./a.out","None of the above"],1),
new Question("What does the following program do?<br><div class='codetext'>#include&lt;stdio.h&gt;<br>int main(int a,char *v[])<br>{<br>&nbsp;   if(a<2)<br>&nbsp;&nbsp;     printf('Hello, unknown user!\n');<br> &nbsp;  else<br> &nbsp;&nbsp;     printf('Hello %s\n',v[1]);<br>  &nbsp; return 0;<br>}<br></div>",["Displays Hello with the user name given as command line argument","Displays Hello unknown user if command line argument is not given","Produces syntax error","Both 1 and 2"],4),
new Question("What does the following program display?<br><br><div class='codetext'>#include&lt;stdio.h&gt;<br>int main(int a,char *v[], char *e[])<br>{<br> &nbsp;  int i;  <br>&nbsp;   for(i=0;e[i]!=NULL;i++)<br> &nbsp;&nbsp;   printf('%s\n',e[i]);<br> &nbsp;  return 0;<br>}<br></div>",["Command line arguments","File names in current directory","Produces syntax error","Environment variables"],4),
new Question("What does the following program do?<br><div class='codetext'>#include&lt;stdio.h&gt;<br>int main(int a,char *v[])<br>{<br> &nbsp;  int i;  <br>&nbsp;  int n = atoi(v[1]); &nbsp; printf('%d',n*n); <br> &nbsp;  return 0;<br>}<br></div>",["prints the square of all numbers from 1 to 10","prints square of any random number","prints square of the number given as command line argument","None of the above"],3),
new Question("What is the output of the following program ?<br><div class='codetext'>#include&lt;stdio.h&gt;<br>int&nbsp;main(int&nbsp;n,char&nbsp;*m[])<br>{<br>&nbsp;FILE&nbsp;*fptr;<br>&nbsp;fptr&nbsp;=&nbsp;fopen(m[1],'r');<br>&nbsp;while(!feof(fptr))<br>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int ch=fgetc(fptr);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (ch!=EOF)<br>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;putchar(ch);<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;fclose(fptr);<br>&nbsp;&nbsp;return&nbsp;0;&nbsp;&nbsp;<br>}",["No output","Syntax error","Content of file whose name is given in command line","content of file m[1]"],3)

];
 