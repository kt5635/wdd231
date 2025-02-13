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

    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('inventory-card');

        itemCard.innerHTML = `
            <h2>Step ${item.name}</h2>
            <img src="${item.image}" alt="Step ${item.phase}" class="inventory-img" loading="lazy" />
            <p>Inventory Type: ${item.type}</p>
            <p>${item.amount} ${item.measure} ${item.amount > 1 ? 's' : ''} of ${item.color}</p>
            <h3>Usage:</h3>
            <ul>
                ${item.usage.map(usage => `<li>${usage}</li>`).join('')}
            </ul>
        `;

        itemsList.appendChild(itemCard);
    });

}

loadInventoryData()