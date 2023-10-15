import { Photographer } from '../factories/photographer.js';
import { Media } from '../factories/media.js';
import { Likes } from "../factories/likes.js";
import { Lightbox } from "../factories/lightbox.js";

import { displayModal } from "../utils/contactForm.js";
import { sortbyOption, readSelectedOption } from "../utils/sort.js";

function getPhotographers() {
	return fetch("data/photographers.json")
		.then(response => response.json())
		.catch(err => { throw (`la requete API fetch a échoué: ${err}`); });
}

function selectPhotograph(photographList, Id) {
	return photographList.find((photograph) => photograph.id === Id);
}

/* header de la page photographe */
function displayPhotographHeader(photograph) {
	const photographHeader = document.querySelector(".photograph-header");
	const photographModel = new Photographer(photograph);
	photographHeader.innerHTML = photographModel.userData;

	// Appel de userName pour initialiser le nom du photographe dans la modale
	const photographName = document.querySelector(".modal_name");
	photographName.innerHTML += `<br>${photographModel.userName}`;

	// mise à jour du title avec le nom du photographe
	document.title += photographModel.userTitle;
}

/* galerie du photographe */
function displayPhotographGallery(media, photograph) {
	const photographGallery = document.querySelector(".photograph-gallery");

	function updateGallery(media) {
		photographGallery.innerHTML = "";
		media = sortbyOption(media, readSelectedOption());

		media.forEach((mediaItem) => {
			// si id du photographe
			if (photograph.id === mediaItem.photographerId) {
				const mediaModel = new Media(mediaItem);

				mediaModel.mediaDirectory = photographName;

				// afficher la photo ou la video
				photographGallery.innerHTML += mediaModel.userGalleryCard;
			}
		});
	}

	// total des likes sur le 'footer'
	function updateTotalLikes() {
		const photographPricePanel = document.querySelector(".photograph-price-panel");
		const photographModel = new Photographer(photograph);

		photographPricePanel.innerHTML = photographModel.userPanelPrice;
	}

	let photographName = photograph.name;
	photographName = photographName.split(" ")[0];

	updateGallery(media);

	updateTotalLikes();

	// initialisation de la lightbox et les likes
	Lightbox.init();
	Likes.init();

	const contactButton = document.getElementById("contact_button");
	contactButton.addEventListener("click", (e) => {
		e.preventDefault();
		displayModal();
	});

	// On active le listener sur le tri des options,
	const selectButton = document.getElementById("photograph-gallery-select");
	selectButton.addEventListener("change", (e) => {
		e.preventDefault();

		updateGallery(media);
		updateTotalLikes();

		// Re initialisation de la lightbox et des likes
		Lightbox.init();
		Likes.init();
	});
}

/* Initialisation de la page photographe */
async function init() {
	const identifier = parseInt(location.search.substring(1).split("&")[0].split("=")[1]);
	const { photographers, media } = await getPhotographers();

	const selectedPhotograph = selectPhotograph(photographers, identifier);

	displayPhotographHeader(selectedPhotograph);
	displayPhotographGallery(media, selectedPhotograph);
}

init();
