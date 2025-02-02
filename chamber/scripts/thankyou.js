// retreving data and displaying it on the thank you page

const currentURL = window.location.href;
const everything = currentURL.split('?');

let formData = everything[1] ? everything[1].split('&') : [];


function show(cup) {
    let result = '';  
    formData.forEach((element) => {
        if (element.startsWith(cup)) {
            result = element.split('=')[1].replace("%40", "@");  
        }
    });
    return result;
}

const fname = show('fname');
const lname = show('lname');
const email = show('email');
const phone = show('phone');
const businessName = show('business-name');
const timestamp = show('timestamp');

const formattedTimestamp = timestamp ? new Date(parseInt(timestamp)).toLocaleString() : "N/A";

const showInfo = document.querySelector('#thank-you-message');
showInfo.innerHTML = `
    <h1>Thank you ${fname} for your application!</h1>
    <h2>We are processing your application with the following information:</h2>
    <p><strong>Name:</strong> ${fname} ${lname}</p>
    <p><strong>Email:</strong> ${email} | <strong>Phone:</strong> ${phone}</p>
    <p><strong>Business Name:</strong> ${businessName}</p>
    <p><strong>Timestamp:</strong> ${formattedTimestamp}</p>
`;
