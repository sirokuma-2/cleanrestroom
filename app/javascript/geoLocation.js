import { addMarkers } from "addMarkers";
import { handleLocationError } from "handleLocationError";

let userPos;

// GPSで現在地を表示　現在地にhouseアイコンを表示　マーカーと詳細情報を表示
export function geoLocation(
  locations,
  map,
  allMarkers,
  directionsService,
  directionsRenderer,
  routeIconUrl,
  dataStarOn,
  dataStarOff,
  dataStarHalf
) {
  //現在地を取得するボタン プライバシー確保のため現在地をいきなり表示できない
  const locationButton = document.createElement("button");
  locationButton.textContent = "現在地を表示";

  // ボタンをページに追加
  locationButton.style.backgroundColor = "#FFFFFF";
  locationButton.style.color = "#000000";
  locationButton.style.fontSize = "16px";
  locationButton.style.border = "none";
  locationButton.style.padding = "10px 20px";
  locationButton.style.marginTop = "10px";

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  locationButton.addEventListener("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          //現在地のアイコンを表示
          new google.maps.marker.AdvancedMarkerView({
            position: userPos,
            map: map,
            title: "Your Location",
          });

          // マップの中心を現在地に移動
          map.setCenter(userPos);

          // マーカーと詳細情報を表示
          addMarkers(
            locations,
            map,
            allMarkers,
            userPos,
            directionsService,
            directionsRenderer,
            routeIconUrl,
            dataStarOn,
            dataStarOff,
            dataStarHalf
          );
        },
        () => {
          // 現在地の取得に失敗した場合の処理
          // 東京駅の座標
          const tokyoStationPos = {
            lat: 35.681236,
            lng: 139.767125,
          };

          // 東京駅に現在地を設置
          new google.maps.marker.AdvancedMarkerView({
            position: tokyoStationPos,
            map: map,
            title: "Tokyo Station",
          });

          // マップの中心を現在位置に移動
          map.setCenter(tokyoStationPos);

          // マーカーと詳細情報を表示
          addMarkers(
            locations,
            map,
            allMarkers,
            tokyoStationPos,
            directionsService,
            directionsRenderer,
            routeIconUrl,
            dataStarOn,
            dataStarOff,
            dataStarHalf
          );
        }
      );
    } else {
      //handleLocationErrorの設定
      handleLocationError(false, map.getCenter());
    }
  });
}
