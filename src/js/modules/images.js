const images = () => {
    const imgPopup = document.createElement('div'),
          workSection = document.querySelector('.works'),
          bigImage = document.createElement('img');

    workSection.append(imgPopup);

    imgPopup.style.cssText = `
        display: none;
        justify-content: center;
        align-items: center;
        max-width: 100%;
    `;

    bigImage.style.cssText = `
        max-width: 90%;
    `;

    imgPopup.append(bigImage);

    workSection.addEventListener('click', (e) => {
        e.preventDefault();

        let target = e.target;

        if (target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex';
            imgPopup.classList.add('popup');
            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path);
            document.body.style.overflow = 'hidden';
        }

        if (target && target.matches('div.popup'))  {
            imgPopup.style.display = 'none';
            imgPopup.classList.remove('popup');
            document.body.style.overflow = '';
        } 
    });
};

export default images;