// fetching discovery data from json file

async function fetchAttractionData() {
    console.log("Fetching attraction data...");
    
    try {
        const response = await fetch('../chamber/data/attractions.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error fetching attraction data:', error);
        return [];
    }
}

// creating discover cards

function createDiscoveryCards(attractions) {
    const attractionsList = document.getElementById('discover-cards');

    attractionsList.innerHTML = '';

    attractions.forEach(attraction => {
        const attractionCard = document.createElement('div');
        attractionCard.classList.add('attraction-card');
    
        attractionCard.innerHTML = `
            <h2>${attraction.name}</h2>
            <figure>
                <img src="${attraction.image}" alt="${attraction.name}'s image" class="attraction-image" loading="lazy">
                <figcaption>${attraction.name}</figcaption>
            </figure>
            <p>${attraction.description}</p>
            <address>Address: ${attraction.address}</address>

            <button class="learn-more" onclick="window.open('${attraction.website}', '_blank')">Learn More</button>
        `;
        
        attractionsList.appendChild(attractionCard);
    });

}

async function loadAttractions() {
    const attractions = await fetchAttractionData();
    createDiscoveryCards(attractions);
}


document.addEventListener('DOMContentLoaded', loadAttractions);