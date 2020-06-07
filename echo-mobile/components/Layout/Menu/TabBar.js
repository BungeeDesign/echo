import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import TabBarIcon from '../../../components/TabBarIcon';
import Theme from '../../../constants/Theme';

export const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={[styles.container, { width: '100%' }]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              onPress={onPress}
              key={index}
              stlye={{
                flex: 1,
              }}
            >
              <TabBarIcon focused={isFocused} name={route.name} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: Theme.colors.purpleBlue,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
  },
});
