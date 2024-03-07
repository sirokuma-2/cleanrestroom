import $ from "jquery";

// Ratyの初期化関数を定義
export function initializeRaty() {
  let elem = document.querySelector("#star-rating");
  console.log(elem);
  let opt = {
    starOn: "asset_path('star-on.png') ",
    starOff: "asset_path('star-off.png') ",
    starHalf: "asset_path('star-half.png') ",
    readOnly: true,
    score: elem.getAttribute("data-score"),
  };

  raty(elem, opt);
  elem.setAttribute("data-raty-initialized", "true");
}
