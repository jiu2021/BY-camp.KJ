function play() {
    document.getElementById("menu").style.display = "none";
    var duck = document.getElementById("duck");
    duck.style.cursor = "crosshair";

    timer = setInterval(function() {
        var left = setRandom(0, 1400);
        var top = setRandom(0, 650);
        duck.style.top = top + "px";
        duck.style.left = left + "px";
    }, 500);

    timer1 = setInterval(() => {
        Autotext();
    }, 6000);

    duck.onclick = function() {
        clearInterval(timer);
        clearInterval(timer1);
        var text = document.getElementById("text");
        text.style.display = "none";
        document.getElementById("menu").style.display = "flex";
        var duck = document.getElementById("duck");
        duck.style.cursor = "default";
        duck.style.top = 100 + "px";
        duck.style.left = "45%";
        alert("The duck has been catched!");
        duck.onclick = "";
    }
}

function setRandom(min, max) {
    var range = max - min;
    var Rand = Math.random();
    return min + Math.round(Rand * range);
}

function help() {
    alert("Choose play and use your mouse to catch the yellow duck!");
}

function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function Autotext() {
    var text = document.getElementById("text");
    text.style.display = "";
    await timeout(2000);
    text.style.height = "20px";
    text.style.backgroundColor = "yellow";
    text.innerText = "Come after me!";
    await timeout(2000);
    text.innerText = "You are so slow!";
    await timeout(2000);
    text.style.height = "40px";
    text.innerText = "You will never catch up with me!";
}