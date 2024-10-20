import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, ImageBackground, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { menuContext } from '../contexts/MenuContext';
import { payloadContext } from '../contexts/PayloadContext';
import { userContext } from '../contexts/UserContext';

const LearnScreen = () => {
    const { width, height } = Dimensions.get('window');
    const { menuHandler } = useContext(menuContext)
    const { payloadHandler } = useContext(payloadContext)
    const { userData } = useContext(userContext)

    return (
        <ScrollView>
            {/* {screenData.currentScreen === 1 && ( */}
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width, height: height - 70, gap: 10, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'red' }}>
                <Text>dshfushfushudsfh</Text>
            </View>
            {/* )} */}
        </ScrollView>
    )
}

export default LearnScreen