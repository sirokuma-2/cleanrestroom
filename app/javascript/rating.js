import $ from "jquery";

$(function () {
  $(document)
    .on("mouseover", "p", function () {
      $(this).css({ color: "blue" });
    })
    .on("mouseout", "p", function () {
      $(this).css({ color: "" });
    });
});
