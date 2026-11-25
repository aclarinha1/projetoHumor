import React from 'react';

import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import { auth } from '../../services/firebase';
import { COLORS } from '../../styles/theme';

export default function ProfileScreen({ navigation }) {

  const usuario = auth.currentUser;

  const nomeUsuario =
    usuario?.displayName || 'Usuário';

  const emailUsuario =
    usuario?.email || 'E-mail não disponível';

  const fotoPerfil = usuario?.photoURL
    ? { uri: usuario.photoURL }
    : require('../../../assets/images/img-fotodeperfil-alternativa.png');

  return (
    <ImageBackground
      source={require('../../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >

      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.cabecalho}>

          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.8}
          >
            <Text style={styles.setaVoltar}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.titulo}>
            Meu Perfil
          </Text>

          <View style={styles.espacoVazio} />

        </View>

        <View style={styles.areaPerfil}>

          <View style={styles.bordaFoto}>

            <Image
              source={fotoPerfil}
              style={styles.fotoPerfil}
              resizeMode="cover"
            />

          </View>

          <Text style={styles.nomeUsuario}>
            {nomeUsuario}
          </Text>

          <Text style={styles.subtitulo}>
            Bem-vindo(a) ao seu perfil!
          </Text>

        </View>

        <View style={styles.cardInformacoes}>

          <Text style={styles.tituloCard}>
            Informações da conta
          </Text>

          <View style={styles.linhaInformacao}>

            <Text style={styles.rotulo}>
              Nome
            </Text>

            <Text style={styles.valor}>
              {nomeUsuario}
            </Text>

          </View>

          <View style={styles.divisor} />

          <View style={styles.linhaInformacao}>

            <Text style={styles.rotulo}>
              E-mail
            </Text>

            <Text style={styles.valor}>
              {emailUsuario}
            </Text>

          </View>

        </View>

        <TouchableOpacity
          style={styles.botaoInicio}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.8}
        >

          <Text style={styles.textoBotao}>
            Voltar para Início
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </ImageBackground>
  );
}


const styles = StyleSheet.create({

  background: {
    flex: 1,
    backgroundColor: '#F5E8FF',
  },

  conteudo: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 55,
    paddingBottom: 35,
  },


  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  botaoVoltar: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },

  setaVoltar: {
    fontSize: 42,
    color: '#6938B0',
    lineHeight: 45,
  },

  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#32105F',
  },

  espacoVazio: {
    width: 40,
  },

  // FOTO E IDENTIFICAÇÃO

  areaPerfil: {
    alignItems: 'center',
    marginTop: 45,
  },

  bordaFoto: {
    width: 135,
    height: 135,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#6938B0',
    padding: 4,
    backgroundColor: '#FFFFFF',
  },

  fotoPerfil: {
    width: '100%',
    height: '100%',
    borderRadius: 65,
  },

  nomeUsuario: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#32105F',
    marginTop: 20,
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 15,
    color: '#6B587D',
    marginTop: 8,
  },

  // INFORMAÇÕES

  cardInformacoes: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 22,
    padding: 22,
    marginTop: 45,
    elevation: 3,
  },

  tituloCard: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#32105F',
    marginBottom: 22,
  },

  linhaInformacao: {
    marginVertical: 8,
  },

  rotulo: {
    fontSize: 14,
    color: '#8D7BA6',
    marginBottom: 7,
  },

  valor: {
    fontSize: 16,
    color: '#32105F',
    fontWeight: '600',
  },

  divisor: {
    height: 1,
    backgroundColor: '#E8D8F5',
    marginVertical: 12,
  },

  // BOTÃO

  botaoInicio: {
    backgroundColor: COLORS.primary,
    height: 55,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    elevation: 3,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});