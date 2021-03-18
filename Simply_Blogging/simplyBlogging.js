var formInfo = [];
//var retrievedInfo = [];

//function that stores the data 
function store(){
    var formEntry = {
        title: document.getElementById('title').value,
        desc: document.getElementById('desc').value,
        image: document.getElementById('image').value
    }

    formInfo.push(formEntry);
    sessionStorage.setItem("formInfo",JSON.stringify(formInfo));
}

//function to retrieve the data
function retrieve(){
    var retrievedInfo = JSON.parse(sessionStorage.getItem('formInfo'));

    var container = document.getElementById("container");
    for (var i = 0; i < retrievedInfo.length; i++){
        container.innerHTML += '<div class="box"> <h1 class="h1">'+retrievedInfo[i].title+'</h1></div>';
        container.innerHTML += '<div class="box"> <p class="par">'+retrievedInfo[i].desc+'</p></div>';
        container.innerHTML += '<div class="box"> <img src='+retrievedInfo[i].image+' alt="..." class="img"></div>';
    }
    
}

//function to add a blog
function addBlog(){
    store();
    document.getElementById("container").innerHTML=""; // to clear the previous material on the page
    retrieve();
}