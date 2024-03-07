// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
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
import "rating";
import "ratingStar";
import "ratingStar2";

import Raty from "raty";

window.raty = function (elem, opt) {
  let raty = new Raty(elem, opt);
  raty.init();
  return raty;
};
