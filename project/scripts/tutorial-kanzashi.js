
// fetching tutorial information from kanzashi json files

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


loadKanzashiTutorialData()
