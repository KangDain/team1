// 오버레이 및 모달 요소 선택
const overlay = document.querySelector(".overlay");
const modalBox = document.querySelector(".modal-box");
const modalContent = document.querySelector(".modal-content");

// 모달 열기
const openModal = (playlist) => {
  modalContent.innerHTML = `
    <h2>${playlist.title}</h2>
    <img src="${
      playlist.cover_image
        ? `data:image/jpeg;base64,${playlist.cover_image}`
        : "./img/default-profile.png"
    }" style="width: 100%; height: auto; margin-bottom: 20px;" alt="Playlist Image">
    <p>이 플레이리스트에 대한 정보</p>
  `;
  overlay.style.display = "block";
  modalBox.style.display = "block";
};

// 모달 닫기
const closeModal = () => {
  overlay.style.display = "none";
  modalBox.style.display = "none";
};

// 오버레이 및 닫기 버튼 이벤트
overlay.addEventListener("click", closeModal);
document
  .querySelector(".close-modal-btn")
  .addEventListener("click", closeModal);

// 카드 추가 함수 수정
const addCardToDOM = (playlist) => {
  const { id, title, cover_image } = playlist;
  const imageUrl = cover_image
    ? `data:image/jpeg;base64,${cover_image}`
    : "./img/default-profile.png";

  const newCard = document.createElement("li");
  newCard.classList.add("card-item");

  newCard.innerHTML = `
    <div class="card" style="width: 16rem;">
        <img src="${imageUrl}" class="card-img-top" alt="Playlist Cover">
        <div class="card-body">
            <p class="card-text">${title}</p>
            <button class="view-card-btn">View</button>
            <button class="delete-card-btn" data-id="${id}">Delete</button>
        </div>
    </div>
  `;

  cardList.appendChild(newCard);

  // View 버튼 이벤트 추가
  newCard.querySelector(".view-card-btn").addEventListener("click", () => {
    openModal(playlist);
  });

  // Delete 버튼 이벤트 추가
  const deleteBtn = newCard.querySelector(".delete-card-btn");
  deleteBtn.addEventListener("click", async () => {
    const playlistId = deleteBtn.getAttribute("data-id");
    try {
      const response = await fetch("php/delete_playlist.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlist_id: playlistId }),
      });

      const result = await response.json();
      if (result.status === "success") {
        newCard.remove();
        updateCardCount();
        alert("플레이리스트가 삭제되었습니다.");
      } else {
        alert(result.message || "삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("삭제 요청 중 오류가 발생했습니다.", error);
      alert("서버 오류로 삭제할 수 없습니다.");
    }
  });

  updateCardCount();
};
