// Get the HTML elements from the DOM
const container = document.getElementById("container");
const imgPost = document.getElementById("img-post");
const miniPost = document.getElementById("mini-post");
const imgPostLiked = document.getElementById("img-post-liked");
const miniPostLiked = document.getElementById("mini-post-liked");
const loadMoreBtn = document.getElementById("loadMore");
const cardsSection = document.getElementById("cards-section");

const burgerBtn = document.getElementById("burger-btn");
const mobileNav = document.getElementById("mobile-nav");
const mobileSubNav = document.getElementById("mobile-subnav");
const workSubnav = document.getElementById("our-work-subnav");
const serviceSubnav = document.getElementById("our-service-subnav");
const ourServiceUls = document.getElementById("our-service-uls");
const ourWorkUls = document.getElementById("our-work-uls");
const closeBtn = document.getElementById("close-btn");
const catagories = document.getElementById("catagories");

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

function generateCat(data) {
  const catHTML = data
    .map((cat) => {
      return ` <li>
      <a href="${cat.filelink}">${cat.filename}</a>(${cat.totalfiles})
    </li>`;
    })
    .join("");
  catagories.innerHTML = catHTML;
}

// Fetch main navigation data from a JSON file
fetch("../pages/pagesJson/main-nav.json")
  .then((response) => response.json())
  .then((mainNavData) => {
    // Fetch sub-navigation data from a JSON file
    fetch("../pages/pagesJson/sub-nav.json")
      .then((response) => response.json())
      .then((subNavData) => generateNavlinks(mainNavData, subNavData));
  });

// Function to generate navigation links
function generateNavlinks(mainNavData, subNavData) {
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
                  mainNavLink.icon + mainNavLink.pagename + mainNavLink.dropdown
                }
              </a>
              ${subNavLinks}
              
            </li>`;
    })
    .join("");

  // Populate the container with generated navigation bar
  container.innerHTML = navbar;
}

// Fetch card data from a JSON file
fetch("../pages/pagesJson/cards.json")
  .then((res) => res.json())
  .then((Cardsdata) => {
    // Call functions to render carousel and cards
    fetch("../pages/pagesJson/catagories.json")
      .then((res) => res.json())
      .then((data) => {
        generateSideNav(Cardsdata);
        generateCards(Cardsdata);
        generateCat(data);
      });
  });

function generateSideNav(cardsData) {
  let randomIndex = Math.floor(Math.random() * cardsData.length);
  let cardPostsHTML = "";
  let likedCardPostsHTML = "";

  cardPostsHTML = `
  <a href="${cardsData[randomIndex].href}">
  <img src="${cardsData[randomIndex].imageUrl}" class="img" style="border-radius:0;" height="200" alt="img"   >

  <div class="img-post-detail">
  <span class="post-title">${cardsData[randomIndex].title}</span>
          <span class="post-description"> ${cardsData[randomIndex].description}</span>
          <span class="post-author">by <strong>${cardsData[randomIndex].author}</strong></span>
          <span class="post-date"> - ${cardsData[randomIndex].date}</span>
  </div>
  </a>`;

  likedCardPostsHTML = `
  <a href="${cardsData[randomIndex].href}" >
  <img src="${cardsData[randomIndex].imageUrl}" class="img" style="border-radius:0;" height="200" alt=""  >

    <div class="img-post-detail" >
            <span class="post-title">${cardsData[randomIndex].title}</span>
            <span class="post-description">${cardsData[randomIndex].description}</span>
            <span class="post-author">by <strong>${cardsData[randomIndex].author}</strong></span>
            <span class="post-date"> - ${cardsData[randomIndex].date}</span>
    </div>
    </a>`;

  imgPost.innerHTML = cardPostsHTML;

  imgPostLiked.innerHTML = likedCardPostsHTML;

  let miniCards = "";
  let likedMiniCards = "";

  for (let i = 0; i < 12; i++) {
    if (i % 2 == 0) {
      miniCards += `
      <a href="${cardsData[i].href}">
      <div class="flex"  >
      <div class="mini-img">
      <img src="${cardsData[i].imageUrl}"style="border-radius:0; object-fit: cover;" height="100" width="150" alt="">
      </div>
      
    <div class="card-post-detail">
    <span class="post-description">${cardsData[i].description}</span>
    <span class="post-author" style="color: #979797;"> - ${cardsData[i].author}</span>
    </div>
    </div>
    </a>
`;
    } else {
      likedMiniCards += `
      <a href="${cardsData[i].href}">
      <div class="flex"  >
      <div class="mini-img">
      <img src="${cardsData[i].imageUrl}"  style="border-radius:0; object-fit: cover;" height="100" width="150" alt="">
      </div>
      
      <div class="card-post-detail">
      <span class="post-description">${cardsData[i].description}</span>
      <span class="post-author" style="color: #979797;"> - ${cardsData[i].author}</span>
    </div>
    </div>
    </a>
`;
    }
  }
  miniPost.innerHTML = miniCards;

  miniPostLiked.innerHTML = likedMiniCards;
}
function generateCards(data) {
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
}
