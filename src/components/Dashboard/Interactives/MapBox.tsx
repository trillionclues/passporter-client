"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { geocodeAddress } from "@/lib/geocodeAddress";

interface Coordinates {
  lat: number;
  lng: number;
}


const MapBoxLocation: React.FC<{ location: string }> = ({ location }) => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const result = await geocodeAddress(location);

      if (result) {
        setCoordinates(result);
      }
    };

    if (location) {
      fetchCoordinates();
    }
  }, [location]);

  return (
    <div className="mt-4 -z-10">
      {coordinates && (
        <MapContainer
          center={[coordinates.lat, coordinates.lng]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[coordinates.lat, coordinates.lng]}
            icon={L.icon({
              iconUrl:
                "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
              iconRetinaUrl:
                "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              tooltipAnchor: [16, -28],
              shadowSize: [41, 41],
            })}
          >
            <Popup>Processing Location</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default MapBoxLocation;
