const noteName = document.getElementById("noteName");
const noteContent = document.getElementById("noteContent");
let note = document.getElementById("note");
let updateData = document.getElementById("updateData");
let createNote = document.getElementById("createNote");
let result = null;

document.querySelector("#plusBtn").addEventListener("click", () => {
  createNote.style.display = "flex ";
});
document.querySelector("#addBtn").addEventListener("click", () => {
  submitNotes();
});

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
    let notesTaken = "";
    notesTaken = `
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
readNotes();

function deleteItem(noteId) {
  console.log("hi");
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
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateItem(noteName) {
  let update = "";
  update = `
  <div id="updateDiv" class=" flex-column w-100 p-4 justify-content-center align-items-center update-data">
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
    <button class = "p-1 m-2 w-50 buttons update" onClick="updateContent('${noteName}')">Update</button>
</div>
        `;
  updateData.innerHTML += update;
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
    })
    .catch((error) => {
      console.log(error);
    });
}
