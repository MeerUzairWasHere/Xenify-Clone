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
const mobileNav = document.getElementById("mobile-nav");
const mobileSubNav = document.getElementById("mobile-subnav");
const mobileSubNavUl = document.getElementById("mobile-subnav-ul");
const catagories = document.getElementById("catagories");

async function fetchData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
}

async function generateCat() {
  try {
    const data = await fetchData("../Json/catagories.json");
    const catHTML = data
      .map((cat) => {
        return ` <li>
          <a href=".${cat.filelink}">${cat.filename}</a>(${cat.totalfiles})
        </li>`;
      })
      .join("");
    catagories.innerHTML = catHTML;
  } catch (error) {
    console.error("Error generating catagories:", error);
  }
}




async function generateNavlinks(mainNavData) {
  try {
    const subNavResponse = await fetchData("../Json/sub-nav.json");
    const subNavData = subNavResponse;

    const navbar = mainNavData
      .map((mainNavLink) => {
        const subNav = subNavData.find(
          (subNavLink) => subNavLink.mainNavId === mainNavLink.id
        );

        const subNavLinks =
          subNav && subNav.subNavItems
            ? `<ul class="sub-nav">${subNav.subNavItems
                .map(
                  (subNavLink) => `<li data-title="${
                    subNavLink.title
                  }" class="sub-nav-li" id="${subNavLink.id}">
                  <a href=".${subNavLink.subPagelink}">
                    ${
                      subNavLink.imageUrl
                        ? `<img src=".${subNavLink.imageUrl}" class="nav-img" width="150" height="150" alt="Image">`
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

        return `<li class="nav-li ${
          mainNavLink.id == "2" ? "mega-menu" : ""
        }" id="${mainNavLink.id}">
              <a href=".${mainNavLink.pagelink}">
                ${
                  mainNavLink.id == "0" ? `<img src='.${mainNavLink.logo}' height='30' />` : ( mainNavLink.icon + mainNavLink.pagename + mainNavLink.dropdown)
                }
              </a>
              ${subNavLinks}
            </li>`;
      })
      .join("");

    container.innerHTML = navbar;
  } catch (error) {
    console.error("Error generating navigation links:", error);
  }
}

async function fetchCardData() {
  try {
    const response = await fetchData("../Json/cards.json");
    return response || [];
  } catch (error) {
    console.error("Error fetching card data:", error);
    return [];
  }
}


async function generateSideNav() {
  try {
    const data = await fetchCardData();
    const randomIndex = Math.floor(Math.random() * data.length);
    let cardPostsHTML = "";
    let likedCardPostsHTML = "";

    cardPostsHTML = `
      <a href=".${data[randomIndex].href}">
        <img src=".${data[randomIndex].imageUrl}" class="img" style="border-radius:0;" height="200" alt="img">
        <div class="img-post-detail">
          <span class="post-title">${data[randomIndex].title}</span>
          <span class="post-description">${data[randomIndex].description}</span>
          <span class="post-author">by <strong>${data[randomIndex].author}</strong></span>
          <span class="post-date"> - ${data[randomIndex].date}</span>
        </div>
      </a>`;

    likedCardPostsHTML = `
      <a href=".${data[randomIndex].href}">
        <img src=".${data[randomIndex].imageUrl}" class="img" style="border-radius:0;" height="200" alt="">
        <div class="img-post-detail">
          <span class="post-title">${data[randomIndex].title}</span>
          <span class="post-description">${data[randomIndex].description}</span>
          <span class="post-author">by <strong>${data[randomIndex].author}</strong></span>
          <span class="post-date"> - ${data[randomIndex].date}</span>
        </div>
      </a>`;

    imgPost.innerHTML = cardPostsHTML;
    imgPostLiked.innerHTML = likedCardPostsHTML;

    let miniCards = "";
    let likedMiniCards = "";

    for (let i = 0; i < 12; i++) {
      if (i % 2 == 0) {
        miniCards += `
          <a href=".${data[i].href}">
            <div class="flex">
              <div class="mini-img">
                <img src=".${data[i].imageUrl}" style="border-radius:0; object-fit: cover;" height="100" width="150" alt="">
              </div>
              <div class="card-post-detail">
                <span class="post-description">${data[i].description}</span>
                <span class="post-author" style="color: #979797;"> - ${data[i].author}</span>
              </div>
            </div>
          </a>`;
      } else {
        likedMiniCards += `
          <a href=".${data[i].href}">
            <div class="flex">
              <div class="mini-img">
                <img src=".${data[i].imageUrl}" style="border-radius:0; object-fit: cover;" height="100" width="150" alt="">
              </div>
              <div class="card-post-detail">
                <span class="post-description">${data[i].description}</span>
                <span class="post-author" style="color: #979797;"> - ${data[i].author}</span>
              </div>
            </div>
          </a>`;
      }
    }

    miniPost.innerHTML = miniCards;
    miniPostLiked.innerHTML = likedMiniCards;
  } catch (error) {
    console.error("Error generating side navigation:", error);
  }
}

async function generateMobileNav(data) {
  try {
    console.log();
    let mobileNavHTML = ``;
    mobileNavHTML = `
            <a><i class="fa-solid fa-bars fa-xl" id="burger-btn"></i></a>
            <a href=".${data[0].pagelink}"><img src=".${data[0].mobileLogo}" width="100" alt="logo"></a>`;

    mobileNav.innerHTML = mobileNavHTML;

    document.getElementById("burger-btn").addEventListener("click", () => {
      mobileSubNav.style.left = "0";
    });
  } catch (error) {
    console.error("Error generating side navigation:", error);
  }
}
async function generateMobileNavlinks(mainNavData) {
  try {
    const subNavResponse = await fetchData("../Json/sub-nav.json");
    const subNavData = subNavResponse;
    let mobileNavCanvasHTML = ` 
        <li class="mobile-nav-header">
         
          <a href=".${mainNavData[0].pagelink}"><img src=".${mainNavData[0].mobileLogo}" width="100" alt="xenify-logo"></a>

          <a><i class="fa-solid fa-xmark fa-xl" id="close-btn"></i></a>
        </li>
        <div class="mobile-nav-lis" id="inner">
      

        </div>

`;

    const navbar = mainNavData
      .map((mainNavLink) => {
        const subNav = subNavData.find(
          (subNavLink) => subNavLink.mainNavId === mainNavLink.id
        );

        const subNavLinks =
          subNav && subNav.subNavItems
            ? `<ul 
            
            id="${
              mainNavLink.id == "4"
                ? "our-service-uls"
                : mainNavLink.id == "5"
                ? "our-work-uls"
                : ""
            }"
            
            class="hoverUl" >${subNav.subNavItems
              .map(
                (subNavLink) => `<li  id="${subNavLink.id}"> <a href=".${
                  subNavLink.subPagelink
                }">
                    
                    <h3 >${subNavLink.subPagename || ""}</h2>
                    

                  </a>
                </li>`
              )
              .join("")}</ul>`
            : "";

        return `
        
        <li 

        class="${
          mainNavLink.id == "4"
            ? "dropdown"
            : `${mainNavLink.id == "5" ? "dropdown" : ""}`
        }"
        id="${
          mainNavLink.id == "2"
            ? "mobile-mega-menu"
            : mainNavLink.id == "4"
            ? "our-service-subnav"
            : `${
                mainNavLink.id == "5"
                  ? "our-work-subnav"
                  : mainNavLink.id == "0"
                  ? "logo"
                  : ""
              }`
        }">
        
        <a href=".${mainNavLink.pagelink}"  class="${
          mainNavLink.id == "4"
            ? "nav-header"
            : `${mainNavLink.id == "5" ? "nav-header" : ""}`
        }" >${mainNavLink.pagename + mainNavLink.dropdown}
              </a>
              ${subNavLinks}
            </li>
        
            `;
      })
      .join("");

    mobileNavCanvasHTML = ` 
        <li class="mobile-nav-header">
        <a href=".${mainNavData[0].pagelink}"><img src=".${mainNavData[0].mobileLogo}" width="100" alt="xenify-logo"></a>

          <a><i class="fa-solid fa-xmark fa-xl" id="close-btn"></i></a>
        </li>
        <div class="mobile-nav-lis" id="inner">
        ${navbar}
        </div>

`;

    mobileSubNavUl.innerHTML = mobileNavCanvasHTML;
  } catch (error) {
    console.error("Error generating navigation links:", error);
  }

  document.getElementById("close-btn").addEventListener("click", () => {
    mobileSubNav.style.left = "-100%";
  });

  
}

// Call the async functions to start fetching and rendering data
(async () => {
  generateCat();
  generateSideNav();
  const mainNavResponse = await fetchData("../Json/main-nav.json");
  generateNavlinks(mainNavResponse);
  await generateMobileNav(mainNavResponse);
  await generateMobileNavlinks(mainNavResponse);
})();

