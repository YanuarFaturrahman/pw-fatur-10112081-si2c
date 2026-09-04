document.addEventListener('DOMContentLoaded', () => {

    const themeBtn = document.createElement('button');
    themeBtn.id = 'theme-toggle';
    themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    document.body.appendChild(themeBtn);

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });

    const nameElement = document.querySelector('.sidebar-name');
    if (nameElement) {
        const originalText = "YANUAR\nFATURRAHMAN";
        nameElement.innerHTML = "";
        let index = 0;

        function typeWriter() {
            if (index < originalText.length) {
                const char = originalText.charAt(index);
                nameElement.innerHTML += char === '\n' ? '<br>' : char;
                index++;
                setTimeout(typeWriter, 80);
            }
        }
        typeWriter();
    }

    const profileImg = document.querySelector('.profile-img-wrap img');
    if (profileImg) {
        profileImg.style.cursor = 'pointer';
        profileImg.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'img-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <img src="${profileImg.src}" alt="Profile Large">
                </div>
            `;
            document.body.appendChild(modal);

            modal.addEventListener('click', () => modal.remove());
        });
    }

    const awards = document.querySelectorAll('.content-section:last-child .timeline-item');
    awards.forEach(award => {
        award.style.cursor = 'pointer';
        award.addEventListener('click', (e) => {
            createParticles(e.clientX, e.clientY);
        });
    });

    function createParticles(x, y) {
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            document.body.appendChild(particle);

            const size = Math.random() * 8 + 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;

            const destinationX = x + (Math.random() - 0.5) * 150;
            const destinationY = y + (Math.random() - 0.5) * 150;

            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${destinationX - x}px, ${destinationY - y}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            }).onfinish = () => particle.remove();
        }
    }

    const pdfBtn = document.getElementById('btn-download-pdf');
    if (pdfBtn) {
        pdfBtn.addEventListener('click', () => {
            window.print();
        });
    }

    const progressBars = document.querySelectorAll('.progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.width;
            }
        });
    }, { threshold: 0.3 });

    progressBars.forEach(bar => observer.observe(bar));

    const sections = document.querySelectorAll('.content-section');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(sec => {
        sec.classList.add('reveal-hidden');
        revealObserver.observe(sec);
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const desc = item.dataset.desc || "Informasi detail kegiatan.";
            const title = item.querySelector('.school, .company')?.innerText || "Detail";
            const role = item.querySelector('.role')?.innerText || "";
            const year = item.querySelector('.year')?.innerText || "";

            const modal = document.createElement('div');
            modal.className = 'img-modal';
            modal.innerHTML = `
                <div class="detail-modal-box">
                    <h3 style="color: #5588cc; margin-bottom: 5px;">${title}</h3>
                    <p style="font-weight: 700; font-size: 13px; color: #666; margin-bottom: 10px;">${year} ${role ? '• ' + role : ''}</p>
                    <hr style="margin: 10px 0; border: none; border-top: 1px solid #eee;">
                    <p style="font-size: 13px; line-height: 1.5; color: #444;">${desc}</p>
                </div>
            `;
            document.body.appendChild(modal);

            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.remove();
            });
        });
    });

    const card = document.querySelector('.cv-container');
    if (card && window.innerWidth > 768) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            card.style.transform = `perspective(1000px) rotateX(${-y / 80}deg) rotateY(${x / 80}deg)`;
            card.style.transition = 'transform 0.1s ease-out';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            card.style.transition = 'transform 0.5s ease';
        });
    }

});