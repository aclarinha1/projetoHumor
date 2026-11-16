
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
} from 'react-native';
import { COLORS } from '../../styles/theme';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

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
            onPress={() => {}}
          >
            <Text style={styles.textoBotao}>ENTRAR</Text>
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
