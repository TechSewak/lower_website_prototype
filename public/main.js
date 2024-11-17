document.getElementById('consultationForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        consultationType: document.getElementById('consultationType').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('http://your-server/api/consultations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Consultation request submitted successfully! Please check your email for payment details.');
            document.getElementById('consultationForm').reset();
        } else {
            alert('Error submitting form. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting form. Please try again.');
    }
});