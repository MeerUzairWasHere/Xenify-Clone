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

// Fetch main navigation data from a JSON file
fetch("/main-nav.json")
  .then((response) => response.json())
  .then((mainNavData) => {
    // Fetch sub-navigation data from a JSON file
    fetch("/sub-nav.json")
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
function renderData() {
  fetch("/cards.json")
    .then((res) => res.json())
    .then((data) => {
      // Call functions to render carousel and cards
      generateSideNav(data);
      generateCards(data);
      renderCorousal(data);
      renderCards(data);
    });
}
renderData();

//setInterval(renderData, 60000);

// Function to render individual cards
function renderCards(data) {
  // Generate card HTML for each card in the data

  const cardHTML = data
    .map((card) => {
      return `<div  ${`data-title="${card.title}"`} onclick="getTitle(event)"  class='card'>
                <span class='title'>${card.title}</span>
                <span class="description"><a href="#">${
                  card.description
                }</a></span>
                <div class="info card-author-date">
                  by<span class="author"> ${
                    card.author
                  }</span> <span class="date">${card.date}</span>
                </div>
              </div>`;
    })
    .join("");

  // Populate the hero section with generated card HTML
  heroDiv.innerHTML = cardHTML;
}

// Function to render the carousel
function renderCorousal(cardsData) {
  // Get a random index for selecting a card
  let randomIndex = Math.floor(Math.random() * cardsData.length);

  let corousalHTML = "";

  // Generate HTML for the carousel using a random card
  corousalHTML += `
    <div class="img-container" ${`data-title="${cardsData[randomIndex].title}"`} onclick="getTitle(event)" >
      <img src="${cardsData[randomIndex].imageUrl}" height="600" class="img">
    </div>
    <div class="img-card" ${`data-title="${cardsData[randomIndex].title}"`} onclick="getTitle(event)" >
      <span class='title'>${cardsData[randomIndex].title}</span>
      <span class="description"><a href="#">${
        cardsData[randomIndex].description
      }</a></span>
      <div class="info card-author-date">
        by<span class="author"> ${
          cardsData[randomIndex].author
        }</span> <span class="date">${cardsData[randomIndex].date}</span>
      </div>
      <span class="sub-description card-description">${
        cardsData[randomIndex].subDescription
      }</span>
    </div>`;

  // Populate the hero carousel with generated HTML
  heroCorousal.innerHTML = corousalHTML;
}

function generateCards(data) {
  const infoCardsHTML = data
    .map((card) => {
      return ` <a href="#" ${`data-title="${card.title}"`} onclick="getTitle(event)" >
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

loadMoreBtn.addEventListener("click", () => {
  cardsSection.style.overflowY = "visible";
  cardsSection.style.height = "auto";
  loadMoreBtn.innerText = "That is All";
  loadMoreBtn.style.backgroundColor = "rgba(155,170,175,0.12)";
  loadMoreBtn.style.color = "#979797";
  loadMoreBtn.style.cursor = "not-allowed";
});

function generateSideNav(cardsData) {
  let randomIndex = Math.floor(Math.random() * cardsData.length);
  let cardPostsHTML = "";
  let likedCardPostsHTML = "";

  cardPostsHTML = `
  <div ${`data-title="${
    cardsData[randomIndex + 1].title
  }"`} onclick="getTitle(event)" >
  <img src="${
    cardsData[randomIndex + 1].imageUrl
  }" class="img" style="border-radius:0;" height="200" alt=""   >

  <div class="img-post-detail">
          <span class="post-title">${cardsData[randomIndex + 1].title}</span>
          <span class="post-description"> ${
            cardsData[randomIndex + 1].description
          }</span>
          <span class="post-author">by <strong>${
            cardsData[randomIndex + 1].author
          }</strong></span>
          <span class="post-date"> - ${cardsData[randomIndex + 1].date}</span>
  </div>
  </div>`;

  likedCardPostsHTML = `
  <div ${`data-title="${
    cardsData[randomIndex + 2].title
  }"`} onclick="getTitle(event)" >
  <img src="${
    cardsData[randomIndex + 2].imageUrl
  }" class="img" style="border-radius:0;" height="200" alt=""  >

    <div class="img-post-detail" >
            <span class="post-title">${cardsData[randomIndex + 2].title}</span>
            <span class="post-description">${
              cardsData[randomIndex + 2].description
            }</span>
            <span class="post-author">by <strong>${
              cardsData[randomIndex + 2].author
            }</strong></span>
            <span class="post-date"> - ${cardsData[randomIndex + 2].date}</span>
    </div>
    </div>`;

  imgPost.innerHTML = cardPostsHTML;

  imgPostLiked.innerHTML = likedCardPostsHTML;

  let miniCards = "";
  let likedMiniCards = "";

  for (let i = 0; i < 12; i++) {
    if (i % 2 == 0) {
      miniCards += `
      <div class="flex" ${`data-title="${cardsData[i].title}"`} onclick="getTitle(event)" >
      <div class="mini-img">
      <img src="${
        cardsData[i].imageUrl
      }"style="border-radius:0; object-fit: cover;" height="100" width="150" alt="">
      </div>

    <div class="card-post-detail">
      <span class="post-description">${cardsData[i].description}</span>
      <span class="post-author" style="color: #979797;"> - ${
        cardsData[i].author
      }</span>
    </div>
    </div>
`;
    } else {
      likedMiniCards += `
      <div class="flex" ${`data-title="${cardsData[i].title}"`} onclick="getTitle(event)" >
      <div class="mini-img">
      <img src="${
        cardsData[i].imageUrl
      }"  style="border-radius:0; object-fit: cover;" height="100" width="150" alt="">
      </div>

    <div class="card-post-detail">
      <span class="post-description">${cardsData[i].description}</span>
      <span class="post-author" style="color: #979797;"> - ${
        cardsData[i].author
      }</span>
    </div>
    </div>
`;
    }
  }
  miniPost.innerHTML = miniCards;

  miniPostLiked.innerHTML = likedMiniCards;
}

const wrapper = document.getElementById("wrapper");

function getTitle(event) {
  heroCorousal.style.display = "none";
  heroDiv.style.display = "none";

  event.preventDefault(); // Prevents the link from navigating

  let CurrentTitle = event.currentTarget.getAttribute("data-title"); // Find the closest li element

  fetch("/cards.json")
    .then((res) => res.json())
    .then((data) => {
      renderChild(data);
    });

  function renderChild(data) {
    let currentChild = data.filter((obj) => obj.title == CurrentTitle);

    console.log(CurrentTitle);
    console.log(currentChild);

    let bodyHTML = currentChild.map((card) => {
      return `  <div id="child-body" class="child-body">
      <div class="child-content">
          <h1 class="description child-h1">${card.description}</h1>
          <div class="info card-author-date ">
              
          </div>
          <p class="info">
              by<span class="author "> ${card.author}</span> <span class="date">- ${card.date}</span>
          </p>
      </div>

      <div class="img-container img">
          <img src="${card.imageUrl}" alt="img" class="img">
      </div>
      <p class="card-description child-description">${card.subDescription}</p>
    <p class="card-description child-description" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit distinctio totam enim et dolores consequuntur in eveniet optio quam voluptatum deleniti aut, laudantium, libero, ducimus minus cumque excepturi. Quo commodi ex vero, error consequuntur, culpa similique possimus libero dolor, laboriosam atque officiis eligendi. Quos fuga doloribus quam nam totam quod porro quasi? Ab aliquam placeat cumque quia sapiente sed quam pariatur ipsa enim necessitatibus deleniti optio voluptatibus dignissimos, soluta dolore harum eos eaque quae architecto fugiat? Voluptatibus omnis at sint laudantium tempore facilis consectetur sapiente ab nobis iste doloribus iure cupiditate magnam temporibus porro nesciunt, maiores dicta deleniti vitae libero aperiam culpa assumenda quo. Laudantium illum quasi saepe officia veritatis numquam autem aliquid praesentium dolorum et! Eaque sequi iste perferendis adipisci unde consequatur voluptates, excepturi ex expedita magnam quia libero suscipit, mollitia aut! Ut eius modi quam assumenda hic enim quasi commodi. Voluptatibus officiis laborum autem libero cumque suscipit quidem cum reprehenderit iusto, labore expedita doloribus odio ut numquam modi, voluptas, voluptatem deserunt repudiandae reiciendis id illum soluta. Fugit, earum itaque obcaecati a vel nam enim esse iste distinctio quia similique incidunt aliquid facilis. Dolorem labore hic delectus? Molestiae corrupti labore sapiente culpa voluptatibus beatae reiciendis ipsam dicta hic ipsum.</p>

  </div>
`;
    });

    wrapper.innerHTML = bodyHTML;
  }
}
