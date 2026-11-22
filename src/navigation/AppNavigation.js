import React, { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../services/firebase';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/home/HomeScreen';

const Stack = createNativeStackNavigator();


// TELA PROVISÓRIA PARA AS FUNCIONALIDADES
// QUE AINDA ESTÃO SENDO DESENVOLVIDAS

function TelaEmDesenvolvimento({ navigation, route }) {
  const nomes = {
    RegistrarHumor: 'Cadastro de Humor',
    Historico: 'Histórico de Humor',
    Perfil: 'Meu Perfil',
  };

  return (
    <View style={styles.placeholder}>
      <Text style={styles.titulo}>
        {nomes[route.name]}
      </Text>

      <Text style={styles.mensagem}>
        Esta tela está sendo desenvolvida
        pelo integrante responsável.
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBotao}>
          Voltar para Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}


export default function AppNavigation() {

  const [usuario, setUsuario] = useState(null);

  const [verificandoSessao, setVerificandoSessao] =
    useState(true);


  useEffect(() => {

    const cancelarObservacao = onAuthStateChanged(
      auth,
      (usuarioFirebase) => {
        setUsuario(usuarioFirebase);
        setVerificandoSessao(false);
      }
    );

    return cancelarObservacao;

  }, []);


  if (verificandoSessao) {
    return (
      <View style={styles.carregamento}>
        <ActivityIndicator
          size="large"
          color="#6938B0"
        />
      </View>
    );
  }


  return (
    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >

        {usuario ? (
          <>

            {/* TELA INICIAL */}

            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />


            {/* CADASTRO DE HUMOR */}

            <Stack.Screen
              name="RegistrarHumor"
              component={TelaEmDesenvolvimento}
            />


            {/* HISTÓRICO */}

            <Stack.Screen
              name="Historico"
              component={TelaEmDesenvolvimento}
            />


            {/* PERFIL */}

            <Stack.Screen
              name="Perfil"
              component={TelaEmDesenvolvimento}
            />

          </>
        ) : (
          <>

            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />

            <Stack.Screen
              name="Cadastro"
              component={RegisterScreen}
            />

          </>
        )}

      </Stack.Navigator>

    </NavigationContainer>
  );
}


const styles = StyleSheet.create({

  carregamento: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholder: {
    flex: 1,
    backgroundColor: '#F5E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#32105F',
    textAlign: 'center',
  },

  mensagem: {
    fontSize: 16,
    color: '#6B587D',
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 24,
  },

  botao: {
    backgroundColor: '#6938B0',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginTop: 30,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});