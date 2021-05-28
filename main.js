song = "";

function preload() {
    song = loadSound("music.mp3");
}

scoreRigthWrist = 0;
scoreLeftWrist = 0;

rigthWristX = 0;
rigthWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is Intialized');
}

function gotPoses(results) {
    console.log(results);

    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
}


function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if (scoreRigthWrist > 0.2) {

        circle(rigthWristX, rigthWristY, 20);

        if (rigthWristY > 0 && rigthWristY <= 100) {
            document.getelemntById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }

        if (rigthWristY > 100 && rigthWristY <= 200) {
            document.getelemntById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }

        if (rigthWristY > 200 && rigthWristY <= 300) {
            document.getelemntById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }

        if (rigthWristY > 300 && rigthWristY <= 400) {
            document.getelemntById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
    }

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals / 500;
        document.getelemntById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}