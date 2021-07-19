var counter = 0; //存储已完成事件个数
var recordchooseAll = 1; //记录all按钮状态，方便执行下次点击操作
var buttonlist = document.getElementsByTagName("button");
displaylistTail(); //实时监测有无事件，若无则收起表尾
//捕获输入事件，创建事件列表
function getItems() {
    //如果按下enter键且输入框不为空串
    if (event.keyCode == 13 && document.getElementById("input").value.trim() != "") { //13→对应回车事件
        counter++;
        var newli = document.createElement("li");
        document.getElementById("itemslist").appendChild(newli);

        var newspan = document.createElement("span");
        newli.appendChild(newspan);
        newli.setAttribute("class", "Active");

        if (buttonlist[2].classList.contains("choose")) {
            newli.style.display = "none";
        } //如果处于展示Completed状态下，则不展示新输入的

        var newspan1 = document.createElement("span");
        newli.appendChild(newspan1);
        var spanlist = document.getElementsByTagName("span");
        spanlist[spanlist.length - 1].classList.add("text");
        var textlist = document.getElementsByClassName("text");

        var newItem = document.getElementById("input").value;
        var node = document.createTextNode(newItem);
        textlist[textlist.length - 1].appendChild(node);
        document.getElementById("input").value = "";

        var newlabel = document.createElement("label");
        newspan.appendChild(newlabel);
        newlabel.appendChild(document.createTextNode("○"));

        var newfork = document.createElement("fork");
        newli.appendChild(newfork);

        document.getElementById("listTail").style.display = "flex";
        displaycounter();
        setchoose();
        setfork();
        setedit();
    }
}
//创建勾选按钮
function setchoose() {
    var allList = document.getElementsByTagName("li");
    var allLabel = document.getElementsByTagName("label");
    for (let i = 1; i < allLabel.length; i++) {
        allLabel[i].onclick = function() {
            if (allList[i].classList.contains("Active")) {
                allList[i].classList.remove("Active");
                allList[i].classList.add("Completed");
                if (buttonlist[1].classList.contains("choose")) {
                    allList[i].style.display = "none";
                } //如果处于展示Active状态下，则不显示新Completed的
                counter--;
            } else if (allList[i].classList.contains("Completed")) {
                allList[i].classList.remove("Completed");
                allList[i].classList.add("Active");
                if (buttonlist[2].classList.contains("choose")) {
                    allList[i].style.display = "none";
                } //如果处于展示Completed状态下，则不显示新Active的
                counter++;
            }
            displaycounter();
            displayClearcompleted();
        }
    }
}
//实现多次编辑功能 
function setedit() {
    var textlist = document.getElementsByClassName("text");
    var allList = document.getElementsByTagName("li");
    for (let now = textlist.length - 1; now >= 0; now--) {
        textlist[now].ondblclick = function() {
            //连击开启重新编辑模式
            var newinput = document.createElement("input");
            newinput.setAttribute("value", "");
            newinput.setAttribute("id", "edit");
            var parent = document.getElementById("itemslist");
            parent.insertBefore(newinput, allList[now + 1]);

            newinput.value = textlist[now].innerText;
            allList[now + 1].style.display = "none";
            //将编辑内容重新写入
            newinput.onkeydown = function() {
                var parent = document.getElementById("itemslist");
                if (event.keyCode == 13) {
                    //新内容为空，则删除事件
                    if (newinput.value.trim() == "") {
                        if (allList[now + 1].classList.contains("Active")) {
                            counter--;
                            displaycounter();
                        }
                        parent.removeChild(allList[now + 1]);
                        setchoose();
                        setfork();
                        setedit();
                        parent.removeChild(newinput);
                    }
                    //新内容不为空，则写入
                    else {
                        textlist[now].innerText = newinput.value.trim();
                        allList[now + 1].style.display = "flex";
                        parent.removeChild(newinput);
                    }
                }
            }
        }
    }
}
//创建红叉按钮
function setfork() {
    var allfork = document.getElementsByTagName("fork");
    var allList = document.getElementsByTagName("li");
    var parent = document.getElementById("itemslist");
    for (let i = 0; i < allfork.length; i++) {
        allfork[i].onclick = function() {
            if (allList[i + 1].classList.contains("Active")) {
                counter--;
            }
            parent.removeChild(allList[i + 1]);
            displaycounter();
            setchoose();
            setfork();
            setedit();
        }
    }
}
//显示待办事件数量
function displaycounter() {
    var changep = document.getElementById("forCounter");
    changep.innerText = counter + "items left";
}
//一键completed
function chooseAll() {
    var allList = document.getElementsByTagName("li");
    var allLabel = document.getElementsByTagName("label");
    if (recordchooseAll === 1) {
        allLabel[0].classList.remove("yes");
        allLabel[0].classList.add("no");
        for (let i = 1; i < allList.length; i++) {
            allList[i].classList.remove("Active");
            allList[i].classList.add("Completed");
        }
        if (buttonlist[1].classList.contains("choose")) {
            displayActive();
        } //如果处于展示Active状态下
        if (buttonlist[2].classList.contains("choose")) {
            displayCompleted();
        } //如果处于展示Completed状态下
        counter = 0;
        displaycounter();
        displayClearcompleted()
        recordchooseAll = 0;
    } else {
        allLabel[0].classList.remove("no");
        allLabel[0].classList.add("yes");
        for (let i = 1; i < allList.length; i++) {
            allList[i].classList.remove("Completed");
            allList[i].classList.add("Active");
        }
        if (buttonlist[2].classList.contains("choose")) {
            displayCompleted();
        } //如果处于展示Completed状态下
        if (buttonlist[1].classList.contains("choose")) {
            displayActive();
        } //如果处于展示Active状态下
        counter = allList.length - 1;
        displaycounter();
        displayClearcompleted()
        recordchooseAll = 1;
    }
}
//All按钮
function displayAll() {
    var allList = document.getElementsByTagName("li");
    for (let i = 0; i < allList.length; i++) {
        allList[i].style.display = "flex";
    }

    for (let i = 0; i < buttonlist.length; i++) {
        if (buttonlist[i].classList.contains("choose"))
            buttonlist[i].classList.remove("choose");
    }
    buttonlist[0].classList.add("choose"); //处于选中状态下添加边框样式
}
//Active按钮
function displayActive() {
    var allList = document.getElementsByTagName("li");
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
//Completed按钮
function displayCompleted() {
    var allList = document.getElementsByTagName("li");
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
//清除Completed事件
function Clearcompleted() {
    var parent = document.getElementById("itemslist");
    var allList = document.getElementsByTagName("li");
    var temp = 0;
    for (let i = allList.length - 1; i !== 0;) {
        if (allList[i].classList.contains("Completed")) {
            parent.removeChild(allList[i]);
            i = allList.length - 1 - temp;
            displayClearcompleted();
        } else {
            i--;
            temp++;
        }
    }
    for (let i = 0; i < buttonlist.length; i++) {
        if (buttonlist[i].classList.contains("choose"))
            buttonlist[i].classList.remove("choose");
    }
    setchoose();
    setfork();
    setedit();
}
//Clear completed按钮状态
function displayClearcompleted() {
    var allList = document.getElementsByTagName("li");
    var clear = document.getElementById("clear");
    for (var j = 1; j < allList.length; j++) {
        if (allList[j].classList.contains("Completed")) {
            clear.innerHTML = "Clear completed";
            break;
        }
    }
    if (j === allList.length) {
        clear.innerText = "";
        recordClearcompleted = 0;
    }
}

function displaylistTail() {
    setInterval(function() {
        var allList = document.getElementsByTagName("li");
        if (allList.length == 1) {
            document.getElementById("listTail").style.display = "none";
        } else {
            document.getElementById("listTail").style.display = "flex";
        }
    }, 100);
}