import L from 'leaflet'
import { Marker, MapContainer, TileLayer } from 'react-leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
})

L.Marker.prototype.options.icon = DefaultIcon

export const Map = () => (
  <MapContainer
    center={[36.57332723779, 140.64191798417]}
    zoom={12}
    scrollWheelZoom={false}
    style={{ width: '320px', height: '240px' }}
  >
    <TileLayer
      attribution="<a href='https://maps.gsi.go.jp/development/ichiran.html’target='_blank'> 地理院タイル</a> "
      url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
    />
    <Marker position={[36.57332723779, 140.64191798417]}></Marker>
  </MapContainer>
)
