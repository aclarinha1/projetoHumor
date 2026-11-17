
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { sairUsuario } from '../../services/auth';
import { COLORS } from '../../styles/theme';

export default function HomeScreen() {
  async function handleLogout() {
    try {
      await sairUsuario();
    } catch (error) {
      console.log('ERRO LOGOUT:', error.code, error.message);

      Alert.alert(
        'Erro ao sair',
        'Não foi possível encerrar sua sessão. Tente novamente.'
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Home</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={handleLogout}
      >
        <Text style={styles.textoBotao}>SAIR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 30,
  },
  botao: {
    width: '100%',
    height: 54,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotao: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
