
var c=document.querySelector('canvas[id="1"]');

c.width=300;
c.height=600;

var cdraw= c.getContext('2d');

//===============================Balls==================================

var q="clock";
var speed=0;
var c1=1,c2=1;
var l;
var m=1;
var move=0;

var circle1={
    x: (c.width/2)-70,
    y: c.height-120,
    radius:8
}

var circle2={
    x: (c.width/2)+70,
    y: c.height-120,
    radius:8,
}

var i=0;
var rect= new Array();
var dSpeed=1;
var k=0;
var Color1=["#1573CC","#335B80","#1990FF","#66B5FF","#66B5FF"];
var j=0;

//==================BLOCKS=========================================

var block=function(){
    this.x=Math.random()*120;
    this.y=0;
    this.color=Color1[Math.floor(Math.random()*4.9)];
    this.width=40+Math.random()*40;
    this.height=5+Math.random()*20;

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
    cdraw.fillStyle = 'rgba(255, 255, 255, 0.3)'
    cdraw.fillRect(0,0,c.width,c.height);

    cdraw.strokeStyle="#A012B3";
    cdraw.arc(c.width/2,c.height-120,70,0,Math.PI*2,false);
    cdraw.stroke();

    cdraw.beginPath();
    cdraw.arc(circle1.x,circle1.y,circle1.radius,0,Math.PI*2,false);
    cdraw.fillStyle="#66B5FF";
    cdraw.fill();

    cdraw.beginPath();
    cdraw.arc(circle2.x,circle2.y,circle2.radius,0,Math.PI*2,false);
    cdraw.fillStyle="#E82751";
    cdraw.fill();

//=======================animating balls
if(move){
//circle 1===========================

if(q=="clock"){
    circle1.x=(c.width/2)+70*Math.cos(Math.PI+speed);
    circle1.y=c.height-120+70*Math.sin(Math.PI+speed);
}
if(q=="anticlock"){
    circle1.x=(c.width/2)+70*Math.cos(Math.PI+speed);
    circle1.y=c.height-120+70*Math.sin(speed);
}
    
//circle 2============================
  
if(q=="clock"){
    circle2.x=(c.width/2)+70*Math.cos(speed);
    circle2.y=c.height-120+70*Math.sin(speed);
}
if(q=="anticlock"){
    circle2.x=(c.width/2)+70*Math.cos(speed);
    circle2.y=c.height-120+70*Math.sin(Math.PI+speed);
}
    speed+=0.05;

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
  }
  dSpeed+=0.001;

}




//blocks trail=============================================================



////============



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


document.querySelector('button[id="start"]').addEventListener("click",function(){
         
    requestAnimationFrame(ball);
});

