const burger = document.querySelector('.burger');
    const menuList = document.querySelector('.menu-list');

    burger.addEventListener('click', () => {
        menuList.classList.toggle('active');
    });

function changeLanguage(lang) {
    const texts = {
        en: {
            title: "Our projects",
            allProjects: "All our projects",
            comingSoon: "Coming soon...",
            menuItems: [
                { name: "Home", link: "index.html" },
                { name: "Services", link: "services.html" },
                { name: "Blacklist", link: "blacklist.html" }
            ]
        },
        ru: {
            title: "Наши проекты",
            allProjects: "Все наши проекты",
            comingSoon: "Скоро будет...",
            menuItems: [
                { name: "Главная", link: "index.html" },
                { name: "Услуги", link: "services.html" },
                { name: "Черный список", link: "blacklist.html" }
            ]
        }
    };

    const titleElement = document.querySelector('.h1-text h1');
    const allProjectsElement = document.querySelector('.text-about-projects h2');
    const comingSoonElement = document.querySelector('.text-about-projects p');
    const menuListElement = document.querySelector('.menu-list');

    titleElement.textContent = texts[lang].title;
    allProjectsElement.textContent = texts[lang].allProjects;
    comingSoonElement.textContent = texts[lang].comingSoon;

    menuListElement.innerHTML = '';
    texts[lang].menuItems.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('menu-item');
        li.innerHTML = `<a href="${item.link}">${item.name}</a>`;
        menuListElement.appendChild(li);
    });
}

changeLanguage('ru'); 
