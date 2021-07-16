var counter = 0;
var recordchooseAll = 1;

var allList = document.getElementsByTagName("li");
var buttonlist = document.getElementsByTagName("button");

function getItems() {
    if (event.keyCode == 13) { //13→对应回车事件
        counter++;
        var newli = document.createElement("li");
        document.getElementById("itemslist").appendChild(newli);

        var newspan = document.createElement("span");
        newli.appendChild(newspan);
        newli.setAttribute("class", "Active");

        var newlabel = document.createElement("label");
        newspan.appendChild(newlabel);
        newlabel.appendChild(document.createTextNode("○"));
        //newlabel.setAttribute("onclick", "choose()");

        var allLabel = document.getElementsByTagName("label");
        /*allLabel[1].addEventListener("click", function choose() {
            if (allList[1].classList.contains("Active")) {
                allList[1].classList.remove("Active");
                allList[1].classList.add("Completed");
            } else if (allList[1].classList.contains("Completed")) {
                allList[1].classList.remove("Completed");
                allLabel[1].classList.add("Active");
            } else {
                allList[1].classList.add("Active");
            }
        });*/
        allLabel[counter].addEventListener("click", function(counter) {
            choose(counter);
        });
        //newlabel.addEventListener("click", function() { alert("!!!"); });

        var newItem = document.getElementById("input").value;
        var node = document.createTextNode(newItem);
        newli.appendChild(node);

        document.getElementById("listTail").style.display = "flex";
        displaycounter();
    }
}

var allList = document.getElementsByTagName("li");
var n;

function choose(n) {
    if (allList[n].classList.contains("Active")) {
        allList[n].classList.remove("Active");
        allList[n].classList.add("Completed");
    } else if (allList[n].classList.contains("Completed")) {
        allList[n].classList.remove("Completed");
        allList[n].classList.add("Active");
    }
}
/*function setchoose() {*/
/*for (let i = 1; i < allList.length; i++) {
    allList[i].addEventListener("click", function choose(i) {
            if (buttonlist[i].classList.contains("Active")) {
                allList[i].classList.remove("Active");
                allList[i].classList.add("Completed");
            } else if (buttonlist[i].classList.contains("Completed")) {
                allList[i].classList.remove("Completed");
                allList[i].classList.add("Active");
            } else {
                allList[i].classList.add("Active");
            }
        }, false)*/
/* allList[i].onclick = function choose(i) {
            if (buttonlist[i].classList.contains("Active")) {
                allList[i].classList.remove("Active");
                allList[i].classList.add("Completed");
            } else if (buttonlist[i].classList.contains("Completed")) {
                allList[i].classList.remove("Completed");
                allList[i].classList.add("Active");
            } else {
                allList[i].classList.add("Active");
            }
        };
    }
}*/

function displaycounter() {
    var changep = document.getElementById("forCounter");
    changep.innerText = counter + "items left";
}

/*function choose(n) {
    if (buttonlist[n].classList.contains("Active")) {
        allList[n].classList.remove("Active");
        allList[n].classList.add("Completed");
    } else if (buttonlist[n].classList.contains("Completed")) {
        allList[n].classList.remove("Completed");
        allList[n].classList.add("Active");
    } else {
        allList[n].classList.add("Active");
    }*/

function chooseAll() {
    if (recordchooseAll === 1) {
        for (let i = 1; i < allList.length; i++) {
            allList[i].classList.remove("Active");
            allList[i].classList.add("Completed");
            counter = 0;
            displaycounter();
            recordchooseAll = 0;
        }
    } else {
        for (let i = 1; i < allList.length; i++) {
            allList[i].classList.remove("Completed");
            allList[i].classList.add("Active");
            counter = allList.length - 1;
            displaycounter();
            recordchooseAll = 1;
        }
    }
    for (let i = 0; i < buttonlist.length; i++) {
        if (buttonlist[i].classList.contains("choose"))
            buttonlist[i].classList.remove("choose");
    }
}

function displayAll() {
    for (let i = 0; i < allList.length; i++) {
        allList[i].style.display = "flex";
    }

    for (let i = 0; i < buttonlist.length; i++) {
        if (buttonlist[i].classList.contains("choose"))
            buttonlist[i].classList.remove("choose");
    }
    buttonlist[0].classList.add("choose"); //处于选中状态下添加边框样式
}

function displayActive() {
    for (let i = 1; i < allList.length; i++) {
        if (allList[i].classList.contains("Active"))
            allList[i].style.display = "flex";
        else
            allList[i].style.display = "none";
    }
    for (let i = 0; i < buttonlist.length; i++) {
        if (buttonlist[i].classList.contains("choose"))
            buttonlist[i].classList.remove("choose");
    }
    buttonlist[1].classList.add("choose");
}

function displayCompleted() {
    for (let i = 1; i < allList.length; i++) {
        if (allList[i].classList.contains("Active"))
            allList[i].style.display = "none";
        else
            allList[i].style.display = "flex";
    }
    for (let i = 0; i < buttonlist.length; i++) {
        if (buttonlist[i].classList.contains("choose"))
            buttonlist[i].classList.remove("choose");
    }
    buttonlist[2].classList.add("choose");
}

function Clearcompleted() {
    var parent = document.getElementById("itemslist");
    for (let i = allList.length - 1; i !== 0;) {
        if (allList[i].classList.contains("Completed")) {
            parent.removeChild(allList[i]);
        }
        i = allList.length - 1;
    }
    for (let i = 0; i < buttonlist.length; i++) {
        if (buttonlist[i].classList.contains("choose"))
            buttonlist[i].classList.remove("choose");
    }
}