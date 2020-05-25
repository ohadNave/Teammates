var teamName;

var ownerAlerts= new Array();

// localStorage.setItem("listAlerts",globalVariable.ownerAlerts);

function displayAddTeam() {
    hideAllDives1();
    var x = document.getElementById("addTeamPage");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function hideAllDives1() {
    var ownerPage = document.getElementById("mainOwnerPage");
    var addTeamPage = document.getElementById("addTeamPage");
    ownerPage.style.display = "none";
    addTeamPage.style.display = "none";

}
var interval;
function setIntervals() {
     interval=setInterval(getOwnerAlerts,1000);

}
function opentNewTeam() {
    var url = "http://localhost:8080/owner/openNewTeam";
    teamName = document.getElementById("teamName");
    var data = {};
    data.sid = "1";
    data.teamName =teamName.value;

    var json = JSON.stringify(data);
    // alert("my json is:"+json);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        // alert("i get a response")
        if (xhr.readyState == 4 && xhr.status == "200") {
            // alert("i have a response:"+this.responseText);
            var jsonData = JSON.parse(this.responseText);


            if(jsonData==true){
                alert("The request was successfully passed")
            }
            else {
                alert("The request failed, please enter a new name!")

            }

        }
        ;

    }
    xhr.send(json);


}
var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open( "GET", aUrl, true );
        anHttpRequest.send( null );
    }
}

function back() {
    clearInterval(getOwnerAlerts);
    displayOwnerPage()

}

function getOwnerAlerts() {

    var myURL="http://localhost:8080/owner/getAlerts/"+localStorage.getItem("sid");
    var xhttp = new XMLHttpRequest();
    console.log(localStorage.getItem("sid"))
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var jsonData = JSON.parse(this.responseText);
            for (var i = 0; i < jsonData.length; i++) {
                var alert2 = jsonData[i];
                ownerAlerts.push(alert2);
                document.getElementById("badge").innerHTML = ownerAlerts.length;
                localStorage.setItem("lengthOfAlerts",ownerAlerts.length);
                localStorage.setItem("arrayOfAlert",JSON.stringify(ownerAlerts));


            }
        }

    };
    xhttp.open("GET", myURL, true);
    xhttp.send();
}


function displayalertsOwner() {
    // hideAllDives();

    window.location.href = "alerts.html";
}

function displayAlerts() {
    var x = document.getElementById("alerts");
    // var y = document.getElementById("back");
    var i = localStorage.getItem("lengthOfAlerts")-1;
    clearInterval(interval);
    while (localStorage.getItem("lengthOfAlerts") > 0) {
        var random = Math.floor(Math.random() * 4) + 1;
        var alerts = document.getElementById("alerts");
        var message = document.createElement("div", "id=message");
        if (random == 1) {
            message.setAttribute("style", "padding: 15px; background-color: #4CAF50; color: white;")
        }
        if (random == 2) {
            message.setAttribute("style", "padding: 15px; background-color: #f44336; color: white;")
        }
        if (random == 3) {
            message.setAttribute("style", "padding: 15px; background-color: #2196F3; color: white;")
        }
        if (random == 4) {
            message.setAttribute("style", "padding: 15px; background-color: #ff9800; color: white;")
        }

        var btn = document.createElement("span");
        btn.setAttribute("class", "closebtn");
        btn.setAttribute("onmouseover", "this.style.color='black'");
        btn.setAttribute("onmouseout", "this.style.color='white'");
        // btn.setAttribute("onclick", "hideDiv()");
        btn.setAttribute("style", "  margin-left: 10px; color: white; font-weight: bold; float: right; font-size: 22px; line-height: 20px; cursor: pointer;transition: 0.3s; ")

        var times = document.createTextNode("X");
        var text = localStorage.getItem("arrayOfAlert");
        text = text.split(/[ ","]+/);


        var text2 = document.createTextNode(text[i]);
        if(text2=="]" || (text2=="[")){
        }
        else {
            i--;
        }
        text.splice(i, 1);


        localStorage.setItem("lengthOfAlerts", text.length);


        localStorage.setItem("arrayOfAlert", text);

        alerts.appendChild(message);
        message.appendChild(btn);
        btn.appendChild(times);
        message.appendChild(text2);
        var newLine = document.createElement('br');
        message.appendChild(newLine)

    }

        // if (x.style.display === "none") {
        //     x.style.display = "block";
        // } else {
        //     x.style.display = "none";
        // }
        // if (y.style.display === "none") {
        //     y.style.display = "block";
        // } else {
        //     y.style.display = "none";
        // }


        var close = document.getElementsByClassName("closebtn");
        var i;

        for (i = 0; i < close.length; i++) {
            close[i].onclick = function () {
                var div = this.parentElement;
                div.style.opacity = "0";
                setTimeout(function () {
                    div.style.display = "none";
                }, 600);
            }
        }


}

//     var x = document.getElementById("alerts");
//     // var y = document.getElementById("back");
//
//
//     while (globalVariable.ownerAlerts.length > 0) {
//         var random = Math.floor(Math.random() * 4) + 1;
//         var alerts = document.getElementById("alerts");
//         var message = document.createElement("div", "id=message");
//         if(random==1){
//             message.setAttribute("style", "padding: 15px; background-color: #4CAF50; color: white;")
//         }
//         if(random==2){
//             message.setAttribute("style", "padding: 15px; background-color: #f44336; color: white;")
//         }
//         if(random==3){
//             message.setAttribute("style", "padding: 15px; background-color: #2196F3; color: white;")
//         }
//         if(random==4){
//             message.setAttribute("style", "padding: 15px; background-color: #ff9800; color: white;")
//         }
//
//         var btn = document.createElement("span");
//         btn.setAttribute("class", "closebtn");
//         btn.setAttribute("onmouseover", "this.style.color='black'");
//         btn.setAttribute("onmouseout", "this.style.color='white'");
//         // btn.setAttribute("onclick", "hideDiv()");
//         btn.setAttribute("style", "  margin-left: 10px; color: white; font-weight: bold; float: right; font-size: 22px; line-height: 20px; cursor: pointer;transition: 0.3s; ")
//
//         var times = document.createTextNode("X");
//         var text = document.createTextNode(globalVariable.ownerAlerts.pop());
//         alerts.appendChild(message);
//         message.appendChild(btn);
//         btn.appendChild(times);
//         message.appendChild(text);
//         var newLine = document.createElement('br');
//         message.appendChild(newLine)
//
//
//
//
//     }
//     // if (x.style.display === "none") {
//     //     x.style.display = "block";
//     // } else {
//     //     x.style.display = "none";
//     // }
//     // if (y.style.display === "none") {
//     //     y.style.display = "block";
//     // } else {
//     //     y.style.display = "none";
//     // }
//
//
//      var close = document.getElementsByClassName("closebtn");
//      var i;
//
//         for (i = 0; i < close.length; i++) {
//              close[i].onclick = function(){
//              var div = this.parentElement;
//              div.style.opacity = "0";
//              setTimeout(function(){ div.style.display = "none"; }, 600);
//             }
//         }
//
// }


// function getOwnerAlerts() {
//     var myURL="http://localhost:8080/owner/getAlerts/"+globalVariable.sid;
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState === 4 && this.status === 200) {
//             var jsonData = JSON.parse(this.responseText);
//             for (var i = 0; i < jsonData.length; i++) {
//                 var alert2 = jsonData[i];
//                 globalVariable.ownerAlerts.push(alert2);
//                 document.getElementById("badge").innerHTML = globalVariable.ownerAlerts.length;
//
//             }
//         }
//
//     };
//     xhttp.open("GET", myURL, true);
//     xhttp.send();
// }
