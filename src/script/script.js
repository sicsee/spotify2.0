let currentEditIndex = -1;

function loadPlaylists() {
  const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
  const playlistList = document.getElementById("playlist-list");
  playlistList.innerHTML = "";

  playlists.forEach((playlist, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <img src="${playlist.image}" alt="${playlist.name}" style="width: 50px; height: 50px; border-radius: 5px; margin-right: 10px;" />
            <strong>${playlist.name}</strong> - Criada por ${playlist.creator}
            <button class="edit-btn" data-index="${index}">Editar</button>
            <button class="delete-btn" data-index="${index}">Excluir</button>
        `;

    // Adiciona evento de clique ao item da playlist
    li.addEventListener("click", () => {
      editPlaylist({ target: { getAttribute: () => index } });
    });

    playlistList.appendChild(li);
  });

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", editPlaylist);
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", deletePlaylist);
  });
}

function editPlaylist(event) {
  currentEditIndex = event.target.getAttribute("data-index");
  const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
  const playlist = playlists[currentEditIndex];

  document.getElementById("playlist-name").value = playlist.name;
  document.getElementById("creator-name").value = playlist.creator;
  document.getElementById("playlist-image").value = playlist.image;

  document.getElementById("form-container").style.display = "block";
}

function deletePlaylist(event) {
  const index = event.target.getAttribute("data-index");
  const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
  playlists.splice(index, 1);
  localStorage.setItem("playlists", JSON.stringify(playlists));
  loadPlaylists();
}

document.getElementById("open-form-btn").addEventListener("click", function () {
  currentEditIndex = -1; // Resetar para nova playlist
  document.getElementById("form-container").style.display = "block";
});

document.getElementById("close-form-btn").addEventListener("click", function () {
  document.getElementById("form-container").style.display = "none";
});

document.getElementById("playlist-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const playlistName = document.getElementById("playlist-name").value;
  const creatorName = document.getElementById("creator-name").value;
  const playlistImage = document.getElementById("playlist-image").value || "Capa 1.jpg";

  const playlists = JSON.parse(localStorage.getItem("playlists")) || [];

  if (currentEditIndex >= 0) {
    playlists[currentEditIndex] = { name: playlistName, creator: creatorName, image: playlistImage };
  } else {
    const newPlaylist = { name: playlistName, creator: creatorName, image: playlistImage };
    playlists.push(newPlaylist);
  }

  localStorage.setItem("playlists", JSON.stringify(playlists));
  loadPlaylists();

  document.getElementById("playlist-name").value = "";
  document.getElementById("creator-name").value = "";
  document.getElementById("playlist-image").value = "";
  document.getElementById("form-container").style.display = "none";
});

window.onload = loadPlaylists;
