import $ from "jquery";

$(document).on("turbo:load", function () {
  console.log("rating");
  let elem = document.querySelector("#post_raty");
  if (elem == null) return;

  elem.innerHTML = "";
  let opt = {
    starOn: "<%= asset_path('star-on.png') %>",
    starOff: "<%= asset_path('star-off.png') %>",
    starHalf: "<%= asset_path('star-half.png') %>",
    scoreName: "book[star]",
  };
  raty(elem, opt);
});
