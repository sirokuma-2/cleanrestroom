import { addMarkers } from "addMarkers";
import { geoLocation } from "geoLocation";
import { clickListener } from "clickListener";

let locations; //すべての施設の位置
let currentUserId;
let mapElement;
let map;
let allMarkers = []; // すべてのマーカーを保持する配列
let directionsService; // ルートを検索するためのDirectionsServiceのインスタンス
let directionsRenderer; // マップ上にルートを表示するためのDirectionsRendererのインスタンス
let userPosition;
let restroom;
let routeIconUrl;
let dataStarOn;
let dataStarOff;
let dataStarHalf;

//非同期関数　マップの初期化
async function initMap() {
  //Google Mapsライブラリを非同期にインポート　　Mapクラス
  if (google) {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerView } = await google.maps.importLibrary("marker");
    const { Animation } = await google.maps.importLibrary("marker");
  }
  // gonから施設の位置情報を取得
  currentUserId = gon.current_userid;

  locations = gon.posts;

  mapElement =
    document.getElementById("top-map") || document.getElementById("map");

  if (mapElement) {
    map = new google.maps.Map(mapElement, {
      zoom: 16,
      mapId: "DEMO_MAP_ID",
      maxZoom: 25,
      center: { lat: 35.681236, lng: 139.767125 },
    });
  }

  //アイコンのイメージ図
  userPosition = mapElement.getAttribute("data-userposition-icon-url");
  restroom = mapElement.getAttribute("data-restroom-icon-url");
  routeIconUrl = mapElement.getAttribute("data-route-icon-url");
  dataStarOn = mapElement.getAttribute("data-star-on");
  dataStarOff = mapElement.getAttribute("data-star-off");
  dataStarHalf = mapElement.getAttribute("data-star-half");

  //ルート検索機能
  directionsService = new google.maps.DirectionsService(); //ルートを検索するためのインスタンス
  directionsRenderer = new google.maps.DirectionsRenderer(); //マップにルートを表示するためのインスタンス

  const tokyoStationPos = {
    lat: 35.681236,
    lng: 139.767125,
  };

  //まずは施設情報をすべて表示
  addMarkers(
    locations,
    currentUserId,
    map,
    allMarkers,
    tokyoStationPos, //東京駅を渡す
    directionsService,
    directionsRenderer,
    routeIconUrl,
    restroom,
    dataStarOn,
    dataStarOff,
    dataStarHalf
  );

  //現在地と施設情報の表示
  geoLocation(
    locations,
    currentUserId,
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
  );

  let marker;

  //右クリックの拡張
  google.maps.event.addListener(map, "rightclick", (event) => {
    // clickListener 関数を呼び出し、マーカーを作成
    if (marker) {
      marker.setMap(null); // マーカーをマップから削除
      marker = clickListener(event, map);
    } else {
      marker = clickListener(event, map);
    }

    // マーカーに 'click' イベントリスナーを追加してマーカーを削除
    google.maps.event.addListener(marker, "gmp-click", () => {
      marker.setMap(null); // マーカーをマップから削除
    });
  });

  //スマホの場合の長押し
  if (navigator.userAgent.match(/iPhone|iPad|Android.+Mobile/)) {
    let start, end;
    //以下、ロングタップの処理
    google.maps.event.addListener(map, "mousedown", function (event) {
      start = new Date().getTime();
    });

    google.maps.event.addListener(map, "mouseup", function (event) {
      let longpress;
      if (start) {
        end = new Date().getTime();
        longpress = end - start < 1000 ? false : true;

        if (longpress) {
          // clickListener 関数を呼び出し、マーカーを作成
          if (marker) {
            marker.setMap(null); // マーカーをマップから削除
            marker = clickListener(event, map);
          } else {
            marker = clickListener(event, map);
          }
        }
      }
    });
  }
}

//マップの表示
document.addEventListener("turbo:load", () => {
  if (document.getElementById("top-map") || document.getElementById("map")) {
    initMap();
  }
});
