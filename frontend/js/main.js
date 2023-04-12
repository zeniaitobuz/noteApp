import config from "../config.js";

let deleteId = "";
const colorArr = [
  "#ffadad",
  "#ffd6a5",
  "#fdffb6",
  "#caffbf",
  "#9bf6ff",
  "#a0c4ff",
  "#bdb2ff",
  "#ffc6ff",
  "#ffc6ff",
  "#fde4cf",
  "#98f5e1",
  "#b9fbc0",
];
let colorPointer = 0;

document.querySelector("#plusBtn").addEventListener("click", () => {
  config.addNoteSec.classList.toggle("d-none");
  config.createNote.style.display = "flex";
});
document.querySelector("#addBtn").addEventListener("click", () => {
  submitNotes();
});

async function fetchApi(url, data, method) {
  if (method != "GET") {
    const response = await fetch(url, {
      mode: "cors",
      method,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });

    return response;
  } else {
    const response = await fetch(url)
      .then(function (res) {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
    return response.json();
  }
}

function closeAdd() {
  config.addNoteSec.classList.toggle("d-none");
}

async function submitNotes(event) {
  if (!config.noteName.value.length || !config.noteContent.value.length) {
    alert("Mandatory fields missing");
  }

  document.getElementById("alertAdd").style.display = "flex";
  setTimeout(() => {
    document.getElementById("alertAdd").style.display = "none";
  }, 2000);

  const url = `${config.localhostUrl}addnote`;
  const data = {
    name: `${config.noteName.value}`,
    content: `${config.noteContent.value}`,
  };

  await fetchApi(url, data, "POST");

  readNotes();

  config.createNote.style.display = "none";
  config.addNoteSec.classList.toggle("d-none");

  config.noteName.value = null;
  config.noteContent.value = null;
}

async function readNotes() {
  const url = `${config.localhostUrl}notes`;
  let response = await fetchApi(url, "", "GET");
  config.note.innerHTML = "";

  for (let i = 0; i < response.data.length; i++) {
    if (colorPointer === colorArr.length) {
      colorPointer = 0;
    }

    let notesTaken = `
        <div class = "item flex-prop" id="${
          response.data[i]._id
        }" style="background-color : ${colorArr[colorPointer++]}">
            <h2 class = "list-name" id = "list-name">${
              response.data[i].name
            }</h2>
            <p class = "list-item" id = "list-item">${
              response.data[i].content
            }</p>
            <div class = "d-flex flex-row gap-2">
            <button id = "updateBtn" class = "buttons update" onclick = "updateItem('${
              response.data[i]._id
            }','${response.data[i].name}','${
      response.data[i].content
    }')">Update</button>
            <button id = "deleteBtn" class = "buttons delete" onclick="confirmDeleteTask('${
              response.data[i]._id
            }')">Delete</button>
            </div>
        </div>
        `;

    config.note.innerHTML += notesTaken;
  }
}

function confirmDeleteTask(id) {
  deleteId = id;
  document.getElementById("deletePopup").style.display = "block";
  document.getElementById("confirmdelete").style.display = "flex";

  setTimeout(() => {
    document.getElementById("confirmdelete").style.display = "none";
    document.getElementById("deletePopup").style.display = "none";
  }, 4000);
}
function deleteNote() {
  deleteItem(deleteId);

  document.getElementById("confirmdelete").style.display = "none";
  document.getElementById("deletePopup").style.display = "none";
}
function dontdeleteNote() {
  deleteId = "";

  document.getElementById("confirmdelete").style.display = "none";
  document.getElementById("deletePopup").style.display = "none";
}

async function deleteItem(noteId) {
  document.getElementById("confirmdelete").style.display = "flex";
  document.getElementById("deletePopup").style.display = "block";

  setTimeout(() => {
    document.getElementById("confirmdelete").style.display = "none";
    document.getElementById("deletePopup").style.display = "none";
  }, 1000);

  const url = `${config.localhostUrl}deletenote`;
  const data = {
    _id: `${noteId}`,
  };

  await fetchApi(url, data, "DELETE");

  readNotes();

  document.getElementById("alertDel").style.display = "flex";

  setTimeout(() => {
    document.getElementById("alertDel").style.display = "none";
  }, 4000);
}

function updateItem(notesId, notesName, notesContent) {
  let update = `
    <div id="updateDiv" class="flex-prop p-4 update-data">
      <h2 class="text-light">Update your note</h2>
      <input
        id="newName"
        class="p-2 w-75 m-2 new-name"
        value = '${notesName}'
        type="text"

      />
      <textarea
        class="p-2 w-75 m-2 new-content"
        name="newContent"
        class="new-content"
        id="newContent"
          cols="40"
          rows="5"
      >${notesContent}</textarea>
      <div class = "d-flex flex-row">
      <button id = "cancel" class = "buttons p-1 m-2 w-50" >Close</button>
      <button class = "p-1 m-2 w-50 buttons update" onClick="updateContent('${notesId}')">Update</button>
      </div>
    </div>
        `;

  config.updateData.innerHTML += update;

  const updateContainer = document.getElementById("updateContainer");

  updateContainer.classList.toggle("d-none");

  document.querySelector("#cancel").addEventListener("click", () => {
    updateDiv.style.display = "none";
    updateContainer.classList.toggle("d-none");
  });
}
async function updateContent(notesId) {
  document.getElementById("alert").style.display = "flex";

  setTimeout(() => {
    document.getElementById("alert").style.display = "none";
    location.reload();
  }, 1000);

  updateContainer.classList.toggle("d-none");
  let newNoteName = document.getElementById("newName").value;
  let newNoteContent = document.getElementById("newContent").value;
  const url = `${config.localhostUrl}updatenote`;

  const data = {
    _id: `${notesId}`,
    name: `${newNoteName}`,
    content: `${newNoteContent}`,
  };

  await fetchApi(url, data, "PUT");

  const updateDiv = document.getElementById("updateDiv");

  updateDiv.style.display = "none";
}

window.closeAdd = closeAdd;
window.updateItem = updateItem;
window.confirmDeleteTask = confirmDeleteTask;
window.updateContent = updateContent;
window.deleteNote = deleteNote;
window.dontdeleteNote = dontdeleteNote;

//IIFE
(async () => {
  readNotes();
})();
