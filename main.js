song="";
status1="";
object=[];

function preload(){
   song=loadSound("mixkit-warning-alarm-buzzer-991.wav"); 
   
}

function setup(){
    canvas = createCanvas(640,420);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();

    
}

function start(){
    objectDetector =ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML ="Status : Detecting Baby";
}

function modelLoaded(){
    console.log("Model Loaded");
    status1 = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error,results){
    if(error) 
    {
        console.log(error);
        
        
    }
    else{
        console.log(results);
        object= results;
    }
    
    
}
function draw(){
    image(video,0,0,380,380);
    if(status1 !="")
    {
        r = random(255);
        g=random(255);
        b=random(255);
objectDetector.detect(video,gotResult);
        for(i=0 ; i<object.length;i++){
            document.getElementById("status").innerHTML="Status: Baby Detected";
            fill("r,g,b");
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke("r,g,b");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if(object[i].label=="person"){
            document.getElementById("numberofobjects").innerHTML="Baby Found";
            song.stop();
            
            }
            else{
                document.getElementById("numberofobjects").innerHTML="Baby Not Found";
            song.play();
            }

    if(object.length==0){
        document.getElementById("numberofobjects").innerHTML="Baby Not Found";
            song.play();
    }

        }
        }
    }