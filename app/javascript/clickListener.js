export function clickListener(e, map) {
  // lat() と lng() メソッドで緯度経度を取得
  const latitude = e.latLng.lat();
  const longitude = e.latLng.lng();
  let baseUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://cleanrestrooms.net";

  const pinViewScaled = new google.maps.marker.PinView({
    background: "#0000FF",
    glyphColor: "white",
  });

  // マーカーを作成してマップに追加
  const marker = new google.maps.marker.AdvancedMarkerView({
    position: { lat: latitude, lng: longitude }, // 更新された変数名を使用
    map,
    content: pinViewScaled.element,
  });

  // 登録画面へのリンクを含む吹き出しを生成
  let contentString =
    '<div id="infoWindowContent" style="padding: 15px;">' +
    '<a href="' +
    baseUrl +
    "/posts/new?latitude=" +
    latitude + // ここを `lat` から `latitude` に修正
    "&longitude=" +
    longitude + // ここを `lng` から `longitude` に修正
    '">ここを登録する</a>' +
    "</div>";

  let infowindow = new google.maps.InfoWindow({
    content: contentString,
    position: e.latLng,
  });

  infowindow.open(map, marker);

  return marker;
}
