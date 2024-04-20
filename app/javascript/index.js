import { addMarkers } from "addMarkers";
import { geoLocation } from "geoLocation";
import { clickListener } from "clickListener";

async function initMap() {
  if (google) {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerView } = await google.maps.importLibrary("marker");
    const { Animation } = await google.maps.importLibrary("marker");
  }

  let currentUserId = gon.current_userid;

  let locations = gon.posts;

  let mapElement =
    document.getElementById("top-map") || document.getElementById("map");

  let map;
  if (mapElement) {
    map = new google.maps.Map(mapElement, {
      zoom: 16,
      mapId: "DEMO_MAP_ID",
      maxZoom: 25,
      center: { lat: 35.681236, lng: 139.767125 },
    });
  }

  //検索ボタン
  let searchButton = document.getElementById("search");
  if (searchButton) {
    searchButton.addEventListener("click", function () {
      let keyword = document.getElementById("keyword").value;

      let request = {
        query: keyword,
        fields: ["name", "geometry"],
      };

      let service = new google.maps.places.PlacesService(map);

      service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          map.setCenter(results[0].geometry.location);
        }
      });

      document.body.style.zoom = "1.0";
    });
  }

  //アイコンのイメージ図
  let userPosition = mapElement.getAttribute("data-user-position-icon-url");
  let restroom = mapElement.getAttribute("data-restroom-icon-url");
  let routeIconUrl = mapElement.getAttribute("data-route-icon-url");
  let dataStarOn = mapElement.getAttribute("data-star-on");
  let dataStarOff = mapElement.getAttribute("data-star-off");
  let dataStarHalf = mapElement.getAttribute("data-star-half");

  //ルート検索機能
  let directionsService = new google.maps.DirectionsService();
  let directionsRenderer = new google.maps.DirectionsRenderer();

  //東京駅の緯度経度　デフォルトの初期位置
  const tokyoStationPos = {
    lat: 35.681236,
    lng: 139.767125,
  };

  let allMarkers = []; // すべてのマーカーを保持する配列

  //ページを開いた時点で施設情報をすべて表示
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

  //現在地を表示
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
    if (marker) {
      marker.setMap(null);
      marker = clickListener(event, map);
    } else {
      marker = clickListener(event, map);
    }

    google.maps.event.addListener(marker, "gmp-click", () => {
      marker.setMap(null); // マーカーをマップから削除
    });
  });

  //スマホの場合の長押し
  if (navigator.userAgent.match(/iPhone|iPad|Android.+Mobile/)) {
    let start, end;

    google.maps.event.addListener(map, "mousedown", function (event) {
      start = new Date().getTime();
    });

    google.maps.event.addListener(map, "mouseup", function (event) {
      let longpress;
      if (start) {
        end = new Date().getTime();
        longpress = end - start < 1000 ? false : true;

        if (longpress) {
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
    window.userPositionImg = null; //ページ間で遷移すると一旦nullにする
  }
});
