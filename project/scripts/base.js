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


// gets current date
const d = new Date();
let year = d.getFullYear();
document.getElementById("currentyear").innerHTML = year;

// last modified date

const date = new Date(document.lastModified);
document.getElementById("lastModified").innerHTML = date;