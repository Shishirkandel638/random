// API Configuration
const API_BASE = window.location.origin;

// Global state
let siteContent = null;
let currentTheme = 'light';

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    loadSiteContent();
    initializeThemeToggle();
    initializeContactForm();
    initializeSmoothScroll();
    initializeNavbarScroll();
});

// Load site content from API
async function loadSiteContent() {
    try {
        const response = await fetch(`${API_BASE}/api/content`);
        if (!response.ok) throw new Error('Failed to load content');
        
        siteContent = await response.json();
        renderContent();
        setTheme(siteContent.theme || 'light');
    } catch (error) {
        console.error('Error loading content:', error);
        showNotification('Failed to load site content', 'error');
    }
}

// Render content to the page
function renderContent() {
    if (!siteContent) return;

    // Update page title and favicon
    document.getElementById('site-title').textContent = siteContent.siteTitle;
    document.getElementById('favicon').href = siteContent.favicon || '/favicon.ico';

    // Update navbar
    document.getElementById('navbar-brand').textContent = siteContent.navbar.brand;
    renderNavigation();

    // Update hero section
    document.getElementById('hero-logo').textContent = siteContent.logo;
    document.getElementById('hero-title').innerHTML = siteContent.sections.hero.title;
    document.getElementById('hero-subtitle').textContent = siteContent.sections.hero.subtitle;
    
    const heroButton = document.getElementById('hero-button');
    heroButton.textContent = siteContent.sections.hero.buttonText;
    heroButton.href = siteContent.sections.hero.buttonLink;

    // Update about section
    document.getElementById('about-title').textContent = siteContent.sections.about.title;
    renderAboutContent();

    // Update career section
    document.getElementById('career-title').textContent = siteContent.sections.career.title;
    document.getElementById('career-subtitle').textContent = siteContent.sections.career.subtitle;
    renderCareerPaths();

    // Update contact section
    document.getElementById('contact-title').textContent = siteContent.sections.contact.title;
    document.getElementById('contact-subtitle').textContent = siteContent.sections.contact.subtitle;
    renderContactInfo();
}

// Render navigation links
function renderNavigation() {
    const navLinks = document.getElementById('nav-links');
    navLinks.innerHTML = '';
    
    siteContent.navbar.links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.name;
        li.appendChild(a);
        navLinks.appendChild(li);
    });
}

// Render about section content
function renderAboutContent() {
    const aboutContent = document.getElementById('about-content');
    const paragraphs = siteContent.sections.about.content.split('\n\n');
    
    aboutContent.innerHTML = paragraphs.map(paragraph => 
        `<p style="margin-bottom: 1.5rem; line-height: 1.8;">${paragraph}</p>`
    ).join('');

    // Render stats
    const aboutStats = document.getElementById('about-stats');
    aboutStats.innerHTML = siteContent.sections.about.stats.map(stat => `
        <div class="stat-card">
            <h4>${stat.label}</h4>
            <p>${stat.value}</p>
        </div>
    `).join('');
}

// Render career paths
function renderCareerPaths() {
    const careerGrid = document.getElementById('career-grid');
    careerGrid.innerHTML = siteContent.sections.career.paths.map(path => `
        <div class="career-card">
            <div class="career-icon" style="background: ${getCareerIconColor(path.title)};">
                <i class="${path.icon}"></i>
            </div>
            <h3>${path.title}</h3>
            <p>${path.description}</p>
            <div class="career-skills">
                <h4>Key Skills</h4>
                <div class="skill-tags">
                    ${path.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
            <div class="career-info">
                <div class="info-card salary-info">
                    <h4>Salary Range</h4>
                    <p>${path.salary}</p>
                </div>
                <div class="info-card time-info">
                    <h4>Time to Learn</h4>
                    <p>${path.timeToLearn}</p>
                </div>
            </div>
            <button class="btn-primary" style="width: 100%;">Learn More</button>
        </div>
    `).join('');
}

// Get career icon color based on title
function getCareerIconColor(title) {
    const colors = {
        'Graphic Design': '#ec4899',
        'Web Development': '#6366f1',
        'Digital Marketing': '#10b981',
        'Cyber Security': '#ef4444',
        'Data Science': '#8b5cf6',
        'Networking': '#3b82f6'
    };
    return colors[title] || '#9333ea';
}

// Render contact info
function renderContactInfo() {
    const contactDetails = document.getElementById('contact-details');
    const contact = siteContent.sections.contact;
    
    contactDetails.innerHTML = `
        <div class="contact-item">
            <div class="contact-icon" style="background: #dbeafe; color: #2563eb;">
                <i class="fas fa-envelope"></i>
            </div>
            <div>
                <h4>Email</h4>
                <p>${contact.info.email}</p>
            </div>
        </div>
        <div class="contact-item">
            <div class="contact-icon" style="background: #dcfce7; color: #16a34a;">
                <i class="fas fa-phone"></i>
            </div>
            <div>
                <h4>Phone</h4>
                <p>${contact.info.phone}</p>
            </div>
        </div>
        <div class="contact-item">
            <div class="contact-icon" style="background: #ede9fe; color: #9333ea;">
                <i class="fas fa-map-marker-alt"></i>
            </div>
            <div>
                <h4>Location</h4>
                <p>${contact.info.location}</p>
            </div>
        </div>
    `;

    // Render social links
    const socialLinks = document.getElementById('social-links');
    socialLinks.innerHTML = contact.social.map(social => `
        <a href="${social.url}" target="_blank" style="background: ${getSocialColor(social.name)};">
            <i class="${social.icon}"></i>
        </a>
    `).join('');
}

// Get social media brand colors
function getSocialColor(platform) {
    const colors = {
        'GitHub': '#1f2937',
        'LinkedIn': '#2563eb',
        'Facebook': '#3b82f6',
        'Instagram': '#ec4899',
        'Behance': '#1769ff'
    };
    return colors[platform] || '#6b7280';
}

// Theme management
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeIcon = document.querySelector('#theme-toggle i');
    if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Contact form handling
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', handleContactSubmit);
}

async function handleContactSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    try {
        const response = await fetch(`${API_BASE}/api/contact/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showNotification(result.message, 'success');
            e.target.reset();
        } else {
            throw new Error(result.error || 'Failed to send message');
        }
    } catch (error) {
        console.error('Contact form error:', error);
        showNotification(error.message || 'Failed to send message', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

// Smooth scrolling
function initializeSmoothScroll() {
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

// Navbar scroll effect
function initializeNavbarScroll() {
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Export functions for potential use in other scripts
window.portfolioAPI = {
    loadSiteContent,
    setTheme,
    showNotification
};