const elComputers = document.getElementById("computers");
const elPrice = document.getElementById("price");
const elAdd = document.getElementById("add");
const elRemove = document.getElementById("remove");
const elCart = document.getElementById("cart");
const elQuantity = document.getElementById("quantity");
const elPayButton = document.getElementById("pay");
const elTotalDue = document.getElementById("total-due");
const elDescription = document.getElementById("description");
const elSpecs = document.getElementById("specs");
const elImg = document.createElement("img");

let computers = [];
let cart = [];
let totalDue = 0.0;



fetch('https://noroff-komputer-store-api.herokuapp.com/computers')
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToMenu(computers));

const addComputersToMenu = (computers) => {
    computers.forEach(x => addComputerToMenu(x));
    elPrice.innerText = computers[0].price;
    elDescription.innerText = computers[0].description;
    elSpecs.innerText = computers[0].specs;
}

const addComputerToMenu = (computer) => {
    const elComputer = document.createElement("option");
    elComputer.value = computer.id;
    elComputer.appendChild(document.createTextNode(computer.title));
    elComputers.appendChild(elComputer);
}

const handleComputerMenuChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];

    elPrice.innerText = selectedComputer.price;

    elDescription.innerText = selectedComputer.description;
    elSpecs.innerText = selectedComputer.specs.join(", ");
}


const handleAddComputer = () => {
        const selectedComputer = computers[elComputers.selectedIndex];
        let quantity = parseInt(elQuantity.value);

        const cartItem = document.createElement("li");
        const lineTotal = quantity * selectedComputer.price;

        cartItem.innerText = `${quantity} ${selectedComputer.title} ${lineTotal.toFixed(2)}kr`;
        elCart.appendChild(cartItem);

        totalDue += lineTotal;
        elTotalDue.innerHTML = `Total Due: ${totalDue.toFixed(2)}kr`;   
}


const handlePay = () => {
    const totalPaid = prompt("Please enter the amount of money you wish to pay");
    const change = parseFloat(totalPaid) - totalDue;

    if (totalPaid == totalDue) {
        alert(`Enjoy your purchase!`)
        
    }
    else if(totalPaid > totalDue) {
        alert(`Thank you for your purchase! Yout total change due: ${change.toFixed(2)}kr`)
    }
    else if(totalPaid < totalDue) {
        alert(`Nice try scumbag!`)
    }
}

elComputers.addEventListener("change", handleComputerMenuChange);
elAdd.addEventListener("click", handleAddComputer);
elPayButton.addEventListener("click", handlePay);