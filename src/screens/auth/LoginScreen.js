
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../../styles/theme';
import { entrarUsuario } from '../../services/auth';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);


  async function handleLogin() {
    const emailLimpo = email.trim();

    if (!emailLimpo || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo)) {
      Alert.alert('Atenção', 'Digite um e-mail válido.');
      return;
    }

    setCarregando(true);

    try {
      await entrarUsuario(emailLimpo, senha);

    } catch (error) {
      console.log('ERRO LOGIN:', error.code, error.message);

      let mensagem = 'Não foi possível entrar. Tente novamente.';

      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found'
      ) {
        mensagem = 'E-mail ou senha incorretos.';
      } else if (error.code === 'auth/network-request-failed') {
        mensagem = 'Verifique sua conexão com a internet.';
      } else if (error.code === 'auth/too-many-requests') {
        mensagem = 'Muitas tentativas. Aguarde um pouco e tente novamente.';
      }

      Alert.alert('Erro no login', mensagem);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ImageBackground
      source={require('../../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.nomeApp}>Moodie</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={COLORS.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor={COLORS.placeholder}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
          
          <TouchableOpacity
            style={styles.botao}
            onPress={handleLogin}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.textoBotao}>ENTRAR</Text>
            )}
          </TouchableOpacity>

          <View style={styles.cadastroContainer}>
            <Text style={styles.textoCadastro}>
              Não possui uma conta?{' '}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Cadastro')}
            >
              <Text style={styles.linkCadastro}>
                Cadastre-se
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  logo: {
    width: 180,
    height: 180,
  },
  nomeApp: {
    fontSize: 34,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 30,
    },

  input: {
    width: '100%',
    height: 54,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 18,
  },
  botao: {
    width: '100%',
    height: 54,
    backgroundColor:  COLORS.primary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  textoBotao: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cadastroContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 25,
  },
  textoCadastro: {
    color: COLORS.text,
    fontSize: 15,
  },
  linkCadastro: {
    color: COLORS.link,
    fontSize: 15,
    fontWeight: 'bold',

  },
});
