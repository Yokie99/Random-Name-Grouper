import { saveToLocalStorage, getlocalStorage, removeFromLocalStorage } from "./localstorage.js";

// const modal = document.getElementById('default-modal');

let appendNames = document.getElementById("appendNames");
let modalBodyDiv = document.getElementById("modalBodyDiv")

let getGroupsBtn = document.getElementById("getGroupsBtn");
let addNameBtn = document.getElementById("addNameBtn");

let groupSizeInput = document.getElementById("groupSizeInput");
let nameInput = document.getElementById("nameInput");

let totalElement = document.getElementById('totalElement');

reloadPage();


getGroupsBtn.addEventListener('click', () => {
    addNewGroups()

})

groupSizeInput.addEventListener('keydown', (event) =>{
    if (event.key === "Enter") {
        addNewGroups();
        // modal.classList.remove('hidden');
        // modal.classList.add('show');
    }
})

addNameBtn.addEventListener('click', () => {
    addNewName()
})

nameInput.addEventListener('keydown', (event)=>{
    if (event.key === "Enter") {
        addNewName()
    }
})

function getGroups() {
    let temp = getlocalStorage();
    console.log(temp)
    let groupNum = temp.length;
    let number = groupSizeInput.value;
    let isNum = parseInt(number);

    if (isNum) {
        if (isNum >= groupNum-1) {
            console.log("I am firing");
            return (false)

        }
        else {
            return (groupRandomizer(temp, isNum))
        }
    }

    else {
        return false;
    }

}

function groupRandomizer(array, groupSize) {
    // Create a copy of the array so we don't modify the original.
    const shuffledArray = [...array];

    // Shuffle the array.
    shuffledArray.sort(() => Math.random() - 0.5);

    // Create an empty array to store the groups.
    const groups = [];

    // Iterate over the shuffled array and add each element to a group.
    // When a group is full, start a new group.
    let oneGuy = false;
    if (shuffledArray.length % groupSize == 1) {
        groupSize++;
        oneGuy = true;
    }
    while (shuffledArray.length > 0) {
        const group = shuffledArray.splice(0, groupSize);
        groups.push(group);
        if (oneGuy) {
            groupSize--;
            oneGuy = false;
        }
    }

    // Return the groups.
    return groups;
}

function addNewGroups(){
    let groups = getGroups();
    console.log(groups)
    modalBodyDiv.textContent = "";
    let count = 1;
    if (groups) {
        groups.map(group => {

            createGroup(group, count);
            count++;
        })
    }
    else {
        modalBodyDiv.textContent = "I cannot make groups because the group size of " + "'"+groupSizeInput.value+"'" + " is too large or not a number";
    }

}

function addNewName(){
    appendNames.textContent = "";
    let name = nameInput.value;
    saveToLocalStorage(name);
    let temp = getlocalStorage();
    temp.map(element => {
        createEntry(element);
    });
    reloadPage();
}

function reloadPage() {
    appendNames.textContent = "";
    let temp = getlocalStorage();
    let counter = 0;
    temp.map(element => {
        createEntry(element);
        counter++;
    });
    totalElement.textContent = "Total Names: " + counter;
}

function removeName(name) {
    removeFromLocalStorage(name);
    reloadPage();

}

function createEntry(name) {
    // Create div element
    const divElement = document.createElement('div');
    divElement.id = name;
    divElement.classList.add('flex', 'justify-between', 'border-t-4', 'border-b-4', 'border-solid', 'border-black', 'py-3', 'mb-6');

    // Create p element
    const pElement = document.createElement('p');
    const pText = document.createTextNode(name);
    pElement.appendChild(pText);

    // Create button element
    const buttonElement = document.createElement('button');
    buttonElement.addEventListener('click', function () {
        removeName(name);
    });
    buttonElement.setAttribute('type', 'button');
    buttonElement.classList.add('focus:outline-none', 'text-white', 'bg-red-700', 'hover:bg-red-800', 'focus:ring-4', 'focus:ring-red-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'dark:bg-red-600', 'dark:hover:bg-red-700', 'dark:focus:ring-red-900');
    const buttonText = document.createTextNode('Remove');
    buttonElement.appendChild(buttonText);

    // Append p and button elements to div
    divElement.appendChild(pElement);
    divElement.appendChild(buttonElement);

    appendNames.appendChild(divElement);
}

function createGroup(group, count) {
    let divElement = document.createElement('div');
    let pGroups = document.createElement('p');
    let pNames = document.createElement('p');

    pGroups.textContent = "Group #" + count;

    // if(group.length >1){
    //     pNames.textContent = group.join(', ');
    // }
    // else{
    //     pNames.textContent = group;
    // }
    pNames.textContent = group.length > 1 ? group.join(', ') : group;
    divElement.appendChild(pGroups);
    divElement.appendChild(pNames);
    modalBodyDiv.appendChild(divElement);
}