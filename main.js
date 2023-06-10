Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snap()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Rod5eM86L/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model Loaded");
}

function speak()
{
    var synth = window.speechSynthesis;
    sd1 = "The First Prediction is " + p1;
    sd2 = "And The Second Prediction is " + p2;
    var utterThis = new SpeechSynthesisUtterance(sd1 + sd2);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('capture_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if (error) {
        console.error(error);}
        else {
        console.log(results);
        document.getElementById("ren").innerHTML = results[0].label;
        document.getElementById("ren2").innerHTML = results[1].label;
        p1 = results[0].label;
        p2 = results[1].label;
        speak();
        if(results[0].label == "AMAZING")
        {
            document.getElementById("up").innerHTML = "&#128076;";
        }
        if(results[0].label == "BEST")
        {
            document.getElementById("up").innerHTML = "&#128077;";
        }
        if(results[0].label == "VICTORY")
        {
            document.getElementById("up").innerHTML = "&#9996;";
        }
        if(results[1].label == "AMAZING")
        {
            document.getElementById("up2").innerHTML = "&#128076;";
        }
        if(results[1].label == "BEST")
        {
            document.getElementById("up2").innerHTML = "&#128077;";
        }
        if(results[1].label == "VICTORY")
        {
            document.getElementById("up2").innerHTML = "&#9996;";
        }
    }
}