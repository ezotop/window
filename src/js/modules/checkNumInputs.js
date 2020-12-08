const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);

    numInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, ''); //Если ввели нечисло, то заменяем это на пустую строку
        });
    });
};

export default checkNumInputs;