import axios from "axios";

interface Coordinates {
  lat: number;
  lng: number;
}

export const geocodeAddress = async (
  location: string
): Promise<Coordinates | null> => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    );

    if (response.data.features.length > 0) {
      const { center } = response.data.features[0];
      return { lat: center[1], lng: center[0] };
    }

    return null;
  } catch (error) {
    console.error("Error geocoding address", error);
    return null;
  }
};
