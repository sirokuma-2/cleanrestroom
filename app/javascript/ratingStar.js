import $ from "jquery";

$(document).on("turbo:load", function () {
  let elem = document.querySelector("#star-rating");
  elem.setAttribute("data-raty-initialized", "true"); //星が増えないための属性
  if (elem && !elem.hasAttribute("data-raty-initialized")) {
    let opt = {
      starOn: "asset_path('star-on.png') ",
      starOff: "asset_path('star-off.png') ",
      starHalf: "asset_path('star-half.png') ",
      readOnly: true,
      score: elem.getAttribute("data-score"),
    };

    raty(elem, opt);
  }
});
