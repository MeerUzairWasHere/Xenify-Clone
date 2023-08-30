// const wrapper = document.getElementById("wrapper");

// const currentPath = window.location.pathname;
// const pathParts = currentPath.split("/");
// // Get the last part, which is the filename
// const currentFilenameWithExtension = pathParts[pathParts.length - 1];
// // Split the filename by "." to get filename without extension
// const currentFilenameWithoutExtension =
//   currentFilenameWithExtension.split(".")[0];

// fetch("/Json/cards.json")
//   .then((res) => res.json())
//   .then((data) => {
//     renderChild(data);
//   });

// function renderChild(data) {
//   let currentChild = data.filter(
//     (obj) => obj.title.toLowerCase() === currentFilenameWithoutExtension
//   );

//   let bodyHTML = currentChild.map((card) => {
//     return `  <div id="child-body" class="child-body">
//          <div class="child-content">
//              <h1 class="description child-h1">${card.description}</h1>
//          <div class="info card-author-date ">

//              </div>
//              <p class="info">
//                  by<span class="author "> ${card.author}</span> <span class="date">- ${card.date}</span>
//              </p>
//              </div>

//          <div class="img-container img">
//              <img src="${card.imageUrl}" alt="img" class="img">
//          </div>
//          <p class="card-description child-description">${card.subDescription}</p>
//          <p class="card-description child-description" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit distinctio totam enim et dolores consequuntur in eveniet optio quam voluptatum deleniti aut, laudantium, libero, ducimus minus cumque excepturi. Quo commodi ex vero, error consequuntur, culpa similique possimus libero dolor, laboriosam atque officiis eligendi. Quos fuga doloribus quam nam totam quod porro quasi? Ab aliquam placeat cumque quia sapiente sed quam pariatur ipsa enim necessitatibus deleniti optio voluptatibus dignissimos, soluta dolore harum eos eaque quae architecto fugiat? Voluptatibus omnis at sint laudantium tempore facilis consectetur sapiente ab nobis iste doloribus iure cupiditate magnam temporibus porro nesciunt, maiores dicta deleniti vitae libero aperiam culpa assumenda quo. Laudantium illum quasi saepe officia veritatis numquam autem aliquid praesentium dolorum et! Eaque sequi iste perferendis adipisci unde consequatur voluptates, excepturi ex expedita magnam quia libero suscipit, mollitia aut! Ut eius modi quam assumenda hic enim quasi commodi. Voluptatibus officiis laborum autem libero cumque suscipit quidem cum reprehenderit iusto, labore expedita doloribus odio ut numquam modi, voluptas, voluptatem deserunt repudiandae reiciendis id illum soluta. Fugit, earum itaque obcaecati a vel nam enim esse iste distinctio quia similique incidunt aliquid facilis. Dolorem labore hic delectus? Molestiae corrupti labore sapiente culpa voluptatibus beatae reiciendis ipsam dicta hic ipsum.</p>

//          </div>
//      `;
//   });

//   wrapper.innerHTML = bodyHTML;
// }
