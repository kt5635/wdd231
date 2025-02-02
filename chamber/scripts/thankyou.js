// retreving data from local storage and displaying it on the thank you page

window.addEventListener('load', function() {

    const params = new URLSearchParams(window.location.search);

    const fname = params.get('fname');
    const lname = params.get('lname');
    const email = params.get('email');
    const phone = params.get('phone');
    const businessName = params.get('business-name');
    const timestamp = params.get('timestamp');

    const formattedTimestamp = timestamp ? new Date(parseInt(timestamp)).toLocaleString() : "N/A";


    document.getElementById('thank-you-message').innerHTML = `
        <h1>Thank you ${fname} for your application!</h1>
        <h2>We are processing your application with the following information:</h2>
        <p><strong>Name:</strong> ${fname} ${lname}</p>
        <p><strong>Email:</strong> ${email} | <strong>Phone:</strong> ${phone}</p>
        <p><strong>Business Name:</strong> ${businessName}</p>
        <p>${formattedTimestamp}</p>
    `;
});