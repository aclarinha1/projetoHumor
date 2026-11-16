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
  Alert,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import { COLORS } from '../../styles/theme';
import { cadastrarUsuario } from '../../services/auth';


export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleCadastro() {
    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim();

    if (!nomeLimpo || !emailLimpo || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo)) {
      Alert.alert('Atenção', 'Digite um e-mail válido.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setCarregando(true);

    try {
      await cadastrarUsuario(nomeLimpo, emailLimpo, senha);

      Alert.alert(
        'Cadastro realizado!',
        'Sua conta foi criada com sucesso.'
      );
    } catch (error) {
      console.log('ERRO FIREBASE:', error.code, error.message);
      
      let mensagem = 'Não foi possível realizar o cadastro. Tente novamente.';

      if (error.code === 'auth/email-already-in-use') {
        mensagem = 'Este e-mail já está cadastrado.';
      } else if (error.code === 'auth/invalid-email') {
        mensagem = 'O e-mail informado é inválido.';
      } else if (error.code === 'auth/weak-password') {
        mensagem = 'Escolha uma senha mais forte.';
      } else if (error.code === 'auth/network-request-failed') {
        mensagem = 'Verifique sua conexão com a internet.';
      }

      Alert.alert('Erro no cadastro', mensagem);
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
        
          <Text style={styles.titulo}>Cadastro</Text>      
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.texto}>Crie sua conta e cuide do seu humor</Text>     
          

          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor={COLORS.placeholder}
            autoCapitalize="words"
            autoComplete="name"
            value={nome}
            onChangeText={setNome}
          />

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
            onPress={handleCadastro}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.textoBotao}>CADASTRAR</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.textoLogin}>
              Já possui uma conta?{' '}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.linkLogin}>
                Entrar
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
    width: 120,
    height: 120,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.primary,
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
    backgroundColor: COLORS.primary,
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
  loginContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 25,
  },
  textoLogin: {
    color: COLORS.text,
    fontSize: 15,
  },
  linkLogin: {
    color: COLORS.link,
    fontSize: 15,
    fontWeight: 'bold',
  },
  texto: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '500',
    paddingBottom: 30,
  },
});
