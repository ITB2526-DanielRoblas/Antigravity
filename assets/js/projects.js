async function loadProjects(limit = null) {
    const container = document.getElementById('projects-container');
    if (!container) return;

    try {
        const response = await fetch('data/projects.json');
        let projects = await response.json();

        if (limit) {
            projects = projects.slice(0, limit);
        }

        container.innerHTML = projects.map(project => `
            <div class="card reveal">
                <div class="card-image-container">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="card-content">
                    <h3>${project.title}</h3>
                    <p style="color: #a1a1a6;">${project.description}</p>
                    <a href="${project.pdf}" class="btn btn-primary" style="width: fit-content;" target="_blank">Leer más</a>
                </div>
            </div>
        `).join('');

        // Re-run animation observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const limit = document.body.dataset.page === 'home' ? 2 : null;
    loadProjects(limit);
});
