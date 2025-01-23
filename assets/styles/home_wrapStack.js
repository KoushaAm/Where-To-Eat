import React from 'react';
import { View, Text } from 'react-native';

// source : https://manual-ui.com/react-native/wrap-stack
const UIWrapStack = ({ xGap = 4, yGap = 4, children }) => {
  const styles = {
    wrapStack: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginHorizontal: -xGap / 2,
      marginVertical: -yGap / 2,
    },
    wrapStackItemWrap: {
      minWidth: 0,
    },
    wrapStackItem: (color) => ({
      padding: 10,
      backgroundColor: color,
      marginHorizontal: xGap / 2,
      marginVertical: yGap / 2,
      borderRadius: 20,
      alignItems: 'center',
    }),
    wrapStackText: (isDarkText) => ({
      color: isDarkText ? '#000' : '#fff',
    }),
  };

  const generateColor = (index) => {
    const hue = (index * 137) % 360; // Generate unique hues
    return `hsl(${hue}, 70%, 85%)`;
  };

  const isColorDark = (hslColor) => {
    // Extract the lightness value from the HSL color
    const lightness = parseFloat(hslColor.match(/(\d+)%\)$/)[1]);
    return lightness > 50;
  };

  return (
    <View style={styles.wrapStack}>
      {React.Children.map(children, (child, index) => {
        const color = generateColor(index);
        const isDarkText = !isColorDark(color); 
        return (
          <View key={index} style={styles.wrapStackItem(color)}>
            {React.cloneElement(child, {
              style: styles.wrapStackText(isDarkText),
            })}
          </View>
        );
      })}
    </View>
  );
};

export default UIWrapStack;