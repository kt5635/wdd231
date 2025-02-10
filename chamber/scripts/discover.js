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

// get dates and display pop up message based on when the visiter last visted the page

function getDaysBetweenDates(date1, date2) {
    const timeDifference = date2-date1;
    const oneDay = 1000 * 60 *60 *24;
    return Math.floor(timeDifference / oneDay)
}

function showLastVisitMessage() {
    const modal = document.getElementById("visitModal");
    const messageDiv = document.getElementById('visitMessage');
    const lastVisitDate = localStorage.getItem('lastVisitDate');

    if (!lastVisitDate) {
        messageDiv.textContent = 'Welcome! Let us know if you have any questions.';
        localStorage.setItem('lastVisitDate', new Date().toString());
    } else {
        const currentDate = new Date();
        const lastVisit = new Date(lastVisitDate);
        const daysSinceLastVisit = getDaysBetweenDates(lastVisit, currentDate);

        if (daysSinceLastVisit < 1) {
            messageDiv.textContent = 'Back so soon! Awesome!';
        } else {
            const daytext = daysSinceLastVisit === 1 ? 'day' :'days';
            messageDiv.textContent = `You last visited ${daysSinceLastVisit} ${daytext} ago.`;
        }

        localStorage.setItem('lastVisitDate', currentDate.toString());
    }

    modal.style.display = "block";
}

function closeModal() {
    document.getElementById('visitModal').style.display = 'none';
 }

document.getElementById('closeModal').addEventListener('click', closeModal);

document.addEventListener('DOMContentLoaded', loadAttractions);

window.onload = showLastVisitMessage;