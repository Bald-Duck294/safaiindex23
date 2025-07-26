"use client";

import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Loader2 } from "lucide-react";
import locationsApi from "@/lib/api/LocationApi"; // adjust path as needed

const mapContainerStyle = {
  width: "100%",
  height: "80vh",
};

const center = {
  lat: 21.1458, // Centered around Nagpur
  lng: 79.0882,
};

const MapView = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBfBFN6L_HROTd-mS8QqUDRIqskkvHvFYk",
  });

  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLocations = useCallback(async () => {
    setLoading(true);
    const res = await locationsApi.getAllLocations();
    if (res.success) {
        console.log('response' , 'response')
      setLocations(res.data);
    } else {
      console.error(res.error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div className="flex justify-center items-center h-96"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Toilets Map</h2>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={center}
        >
          {locations.map((loc) => (
            <Marker
              key={loc.id}
              position={{
                lat: parseFloat(loc.latitude),
                lng: parseFloat(loc.longitude),
              }}
              onClick={() => setSelected(loc)}
              title={loc.name}
            />
          ))}

          {selected && (
            <InfoWindow
              position={{
                lat: parseFloat(selected.latitude),
                lng: parseFloat(selected.longitude),
              }}
              onCloseClick={() => setSelected(null)}
            >
              <div className="text-sm">
                <p className="font-semibold">{selected.name}</p>
                {selected.averageRating !== null ? (
                  <p>Avg. Rating: {selected.averageRating.toFixed(1)} ⭐</p>
                ) : (
                  <p>No ratings yet</p>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default MapView;
