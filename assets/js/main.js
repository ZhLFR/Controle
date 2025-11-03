const cart = [];

const cartToggle = document.querySelector('.cart__toggle');
const cartPanel = document.querySelector('.cart__panel');
const cartCount = document.querySelector('.cart__count');
const cartItemsContainer = document.querySelector('.cart__items');
const cartTotalValue = document.querySelector('.cart__total-value');

const productButtons = document.querySelectorAll('[data-product]');

function formatCurrency(value) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(value);
}

function updateCartDisplay() {
    if (!cartCount || !cartItemsContainer || !cartTotalValue) {
        return;
    }

    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'Votre panier est vide.';
        emptyMessage.classList.add('cart__item');
        cartItemsContainer.appendChild(emptyMessage);
        cartTotalValue.textContent = formatCurrency(0);
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const li = document.createElement('li');
        li.classList.add('cart__item');

        const nameSpan = document.createElement('span');
        nameSpan.textContent = `${item.name} x${item.quantity}`;

        const priceSpan = document.createElement('span');
        priceSpan.textContent = formatCurrency(item.price * item.quantity);

        const removeBtn = document.createElement('button');
        removeBtn.setAttribute('type', 'button');
        removeBtn.className = 'cart__remove';
        removeBtn.innerHTML = '✕';
        removeBtn.addEventListener('click', () => {
            cart.splice(index, 1);
            updateCartDisplay();
        });

        li.appendChild(nameSpan);
        li.appendChild(priceSpan);
        li.appendChild(removeBtn);

        cartItemsContainer.appendChild(li);
    });

    cartTotalValue.textContent = formatCurrency(total);
}

productButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const name = button.dataset.product;
        const price = Number(button.dataset.price);

        const existing = cart.find((item) => item.name === name);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCartDisplay();

        if (cartPanel && cartToggle) {
            cartPanel.hidden = false;
            cartToggle.setAttribute('aria-expanded', 'true');
        }
    });
});

if (cartToggle) {
    cartToggle.addEventListener('click', () => {
        const isExpanded = cartToggle.getAttribute('aria-expanded') === 'true';
        cartToggle.setAttribute('aria-expanded', String(!isExpanded));
        cartPanel.hidden = isExpanded;
    });
}

const faqButtons = document.querySelectorAll('.faq__question');

faqButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!expanded));

        const answer = button.nextElementSibling;
        if (!answer) return;

        if (expanded) {
            answer.hidden = true;
        } else {
            answer.hidden = false;
        }
    });
});

const contactForm = document.querySelector('.contact__form');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name');

        const confirmation = document.createElement('p');
        confirmation.className = 'form__confirmation';
        confirmation.textContent = `Merci ${name || 'à vous'} ! Notre équipe reviendra vers vous sous 24h.`;

        contactForm.reset();

        const previousConfirmation = contactForm.querySelector('.form__confirmation');
        if (previousConfirmation) {
            previousConfirmation.remove();
        }

        contactForm.appendChild(confirmation);
    });
}

const newsletterForm = document.querySelector('.newsletter__form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        newsletterForm.reset();
        const note = newsletterForm.nextElementSibling;
        if (note) {
            note.textContent = 'Merci ! Un email de confirmation vient de vous être envoyé.';
        }
    });
}

const supportsMatchMedia = typeof window.matchMedia === 'function';
const prefersReducedMotion = supportsMatchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

const animatedElements = document.querySelectorAll('[data-animate]');

if (animatedElements.length) {
    if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    target.classList.add('is-visible');
                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -10% 0px'
        });

        animatedElements.forEach((element) => {
            const delay = element.dataset.animateDelay;
            if (delay) {
                element.style.setProperty('--animate-delay', delay);
            }
            observer.observe(element);
        });
    } else {
        animatedElements.forEach((element) => {
            element.classList.add('is-visible');
        });
    }
}

const tiltElements = document.querySelectorAll('[data-tilt]');

if (tiltElements.length && !prefersReducedMotion.matches) {
    tiltElements.forEach((element) => {
        const handlePointerMove = (event) => {
            if (event.pointerType === 'touch') {
                return;
            }

            const bounds = element.getBoundingClientRect();
            if (!bounds.width || !bounds.height) {
                return;
            }

            const x = event.clientX - bounds.left;
            const y = event.clientY - bounds.top;
            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;

            const rotateY = ((x - centerX) / centerX) * 8;
            const rotateX = -((y - centerY) / centerY) * 6;

            element.style.setProperty('--tiltX', `${rotateX.toFixed(2)}deg`);
            element.style.setProperty('--tiltY', `${rotateY.toFixed(2)}deg`);
            element.classList.add('is-tilting');
        };

        const resetTilt = () => {
            element.style.setProperty('--tiltX', '0deg');
            element.style.setProperty('--tiltY', '0deg');
            element.classList.remove('is-tilting');
        };

        element.addEventListener('pointermove', handlePointerMove);
        element.addEventListener('pointerleave', resetTilt);
        element.addEventListener('pointerup', resetTilt);
        element.addEventListener('touchend', resetTilt);
    });
}
