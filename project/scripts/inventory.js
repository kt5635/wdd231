// create iventory cards
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
    createInventoryCards(items);
}

function createInventoryCards(items) {
    const itemsList = document.getElementById("viewInventory");
    itemsList.innerHTML = '';

    if (items.length === 0 ) {
        itemsList.innerHTML = "<p> No inventory data available. </p>";
        return;
    }

    let inventoryContent = '';

    items.forEach(item => {
        inventoryContent += `
            <div class="inventory-card">
                <h2>Name: ${item.name}</h2>
                <img src="${item.image}" alt="Name ${item.name} phase ${item.phase}" class="inventory-img" loading="lazy" />
                <div class=" description">
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

const newInventoryForm = document.getElementById('newInventoryForm');
const inventoryUsedForm = document.getElementById('inventoryUsedForm');
const openNewInventoryFormBtn = document.getElementById('openNewInventoryFormBtn');
const openInventoryUsedFormBtn = document.getElementById('openInventoryUsedFormBtn');
const closeNewInventoryFormBtn = document.getElementById('closeNewInventoryFormBtn');
const closeInventoryUsedFormBtn = document.getElementById('closeInventoryUsedFormBtn');

openNewInventoryFormBtn.addEventListener('click', () => {
    newInventoryForm.style.display = 'block';  
    inventoryUsedForm.style.display = 'none';  
});

openInventoryUsedFormBtn.addEventListener('click', () => {
    inventoryUsedForm.style.display = 'block'; 
    newInventoryForm.style.display = 'none';  
});


closeNewInventoryFormBtn.addEventListener('click', () => {
    newInventoryForm.style.display = 'none';
});


closeInventoryUsedFormBtn.addEventListener('click', () => {
    inventoryUsedForm.style.display = 'none';
});


window.addEventListener('click', (event) => {
    if (event.target === newInventoryForm) {
        newInventoryForm.style.display = 'none';
    }
    if (event.target === inventoryUsedForm) {
        inventoryUsedForm.style.display = 'none';
    }
});