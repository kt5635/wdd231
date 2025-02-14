//Fetching tutorial information from kanzashi json files

// create tutorial step cards

function createTuturoialCards(steps) {
    const stepsList = document.getElementById('tutorial-cards');

    stepsList.innerHTML = '';

    steps.forEach(step => {
        const stepCard = document.createElement('div');
        stepCard.classList.add('step-card');

        stepCard.innerHTML = `
            <img src="${step.image}" alt="Step ${step.phase}" class="tutorial-img" loading="lazy" />
            <h2>Step ${step.phase}</h2>
            <p>${step.description}</p>
        `;

        stepsList.appendChild(stepCard);
    });

}

async function fetchKanzashiTutorialData() {
    console.log("Fetching tutorial data...");

    try {
        const response = await fetch('../project/data/kanzashi.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching tutorial data', error);
        return [];
    }
}

async function loadKanzashiTutorialData() {
    const steps = await fetchKanzashiTutorialData();
    createTuturoialCards(steps);
}

//Fetching tutorial information from Poppy json files

async function fetchPoppyTutorialData() {
    console.log("Fetching tutorial data...");

    try {
        const response = await fetch('../project/data/poppy.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching tutorial data', error);
        return [];
    }
}

async function loadPoppyTutorialData() {
    const steps = await fetchPoppyTutorialData();
    createTuturoialCards(steps);
}

loadKanzashiTutorialData()
loadPoppyTutorialData()