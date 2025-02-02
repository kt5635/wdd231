// retreving data from local storage and displaying it on the thank you page

window.addEventListener('load', function() {

    const formData = JSON.parse(localStorage.getItem('formData'));

    if (formData) {

        document.getElementById('thank-you-message').innerHTML = `
            <h1>Thank you ${formData.fname} ${formData.lname} for your application!</h1>
            <h2>We are processing your information</h2>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Business Name:</strong> ${formData['business-name']} 
            <p>${new Date(parseInt(formData.timestamp))}</p>
        `;
    } else {

        document.getElementById('thank-you-message').innerHTML = `
            <h1>Thank you for your application!</h1>
            <h2>We encountered an issue while processing your data.</h2>
        `;
    }
}); 