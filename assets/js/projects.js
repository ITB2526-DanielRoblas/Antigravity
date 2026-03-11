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
                <img src="${project.image}" alt="${project.title}" class="card-icon">
                <h3>${project.title}</h3>
                <div class="tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <p>${project.description}</p>
                <a href="${project.pdf}" class="btn btn-primary" target="_blank">Ver Proyecto (PDF)</a>
            </div>
        `).join('');

        // Re-run animation observer for new elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    } catch (error) {
        console.error('Error loading projects:', error);
        container.innerHTML = '<p>Error cargando los proyectos.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const limit = document.body.dataset.page === 'home' ? 2 : null;
    loadProjects(limit);
});
