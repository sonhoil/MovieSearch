import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './Screens/Search'
import Tv from './Screens/TV'
import Movie from './Screens/Movie'
import Loading from './Screens/Loading'
import Detail from './Screens/Detail'
import TvDetail from './Screens/TvDetail'
import {MaterialIcons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function NavStack() {
  return (
     <Stack.Navigator 
     screenOptions={{
      headerShown: false
    }}>
        <Stack.Screen
      name="Tab" 
      component={NavTab} 
      />
        <Stack.Screen 
        name="Movie" 
        component={Movie} 
        options={{ title: 'Movies' }}
      />
      <Stack.Screen 
        name="Detail" 
        component={Detail} 
        options={{ title: 'Detail',headerShown: true,headerTintColor: 'white', 
        headerStyle:{backgroundColor:'black'}, headerTitleStyle:{color:'white'} }}
        
      />
       <Stack.Screen 
        name="TvDetail" 
        component={TvDetail} 
        options={{ title: 'TvDetail',headerShown: true,headerTintColor: 'white', 
        headerStyle:{backgroundColor:'black'}, headerTitleStyle:{color:'white'}}}
        
      />
     
    </Stack.Navigator>
  );
}
function NavTab() {
  return(
    <Tab.Navigator  backBehavior='history'
    tabBarOptions={{
     labelStyle: { fontSize: 12 },
     style: { backgroundColor: 'black' },
   }}
     >
       <Tab.Screen name="Movie" component={Movie}  
       options={{   
         tabBarIcon: ({ color }) => (
         <MaterialIcons name="local-movies" color={color} size={26} />
         ),
       }}/>
       <Tab.Screen name="TV" component={Tv} 
       options={{
              tabBarIcon: ({ color }) => (
             <MaterialIcons name="tv" color={color} size={26} />
              ),
            }}/>
       <Tab.Screen name="Search" component={Search}  
       options={{
              tabBarIcon: ({ color }) => (
             <MaterialIcons name="search" color={color} size={26} />
              ),
            }}/>
     </Tab.Navigator>

  )
}
export default class extends React.Component {
  state = {
    isLoading: true
  }

componentWillMount() {
  setTimeout(() => {
    this.setState({isLoading: false});
  }, 2000);
}

  render() {
    const {isLoading} = this.state;
    const MyTheme = {
    
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: 'white'
      },
    };
    
  return (isLoading ? (<Loading/>) :
    
    <NavigationContainer theme={MyTheme}>
  
      <View style={{height:2, backgroundColor:'black'}}></View>
     
     <NavStack></NavStack>
    
    </NavigationContainer>
    
  
  );
}}