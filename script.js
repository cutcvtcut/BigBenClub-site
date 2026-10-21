const menuToggle = document.querySelector('.menu-toggle');
const mainMenu = document.querySelector('.main-menu');

menuToggle.addEventListener('click', () => {
    const isOpen = mainMenu.classList.toggle('is-open');

    menuToggle.setAttribute('aria-expanded', isOpen);
});

mainMenu.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        mainMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

const FORM_ENDPOINT = '';

const registrationForm = document.querySelector('#registration-form');
const formStatus = document.querySelector('.form-status');

registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!FORM_ENDPOINT) {
        formStatus.textContent =
            'Демо-режим: отправка заявок ещё не подключена. Позвоните нам: +7 (912) 947-80-65';
        return;
    }

    const submitButton = registrationForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;               // защита от двойного нажатия
    formStatus.textContent = 'Отправляем…';

    try {
        const response = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            body: new FormData(registrationForm),
            headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Сервер вернул ошибку');
        }

        registrationForm.reset();
        formStatus.textContent = 'Спасибо! Мы свяжемся с вами в ближайшее время.';
    } catch (error) {
        formStatus.textContent =
            'Не удалось отправить заявку. Позвоните нам: +7 (912) 947-80-65';
    } finally {
        submitButton.disabled = false;          // выполняется в любом случае
    }
});