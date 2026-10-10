export const aboutSlider = () => {
	if (typeof window.Swiper !== 'function') return

	new window.Swiper('.about__slider', {
		slidesPerView: 1,
		spaceBetween: 16,
		speed: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300,
		loop: true,
		breakpoints: {
			768: { slidesPerView: 2, spaceBetween: 20 },
			1024: { slidesPerView: 3, spaceBetween: 20 },
		},
		navigation: {
			prevEl: '.about__prev-button',
			nextEl: '.about__next-button',
		},
		a11y: {
			prevSlideMessage: 'Предыдущий отзыв',
			nextSlideMessage: 'Следующий отзыв',
			slideLabelMessage: 'Отзыв {{index}} из {{slidesLength}}',
		},
	})
	document.querySelector('.about__controls').hidden = false
}
