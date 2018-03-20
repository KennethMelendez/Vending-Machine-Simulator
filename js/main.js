
/*==========================================================
        Global Variables / Money 
==========================================================*/

// Currency in PENNIES
const dollar = 100;
const quarter = 25;
const dime = 10;
const nickel = 5;
const penny = 1;

// const dollar = 100;
// const quarter = 25;
// const dime = 10;
// const nickel = 5;
// const penny = 1;
//users money
var userAmount = 0;
var currentInventoryItem = [];
/*==========================================================
        Code will start when the page is loaded
==========================================================*/

$(document).ready(function () {

    getInventory();
    dollarBtn();
    quarterBtn();
    dimeBtn();
    nickelBtn();
    musicBtn();
    clickInventoryEventGettingTheInventory();

}); //end of ready function


/*==========================================================
        Loading Data
==========================================================*/


function loadInventory(callback) {
    setTimeout(function () {
        callback();
    }, 100);
}


function getInventory() {
    loadInventory(function () {                                                   //activate load inventory
        formatAndAppend();
    });
}


/*==========================================================
        hidden music button
==========================================================*/


function musicBtn() {
    $("#music").hide();                                                         //hides music on start
    $(document).on("click", "#video-btn", function () {                             //button click event
        $("#music").toggle();                                                   //toggles the music on click
    });
}

/*==========================================================
        Click && Inventory events
==========================================================*/


function getInvoById(array, id) {
    for (var x = 0; x < array.length; x++) {
        if (array[x].id == id) {
            var item = array[x]
            return item;
        }
    }
    return null;
}



function clickInventoryEventGettingTheInventory() {

    $(document).on("click", ".inventory", function (event) {
        event.preventDefault();
        var btn = $(event.target);
        var id = btn.attr("data-inventoryId");
        inventory = getInvoById(inventoryData(), id);
        currentInventoryItem = [];
        currentInventoryItem.push(inventory);
        displayChosenInventory(currentInventoryItem[0]);
        // purchaseBtnEvent(currentInventoryItem[0]);
    });



    $(document).on("click", ".purchase-btn", function (event) {
        event.preventDefault();
        if (currentInventoryItem[0] == null) {
            $(".message-box").text("Please choose an item.");
        } else {
            console.log("Hey I'm inside the purchase button:::" + currentInventoryItem[0].name);

            makePurchaseEvents(currentInventoryItem[0]);
        }
    });



    function displayChosenInventory(inventory) {
        if (inventory != null) {
            console.log(inventory);
            $(".item-input").text("* Item id :" + inventory.id + " " + inventory.name + " *");
        }
    }

}//end of clickInventoryEventGettingTheInventory




/*==========================================================
        Add money click event / display
==========================================================*/

//variable for class in order to append and display
var displayMoney = $(".money-result");
//default text
displayMoney.text("???");

function dollarBtn() {
    $(document).on("click", "#dollar", function (event) {
        event.preventDefault();
        userAmount += dollar;
        console.log(userAmount);
        console.log(toDecimal(userAmount));
        displayMoney.text(toDecimal(userAmount));
    });
}

function quarterBtn() {
    $(document).on("click", "#quarter", function (event) {
        event.preventDefault();
        userAmount += quarter;
        console.log(userAmount);
        console.log(toDecimal(userAmount));
        displayMoney.text(toDecimal(userAmount));
    });
}

function dimeBtn() {
    $(document).on("click", "#dime", function (event) {
        event.preventDefault();
        userAmount += dime;
        console.log(userAmount);
        console.log(toDecimal(userAmount));
        displayMoney.text(toDecimal(userAmount));
    });
}

function nickelBtn() {
    $(document).on("click", "#nickel", function (event) {
        event.preventDefault();
        userAmount += nickel;
        console.log(userAmount);
        console.log(toDecimal(userAmount));
        displayMoney.text(toDecimal(userAmount));
    });
}

/*==========================================================
        Purchase Events
==========================================================*/


function makePurchaseEvents(currentInventory) {

    if (currentInventory.quantity <= 0) {
        $(".message-box").text(currentInventory.name + " SOLD OUT.");
    } else if (userAmount >= toPennies(currentInventory.price && currentInventory.quantity != 0)) {
        console.log("user: " + userAmount + " item: " + toPennies(currentInventory.price));
        result = userAmount - toPennies(currentInventory.price);
        userAmount = result;
        result = toDecimal(result);
        displayMoney.text(result);
        $(".message-box").text(currentInventory.name + " was purchased.");
        //reduce inventory
        reduceInventoryCount();
        //refresh page
        refreshInventory();

        //change output
        changeOutput();
        refreshUserAmount();
    } else {
        $(".message-box").text(currentInventory.name + " was chosen. please insert sufficient funds.");

    }
}

function reduceInventoryCount() {
    currentInventoryItem[0].quantity--;
    console.log(currentInventoryItem[0].quantity);
    updateInventory(currentInventoryItem[0]);
}

function updateInventory(currentInventory) {
    for (var x = 0; x < inventoryData().length; x++) {
        if (inventoryData()[x].id == currentInventory.id) {
            var item = inventoryData()[x];
            item = currentInventoryItem[0];
        }
    }
}


function refreshUserAmount() {
    userAmount = 0;
    displayMoney.text(userAmount);
}

function refreshInventory() {
    $(".stock").empty();
    getInventory();
}

/*==========================================================
        Money Conversion
==========================================================*/

function toDecimal(num) {
    return num / 100;
}

function toPennies(num) {
    return num * 100;
}

function changeOutput() {
    // var result = userAmount;
    var dollarChange = 0;
    var quarterChange = 0;
    var dimeChange = 0;
    var nickelChange = 0;
    var pennyChange = 0;
    var result = 0;

    var currency = [dollar,quarter,];

    while (userAmount >= dollar) {
        userAmount = userAmount - dollar;
        dollarChange++;
    }

    while (userAmount >= quarter) {
        userAmount = userAmount - quarter;
        quarterChange++;
    }

    while (userAmount >= dime) {
        userAmount = userAmount - dime;
        dimeChange++;
    }

    while (userAmount >= nickel) {
        userAmount = userAmount - nickel;
        nickelChange++;
    }

    while(userAmount >= nickel) {
        userAmount = userAmount - penny;
        pennyChange++;
    }



    $(".change-output").text(`dollars ${dollarChange} quarters ${quarterChange} dimes ${dimeChange} nickels ${nickelChange} pennies ${pennyChange}`);
}

/*==========================================================
        Formatting and Appending
==========================================================*/


function formatIntoHtml(inventory) {
    return `                        <div class="row">
    <div class="col-sm inventory" data-inventoryId="${inventory[0].id}">
        <p>(${inventory[0].id})</p>
        <p>${inventory[0].name}</p>
        <hr>
        <p>$${inventory[0].price}</p>
        <hr>
        <p>Quantity: ${inventory[0].quantity}</p>
    </div>
    <div class="col-sm inventory" data-inventoryId="${inventory[1].id}">
        <p>(${inventory[1].id})</p>
        <p>${inventory[1].name}</p>
        <hr>
        <p>$${inventory[1].price}</p>
        <hr>
        <p>Quantity: ${inventory[1].quantity}</p>
    </div>
    <div class="col-sm inventory" data-inventoryId="${inventory[2].id}">
        <p>(${inventory[2].id})</p>
        <p>${inventory[2].name}</p>
        <hr>
        <p>$${inventory[2].price}</p>
        <hr>
        <p>Quantity: ${inventory[2].quantity}</p>
    </div>
</div>
<div class="row">
    <div class="col-sm inventory" data-inventoryId="${inventory[3].id}">
        <p>(${inventory[3].id})</p>
        <p>${inventory[3].name}</p>
        <hr>
        <p>$${inventory[3].price}</p>
        <hr>
        <p>Quantity: ${inventory[3].quantity}</p>
    </div>
    <div class="col-sm inventory" data-inventoryId="${inventory[4].id}">
        <p>(${inventory[4].id})</p>
        <p>${inventory[4].name}</p>
        <hr>
        <p>$${inventory[4].price}</p>
        <hr>
        <p>Quantity: ${inventory[4].quantity}</p>
    </div>
    <div class="col-sm inventory" data-inventoryId="${inventory[5].id}">
        <p>(${inventory[5].id})</p>
        <p>${inventory[5].name}</p>
        <hr>
        <p>$${inventory[5].price}</p>
        <hr>
        <p>Quantity: ${inventory[5].quantity}</p>
    </div>
</div>
<div class="row">
    <div class="col-sm inventory" data-inventoryId="${inventory[6].id}">
        <p>(${inventory[6].id})</p>
        <p>${inventory[6].name}</p>
        <hr>
        <p>$${inventory[6].price}</p>
        <hr>
        <p>Quantity: ${inventory[6].quantity}</p>
    </div>
    <div class="col-sm inventory" data-inventoryId="${inventory[7].id}">
        <p>(${inventory[7].id})</p>
        <p>${inventory[7].name}</p>
        <hr>
        <p>$${inventory[7].price}</p>
        <hr>
        <p>Quantity: ${inventory[7].quantity}</p>
    </div>
    <div class="col-sm inventory" data-inventoryId="${inventory[8].id}">
        <p>(${inventory[8].id})</p>
        <p>${inventory[8].name}</p>
        <hr>
        <p>$${inventory[8].price}</p>
        <hr>
        <p>Quantity: ${inventory[8].quantity}</p>
    </div>
</div>`
};

function formatAndAppend() {
    $(".stock").append(formatIntoHtml(inventoryData()));
}


/*==========================================================
        Mock Data
==========================================================*/

function inventoryData() {
    return testDataInventory;
}

var testDataInventory = [
    {
        "id": 1,
        "name": "Snickers",
        "price": 1.5,
        "quantity": 10
    },
    {
        "id": 2,
        "name": "M&M's",
        "price": 1.25,
        "quantity": 8
    },
    {
        "id": 3,
        "name": "Almond Joy",
        "price": 1.25,
        "quantity": 11
    },
    {
        "id": 4,
        "name": "Milky Way",
        "price": 1.65,
        "quantity": 3
    },
    {
        "id": 5,
        "name": "Payday",
        "price": 1.75,
        "quantity": 2
    },
    {
        "id": 6,
        "name": "Reese's",
        "price": 1.5,
        "quantity": 5
    },
    {
        "id": 7,
        "name": "Pringles",
        "price": 2.35,
        "quantity": 4
    },
    {
        "id": 8,
        "name": "Cheezits",
        "price": 2,
        "quantity": 6
    },
    {
        "id": 9,
        "name": "Doritos",
        "price": 1.95,
        "quantity": 7
    }
];
