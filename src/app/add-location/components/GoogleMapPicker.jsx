'use client';

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: 21.1458, // Nagpur default
  lng: 79.0882,
};

export default function GoogleMapPicker({ lat, lng, onSelect }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBfBFN6L_HROTd-mS8QqUDRIqskkvHvFYk',
  });

  const [position, setPosition] = useState(lat && lng ? { lat, lng } : null);
  const [mapCenter, setMapCenter] = useState(lat && lng ? { lat, lng } : center);

  // Update position and map center when lat/lng props change (from manual input)
  useEffect(() => {
    if (lat && lng) {
      const newPosition = { lat, lng };
      setPosition(newPosition);
      setMapCenter(newPosition);
    }
  }, [lat, lng]);

  const handleClick = useCallback((event) => {
    const newPos = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setPosition(newPos);
    setMapCenter(newPos);
    onSelect(newPos.lat, newPos.lng);
  }, [onSelect]);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div>
      <label className="block mb-1 font-medium">Select Location on Map</label>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={13}
        onClick={handleClick}
      >
        {position && <Marker position={position} />}
      </GoogleMap>
    </div>
  );
}