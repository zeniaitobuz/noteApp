const noteName = document.getElementById("noteName");
const noteContent = document.getElementById("noteContent");
const button = document.getElementById("add-btn");
let note = document.getElementById("note");
let updateData = document.getElementById("updateData");
let result = null;
document.querySelector("#add-btn").addEventListener("click", () => {
  submitNotes();
});

function submitNotes(event) {
  // event.preventDefault()
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
  // event.preventDefault()
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
            <button class = "btn-color update" onClick="updateItem('${response.data[i].name}')">Update</button>
            <button class = "btn-color delete" onClick="deleteItem('${response.data[i]._id}')">Delete</button>
        </div>
        `;
    note.innerHTML += notesTaken;
  }
}
readNotes();

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
      alert("Note deleted");
    })
    .catch((error) => {
      console.log(error);
    });
  readNotes();
}

function updateItem(noteName) {
  let update = "";
  update = `
        <div id = "updateDiv" class = "update-data">
        <input id = "newName" class="new-name" type="text" placeholder="What name do you want to give?">
        <input id = "newContent" class="new-content" type="text" placeholder="update your content">
            <button class = "btn-color update" onClick="updateContent('${noteName}')">Update</button>
        </div>
        `;
  updateData.innerHTML += update;
  
}
function updateContent(noteName){
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
      readNotes();
      let updateDiv = document.getElementById("updateDiv");
      updateDiv.style.display = "none";
      alert("Note updated");
    })
    .catch((error) => {
      console.log(error);
    });
  
}
