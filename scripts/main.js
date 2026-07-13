import BurgerMenu from "./burgerButton.js";
import Modal from "./modal.js";
import { aboutSlider } from "./aboutSlider.js";

try {
  new BurgerMenu({
    BURGER: "burger-button",
    BURGER_OPEN: "burger-button--open",
    HEADER_MENU: "header__menu",
    HEADER_MENU_OPEN: "header__menu--open",
    lABEL: {
      OPEN: "Открыть меню",
      CLOSE: "Закрыть меню",
    },
    PAGE_BODY: "page__body",
    PAGE_BODY_NO_SCROLL: "page__body--locked",
    MENU_LINK: "menu__link",
    BREAKPOINT: 768,
    MAIN: "main",
  });

  new Modal({
    PAGE_BODY: "page__body",
    PAGE_BODY_NO_SCROLL: "page__body--locked",
  });

  aboutSlider();
} catch (error) {
  console.error(error);
}
