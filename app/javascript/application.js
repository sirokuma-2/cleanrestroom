// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
pin "index", to:"index.js"
pin "addMarkers", to:"addMarkers.js"
pin "calculateAndDisplayRoute", to:"calculateAndDisplayRoute.js"
pin "clearMarkers", to:"clearMarkers.js"
pin "clickListener", to:"clickListener.js"
pin "handleLocationError.js", to:"handleLocationError.js"