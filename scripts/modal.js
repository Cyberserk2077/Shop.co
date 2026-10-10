import { getFocusableElements, trapFocus, syncPageState } from './accessibility.js'

export default class Modal {
	constructor() {
		this.modal = document.querySelector('.modal')
		if (!this.modal) return

		this.modalWindow = null
		this.lastActiveElement = null
		document.querySelectorAll('[data-js-modal-button]').forEach((button) => {
			button.hidden = false
		})
		document.addEventListener('click', (event) => {
			const button = event.target.closest('[data-js-modal-button]')
			if (button) this.open(button)
			if (event.target.closest('[data-js-modal-close]')) this.close()
		})
		this.modal.addEventListener('click', (event) => {
			if (event.target === this.modal) this.close()
		})
		document.addEventListener('keydown', (event) => {
			if (!this.modalWindow) return
			if (event.key === 'Escape') {
				event.preventDefault()
				this.close()
				return
			}
			trapFocus(event, getFocusableElements(this.modalWindow))
		})
	}

	open(button) {
		const window = [...this.modal.querySelectorAll('[data-js-modal-window]')]
			.find((element) => element.dataset.jsModalWindow === button.dataset.jsModalButton)
		if (!window || this.modalWindow === window) return

		this.modalWindow?.classList.remove('modal__window--open')
		this.lastActiveElement = button
		this.modalWindow = window
		this.modal.classList.add('modal--open')
		window.classList.add('modal__window--open')
		syncPageState()
		window.focus({ preventScroll: true })
	}

	close() {
		if (!this.modalWindow) return
		this.modal.classList.remove('modal--open')
		this.modalWindow.classList.remove('modal__window--open')
		this.modalWindow = null
		syncPageState()
		if (this.lastActiveElement?.isConnected) this.lastActiveElement.focus({ preventScroll: true })
	}
}
