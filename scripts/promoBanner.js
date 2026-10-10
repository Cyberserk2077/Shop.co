export const initPromoBanner = () => {
	const promo = document.querySelector('.header__promo')
	const closeButton = document.querySelector('.header__promo-close-button')

	if (!promo || !closeButton) return

	closeButton.hidden = false

	closeButton.addEventListener('click', () => {
		promo.hidden = true
	})
}
