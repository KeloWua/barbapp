import { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import { useRouter } from 'expo-router'
import { supabase } from '../../lib/supabase'
import i18n from '../../lib/i18n'

export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert(i18n.t('auth.login.error'), i18n.t('auth.login.fillFields'))
            return
        }

        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        setLoading(false)

        if (error) Alert.alert(i18n.t('auth.login.error'), error.message)
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.inner}>
                <Text style={styles.title}>{i18n.t('auth.login.title')}</Text>
                <Text style={styles.subtitle}>{i18n.t('auth.login.subtitle')}</Text>

                <TextInput
                    style={styles.input}
                    placeholder={i18n.t('auth.login.email')}
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder={i18n.t('auth.login.password')}
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? i18n.t('auth.login.loading') : i18n.t('auth.login.button')}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                    <Text style={styles.link}>{i18n.t('auth.login.noAccount')}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#999',
        marginBottom: 40,
    },
    input: {
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 16,
        color: '#fff',
        fontSize: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#2a2a2a',
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 24,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#0a0a0a',
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        color: '#999',
        textAlign: 'center',
        fontSize: 14,
    },
})