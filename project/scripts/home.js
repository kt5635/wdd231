
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