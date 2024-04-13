# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "index", to:"index.js"
pin "addMarkers", to:"addMarkers.js"
pin "geoLocation", to:"geoLocation.js"
pin "calculateAndDisplayRoute", to:"calculateAndDisplayRoute.js"
pin "clickListener", to:"clickListener.js"
pin "handleLocationError", to:"handleLocationError.js"
pin "menu", to:"menu.js"
pin "preview", to:"preview.js"
pin "previewName", to:"previewName.js"
pin "ratingStar", to:"ratingStar.js"
pin "ratingStarReview", to:"ratingStarReview.js"




pin "jquery", to: "https://ga.jspm.io/npm:jquery@3.6.3/dist/jquery.js"
pin "raty", to:"raty.js"
