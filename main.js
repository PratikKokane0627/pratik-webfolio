// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.section-title, .skill-category, .project-card, .about-text, .contact-form, .contact-info, .education-card, .cert-card, .about-image-wrapper, .about-stats').forEach(el => {
    observer.observe(el);
});

// Active nav link
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Array to store all form submissions
let messagesList = [];

// Form submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Create message object with current timestamp
    const formData = {
        id: Date.now(), // Unique ID using timestamp
        name: this.name.value,
        email: this.email.value,
        subject: this.subject.value,
        message: this.message.value,
        timestamp: new Date().toISOString(),
        status: 'unread'
    };

    // Add the new message to the array
    messagesList.push(formData);

    // Log the new message and all messages (for demonstration)
    console.log('New Message:', formData);
    console.log('All Messages:', messagesList);

    const submitBtn = this.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            this.reset();
            alert(`Thank you for your message, ${formData.name}! I will get back to you soon.\n\nMessage ID: ${formData.id}`);
        }, 2000);
    }, 1500);
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Resume Download Functionality
document.getElementById('downloadResume').addEventListener('click', function (e) {
    e.preventDefault();

    // Replace this URL with the actual path to your resume file
    const resumeUrl = 'resume/Pratik_Kokane_Resume.pdf';

    // Add loading state to button
    const originalText = this.innerHTML;
    this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Downloading...';
    this.style.pointerEvents = 'none';

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Pratik_Kokane_Resume.pdf'; // The name that will be used when downloading
    link.target = '_blank';

    // Handle download error
    link.onerror = () => {
        this.innerHTML = originalText;
        this.style.pointerEvents = 'auto';
        alert('Sorry, the resume file is not available at the moment. Please try again later.');
    };

    // Simulate download process (remove setTimeout in production and replace with actual file check)
    setTimeout(() => {
        // Reset button state
        this.innerHTML = originalText;
        this.style.pointerEvents = 'auto';

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, 1500);
});

