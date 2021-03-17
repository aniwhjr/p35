//Create variables here
var database;
var dog;
var foods, foodStock;

var dogImg, happyDogImg;

function preload() {
  //load images here
  dogImg = loadImage("./images/dogImg.png");
  happyDogImg = loadImage("./images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", function (data) {
    foods = data.val();
  });

  dog = createSprite(250, 300, 50, 50);
  dog.scale = 0.2;
  dog.addImage(dogImg);
}

function draw() {
  background("#2e8b57");

  textSize(20);
  fill("white");
  text("Use the up arrow to feed the drago milk!", 75, 50);
  text(`Food remaining: ${foods}`, 145, 150);

  keyup();

  drawSprites();
  //add styles here
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref("/").update({
    Food: x,
  });
}

function keyup() {
  if (keyWentDown(UP_ARROW)) {
    writeStock(foods);
    if (foods > 0) {
      dog.addImage(happyDogImg);
    }
  }
  if (keyWentUp(UP_ARROW)) {
    dog.addImage(dogImg);
  }
}
