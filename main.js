song="";
function preload(){
    song=loadSound("music.mp3");

}
scorerightwrist=0;
scoreleftwrist=0;
function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
    
}
function draw(){
  image(video,0,0,600,500);
  fill("#FFC0CB");
  stroke(255,255,255);
  if(scorerightwrist>0.2){
  circle(rightWristX,rightWristY,20);
  if(rightWristY>0 && rightWristY<=100){
      document.getElementById("speed").innerHTML="speed = 0.5x";
      song.rate(0.5);
  }
  else if(rightWristY>100 && rightWristY<=200){
    document.getElementById("speed").innerHTML="speed = 1x";
    song.rate(1);
  }
  else if(rightWritY>200 && rightWristY<=300){
    document.getElementById("speed").innerHTML="speed = 1.5";
    song.rate(1.5);
  }
  else if(rightWristY>300 && rightWristY<= 400){
    document.getElementById("speed").innerHTML="speed = 2x";
    song.rate(2);
  }
  else if(rightWristY>400 && rightWristy<=500){
    document.getElementById("speed").innerHTML="speed = 2.5x";
    song.rate(2.5);
  }
  }
  if(scoreleftwrist>0.2){
      circle(leftWristX,leftWristY,20);
      InNumberLeftWristY=Number(leftWristY);
      remove_decimals=floor(InNumberLeftWristY);
      volume=remove_decimals/500;
      document.getElementById("volume").innerHTML="volume="+volume;
      song.setVolume(volume);
  }
}
function play(){
    song.play();
}
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
function modelLoaded(){
    console.log('poseNet is initialized');
}
function gotPoses(results){
if(results.length>0){
    console.log(results);
    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY);
    console.log(results);
    scorerightwrist=results[0].pose.keypoints[10].score;
    scoreleftwrist=results[0].pose.keypoints[9].score;
    console.log(" scorerightwrist = "+scorerightwrist+" scoreleftwrist = "+scoreleftwrist);
}
}
function play(){
    song.play();
    song.setVolume();
    song.rate(1);
}
