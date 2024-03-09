import $ from "jquery";

// レビューの星を表示
export function initializeRaty() {
  let elem = document.querySelector("#star-rating");
  if (elem && !elem.hasAttribute("data-raty-initialized")) {
    let opt = {
      starOn: "asset_path('star-on.png')",
      starOff: "asset_path('star-off.png')",
      starHalf: "asset_path('star-half.png')",
      readOnly: true,
      score: elem.getAttribute("data-score"),
    };

    window.raty(elem, opt); // Ratyを初期化
    elem.setAttribute("data-raty-initialized", "true");
  }
}

// 画面読み込み時の初期化
$(document).on("turbo:load", initializeRaty);
