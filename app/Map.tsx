import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useRoute } from "@react-navigation/native";
import axios from 'axios';

// import a json file
import data from './data.json';

export default function Map() {
  const [coordinates, setCoordinates] = useState([]);
  const route = useRoute();
  const latitude = route.params.location.latitude;
  const longitude = route.params.location.longitude;
  const categories = route.params.categories;
  console.log(longitude, latitude, categories);
  
  // function to convert an address to latitude and longitude
  const geocodeAddress = async (address:string) => {
    try {
      const results = await Location.geocodeAsync(address);
      if (results.length > 0) {
        const { latitude, longitude } = results[0];
        return { latitude, longitude };
      } else {
        Alert.alert("Error", "Address not found.");
        return null;
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      Alert.alert("Error", "Could not fetch geocoding data.");
      return null;
    }
  };

  const fetchAddressAndGeocode = async (yelpLink) => {
    try {
      console.log('Fetching address for:', yelpLink);
      // Replace 'localhost' with your machine's IP address
      const response = await axios.post('http://192.168.1.67:4000/scrape-address', {
        link: yelpLink,
      });
  
      const address = response.data.address;
      console.log('Fetched address:', address);
  
      if (address) {
        const geolocation = await geocodeAddress(address);
  
        if (geolocation) {
          setCoordinates(prevCoordinates => [...prevCoordinates, geolocation]);
        }
      } else {
        console.error('Could not fetch address');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  // Fetch geocoding data when the component loads
  useEffect(() => {
    const fetchData = async () => {
      for (let i = 0; i < data['organic_results'].length; i++) {
        const yelpLink = data['organic_results'][i].link;
        await fetchAddressAndGeocode(yelpLink);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Locations</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {coordinates.map((coord, index) => (
          <Marker
            key={index}
            coordinate={coord}
            title={`Location ${index + 1}`}
            description={`Latitude: ${coord.latitude}, Longitude: ${coord.longitude}`}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "80%",
  },
  header: {
    fontSize: 20,
    margin: 10,
    fontWeight: "bold",
  },
});