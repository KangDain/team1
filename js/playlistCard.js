document.addEventListener("DOMContentLoaded", () => {
  const cardList = document.getElementById("card-list");

  // localStorage에서 데이터 불러오기
  const loadCards = () => {
    const savedPlaylists = JSON.parse(localStorage.getItem("playlists")) || [];

    // 카드 리스트 초기화
    cardList.innerHTML = "";

    // 저장된 플레이리스트 데이터를 기반으로 카드 생성
    savedPlaylists.forEach((playlist, index) => {
      const card = document.createElement("li");
      card.innerHTML = `
                <div class="card" style="width: 14rem;">
                    <img src="./img/my_playlist.png" class="card-img-top" alt="Playlist">
                    <div class="card-body">
                        <p class="card-text">${playlist.title}</p>
                        <button class="view-card-btn" data-index="${index}">View</button>
                        <button class="delete-card-btn" data-index="${index}">Delete</button>
                    </div>
                </div>
            `;
      cardList.appendChild(card);
    });

    // 카드가 없는 경우 메시지 표시
    if (savedPlaylists.length === 0) {
      cardList.innerHTML = "<p>저장된 플레이리스트가 없습니다.</p>";
    }
  };

  // 카드 삭제
  cardList.addEventListener("click", (event) => {
    const target = event.target;
    const savedPlaylists = JSON.parse(localStorage.getItem("playlists")) || [];

    if (target.classList.contains("delete-card-btn")) {
      const index = target.dataset.index;
      savedPlaylists.splice(index, 1);
      localStorage.setItem("playlists", JSON.stringify(savedPlaylists));
      loadCards(); // 카드 다시 로드
    }
  });

  // 페이지 로드 시 카드 렌더링
  loadCards();
});

const addCardBtn = document.getElementById("add-card-btn");

addCardBtn.addEventListener("click", () => {
  // Add Card 클릭 시 sub1Page.html로 이동
  window.location.href = "./sub1page.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".overlay");
  const modalBox = document.querySelector(".modal-box");
  const cardList = document.getElementById("card-list");

  // 오버레이 및 모달 창 닫기 기능
  const closeModal = () => {
    overlay.classList.remove("active");
    modalBox.classList.remove("active");
    modalBox.innerHTML = ""; // 모달 내용 초기화
  };

  overlay.addEventListener("click", closeModal);

  // 카드 목록에 이벤트 위임
  cardList.addEventListener("click", (event) => {
    if (event.target.classList.contains("view-card-btn")) {
      const index = event.target.dataset.index; // 카드의 데이터 인덱스
      const savedPlaylists =
        JSON.parse(localStorage.getItem("playlists")) || [];
      const playlist = savedPlaylists[index];

      if (!playlist) {
        alert("데이터를 불러올 수 없습니다.");
        return;
      }

      // 모달 내용 채우기
      modalBox.innerHTML = `
                <h2>${playlist.title}</h2>
                <img src="${playlist.image}" alt="${
        playlist.title
      }" style="width: 100%; margin-bottom: 20px;" />
                <ul>
                    ${playlist.inputs
                      .map(
                        (item) =>
                          `<li>${item.title} - ${item.artist} <a href="${item.link}" target="_blank">링크</a></li>`
                      )
                      .join("")}
                </ul>
                <p>위치: ${playlist.location}</p>
                <button class="close-modal-btn">닫기</button>
            `;

      // 오버레이와 모달 활성화
      overlay.classList.add("active");
      modalBox.classList.add("active");

      // 닫기 버튼 이벤트 추가
      const closeModalBtn = modalBox.querySelector(".close-modal-btn");
      closeModalBtn.addEventListener("click", closeModal);
    }
  });
});
