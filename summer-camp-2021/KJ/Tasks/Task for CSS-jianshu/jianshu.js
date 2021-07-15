//轮播图
var slideIndex = 1;
showSlidesAuto(); //自动播放

function movetimer() {
    clearInterval(timer); //清除定时器
}

function timerplay() {
    showSlidesAuto(); //恢复定时器
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("dotchange");
    for (let j = 0; j < dots.length; j++) {
        if ((slideIndex - 1) !== j)
            dots[j].classList.remove("dotchange");
    }
}

function showSlidesAuto() {
    timer = setInterval(function() {
        plusSlides(1);
    }, 2000);
}

//更新作者列表
function changelist() {
    var anthorlist = document.getElementsByClassName("content");
    var arr = [];
    for (var i = 0; i < 10; i++) {
        Ran();
    }

    function Ran() {
        do {
            Random = Math.floor(Math.random() * 10);
        } while (arr.indexOf(Random) != -1)
        arr.push(Random);
    }
    for (let j = 0; j < 10; j++) {
        if (j < 5) {
            anthorlist[arr[j]].style.display = "block";
        } else if (j < 10) {
            anthorlist[arr[j]].style.display = "none";
        }
    }
}