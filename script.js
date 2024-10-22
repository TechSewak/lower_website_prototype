document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
    });

    // Specialties accordion
    const specialties = [
        { id: 'criminal', title: 'Criminal Cases', description: 'Expert representation in all types of criminal cases, from misdemeanors to felonies.' },
        { id: 'divorce', title: 'Divorce', description: 'Compassionate and skilled handling of divorce proceedings, ensuring fair settlements.' },
        { id: 'marriage', title: 'Court Marriage', description: 'Efficient and legally sound court marriage services for couples.' },
        { id: 'registration', title: 'Court Marriage Registration', description: 'Seamless registration process for court marriages, ensuring legal validity.' },
        { id: 'rent', title: 'Rent Agreement', description: 'Drafting and review of comprehensive rent agreements to protect landlord and tenant rights.' },
    ];

    const specialtiesContainer = document.getElementById('specialties');

    specialties.forEach(specialty => {
        const specialtyElement = document.createElement('div');
        specialtyElement.className = 'bg-white rounded-lg shadow';
        specialtyElement.innerHTML = `
            <button class="w-full px-6 py-4 text-left font-semibold flex justify-between items-center focus:outline-none" data-id="${specialty.id}" aria-expanded="false">
                ${specialty.title}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transform transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div class="px-6 pb-4 hidden" id="content-${specialty.id}">
                <p>${specialty.description}</p>
            </div>
        `;
        specialtiesContainer.appendChild(specialtyElement);

        const button = specialtyElement.querySelector('button');
        const content = specialtyElement.querySelector(`#content-${specialty.id}`);
        const icon = button.querySelector('svg');

        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !isExpanded);
            content.classList.toggle('hidden');
            icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form validation and submission
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const message = form.querySelector('textarea').value;

        if (name && email && message) {
            // Here you would typically send the form data to a server
            // For this example, we'll just log it to the console
            console.log('Form submitted:', { name, email, message });
            alert('Thank you for your message. We will get back to you soon!');
            form.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Intersection Observer for fade-in animations
    const fadeElems = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElems.forEach(elem => {
        appearOnScroll.observe(elem);
    });

    // Dynamic copyright year
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
});