export function clickListener(event, map) {
  // lat() と lng() メソッドで緯度経度を取得
  const latitude = event.latLng.lat();
  const longitude = event.latLng.lng();
  let baseUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://cleanrestrooms.net/";

  // マーカーを作成してマップに追加
  const marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude }, // 更新された変数名を使用
    map,
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
    position: event.latLng,
  });

  infowindow.open(map, marker);

  return marker;
}
