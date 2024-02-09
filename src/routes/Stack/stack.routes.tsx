import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../../screens/Login';
import Register from './../../screens/Resgister/index';
import Home from '../../screens/Home';



const StackNav = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <StackNav.Navigator screenOptions={{ headerShown: false }}>
            <StackNav.Screen name='Login' component={Login} />
            <StackNav.Screen name='Register' component={Register} />
            <StackNav.Screen name='Home' component={Home} />
        </StackNav.Navigator>
    )
}