var totalRecords;
function apiConnect(){
    $('#root').empty()
    const app = document.getElementById('root')

    const container = document.createElement('div')
    container.setAttribute('class', 'container')


    app.appendChild(container)

    var request = new XMLHttpRequest();
    var accessToken = '54a9a130-fc7c-11ec-8876-fb185402dcab';

    request.open('GET','https://api.ninox.com/v1/teams/x3M6o8DLopZHWBbN7/databases/qi37eohp9dm6/tables');
    request.setRequestHeader('Authorization', 'Bearer ' + accessToken)


    request.onload = function(){
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            for(var i = 0; i < data.length; i++){
                var dbID = data[i].id;
                const card = document.createElement('div');
                card.setAttribute('class', 'card');

                const btn = document.createElement('button',);
                btn.setAttribute('id', (dbID).toString());
                btn.textContent = data[i].name + " " + data[i].id;
                btn.addEventListener("click", search);
                btn.style.float = "left";
                container.appendChild(card);
                card.appendChild(btn);

            }
        } else {
            alert('error');
        }
    }
    request.send();
}

function displayRecords(){
    var recordRequest = new XMLHttpRequest();
    var accessToken = '54a9a130-fc7c-11ec-8876-fb185402dcab';
    recordRequest.open('GET','https://api.ninox.com/v1/teams/x3M6o8DLopZHWBbN7/databases/qi37eohp9dm6/tables/' + this.id +'/records');
    recordRequest.setRequestHeader('Authorization', 'Bearer ' + accessToken);

    recordRequest.onload = function(){
        var data = JSON.parse(this.response)

        if (recordRequest.status >= 200 && recordRequest.status < 400) {
            for(var i = 0; i < data.length; i++){

                document.getElementById("JSON").innerText += JSON.stringify(data[i]["fields"]["Title"]) + "         " + JSON.stringify(data[i]["fields"]["Synopsis"]);
            }

        } else {
            alert('error');
        }
    }
    recordRequest.send();

}
var caryID = "default";
function search() {
    //connects to API endpoint
    $("#tbody tr").remove();
    $("#header").remove();
    var request2 = new XMLHttpRequest();
    var accessToken = '54a9a130-fc7c-11ec-8876-fb185402dcab';
    request2.open('GET', 'https://api.ninox.com/v1/teams/x3M6o8DLopZHWBbN7/databases/qi37eohp9dm6/tables/' + this.id + '/records/?page=0&perPage=10000');
    caryID = this.id;
    request2.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    //function that stores the JSON reply into a variable
    request2.onload = function () {
        var sName = document.getElementById('searchBar').value;
        var sName = sName.toUpperCase()
        var regex = new RegExp(sName, "i");
        var data = JSON.parse(this.response)
        if (request2.status >= 200 && request2.status < 400) {
            if (data.length < 10000){
                alert("finished searching");
            }
            for (var i = 0; i < data.length; i++) {

                var entry = data[i]["fields"]["Title"].toUpperCase();
                if (entry.search(regex) != -1) {
                    var id = data[i]["id"];
                    var title = data[i]["fields"]["Title"];
                    var desc = data[i]["fields"]["Synopsis"];
                    var location = data[i]["fields"]["Location"];
                    var copyYear = data[i]["fields"]["Copyrightyear"];
                    document.getElementById('tbody').innerHTML += `<tr><td>${id}</td> <td>${title}</td> <td>${location}</td> <td>${desc}</td> <td>${copyYear}</td> </tr>`
                }
            }

                searchOverflow();

        } else {
            alert('error');
        }
    }
    request2.send();
}

function searchOverflow(){
    //connects to API endpoint
    var request2 = new XMLHttpRequest();
    var accessToken = '54a9a130-fc7c-11ec-8876-fb185402dcab';
    request2.open('GET','https://api.ninox.com/v1/teams/x3M6o8DLopZHWBbN7/databases/qi37eohp9dm6/tables/' + caryID + '/records/?page=1&perPage=10000');
    request2.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    //function that stores the JSON reply into a variable
    request2.onload = function(){
        var sName = document.getElementById('searchBar').value;
        var sName = sName.toUpperCase()
        var regex = new RegExp(sName, "i");
        var data = JSON.parse(this.response)
        if (request2.status >= 200 && request2.status < 400) {
                totalRecords += data.length;
            for(var i = 0; i < data.length; i++){
                var entry = data[i]["fields"]["Title"].toUpperCase();
                if(entry.search(regex) != -1){
                    var id = data[i]["id"];
                    var title = data[i]["fields"]["Title"];
                    var desc = data[i]["fields"]["Synopsis"];
                    var location = data[i]["fields"]["Location"];
                    var copyYear = data[i]["fields"]["Copyrightyear"];
                    document.getElementById('tbody').innerHTML += `<tr><td>${id}</td> <td>${title}</td> <td>${location}</td> <td>${desc}</td> <td>${copyYear}</td> </tr>`
                }
            }
                searchOverflow2();


        } else {
            alert('error');
        }
    }
    request2.send();
}


function searchOverflow2(){
    //connects to API endpoint
    var request2 = new XMLHttpRequest();
    var accessToken = '54a9a130-fc7c-11ec-8876-fb185402dcab';
    request2.open('GET','https://api.ninox.com/v1/teams/x3M6o8DLopZHWBbN7/databases/qi37eohp9dm6/tables/' + caryID + '/records/?page=2&perPage=10000');
    request2.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    //function that stores the JSON reply into a variable
    request2.onload = function(){
        alert("finished searching");
        var sName = document.getElementById('searchBar').value;
        var sName = sName.toUpperCase()
        var regex = new RegExp(sName, "i");
        var data = JSON.parse(this.response)
        if (request2.status >= 200 && request2.status < 400) {
            totalRecords += data.length;
            for(var i = 0; i < data.length; i++){
                var entry = data[i]["fields"]["Title"].toUpperCase();
                if(entry.search(regex) != -1){
                    var id = data[i]["id"];
                    var title = data[i]["fields"]["Title"];
                    var desc = data[i]["fields"]["Synopsis"];
                    var location = data[i]["fields"]["Location"];
                    var copyYear = data[i]["fields"]["Copyrightyear"];
                    document.getElementById('tbody').innerHTML += `<tr><td>${id}</td> <td>${title}</td> <td>${location}</td> <td>${desc}</td> <td>${copyYear}</td> </tr>`
                }
            }
        } else {
            alert('error');
        }
    }
    request2.send();

}