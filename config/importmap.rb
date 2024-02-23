# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "index", to:"index.js"
pin "addMarkers", to:"addMarkers.js"
pin "calculateAndDisplayRoute", to:"calculateAndDisplayRoute.js"
pin "clickListener", to:"clickListener.js"
pin "handleLocationError", to:"handleLocationError.js"
pin "menu", to:"menu.js"
pin "preview", to:"preview.js"
