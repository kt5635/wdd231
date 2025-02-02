// memebrship level options

const memberships = [
    {
      level: "Non Profit Membership",
      price: "Free",
      benifits: ["Community discounts", "Monthly newsletter", "Networking events"]
    },
    {
        level: "Bronze",
        price: "$150 Annually",
        benifits: ["Community discounts", "Monthly newsletter", "Networking events", "Business training events"]
      },
      {
        level: "Silver",
        price: "$300 Annually",
        benifits: ["Community discounts", "Monthly newsletter", "Networking events", "Business training events", "Spotlight on Chameber homepage"]
      },
      {
        level: "Gold",
        price: "$600 Annually",
        benifits: ["Community discounts", "Monthly newsletter", "Networking events", "Business training events", "Spotlight on Chameber homepage", "Networking lunches"]
      }
  ];

//   option function

  function populateMembershipList() {
    const selectElement = document.getElementById('membership-level');

    memberships.forEach(membership => {
        const option = document.createElement('option');
        option.value = membership.level;
        option.textContent = membership.level;
        selectElement.appendChild(option);
    });
  }


  document.addEventListener('DOMContentLoaded', function () {
    populateMembershipList();
  });

// Benefit cards with pop out info

function createBenefitCards() {
    const container = document.getElementById('benefit-container');

    memberships.forEach(membership => {
        const card = document.createElement('div');
        card.classList.add('benefit-card');

        card.innerHTML =`
        <h3>${membership.level}</h3>
        <p class="price">${membership.price}</p>
        <button class="more-info-btn" data-level="${membership.level}">More Info</button>
        `;

        container.appendChild(card);

        setTimeout(() => {
            card.classList.add('animate');
        }, 100)
    });

    document.querySelectorAll('.more-info-btn').forEach(button => {
        button.addEventListener('click', showMemberBenefits);
    });
}

function showMemberBenefits(event)
 {
    const level = event.target.getAttribute('data-level');
    const membership = memberships.find(m =>m.level === level);

    if (membership) {
        const modal = document.getElementById('benefit-info');
        const benefitsList = document.getElementById('level-benefits');

        benefitsList.innerHTML = '';

        membership.benifits.forEach(benefit => {
            const li = document.createElement('li');
            li.textContent = benefit;
            benefitsList.appendChild(li);
        });

        modal.style.display = 'flex';
    
    }
 }  

 function closeModal() {
    document.getElementById('benefit-info').style.display = 'none';
 }

 document.getElementById('close-modal').addEventListener('click', closeModal);

 window.addEventListener('DOMContentLoaded', createBenefitCards);

// hidden timestamp

document.addEventListener('DOMContentLoaded', function() {

    const timestampInput = document.getElementById('timestamp');
    timestampInput.value = Date.now();

  });

// saving form data in local storage to display it on thank you page after submission
document.getElementById('application-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const form = event.target;
    const formData= new FormData(form);
    const formDataObj = {}

    formData.forEach((value, key) => {
        formDataObj[key] = value;
    });

    const queryString = new URLSearchParams(formDataObj).toString();

    window.location.href = `thankyou.html?${queryString}`;

    form.reset();
});
