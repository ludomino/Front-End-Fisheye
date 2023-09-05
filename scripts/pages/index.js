// récupère les données du fichier photographsers.json
import { Photographer } from '../factories/photographer.js';

function getPhotographers() {
	return fetch("data/photographers.json")
		.then(response => response.json())
		.catch(err => { throw (`la requete API fetch a échoué: ${err}`); });
}

async function displayData(photographers) {
	const photographersSection = document.querySelector(".photographer_section");
	photographersSection.innerHTML = "";

	photographers.forEach((photographer) => {
		const photographerModel = new Photographer(photographer);
		photographersSection.innerHTML += photographerModel.userCardDOM;
	});
}


async function init() {
	const { photographers } = await getPhotographers();
	displayData(photographers);
}

init();
