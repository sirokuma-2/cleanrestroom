import { calculateAndDisplayRoute } from "calculateAndDisplayRoute";

export function addMarkers(
  locations,
  map,
  allMarkers,
  userPos,
  directionsService,
  directionsRenderer,
  restroomIconUrl,
  routeIconUrl
) {
  locations.forEach((location) => {
    //locationごとに繰り返し

    const pinViewScaled = new google.maps.marker.PinView({
      background: "#0000FF",
      glyphColor: "white",
    });

    // マーカーを設置する設定
    const marker = new google.maps.marker.AdvancedMarkerView({
      map: map,
      position: { lat: location.latitude, lng: location.longitude },
      title: location.name,
      content: pinViewScaled.element,
    });

    // ここでマーカーを配列に追加
    allMarkers.push(marker);

    // インフォパネルの要素を取得
    const infoPanel = document.getElementById("infoPanel");

    let baseUrl =
      window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://cleanrestrooms.net";

    //編集するボタンを作成
    function addEditButton(parentElement) {
      const editButton = document.createElement("a");
      editButton.textContent = "編集する";
      editButton.href = `${baseUrl}/posts/${location.id}/edit`;
      editButton.style.display = "inline-block"; // ブロック要素のように扱う
      editButton.style.backgroundColor = "#4CAF50";
      editButton.style.color = "#FFFFFF";
      editButton.style.borderRadius = "10px";
      editButton.style.textDecoration = "none";
      editButton.style.border = "none";
      editButton.style.padding = "10px 20px";
      editButton.style.cursor = "pointer";
      parentElement.appendChild(editButton);
    }

    // パネルを閉じる機能を持つボタンの動的作成とイベントリスナーの追加
    function addCloseButton(parentElement) {
      const closeButton = document.createElement("button");
      closeButton.textContent = "← 戻る";
      closeButton.style.border = "none";
      closeButton.style.fontWeight = "bold";
      closeButton.onclick = hideInfoPanel;
      parentElement.appendChild(closeButton);
    }

    // パネルを閉じる関数
    function hideInfoPanel() {
      infoPanel.classList.remove("infoPanel-visible");
      setTimeout(function () {
        infoPanel.style.display = "none";
        infoPanel.innerHTML = "";
      }, 250);
    }

    // ルート検索機能を持つボタンの動的作成とイベントリスナーの追加
    function addSearchRouteButton(parentElement) {
      const searchButton = document.createElement("button");
      // searchButton.textContent = "ルート検索";
      // ボタンに背景画像を設定
      searchButton.style.backgroundImage = `url(${routeIconUrl})`;
      searchButton.style.backgroundSize = "cover";
      searchButton.style.width = "60px";
      searchButton.style.height = "45px";
      searchButton.style.border = "none";
      searchButton.style.cursor = "pointer";
      searchButton.style.margin = "0 20px 0 0";
      searchButton.onclick = function () {
        // ルート検索関数を呼び出し
        calculateAndDisplayRoute(
          directionsService,
          directionsRenderer,
          userPos,
          { lat: marker.position.lat, lng: marker.position.lng },
          map
        );
        //ルート検索実行後、infopanelを閉じる
        if (window.matchMedia("(max-width: 1024px)").matches) {
          hideInfoPanel();
        }
      };
      parentElement.appendChild(searchButton);
    }

    //評価するボタンを作成
    function addReviewButton(parentElement) {
      const reviewButton = document.createElement("a");
      reviewButton.textContent = "評価する";
      reviewButton.href = `${baseUrl}/posts/${location.id}/comments/new`;
      reviewButton.style.backgroundColor = "#4CAF50";
      reviewButton.style.color = "#FFFFFF";
      reviewButton.style.borderRadius = "10px";
      reviewButton.style.border = "none";
      reviewButton.style.textDecoration = "none";
      reviewButton.style.padding = "10px 30px";
      reviewButton.style.cursor = "pointer";
      reviewButton.style.marginTop = "10px";
      parentElement.appendChild(reviewButton);
    }

    let name, address, content, imageUrl;
    name = location.name;
    address = location.address;
    content = location.content;
    imageUrl = location.image;

    // マップ上のアイコンにイベントリスナーを追加
    marker.addListener("gmp-click", function () {
      infoPanel.style.display = "block";

      // infoPanelの中身をクリア
      infoPanel.innerHTML = "";

      // infoPanelの中身を新しく作成
      //divクラスを作成　 id="infoWindowContent"
      const infoWindowContent = document.createElement("div");
      infoWindowContent.id = "infoWindowContent";
      infoWindowContent.style =
        "border: 1px solid #ccc; background-color: #f9f9f9; padding: 15px; border-radius: 5px; font-family: Arial, sans-serif;";

      //画像の表示
      if (imageUrl.includes("https://cleanrestroom")) {
        const image = document.createElement("img");
        image.src = imageUrl;
        image.alt = "画像";
        image.style.width = "100%";
        image.style.height = "auto";
        infoWindowContent.appendChild(image);
      }
      //h1の親要素を作成
      const h1Wrapper = document.createElement("div");
      h1Wrapper.style.display = "flex";
      h1Wrapper.style.justifyContent = "space-around";
      h1Wrapper.style.alignItems = "center";
      h1Wrapper.style.width = "100%";
      h1Wrapper.style.height = "63px";
      h1Wrapper.style.backgroundColor = "#F0F0F0";
      h1Wrapper.style.marginBottom = "10px";
      h1Wrapper.style.paddingLeft = "10px";

      // h1タグ id class style
      const firstHeading = document.createElement("h1");
      firstHeading.id = "firstHeading";
      firstHeading.className = "firstHeading";
      firstHeading.style =
        "font-size: 20px; margin: 0 auto; text-align: center; vertical-align: middle;";
      firstHeading.textContent = name;

      // h1をラッパーに追加
      addCloseButton(h1Wrapper);
      h1Wrapper.appendChild(firstHeading);
      addSearchRouteButton(h1Wrapper);

      // ラッパーをinfoWindowContentに追加
      infoWindowContent.appendChild(h1Wrapper);

      // ボタンの親要素（ラッパー）を作成
      const buttonWrapper = document.createElement("div");
      buttonWrapper.style.display = "flex";
      buttonWrapper.style.justifyContent = "flex-end";
      buttonWrapper.style.width = "100%";

      // buttonWrapperを親要素として編集ボタンを追加
      addEditButton(buttonWrapper);

      // buttonWrapperを最終的な親要素に追加（例: infoWindowContent）
      infoWindowContent.appendChild(buttonWrapper);

      // infoPanelにinfoWindowContentを追加
      infoPanel.appendChild(infoWindowContent);

      function addItem(titleText, contentText) {
        // 追記の親要素（ラッパー）を作成
        const item = document.createElement("div");
        item.style.padding = "4px 0px";

        // タイトル用の要素を作成
        const titleElement = document.createElement("div");
        titleElement.textContent = titleText;
        titleElement.style.color = "#333";
        titleElement.style.fontSize = "18px";
        titleElement.style.fontWeight = "bold";
        titleElement.style.marginBottom = "10px";

        // コンテンツ用の要素を作成
        const contentElement = document.createElement("div");
        contentElement.textContent = contentText;
        contentElement.style.color = "#555";
        contentElement.style.fontSize = "16px";
        contentElement.style.marginLeft = "20px";

        // titleElement と contentElement を item に追加
        item.appendChild(titleElement);
        item.appendChild(contentElement);

        // item を infoWindowContent に追加
        infoWindowContent.appendChild(item);
      }

      // 使用例
      addItem("住所", address);
      addItem("コメント", content);
      //addItem("設備情報", capacity);
      //addItem("レビュー", place);

      // ボタンの親要素（ラッパー）を作成
      const buttonWrapper2 = document.createElement("div");
      buttonWrapper2.style.display = "flex";
      buttonWrapper2.style.justifyContent = "center";
      buttonWrapper2.style.width = "100%";
      buttonWrapper2.style.marginBottom = "10px";

      // buttonWrapperを親要素として編集ボタンを追加
      addReviewButton(buttonWrapper2);

      // buttonWrapperを最終的な親要素に追加（例: infoWindowContent）
      infoWindowContent.appendChild(buttonWrapper2);
    });
  });
}
