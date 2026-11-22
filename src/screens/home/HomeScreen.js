import React from 'react';

import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';

import { auth } from '../../services/firebase';
import { COLORS } from '../../styles/theme';

export default function HomeScreen({ navigation }) {

  const nomeUsuario =
    auth.currentUser?.displayName?.trim().split(' ')[0] || 'Usuário';

  const fotoPerfil = auth.currentUser?.photoURL
    ? { uri: auth.currentUser.photoURL }
    : require('../../../assets/images/img-fotodeperfil-alternativa.png');


  function navegarPara(tela) {
    const rotas = navigation.getState()?.routeNames || [];

    if (!rotas.includes(tela)) {
      Alert.alert(
        'Em desenvolvimento',
        'Essa funcionalidade ainda está sendo implementada.'
      );
      return;
    }

    // Se já estiver na tela selecionada, não faz nada.
    if (navigation.getState()?.routes[
      navigation.getState().index
    ]?.name === tela) {
      return;
    }

    // Navega para a tela desejada.
    navigation.navigate(tela);
  }

  return (
    <ImageBackground
      source={require('../../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >

      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.conteudo}
        >

          {/* CABEÇALHO */}

          <View style={styles.cabecalho}>

            <View style={styles.areaTexto}>
              <Text style={styles.titulo}>
                Olá, {nomeUsuario}!
              </Text>

              <Text style={styles.subtitulo}>
                Como você está se sentindo hoje?
              </Text>
            </View>

            <TouchableOpacity
              style={styles.botaoPerfil}
              onPress={() => navegarPara('Perfil')}
              activeOpacity={0.8}
            >
              <Image
                source={fotoPerfil}
                style={styles.imagemPerfil}
                resizeMode="cover"
              />
            </TouchableOpacity>

          </View>


          {/* ILUSTRAÇÃO */}

          <View style={styles.areaLogo}>

            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

          </View>


          {/* BOTÃO REGISTRAR HUMOR */}

          <TouchableOpacity
            style={styles.botaoRegistrar}
            activeOpacity={0.8}
            onPress={() => navegarPara('RegistrarHumor')}
          >

            <Text style={styles.mais}>+</Text>

            <Text style={styles.textoBotao}>
              Registrar Humor
            </Text>

          </TouchableOpacity>


          {/* MENSAGEM DE INCENTIVO */}

          <View style={styles.cardMensagem}>

            <Text style={styles.tituloMensagem}>
              Cuide da sua mente!
            </Text>

            <Text style={styles.textoMensagem}>
              Você é capaz de superar qualquer desafio.
            </Text>

          </View>

        </ScrollView>


        {/* NAVEGAÇÃO INFERIOR */}

        <View style={styles.navegacao}>

          <TouchableOpacity
            style={styles.itemNavegacao}
            onPress={() => navegarPara('Home')}
          >
            <Image
              source={require('../../../assets/menu/inicio-ativo.png')}
              style={styles.logosmenuinferior}
            />

            <Text style={styles.textoAtivo}>
              Início
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.itemNavegacao}
            onPress={() => navegarPara('Historico')}
          >
            <Image
              source={require('../../../assets/menu/historico-desativo.png')}
              style={styles.logosmenuinferior}
            />

            <Text style={styles.textoNavegacao}>
              Histórico
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.itemNavegacao}
            onPress={() => navegarPara('Perfil')}
          >
            <Image
              source={require('../../../assets/menu/perfil-desativo.png')}
              style={styles.menuinferiorperfil}
            />

            <Text style={styles.textoNavegacao}>
              Perfil
            </Text>
          </TouchableOpacity>

        </View>

      </View>

    </ImageBackground>
  );
}


const styles = StyleSheet.create({

  background: {
    flex: 1,
    backgroundColor: '#F5E8FF',
  },

  container: {
    flex: 1,
  },

  conteudo: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 55,
    paddingBottom: 25,
    justifyContent: 'center',
  },

// CABEÇALHO

cabecalho: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

areaTexto: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: -400,
},

titulo: {
  fontSize: 35,
  fontWeight: 'bold',
  color: '#32105F',
  marginLeft: 40,
},

subtitulo: {
  fontSize: 19,
  color: '#32105F',
  marginTop: 15,
  marginLeft: 40,
},

botaoPerfil: {
  width: 45,
  height: 45,
  borderRadius: 26,
  overflow: 'hidden',
  marginTop: -440,
},

imagemPerfil: {
  width: '100%',
  height: '100%',
  borderRadius: 26,
},


  // LOGO

  areaLogo: {
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 25,
  },

  logo: {
    marginTop: -170,
    width: 210,
    height: 160,
  },


  // BOTÃO

  botaoRegistrar: {
    backgroundColor: '#6938B0',
    height: 58,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  mais: {
    fontSize: 35,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 12,
    lineHeight: 40,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },


  // CARD

  cardMensagem: {
    backgroundColor: 'rgba(235, 210, 255, 0.90)',
    borderRadius: 25,
    padding: 22,
    alignItems: 'center',
    marginTop: 25,
  },

  tituloMensagem: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#32105F',
    marginBottom: 10,
  },

  textoMensagem: {
    fontSize: 17,
    color: '#32105F',
    textAlign: 'center',
    lineHeight: 22,
  },


  // NAVEGAÇÃO INFERIOR

  navegacao: {
    height: 75,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderTopWidth: 1,
    borderTopColor: '#E8D8F5',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  itemNavegacao: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconeAtivo: {
    fontSize: 29,
    color: '#6938B0',
  },

  icone: {
    fontSize: 27,
    color: '#8D7BA6',
  },

  textoAtivo: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6938B0',
    marginTop: 2,
  },

  textoNavegacao: {
    fontSize: 12,
    color: '#8D7BA6',
    marginTop: 2,
  },

  logosmenuinferior: {
    width: 25,
    height: 25,
  },

  menuinferiorperfil: {
    width: 23,
    height: 23,
  }
});