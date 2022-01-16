var tower, towerImg;
var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var ghost,ghostImg ;
var soul1_img,soul2_img,soul3_img,soul4_img;
var invisibleBlockGroup, soul1_Group, soul2_Group, soul3_Group, soul4_Group;
var gameState = "PLAY";
var score = 0;

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound ("spooky.wav");

  soul1_img = loadImage("soul1.png");
  soul2_img = loadImage("soul2.png");
  soul3_img = loadImage("soul3.png");
  soul4_img = loadImage("soul4.png");

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  soulGroup = new Group();
}

function setup() {
  createCanvas(displayWidth - 20, displayHeight - 30);
  
  spookySound.loop();
  
  tower = createSprite (displayWidth - 700 ,displayHeight - 600);
  tower.addImage ("tower",towerImg);
  tower.scale = 2.3;
  tower.velocityY = 1;


  ghost = createSprite (displayWidth - 700,displayHeight - 500, 100,100);
  ghost.addImage ("ghost", ghostImg);

  soul1_Group = createGroup();
  soul2_Group = createGroup();
  soul3_Group = createGroup();
  soul4_Group = createGroup();

   textSize(70);
  stroke("yellow");
  text("soul : "+ score,displayWidth /2,displayHeight - 500);
  
  ghost.scale = 0.4;
  score = 0
}

function draw() {
  background('black');

  if (gameState === "PLAY"){
    
  var select_soul = Math.round(random(1,4));
  if (World.frameCount % 100 == 0) {
  if (select_soul == 1) {
    soul1();
  } else if (select_soul == 2) {
    soul2();
  } else if (select_soul == 3) {
    soul3();
  } else if (select_soul == 4){
    soul4();
  }
  
  if(soul1_Group.isTouching(ghost)){
    soul1_Group.destroyEach();
    score = score +1;
  }

  if(soul2_Group.isTouching(ghost)){
    soul2_Group.destroyEach();
    score = score +5;
  }

  if(soul3_Group.isTouching(ghost)){
    soul3_Group.destroyEach();
    score = score +15;
  }

  if(soul4_Group.isTouching(ghost)){
    soul4_Group.destroyEach();
    score = score +20;
  }

  if (tower.y > 400 ) {
    tower.y = 300;
  }

  if (keyDown ("SPACE")) {
    ghost.velocityY = -5;
    camera.position.x = ghost.x ;
    camera.position.y = displayHeight/2;
  }
 
  if (keyDown("LEFT_ARROW")) {
    ghost.x = ghost.x -3;
  }
  
  if (keyDown("right_arrow")) {
    ghost.x = ghost.x + 3;
  }
  
  if (climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
  
  if (invisibleBlockGroup.isTouching(ghost) || (ghost.Y)) {
    
    ghost.destroy();
    gameState = "END";
  }
  
  ghost.velocityY = ghost.velocityY + 0.2;
  spawnDoors();
  drawSprites();
  }
  
  if (gameState === "END") {
    stroke ("yellow");
    fill ("yellow");
    textSize (70);
    text ("GAME OVER",displayWidth - 900 ,displayHeight - 500);
  }
}
function spawnDoors() {

  if ((frameCount%200) === 0) {   
      var door = createSprite (200,-50);
      var climber = createSprite (200,10);
      var invisibleBlock = createSprite(200,20);
    
      climber.addImage(climberImg);
      door.addImage(doorImg);
      
      door.x = Math.round (random(displayWidth - 100,displayHeight - 900));
      climber.x = door.x;
      climber.y = 22;
      
      door.velocityY =1;
      climber.velocityY =1;
      
      invisibleBlock.wieght = climber.wight;
      invisibleBlock.height = 1;
      
  //asignar ciclo de vida
      door.lifeTime = 800;   
      climber.lifeTime = 800;
      
  //agregar cada puerta al grupo 
      doorsGroup.add(door);
      climbersGroup.add(climber);
      
      invisibleBlock.x = door.x;
      invisibleBlock.velocityY =1;
      
      invisibleBlock.debug = true;
      invisibleBlockGroup.add(invisibleBlock);
      
      ghost.depth = door.depth;
      ghost.depth +=1;
    }
}
function soul1() {
    
  if (frameCount % 200 === 0) {
    var soul1 = createSprite (200,-50);
    soul1.addImage(soul1_img);
    soul1.x = Math.round (random(displayWidth - 100,displayHeight - 900));
    soul1.velocityY =1;

    soul1.scale = 0.1;
    
    ghost.depth = soul1.depth;
    ghost.depth +=1;
    soul1.lifeTime = 800;
    soul1_Group.add(soul1);
  }
}

function soul2() {
    
  if (frameCount % 200 === 0) {
    var soul2 = createSprite (200,-50);
    soul2.addImage(soul2_img);
    soul2.x = Math.round (random(displayWidth - 100,displayHeight - 900));
    soul2.velocityY =1;

    soul2.scale = 0.1;
    
    ghost.depth = soul2.depth;
    ghost.depth +=1;
    soul2.lifeTime = 800;
    soul2_Group.add(soul2);
  }
}

function soul3() {
    
  if (frameCount % 200 === 0) {
    var soul3 = createSprite (200,-50);
    soul3.addImage(soul3_img);
    soul3.x = Math.round (random(displayWidth - 100,displayHeight - 900));
    soul3.velocityY =1;

    soul3.scale = 0.1;
    
    ghost.depth = soul3.depth;
    ghost.depth +=1;
    soul3.lifeTime = 800;
    soul3_Group.add(soul3);
  }
}

function soul4() {
    
  if (frameCount % 200 === 0) {
    var soul4 = createSprite (200,-50);
    soul4.addImage(soul4_img);
    soul4.x = Math.round (random(displayWidth - 100,displayHeight - 900));
    soul4.velocityY =1;

    soul4.scale = 0.1;
    
    ghost.depth = soul4.depth;
    ghost.depth +=1;
    soul4.lifeTime = 800;
    soul4_Group.add(soul4);
  }
}
}
