
// inventory form

const newInventoryForm = document.getElementById('newInventoryForm');
const openNewInventoryFormBtn = document.getElementById('openNewInventoryFormBtn');
const closeNewInventoryFormBtn = document.getElementById('closeNewInventoryFormBtn');

openNewInventoryFormBtn.addEventListener('click', () => {
    newInventoryForm.style.display = 'block';  
    inventoryUsedForm.style.display = 'none';  
});



closeNewInventoryFormBtn.addEventListener('click', () => {
    newInventoryForm.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === newInventoryForm) {
        newInventoryForm.style.display = 'none';
    }
});


// save to local storage to display new inventory

function saveToLocalStorage() {
    const itemName = document.getElementById('itemName').value;
    const amount = document.getElementById('amount').value;
    const type = document.getElementById('type').value;
    const measure = document.querySelector('input[name="measure"]:checked')?.value;
    const color = document.getElementById('color').value;
    const usage = Array.from(document.querySelectorAll('input[name="usage"]:checked')).map(checkbox => checkbox.value);

    const imageFile = document.getElementById('image').files[0];
    let imagePath = '';

    if (imageFile) {
        const reader = new FileReader();
        reader.onloadend = function() {
            imagePath = reader.result;  
            saveInventoryItemToLocalStorage(imagePath); 
        };

        reader.readAsDataURL(imageFile);
    } else {
        saveInventoryItemToLocalStorage(imagePath);  
    }

}

function saveInventoryItemToLocalStorage(imagePath) {
    const itemName = document.getElementById('itemName').value;
    const amount = document.getElementById('amount').value;
    const type = document.getElementById('type').value;
    const measure = document.querySelector('input[name="measure"]:checked')?.value;
    const color = document.getElementById('color').value;
    const usage = Array.from(document.querySelectorAll('input[name="usage"]:checked')).map(checkbox => checkbox.value);

    const inventoryItem = {
        name: itemName,
        amount: amount,
        type: type,
        measure: measure,
        color: color,
        usage: usage,
        image: imagePath  
    };

    const inventoryItems = JSON.parse(localStorage.getItem('inventoryItems')) || [];
    inventoryItems.push(inventoryItem);
    localStorage.setItem('inventoryItems', JSON.stringify(inventoryItems));
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    
    const reader = new FileReader();
    reader.onloadend = function() {
        const base64String = reader.result;
        localStorage.setItem('imageBase64', base64String);
    };
    
    if (file) {
        reader.readAsDataURL(file);
    }
}

document.getElementById('image').addEventListener('change', handleFileUpload);

// create inventory cards
async function fetchInventoryData() {
    console.log("Fetching Inventory data...");

    try {
        const response = await fetch('../project/data/inventory.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching inventory data', error);
        return [];
    }
}

async function loadInventoryData() {
    const items = await fetchInventoryData();

    const localStorageData = JSON.parse(localStorage.getItem('inventoryItems')) || [];

    const allItems = [...items, ...localStorageData];


    createInventoryCards(allItems);
}

function createInventoryCards(items) {
    const itemsList = document.getElementById("viewInventory");
    itemsList.innerHTML = '';

    if (items.length === 0) {
        itemsList.innerHTML = "<p>No inventory data available.</p>";
        return;
    }

    let inventoryContent = '';

    items.forEach(item => {
        const image = item.image ? `<img src="${item.image}" alt="${item.name}" class="inventory-img" loading="lazy" style="max-width: 300px; max-height: 300px;" />` 
                                : '<img src="default-placeholder.jpg" alt="No Image" class="inventory-img" loading="lazy" style="max-width: 300px; max-height: 300px;" />';

        inventoryContent += `
            <div class="inventory-card">
                <h2>Name: ${item.name}</h2>
                ${image}
                <div class="description">
                    <p>Material Type: ${item.type}</p>
                    <p>${item.amount} ${item.measure}${item.amount > 1 ? 's' : ''} of ${item.color} ${item.type}</p>
                </div>
                <h3>Usage:</h3>
                <ul>
                    ${item.usage.map(usage => `<li>${usage}</li>`).join('')}
                </ul>
            </div>
        `;
    });

    itemsList.innerHTML = inventoryContent;
}

loadInventoryData();
