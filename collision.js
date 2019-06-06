
var c=document.querySelector('canvas[id="1"]');

c.width=500;
c.height=800;

var cdraw= c.getContext('2d');

var q="clock";
var speed=0;
var c1=1,c2=1;
var l;
var m=1;
var move=0,i=0,g=0,j=0,k=0,b=0;
var position=150;
var rect= new Array();
var dSpeed=1;
var score=0;

var Colorb=["#1573CC","#335B80","#1990FF","#66B5FF","#66B5FF"];
var highScore=localStorage.getItem("highScore");

var ColorS=["#DDF0FF","#E1F4EB","#EEF7E3","#FFF2E0","#FFEBEA"];

//background theme==============================
var Color0=["#002D2E","#006466","#009496","#00CED1","#00FBFF"];
var Color1=["#C3B8B3","#B1AEAF","#C3B8BC","#C4B1AC","#E2C8B8"];
var Color2=["#8E9BD4","#757EAD","#8893C8","#5C6389","#32354A"];
var Color3=["#DBC6BA","#BBE8BA","#F2F1F0","#F2C1F0","#BCC3E8"];
var Color4=["#E4DFD6","#B8DAE2","#8E6E72","#B59382","#E6DBC3"];
var Color5=["#FF8893","#FC737F","#F35F6A","#E2515A","#DD3E49"];
var Color6=["#5C5A61","#8C807D","#B29488","#D69787","#FF9688"];
var Color7=["#030C0D","#0A2426","#103C40","#8DA4A6","#CEEFF2"];


var theme=[Color0,Color1,Color2,Color3,Color4,Color5,Color6,Color7];



//===============================Balls==================================
var circle1={
    x: (c.width/2)-100,
    y: c.height,
    radius:12,
}

var circle2={
    x: (c.width/2)+100,
    y: c.height,
    radius:12,
}


//==================BLOCKS=========================================

var block=function(){
    this.x=20+Math.random()*400;
    this.y=0;
    this.color=Colorb[Math.floor(Math.random()*4.9)];
    this.width=60+Math.random()*40;
    this.height=20+Math.random()*60;

    this.draw=function(){
        cdraw.beginPath();
        cdraw.fillStyle=this.color;
        cdraw.fillRect(this.x,this.y,this.width,this.height);
    }

    this.animate=function(){
        this.draw();
        this.y+=dSpeed;
    }
}


//===========================Animation=======================

function ball(){
    l= requestAnimationFrame(ball);

    cdraw.clearRect(0,0,c.width,c.height);
    var cl=cdraw.createLinearGradient(0,c.height,c.width,c.height);
cl.addColorStop(0.2,ColorS[0])
cl.addColorStop(0.4,ColorS[1])
cl.addColorStop(0.6,ColorS[2])
cl.addColorStop(0.8,ColorS[3])
cl.addColorStop(1,ColorS[4])
    cdraw.fillStyle=cl;
    cdraw.fillRect(0,0,c.width,c.height);
   
     //====================================================
    cdraw.strokeStyle="#A012B3";
    cdraw.arc(c.width/2,c.height-position,100,0,Math.PI*2,false);
    cdraw.stroke();

    cdraw.beginPath();
    cdraw.arc(circle1.x,circle1.y-position,circle1.radius,0,Math.PI*2,false);
    cdraw.fillStyle="#66B5FF";
    cdraw.fill();

    cdraw.beginPath();
    cdraw.arc(circle2.x,circle2.y-position,circle2.radius,0,Math.PI*2,false);
    cdraw.fillStyle="#E82751";
    cdraw.fill();

//=======================animating balls
if(move){
//circle 1===========================

if(q=="clock"){
    circle1.x=(c.width/2)+100*Math.cos(Math.PI+speed);
    circle1.y=c.height+100*Math.sin(Math.PI+speed);
}
if(q=="anticlock"){
    circle1.x=(c.width/2)+100*Math.cos(Math.PI+speed);
    circle1.y=c.height+100*Math.sin(speed);
}
    
//circle 2============================
  
if(q=="clock"){
    circle2.x=(c.width/2)+100*Math.cos(speed);
    circle2.y=c.height+100*Math.sin(speed);
}
if(q=="anticlock"){
    circle2.x=(c.width/2)+100*Math.cos(speed);
    circle2.y=c.height+100*Math.sin(Math.PI+speed);
}
    speed+=0.07;

}

//================blocks animation======    

    rect[i]=new block();

  j=0;


  while(j<i){
      rect[j].animate();
      ++j;
  }


  if(i==0||(rect[j-1].y)>=300){
     ++i;
     if(i<4)++b;
     
  }
  dSpeed+=0.001;
  position+=0.05;
  if(i>=200){
      cancel();
  }

 //======================collision detection============
  
  
 if(i>=1){
    for(z=i-1;z>=i-b;z--){
     for(r=0;r<=rect[z].width;r++){
        for(h=0;h<+rect[z].height;++h){

         if(disBtw(circle1.x,circle1.y-position,rect[z].x+r,rect[z].y+h)<=circle1.radius-2)cancel();
         if(disBtw(circle2.x,circle2.y-position,rect[z].x+r,rect[z].y+h)<=circle2.radius-2)cancel();
           
            }
         }
       }
        score++;
    } 
Scoreboard();
if(score%700==0){
    var tm=theme[Math.floor(Math.random()*theme.length)];
    for(p=0;p<5;++p){
        ColorS[p]=tm[Math.floor(Math.random()*tm.length)];
        console.log("color changed");
    }
}
    
}

function disBtw(x1,y1,x2,y2){
    return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
}



//blocks trail=============================================================



////============


//=====calling for animation/controlling ==========


document.addEventListener("keydown",function(e){
    if(e.keyCode==39||e.keyCode==68){
        q="clock";
        if(c1){
            speed=Math.PI*2-speed;
            c1=0;
            c2=1;
            }
        move=1; 
    }

    if(e.keyCode==37||e.keyCode==65){
        q="anticlock";
        if(c2){
            speed=Math.PI*2-speed;
            c2=0;
            c1=1;
            }
            move=1;
    
    }
});

document.addEventListener("keyup",function(){
    move=0;
});

//=====canceling animation============================

function cancel(){
    console.log("hai im working")
    cancelAnimationFrame(l);
}



//
/////
///////
/////////////////////
//////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


var control=document.querySelector('canvas[id="control"]');

control.width=400;
control.height=800;

var ctrl=control.getContext('2d');
var Color3=["#F25252","#F25252","#6FF26B","#0597F2","#F25252"];


var bkcl=ctrl.createLinearGradient(0,0,control.width/2,control.height/4);
bkcl.addColorStop(0.2,Color3[0])
bkcl.addColorStop(0.4,Color3[1])
bkcl.addColorStop(0.6,Color3[2])
bkcl.addColorStop(0.8,Color3[3])
bkcl.addColorStop(1,Color3[4])
ctrl.fillStyle=bkcl;
ctrl.fillRect(0,0,control.width,control.height);

ctrl.font="bold 60px fantasy";
ctrl.fillStyle="black";
ctrl.fillText("DUET",control.width/2-80,100)
ctrl.fill();


ctrl.fillStyle="#004483"
ctrl.font="bold 40px Comic Sans MS";
ctrl.fillText("start",control.width/2-80,control.height/2-50,120);
ctrl.fillText("Controls-",control.width/2-80,control.height/2+100);

ctrl.font="italic 20px Comic Sans MS";
ctrl.fillText("anticlockwise",20,680);
ctrl.fillText("clockwise",control.width/2+20,680);
ctrl.fillStyle="lightpink";
ctrl.fillRect(20,720,40,40);
ctrl.fillRect(70,720,40,40);
ctrl.fillRect(control.width/2+20,720,40,40);
ctrl.fillRect(control.width/2+70,720,40,40);
ctrl.fill();
ctrl.fillStyle="black"
ctrl.fillText("A",30,750);
ctrl.fillText("<-",80,750);
ctrl.fillText("->",control.width/2+30,750);
ctrl.fillText("D",control.width/2+80,750);
ctrl.stroke();  



//====================starting game===================

control.addEventListener("click",function(e){
      if(e.offsetX>=control.width/2-80&&e.offsetX<=control.width/2+50){
          if(e.offsetY<=control.height/2-50&&e.offsetY>=control.height/2-90){
              cancelAnimationFrame(l);
            //initializing 
            q="clock";
            speed=0;
            c1=1,c2=1;
            m=1;
            move=0,i=0,g=0,j=0,k=0,b=0;
            position=150;
            rect= new Array();
            dSpeed=1;
            score=0;

              requestAnimationFrame(ball);

              
      }
    }
})





//===================Score-board==============


var s=document.querySelector('canvas[id="score"]');

s.width=400;
s.height=800;

var sb=s.getContext('2d');



var sbbk=sb.createLinearGradient(s.width,0,0,s.height);
sbbk.addColorStop(0.2,Color3[0]);
sbbk.addColorStop(0.4,Color3[1]);
sbbk.addColorStop(0.6,Color3[2]);
sbbk.addColorStop(0.8,Color3[3]);
sbbk.addColorStop(1,Color3[4]);
sb.fillStyle=sbbk;
sb.fillRect(0,0,control.width,control.height);


function Scoreboard(){
sb.fillStyle=sbbk;
sb.fillRect(0,0,control.width,control.height);

highScore=localStorage.getItem("highScore");
if(highScore==null){
    localStorage.setItem("highScore",score);
}else{
    if(score>=highScore){
    localStorage.setItem("highScore",score);
    }
}

highScore=localStorage.getItem("highScore");

sb.fillStyle="#004483"
sb.font="bold 40px Comic Sans MS";
sb.fillText("Score",100,300,130);
sb.fillText(score,100,400);
sb.fillText("HighScore",100,500);
sb.fillText(highScore,100,600);
console.log("m working")
}