// fetch data from URL or storage and display it for review

const currentURL = window.location.href;
const everything = currentURL.split('?');

let formData = everything[1] ? everything[1].split('&') : [];

function show(cup) {
    let result = '';  
    formData.forEach((element) => {
        if (element.startsWith(cup)) {
            result = element.split('=')[1];  
        }
    });
    return result;
}

const itemName = show('itemName');
const amount = show('amount');
const type = show('type');
const color = show('color');
const usage = show('usage') ? show('usage').split(',') : [];  
const image = show('image');

const savedItem = JSON.parse(localStorage.getItem('inventoryItem'));

const showInfo = document.querySelector('#reviewNewInventory');
showInfo.innerHTML = `
    <h2>Item Name: ${savedItem?.name || itemName}</h2>
    <p>Amount: ${savedItem?.amount || amount}</p>
    <p>Type: ${savedItem?.type || type}</p>
    <p>Measure: ${savedItem?.measure || 'N/A'}</p>
    <p>Color: ${savedItem?.color || color}</p>
    <h3>Usage:</h3>
    <ul>
        ${savedItem?.usage?.length > 0 
            ? savedItem.usage.map(usage => `<li>${usage}</li>`).join('') 
            : '<li>No usages selected</li>'}
    </ul>
`;

const imageBase64 = localStorage.getItem('imageBase64');
if (imageBase64) {
    document.querySelector('#reviewNewInventory').innerHTML += `<img src="${imageBase64}" alt="Item Image"/>`;
}