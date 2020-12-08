import checkNumInputs from "./checkNumInputs";

const resetCheckbox = (selector) => {
    const elem = document.querySelectorAll(selector);

    elem.forEach(box => {
        box.checked = false;
    });
};

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelectorAll('#width'),
          windowHeight = document.querySelectorAll('#height'),
          windowType = document.querySelectorAll('#view_type'),
          windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');

    windowForm.forEach((item, i) => { //На каком табе стоит класс активности, тот порядковый номер записывается в обьект
        if (item.classList.contains('do_image_more')) {
            state.form = i;
        }
    });

    windowType.forEach(item => { //Какой option сейчас передан в select, тот и записывается в обьект
        state.type = item.value;
    });
    
    function bindActionToElems(event, elem, prop) { //prop - свойство, которое записываем в обьект

        elem.forEach((item, i) => {   
            item.addEventListener(event, () => {
                switch(item.nodeName) { //Узнаём с какой нодой работаем
                    case 'SPAN' :
                        state[prop] = i;
                        break;
                    case 'INPUT' :
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = "Холодное" : state[prop] = "Теплое"; //У нас два чекбокса, если индекс выбранного 0, то записываем prop Холодный. Если это не 0, то создаем prop со значением Теплый
                            elem.forEach((box, j) => { //Убираем галочки со всех чекбоксов кроме того где кликнул пользователь
                                box.checked = false;
                                if (i == j) { //Если же индекс нажатого с индексом перебираемого совпали, то оставляем галочку
                                    box.checked = true;
                                }
                            });
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT' :
                        state[prop] = item.value;
                        break;
                }

                //console.log(state);

                // if (elem.length > 1) { //Сделали все switch
                //     state[prop] = i; //В обьекте state создается новое свойство и записывается значение (номер элемента на который кликнули)
                // } else {
                //     state[prop] = item.value;
                // }
                // console.log(state);
            });
        });
    }

    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowHeight, 'height');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('change', windowType, 'type');
    bindActionToElems('change', windowProfile, 'profile');

};

export default changeModalState;
export {resetCheckbox};