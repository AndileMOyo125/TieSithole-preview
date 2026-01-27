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

    // 3. ACCORDION HANDLERS
    accordionItems.forEach(item => {
        const trigger = item.querySelector('.accordion-trigger');
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.rotate-icon');

        trigger?.addEventListener('click', () => {
            const isClosing = content?.classList.contains('open');
            
            // Close all open sections first for a clean single-view experience
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

    // 4. INQUIRY FORM LOGIC
    let activeInquiry = 'partnership';

    const updateFormTypeStyles = () => {
        if (activeInquiry === 'partnership') {
            btnPartnership?.classList.replace('bg-white', 'bg-rose-50/50');
            btnPartnership?.classList.replace('border-slate-100', 'border-rose-400');
            btnPartnership?.querySelector('div:first-child')?.classList.replace('text-slate-400', 'text-rose-500');
            btnPartnership?.querySelector('div:last-child')?.classList.replace('text-slate-400', 'text-slate-800');

            btnInvestment?.classList.replace('bg-rose-50/50', 'bg-white');
            btnInvestment?.classList.replace('border-amber-400', 'border-slate-100');
            btnInvestment?.querySelector('div:first-child')?.classList.replace('text-amber-500', 'text-slate-400');
            btnInvestment?.querySelector('div:last-child')?.classList.replace('text-slate-800', 'text-slate-400');
            budgetField?.classList.add('hidden');
        } else {
            btnInvestment?.classList.replace('bg-white', 'bg-rose-50/50');
            btnInvestment?.classList.replace('border-slate-100', 'border-amber-400');
            btnInvestment?.querySelector('div:first-child')?.classList.replace('text-slate-400', 'text-amber-500');
            btnInvestment?.querySelector('div:last-child')?.classList.replace('text-slate-400', 'text-slate-800');

            btnPartnership?.classList.replace('bg-rose-50/50', 'bg-white');
            btnPartnership?.classList.replace('border-rose-400', 'border-slate-100');
            btnPartnership?.querySelector('div:first-child')?.classList.replace('text-rose-500', 'text-slate-400');
            btnPartnership?.querySelector('div:last-child')?.classList.replace('text-slate-800', 'text-slate-400');
            budgetField?.classList.remove('hidden');
        }
    };

    btnPartnership?.addEventListener('click', () => { activeInquiry = 'partnership'; updateFormTypeStyles(); });
    btnInvestment?.addEventListener('click', () => { activeInquiry = 'investment'; updateFormTypeStyles(); });

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Visual feedback
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<span class="animate-pulse">Processing...</span>';
            submitBtn.setAttribute('disabled', 'true');
        }

        setTimeout(() => {
            contactForm.classList.add('hidden');
            formHeader?.classList.add('hidden');
            successMessage?.classList.remove('hidden');

            setTimeout(() => {
                // Revert state for next time
                successMessage?.classList.add('hidden');
                contactForm.classList.remove('hidden');
                formHeader?.classList.remove('hidden');
                contactForm.reset();
                if (submitBtn) {
                    submitBtn.innerHTML = 'Deliver Inquiry';
                    submitBtn.removeAttribute('disabled');
                }
                setView('profile');
            }, 2500);
        }, 1500);
    });

    // 5. SCROLL DOWN EFFECTS WITH CREATIVE ANIMATIONS
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all scroll animation elements
    document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale, .scroll-rotate, .scroll-blur, .scroll-flip, .scroll-bounce, .scroll-expand, .scroll-stagger').forEach(el => {
        observer.observe(el);
    });
});
