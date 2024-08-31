// Initialize first step
document.getElementById('step-1').style.display = 'block';

// Cost per passenger for each destination
const fareRates = {
    'Mabuhay': 30,
    'Buena Rosario': 20,
    'St. Vincent College of Cabuyao': 12,
    'Mamatid Brgy. Hall': 15
};

function nextStep(step) {
    document.querySelectorAll('.form-step').forEach(step => step.style.display = 'none');
    document.getElementById(`step-${step}`).style.display = 'block';
}

function checkAvailability() {
    const numPassengers = parseInt(document.getElementById('num-passengers').value);
    const arrivalLocation = document.getElementById('arrival-location').value;

    if (numPassengers > 4 || numPassengers < 1) {
        alert("Please enter a valid number of passengers (1-4).");
        return;
    }

    // Example availability logic
    const availability = 5 - numPassengers;

    if (availability > 0) {
        const totalFare = numPassengers * fareRates[arrivalLocation];
        document.getElementById('availability').innerHTML = `
            <p>Available tricycles: ${availability}</p>
            <p>Total Fare: ${totalFare} Pesos</p>
        `;
        localStorage.setItem('totalFare', totalFare); // Save the total fare for later use
    } else {
        document.getElementById('availability').innerHTML = '<p>No tricycles available at this time.</p>';
    }
}

function generateTicket() {
    const departureTime = document.getElementById('departure-time').value;
    const departureLocation = document.getElementById('departure-location').value;
    const arrivalLocation = document.getElementById('arrival-location').value;
    const customerName = document.getElementById('customer-name').value;
    const contactNumber = document.getElementById('contact-number').value;
    const email = document.getElementById('email').value;
    const numPassengers = parseInt(document.getElementById('num-passengers').value);
    const paymentMethod = document.getElementById('payment-method').value;
    const totalFare = localStorage.getItem('totalFare'); // Retrieve the stored total fare

    if (!departureTime || !customerName || !contactNumber || !email || !numPassengers || !paymentMethod) {
        alert("Please fill out all fields before proceeding.");
        return;
    }

    const ticketInfo = {
        departureTime: departureTime,
        departureLocation: departureLocation,
        arrivalLocation: arrivalLocation,
        customerName: customerName,
        contactNumber: contactNumber,
        email: email,
        numPassengers: numPassengers,
        paymentMethod: paymentMethod,
        totalFare: totalFare
    };

    try {
        localStorage.setItem('ticketInfo', JSON.stringify(ticketInfo));
        window.location.href = 'ticket.html';
    } catch (e) {
        alert("An error occurred while saving the ticket information.");
        console.error("Error saving to localStorage: ", e);
    }
}
