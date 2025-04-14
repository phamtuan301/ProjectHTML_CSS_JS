// document.addEventListener("DOMContentLoaded", function () {
//   const tbody = document.getElementById("userList");
//   const classSelect = document.querySelector("select");
//   const filterEmail = document.getElementById("filterEmail");
//   const filterDate = document.getElementById("filterDate");

//   const gymCount = document.querySelector(
//     ".statistical .box:nth-child(1) span"
//   );
//   const yogaCount = document.querySelector(
//     ".statistical .box:nth-child(2) span"
//   );
//   const zumbaCount = document.querySelector(
//     ".statistical .box:nth-child(3) span"
//   );

//   const editModal = document.getElementById("editModal");
//   const editForm = document.getElementById("editForm");
//   const cancelEdit = document.getElementById("cancelEdit"); // Nút Hủy
//   let editIndex = null;

//   const editClass = document.getElementById("editClass");
//   const editDate = document.getElementById("editDate");
//   const editTimeSlot = document.getElementById("editTimeSlot");

//   // Lấy dữ liệu từ localStorage
//   function getData() {
//     let data = JSON.parse(localStorage.getItem("allSchedules"));
//     if (!data || data.length === 0) {
//       // Nếu không có dữ liệu, thêm một lịch mặc định
//       data = [
//         {
//           class: "Gym",
//           date: new Date().toISOString().split("T")[0], // hôm nay
//           time: "7h-9h",
//           name: "Người dùng 1",
//           email: "nguoidung1@example.com",
//         },
//       ];
//       saveData(data);
//     }
//     return data;
//   }

//   // Lưu dữ liệu vào localStorage
//   function saveData(data) {
//     localStorage.setItem("allSchedules", JSON.stringify(data));
//   }

//   // Render thống kê
//   function renderStats(data) {
//     gymCount.textContent = data.filter((d) => d.class === "Gym").length;
//     yogaCount.textContent = data.filter((d) => d.class === "Yoga").length;
//     zumbaCount.textContent = data.filter((d) => d.class === "Zumba").length;
//   }

//   // Render bảng dữ liệu
//   function renderTable(data) {
//     if (data.length === 0) {
//       tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Không có dữ liệu lịch tập.</td></tr>`;
//       return;
//     }

//     let rows = data
//       .map(
//         (item, index) => `
//       <tr>
//         <td>${item.class}</td>
//         <td>${item.date}</td>
//         <td>${item.time}</td>
//         <td>${item.name}</td>
//         <td>${item.email}</td>
//         <td>
//           <button class="edit-btn" data-id="${index}">Sửa</button>
//           <button class="delete-btn" data-id="${index}">Xóa</button>
//         </td>
//       </tr>
//     `
//       )
//       .join("");
//     tbody.innerHTML = rows;
//   }

//   // Apply filters
//   function applyFilters() {
//     let data = getData();
//     const emailValue = filterEmail.value.toLowerCase();
//     const dateValue = filterDate.value;
//     const classValue = classSelect.value;

//     if (classValue !== "all") {
//       data = data.filter((item) => item.class?.toLowerCase() === classValue);
//     }

//     if (emailValue) {
//       data = data.filter((item) =>
//         item.email?.toLowerCase().includes(emailValue)
//       );
//     }

//     if (dateValue) {
//       data = data.filter((item) => item.date === dateValue);
//     }

//     renderTable(data);
//     renderStats(data);
//   }

//   // Mở modal sửa lịch
//   function openEditModal(index) {
//     const data = getData()[index];
//     editClass.value = data.class; // Điền lớp học vào modal
//     editDate.value = data.date; // Điền ngày vào modal
//     editTimeSlot.value = data.time; // Điền khung giờ vào modal
//     editIndex = index;
//     editModal.style.display = "flex"; // Hiển thị modal
//   }

//   // Đóng modal sửa lịch
//   function closeEditModal() {
//     editModal.style.display = "none"; // Ẩn modal khi hủy
//   }

//   // Validate form sửa lịch
//   function validateForm() {
//     const date = editDate.value;
//     const timeSlot = editTimeSlot.value;
//     const classType = editClass.value;

//     if (!date || !timeSlot || !classType) {
//       alert("Vui lòng điền đầy đủ thông tin!");
//       return false;
//     }

//     return true;
//   }

//   // Xử lý form sửa lịch
//   editForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     if (!validateForm()) return;

//     const data = getData();
//     const currentItem = data[editIndex];

//     const updated = {
//       ...currentItem, // Giữ lại name và email cũ
//       class: editClass.value,
//       date: editDate.value,
//       time: editTimeSlot.value,
//     };

//     data[editIndex] = updated; // Cập nhật dữ liệu tại chỉ số đã chọn
//     saveData(data); // Lưu lại vào localStorage
//     closeEditModal(); // Đóng modal
//     applyFilters(); // Cập nhật bảng
//   });

//   // Hủy modal sửa lịch
//   cancelEdit.onclick = closeEditModal;

//   // Xử lý sự kiện click vào bảng
//   // tbody.addEventListener("click", function (e) {
//   //   const index = e.target.getAttribute("data-id");
//   //   if (e.target.classList.contains("edit-btn")) {
//   //     openEditModal(index); // Mở modal sửa lịch
//   //   } else if (e.target.classList.contains("delete-btn")) {
//   //     if (confirm("Bạn có chắc chắn muốn xóa?")) {
//   //       const data = getData();
//   //       data.splice(index, 1); // Xóa phần tử tại chỉ số
//   //       saveData(data); // Lưu lại vào localStorage
//   //       applyFilters(); // Cập nhật bảng
//   //     }
//   //   }
//   // });
//   let deleteIndex = null; // Khai báo ở đầu script nếu chưa có
//   const confirmDeleteModal = document.getElementById("confirmDeleteModal");
//   const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
//   const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

//   tbody.addEventListener("click", function (e) {
//     const index = e.target.getAttribute("data-id");
//     if (e.target.classList.contains("edit-btn")) {
//       openEditModal(index);
//     } else if (e.target.classList.contains("delete-btn")) {
//       deleteIndex = index;
//       confirmDeleteModal.style.display = "flex"; // Mở modal xác nhận xóa
//     }
//   });

//   // Nút xác nhận trong modal
//   confirmDeleteBtn.addEventListener("click", function () {
//     const data = getData();
//     data.splice(deleteIndex, 1); // Xóa phần tử
//     saveData(data);
//     confirmDeleteModal.style.display = "none";
//     applyFilters();
//   });

//   // Nút hủy trong modal
//   cancelDeleteBtn.addEventListener("click", function () {
//     confirmDeleteModal.style.display = "none";
//   });
//   // Apply filter
//   classSelect.addEventListener("change", applyFilters);
//   filterEmail.addEventListener("input", applyFilters);
//   filterDate.addEventListener("change", applyFilters);

//   // Initial load
//   applyFilters(); // Tải lại dữ liệu khi trang được tải
// });
// document.addEventListener("DOMContentLoaded", function () {
//   const ctx = document.getElementById("bookingChart").getContext("2d");
//   const bookingChart = new Chart(ctx, {
//     type: "bar",
//     data: {
//       labels: ["Gym", "Yoga", "Zumba"],
//       datasets: [
//         {
//           label: "Số lượng lịch đặt",
//           data: [0, 0, 0], // Dữ liệu mặc định, sẽ được cập nhật sau
//           backgroundColor: "rgba(54, 162, 235, 0.5)",
//           borderColor: "rgba(54, 162, 235, 1)",
//           borderWidth: 1,
//           barThickness: 300,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           position: "top",
//         },
//       },
//       scales: {
//         y: {
//           beginAtZero: true,
//           ticks: {
//             stepSize: 1,
//           },
//         },
//       },
//     },
//   });

//   // Hàm cập nhật biểu đồ
//   function updateChart() {
//     const data = JSON.parse(localStorage.getItem("allSchedules")) || [];

//     const counts = {
//       Gym: 0,
//       Yoga: 0,
//       Zumba: 0,
//     };

//     // Đếm số lượng lịch cho từng lớp học
//     data.forEach((item) => {
//       if (counts[item.class]) {
//         counts[item.class]++;
//       }
//     });

//     // Cập nhật dữ liệu cho biểu đồ
//     bookingChart.data.datasets[0].data = [
//       counts.Gym,
//       counts.Yoga,
//       counts.Zumba,
//     ];

//     // Cập nhật lại biểu đồ
//     bookingChart.update();
//   }

//   // Gọi hàm updateChart khi trang được tải
//   updateChart();

//   // Cập nhật biểu đồ mỗi khi có thay đổi dữ liệu (Thêm, sửa, xóa)
//   // Ví dụ: khi có sự kiện thêm lịch vào localStorage
//   // Sau khi thêm, sửa hoặc xóa lịch trong localStorage, gọi lại updateChart
//   // updateChart();
// });


document.addEventListener("DOMContentLoaded", function () {
  const tbody = document.getElementById("userList");
  const classSelect = document.querySelector("select");
  const filterEmail = document.getElementById("filterEmail");
  const filterDate = document.getElementById("filterDate");

  const gymCount = document.querySelector(".statistical .box:nth-child(1) span");
  const yogaCount = document.querySelector(".statistical .box:nth-child(2) span");
  const zumbaCount = document.querySelector(".statistical .box:nth-child(3) span");

  const editModal = document.getElementById("editModal");
  const editForm = document.getElementById("editForm");
  const cancelEdit = document.getElementById("cancelEdit");
  let editIndex = null;

  const editClass = document.getElementById("editClass");
  const editDate = document.getElementById("editDate");
  const editTimeSlot = document.getElementById("editTimeSlot");

  const confirmDeleteModal = document.getElementById("confirmDeleteModal");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

  const ctx = document.getElementById("bookingChart").getContext("2d");
  const bookingChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Gym", "Yoga", "Zumba"],
      datasets: [
        {
          label: "Số lượng lịch đặt",
          data: [0, 0, 0], // Dữ liệu mặc định, sẽ được cập nhật sau
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          barThickness: 300,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  });

  // Lấy dữ liệu từ localStorage
  function getData() {
    let data = JSON.parse(localStorage.getItem("allSchedules"));
    if (!data || data.length === 0) {
      // Nếu không có dữ liệu, thêm một lịch mặc định
      data = [
        {
          class: "Gym",
          date: new Date().toISOString().split("T")[0], // hôm nay
          time: "7h-9h",
          name: "Người dùng 1",
          email: "nguoidung1@example.com",
        },
      ];
      saveData(data);
    }
    return data;
  }

  // Lưu dữ liệu vào localStorage
  function saveData(data) {
    localStorage.setItem("allSchedules", JSON.stringify(data));
  }

  // Cập nhật biểu đồ
  function updateChart() {
    const data = getData();

    const counts = {
      Gym: 0,
      Yoga: 0,
      Zumba: 0,
    };

    // Đếm số lượng lịch cho từng lớp học
    data.forEach((item) => {
      if (counts[item.class]) {
        counts[item.class]++;
      }
    });

    // Cập nhật dữ liệu cho biểu đồ
    bookingChart.data.datasets[0].data = [
      counts.Gym,
      counts.Yoga,
      counts.Zumba,
    ];

    // Cập nhật lại biểu đồ
    bookingChart.update();
  }

  // Render thống kê
  function renderStats(data) {
    gymCount.textContent = data.filter((d) => d.class === "Gym").length;
    yogaCount.textContent = data.filter((d) => d.class === "Yoga").length;
    zumbaCount.textContent = data.filter((d) => d.class === "Zumba").length;
  }

  // Render bảng dữ liệu
  function renderTable(data) {
    if (data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Không có dữ liệu lịch tập.</td></tr>`;
      return;
    }

    let rows = data
      .map(
        (item, index) => `
      <tr>
        <td>${item.class}</td>
        <td>${item.date}</td>
        <td>${item.time}</td>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>
          <button class="edit-btn" data-id="${index}">Sửa</button>
          <button class="delete-btn" data-id="${index}">Xóa</button>
        </td>
      </tr>
    `
      )
      .join("");
    tbody.innerHTML = rows;
  }

  // Apply filters
  function applyFilters() {
    let data = getData();
    const emailValue = filterEmail.value.toLowerCase();
    const dateValue = filterDate.value;
    const classValue = classSelect.value;

    if (classValue !== "all") {
      data = data.filter((item) => item.class?.toLowerCase() === classValue);
    }

    if (emailValue) {
      data = data.filter((item) =>
        item.email?.toLowerCase().includes(emailValue)
      );
    }

    if (dateValue) {
      data = data.filter((item) => item.date === dateValue);
    }

    renderTable(data);
    renderStats(data);
    updateChart(); // Cập nhật biểu đồ mỗi khi thay đổi dữ liệu
  }

  // Mở modal sửa lịch
  function openEditModal(index) {
    const data = getData()[index];
    editClass.value = data.class;
    editDate.value = data.date;
    editTimeSlot.value = data.time;
    editIndex = index;
    editModal.style.display = "flex";
  }

  // Đóng modal sửa lịch
  function closeEditModal() {
    editModal.style.display = "none";
  }

  // Validate form sửa lịch
  function validateForm() {
    const date = editDate.value;
    const timeSlot = editTimeSlot.value;
    const classType = editClass.value;

    if (!date || !timeSlot || !classType) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return false;
    }

    return true;
  }

  // Xử lý form sửa lịch
  editForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    const data = getData();
    const currentItem = data[editIndex];

    const updated = {
      ...currentItem, 
      class: editClass.value,
      date: editDate.value,
      time: editTimeSlot.value,
    };

    data[editIndex] = updated;
    saveData(data);
    closeEditModal();
    applyFilters(); // Cập nhật bảng và biểu đồ
  });

  // Hủy modal sửa lịch
  cancelEdit.onclick = closeEditModal;

  // Xử lý sự kiện click vào bảng
  let deleteIndex = null;

  tbody.addEventListener("click", function (e) {
    const index = e.target.getAttribute("data-id");
    if (e.target.classList.contains("edit-btn")) {
      openEditModal(index);
    } else if (e.target.classList.contains("delete-btn")) {
      deleteIndex = index;
      confirmDeleteModal.style.display = "flex";
    }
  });

  // Nút xác nhận trong modal
  confirmDeleteBtn.addEventListener("click", function () {
    const data = getData();
    data.splice(deleteIndex, 1); 
    saveData(data);
    confirmDeleteModal.style.display = "none";
    applyFilters(); // Cập nhật bảng và biểu đồ
  });

  // Nút hủy trong modal
  cancelDeleteBtn.addEventListener("click", function () {
    confirmDeleteModal.style.display = "none";
  });

  // Apply filter
  classSelect.addEventListener("change", applyFilters);
  filterEmail.addEventListener("input", applyFilters);
  filterDate.addEventListener("change", applyFilters);

  // Initial load
  applyFilters(); // Tải lại dữ liệu khi trang được tải
});
