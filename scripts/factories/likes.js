export class Likes {
	static init() {
		const likesIcon = document.querySelectorAll(".likesSection button");
		let totalLikes = document.getElementById("totalLikes");

		function updateLikes(link, totalLikes) {
			if (link.classList[0] === "likeIcon") {
				link.classList.remove("likeIcon");
				--link.parentElement.childNodes[1].innerHTML;
				--totalLikes.innerHTML;
				link.setAttribute("aria-label", "J'aime pas");
			} else {
				link.classList.add("likeIcon");
				++link.parentElement.childNodes[1].innerHTML;
				++totalLikes.innerHTML;
				link.setAttribute("aria-label", "J'aime");
			}
		}

		// listener sur clic du coeur ajouter un like
		likesIcon.forEach((link) =>
			link.addEventListener("click", (e) => {
				e.preventDefault();
				updateLikes(link, totalLikes);
			})
		);
	}
}
