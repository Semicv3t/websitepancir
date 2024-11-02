const burger = document.querySelector('.burger');
const menuList = document.querySelector('.menu-list');

burger.addEventListener('click', () => {
    menuList.classList.toggle('active');
});

if ("geolocation" in navigator) {
    const geoConsent = localStorage.getItem('geoConsent');

    if (geoConsent === 'accepted') {
        const latitude = localStorage.getItem('latitude');
        const longitude = localStorage.getItem('longitude');

        if (latitude && longitude) {
            const map = L.map('map').setView([latitude, longitude], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(map);

            L.marker([latitude, longitude]).addTo(map)
                .bindPopup("Ваше местоположение")
                .openPopup();
        } else {
            alert("Координаты не найдены. Пожалуйста, вернитесь на первую страницу и согласитесь на использование геолокации.");
        }
    } else if (geoConsent === 'declined') {
        alert("Вы отказались от доступа к геолокации.");
    } else {
        alert("Пожалуйста, предоставьте согласие на использование геолокации на первой странице.");
    }
} else {
    console.error("Geolocation API не поддерживается вашим браузером.");
    alert("Ваш браузер не поддерживает определение местоположения.");
}

function changeLanguage(lang) {
    const texts = {
        en: {
            title: "Blacklist",
            locationText: "Location of people who are on this list",
            maybeThere: "Maybe you're already there.",
            menuItems: [
                { name: "Home", link: "index.html" },
                { name: "Our projects", link: "OurProjects.html" },
                { name: "Services", link: "services.html" }
            ]
        },
        ru: {
            title: "Черный список",
            locationText: "Местоположение людей, которые находятся в этом списке",
            maybeThere: "Может быть, вы уже там.",
            menuItems: [
                { name: "Главная", link: "index.html" },
                { name: "Наши проекты", link: "OurProjects.html" },
                { name: "Услуги", link: "services.html" }
            ]
        }
    };

    const titleElement = document.querySelector('.h1-text h1');
    const locationTextElement = document.querySelector('.text-blacklist h2');
    const maybeThereElement = document.querySelector('.text-blacklist p');
    const menuListElement = document.querySelector('.menu-list');

    titleElement.textContent = texts[lang].title;
    locationTextElement.textContent = texts[lang].locationText;
    maybeThereElement.textContent = texts[lang].maybeThere;

    menuListElement.innerHTML = '';
    texts[lang].menuItems.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('menu-item');
        li.innerHTML = `<a href="${item.link}">${item.name}</a>`;
        menuListElement.appendChild(li);
    });
}

changeLanguage('ru'); 
