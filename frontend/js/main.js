const noteName = document.getElementById("noteName");
const noteContent = document.getElementById("noteContent");
let note = document.getElementById("note");
let updateData = document.getElementById("updateData");
let createNote = document.getElementById("createNote");
let alertDiv = document.getElementById("alerts");


document.querySelector("#plusBtn").addEventListener("click", () => {
  createNote.style.display = "flex ";
});
document.querySelector("#addBtn").addEventListener("click", () => {
  submitNotes();
});


// function fetchApi (url, data, method){
//   fetch(url, {
//     mode: "cors",
//     method,
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//     body: JSON.stringify(data),
//   })
//     .then(() => {
//       noteName.value = null;
//       noteContent.value = null;
//       readNotes();
//       alert("Note added");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

function submitNotes(event) {
  fetch("http://localhost:3000/addnote", {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },

    body: JSON.stringify({
      name: `${noteName.value}`,
      content: `${noteContent.value}`,
    }),
  })
    .then(() => {
      noteName.value = null;
      noteContent.value = null;
      readNotes();
      alert("Note added");
    })
    .catch((error) => {
      console.log(error);
    });
}

async function readNotes() {
  let response = await fetch("http://localhost:3000/notes")
    .then(function (res) {
      return res.json();
    })
    .catch((error) => {
      console.log(error);
    });

  note.innerHTML = "";
  for (let i = 0; i < response.data.length; i++) {
   let notesTaken = `
        <div class = "item">
            <h2 class = "list-name" id = "list-name">${response.data[i].name}</h2>
            <p class = "list-item" id = "list-item">${response.data[i].content}</p>
            <div class = "d-flex flex-row gap-2">
            <button class = "buttons update" onClick="updateItem('${response.data[i].name}')">Update</button>
            <button class = "buttons delete" onClick="deleteItem('${response.data[i]._id}')">Delete</button>
            </div>
        </div>
        `;
    note.innerHTML += notesTaken;
  }
}
// readNotes();

function deleteItem(noteId) {
  const response = fetch("http://localhost:3000/deletenote", {
    mode: "cors",
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      _id: `${noteId}`,
    }),
  })
    .then(() => {
      readNotes();
      alert("Note deleted");
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateItem(noteName) {

  let update = `
  <div id="updateDiv" class=" p-4 update-data">
  <h2>Update your note</h2>
    <input
      id="newName"
      class="p-2 w-75 m-2 new-name"
      type="text"
      placeholder="What name do you want to give?"
    />
    <textarea
      class="p-2 w-75 m-2 new-content"
      name="newContent"
      class="new-content"
      id="newContent"
        cols="40"
        rows="5"
        placeholder="update your content"
    ></textarea>
    <div class = "d-flex flex-row">
    <button id = "cancel" class = "buttons p-1 m-2 w-50" >Close</button>
    <button class = "p-1 m-2 w-50 buttons update" onClick="updateContent('${noteName}')">Update</button>
    </div>
</div>
        `;
  updateData.innerHTML += update;
  document.querySelector("#cancel").addEventListener("click", () => {
    updateDiv.style.display = "none";
  });
}
function updateContent(noteName) {
  let newNoteName = document.getElementById("newName").value;
  let newNoteContent = document.getElementById("newContent").value;
  const response = fetch("http://localhost:3000/updatenote", {
    mode: "cors",
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      name: `${noteName}`,
      updatedname: `${newNoteName}`,
      updatedcontent: `${newNoteContent}`,
    }),
  })
    .then(() => {
      let updateDiv = document.getElementById("updateDiv");
      updateDiv.style.display = "none";
      readNotes();
      alertDiv = "";
      let alert = "";
      alert = `<div class="alert alert-primary position-relative" role="alert">
      Note updated
      </div>`;
      alertDiv.innerHTML += alert;
      // alertDiv.style.display = "flex";
    })
    .catch((error) => {
      console.log(error);
    });
}
