var dog, happyDog, database;
var foodS, foodStock;
var dogImg,dogImg1;
var db;
var btnFeed,btnAddFood;
var fedTime =0 ;
var lastFed;
var foodObj;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  var cnv = createCanvas(700, 600);

  foodObj = new Food();

  db = firebase.database();

  var foodRef = db.ref('Food');
  foodRef.on("value",readStock,showError);

  var fedTimeRef = db.ref('FeedTime');
  fedTimeRef.on("value",function(time){
      lastFed = time.val();
  }); 

  dog = createSprite(300,400);
  dog.addImage(dogImg);
  dog.scale = 0.5;

  btnFeed = createButton("Feed Dog");
  btnFeed.position(cnv.width+100,150);
  btnFeed.mousePressed(feedDog);

  btnAddFood = createButton("Add Food");
  btnAddFood.position(cnv.width+200,150);
  btnAddFood.mousePressed(addFoods);
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  text(mouseX +","+mouseY,mouseX,mouseY);

  fill(255);
  push();
  textSize(20);
  stroke(255);
  text("Virtual Pet - 2",width/2-50,50);
  pop();

  // if(foodS != undefined)
  //   text("Milk Stock :  "+ foodS, 270,100);

  text(mouseX +","+mouseY,mouseX,mouseY);
  foodObj.display();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  db.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  console.log(foodS);
  foodS++;
  db.ref('/').update({
    Food:foodS
  })
  console.log(foodS);
}

function showError(err){
  console.log(err);
}