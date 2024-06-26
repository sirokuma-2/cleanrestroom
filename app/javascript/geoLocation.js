import { addMarkers } from "addMarkers";
import { handleLocationError } from "handleLocationError";

let userPos;
let locationButton;
let linkButton;

// GPSで現在地を表示　現在地にuserPositionアイコンを表示　マーカーと詳細情報を表示
export function geoLocation(
  locations,
  current_userId,
  mapElement,
  map,
  allMarkers,
  directionsService,
  directionsRenderer,
  userPosition,
  routeIconUrl,
  restroom,
  dataStarOn,
  dataStarOff,
  dataStarHalf
) {
  let baseUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://cleanrestrooms.net";

  if (mapElement.id === "map") {
    //現在地を取得するボタン プライバシー確保のため現在地をいきなり表示できないため
    locationButton = document.createElement("button");
    locationButton.className = "location-button";
    locationButton.textContent = "最寄りのトイレを探す";

    // ボタンをページに追加 topページ用
    locationButton.style.backgroundColor = "#4CAF50";
    locationButton.style.color = "#FFFFFF";
    locationButton.style.fontSize = "16px";
    locationButton.style.fontWeight = "bold";
    locationButton.style.border = "none";
    locationButton.style.padding = "10px 10%";
    locationButton.style.borderRadius = "10px";
    locationButton.style.marginTop = "60px";

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  } else {
    linkButton = document.createElement("a");
    linkButton.textContent = "最寄りのトイレを探す";
    linkButton.className = "location-button";

    //紹介ページからトップページにリンクを飛ばすため
    linkButton.href = `${baseUrl}`;

    // ボタンをページに追加 紹介ページ用
    linkButton.style.backgroundColor = "#4CAF50";
    linkButton.style.color = "#FFFFFF";
    linkButton.style.fontSize = "16px";
    linkButton.style.fontWeight = "bold";
    linkButton.style.textDecoration = "none";
    linkButton.style.border = "none";
    linkButton.style.padding = "10px 10%";
    linkButton.style.borderRadius = "10px";
    linkButton.style.marginTop = "60px";
    linkButton.style.cursor = "pointer";

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(linkButton);
  }

  if (mapElement.id === "map") {
    locationButton.addEventListener("click", function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            //現在地を取得できる場合
            userPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            if (!window.userPositionImg) {
              window.userPositionImg = document.createElement("img");
              window.userPositionImg.src = userPosition;
              window.userPositionImg.width = 75;
              window.userPositionImg.height = 75;
              window.userPositionImg.classList.add("bounce");

              //現在地のアイコンを表示
              new google.maps.marker.AdvancedMarkerView({
                position: userPos,
                map: map,
                title: "Your Location",
                content: userPositionImg,
                zIndex: 1,
              });

              map.setCenter(userPos);
            }
            // マーカーと詳細情報を表示
            addMarkers(
              locations,
              current_userId,
              map,
              allMarkers,
              userPos,
              directionsService,
              directionsRenderer,
              routeIconUrl,
              restroom,
              dataStarOn,
              dataStarOff,
              dataStarHalf
            );
          },
          () => {
            // 現在地を取得できない場合
            const tokyoStationPos = {
              lat: 35.681236,
              lng: 139.767125,
            };

            if (!window.userPositionImg) {
              window.userPositionImg = document.createElement("img");
              window.userPositionImg.src = userPosition;
              window.userPositionImg.width = 75;
              window.userPositionImg.height = 75;
              window.userPositionImg.classList.add("bounce");

              // 東京駅に現在地を設置
              new google.maps.marker.AdvancedMarkerElement({
                position: tokyoStationPos,
                map: map,
                title: "Tokyo Station",
                content: userPositionImg,
                zIndex: 1,
              });

              map.setCenter(tokyoStationPos);
            }

            // マーカーと詳細情報を表示
            addMarkers(
              locations,
              null,
              map,
              allMarkers,
              tokyoStationPos,
              directionsService,
              directionsRenderer,
              routeIconUrl,
              restroom,
              dataStarOn,
              dataStarOff,
              dataStarHalf
            );
          }
        );
      } else {
        handleLocationError(false, map.getCenter());
      }
    });
  }
}
