import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const UpdateView = ({ center }) => {
  const map = useMap();
  map.setView(center);
  return null;
};

export default function MapComponent({ walkPath }) {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (walkPath && walkPath.length > 0) {
      setCenter(walkPath[0]);
    }
  }, [walkPath]);

  return (
    <MapContainer center={center} zoom={13} sx={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {walkPath && walkPath.length > 0 && (
        <>
          <Marker position={walkPath[0]} icon={new L.Icon.Default()} />
          <Polyline positions={walkPath} color="blue" />
          <UpdateView center={center} />
        </>
      )}
    </MapContainer>
  );
}
