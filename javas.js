var ul = document.getElementById("list");
var addItem = document.getElementById("submit");
var removeItem = document.getElementsByClassName("delete");
var checkstuff = document.getElementsByClassName("check");
var wholestuff = document.getElementsByClassName("whole");
var parastuff = document.getElementsByClassName("select");
var list = [];

function dateTime() {
    var con = new Date();
    var d = con.getDate();
    var mon = ["January", "Febuary", "March", "April", "May", "June", "July", "Augest", "September", "October", "November", "December" ]
    var m = mon[con.getMonth()];
    var y = con.getFullYear();
    var whole = (m + " " +  d + " " + y);

    document.getElementById("date").innerHTML = whole;
}

if (JSON.parse(localStorage.getItem("stuff")) !== null ){
    list = JSON.parse(localStorage.getItem("stuff"));
    renderList();
} else {
    console.log("you nothing on your list");
}

function renderList(){

    while(ul.firstChild){
        ul.removeChild(ul.firstChild);
    }

    for( let i = 0; i < list.length; i++ ){
        var j = i + 1; 

        var newDiv = document.createElement("div");
        newDiv.setAttribute("class", "whole");

        var newpara = document.createElement("p");
        newpara.innerHTML = j + ": " + list[i];
        newpara.setAttribute("class", "select");

        var newButton = document.createElement("button");
        newButton.setAttribute("class", "delete");
        newButton.innerText = "X";

        var newButton2 = document.createElement("button");
        newButton2.setAttribute("class", "check");
        newButton2.setAttribute("id", i);
        newButton2.innerText = "Y";

        newDiv.prepend(newpara);
        newDiv.prepend(newButton2);
        newDiv.prepend(newButton);
        ul.append(newDiv);
    }
    delItem();
    checkItem();
}

document.onkeyup =  function(e){ var key = e.key; if ( key == "Enter" ) { listAdd(); } }

addItem.addEventListener("click", function(){ listAdd(); })

function listAdd() {
    var input = document.getElementById("user");
    list.push(input.value.trim());
    localStorage.setItem("stuff", JSON.stringify(list));

    renderList(list);

    input.value = "";
}

function delItem(){
    for( let i = 0; i < removeItem.length; i++ ){
        removeItem[i].addEventListener("click", function(){
            list.splice(i, 1);
            localStorage.setItem("stuff",JSON.stringify(list));
            renderList();
        })
    }
}

function checkItem(){
    for( let i = 0; i < checkstuff.length; i++ ){
        checkstuff[i].addEventListener("click", function(){

            var childCount = parastuff[i].childElementCount;

            if ( childCount == 0 ){
                list[i] = list[i].strike()
            } else {
                var finalNumber = list[i].length;
                list[i]= list[i].slice(8, finalNumber - 9);
            }

            localStorage.setItem("stuff",JSON.stringify(list));
            renderList();

        })
    }
}

document.getElementById("clear").addEventListener("click", function(){
    list = [];
    localStorage.setItem("stuff",JSON.stringify(list));
    renderList();
})