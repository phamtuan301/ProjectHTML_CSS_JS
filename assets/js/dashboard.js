// const adminSchedule = {
//   class: "Gym",
//   date: "2025-04-11",
//   time: "13h-15h",
//   name: "Phạm Tuấn",
//   email: "tuan03@gmail.com",
// };

// const tbody = document.querySelector("#schedule-table tbody");
// const row = `
//     <tr>
//       <td>${adminSchedule.class}</td>
//       <td>${adminSchedule.date}</td>
//       <td>${adminSchedule.time}</td>
//       <td>${adminSchedule.name}</td>
//       <td>${adminSchedule.email}</td>
//       <td>
//         <button class="edit" onclick="editAdminSchedule()">Sửa</button>
//         <button class="delete" onclick="deleteAdminSchedule()">Xóa</button>
//       </td>
//     </tr>
//   `;

// tbody.innerHTML += row;

document.addEventListener("DOMContentLoaded", function () {
  const tbody = document.getElementById("userList");
  const classSelect = document.querySelector("select");
  const filterEmail = document.getElementById("filterEmail");
  const filterDate = document.getElementById("filterDate");

  const gymCount = document.querySelector(
    ".statistical .box:nth-child(1) span"
  );
  const yogaCount = document.querySelector(
    ".statistical .box:nth-child(2) span"
  );
  const zumbaCount = document.querySelector(
    ".statistical .box:nth-child(3) span"
  );

  const editModal = document.getElementById("editModal");
  const editForm = document.getElementById("editForm");
  const cancelEdit = document.getElementById("cancelEdit");
  let editIndex = null;

  const editClass = document.getElementById("editClass");
  const editDate = document.getElementById("editDate");
  const editTimeSlot = document.getElementById("editTimeSlot");

  const deleteModal = document.getElementById("deleteModal");
  const confirmDelete = document.getElementById("confirmDelete");
  const cancelDelete = document.getElementById("cancelDelete");
  let deleteIndex = null;

  function getData() {
    return JSON.parse(localStorage.getItem("allSchedules")) || [];
  }

  function saveData(data) {
    localStorage.setItem("allSchedules", JSON.stringify(data));
  }

  function renderStats(data) {
    gymCount.textContent = data.filter((d) => d.class === "Gym").length;
    yogaCount.textContent = data.filter((d) => d.class === "Yoga").length;
    zumbaCount.textContent = data.filter((d) => d.class === "Zumba").length;
  }

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
  }

  function openEditModal(index) {
    const data = getData()[index];
    editClass.value = data.class;
    editDate.value = data.date;
    editTimeSlot.value = data.time;
    editFullName.value = data.name;
    editEmail.value = data.email;
    editIndex = index;
    editModal.style.display = "flex";
  }

  function closeEditModal() {
    editModal.style.display = "none";
  }

  function openDeleteModal(index) {
    deleteIndex = index;
    deleteModal.style.display = "flex";
  }

  function closeDeleteModal() {
    deleteModal.style.display = "none";
  }

  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const updated = {
      class: editClass.value,
      date: editDate.value,
      time: editTimeSlot.value,
      name: editFullName.value.trim(),
      email: editEmail.value.trim(),
    };

    const data = getData();
    data[editIndex] = updated;
    saveData(data);
    closeEditModal();
    applyFilters();
  });

  cancelEdit.onclick = closeEditModal;

  confirmDelete.onclick = function () {
    const data = getData();
    data.splice(deleteIndex, 1);
    saveData(data);
    closeDeleteModal();
    applyFilters();
  };

  cancelDelete.onclick = closeDeleteModal;

  tbody.addEventListener("click", function (e) {
    const index = e.target.getAttribute("data-id");
    if (e.target.classList.contains("edit-btn")) {
      openEditModal(index);
    } else if (e.target.classList.contains("delete-btn")) {
      openDeleteModal(index);
    }
  });

  classSelect.addEventListener("change", applyFilters);
  filterEmail.addEventListener("input", applyFilters);
  filterDate.addEventListener("change", applyFilters);

  applyFilters(); // ban đầu
});
