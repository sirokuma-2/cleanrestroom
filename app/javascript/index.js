import { clickListener } from "clickListener";
import { addMarkers } from "addMarkers";
import { handleLocationError } from "handleLocationError";

let map;

let locations; //すべての施設の位置
let allMarkers = []; // すべてのマーカーを保持する配列
// let restroomIconUrl;
// let routeIconUrl;

let dataStarOn;
let dataStarOff;
let dataStarHalf;

let userPos; // ユーザーの現在位置

let directionsService; // ルートを検索するためのDirectionsServiceのインスタンス
let directionsRenderer; // マップ上にルートを表示するためのDirectionsRendererのインスタンス

//非同期関数　マップの初期化
async function initMap() {
  //Google Mapsライブラリを非同期にインポート　　Mapクラス
  if (google) {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerView } = await google.maps.importLibrary("marker");
  }
  // gonから施設の位置情報を取得
  locations = gon.posts;

  //ルート検索機能
  directionsService = new google.maps.DirectionsService(); //ルートを検索するためのインスタンス
  directionsRenderer = new google.maps.DirectionsRenderer(); //マップにルートを表示するためのインスタンス

  // まず、'top-map'または'map'のいずれかの要素を取得します。
  let mapDiv =
    document.getElementById("top-map") || document.getElementById("map");

  // mapDivが存在する場合のみマップを初期化します。
  if (mapDiv) {
    var map = new google.maps.Map(mapDiv, {
      zoom: 13,
      mapId: "DEMO_MAP_ID",
      maxZoom: 18,
      center: { lat: 35.681236, lng: 139.767125 },
    });
  }

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

  // GPSで現在地を表示　現在地にhouseアイコンを表示　マーカーと詳細情報を表示
  locationButton.addEventListener("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          const mapElement =
            document.getElementById("top-map") ||
            document.getElementById("map");

          const restroomIconUrl = mapElement.getAttribute(
            "data-restroom-icon-url"
          );
          const routeIconUrl = mapElement.getAttribute("data-route-icon-url");

          const dataStarOn = mapElement.getAttribute("data-star-on");
          const dataStarOff = mapElement.getAttribute("data-star-off");
          const dataStarHalf = mapElement.getAttribute("data-star-half");

          console.log(dataStarOn);

          //現在地にhouseのアイコンを表示
          new google.maps.marker.AdvancedMarkerView({
            position: userPos,
            map: map,
            title: "Your Location",
            // icon: userIcon,
          });

          // マップの中心を現在位置に移動
          map.setCenter(userPos);

          // マーカーと詳細情報を表示
          addMarkers(
            locations,
            map,
            allMarkers,
            userPos,
            directionsService,
            directionsRenderer,
            restroomIconUrl,
            routeIconUrl,
            dataStarOn,
            dataStarOff,
            dataStarHalf
          );
        },
        () => {
          const mapElement =
            document.getElementById("top-map") ||
            document.getElementById("map");
          const houseIconUrl = mapElement.getAttribute("data-house-icon-url");
          const restroomIconUrl = mapElement.getAttribute(
            "data-restroom-icon-url"
          );
          const routeIconUrl = mapElement.getAttribute("data-route-icon-url");

          const dataStarOn = mapElement.getAttribute("data-star-on");
          const dataStarOff = mapElement.getAttribute("data-star-off");
          const dataStarHalf = mapElement.getAttribute("data-star-half");

          // 現在地の取得に失敗した場合の処理
          // 東京駅の座標
          const tokyoStationPos = {
            lat: 35.681236,
            lng: 139.767125,
          };

          // 東京駅にマーカーを設置（オプション）
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
            restroomIconUrl,
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

  //右クリックの拡張
  google.maps.event.addListener(map, "rightclick", (event) => {
    // clickListener 関数を呼び出し、マーカーを作成
    const marker = clickListener(event, map);

    // マーカーに 'click' イベントリスナーを追加してマーカーを削除
    google.maps.event.addListener(marker, "gmp-click", () => {
      marker.setMap(null); // マーカーをマップから削除
    });
  });
}

document.addEventListener("turbo:load", () => {
  if (document.getElementById("top-map") || document.getElementById("map")) {
    initMap();
  }
});
