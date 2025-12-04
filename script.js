document.addEventListener('DOMContentLoaded', () => {

    // --- Chart.js Configuration ---

    // Users by Age Chart
    const ctxUsers = document.getElementById('usersChart').getContext('2d');
    const usersChart = new Chart(ctxUsers, {
        type: 'doughnut',
        data: {
            labels: ['18-29 años', '30-49 años', '50-64 años', '65+ años'],
            datasets: [{
                label: '% de Usuarios',
                data: [84, 81, 73, 45],
                backgroundColor: [
                    '#0f4c75', // Primary
                    '#3282b8', // Secondary
                    '#bbe1fa', // Accent
                    '#1b262c'  // Dark
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: "'Inter', sans-serif",
                            size: 14
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Uso de Redes Sociales por Edad',
                    font: {
                        family: "'Poppins', sans-serif",
                        size: 18,
                        weight: '600'
                    },
                    color: '#333',
                    padding: 20
                }
            }
        }
    });

    // Growth Chart
    const ctxGrowth = document.getElementById('growthChart').getContext('2d');
    const growthChart = new Chart(ctxGrowth, {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'Usuarios Activos (Miles de Millones)',
                data: [3.7, 4.1, 4.4, 4.7, 4.9, 5.41],
                borderColor: '#3282b8',
                backgroundColor: 'rgba(50, 130, 184, 0.2)',
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: '#f0f0f0'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Crecimiento Global de Usuarios',
                    font: {
                        family: "'Poppins', sans-serif",
                        size: 18,
                        weight: '600'
                    },
                    color: '#333',
                    padding: 20
                }
            }
        }
    });

    // --- Stats Counter Animation ---
    const statsSection = document.querySelector('#stats');
    const statsNumbers = document.querySelectorAll('.stat-box .number[data-target]');
    let started = false;

    function startCount(el) {
        const target = parseInt(el.dataset.target);
        const count = +el.innerText;
        const increment = target / 100; // Adjust speed

        if (count < target) {
            el.innerText = Math.ceil(count + increment);
            setTimeout(() => startCount(el), 20);
        } else {
            el.innerText = target.toLocaleString(); // Format number
        }
    }

    // Intersection Observer for Stats
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                statsNumbers.forEach(num => startCount(num));
                started = true;
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);


    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }

                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');

    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');

        // Simple style toggle for demo purposes
        if (nav.classList.contains('active')) {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '70px';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.background = '#fff';
            nav.style.padding = '20px';
            nav.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
        } else {
            nav.style.display = ''; // Reset to CSS default
        }
    });

    // Reset nav style on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            nav.style.display = '';
        }
    });

});
