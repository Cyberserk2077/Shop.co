export const initDemoForms = () => {
	document.querySelectorAll('[data-js-demo-form]').forEach((form) => {
		const status = form.querySelector('.form-status')
		form.querySelector('[type="submit"]').disabled = false

		form.addEventListener('input', (event) => {
			event.target.setCustomValidity('')
			status.textContent = ''
		})
		form.addEventListener('submit', (event) => {
			event.preventDefault()
			const name = form.elements.namedItem('name')
			const phone = form.elements.namedItem('phone')
			if (name && !name.value.trim()) name.setCustomValidity('Введите ваше имя.')
			if (phone && !/^[+\d\s()\-]+$/.test(phone.value.trim())) {
				phone.setCustomValidity('Используйте цифры, пробелы, скобки, плюс или дефис.')
			} else if (phone && (phone.value.match(/\d/g) || []).length < 7) {
				phone.setCustomValidity('Введите номер телефона: не менее 7 цифр.')
			}
			if (!form.reportValidity()) return

			status.textContent = 'Форма заполнена корректно. Это демонстрация: данные не отправлены.'
			form.reset()
		})
	})
}
