import { getFocusableElements, trapFocus, syncPageState } from './accessibility.js'

export default class BurgerMenu {
	constructor(config) {
		this.config = config
		this.burgerButton = document.querySelector(`.${config.BURGER}`)
		this.burgerMenu = document.querySelector(`.${config.HEADER_MENU}`)
		this.mobileQuery = window.matchMedia(`(width <= ${config.BREAKPOINT}px)`)

		if (!this.burgerButton || !this.burgerMenu) return

		this.burgerButton.hidden = false
		document.querySelector('.header').classList.add('header--enhanced')
		this.burgerButton.addEventListener('click', () => {
			if (this.isOpen()) this.close()
			else this.open()
		})
		this.burgerMenu.addEventListener('click', (event) => {
			const link = event.target.closest(`.${config.MENU_LINK}`)
			if (!link || !this.isOpen()) return
			this.close(false)
			const section = document.querySelector(link.hash)
			if (section) {
				section.tabIndex = -1
				section.focus({ preventScroll: true })
			}
		})
		document.addEventListener('keydown', (event) => {
			if (!this.isOpen()) return
			if (event.key === 'Escape') {
				event.preventDefault()
				this.close()
			}
			trapFocus(event, [this.burgerButton, ...getFocusableElements(this.burgerMenu)])
		})
		this.mobileQuery.addEventListener('change', () => {
			if (this.mobileQuery.matches) return
			const buttonFocused = document.activeElement === this.burgerButton
			this.close(false)
			if (buttonFocused) getFocusableElements(this.burgerMenu)[0]?.focus()
		})
	}

	isOpen() {
		return this.burgerMenu.classList.contains(this.config.HEADER_MENU_OPEN)
	}

	open() {
		if (!this.mobileQuery.matches) return
		this.burgerMenu.classList.add(this.config.HEADER_MENU_OPEN)
		this.burgerButton.classList.add(this.config.BURGER_OPEN)
		this.burgerButton.setAttribute('aria-expanded', 'true')
		this.burgerButton.setAttribute('aria-label', 'Закрыть меню')
		syncPageState()
		getFocusableElements(this.burgerMenu)[0]?.focus()
	}

	close(restoreFocus = true) {
		const wasOpen = this.isOpen()
		this.burgerMenu.classList.remove(this.config.HEADER_MENU_OPEN)
		this.burgerButton.classList.remove(this.config.BURGER_OPEN)
		this.burgerButton.setAttribute('aria-expanded', 'false')
		this.burgerButton.setAttribute('aria-label', 'Открыть меню')
		syncPageState()
		if (wasOpen && restoreFocus) this.burgerButton.focus()
	}
}
