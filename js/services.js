function openTelegramBot() {
    const telegramBotUrl = 'https://t.me/pancir_services_bot';
    window.open(telegramBotUrl, '_blank');
}


const burger = document.querySelector('.burger');
    const menuList = document.querySelector('.menu-list');

    burger.addEventListener('click', () => {
        menuList.classList.toggle('active');
    });


function changeLanguage(lang) {
    const texts = {
        en: {
            title: "Services",
            offer: "We offer you:",
            serviceList: [
                "Create a personal VPN for you",
                "Create a website",
                "Create a Telegram bot",
                "Training in various programming languages",
                "Get data about a person",
                "Supervision of IT training"
            ],
            applyText: "To apply for the service, click on the button",
            menuItems: [
                { name: "Home", link: "index.html" },
                { name: "Our projects", link: "OurProjects.html" },
                { name: "Blacklist", link: "blacklist.html" }
            ]
        },
        ru: {
            title: "Услуги",
            offer: "Мы предлагаем вам:",
            serviceList: [
                "Создание личного VPN для вас",
                "Создание веб-сайта",
                "Создание Telegram-бота",
                "Обучение различным языкам программирования",
                "Получение данных о человеке",
                "Надзор за IT-обучением"
            ],
            applyText: "Чтобы подать заявку на услугу, нажмите на кнопку",
            menuItems: [
                { name: "Главная", link: "index.html" },
                { name: "Наши проекты", link: "OurProjects.html" },
                { name: "Черный список", link: "blacklist.html" }
            ]
        }
    };

    const titleElement = document.querySelector('.h1-text h1');
    const offerElement = document.querySelector('.text-services h2');
    const serviceListElement = document.querySelector('.decoration-services');
    const applyTextElement = document.querySelector('.text-left-button');
    const menuListElement = document.querySelector('.menu-list');

    titleElement.textContent = texts[lang].title;
    offerElement.textContent = texts[lang].offer;
    applyTextElement.textContent = texts[lang].applyText;

    serviceListElement.innerHTML = '';
    texts[lang].serviceList.forEach(service => {
        const li = document.createElement('li');
        li.innerHTML = `<p>${service}</p>`;
        serviceListElement.appendChild(li);
    });

    menuListElement.innerHTML = '';
    texts[lang].menuItems.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('menu-item');
        li.innerHTML = `<a href="${item.link}">${item.name}</a>`;
        menuListElement.appendChild(li);
    });
}

changeLanguage('ru'); 