// CRYSTALLZ PROFILE ENGINE (VANILLA JS)

document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM ELEMENTS
    const profileView = document.getElementById('profile-view');
    const formView = document.getElementById('form-view');
    const showFormBtn = document.getElementById('show-form-btn');
    const navCollaborateBtn = document.getElementById('nav-collaborate-btn');
    const backToProfileBtn = document.getElementById('back-to-profile');
    
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    const btnPartnership = document.getElementById('btn-partnership');
    const btnInvestment = document.getElementById('btn-investment');
    const budgetField = document.getElementById('budget-field');
    const contactForm = document.getElementById('contact-form');
    const formHeader = document.getElementById('form-header');
    const successMessage = document.getElementById('success-message');
    const serviceQuoteBtns = document.querySelectorAll('.service-quote-btn');

    // NEW DOM ELEMENTS FOR REEL
    const reelPopup = document.getElementById('reel-popup');
    const reelMedia = document.getElementById('reel-media');
    const reelCampaignTitle = document.getElementById('reel-campaign-title');

    // 2. UI STATE MANAGEMENT (Navigation)
    const setView = (view) => {
        if (view === 'form') {
            profileView?.classList.add('hidden');
            formView?.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'instant' });
        } else {
            formView?.classList.add('hidden');
            profileView?.classList.remove('hidden');
        }
    };

    showFormBtn?.addEventListener('click', () => setView('form'));
    navCollaborateBtn?.addEventListener('click', () => setView('form'));
    backToProfileBtn?.addEventListener('click', () => setView('profile'));
    serviceQuoteBtns.forEach(btn => btn.addEventListener('click', () => setView('form')));

    // 3. ACCORDION HANDLERS
    accordionItems.forEach(item => {
        const trigger = item.querySelector('.accordion-trigger');
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.rotate-icon');

        trigger?.addEventListener('click', () => {
            const isClosing = content?.classList.contains('open');
            accordionItems.forEach(el => {
                el.querySelector('.accordion-content')?.classList.remove('open');
                el.querySelector('.rotate-icon')?.classList.remove('open');
                el.classList.remove('shadow-xl', 'border-rose-100', 'ring-2', 'ring-rose-50/50');
            });

            if (!isClosing) {
                content?.classList.add('open');
                icon?.classList.add('open');
                item.classList.add('shadow-xl', 'border-rose-100', 'ring-2', 'ring-rose-50/50');
            }
        });
    });

    // 4. INQUIRY FORM LOGIC (Existing)
    let activeInquiry = 'partnership';
    const updateFormTypeStyles = () => {
        if (activeInquiry === 'partnership') {
            btnPartnership?.classList.replace('bg-white', 'bg-rose-50/50');
            btnInvestment?.classList.replace('bg-rose-50/50', 'bg-white');
            budgetField?.classList.add('hidden');
        } else {
            btnInvestment?.classList.replace('bg-white', 'bg-rose-50/50');
            btnPartnership?.classList.replace('bg-rose-50/50', 'bg-white');
            budgetField?.classList.remove('hidden');
        }
    };

    btnPartnership?.addEventListener('click', () => { activeInquiry = 'partnership'; updateFormTypeStyles(); });
    btnInvestment?.addEventListener('click', () => { activeInquiry = 'investment'; updateFormTypeStyles(); });

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.innerHTML = 'Processing...';
        setTimeout(() => {
            contactForm.classList.add('hidden');
            formHeader?.classList.add('hidden');
            successMessage?.classList.remove('hidden');
            setTimeout(() => {
                successMessage?.classList.add('hidden');
                contactForm.classList.remove('hidden');
                formHeader?.classList.remove('hidden');
                contactForm.reset();
                if (submitBtn) submitBtn.innerHTML = 'Deliver Inquiry';
                setView('profile');
            }, 2500);
        }, 1500);
    });

    // 5. SCROLL EFFECTS (Existing)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-fade-in, .scroll-stagger, .scroll-blur').forEach(el => observer.observe(el));

    // 6. BRAND REEL POPUP LOGIC (NEW)
    window.openReel = (title, mediaSrc) => {
        reelCampaignTitle.innerText = title;
        reelMedia.src = mediaSrc;
        reelPopup.classList.remove('hidden');
        reelPopup.classList.add('flex');
        document.body.style.overflow = 'hidden'; // Stop background scroll
    };

    window.closeReel = () => {
        reelPopup.classList.add('hidden');
        reelPopup.classList.remove('flex');
        document.body.style.overflow = ''; // Resume scroll
        reelMedia.src = ''; // Clear media
    };

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeReel();
    });
});