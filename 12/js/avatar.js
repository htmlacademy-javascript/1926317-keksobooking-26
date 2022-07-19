const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const fileChooserAvatar = document.querySelector('.ad-form-header__input');
const previewAvatar = document.querySelector('.ad-form-header__avatar');
const fileChooserPhoto = document.querySelector('.ad-form__input');
const previewPhoto = document.querySelector('.ad-form__photo');

const loadFileAvatar = () => {
  fileChooserAvatar.addEventListener('change', ()=>{
    const file = fileChooserAvatar.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
    if (matches) {
      previewAvatar.src = URL.createObjectURL(file);
    }
  });
};

const loadFilePhoto = () => {
  fileChooserPhoto.addEventListener('change', () => {
    const file = fileChooserPhoto.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

    if (matches && previewPhoto.children.length < 3) {
      const imgPhoto = document.createElement('img');
      imgPhoto.style.width = '70px';
      imgPhoto.style.height = '70px';
      imgPhoto.src = URL.createObjectURL(file);
      previewPhoto.appendChild(imgPhoto);
    }
  });
};

export {loadFileAvatar, loadFilePhoto};
