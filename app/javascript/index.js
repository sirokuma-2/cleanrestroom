import { clickListener } from "./clickListener.js";
import { addMarkers } from "./addMarkers.js";
import { handleLocationError } from "./handleLocationError.js";

let map;

let locations; //すべての施設の位置
let allMarkers = []; // すべてのマーカーを保持する配列
let restroomIconUrl;
let routeIconUrl;

let userPos; // ユーザーの現在位置

let directionsService; // ルートを検索するためのDirectionsServiceのインスタンス
let directionsRenderer; // マップ上にルートを表示するためのDirectionsRendererのインスタンス

const googleMapKey = gon.googlemap_key;

//Google Map APIのロード
function loadGoogleMapsAPI() {
  ((g) => {
    var h,
      a,
      k,
      p = "The Google Maps JavaScript API",
      c = "google",
      l = "importLibrary",
      q = "__ib__",
      m = document,
      b = window;
    b = b[c] || (b[c] = {});
    var d = b.maps || (b.maps = {}),
      r = new Set(),
      e = new URLSearchParams(),
      u = () =>
        h ||
        (h = new Promise(async (f, n) => {
          await (a = m.createElement("script"));
          e.set("libraries", [...r] + "");
          for (k in g)
            e.set(
              k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
              g[k]
            );
          e.set("callback", c + ".maps." + q);
          a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
          d[q] = f;
          a.onerror = () => (h = n(Error(p + " could not load.")));
          a.nonce = m.querySelector("script[nonce]")?.nonce || "";
          m.head.append(a);
        }));
    //APIをすでに読み込んでいる場合再度読み込まない
    if (!d[l]) {
      d[l]
        ? console.warn(p + " only loads once. Ignoring:", g)
        : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
    }
  })({
    key: googleMapKey,
    v: "beta",
  });
}

//非同期関数　マップの初期化
async function initMap() {
  //Google Mapsライブラリを非同期にインポート　　Mapクラス
  const { Map } = await google.maps.importLibrary("maps");

  // gonから施設の位置情報を取得
  locations = gon.posts;

  //ルート検索機能
  directionsService = new google.maps.DirectionsService(); //ルートを検索するためのインスタンス
  directionsRenderer = new google.maps.DirectionsRenderer(); //マップにルートを表示するためのインスタンス

  map = new Map(
    document.getElementById("top-map") || document.getElementById("map"),
    {
      zoom: 13,
      mapId: "DEMO_MAP_ID",
      maxZoom: 18,
      center: { lat: 35.681236, lng: 139.767125 },
    }
  );

  // GPSで現在地を表示　現在地にhouseアイコンを表示　マーカーと詳細情報を表示
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const mapElement =
          document.getElementById("top-map") || document.getElementById("map");
        const houseIconUrl = mapElement.getAttribute("data-house-icon-url");
        restroomIconUrl = mapElement.getAttribute("data-restroom-icon-url");
        routeIconUrl = mapElement.getAttribute("data-route-icon-url");

        //現在地のアイコンの設定
        const userIcon = {
          url: houseIconUrl,
          scaledSize: new google.maps.Size(20, 20),
          origin: new google.maps.Point(0, 0),
        };

        //現在地にhouseのアイコンを表示
        new google.maps.Marker({
          position: userPos,
          map: map,
          title: "Your Location",
          icon: userIcon,
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
          routeIconUrl
        );
      },
      () => {
        //handleLocationErrorの設定
        // handleLocationError(true, map.getCenter());

        const mapElement =
          document.getElementById("top-map") || document.getElementById("map");
        const houseIconUrl = mapElement.getAttribute("data-house-icon-url");
        restroomIconUrl = mapElement.getAttribute("data-restroom-icon-url");
        routeIconUrl = mapElement.getAttribute("data-route-icon-url");

        //現在地のアイコンの設定
        const userIcon = {
          url: houseIconUrl,
          scaledSize: new google.maps.Size(20, 20),
          origin: new google.maps.Point(0, 0),
        };

        // 現在地の取得に失敗した場合の処理
        // 東京駅の座標
        const tokyoStationPos = {
          lat: 35.681236,
          lng: 139.767125,
        };

        // 東京駅にマーカーを設置（オプション）
        new google.maps.Marker({
          position: tokyoStationPos,
          map: map,
          title: "Tokyo Station",
          icon: userIcon,
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
          routeIconUrl
        );
      }
    );
  } else {
    //handleLocationErrorの設定
    handleLocationError(false, map.getCenter());
  }

  //右クリックの拡張
  google.maps.event.addListener(map, "rightclick", (event) => {
    // clickListener 関数を呼び出し、マーカーを作成
    const marker = clickListener(event, map);

    // マーカーに 'click' イベントリスナーを追加してマーカーを削除
    google.maps.event.addListener(marker, "click", () => {
      marker.setMap(null); // マーカーをマップから削除
    });
  });
}

document.addEventListener("turbo:load", function () {
  loadGoogleMapsAPI(); // APIのロード
  initMap(); // マップの初期化関数をここで呼び出す
});
