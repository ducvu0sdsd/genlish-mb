import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LogoImage from '../../../assets/logo.png'
import { api, TypeHTTP } from '../../utils/api'
import { userContext } from '../../contexts/UserContext';
import { notifyType, utilsContext } from '../../contexts/UtilsContext';
import { payloadContext } from '../../contexts/PayloadContext';

const Step1 = () => {
    const { width } = Dimensions.get('window');
    const { userHandler } = useContext(userContext)
    const { utilsHandler } = useContext(utilsContext)
    const { payloadHandler, payloadData } = useContext(payloadContext)
    const [info, setInfo] = useState({
        phone: '',
        password: '',
        confirmPassword: ''

    })

    const handleCompleteStep1 = () => {
        if (info.phone === '') {
            return
        }
        if (info.password === '') {
            return
        }
        if (info.confirmPassword !== info.password) {
            return
        }
        api({ sendToken: false, type: TypeHTTP.POST, path: '/auth/sign-up-step-1', body: { phone: info.phone, password: info.password } })
            .then(user => {
                userHandler.setUser(user)
                payloadHandler.setCurrentStepSignUp(1)
            })
            .catch(error => {
                utilsHandler.notify(notifyType.FAIL, error.message)
            })
    }

    return (
        <View style={{ width, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Image source={LogoImage} style={{ width: 50, height: 80 }} />
            <Text style={{ fontSize: 18, fontWeight: 600, paddingHorizontal: 30, textAlign: 'center' }}>Bạn hãy cung cấp thông tin đăng nhập</Text>
            <TextInput value={info.phone} onChangeText={e => setInfo({ ...info, phone: e })} placeholder='Số Điện Thoại' style={{ paddingHorizontal: 20, width: '80%', marginTop: 20, height: 50, borderWidth: 1, borderRadius: 10, borderColor: '#d0d3d4' }} />
            <TextInput value={info.password} onChangeText={e => setInfo({ ...info, password: e })} secureTextEntry={true} placeholder='Mật Khẩu' style={{ paddingHorizontal: 20, width: '80%', height: 50, marginTop: 10, borderWidth: 1, borderRadius: 10, borderColor: '#d0d3d4' }} />
            <TextInput value={info.confirmPassword} onChangeText={e => setInfo({ ...info, confirmPassword: e })} secureTextEntry={true} placeholder='Xác Nhận Mật Khẩu' style={{ paddingHorizontal: 20, width: '80%', height: 50, marginTop: 10, borderWidth: 1, borderRadius: 10, borderColor: '#d0d3d4' }} />
            <TouchableOpacity onPress={() => handleCompleteStep1()} style={{ backgroundColor: '#149dff', marginTop: 10, width: '80%', flexDirection: 'row', justifyContent: 'center', paddingVertical: 12, borderRadius: 12 }}>
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 600 }}>Bước Tiếp Theo</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Step1