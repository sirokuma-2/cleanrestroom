import { calculateAndDisplayRoute } from "calculateAndDisplayRoute";
import { initializeRaty } from "ratingStar";

export function addMarkers(
  locations,
  currentUserId,
  map,
  allMarkers,
  userPos, //現在地または東京駅
  directionsService,
  directionsRenderer,
  routeIconUrl,
  dataStarOn,
  dataStarOff,
  dataStarHalf
) {
  locations.forEach((location) => {
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

    //post_facilityテーブルからの情報を定義
    let name,
      address,
      content,
      nursing_room,
      anyone_toilet,
      diaper_changing_station,
      powder_corner,
      stroller_accessible,
      imageUrl,
      averageRating,
      countRating,
      userId,
      currentUserId2;

    name = location.name;
    address = location.address;
    content = location.content;
    nursing_room = location.nursing_room;
    anyone_toilet = location.anyone_toilet;
    diaper_changing_station = location.diaper_changing_station;
    powder_corner = location.powder_corner;
    stroller_accessible = location.stroller_accessible;
    imageUrl = location.image;
    userId = location.userId;
    currentUserId2 = currentUserId;

    // 閉じるボタン関数の作成
    function addCloseButton(parentElement) {
      const closeButton = document.createElement("button");
      closeButton.textContent = "← 閉じる";
      closeButton.style.width = "70px";
      closeButton.style.height = "55px";
      closeButton.style.border = "none";
      closeButton.style.fontWeight = "bold";
      closeButton.style.margin = "0 0 0 5px";
      closeButton.style.backgroundColor = "white";
      closeButton.onclick = hideInfoPanel;
      parentElement.appendChild(closeButton);
    }

    // 戻るをクリックするとパネル閉じる関数
    function hideInfoPanel() {
      infoPanel.classList.remove("infoPanel-visible");
      setTimeout(function () {
        infoPanel.style.display = "none";
        infoPanel.innerHTML = "";
      }, 250);
    }

    // ルート案内ボタン関数の作成
    function addSearchRouteButton(parentElement) {
      const searchButton = document.createElement("button");
      // ボタンに背景画像を設定
      searchButton.style.backgroundImage = `url(${routeIconUrl})`;
      searchButton.style.backgroundSize = "cover";
      searchButton.style.width = "60px";
      searchButton.style.height = "55px";
      searchButton.style.border = "none";
      searchButton.style.cursor = "pointer";
      searchButton.style.margin = "0 5px 0 0";
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

    //編集・評価するボタンの関数作成
    function addButtonEdit(parentElement, buttonText) {
      const Button = document.createElement("a");
      Button.className = "button-btn";
      Button.textContent = buttonText;
      Button.href = `${baseUrl}/posts/${location.hashId}/edit`;
      Button.style.display = "inline-block"; // ブロック要素のように扱う
      Button.style.backgroundColor = "#4CAF50";
      Button.style.color = "#FFFFFF";
      Button.style.borderRadius = "10px";
      Button.style.textDecoration = "none";
      Button.style.border = "none";
      Button.style.padding = "10px 20px";
      Button.style.marginTop = "10px";
      Button.style.cursor = "pointer";
      Button.style.position = "relative";
      parentElement.appendChild(Button);
    }

    function addButtonReview(parentElement, buttonText) {
      const Button = document.createElement("a");
      Button.textContent = buttonText;
      Button.className = "button-btn";
      Button.href = `${baseUrl}/posts/${location.hashId}/comments/new`;
      Button.style.display = "inline-block"; // ブロック要素のように扱う
      Button.style.backgroundColor = "#4CAF50";
      Button.style.color = "#FFFFFF";
      Button.style.borderRadius = "10px";
      Button.style.textDecoration = "none";
      Button.style.border = "none";
      Button.style.padding = "10px 20px";
      Button.style.marginTop = "10px";
      Button.style.cursor = "pointer";
      Button.style.position = "relative";
      parentElement.appendChild(Button);
    }

    //住所・コメントの表示関数の作成
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

    //設備情報の表示関数の作成
    function addItemFacility(titleText, contentTextList) {
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

      item.appendChild(titleElement);

      const contentElementWrapper = document.createElement("div");
      contentElementWrapper.style.maxWidth = "350px";
      contentElementWrapper.style.display = "flex";
      contentElementWrapper.style.flexWrap = "wrap"; // 要素が多い場合に折り返す
      contentElementWrapper.style.justifyContent = "space-between";

      // contentTextList 内の各設備に対してループ処理
      contentTextList.forEach(function (contentText, index) {
        if (contentText) {
          // 設備が true の場合のみ
          const contentElement = document.createElement("div");
          contentElement.textContent = [
            "授乳室",
            "誰でもトイレ",
            "オムツ交換台",
            "パウダーコーナー",
            "ベビーカー可",
          ][index]; // 対応する設備名
          contentElement.style.width = "150px";
          contentElement.style.color = "#555";
          contentElement.style.fontSize = "16px";
          contentElement.style.textAlign = "center";
          contentElement.style.marginBottom = "5px";
          contentElement.style.marginLeft = "20px";
          contentElement.style.border = "1px solid black";
          contentElement.style.backgroundColor = "#F0F0F0";
          contentElement.style.borderRadius = "10px";

          contentElementWrapper.appendChild(contentElement);
          item.appendChild(contentElementWrapper);
        }
      });

      // item を infoWindowContent に追加
      infoWindowContent.appendChild(item);
    }

    //レビューの表示関するの作成
    function addItemReview(titleText, contentText, contentText2) {
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

      const containerElement = document.createElement("div");
      containerElement.style.maxWidth = "400px";
      containerElement.style.display = "flex";
      containerElement.style.justifyContent = "space-around";
      containerElement.style.alignItems = "center";

      titleElement.textContent = titleText;

      // コンテンツ用の要素を作成
      const contentElement = document.createElement("p");
      contentElement.textContent = `平均 ${contentText}`;
      contentElement.style.color = "#555";
      contentElement.style.fontSize = "16px";
      contentElement.style.marginLeft = "20px";

      // 星評価を表示するためのdiv要素の作成
      const starRatingElement = document.createElement("div");
      starRatingElement.id = "star-rating";
      starRatingElement.setAttribute("data-score", contentText);
      starRatingElement.setAttribute("data-star-on", dataStarOn);
      starRatingElement.setAttribute("data-star-off", dataStarOff);
      starRatingElement.setAttribute("data-star-half", dataStarHalf);

      const contentElement2 = document.createElement("a");
      contentElement2.textContent = `(${contentText2}件の評価を見る)`;
      contentElement2.href = `${baseUrl}/posts/${location.hashId}`;
      contentElement2.style.color = "#555";
      contentElement2.style.fontSize = "16px";
      contentElement2.style.marginLeft = "5px";

      // titleElement と contentElement を item に追加
      item.appendChild(titleElement);

      // 各要素をコンテナに追加
      containerElement.appendChild(contentElement);
      containerElement.appendChild(starRatingElement);
      containerElement.appendChild(contentElement2);

      // コンテナをitemに追加（itemは既にある要素と仮定）
      item.appendChild(containerElement);

      // item を infoWindowContent に追加
      infoWindowContent.appendChild(item);

      //　itemを描画したのちにレビュー星を作成
      initializeRaty();
    }

    // infopanelの表示
    marker.addListener("gmp-click", function () {
      infoPanel.style.display = "block";
      infoPanel.style.height = "77%";

      // infoPanelの中身をクリア
      infoPanel.innerHTML = "";

      //画像の表示
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

      //戻る　施設名称　ルート案内ボタンのラッパーの作成
      const h1Wrapper = document.createElement("div");
      h1Wrapper.style.display = "flex";
      h1Wrapper.style.justifyContent = "space-around";
      h1Wrapper.style.alignItems = "center";
      h1Wrapper.style.width = "100%";
      h1Wrapper.style.height = "63px";
      h1Wrapper.style.backgroundColor = "#F0F0F0";
      h1Wrapper.style.marginBottom = "10px";

      //施設名称の表示
      const firstHeading = document.createElement("h1");
      firstHeading.id = "firstHeading";
      firstHeading.className = "firstHeading";
      firstHeading.style =
        "font-size: 20px; margin: 0 auto; text-align: center; vertical-align: middle;";
      firstHeading.textContent = name;

      if (firstHeading.textContent.length >= 15) {
        firstHeading.style =
          "font-size: 12px; margin: 0 auto; text-align: center; vertical-align: middle;";
      } else if (firstHeading.textContent.length >= 10) {
        firstHeading.style =
          "font-size: 16px; margin: 0 auto; text-align: center; vertical-align: middle;";
      } else {
        firstHeading.style =
          "font-size: 18px; margin: 0 auto; text-align: center; vertical-align: middle;";
      }
      firstHeading.style.maxWidth = "200px";

      // 戻るボタン　ルート案内ボタンの表示
      addCloseButton(h1Wrapper);
      h1Wrapper.appendChild(firstHeading);
      addSearchRouteButton(h1Wrapper);
      // 戻る　施設名称　ルートあんなにボタンの追加
      infoWindowContent.appendChild(h1Wrapper);

      // 編集ボタンのラッパーの作成

      const buttonWrapper = document.createElement("div");
      buttonWrapper.style.display = "flex";
      buttonWrapper.style.justifyContent = "flex-end";
      buttonWrapper.style.width = "100%";

      // 編集ボタンを追加
      if (userId === currentUserId2) {
        addButtonEdit(buttonWrapper, "編集する");
      }

      infoWindowContent.appendChild(buttonWrapper);
      infoPanel.appendChild(infoWindowContent);

      //住所　コメント　設備情報の追加
      addItem("住所", address);
      addItem("コメント", content);
      addItemFacility("設備情報", [
        nursing_room,
        anyone_toilet,
        diaper_changing_station,
        powder_corner,
        stroller_accessible,
      ]);

      //レビューの追加
      const totalRating = location.comment.reduce((acc, comment) => {
        return acc + comment.rating;
      }, 0);

      if (location.comment.length) {
        averageRating = (totalRating / location.comment.length).toFixed(1);
      } else {
        averageRating = 0;
      }

      countRating = location.comment.length;

      addItemReview("レビュー", averageRating, countRating);

      // 評価するボタンのラッパーの作成
      const buttonWrapper2 = document.createElement("div");
      buttonWrapper2.style.display = "flex";
      buttonWrapper2.style.justifyContent = "center";
      buttonWrapper2.style.width = "100%";
      buttonWrapper2.style.marginBottom = "10px";

      // 評価するボタンの追加
      addButtonReview(buttonWrapper2, "評価する");
      infoWindowContent.appendChild(buttonWrapper2);
    });
  });
}
