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

    imgPopup.append(bigImage);

    bigImage.style.cssText = `
        max-width: 90%;
    `;

    workSection.addEventListener('click', (e) => {
        e.preventDefault();

        let target = e.target;

        if (target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex';
            imgPopup.classList.add('popup');
            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path);
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
        }

        if (target && target.matches('div.popup'))  {
            imgPopup.style.display = 'none';
            imgPopup.classList.remove('popup');
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        } 
    });
};

export default images;