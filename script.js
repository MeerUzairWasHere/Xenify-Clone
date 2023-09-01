// Get the HTML elements from the DOM
const container = document.getElementById("container");
const heroDiv = document.getElementById("hero-section-container");
const heroCorousal = document.getElementById("hero-corousal");
const cardsSection = document.getElementById("cards-section");
const imgPost = document.getElementById("img-post");
const miniPost = document.getElementById("mini-post");
const imgPostLiked = document.getElementById("img-post-liked");
const miniPostLiked = document.getElementById("mini-post-liked");
const loadMoreBtn = document.getElementById("loadMore");
const burgerBtn = document.getElementById("burger-btn");
const mobileNav = document.getElementById("mobile-nav");
const mobileSubNav = document.getElementById("mobile-subnav");
const workSubnav = document.getElementById("our-work-subnav");
const serviceSubnav = document.getElementById("our-service-subnav");
const ourServiceUls = document.getElementById("our-service-uls");
const ourWorkUls = document.getElementById("our-work-uls");
const closeBtn = document.getElementById("close-btn");
const catagories = document.getElementById("catagories");

async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

async function generateCat() {
  try {
    const data = await fetchData("/Json/catagories.json");
    const catHTML = data
      .map((cat) => {
        return ` <li>
          <a href="${cat.filelink}">${cat.filename}</a>(${cat.totalfiles})
        </li>`;
      })
      .join("");
    catagories.innerHTML = catHTML;
  } catch (error) {
    console.error("Error fetching catagories:", error);
  }
}

burgerBtn.addEventListener("click", () => {
  mobileSubNav.style.left = "0";
});

closeBtn.addEventListener("click", () => {
  mobileSubNav.style.left = "-100%";
});

workSubnav.addEventListener("click", () => {
  ourWorkUls.classList.toggle("is-active");
});

serviceSubnav.addEventListener("click", () => {
  ourServiceUls.classList.toggle("is-active");
});

async function generateNavlinks(mainNavData, subNavData) {
  try {
    const subNavResponse = await fetchData("/Json/sub-nav.json");
    const subNavData = subNavResponse;
    // Generate navigation bar using main and sub navigation data
    const navbar = mainNavData
      .map((mainNavLink) => {
        // Find the corresponding sub-navigation data
        const subNav = subNavData.find(
          (subNavLink) => subNavLink.mainNavId === mainNavLink.id
        );

        // Generate sub-navigation links HTML
        const subNavLinks =
          subNav && subNav.subNavItems
            ? `<ul class="sub-nav">${subNav.subNavItems
                .map(
                  (
                    subNavLink
                  ) => `<li ${`data-title="${subNavLink.title}"`} onclick="getTitle(event)" class="sub-nav-li" id="${
                    subNavLink.id
                  }">
                  <a href="${subNavLink.subPagelink}">
                    ${
                      subNavLink.imageUrl
                        ? `<img src="${subNavLink.imageUrl}" class="nav-img" width="150" height="150" alt="Image">`
                        : ""
                    }
                    <h3 class="nav-title">${
                      subNavLink.title || subNavLink.subPagename
                    }</h2>
                    <p>${subNavLink.description || ""}</p>
                    <small>${subNavLink.date || ""}</small>
                  </a>
                </li>`
                )
                .join("")}</ul>`
            : "";

        // Generate the main navigation link with sub-navigation links
        return `<li  class="nav-li  ${
          mainNavLink.id == "2" ? "mega-menu" : ""
        }"  id="${mainNavLink.id}"  >
            
                    <a href="${mainNavLink.pagelink}" >
                      ${
                        mainNavLink.icon +
                        mainNavLink.pagename +
                        mainNavLink.dropdown
                      }
                    </a>
                    ${subNavLinks}
                    
                  </li>`;
      })
      .join("");

    // Populate the container with generated navigation bar
    container.innerHTML = navbar;
  } catch (error) {
    console.error("Error generating navigation links:", error);
  }
}

async function fetchCardData() {
  try {
    const response = await fetchData("/Json/cards.json");
    return response;
  } catch (error) {
    console.error("Error fetching card data:", error);
    return [];
  }
}

async function renderCards() {
  try {
    const data = await fetchCardData();
    // Generate card HTML for each card in the data
    const cardHTML = data
      .map((card) => {
        return `<div class='card'>
                  <span class='title'>${card.title}</span>
                  <span class="description"><a href="${card.href}">${card.description}</a></span>
                  <div class="info card-author-date">
                    by<span class="author"> ${card.author}</span> <span class="date">${card.date}</span>
                  </div>
                </div>`;
      })
      .join("");

    // Populate the hero section with generated card HTML
    heroDiv.innerHTML = cardHTML;
  } catch (error) {
    console.error("Error rendering cards:", error);
  }
}

async function renderCorousal() {
  try {
    const data = await fetchCardData();
    // Get a random index for selecting a card
    let randomIndex = Math.floor(Math.random() * data.length);

    let corousalHTML = "";

    // Generate HTML for the carousel using a random card
    corousalHTML += `
      <div class="img-container"   >
        <img src="${data[randomIndex].imageUrl}" height="600" class="img">
      </div>
      <div class="img-card" >
        <span class='title'>${data[randomIndex].title}</span>
        <span class="description"><a href="${data[randomIndex].href}">${data[randomIndex].description}</a></span>
        <div class="info card-author-date">
          by<span class="author"> ${data[randomIndex].author}</span> <span class="date">${data[randomIndex].date}</span>
        </div>
        <span class="sub-description card-description">${data[randomIndex].subDescription}</span>
      </div>`;

    // Populate the hero carousel with generated HTML
    heroCorousal.innerHTML = corousalHTML;
  } catch (error) {
    console.error("Error rendering carousel:", error);
  }
}

async function generateCards() {
  try {
    const data = await fetchCardData();
    const infoCardsHTML = data
      .map((card) => {
        return ` <a href="${
          card.href
        }" ${`data-title="${card.title}"`} onclick="getTitle(event)" >
      <div class="card-img">
           <img src="${card.imageUrl}" class="imgg" alt="img">
      </div>
      <div class="card-details">
          <h3 class="card-title">${card.description}</h3>
          <p class="card-author-date">by <span class="author" >${
            card.author
          }</span> - ${card.date}</p>
          <p class="card-description">${card.subDescription}</p>
      </div>
      <span class="tag">${card.title}</span>
  </a>`;
      })
      .join("");
    cardsSection.innerHTML = infoCardsHTML;
  } catch (error) {
    console.error("Error generating cards:", error);
  }
}

loadMoreBtn.addEventListener("click", () => {
  cardsSection.style.overflowY = "visible";
  cardsSection.style.height = "auto";
  loadMoreBtn.innerText = "That is All";
  loadMoreBtn.style.backgroundColor = "rgba(155,170,175,0.12)";
  loadMoreBtn.style.color = "#979797";
  loadMoreBtn.style.cursor = "not-allowed";
});

async function generateSideNav() {
  try {
    const data = await fetchCardData();
    let randomIndex = Math.floor(Math.random() * data.length);
    let cardPostsHTML = "";
    let likedCardPostsHTML = "";

    cardPostsHTML = `
    <a href="${data[randomIndex + 1].href}">
    <img src="${
      data[randomIndex + 1].imageUrl
    }" class="img" style="border-radius:0;" height="200" alt="img"   >

    <div class="img-post-detail">
    <span class="post-title">${data[randomIndex + 1].title}</span>
            <span class="post-description"> ${
              data[randomIndex + 1].description
            }</span>
            <span class="post-author">by <strong>${
              data[randomIndex + 1].author
            }</strong></span>
            <span class="post-date"> - ${data[randomIndex + 1].date}</span>
    </div>
    </a>`;

    likedCardPostsHTML = `
    <a href="${data[randomIndex + 2].href}" >
    <img src="${
      data[randomIndex + 2].imageUrl
    }" class="img" style="border-radius:0;" height="200" alt=""  >

      <div class="img-post-detail" >
              <span class="post-title">${data[randomIndex + 2].title}</span>
              <span class="post-description">${
                data[randomIndex + 2].description
              }</span>
              <span class="post-author">by <strong>${
                data[randomIndex + 2].author
              }</strong></span>
              <span class="post-date"> - ${data[randomIndex + 2].date}</span>
      </div>
      </a>`;

    imgPost.innerHTML = cardPostsHTML;

    imgPostLiked.innerHTML = likedCardPostsHTML;

    let miniCards = "";
    let likedMiniCards = "";

    for (let i = 0; i < 12; i++) {
      if (i % 2 == 0) {
        miniCards += `
        <a href="${data[i].href}">
        <div class="flex"  >
        <div class="mini-img">
        <img src="${data[i].imageUrl}"style="border-radius:0; object-fit: cover;" height="100" width="150" alt="">
        </div>
        
      <div class="card-post-detail">
      <span class="post-description">${data[i].description}</span>
      <span class="post-author" style="color: #979797;"> - ${data[i].author}</span>
      </div>
      </div>
      </a>
  `;
      } else {
        likedMiniCards += `
        <a href="${data[i].href}">
        <div class="flex"  >
        <div class="mini-img">
        <img src="${data[i].imageUrl}"  style="border-radius:0; object-fit: cover;" height="100" width="150" alt="">
        </div>
        
        <div class="card-post-detail">
        <span class="post-description">${data[i].description}</span>
        <span class="post-author" style="color: #979797;"> - ${data[i].author}</span>
      </div>
      </div>
      </a>
  `;
      }
    }
    miniPost.innerHTML = miniCards;

    miniPostLiked.innerHTML = likedMiniCards;
  } catch (error) {
    console.error("Error generating side navigation:", error);
  }
}

// Call the async functions to start fetching and rendering data
(async () => {
  await generateCat();
  const mainNavResponse = await fetchData("/Json/main-nav.json");
  const mainNavData = mainNavResponse;
  await generateNavlinks(mainNavData);
  await renderCards();
  await renderCorousal();
  await generateCards();
  await generateSideNav();
})();
