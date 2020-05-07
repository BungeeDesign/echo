import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { width } from '../../../constants/Layout';
import TabBarIcon from '../../../components/TabBarIcon';
import TestButton from '../../../components/TestButton';
import Theme from '../../../constants/Theme';

export const TabBar = ({ state, descriptors, navigation }) => {
  console.log(state, descriptors, navigation);
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
          console.log(options, route.name);
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

          if (route.name !== 'font') {
            return (
              <TouchableOpacity
                key={index}
                stlye={{
                  flex: 1,
                }}
              >
                <TabBarIcon focused={isFocused} name={route.name} />
              </TouchableOpacity>
            );
          } else {
            return <TestButton key={index} />;
          }
          // return (
          // <TouchableOpacity
          //   accessibilityRole="button"
          //   accessibilityStates={isFocused ? ['selected'] : []}
          //   accessibilityLabel={options.tabBarAccessibilityLabel}
          //   testID={options.tabBarTestID}
          //   onPress={onPress}
          //   onLongPress={onLongPress}
          //   style={{ flex: 1 }}
          //   key={index}
          // >
          //   {label.toString === 'echo' && <TestButton />}

          // </TouchableOpacity>
          // );
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
