img = "";
status = "";
objects = [];
function preload() {
    img = loadImage('dog_cat.jpg');
}
function setup() {
    canvas = createCanvas(600, 400);
    canvas.position(330, 170);
    video=createCapture(VIDEO);
    video.size(600,400);
    video.hide();
    

}
function draw() {
    image(video, 0, 0, 600, 400);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDectector.detect(video,gotresult);
        for (i = 0; i < objects.length; i++) {
            fill("purple");
            document.getElementById("status").innerHTML="Status: Object detected";
            document.getElementById("numberofobjects").innerHTML="Number of objects detected are - "+objects.length;
            var percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
           }
        }
    }
    function start(){
        objectDectector = ml5.objectDetector('cocossd', modalloaded);
        document.getElementById("status").innerHTML = "Status:Detecting Objects";
    }

function modalloaded() {
    console.log("modalloaded");
    status = true;
}
function gotresult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        console.log("length of array:" + results.length);
        objects = results;
    }
}
