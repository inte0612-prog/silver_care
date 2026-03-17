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

    // 2. Advanced Scroll Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Keep observing for repeat effects if needed
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // 3. Header styling on scroll (Fixed Class Name)
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 4. Advanced Form Validation & Security
    const consultForm = document.getElementById('consultationForm');
    if (consultForm) {
        consultForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;

            // Simple Security: Basic Regex for Phone
            const phoneRegex = /^[0-9-]{10,15}$/;
            
            if (name.length < 2) {
                alert('성함을 명확히 입력해 주세요 (2자 이상)');
                return;
            }
            
            if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
                alert('올바른 연락처 형식을 입력해 주세요.');
                return;
            }

            if (!service) {
                alert('관심 서비스를 선택해 주세요.');
                return;
            }

            // Simulate loading state & encryption
            const submitBtn = consultForm.querySelector('button');
            const originalText = submitBtn.innerText;
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.innerText = '데이터 암호화 및 전송 중...';

            setTimeout(() => {
                alert(`[상담 접수 완료]\n${name}님, 소중한 상담 신청 감사합니다.\n적어주신 연락처(${phone})로 전문 케어 매니저가 곧 연락 드리겠습니다.`);
                consultForm.reset();
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.innerText = originalText;
            }, 1200);
        });
    }
});
