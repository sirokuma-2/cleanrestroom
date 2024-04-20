// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
// Turbo.session.drvie = false;

import "@hotwired/turbo-rails";
import "controllers";
import "index";
import "addMarkers";
import "geoLocation";
import "calculateAndDisplayRoute";
import "clickListener";
import "handleLocationError";
import "menu";
import "preview";
import "previewName";
import "ratingStar";
import "ratingStarReview";

import Raty from "raty";

window.raty = function (elem, opt) {
  if (!elem.hasAttribute("data-raty-initialized")) {
    let raty = new Raty(elem, opt);
    raty.init();
    elem.setAttribute("data-raty-initialized", "true");
    return raty;
  } else {
    return null;
  }
};
