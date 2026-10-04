import { images } from "./images.js";
import { renderCarouselView } from "./carousel.js";

const homeSection = document.querySelector("#home");
const carouselSection = document.querySelector("#carousel");
const notFoundSection = document.querySelector("#not-found");

// global select from document
const confirmationModel = document.querySelector("#confirmation-modal");
// select buttons from confirmation modal
const cancelBtnE1 = confirmationModel.querySelector(".modal__btn_type_cancel");
const confirmBtnE1 = confirmationModel.querySelector(
  ".modal__btn_type_confirm",
);
// global variable to hold the image element that is being deleted. declare a variable initialize it to null
let currentImageEl = null;

function renderHomeView() {
  homeSection.style.display = "block";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";

  const imageTemplateEl = document.querySelector("#image-template");
  const imageContainerEl = document.querySelector(".gallery__list");
  imageContainerEl.innerHTML = "";

  function createImageEl(item) {
    const cloneEl = imageTemplateEl.content.querySelector("li").cloneNode(true);

    const imageEl = cloneEl.querySelector(".gallery__image");
    imageEl.src = item.src;
    imageEl.alt = item.alt;

    const likeBtn = cloneEl.querySelector(".gallery__btn_type_like");
    likeBtn.addEventListener("click", () => {
      likeBtn.classList.toggle("gallery__btn_type_like-filled");
    });

    const deleteBtn = cloneEl.querySelector(".gallery__btn_type_delete");
    deleteBtn.addEventListener("click", () => {
      // remove the code that deletes the deck element: cloneEl.remove();
      // make the modal visible by adding the modifier
      confirmationModel.classList.add("modal__visible");
      // add the cloneEl to the global variable imageToDelete to delete the correct image.
      currentImageEl = cloneEl;
    });

    return cloneEl;
  }

  function renderImageEl(item) {
    const imageEl = createImageEl(item);
    imageContainerEl.prepend(imageEl);
  }

  images.forEach(renderImageEl);
}

function renderNotFoundView() {
  homeSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "flex";
}

/**
 * Main router function that handles hash changes.
 * Reads the current hash and renders the appropriate view.
 */
function router() {
  const hash = window.location.hash.slice(1) || "home";

  if (hash === "home" || hash === "") {
    renderHomeView();
  } else if (hash === "carousel") {
    homeSection.style.display = "none";
    carouselSection.style.display = "block";
    notFoundSection.style.display = "none";
    renderCarouselView(images);
  } else {
    renderNotFoundView();
  }
}

// event listeners for modal buttons
cancelBtnE1.addEventListener("click", () => {
  confirmationModel.classList.remove("modal__visible");
  // reset the global variable to null when the modal is closed without deletion
  currentImageEl = null;
});

confirmBtnE1.addEventListener("click", () => {
  confirmationModel.classList.remove("modal__visible");
  // add click event listener to the confirm button that removes the image element from the DOM
  currentImageEl.remove();
  currentImageEl = null; // reset the global variable to null after deletion
});

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);
