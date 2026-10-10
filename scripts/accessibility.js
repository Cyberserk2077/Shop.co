export const getFocusableElements = (root) =>
	[...root.querySelectorAll('a[href], button, input, select, textarea, [tabindex]')]
		.filter((element) => !element.disabled && element.tabIndex >= 0 && element.getClientRects().length && !element.closest('[inert]'))

export const trapFocus = (event, elements) => {
	if (event.key !== 'Tab' || !elements.length) return

	const first = elements[0]
	const last = elements[elements.length - 1]
	const isOutside = !elements.includes(document.activeElement)

	if (isOutside || (event.shiftKey && document.activeElement === first) || (!event.shiftKey && document.activeElement === last)) {
		event.preventDefault()
		const target = event.shiftKey ? last : first
		target.focus()
	}
}

export const syncPageState = () => {
	const menuOpen = document.querySelector('.header__menu--open') !== null
	const modalOpen = document.querySelector('.modal--open') !== null

	document.body.classList.toggle('page__body--locked', menuOpen || modalOpen)
	document.querySelectorAll('.main, .footer, .skip-link').forEach((element) => {
		element.inert = menuOpen || modalOpen
	})
	document.querySelector('.header').inert = modalOpen
	document.querySelectorAll('.header__logo, .header__promo').forEach((element) => {
		element.inert = menuOpen
	})
}
