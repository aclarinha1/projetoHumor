
import React, { useState, useCallback } from 'react';

import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useFocusEffect } from '@react-navigation/native';

import {COLORS} from '../../styles/theme.js';
import {
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

import { auth, db } from '../../services/firebase';

// Imagens correspondentes aos seis sentimentos
const imagensHumor = {
  Feliz: require('../../../assets/emojis/feliz.png'),
  Triste: require('../../../assets/emojis/triste.png'),
  Irritado: require('../../../assets/emojis/irritado.png'),
  Cansado: require('../../../assets/emojis/cansado.png'),
  Tranquilo: require('../../../assets/emojis/tranquilo.png'),
  Ansioso: require('../../../assets/emojis/ansioso.png'),
};

export default function HistoryScreen({ navigation }) {

  const [registros, setRegistros] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Converte a data do Firestore para uma data legível
  function formatarData(data) {

    if (!data) {
      return 'Data indisponível';
    }

    const dataConvertida = data.toDate
      ? data.toDate()
      : new Date(data);

    if (isNaN(dataConvertida.getTime())) {
      return 'Data indisponível';
    }

    return dataConvertida.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  // Consulta os registros do usuário autenticado
  async function carregarRegistros() {

    const usuario = auth.currentUser;

    if (!usuario) {
      setRegistros([]);
      setCarregando(false);
      return;
    }

    try {

      setCarregando(true);

      const consulta = query(
        collection(db, 'registrosHumor'),
        where('usuarioId', '==', usuario.uid)
      );

      const resultado = await getDocs(consulta);

      const lista = resultado.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
      }));

      // Organiza do registro mais recente para o mais antigo
      lista.sort((a, b) => {
        const dataA = a.data?.toDate
          ? a.data.toDate().getTime()
          : 0;

        const dataB = b.data?.toDate
          ? b.data.toDate().getTime()
          : 0;

        return dataB - dataA;
      });

      setRegistros(lista);

    } catch (error) {

      console.log('Erro ao carregar histórico:', error);

      Alert.alert(
        'Erro',
        'Não foi possível carregar seu histórico.'
      );

    } finally {

      setCarregando(false);

    }
  }

  // Atualiza o histórico sempre que a tela recebe foco
  useFocusEffect(
    useCallback(() => {

      carregarRegistros();

    }, [])
  );

  // Navegação do menu inferior
  function navegarPara(tela) {

    if (tela === 'Historico') {
      return;
    }

    navigation.navigate(tela);
  }

  return (

    <ImageBackground
      source={require('../../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >

      <View style={styles.container}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.conteudo}
        >

          {/* CABEÇALHO SUPERIOR */}

          <View style={styles.cabecalhoTopo}>

            {/* SETA PARA VOLTAR À HOME */}

            <TouchableOpacity
              style={styles.botaoVoltar}
              onPress={() => navigation.navigate('Home')}
              activeOpacity={0.7}
            >
              <Text style={styles.setaVoltar}>
                ‹
              </Text>
            </TouchableOpacity>

            {/* TÍTULO CENTRALIZADO */}

            <Text style={styles.titulo}>
              Meu Histórico
            </Text>

            {/* CALENDÁRIO ROXO */}

            <View style={styles.iconeCalendario}>

              <View style={styles.calendarioArgolas}>
                <View style={styles.argola} />
                <View style={styles.argola} />
              </View>

              <View style={styles.calendarioLinha} />

              <View style={styles.calendarioPontos}>
                <View style={styles.pontoCalendario} />
                <View style={styles.pontoCalendario} />
                <View style={styles.pontoCalendario} />
                <View style={styles.pontoCalendario} />
                <View style={styles.pontoCalendario} />
                <View style={styles.pontoCalendario} />
              </View>

            </View>

          </View>

          <Text style={styles.subtitulo}>
            Confira seus registros de humor
          </Text>


          {/* CARREGAMENTO */}

          {carregando ? (

            <View style={styles.estado}>

              <ActivityIndicator
                size="large"
                color="#6938B0"
              />

              <Text style={styles.textoEstado}>
                Carregando seus registros...
              </Text>

            </View>

          ) : registros.length === 0 ? (

            /* HISTÓRICO VAZIO */

            <View style={styles.estado}>

              <Text style={styles.emojiVazio}>
                📔
              </Text>

              <Text style={styles.textoVazio}>
                Você ainda não possui registros.
              </Text>

              <Text style={styles.textoEstado}>
                Registre seu humor para começar seu histórico!
              </Text>

              <TouchableOpacity
                style={styles.botaoRegistrar}
                onPress={() => navegarPara('RegistrarHumor')}
              >

                <Text style={styles.textoBotao}>
                  Registrar humor
                </Text>

              </TouchableOpacity>

            </View>

          ) : (

            /* LISTA DE REGISTROS */
            
            <View style={styles.lista}>

              {registros.map((registro) => (

                <View
                  key={registro.id}
                  style={styles.card}
                >

                  <View style={styles.cabecalhoCard}>

                    <Image
                      source={
                        imagensHumor[registro.humor]
                        || imagensHumor.Tranquilo
                      }
                      style={styles.imagemHumor}
                      resizeMode="contain"
                    />

                    <View style={styles.informacoes}>

                      <Text style={styles.nomeHumor}>
                        {registro.humor}
                      </Text>

                      <Text style={styles.data}>
                        {formatarData(registro.data)}
                      </Text>

                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('EditarHumor', {
                          registroId: registro.id,
                        })}
                        activeOpacity={0.8}
                      >
                        <Text><MaterialIcons name="edit" size={24} color={COLORS.primary} /></Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                
                

                </View>

              ))}

            </View>

          )}

        </ScrollView>


        {/* MENU INFERIOR */}

        <View style={styles.navegacao}>

          <TouchableOpacity
            style={styles.itemNavegacao}
            onPress={() => navegarPara('Home')}
          >

            <Image
              source={require('../../../assets/menu/inicio-desativo.png')}
              style={styles.iconeMenu}
            />

            <Text style={styles.textoNavegacao}>
              Início
            </Text>

          </TouchableOpacity>


          <TouchableOpacity
            style={styles.itemNavegacao}
          >

            <Image
              source={require('../../../assets/menu/historico-ativo.png')}
              style={styles.iconeMenu}
            />

            <Text style={styles.textoAtivo}>
              Histórico
            </Text>

          </TouchableOpacity>


          <TouchableOpacity
            style={styles.itemNavegacao}
            onPress={() => navegarPara('Perfil')}
          >

            <Image
              source={require('../../../assets/menu/perfil-desativo.png')}
              style={styles.iconeMenu}
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


// ESTILIZAÇÃO DA TELA

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
    paddingHorizontal: 22,
    paddingTop: 65,
    paddingBottom: 25,
  },

  // CABEÇALHO SUPERIOR

  cabecalhoTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 45,
    marginBottom: 10,
  },

  // SETA DE VOLTAR

  botaoVoltar: {
    width: 35,
    height: 45,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  setaVoltar: {
    fontSize: 40,
    color: '#6938B0',
    lineHeight: 45,
    fontWeight: '300',
  },

  // TÍTULO

  titulo: {
    flex: 1,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#32105F',
    textAlign: 'center',
  },

  // ÍCONE DE CALENDÁRIO

  iconeCalendario: {
    width: 27,
    height: 27,
    borderWidth: 2,
    borderColor: '#6938B0',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  calendarioArgolas: {
    position: 'absolute',
    top: -5,
    width: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  argola: {
    width: 3,
    height: 7,
    borderRadius: 2,
    backgroundColor: '#6938B0',
  },

  calendarioLinha: {
    width: '100%',
    height: 2,
    backgroundColor: '#6938B0',
    position: 'absolute',
    top: 7,
  },

  calendarioPontos: {
    width: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  pontoCalendario: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#6938B0',
    margin: 1,
  },

  // SUBTÍTULO

  subtitulo: {
    fontSize: 16,
    color: '#6B587D',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 25,
  },

  // ESTADOS

  estado: {
    flex: 1,
    minHeight: 350,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  emojiVazio: {
    fontSize: 55,
    marginBottom: 15,
  },

  textoVazio: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#32105F',
    textAlign: 'center',
  },

  textoEstado: {
    fontSize: 14,
    color: '#6B587D',
    textAlign: 'center',
    marginTop: 12,
  },

  // BOTÃO REGISTRAR

  botaoRegistrar: {
    backgroundColor: '#6938B0',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginTop: 25,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

  // LISTA DE REGISTROS

  lista: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
  },

  cabecalhoCard: {
    backgroundColor: "#ffffff",
    flexDirection: 'row',
    alignItems: 'center',
  },

  imagemHumor: {
    width: 60,
    height: 60,
  },

  informacoes: {
    marginLeft: 15,
    flex: 1,
  },

  nomeHumor: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#32105F',
  },

  data: {
    fontSize: 13,
    color: '#8D7BA6',
    marginTop: 5,
  },


  // MENU INFERIOR

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

  iconeMenu: {
    width: 25,
    height: 25,
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

});

