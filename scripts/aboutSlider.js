export const aboutSlider = () => {
  new Swiper(".about__slider", {
    slidesPerView: 1.12,
    spaceBetween: 16,
    centeredSlides: true,
    loop: true,
    autoHeight: false,
    breakpoints: {
      768: {
        slidesPerView: 2.2,
        spaceBetween: 20,
        centeredSlides: true,
      },
      1024: {
        slidesPerView: 3.2,
        spaceBetween: 20,
        centeredSlides: false,
      },
    },
    mouseWheel: {
      forceToAxis: true,
    },
    navigation: {
      prevEl: ".about__prev-button",
      nextEl: ".about__next-button",
    },
  });
};
