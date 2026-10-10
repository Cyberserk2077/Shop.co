import BurgerMenu from './burgerButton.js'
import Modal from './modal.js'
import { aboutSlider } from './aboutSlider.js'
import { initPromoBanner } from './promoBanner.js'
import { initDemoForms } from './forms.js'

const initializers = [
	() => new BurgerMenu({
		BURGER: 'burger-button',
		BURGER_OPEN: 'burger-button--open',
		HEADER_MENU: 'header__menu',
		HEADER_MENU_OPEN: 'header__menu--open',
		MENU_LINK: 'header__menu-link',
		BREAKPOINT: 768,
	}),
	() => new Modal(),
	initDemoForms,
	initPromoBanner,
]

initializers.forEach((initialize) => {
	try {
		initialize()
	} catch (error) {
		console.error('Не удалось инициализировать компонент:', error)
	}
})

// Swiper загружается независимо: остальные компоненты не ждут CDN.
const initSlider = () => {
	try {
		aboutSlider()
	} catch (error) {
		console.error('Не удалось инициализировать слайдер:', error)
	}
}

if (document.readyState === 'complete') initSlider()
else window.addEventListener('load', initSlider, { once: true })
