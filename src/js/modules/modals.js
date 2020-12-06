const modals = () => {
    function openModal(modalSelector, modalTimer) {
        const modal = document.querySelector(modalSelector);

        modal.classList.remove('hide');
        modal.classList.add('show');
        //document.body.style.overflow = "hidden";
        document.body.classList.add('modal-open'); //В Bootstrap есть специальный класс, который делает оверфлоу хидден установив класс на боди

        if (modalTimer) {
            clearInterval(modalTimer);
        }
    }

    function closeModal(modalSelector) {
        const modal =document.querySelector(modalSelector);

        modal.classList.remove('show');
        modal.classList.add('hide');
        //document.body.style.overflow = "";
        document.body.classList.remove('modal-open');
    }

    function bindModal(triggerSelector, modalSelector, closeSelector, modalTimer) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector);

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
    
                openModal(modalSelector, modalTimer);
                // modal.classList.remove('hide');
                // modal.classList.add('show');
                // //document.body.style.overflow = "hidden";
                // document.body.classList.add('modal-open'); //В Bootstrap есть специальный класс, который делает оверфлоу хидден установив класс на боди
                // if (modalTimer) {
                //     clearInterval(modalTimer);
                // }
            });
        });

        close.addEventListener('click', () => {
            closeModal(modalSelector);
            // modal.classList.remove('show');
            // modal.classList.add('hide');
            // //document.body.style.overflow = "";
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target == close) {
                closeModal(modalSelector);
                // modal.classList.remove('show');
                // modal.classList.add('hide');
                // //document.body.style.overflow = "";
                // document.body.classList.remove('modal-open');
            }    
        });
    }

    function showModalByTime(selector, time) {
        //const modal = document.querySelector(selector);
        const modalTimer = setTimeout(() => {
            openModal(selector, modalTimer);
            // modal.classList.remove('hide');
            // modal.classList.add('show');
            // //document.body.style.overflow = "hidden";
            // document.body.classList.add('modal-open');
        }, time);
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    // showModalByTime('.popup', 5000);
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc .popup_calc_close');
};

export default modals;