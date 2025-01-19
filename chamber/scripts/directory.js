// Menu

const menuText = document.getElementById('menu-text');
const menu = document.getElementById('menu');

menuText.addEventListener('click', function() {
    menu.classList.toggle('active');
});

// fetching directory information from json file

async function fetchMemberData() {
    try {
        const response = await fetch('../chamber/data/members.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const membersList = document.getElementById('directory-cards');
    
        data.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');

            memberCard.innerHTML = `
                <img src="${member.image}" alt="${member.name}'s image" class="member-image" loading="lazy" />
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">${member.website}</a></p>            
            `;
            
            membersList.appendChild(memberCard);
        });
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

window.onload = fetchMemberData

// toggle between grid view and list view

document.getElementById("card-view-button").addEventListener("click", function() {
    document.getElementById("contact-container").classList.remove("list-view");
    document.getElementById("contact-container").classList.add("card-view");
});

document.getElementById("list-view-button").addEventListener("click", function() {
    document.getElementById("contact-container").classList.remove("card-view");
    document.getElementById("contact-container").classList.add("list-view");
});

// gets current date
const d = new Date();
let year = d.getFullYear();
document.getElementById("currentyear").innerHTML = year;

// last modified date

const date = new Date(document.lastModified);
document.getElementById("lastModified").innerHTML = date;