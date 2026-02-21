import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import AuthPage from '../pages/AuthPage';
import HomePage from '../pages/HomePage';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {currentUser ? (
          <Stack.Screen name="Home" component={HomePage} />
        ) : (
          <Stack.Screen name="Auth" component={AuthPage} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
