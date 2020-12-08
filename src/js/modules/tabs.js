const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {

    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);

    function hideTabContent() {
        content.forEach(item => {
            item.style.display = 'none';
            // item.classList.remove('show');
            // item.classList.add('hide');
        });

        tab.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        content[i].style.display = display;
        // content[i].classList.remove('hide');
        // content[i].classList.add('show');

        tab[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    header.addEventListener('click', (e) => {
        const target = e.target;

        if (target && (target.classList.contains(tabSelector.replace(/\./, "")) || 
        target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) { //если кликнули на элемент внутри tabSelector, то удостоверимся, что у этого элемента родитель именно
            tab.forEach((item, i) => {
                if (target == item || target.parentNode == item) { //Проверяем, что таб на который кликнули равен тому табу, что сейчас перебырается
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

};

export default tabs;