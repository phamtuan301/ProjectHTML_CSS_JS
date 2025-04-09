// document.addEventListener("DOMContentLoaded", function () {
//   const users = JSON.parse(localStorage.getItem("Users")) || [];
//   const adminUser = {
//     email: "admin@gmail.com",
//     password: "admin1234",
//     role: "admin",
//     fullName: "ADMIN",
//   };
//   localStorage.setItem("Users", JSON.stringify(users));
//   if (!users.some((user) => user.email === adminUser.email)) {
//     users.push(adminUser);
//     localStorage.setItem("Users", JSON.stringify(users));
//   }
//   if (
//     !localStorage.getItem("currentUser") &&
//     window.location.pathname !== "/login.html"
//   ) {
//     window.location.href = "login.html";
//   }
//   const form = document.querySelector("form");
//   const emailInput = document.getElementById("email");
//   const passwordInput = document.getElementById("password");
//   const emailError = document.getElementById("email-error");
//   const passwordError = document.getElementById("password-error");
//   const loginError = document.getElementById("login-error");

//   form.addEventListener("submit", function (event) {
//     event.preventDefault();
//     let isValid = true;
//     emailError.textContent = "";
//     passwordError.textContent = "";
//     loginError.textContent = "";
//     const email = emailInput.value.trim();
//     const password = passwordInput.value.trim();
//     if (!email) {
//       emailError.textContent = "Vui lòng nhập email!";
//       isValid = false;
//     }
//     if (!password) {
//       passwordError.textContent = "Vui lòng nhập mật khẩu!";
//       isValid = false;
//     }
//     if (!isValid) return;

//     const users = JSON.parse(localStorage.getItem("Users")) || [];
//     const user = users.find(
//       (u) => u.email === email && u.password === password
//     );
//     if (user) {
//       localStorage.setItem("currentUser", JSON.stringify(user));
//       if (user.role === "admin") {
//         window.location.href = "/pages/admin/dashboard.html";
//       } else {
//         window.location.href = "../../index.html";
//       }
//     } else {
//       loginError.textContent = "Email hoặc mật khẩu không đúng!";
//     }
//   });
// });




// document.addEventListener("DOMContentLoaded", function () {
//   let users = JSON.parse(localStorage.getItem("Users")) || [];

//   const adminUser = {
//     email: "admin@gmail.com",
//     password: "admin1234",
//     role: "admin",
//     fullName: "ADMIN",
//   };
//   const adminIndex = users.findIndex((user) => user.email === adminUser.email);

//   if (adminIndex === -1) {
//     users.push(adminUser);
//   } else {
//     users[adminIndex] = { ...users[adminIndex], ...adminUser };
//   }
//   localStorage.setItem("Users", JSON.stringify(users));
//   if (
//     !localStorage.getItem("currentUser") &&
//     window.location.pathname!== "/login.html"
//   ) {
//     window.location.href = "login.html";
//   }
//   const form = document.querySelector("form");
//   const emailInput = document.getElementById("email");
//   const passwordInput = document.getElementById("password");
//   const emailError = document.getElementById("email-error");
//   const passwordError = document.getElementById("password-error");
//   const loginError = document.getElementById("login-error");

//   form.addEventListener("submit", function (event) {
//     event.preventDefault();

//     let isValid = true;
//     emailError.textContent = "";
//     passwordError.textContent = "";
//     loginError.textContent = "";

//     const email = emailInput.value.trim();
//     const password = passwordInput.value.trim();

//     if (!email) {
//       emailError.textContent = "Vui lòng nhập email!";
//       isValid = false;
//     }

//     if (!password) {
//       passwordError.textContent = "Vui lòng nhập mật khẩu!";
//       isValid = false;
//     }

//     if (!isValid) return;

//     const users = JSON.parse(localStorage.getItem("Users")) || [];
//     const user = users.find(
//       (u) => u.email === email && u.password === password
//     );

//     if (user) {
//       localStorage.setItem("currentUser", JSON.stringify(user));
//       if (user.role === "admin") {
//         window.location.href = "/pages/admin/dashboard.html";
//       } else {
//         window.location.href = "../../index.html";
//       }
//     } else {
//       loginError.textContent = "Email hoặc mật khẩu không đúng!";
//     }
//   });
// });




document.addEventListener("DOMContentLoaded", function () {
  let users = JSON.parse(localStorage.getItem("Users")) || [];

  const adminUser = {
    email: "admin@gmail.com",
    password: "admin1234",
    role: "admin",
    fullName: "ADMIN",
  };

  const adminIndex = users.findIndex((user) => user.email === adminUser.email);

  if (adminIndex === -1) {
    users.push(adminUser);
  } else {
    users[adminIndex] = { ...users[adminIndex], ...adminUser };
  }

  localStorage.setItem("Users", JSON.stringify(users));

  // ✅ Fix redirect loop
  const isLoginPage = window.location.pathname.includes("login.html");

  if (!localStorage.getItem("currentUser") && !isLoginPage) {
    window.location.href = "login.html";
  }

  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const loginError = document.getElementById("login-error");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;
    emailError.textContent = "";
    passwordError.textContent = "";
    loginError.textContent = "";

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email) {
      emailError.textContent = "Vui lòng nhập email!";
      isValid = false;
    }

    if (!password) {
      passwordError.textContent = "Vui lòng nhập mật khẩu!";
      isValid = false;
    }

    if (!isValid) return;

    const users = JSON.parse(localStorage.getItem("Users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      if (user.role === "admin") {
        window.location.href = "/pages/admin/dashboard.html";
      } else {
        window.location.href = "../../index.html";
      }
    } else {
      loginError.textContent = "Email hoặc mật khẩu không đúng!";
    }
  });
});