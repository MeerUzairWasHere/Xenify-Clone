setTimeout(() => {
  modal.innerHTML = ` <div class="popup-card slide-top">
      <p class="cookieHeading">We use cookies.</p>
      <p class="cookieDescription">We use cookies to ensure that we give you the best experience on our website.
          <br><a href="#">Read cookies policies</a>.
      </p>
    
      <div class="buttonContainer">
          <button id="acceptBtn" class="acceptButton">Allow</button>
          <button id="declineBtn" class="declineButton">Decline</button>
      </div>
    
    </div>`;

  document.getElementById("acceptBtn").addEventListener("click", () => {
    modal.innerHTML = `<div  class="popup-card scale-up-center">
        <p class="cookieHeading " style="text-align:center">Thanks for accepting our cookies!</p>
    
      </div>`;
    setTimeout(() => {
      modal.style.display = "none";
    }, 2000);
  });

  document.getElementById("declineBtn").addEventListener("click", () => {
    modal.style.display = "none";
  });
}, 10000);

var Tawk_API = Tawk_API || {},
  Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/6505517a0f2b18434fd8d386/1haeccitr";
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
})();
