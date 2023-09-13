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
 
 var questions = [new Question("What should replace the blank line in the code below for it to work properly?<br><br><div class='codetext'>FILE *fptr;<br>fptr = fopen('a.c','r');<br>if(---------------)<br>&nbsp;&nbsp;&nbsp;&nbsp;printf('File does not exist');<br></div>",["fptr==ERR","fptr==NULL","!exists(fptr)",""],2),
new Question("Complete the line to open the file a.txt for reading.<br><br><div class='codetext'>FILE *fptr;<br>fptr = --------<br></div>",["fopen('a.txt','rd')","fopen('a.txt','r')","fread('a.txt');","None of the above"],2),
new Question("What is the meant by ‘a’ in the following operation?<br><br><br><div class='codetext'>fp = fopen(“Random.txt”, “a”);<br></div>",["add","attach","append","aprehend"],3),
new Question("Fill in the blank, so that the file 'notes.txt' is opened for both reading and writing?<br><br><div class='codetext'>FILE *fp;fp = fopen(------------);<br></div>",["'notes.txt','a'","'notes.txt','rw'","'notes.txt','r+'","A file can not be opened for both reading and writing simultaneosly"],3),
new Question("If the file 'source.txt' contains a line 'Be my friend' which of the following will be the output of below program?<br><br><div class='codetext'>#include&lt;stdio.h&gt;<br>int main()<br>{<br>&nbsp;FILE *fs;char&nbsp;c[10];<br>&nbsp;fs = fopen('source.txt', 'r');<br>&nbsp;<br>&nbsp;fseek(fs, 0, SEEK_END);<br>&nbsp;fseek(fs, -4L, SEEK_CUR);<br>&nbsp;fgets(c, 5, fs); &nbsp;&nbsp; puts(c);<br>&nbsp; return 0;<br>}<br></div>",["Run time error","Be my friend","end",""],3),
new Question("What will be the output of the program if the file abc contains  'Hello beautiful world ' ?<br><br><br><div class='codetext'>#include&lt;stdio.h&gt;<br>#include&lt;stdlib.h&gt;<br>int main()<br>{<br> &nbsp;&nbsp; FILE *fp;<br>&nbsp;&nbsp;  unsigned char ch;<br> &nbsp;&nbsp; fp=fopen('abc.c', 'r');<br>&nbsp;&nbsp;  if(fp == NULL)<br>  &nbsp;&nbsp;  {&nbsp;     printf('Unable to open file');<br> &nbsp;&nbsp;&nbsp;        exit(1);<br> &nbsp;&nbsp; }<br> &nbsp;&nbsp; while((ch=getc(fp)) != EOF)<br>&nbsp;&nbsp;&nbsp; &nbsp;       printf('%c', ch);<br>&nbsp;&nbsp;  fclose(fp);<br>&nbsp;   return 0;<br>}<br></div>",["Hello beautiful world","Hello<br>beautiful<br>world","Infinite loop",""],3),
new Question("What does the program do?<br><br><br><div class='codetext'>int main()<br>{<br>&nbsp;&nbsp;  FILE *fp;&nbsp;&nbsp;  signed char ch;<br>&nbsp;&nbsp; &nbsp;int i=1;<br>&nbsp;&nbsp;  fp = fopen('myfile.c', 'r');<br>&nbsp;&nbsp;  while((ch=getc(fp))!=EOF)<br>&nbsp;&nbsp;&nbsp;      { if(ch == '\n')<br> &nbsp;&nbsp;&nbsp;&nbsp;            i++; }<br>&nbsp;&nbsp;  fclose(fp);<br>&nbsp;&nbsp;&nbsp;&nbsp;return 0;<br>}<br></div>",["Prints the contents of the file","Counts all the characters in the file and prints it. ","Counts the number of words in the file but does not print it","None of the above"],3),
new Question("fprintf function is used to ------<br><br> ",["Display a value on screen","Store a value in a file","There is no fprintf() function in C","None of the above"],2),
new Question("What does the following code do?<br><br><div class='codetext'>fprintf(stdout,'hello world');<br></div>",["writes Hello world to the file with name stdout","Displays hello world on screen","produces syntax error","None of the above"],2),
new Question("fread() is used for -------<br><br> ",["Read a string from a text file","Read a string from console","Read a value from binary file","Any of the above"],3),
new Question("fputs() is used for-------<br><br> ",["Display a value on console","Write a string to a file with new line","Write a string to console with new line","None of the above"],2),
new Question("What does fseek() function do?<br><br> ",["Searches for a value in a file","Moves the file pointer to a given location","Searches for a character in a string","None of the above"],2),
new Question("What does the following statement do?<br><br><div class='codetext'>fseek(fptr,0,SEEK_SET)<br></div>",["Sets the file pointer to 0","Moves the file pointer to begining of file","Searches for a string in the file","None of the above"],2),
new Question("What does the following function do?<br><br><div class='codetext'>rewind(fptr)<br></div>",["Moves the file pointer to begining of file","There is no rewind in C","rewind rewinds the DVD","None of the above"],1),
new Question("What does the following statement do?<div class='codetext'>fopen('abc','wb');</div>",["opens a file called abc for writing","opens a binary file called abc for writing","produces syntax error",""],2),
new Question("How do you read an integer n from a binary file?",['fscanf(fptr,"%d",&n)',"fgetc(fptr,n)","fread((char*)&n,sizeof(n),1,fptr)","None of the above"],3),

];
