prediction_1 = "";
prediction_2 = "";
Webcam.set({
    width : 350,
    height : 300,
    image_format : 'png',
    image_quality : 90
});
Webcam.attach('#camera');

function takeSnapshot(){
    console.log('inside function')
    Webcam.snap(function(dataUri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src="+dataUri+">"
    })
    
}
console.log(ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Io4pCX17s/model.json",modalLoaded);
 function modalLoaded(){
     console.log('modalLoaded')
 }
function speak(){
    var voice_box = window.speechSynthesis;
    data_1 = "The first prediction is"+prediction_1;
    data_2 = "The second prediction is"+prediction_2;
    var voice_message = new SpeechSynthesisUtterance(data_1 + data_2);
    voice_box.speak(voice_message);
}
function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img , gotResult);
}
function gotResult(error , result){
    if(error){
        console.log(error);
    }else{
        console.log(result);
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        document.getElementById("result_emotion_name").innerHTML = prediction_1;
        document.getElementById("result_emotion_name2").innerHTML = prediction_2;
        speak();
        if(prediction_1 == "happy"){
             document.getElementById("update_emoji").innerHTML = "&#128512";
        }
        if(prediction_1 == "sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if(prediction_1 == "suprise"){
            document.getElementById("update_emoji").innerHTML = "&#128559;"
        }
        if(prediction_1 == "angry"){
            document.getElementById("update_emoji").innerHTML = "&#128545";
        }

        if(prediction_2 == "happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128512";
       }
       if(prediction_2 == "sad"){
           document.getElementById("update_emoji2").innerHTML = "&#128532;";
       }
       if(prediction_2 == "suprise"){
           document.getElementById("update_emoji2").innerHTML = "&#128559;"
       }
       if(prediction_2 == "angry"){
           document.getElementById("update_emoji2").innerHTML = "&#128545";
       }
   }
    }
