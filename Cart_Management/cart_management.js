var cartItems = [
    { "name": "Soccer Ball", "price": 45 },
    { "name": "Soccer Cleats", "price": 125 },
    { "name": "Soccer Jersey", "price": 150 },
    { "name": "Soccer Indoor Shoes", "price": 80 },
    { "name": "FIFA 2021 (PS5)", "price": 60 },
    { "name": "PS5 Controller", "price": 70 },
    { "name": "PS5 Console", "price": 600 }
];
// console.log(cartItems[2]); //{ name: 'Soccer Jersey', price: 150 }
// console.log(cartItems[2].price); // 150
function dispItemp() {
    var container = document.getElementById("container");
    for (var i = 0; i < cartItems.length; i++) {
        container.innerHTML += '<div class="column"> <h1>Name: ' + cartItems[i].name + '</h1> </br> <h1>Price: ' + cartItems[i].price + '</h1> </br> <button onClick="addItem(' + i + ')">Add</button> </div>';
    }
    var cart_size = document.getElementById("cart_size");
    cart_size.innerHTML = "";
    cart_size.innerHTML += '<h3> Cart Size: ' + count + '</h3>';
}
var addedItems = [];
var count = 0;
function addItem(x) {
    //console.log(x);
    var item = {
        name: cartItems[x].name,
        price: cartItems[x].price
    };
    addedItems.push(item);
    //console.log(addedItems);  // just for test purpose
    localStorage.setItem("addedItems", JSON.stringify(addedItems));
    count++; //updating cart size
    var cart_size = document.getElementById("cart_size");
    cart_size.innerHTML = "";
    cart_size.innerHTML += '<h3> Cart Size: ' + count + '</h3>';
}
function checkout() {
    var retrievedInfo = JSON.parse(localStorage.getItem('addedItems'));
    var total = 0;
    var html = '<table class= "tableClass">';
    html += '<tr>';
    //Top row of the table
    html += '<th class="thClass">' + "Item Name" + '</th>';
    html += '<th class="thClass">' + "Price" + '</th>';
    html += '</tr>';
    for (var i = 0; i < retrievedInfo.length; i++) {
        html += '<tr>';
        for (var j in retrievedInfo[i]) {
            html += '<td class="tdClass">' + retrievedInfo[i][j] + '</td>';
        }
        total = total + parseInt(retrievedInfo[i].price);
        html += '</tr>';
    }
    html += '</table>';
    html += '<h3>Total Price: ' + total + ' </h3>';
    document.getElementById('table_container').innerHTML = html;
}
