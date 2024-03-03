import $ from "jquery";

$(document).on("turbo:load", function () {
  let elem = document.querySelector("#post_raty");
  if (elem == null) return;

  elem.innerHTML = "";
  let opt = {
    starOn: "<%= asset_path('star-on.png') %>",
    starOff: "<%= asset_path('star-off.png') %>",
    starHalf: "<%= asset_path('star-half.png') %>",
    scoreName: "comment[rating]",
  };
  console.log(opt);
  raty(elem, opt);
});
