// document.addEventListener("DOMContentLoaded", function () {
//   const authLinks = document.getElementById("auth-links");
//   const userInfo = document.getElementById("user-info");
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   const bookingLink = document.getElementById("booking");
//   if (!currentUser) {
//     authLinks.style.display = "block";
//     userInfo.style.display = "none";
//   } else {
//     authLinks.style.display = "none";
//     userInfo.style.display = "block";
//     userInfo.innerHTML = `
//         <span>${currentUser.fullName}</span>
//         <button id="logout-btn">Đăng xuất</button>
//       `;
//     document
//       .getElementById("logout-btn")
//       .addEventListener("click", function () {
//         localStorage.removeItem("currentUser");
//         window.location.href = "/pages/auth/login.html";
//       });
//   }
//   if (bookingLink) {
//     bookingLink.addEventListener("click", function (event) {
//       if (!currentUser) {
//         event.preventDefault();
//         window.location.href = "index.html";
//       }
//     });
//   }
// });
document.addEventListener("DOMContentLoaded", function () {
  const authLinks = document.getElementById("auth-links");
  const userInfo = document.getElementById("user-info");
  const roleLink = document.getElementById("role-link");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    authLinks.style.display = "block";
    userInfo.style.display = "none";
    roleLink.style.display = "none";
  } else {
    authLinks.style.display = "none";
    userInfo.style.display = "block";
    userInfo.innerHTML = `
      <span>${currentUser.fullName}</span>
      <button id="logout-btn">Đăng xuất</button>
    `;

    document
      .getElementById("logout-btn")
      .addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        window.location.href = "/pages/auth/login.html";
      });

    
    roleLink.style.display = "block";
    if (currentUser.role === "admin") {
      roleLink.innerHTML = `<a href="/pages/admin/dashboard.html">Quản lý lịch</a>`;
    } else  {
      roleLink.innerHTML = `<a href="/pages/booking/schedule.html">Lịch tập</a>`; 
    }
  }

  
});
