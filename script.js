const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear')
const itemFilter = document.getElementById('filter');

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => addItemToDOM(item));
    checkUI();
}
 

function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    if (checkIfItemExists(newItem)) {
        alert('Item already exists!');
        return;
      }

 
    if (newItem === '') {
        alert('Please add an item');
        return;
    }
   
    addItemToDOM(newItem);

    
    addItemToStorage(newItem);

    checkUI();

    itemInput.value = '';

}
function addItemToDOM(item) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    //add li to DOM
    itemList.appendChild(li);
}

function onClickItem(e){
    if (e.target.parentElement.classList.contains('remove-item')) {
         removeItem(e.target.parentElement.parentElement);
    } 
    //else{
    //  e.target.style.backgroundColor ='lightGreen'
    // }
}

function removeItem(item) {
    if (confirm('Are you sure?')){
        //remove item from DOM
        item.remove();
        //remove item from storage
removeItemFromStorage(item.textContent);

        checkUI();
    }
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage()
    //add new item to array

    itemsFromStorage.push(item);

    //convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage();
    //filter out items to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !==item);
    //reset to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
    }



function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    button.ariaLabel = 'Remove Item'; // Add aria-label attribute
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = `fas ${classes}`; // Add 'fas' to indicate it's a Font Awesome solid icon
    return icon;
}



function clearItems(e) {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
//clear from local storage
localStorage.removeItem('items');

    checkUI();
}

function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLocaleLowerCase();
        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });


}

function checkUI() {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }

}
function checkIfItemExists(item){
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}

function init() {
    //Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);
    checkUI();

}
init();
 
