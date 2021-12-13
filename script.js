//declaring new variables

let balance;
let bet;
let current;
let speed;
let rocket;
let rocketIcon;
let anim;
let click = false;
let pmouse = false;


//loading up the rocket image
function preload(){rocketIcon = loadImage("images/rocket-ship-png-7.png");}

function setup() {
createCanvas(windowWidth, windowHeight-2);
background(51);
//setting the balance
updateBalance(1000);
//setting the multiplier to 1 – current is the current multiplier (white on the side of the screen) 
current = 1;
//Speed is the speed the multiplier increases at
speed = 2; 
//this creates the rocket object  
rocket = new Rocket();
imageMode(CENTER);
//sets rocket to animation 0 and off the screen
anim = 0;
//creates input box needs
let input = createInput();
//sets position of input box  
input.position(width*0.2-input.width/2,height*0.1+150);
input.id("input");
}

function draw() {
background(0,0,35,20);
fill(255);
var galaxy = { 
locationX : random(width),
locationY : random(height),
size : random(5,10)}
ellipse(mouseX ,mouseY, galaxy.size, galaxy.size);
ellipse(galaxy.locationX ,galaxy.locationY, galaxy.size, galaxy.size);

  //switch statement has different cases. Switch anim is a bunch of if statements. If anim=1 rocket.animation 1, etc..
switch(anim){
case 1:
rocket.anim1();
break;
case 2:
rocket.render();0
break;
case 3:
rocket.anim2();
break;}

//Calls function to set up text and buttons 
drawtext();
//sets the value to whether the mouse is clicked in previous frame  
pmouse = mouseIsPressed;}

function drawtext(){
textAlign(CENTER);
textSize(60);
fill(255);
text("Balance:",width*0.2,height*0.1 + 60);
text("$" + balance,width*0.2,height*0.1 + 120);
textSize(15);
text("Insert Bet Below:",width*0.2,height*0.1 + 145);
fill(255,0,0);
textSize(50);
text("START",width*0.15+width*0.1/2,height*0.19 + 205);
//hitbox for the click
if(clicked(width*0.15-53,height*0.1 + 200,width*0.27,height*0.15)){on_start();}
textSize(30);
fill(255);
textAlign(LEFT);
  
//When the code starts there would NaN as a value because it has no bet included. This function checks that it is a number.
if(current*bet){
text("Earnings:",width*0.1,height*0.19 + 300)
textAlign(CENTER);
fill(0,255,0);
text("$" +round((current*bet),2),width*0.2,height*0.19 + 330)} else {
text("Earnings:",width*0.1,height*0.19 + 300);
textAlign(CENTER);
fill(255);
text("$0",width*0.2,height*0.19 + 330)}
textAlign(CENTER);
fill(255);
fill(0);
textSize(30);
fill(0,255,0);
text("CASH OUT",width*0.15+width*0.1/2,height*0.19 + 400);
//hitbox for the click
if(clicked(width*0.15-53,height*0.1 + 400,width*0.27,height*0.15)){
on_cash();}}


function clicked(x1,y1,w1,h1){
  //if mouse x is inbetween right and left side of the box
	if(mouseX > x1 && mouseX < x1 + w1){
      //if the mouse is above the top and the bottom of the box
	if(mouseY > y1 && mouseY < y1 + h1){
      //if the mouse is not pressed and it was pressed
	if(!mouseIsPressed && pmouse){
		return true;}}}
	    else return false;}

//function updates balance rounding to two decimals
function updateBalance(a){
balance = round(a,2);}

//this makes the variable stored only in the function
function Rocket(){
//sets the rocket x cordinate to x/2
this.x = width/2;
//sets size of rocket
this.s = width/4;
//position of spaceship when in view
this.targety = height * 0.65;
//position of spaceship when it is outside of the canvas
this.y = height + width;
//this is velocity of rocket moving on y axis
this.yvel = 0;

//to creates the multiplier	
this.randomize = function(){
if(random(33) <= 1){this.crash = 1;} 
  else {this.crash = round(1/random(),2);}}
  
//Displays white multiplier next to rocket
this.displayCash = function(){
textSize(64);
text(round(current,2)+"x",width/2 + this.s * 0.9, this.y);}
  
//render is on the screen when the game is running
this.render = function(){
image(rocketIcon,this.x,this.y,this.s,this.s);
speed += 0.01;
current += speed*0.0005;
fill(255);
this.displayCash();
if(current >= this.crash)
anim = 3;}
 
this.anim1 = function(){
this.y = lerp(this.y,this.targety,0.04);
image(rocketIcon,this.x,this.y,this.s,this.s);
if(abs(this.y - this.targety) <= 3)
anim = 2;    
this.randomize();}
  
  
this.anim2 = function(){
image(rocketIcon,this.x,this.y,this.s,this.s);
speed = lerp(speed,2,0.05);
this.y+=this.yvel;
this.yvel+=0.3
fill(255,100,100);
this.displayCash();
fill(255);
//when the animation is over, this resets to the begining speeds and states of the game.  
if(this.y > height + this.s * 0.5 && speed <= 2.05){anim = 0;this.yvel = 0;current = 1;speed = 2;
}}
}


function on_start(){
value = input.value;
if(anim == 0 && value > 0 && value <= balance){
anim = 1;
bet = value;
updateBalance(balance - value);
speed = 2;}
}

function on_cash(){
if(anim == 2){
updateBalance(balance + bet * current);
bet = 0;
}}
