// Menu

const menuText = document.getElementById('menu-text');
const menu = document.getElementById('menu');

menuText.addEventListener('click', function() {
    menu.classList.toggle('active');
});

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

const pattern = [
    {
        flowerName: "Kanzashi",
        description: "This type of ribbon flower is called Kanzashi. Usually made out of double sided satin ribbon.",
        difficultyLevel: "Medium",
        image: "images/kanzashi-card.webp",
        alt: "Ribbon Flower",
        tutorialLink: "kanzashi.html"
    },
    {
        flowerName: "Poppy",
        description: "This Ribbon flower closely resembles a flower called a Poppy. This is an easy flower for beginners.",
        difficultyLevel: "Easy",
        image: "images/simple-card.webp",
        alt: "Ribbon Flower",
        tutorialLink: "poppy.html"
    }
];

function displayPatterns() {
    const container =document.querySelector('.pattern-card-container');

    pattern.forEach(item => {
        const patternCard = document.createElement('div');
        patternCard.classList.add('pattern-card');

        const image = document.createElement('img');
        image.src = item.image;
        image.alt =item.alt;
        image.loading = 'lazy';

        const title = document.createElement('h2');
        title.textContent = item.flowerName;

        const description = document.createElement('p');
        description.textContent = item.description;

        const difficulty = document.createElement('p');
        difficulty.classList.add('difficulty'); 
        difficulty.textContent = `Difficulty: ${item.difficultyLevel}`;

        const link = document.createElement('a');
        link.href = item.tutorialLink; 
        link.textContent = "View Tutorial";

        patternCard.appendChild(image);
        patternCard.appendChild(title);
        patternCard.appendChild(description);
        patternCard.appendChild(difficulty);
        patternCard.appendChild(link);

        container.appendChild(patternCard);
        
    });
}

window.onload = displayPatterns;


// gets current date
const d = new Date();
let year = d.getFullYear();
document.getElementById("currentyear").innerHTML = year;

// last modified date

const date = new Date(document.lastModified);
document.getElementById("lastModified").innerHTML = date;