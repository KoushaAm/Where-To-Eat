import React, { useEffect, useState } from "react";
import { Text, View, Button, Alert, LayoutAnimation, UIManager, Platform } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import {Map} from './Map'
import style from '../assets/styles/home'
import UIWrapStack from '../assets/styles/home_wrapStack';
import {
  FlatList,
  TouchableOpacity,
} from "react-native";

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}


export default function Index() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [expanded , setExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const navigation = useNavigation(); 


  const categories = [
    "Italian",
    "Chinese",
    "Indian",
    "Mexican",
    "Fast Food",
    "Seafood",
    "Vegan",
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      console.log(loc.coords);
    })();
  }, []);

  const handleCategoryPress = async (category) => {
    if (!selectedCategory.includes(category)) {
      setSelectedCategory([...selectedCategory, category]);
    } else {
      setSelectedCategory(selectedCategory.filter((item) => item !== category));
    }
    Alert.alert("You selected " + category);
  };

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  

  return (
    <View style={style.container}>
      <Text style={style.headerText}>
        What type of restaurant are you looking for?
      </Text>
      <TouchableOpacity style={style.toggleButton} onPress={toggleExpanded} activeOpacity={1}>
        <Text style={style.toggleButtonText}>
          {expanded ? "Collapse Categories" : "Expand Categories"}
        </Text>
      </TouchableOpacity>

      {expanded && (
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                style.categoryButton,
                selectedCategory === item && style.selectedButton,
              ]}
              onPress={() => handleCategoryPress(item)}
            >
              <Text
                style={[
                  style.categoryText,
                  selectedCategory.includes(item) && { color: "#fff" }, // Change text color if selected
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}



      <UIWrapStack xGap={4} yGap={4}>

        {selectedCategory.map((category) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(
                selectedCategory.filter((item) => item !== category)
              );
            }}
          >
            <Text style ={style.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
        </UIWrapStack>

      {/* search and go to map */}
      <Button
        title="Search"
        onPress={() => {
          navigation.navigate('Map', {
            location: location,
            categories: selectedCategory
          });
        }}
      />
          

      


    </View>
  );
}