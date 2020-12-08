import checkNumInputs from "./checkNumInputs";
import {closeModal} from "./modals";
import {resetCheckbox} from "./changeModalState";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          typeOptions = document.querySelectorAll('.form-control > option'),
          inputs = document.querySelectorAll('input'),
          windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowType = document.querySelectorAll('#view_type');

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...' 
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;

        let res = await fetch(url, {
            method: "POST",
            body: data,
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.append(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') == "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    resetCheckbox('.checkbox');
                    for (let key in state) {
                        delete state[key];
                    }
                    setTimeout(() => {
                        statusMessage.remove();
                        closeModal('.popup_calc_end');
                    }, 3000);
                    windowForm.forEach((item, i) => {
                        if (item.classList.contains('do_image_more')) {
                            state.form = i;
                        }
                    });
                    windowType.forEach(item => {
                        state.type = item.value;
                        console.log(state.type);
                    });
                });
        });
    });
};

export default forms;