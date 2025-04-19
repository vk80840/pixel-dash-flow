
document.addEventListener('DOMContentLoaded', () => {
    // Navigation handling
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Show corresponding section
            const sectionId = `${link.dataset.section}-section`;
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Initialize dashboard content
    initializeDashboard();
});

function initializeDashboard() {
    const dashboardSection = document.getElementById('dashboard-section');
    
    // Create dashboard cards
    const dashboardHtml = `
        <div class="grid-container">
            <div class="card glass-card">
                <h2>Total Balance</h2>
                <p class="amount">$12,365.75</p>
            </div>
            <div class="card glass-card">
                <h2>Total Team</h2>
                <p class="amount">32</p>
            </div>
            <div class="card glass-card">
                <h2>Active Members</h2>
                <p class="amount">28</p>
            </div>
        </div>
    `;
    
    dashboardSection.innerHTML = dashboardHtml;
}

// You can add more initialization functions for other sections as needed
