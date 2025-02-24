import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container"]
  static values = {
    latitude: Number,
    longitude: Number,
    zoom: { type: Number, default: 13 }
  }

  connect() {
    this.initializeMap()
  }

  disconnect() {
    if (this.map) {
      this.map.remove()
      this.map = null
    }
  }

  initializeMap() {
    if (this.map) {
      this.map.remove()
    }

    this.map = L.map(this.containerTarget).setView(
      [this.latitudeValue || 35.681236, this.longitudeValue || 139.767125],
      this.zoomValue
    )

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map)

    this.loadRestaurants()
  }

  loadRestaurants() {
    fetch('/restaurants.json')
      .then(response => response.json())
      .then(restaurants => {
        restaurants.forEach(restaurant => {
          const marker = L.marker([restaurant.latitude, restaurant.longitude]).addTo(this.map)
          marker.bindPopup(`
            <b>${restaurant.name}</b><br>
            ${restaurant.address}<br>
            <a href="/restaurants/${restaurant.id}">詳細を見る</a>
          `)
        })
      })
  }
} 