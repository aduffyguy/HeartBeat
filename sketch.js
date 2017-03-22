//the starting playable character
var ship;
//single enemy
var enemy;
//group of enemies
var enemies;
//group of bullets
var bullets
//number of enemies
var enemyNum = 0;
//the left collision wall
var leftWall;
//the right collision  wall;
var rightWall;
//the bottom collision wall
var bottomWall;
//the thickness of the wall
var WALL_THICKNESS = 10;
function setup() {
  createCanvas(900,800);
  /**sprites**/
  //the playable spritexx
  ship = createSprite(width/2, height-50, 50, 50);
  
  //enemy = createSprite(200, 100, 50,50);
  //left wall - the left collision wall to the stage
  leftWall = createSprite(-WALL_THICKNESS/2, height/2, WALL_THICKNESS, height);
  //left_Wall = createSprite(50, 700, 50, 500);
  //right wall the right collision box to the stage
  rightWall = createSprite(width+WALL_THICKNESS/2, height/2, WALL_THICKNESS, height);
  //bottom wall - stops enemies from living forever
  bottomWall = createSprite(width/2, height+WALL_THICKNESS/2, width+WALL_THICKNESS*2, WALL_THICKNESS);
  
  //ship.setCollider("circle", 0, 0, 25);
  /**groups**/
  bullets = new Group();
  enemies = new Group();
}

function draw() {
  background(0,0,0);  
  drawSprites();
  
  /**controls**/
  //Movement
  if(keyDown(LEFT_ARROW) === false && keyDown(RIGHT_ARROW) === false)
    ship.velocity.x = 0;
  if(keyDown(LEFT_ARROW))
    ship.velocity.x = -4;
  if(keyDown(RIGHT_ARROW))
    ship.velocity.x = 4;
  //firing
  if(frameCount%10 === 0)
    {
    var bullet = createSprite(ship.position.x, ship.position.y-25,10,50);
    //bullet.addImage(bulletImage);
    bullet.setSpeed(10, 270);
    bullet.life = 60;
    bullets.add(bullet);
    }
  
  /**wall collisions**/
  ship.collide(leftWall);
  ship.collide(rightWall);
  enemies.collide(bottomWall, enemyHitWall);
  
  /**enemy spawner**/
  while(enemyNum < 15){
    enemy = createSprite(random(25,width -25),random(25,height/4), 40, 40);
    enemy.setSpeed(1,90);
    
    enemies.add(enemy);
    enemyNum = enemyNum +1;
  }
  enemies.overlap(bullets, hitEnemy);
}
//removes the bullet and enemy if they overlap
function hitEnemy(enemy, bullet) {
  enemy.remove();
  enemyNum = enemyNum -1;
  bullet.remove();
  
}
//function removes enemy sprites if the enemy sprites hit the bottom wall
function enemyHitWall(enemy) {
  enemy.remove();
  enemyNum = enemyNum -1;
}