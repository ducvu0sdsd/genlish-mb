import React, { useContext, useEffect, useState } from 'react'
import { Animated, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { menuContext } from '../../contexts/MenuContext';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { notifyType, utilsContext } from '../../contexts/UtilsContext';
import { userContext } from '../../contexts/UserContext';
import { api, TypeHTTP } from '../../utils/api';

const FormChangePassword = () => {
    const { menuData, menuHandler } = useContext(menuContext);
    const { width } = Dimensions.get('window');
    const [translateX] = useState(new Animated.Value(menuData.displayChangePassword === true ? 0 : width));
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const { utilsHandler } = useContext(utilsContext)
    const { userHandler, userData } = useContext(userContext)

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: menuData.displayChangePassword === true ? 0 : width,
            duration: 300, // Thời gian animation (ms)
            useNativeDriver: true, // Sử dụng Native Driver cho hiệu suất tốt hơn
        }).start();
    }, [menuData.displayChangePassword]);

    const handleChange = () => {
        if (oldPassword.length < 6 || newPassword.length < 6) {
            utilsHandler.notify(notifyType.WARNING, 'Mật khẩu phải trên 6 ký tự')
            return
        }
        if (newPassword !== confirmNewPassword) {
            utilsHandler.notify(notifyType.WARNING, 'Mật khẩu mới phải trùng với mật khẩu xác nhận')
            return
        }
        api({ path: '/user/updatePassword', body: { id: userData.user?._id, oldPassword: oldPassword, newPassword: newPassword }, sendToken: true, type: TypeHTTP.POST })
            .then(res => {
                setOldPassword('')
                setNewPassword('')
                setConfirmNewPassword('')
                utilsHandler.notify(notifyType.SUCCESS, 'Cập nhật mật khẩu thành công')
                userHandler.setUser(res.user)
                menuHandler.setDisplayChangePassword(false)
            }).catch(e => {
                utilsHandler.notify(notifyType.FAIL, e.message.data)
            })
    }


    return (
        <Animated.View
            style={{
                transform: [{ translateX }],
                position: 'absolute',
                height: '100%',
                width: '100%', // Sử dụng chiều rộng của màn hình
                backgroundColor: 'white',
                zIndex: 3,
                top: 0,
                flexDirection: 'column',
                // alignItems: 'center',
                gap: 20,
                right: 0,
            }}
        >
            <View style={{ position: 'absolute', right: 15, top: 30 }}>
                <TouchableOpacity onPress={() => menuHandler.setDisplayChangePassword(false)}>
                    <Icon name="x" style={{ fontSize: 30 }} />
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                <TextInput secureTextEntry value={oldPassword} onChangeText={e => setOldPassword(e)} placeholder='Mật khẩu hiện tại' style={{ paddingHorizontal: 20, width: '80%', height: 50, borderWidth: 1, borderRadius: 10, borderColor: '#d0d3d4' }} />
                <TextInput secureTextEntry value={newPassword} onChangeText={e => setNewPassword(e)} placeholder='Mật khẩu mới' style={{ paddingHorizontal: 20, width: '80%', height: 50, borderWidth: 1, borderRadius: 10, borderColor: '#d0d3d4' }} />
                <TextInput secureTextEntry value={confirmNewPassword} onChangeText={e => setConfirmNewPassword(e)} placeholder='Xác nhận mật khẩu mới' style={{ paddingHorizontal: 20, width: '80%', height: 50, borderWidth: 1, borderRadius: 10, borderColor: '#d0d3d4' }} />
                <TouchableOpacity onPress={() => handleChange()} style={{ backgroundColor: '#5dade2', width: '80%', flexDirection: 'row', justifyContent: 'center', paddingVertical: 12, borderRadius: 12 }}>
                    <Text style={{ color: 'white', fontSize: 17 }}>Đổi Mật Khẩu</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

export default FormChangePassword