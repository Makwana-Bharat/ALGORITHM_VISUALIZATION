import React, { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';


const LoginModal = ({ visible, onLogin }) => {
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleLogin = async () => {
        const errors = {};
        if (!Email) {
            errors.Email = 'Email is required';
        }
        if (!password) {
            errors.password = 'Password is required';
        }
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            await fetch(
                "https://algorithmvisualization.000webhostapp.com/Project/API/FetchUser.php",
                {
                    method: "post",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        email: Email,
                        password: password,
                    }),
                }
            )
                .then((Response) => Response.json())
                .then((Response) => {
                    onLogin(Response);
                })
                .catch((error) => console.error(error));
        }
    };

    return (
        <Modal animationType="slide" transparent visible={visible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Login</Text>
                    <TextInput
                        style={styles.input}
                        inputMode={'email'}
                        placeholder="Email"
                        value={Email}
                        onChangeText={setEmail}
                    />
                    {errors.Email && (
                        <Text style={styles.errorText}>{errors.Email}</Text>
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    {errors.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#f5f5f5',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        marginVertical: 30,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#333',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginModal;
