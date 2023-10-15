class MediaPhoto {
	constructor(data) {
		this._title = data.title;
		this._picture = data.image;
		this._likes = data.likes;
		this._id = data.id;
		this._directory = "";
	}

	get picture() {
		return `../assets/photographers/${this._picture}`;
	}


	set mediaDirectory(name) {
		if (name.split("-") !== name) {
			name = name.split("-").join(" ");
		}
		this._directory = `assets/photographers/${name}`;
	}

	get userGalleryCard() {
		return `
      <figure class="mediacard" aria-label="${this._title}">
        <img role="link" class="media_focus media_zoom" tabindex="0" src="${this._directory}/${this._picture}" tabindex="0" alt="${this._title} closeup view"/>
        <figcaption>
          <h3>${this._title}</h3>
          <div class="likesSection">
            <p class="likesNumber">${this._likes}</p>
            <button tabindex="0" aria-label="likes"><i class="fa fa-heart"></i></button>
          </div>
        </figcaption>
      </figure>`;
	}
}

/* MediaMovie : gallery card avec video */

class MediaMovie {
	constructor(data) {
		this._title = data.title;
		this._movie = data.video;
		this._likes = data.likes;
		this._id = data.id;
		this._directory = "";
	}

	set mediaDirectory(name) {
		if (name.split("-") !== name) {
			name = name.split("-").join(" ");
		}
		this._directory = `assets/photographers/${name}`;
	}

	get userGalleryCard() {
		return `
      <figure class="mediacard" aria-label="${this._title}">
				<video role="link" class="media_focus media_zoom" tabindex="0" src="${this._directory}/${this._movie}" aria-label="${this._title} closeup view" >
      	</video>
        <figcaption>
          <h3>${this._title}</h3>
          <div class="likesSection">
            <p class="likesNumber">${this._likes}</p>
            <button tabindex="0" aria-label="likes"><i class="fa fa-heart"></i></button>
          </div>
        </figcaption>
      </figure>
       `;
	}
}

/* Media : photo ou video */
export class Media {
	constructor(data) {
		if (data.image) {
			return new MediaPhoto(data);
		} else if (data.video) {
			return new MediaMovie(data);
		} else {
			throw "Unknown type format";
		}
	}
}
