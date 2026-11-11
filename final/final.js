const grid  = document.querySelector('.grid');
const btn   = document.querySelector('.button .y-button');
const texts = document.querySelectorAll('.card [data-new]');

// remember each starting value so the button can switch back
texts.forEach(el => {
    el.dataset.old = el.textContent.trim();
});

function animateNumber(el, target, duration = 1200) {
    const from = parseFloat(el.textContent);
    const to = parseFloat(target);
    const decimals = Math.max(
        (el.textContent.split('.')[1] || '').replace('%', '').length,
        (target.split('.')[1] || '').replace('%', '').length
    );

    cancelAnimationFrame(el._raf);
    const start = performance.now();

    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // starts fast, slows at the end
        const value = from + (to - from) * eased;

        el.textContent = value.toFixed(decimals) + '%';

        if (progress < 1) {
            el._raf = requestAnimationFrame(step);
        } else {
            el.textContent = target; // end on the exact value
        }
    }

    el._raf = requestAnimationFrame(step);
}

btn.addEventListener('click', () => {
    grid.classList.toggle('active');
    const isActive = grid.classList.contains('active');

    texts.forEach(el => {
        animateNumber(el, isActive ? el.dataset.new : el.dataset.old);
    });
});