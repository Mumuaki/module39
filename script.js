const API_URL = "https://dog.ceo/api/breeds/image/random/12";

const galleryGrid = document.querySelector(".gallery__grid");
const loadButton = document.querySelector(".gallery__button");
const loader = document.querySelector(".loader");
const errorContainer = document.querySelector(".gallery__error");

const showLoader = () => {
  loader.classList.add("loader--visible");
};

const hideLoader = () => {
  loader.classList.remove("loader--visible");
};

const clearGallery = () => {
  galleryGrid.innerHTML = "";
};

const clearError = () => {
  errorContainer.textContent = "";
};

const handleError = (message) => {
  errorContainer.textContent = message;
};

const renderGallery = (imageUrls) => {
  const fragment = document.createDocumentFragment();

  imageUrls.forEach((url) => {
    const item = document.createElement("div");
    item.className = "gallery__item";

    const img = document.createElement("img");
    img.className = "gallery__image";
    img.src = url;
    img.alt = "Собака";
    img.loading = "lazy";

    item.appendChild(img);
    fragment.appendChild(item);
  });

  galleryGrid.appendChild(fragment);
};

const fetchImages = async () => {
  clearError();
  clearGallery();
  showLoader();

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Не удалось загрузить изображения. Попробуйте ещё раз.");
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.message)) {
      throw new Error("Ответ сервера некорректен.");
    }

    renderGallery(data.message);
  } catch (error) {
    handleError(error.message || "Произошла неизвестная ошибка.");
  } finally {
    hideLoader();
  }
};

loadButton.addEventListener("click", fetchImages);
