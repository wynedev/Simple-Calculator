var buttons = document.getElementsByClassName('calcbuttons');
var outputDisplay = document.getElementById('calcInput');

var valueA;
var valueB;
var operation;


for(var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', addnumber);
}


function addnumber(){
    var buttonValue = this.textContent;

    if(this.textContent === "C"){

        outputDisplay.textContent = "0";
        valueA = undefined;
        valueB = undefined;
        operation = undefined;

    }
    else if (buttonValue === "()") {
        var lastOpen = outputDisplay.textContent.lastIndexOf("(");
        var lastClose = outputDisplay.textContent.lastIndexOf(")");
        
        if(outputDisplay.textContent === "0"){
            outputDisplay.textContent = "";
        }

        if (lastOpen > lastClose) {
            outputDisplay.textContent += ")";
        }else{
            outputDisplay.textContent += "(";
        }
    }else if(this.id === "button-back"){
        backspace();
    }else if(this.classList.contains("calcbuttonsOp")){
        addToOp(this.textContent);
    }else if(this.textContent === "="){
        getResult(this.textContent);
    }else if(outputDisplay.textContent === "0"){
        outputDisplay.textContent = buttonValue;
    }else{
        outputDisplay.textContent += buttonValue;
    }

}

function backspace(){

    if(outputDisplay.textContent.length > 1){
        outputDisplay.textContent =
            outputDisplay.textContent.slice(0, -1);
    }else{
        outputDisplay.textContent = "0";
    }

}

function addToOp(operator){
    valueA = outputDisplay.textContent;
    operation = operator;

    outputDisplay.textContent = "0";
}

function getResult(){
    valueB = outputDisplay.textContent;

    if(outputDisplay.textContent === "(01.02)"){
        showMessage();
        startHearts();

        var song = document.getElementById("secretSong");
        song.play();

        return;
    }

    outputDisplay.textContent = operate();
}

function operate(){
    var result;

    if(operation === "+"){
        result = Number(valueA) + Number(valueB);
    }else if(operation === "-"){
        result = Number(valueA) - Number(valueB);
    }else if(operation === "X"){
        result = Number(valueA) * Number(valueB);
    }else if(operation === "/"){
        result = Number(valueA) / Number(valueB);
    }

    return result;
}

function showMessage(){

    var secretMessage = document.getElementById("secretMessage");

    secretMessage.classList.add("show");

}

function createHeart(){

    var heart = document.createElement("div");

    heart.classList.add("heart");
    heart.textContent = "♥";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (30 + Math.random() * 30) + "px";

    var pinkColors = [
        "pink",
        "hotpink",
        "deeppink",
        "lightpink"
    ];

    heart.style.color =
        pinkColors[Math.floor(Math.random() * pinkColors.length)];

    heart.style.animationDuration = (3 + Math.random() * 4) + "s";

    document.getElementById("hearts").appendChild(heart);

    setTimeout(function(){
        heart.remove();
    }, 7000);
}


function startHearts(){

    setInterval(createHeart, 300);

}
