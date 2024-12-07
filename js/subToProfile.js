document.addEventListener("DOMContentLoaded", () => {
  // Save 버튼 선택
  const saveButton = document.querySelector(".playlist-save");

  // Save 버튼이 없으면 에러 출력
  if (!saveButton) {
    console.error(
      "playlist-save 버튼을 찾을 수 없습니다. HTML 구조를 확인하세요."
    );
    return;
  }

  // Save 버튼 클릭 이벤트 추가
  saveButton.addEventListener("click", () => {
    console.log("playlist-save 버튼이 클릭되었습니다."); // 디버깅 로그

    // 필드 값 가져오기
    const playlistTitleInput = document.querySelector(
      '.input-container input[placeholder="제목을 입력하세요"]'
    );
    const imageNameInput = document.getElementById("file-name");
    const inputListItems = document.querySelectorAll("#inputList .input-item");
    const locationInput = document.querySelector(
      '.input-field input[placeholder="지도 위에 위치를 선택해주세요"]'
    );

    // 필드 존재 여부 확인
    if (!playlistTitleInput || !imageNameInput || !locationInput) {
      console.error("필수 입력 필드를 찾을 수 없습니다. HTML을 확인하세요.");
      return;
    }

    // 값 가져오기
    const playlistTitle = playlistTitleInput.value;
    const imageName = imageNameInput.value;
    const inputList = Array.from(inputListItems).map((item) => ({
      title: item.querySelector('input[placeholder="제목"]').value,
      artist: item.querySelector('input[placeholder="가수"]').value,
      link: item.querySelector(
        'input[placeholder="Youtube 링크를 입력해주세요"]'
      ).value,
    }));
    const location = locationInput.value;

    // 데이터 검증
    if (!playlistTitle || !imageName || inputList.length === 0 || !location) {
      alert("모든 정보를 입력해주세요!");
      return;
    }

    // 데이터 객체 생성
    const playlistData = {
      title: playlistTitle,
      image: imageName,
      inputs: inputList,
      location: location,
    };

    // localStorage에 저장
    let savedPlaylists = JSON.parse(localStorage.getItem("playlists")) || [];
    savedPlaylists.push(playlistData);
    localStorage.setItem("playlists", JSON.stringify(savedPlaylists));

    // 저장 완료 후 이동
    alert("플레이리스트가 저장되었습니다!");
    window.location.href = "./profilePage.html"; // profilePage로 이동
  });
});
