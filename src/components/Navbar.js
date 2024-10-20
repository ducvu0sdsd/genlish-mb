import React, { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Logo from './Logo'
import Icon from 'react-native-vector-icons/FontAwesome6';
import { menuContext } from '../contexts/MenuContext';
import { userContext } from '../contexts/UserContext';
import { screenContext } from '../contexts/ScreenContext';

const Navbar = () => {

    const { menuHandler } = useContext(menuContext)
    const { userData } = useContext(userContext)
    const { screenData } = useContext(screenContext)
    const unDisplays = [2, 3, 0]

    return (
        <View style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', justifyContent: 'space-between', width: '100%', height: !unDisplays.includes(screenData.currentScreen) ? 60 : 0, overflow: 'hidden' }}>
            <Logo />
            <View style={{ flexDirection: 'row', alignItems: 'end', gap: 10, marginTop: 15 }}>
                <TouchableOpacity onPress={() => menuHandler.setDisplay(true)}>
                    <Icon name='bars' style={{ fontSize: 30, color: '#566573' }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Navbar