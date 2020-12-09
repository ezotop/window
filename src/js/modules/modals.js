function closeModal(modalSelector) {
    const modal =document.querySelector(modalSelector);

    modal.classList.remove('show');
    modal.classList.add('hide');
    //document.body.style.overflow = "";
    document.body.classList.remove('modal-open');
    document.body.style.marginRight = `0px`;
}

const modals = (state) => {

    

    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal'),
              scroll = calcScroll();
        
        function showErrorMessage(text, divClass, elem, timeOutTime) {
            let errorMessage = document.createElement('div');
            errorMessage.classList.add(divClass);

            console.log('error');
            elem.parentElement.append(errorMessage);
            errorMessage.textContent = text;
            setTimeout(() => {
                errorMessage.remove();
            }, timeOutTime);
        }

        function closeAllModals(elem) {
            elem.forEach(item => {
                item.classList.remove('show');
                item.classList.add('hide');
            });
        }

        function showModalByTime(selector, time) {
            const modalTimerId = setTimeout(() => {
                openModal(selector);
            }, time);
        }

        // showModalByTime('.popup', 5000);

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                if (e.target.classList.contains('popup_calc_button')) {
                    if (state.width && state.height) {
                        closeAllModals(windows);
                        openModal(modalSelector);
                    } else {
                        showErrorMessage("Введите все данные", 'status', e.target, 2000);
                    }
                } else if (e.target.classList.contains('popup_calc_profile_button')) {
                    if (state.profile) {
                        closeAllModals(windows);
                        openModal(modalSelector);
                    } else {
                        showErrorMessage("Введите все данные", 'status', e.target, 2000);
                    }
                } else {
                    closeAllModals(windows);
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
                closeAllModals(windows);
                closeModal(modalSelector);
            }    
        });  

        function calcScroll() {
            let div = document.createElement('div');
            div.style.cssText = `
                width: 50px;
                height: 50px;
                overflow-y: scroll;
                visability: hidden;
            `;
            document.body.append(div);
            let scrollWidth = div.offsetWidth - div.clientWidth;
            div.remove();
    
            return scrollWidth;
        }
        
        function openModal(modalSelector, timer) {
            const modal = document.querySelector(modalSelector);
        
            modal.classList.remove('hide');
            modal.classList.add('show');
            //document.body.style.overflow = "hidden";
            document.body.classList.add('modal-open'); //В Bootstrap есть специальный класс, который делает оверфлоу хидден установив класс на боди
            document.body.style.marginRight = `${scroll}px`;
        
            if (timer) {
                clearInterval(timer);
            }
        }
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc .popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
};

export default modals;
export {closeModal};