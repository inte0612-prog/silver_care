document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('bi-list');
                icon.classList.add('bi-x-lg');
            } else {
                icon.classList.remove('bi-x-lg');
                icon.classList.add('bi-list');
            }
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('bi-x-lg');
                icon.classList.add('bi-list');
            });
        });
    }

    // 2. Scroll Animation (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));

    // 3. Header styling on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
            header.style.backgroundColor = 'rgba(253, 251, 247, 0.98)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
            header.style.backgroundColor = 'rgba(253, 251, 247, 0.95)';
        }
    });

    // 4. Form Submission Alert
    const consultForm = document.getElementById('consultationForm');
    if (consultForm) {
        consultForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            // 간단한 시뮬레이션
            alert(`${name}님, 상담 신청이 완료되었습니다.\n가장 빠른 시일 내에 전문 상담사가 연락드리겠습니다. 감사합니다.`);
            consultForm.reset();
        });
    }
});
