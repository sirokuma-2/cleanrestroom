let durationInfoWindow = null;

export function calculateAndDisplayRoute(
  directionsService,
  directionsRenderer,
  userPos,
  destination,
  map
) {
  directionsService.route(
    {
      origin: userPos,
      destination: destination,
      travelMode: google.maps.TravelMode.WALKING,
    },
    (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(response);
        console.log(response);
        // ルートの所要時間を取得して表示
        const durationText = response.routes[0].legs[0].duration.text;
        // ルートの中間地点を計算
        const route = response.routes[0];
        const midPointIndex = Math.floor(route.overview_path.length / 2);
        const midLatLng = route.overview_path[midPointIndex];
        // すでにある場合には一度閉じる
        if (durationInfoWindow !== null) {
          durationInfoWindow.close(map);
        }
        console.log(userPos);
        // Google Mapsで詳細を見るためのリンクを作成
        const originParam = `${userPos.lat},${userPos.lng}`;
        const destinationParam = `${destination.lat},${destination.lng}`;
        const googleMapsLink = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
          originParam
        )}&destination=${encodeURIComponent(
          destinationParam
        )}&travelmode=walking`;

        // InfoWindowを作成し、ルートの中間地点に所要時間とリンクを表示
        durationInfoWindow = new google.maps.InfoWindow({
          content: `<div>推定徒歩時間: ${durationText}<br><a href="${googleMapsLink}" target="_blank">ルートを案内する</a></div>`,
          position: midLatLng,
        });
        durationInfoWindow.open(map);

        // DirectionsRendererでルートを表示
        directionsRenderer.setMap(map);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}
