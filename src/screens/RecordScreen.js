import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, Image, ImageBackground, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { menuContext } from '../contexts/MenuContext';
import { payloadContext } from '../contexts/PayloadContext';
import { userContext } from '../contexts/UserContext';
import { RadioButton } from '../components/stepSignUp/Step3';
import { api, TypeHTTP } from '../utils/api';
import { notifyType, utilsContext } from '../contexts/UtilsContext';

const RecordScreen = () => {
    const { width, height } = Dimensions.get('window');
    const { menuHandler } = useContext(menuContext)
    const { payloadHandler } = useContext(payloadContext)
    const { utilsHandler } = useContext(utilsContext)
    const { userData, userHandler } = useContext(userContext)
    const [user, setUser] = useState()

    useEffect(() => {
        if (userData.user) {
            setUser(userData.user)
        }
    }, [userData.user])

    const handleSelect = (value) => {
        setUser({ ...user, gender: Boolean(value) })
    };

    const handleUpdateUser = () => {
        api({ path: '/user/update', body: user, type: TypeHTTP.POST, sendToken: true }).then(res => {
            utilsHandler.notify(notifyType.SUCCESS, 'Update thành công')
            userHandler.setUser(res)
        })
    }

    return (
        <ScrollView>
            {/* {screenData.currentScreen === 1 && ( */}
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width, height: height - 70, gap: 10, paddingHorizontal: 20, paddingVertical: 10 }}>
                <Image source={{ uri: userData.user?.avatar }} style={{ height: 150, width: 150, borderRadius: 150 }} />
                <TextInput value={user?.phone} onChangeText={e => setUser({ ...user, phone: e })} placeholder='Số Điện Thoại' style={{ paddingHorizontal: 20, width: '80%', height: 50, borderWidth: 1, borderRadius: 10, borderColor: '#d0d3d4' }} />
                <TextInput value={user?.fullName} onChangeText={e => setUser({ ...user, fullName: e })} placeholder='Họ Và Tên' style={{ paddingHorizontal: 20, width: '80%', height: 50, borderWidth: 1, borderRadius: 10, borderColor: '#d0d3d4' }} />
                <TextInput value={user?.address} onChangeText={e => setUser({ ...user, address: e })} placeholder='Địa Chỉ' style={{ paddingHorizontal: 20, width: '80%', height: 50, borderWidth: 1, borderRadius: 10, borderColor: '#d0d3d4' }} />
                <View style={{ flexDirection: 'row', gap: 10, height: 50, justifyContent: 'flex-start', width: '80%' }}>
                    <RadioButton
                        label="Nam"
                        value={true}
                        selected={user?.gender === true}
                        onSelect={handleSelect}
                    />
                    <RadioButton
                        label="Nữ"
                        value={false}
                        selected={user?.gender === false}
                        onSelect={handleSelect}
                    />
                </View>
                <TouchableOpacity onPress={() => handleUpdateUser()} style={{ marginTop: 10, backgroundColor: '#241d49', width: '80%', flexDirection: 'row', justifyContent: 'center', paddingVertical: 12, borderRadius: 12 }}>
                    <Text style={{ color: 'white', fontSize: 17 }}>Cập Nhật Thông Tin</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => menuHandler.setDisplayChangePassword(true)} style={{ backgroundColor: '#5dade2', width: '80%', flexDirection: 'row', justifyContent: 'center', paddingVertical: 12, borderRadius: 12 }}>
                    <Text style={{ color: 'white', fontSize: 17 }}>Đổi Mật Khẩu</Text>
                </TouchableOpacity>
            </View>
            {/* )} */}
        </ScrollView>
    )
}

export default RecordScreen