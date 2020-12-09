var runner, rockGroup, runnerImg, rockImg, ground;
var count = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
    runnerImg=loadImage("running.jpg");
    rockImg=loadImage("rock.jpg");
}

function setup(){
    createCanvas(displayWidth-10, displayHeight-165);
    runner=createSprite(100,350,10,10);
    camera.position.x = displayWidth/2;
    camera.position.y = 300
    rockGroup=createGroup();
    runner.addImage(runnerImg);
    ground = createSprite(350,450,displayWidth-10,10);
    textSize(18);
    textStyle(BOLD);
    fill(0);
}

function draw(){
    background(255);
    runner.scale = 0.2;
    runner.collide(ground)
    runner.setCollider(10,10)
    runner.debug= true;

          if(gameState === PLAY){
           
            ground.velocityX = -(6 + 3*count/100);
    
            count = Math.round(World.frameCount/4);
            
            if (ground.x < 0){
              ground.x = ground.width/2;
            }
            

            if(keyDown(UP_ARROW)&&runner.y >= 370){
              runner.velocityY = -12 ;
            }
          
          
            runner.velocityY = runner.velocityY + 0.8;
    
         Rock();
            if(rockGroup.isTouching(runner)){
              gameState = END;
            }
          }
          
          else if(gameState === END) {
            ground.velocityX = 0;
            runner.velocityY = 0;
          rockGroup.setVelocityXEach(0);
            
           rockGroup.setLifetimeEach(-1); 
          }   

    drawSprites();
}

function Rock() {
    if (World.frameCount % 75 === 0) {
      var rock = createSprite(835,425,40,10);
      rock.addImage(rockImg)
      rock.scale = 0.2;
      rock.velocityX = -6;
      rock.lifetime = 250;
      rockGroup.add(rock);
    }
}