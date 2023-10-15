const focusableElements = 'button, img, input, select, textarea, [tabindex]:not([tabindex="-1"])';
const modal = document.querySelector("#contact_modal"); // select the modal by it's id

const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
const secondFocusableElement = modal.querySelectorAll(focusableElements)[1];
const focusableContent = modal.querySelectorAll(focusableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal
const submitButton = document.getElementById("submit_button");

/* Ouverture de la modale */
export function displayModal() {
	// Reset du formulaire pour vider les données éventuelles
	const form = document.getElementById("formulaire");
	form.reset();

	// Reset des messages d'erreur du formulaire
	const formdatas = document.querySelectorAll(".formData");
	formdatas.forEach((formdata) => formdata.setAttribute("data-error-visible", false));

	// Affichage de la modale et positionnement de aria-hidden
	const modal = document.getElementById("contact_modal");
	const main = document.querySelector("main");

	modal.style.display = "block";
	modal.setAttribute("aria-hidden", false);
	main.setAttribute("aria-hidden", true);

	// Passage du focus au exuième élément de la modale: premier élément à renseigner
	secondFocusableElement.focus();

	// On active le listener sur la fermeture du formulaire de contact
	const closeButton = document.getElementById("close_modal");
	closeButton.addEventListener("click", (e) => {
		e.preventDefault();
		closeModal();
	});

	closeButton.addEventListener("keyup", (e) => {
		e.preventDefault();
		if (e.key === "Enter") {
			closeModal();
		}
	});

	// masquage du scroll du body
	const body = document.querySelector("body");
	body.classList.add("noscroll");
}

/* Fermeture de la modale */
function closeModal() {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "none";

	// repositionnement de aria-hidden
	const main = document.querySelector("main");

	// démasquage du scroll du body
	const body = document.querySelector("body");
	body.classList.remove("noscroll");

	modal.setAttribute("aria-hidden", true);
	main.setAttribute("aria-hidden", false);

	const button = document.getElementById("contact_button");
	button.focus();
}

modal.addEventListener("keydown", (e) => {
	let isTabPressed = e.key === "Tab" || e.keyCode === 9;
	let activeElementIndex = -1;

	// Si fleches clavier up ou down
	if (e.key === "ArrowDown" || e.key === "ArrowUp") {
		// on identifie l'element actif dans le formulaire
		for (let i = 0; i < focusableContent.length; i++) {
			if (document.activeElement === focusableContent[i]) {
				activeElementIndex = i;
				break;
			}
		}

		// On pointe l'element suivant pour y mettre le focus
		if (e.key === "ArrowDown") {
			if (activeElementIndex === focusableContent.length - 1) {
				activeElementIndex = 0;
			} else {
				++activeElementIndex;
			}
		} else if (e.key === "ArrowUp") {
			if (activeElementIndex === 0) {
				activeElementIndex = focusableContent.length - 1;
			} else {
				--activeElementIndex;
			}
		}
		focusableContent[activeElementIndex].focus();
	}

	if (e.key === "Escape") {
		closeModal();
		return;
	}

	if (!isTabPressed) {
		// Si pas Tab, on sort
		return;
	}

	if (e.shiftKey) {
		// Si shift key pressé pour la combinaison shift + tab
		if (document.activeElement === firstFocusableElement) {
			lastFocusableElement.focus(); // on met le focus sur le dernier element focusable
			e.preventDefault();
		}
	} else {
		// Sinon
		if (document.activeElement === lastFocusableElement) {
			// Si on arrive au dernier element focusable, alors on remet le focus sur le premier
			firstFocusableElement.focus();
			e.preventDefault();
		}
	}
});

submitButton.addEventListener("click", (event) => {
	event.preventDefault(event);

	const prenom = document.getElementById("firstname");
	const nom = document.getElementById("lastname");
	const email = document.getElementById("email");
	const message = document.getElementById("message");

	if (prenom.validity.valid && nom.validity.valid && email.validity.valid && message.validity.valid) {
		console.log(`Message de ${prenom.value} ${nom.value} (${email.value}) :`);
		console.log(`${message.value}`);

		closeModal();
	} else {
		if (prenom.validity.valid) {
			prenom.parentElement.setAttribute("data-error-visible", "false");
		} else {
			prenom.parentElement.setAttribute("data-error-visible", "true");
		}

		if (nom.validity.valid) {
			nom.parentElement.setAttribute("data-error-visible", "false");
		} else {
			nom.parentElement.setAttribute("data-error-visible", "true");
		}

		if (email.validity.valid) {
			email.parentElement.setAttribute("data-error-visible", "false");
		} else {
			email.parentElement.setAttribute("data-error-visible", "true");
		}

		if (message.validity.valid) {
			message.parentElement.setAttribute("data-error-visible", "false");
		} else {
			message.parentElement.setAttribute("data-error-visible", "true");
		}
	}
});
