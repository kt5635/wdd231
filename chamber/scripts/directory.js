// creating member directory cards

function createDirectoryCards(members) {
    const membersList = document.getElementById('directory-cards');

    membersList.innerHTML = '';

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');
    
        memberCard.innerHTML = `
            <img src="${member.image}" alt="${member.name}'s image" class="member-image" loading="lazy" />
            <h3>${member.name}</h3>
            <p>Address: ${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>            
        `;
        
        membersList.appendChild(memberCard);
    });

}

async function loadMembers() {
    const memebers = await fetchMemberData();
    createDirectoryCards(memebers);
}


document.addEventListener('DOMContentLoaded', loadMembers);

// toggle between grid view and list view

document.getElementById("card-view-button").addEventListener("click", function() {
    document.getElementById("contact-container").classList.remove("list-view");
    document.getElementById("contact-container").classList.add("card-view");
});

document.getElementById("list-view-button").addEventListener("click", function() {
    document.getElementById("contact-container").classList.remove("card-view");
    document.getElementById("contact-container").classList.add("list-view");
});
