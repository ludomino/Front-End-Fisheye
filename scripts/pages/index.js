function getPhotographers() {
	return fetch("../../data/photographers.json")
		.then(response => response.json())
		.catch(err => { throw (`la requete API fetch a échoué: ${err}`); });
}

async function displayData(photographers) {
	const photographersSection = document.querySelector(".photographer_section");

	photographers.forEach((photographer) => {
		const photographerModel = photographerFactory(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}

async function init() {
	const { photographers } = await getPhotographers();
	displayData(photographers);
}

init();
