// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.querySelector("form");
//   const fullNameInput = document.getElementById("fullname");
//   const emailInput = document.getElementById("email");
//   const passwordInput = document.getElementById("password");
//   const confirmPasswordInput = document.getElementById("confirm-password");

//   form.addEventListener("submit", function (event) {
//     event.preventDefault();
//     let isValid = true;
//     document.querySelectorAll(".error-message").forEach((el) => el.remove());

//     const fullName = fullNameInput.value.trim();

  
//     if (fullName === "") {
//       showError(fullNameInput, "Họ và tên không được để trống");
//       isValid = false;
//     } else {
     
//       const words = fullName.split(" ").filter((w) => w.length > 0);
//       const isValidName = words.every((word) => {
//         const firstChar = word.charAt(0);
//         return firstChar === firstChar.toUpperCase();
//       });

//       if (!isValidName) {
//         showError(fullNameInput, "Hãy viết hoa chữ cái đầu mỗi từ!");
//         isValid = false;
//       } else {
//         clearError(fullNameInput);
//       }
//     }

//     if (emailInput.value.trim() === "") {
//       showError(emailInput, "Email không được để trống");
//       isValid = false;
//     } else if (!isValidEmail(emailInput.value)) {
//       showError(emailInput, "Email không đúng định dạng");
//       isValid = false;
//     }
//     if (passwordInput.value.trim() === "") {
//       showError(passwordInput, "Mật khẩu không được để trống");
//       isValid = false;
//     } else if (passwordInput.value.length < 8) {
//       showError(passwordInput, "Mật khẩu tối thiểu 8 ký tự");
//       isValid = false;
//     }
//     if (confirmPasswordInput.value.trim() === "") {
//       showError(confirmPasswordInput, "Xác nhận mật khẩu không được để trống");
//       isValid = false;
//     } else if (confirmPasswordInput.value !== passwordInput.value) {
//       showError(confirmPasswordInput, "Mật khẩu không trùng khớp");
//       isValid = false;
//     }

//     let users = JSON.parse(localStorage.getItem("Users")) || [];
//     if (users.some((user) => user.email === emailInput.value.trim())) {
//       showError(emailInput, "Tài khoản đã tồn tại");
//       isValid = false;
//     }

//     if (isValid) {
//       const newUser = {
//         fullName: fullNameInput.value.trim(),
//         email: emailInput.value.trim(),
//         password: passwordInput.value.trim(),
//       };

//       users.push(newUser);
//       localStorage.setItem("Users", JSON.stringify(users));
//       window.location.href = "../../index.html";
//     }
//   });

//   function showError(input, message) {
//     const errorElement = document.createElement("div");
//     errorElement.className = "error-message";
//     errorElement.style.color = "red";
//     errorElement.style.fontSize = "14px";
//     errorElement.style.marginTop = "5px";
//     errorElement.textContent = message;
//     input.parentElement.appendChild(errorElement);
//   }

//   function isValidEmail(email) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   }
// });




document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const fullNameInput = document.getElementById("fullname");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;
    document.querySelectorAll(".error-message").forEach((el) => el.remove());

    let fullName = fullNameInput.value.trim();

    if (fullName === "") {
      showError(fullNameInput, "Họ và tên không được để trống");
      isValid = false;
    } else {
      const words = fullName.split(" ").filter((w) => w.length > 0);
      const isValidName = words.every((word) => {
        return word[0] === word[0].toUpperCase(); 
      });
      if (!isValidName) {
        showError(fullNameInput, "Hãy viết hoa chữ cái đầu mỗi từ!");
        isValid = false;
      } else {
        fullName = words
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
        fullNameInput.value = fullName; 
        clearError(fullNameInput);
      }
    }
    if (emailInput.value.trim() === "") {
      showError(emailInput, "Email không được để trống");
      isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, "Email không đúng định dạng");
      isValid = false;
    }
    if (passwordInput.value.trim() === "") {
      showError(passwordInput, "Mật khẩu không được để trống");
      isValid = false;
    } else if (passwordInput.value.length < 8) {
      showError(passwordInput, "Mật khẩu tối thiểu 8 ký tự");
      isValid = false;
    }
    // else if (!/[A-Z]/.test(passwordInput.value)) {
    //   showError(passwordInput, "Mật khẩu phải chứa ít nhất một chữ cái in hoa");
    //   isValid = false;
    // } else if (!/\d$/.test(passwordInput.value)) {
    //   showError(passwordInput, "Mật khẩu phải kết thúc bằng một chữ số");
    //   isValid = false;
    // } else {
    //   clearError(passwordInput); 
    // }
    if (confirmPasswordInput.value.trim() === "") {
      showError(confirmPasswordInput, "Xác nhận mật khẩu không được để trống");
      isValid = false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
      showError(confirmPasswordInput, "Mật khẩu không trùng khớp");
      isValid = false;
    }
    let users = JSON.parse(localStorage.getItem("Users")) || [];
    if (users.some((user) => user.email === emailInput.value.trim())) {
      showError(emailInput, "Tài khoản đã tồn tại");
      isValid = false;
    }
    if (isValid) {
      const newUser = {
        fullName: fullName, 
        email: emailInput.value.trim(),
        password: passwordInput.value.trim(),
      };

      users.push(newUser);
      localStorage.setItem("Users", JSON.stringify(users));
      window.location.href = "../../index.html";
    }
  });

  function showError(input, message) {
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.style.color = "red";
    errorElement.style.fontSize = "14px";
    errorElement.style.marginTop = "5px";
    errorElement.textContent = message;
    input.parentElement.appendChild(errorElement);
  }

  function clearError(input) {
    const error = input.parentElement.querySelector(".error-message");
    if (error) error.remove();
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
