// ... rest of your code

export class Photographer {
	constructor(data) {
		this._name = data.name;
		this._id = data.id;
		this._city = data.city;
		this._country = data.country;
		this._tagline = data.tagline;
		this._price = data.price;
		this._picture = data.portrait;
	}

	get location() {
		return `${this._city}, ${this._country}`;
	}

	get userTitle() {
		return ` - ${this._name}`;
	}

	get userName() {
		return ` ${this._name}`;
	}

	get computeTotalLikes() {
		let sumLikes = 0;
		const likes = document.querySelectorAll(".likesNumber");
		likes.forEach((like) => {
			sumLikes += Number(like.textContent);
		});
		return sumLikes;
	}

	// card photographe
	get userCardDOM() {
		return `
        <article>
					<a role="link" href="./photographer.html?id=${this._id}">
	          <img class="photographer_zoom" src="assets/photographers/${this._picture}" alt="${this._name}"></img>
          	<h2 aria-label="${this._name}">${this._name}</h2>
					</a>
					<div role="paragraph">
	          <h3 class="location">${this.location}</h3>
  	        <p class="tagline">${this._tagline}</p>
    	      <p class="price">${this._price}€/jour</p>
					</div>
				</article>
       `;
	}

	// infos sur le photographe
	get userData() {
		return `
      <article class="profile">
        <h1>${this._name}</h1>
				<div role="paragraph">
	        <h2 class="location">${this.location}</h2>
  	      <p class="tagline">${this._tagline}</p>
				</div>
      </article>
      <div class="contact">
        <button type="button" aria-haspopup="dialog" id="contact_button" class="contact_button" aria-label="contacter le photographe ${this._name}">Contactez-moi</button>
      </div>
      <img src="assets/photographers/${this._picture}" alt="${this._name}"></img>
     `;
	}

	// likes & price
	get userPanelPrice() {
		return `
      <div aria-label="Total likes est ${this.computeTotalLikes}, taux journalier est ${this._price}">
        <p id="totalLikes">${this.computeTotalLikes}</p>
        <i class="fa fa-heart"></i>
      </div>
      <p>${this._price} €/jour</p>
    `;
	}
}
