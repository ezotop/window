function closeModal(modalSelector) {
    const modal =document.querySelector(modalSelector);

    modal.classList.remove('show');
    modal.classList.add('hide');
    //document.body.style.overflow = "";
    document.body.classList.remove('modal-open');
}

const modals = (state) => {

    function openModal(modalSelector, modalTimer) {
        const modal = document.querySelector(modalSelector);
    
        modal.classList.remove('hide');
        modal.classList.add('show');
        //document.body.style.overflow = "hidden";
        document.body.classList.add('modal-open'); //В Bootstrap есть специальный класс, который делает оверфлоу хидден установив класс на боди
    
        // if (modalTimer) {
        //     clearInterval(modalTimer);
        // }
    }

    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal');

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                // if (modalTimer) {
                //     clearInterval(modalTimer);
                // }

                if (e.target.classList.contains('popup_calc_button')) {
                    if (state.width && state.height) {
                        windows.forEach(item => {
                            item.classList.remove('show');
                            item.classList.add('hide');
                        });

                        openModal(modalSelector);
                    } else {
                        console.log('error');
                    }
                } else if (e.target.classList.contains('popup_calc_profile_button')) {
                    if (state.profile) {
                        windows.forEach(item => {
                            item.classList.remove('show');
                            item.classList.add('hide');
                        });

                        openModal(modalSelector);
                    } else {
                        console.log('error');
                    }
                } else {
                    windows.forEach(item => {
                        item.classList.remove('show');
                        item.classList.add('hide');
                    });

                    openModal(modalSelector);
                }
            });
        });
        
        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.classList.remove('show');
                item.classList.add('hide');
            });
            
            closeModal(modalSelector);
        });

        modal.addEventListener('click', (e) => {
            if ((e.target === modal && closeClickOverlay) || e.target == close)  {
                windows.forEach(item => {
                    item.classList.remove('show');
                    item.classList.add('hide');
                });

                closeModal(modalSelector);
            }    
        });  
    }

    function showModalByTime(selector, time) {
        const modalTimer = setTimeout(() => {
            openModal(selector, modalTimer);
        }, time);
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc .popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    //showModalByTime('.popup', 5000);
};

export default modals;
export {closeModal};