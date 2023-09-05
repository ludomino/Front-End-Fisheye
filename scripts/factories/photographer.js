function photographerFactory(data) {
  const { name, portrait, city, price, tagline, id } = data;

  const picture = `assets/photographers/${portrait}`;

  // récupère lélément article avec les données name, city, tagline & price
  function getUserCardDOM() {
      const article = document.createElement( 'article' );
      const img = document.createElement( 'img' );
      img.setAttribute("src", picture)
      const h2 = document.createElement( 'h2' );
      h2.textContent = name;
      const pCity = document.createElement( 'p' );
      pCity.textContent = city;
      const pTagline = document.createElement( 'p' );
      pTagline.textContent = tagline;
      const pPrice = document.createElement( 'p' );
      pPrice.textContent = price + " €/j";
      article.appendChild(img);
      article.appendChild(h2);
      article.appendChild(pCity);
      article.appendChild(pTagline);
      article.appendChild(pPrice);
      console.log(article);
      return (article);
  }

  return { name, picture, city, price, tagline, id, getUserCardDOM }
}
