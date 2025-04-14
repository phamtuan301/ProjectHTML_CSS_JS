document.addEventListener("DOMContentLoaded", function () {
  loadSchedules();
  document.querySelector(".add-schedule").addEventListener("click", openModal);
});

let editIndex = null;
const deleteModal = document.getElementById("delete-modal");

function openModal() {
  resetScheduleForm();
  document.getElementById("modal-background").style.display = "block";
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
  } else {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
  }
  editIndex = null;
}

function closeModal() {
  document.getElementById("modal-background").style.display = "none";
  editIndex = null;
}

function openDeleteModal(index) {
  deleteModal.style.display = "block";
  deleteModal.dataset.index = index;
}

function closeDeleteModal() {
  deleteModal.style.display = "none";
}

function saveSchedule() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return;

  let allSchedules = JSON.parse(localStorage.getItem("allSchedules")) || [];

  const isEdit = editIndex !== null;

  let classSelect = document.getElementById("class");
  let dateInput = document.getElementById("date");
  let timeSlotSelect = document.getElementById("time-slot");

  document.querySelectorAll(".warning").forEach((el) => el.remove());

  let isValid = true;

  if (!classSelect.value || classSelect.value === "Chọn lớp học") {
    let warning = document.createElement("p");
    warning.textContent = "Vui lòng chọn lớp học";
    warning.style.color = "red";
    warning.classList.add("warning");
    classSelect.insertAdjacentElement("afterend", warning);
    isValid = false;
  }

  if (!dateInput.value) {
    let warning = document.createElement("p");
    warning.textContent = "Vui lòng chọn ngày tập";
    warning.style.color = "red";
    warning.classList.add("warning");
    dateInput.insertAdjacentElement("afterend", warning);
    isValid = false;
  } else {
    const today = new Date();
    const selectedDate = new Date(dateInput.value);
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      let warning = document.createElement("p");
      warning.textContent = "Ngày bạn chọn không hợp lệ! Vui lòng chọn lại!";
      warning.style.color = "red";
      warning.classList.add("warning");
      dateInput.insertAdjacentElement("afterend", warning);
      isValid = false;
    } else if (selectedDate.getTime() === today.getTime()) {
      const now = new Date();
      const currentHour = now.getHours();
      const selectedTime = timeSlotSelect.value;
      if (selectedTime) {
        const selectedHour = parseInt(selectedTime.split(":")[0]);
        if (selectedHour <= currentHour) {
          let warning = document.createElement("p");
          warning.textContent = "Khung giờ không hợp lệ! Vui lòng chọn lại!";
          warning.style.color = "red";
          warning.classList.add("warning");
          timeSlotSelect.insertAdjacentElement("afterend", warning);
          isValid = false;
        }
      }
    }
  }

  if (!isValid) return;

  let selectedDate = dateInput.value;
  let selectedTime = timeSlotSelect.value;

  let isDuplicate = allSchedules.some((s, index) => {
    return (
      s.email === user.email &&
      s.date === selectedDate &&
      s.time === selectedTime &&
      index !== editIndex
    );
  });

  if (isDuplicate) {
    let warning = document.createElement("p");
    warning.textContent = "Khung giờ này đã được đặt, vui lòng chọn lịch khác.";
    warning.style.color = "red";
    warning.classList.add("warning");
    timeSlotSelect.insertAdjacentElement("afterend", warning);
    return;
  }

  let schedule = {
    class: classSelect.value,
    date: selectedDate,
    time: selectedTime,
    name: user.fullName || "",
    email: user.email || "",
  };

  if (isEdit) {
    allSchedules[editIndex] = schedule;
  } else {
    allSchedules.push(schedule);
  }

  localStorage.setItem("allSchedules", JSON.stringify(allSchedules));
  closeModal();
  loadSchedules();
  editIndex = null;
}
// function loadSchedules() {
//   const user = JSON.parse(localStorage.getItem("currentUser"));
//   if (!user) return;
//   let allSchedules = JSON.parse(localStorage.getItem("allSchedules")) || [];
//   let schedules = allSchedules.filter((s) => s.email === user.email);
//   schedules.sort((a, b) => {
//     const dateA = new Date(a.date);
//     const dateB = new Date(b.date);
//     if (dateA - dateB !== 0) {
//       return dateA - dateB;
//     }
//     const timeA = parseInt(a.time);
//     const timeB = parseInt(b.time);
//     return timeA - timeB;
//   });
//   let newAllSchedules = allSchedules
//     .filter((s) => s.email !== user.email)
//     .concat(schedules);

//   localStorage.setItem("allSchedules", JSON.stringify(newAllSchedules));
//   let tbody = document.querySelector("#schedule-table tbody");
//   tbody.innerHTML = "";
//   schedules.forEach((schedule, index) => {
//     tbody.innerHTML += `<tr>
//           <td class="td">${schedule.class}</td>
//           <td>${schedule.date}</td>
//           <td>${schedule.time}</td>
//           <td>${schedule.name}</td>
//           <td>${schedule.email}</td>
//           <td>
//             <button class="edit" onclick="editSchedule(${index})">Sửa</button>
//             <button class="delete" onclick="openDeleteModal(${index})">Xóa</button>
//           </td>
//         </tr>`;
//   });
// }
let currentPage = 1;
const itemsPerPage = 5;
function loadSchedules(page = 1) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return;

  let allSchedules = JSON.parse(localStorage.getItem("allSchedules")) || [];
  let schedules = allSchedules.filter((s) => s.email === user.email);
  schedules.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA - dateB !== 0) {
      return dateA - dateB;
    }
    const timeA = parseInt(a.time);
    const timeB = parseInt(b.time);
    return timeA - timeB;
  });
  let newAllSchedules = allSchedules
    .filter((s) => s.email !== user.email)
    .concat(schedules);
  localStorage.setItem("allSchedules", JSON.stringify(newAllSchedules));
  const totalPages = Math.ceil(schedules.length / itemsPerPage);
  currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedSchedules = schedules.slice(start, start + itemsPerPage);
  let tbody = document.querySelector("#schedule-table tbody");
  tbody.innerHTML = "";
  paginatedSchedules.forEach((schedule, index) => {
    tbody.innerHTML += `<tr>
      <td class="td">${schedule.class}</td>
      <td>${schedule.date}</td>
      <td>${schedule.time}</td>
      <td>${schedule.name}</td>
      <td>${schedule.email}</td>
      <td>
        <button class="edit" onclick="editSchedule(${
          start + index
        })">Sửa</button>
        <button class="delete" onclick="openDeleteModal(${
          start + index
        })">Xóa</button>
      </td>
    </tr>`;
  });
  renderPagination(totalPages);
}
function renderPagination(totalPages) {
  const pagination = document.getElementById("pagination");
  if (totalPages <= 1) {
    pagination.innerHTML = "";
    return;
  }

  let html = "";
  const maxVisible = 5;
  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > maxVisible) {
    if (currentPage <= 3) {
      startPage = 1;
      endPage = 4;
      html += pageButton(1);
      html += pageButton(2);
      html += pageButton(3);
      html += pageButton(4);
      html += `<span style="margin: 0 5px;">...</span>`;
      html += pageButton(totalPages);
    } else if (currentPage >= totalPages - 2) {
      html += pageButton(1);
      html += `<span style="margin: 0 5px;">...</span>`;
      for (let i = totalPages - 3; i <= totalPages; i++) {
        html += pageButton(i);
      }
    } else {
      html += pageButton(1);
      html += `<span style="margin: 0 5px;">...</span>`;
      html += pageButton(currentPage - 1);
      html += pageButton(currentPage);
      html += pageButton(currentPage + 1);
      html += `<span style="margin: 0 5px;">...</span>`;
      html += pageButton(totalPages);
    }
  } else {
    for (let i = 1; i <= totalPages; i++) {
      html += pageButton(i);
    }
  }

  pagination.innerHTML = html;
}

function pageButton(page) {
  return `<button 
      class="pagination-button ${page === currentPage ? "active" : ""}" 
      onclick="loadSchedules(${page})"
    >${page}</button>`;
}

function editSchedule(index) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return;

  let allSchedules = JSON.parse(localStorage.getItem("allSchedules")) || [];
  let userSchedules = allSchedules.filter((s) => s.email === user.email);

  let schedule = userSchedules[index];

  editIndex = allSchedules.findIndex(
    (s) =>
      s.email === user.email &&
      s.date === schedule.date &&
      s.time === schedule.time
  );

  document.getElementById("modal-background").style.display = "block";
  document.getElementById("class").value = schedule.class;
  document.getElementById("date").value = schedule.date;
  document.getElementById("time-slot").value = schedule.time;
}

function deleteSchedule() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return;

  let allSchedules = JSON.parse(localStorage.getItem("allSchedules")) || [];
  let userSchedules = allSchedules.filter((s) => s.email === user.email);

  let targetSchedule = userSchedules[deleteModal.dataset.index];

  allSchedules = allSchedules.filter(
    (s) =>
      !(
        s.email === user.email &&
        s.date === targetSchedule.date &&
        s.time === targetSchedule.time
      )
  );

  localStorage.setItem("allSchedules", JSON.stringify(allSchedules));
  closeDeleteModal();
  loadSchedules();
}

function resetScheduleForm() {
  document.getElementById("class").value = "Chọn lớp học";
  document.getElementById("date").value = "";
  document.getElementById("time-slot").value = "Chọn khung giờ";
  document.querySelectorAll(".warning").forEach((el) => el.remove());
}
