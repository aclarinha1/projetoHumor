import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

import { auth, db } from '../../services/firebase';

// Imagens correspondentes aos seis sentimentos disponíveis.
const opcoesHumor = [
  {
    nome: 'Feliz',
    imagem: require('../../../assets/emojis/feliz.png'),
  },
  {
    nome: 'Triste',
    imagem: require('../../../assets/emojis/triste.png'),
  },
  {
    nome: 'Irritado',
    imagem: require('../../../assets/emojis/irritado.png'),
  },
  {
    nome: 'Cansado',
    imagem: require('../../../assets/emojis/cansado.png'),
  },
  {
    nome: 'Tranquilo',
    imagem: require('../../../assets/emojis/tranquilo.png'),
  },
  {
    nome: 'Ansioso',
    imagem: require('../../../assets/emojis/ansioso.png'),
  },
];

export default function EditarHumorScreen({ navigation, route }) {
  const registroId = route.params?.registroId;

  const [humor, setHumor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  // Busca o registro selecionado.
  useEffect(() => {
    async function carregarRegistro() {
      const usuario = auth.currentUser;

      if (!usuario) {
        Alert.alert('Atenção', 'Você precisa estar conectado.');
        navigation.goBack();
        return;
      }

      if (!registroId) {
        Alert.alert('Erro', 'Não foi possível identificar o registro.');
        navigation.goBack();
        return;
      }

      try {
        const referencia = doc(
          db,
          'registrosHumor',
          registroId
        );

        const resultado = await getDoc(referencia);

        if (!resultado.exists()) {
          Alert.alert(
            'Registro não encontrado',
            'Este registro pode ter sido excluído.'
          );

          navigation.goBack();
          return;
        }

        const dados = resultado.data();

        if (dados.usuarioId !== usuario.uid) {
          Alert.alert(
            'Acesso não permitido',
            'Você só pode editar seus próprios registros.'
          );

          navigation.goBack();
          return;
        }

        setHumor(dados.humor || '');
        setDescricao(dados.descricao || '');

      } catch (error) {
        console.log('Erro ao carregar registro:', error);

        Alert.alert(
          'Erro',
          'Não foi possível carregar este registro.'
        );

        navigation.goBack();

      } finally {
        setCarregando(false);
      }
    }

    carregarRegistro();

  }, [registroId, navigation]);

  // Salva as alterações do registro.
  async function salvarAlteracoes() {
    if (!humor) {
      Alert.alert(
        'Atenção',
        'Selecione um sentimento.'
      );

      return;
    }

    const usuario = auth.currentUser;

    if (!usuario || !registroId) {
      Alert.alert(
        'Erro',
        'Não foi possível identificar o usuário ou registro.'
      );

      return;
    }

    try {
      setSalvando(true);

      const referencia = doc(
        db,
        'registrosHumor',
        registroId
      );

      const resultado = await getDoc(referencia);

      if (
        !resultado.exists() ||
        resultado.data().usuarioId !== usuario.uid
      ) {
        Alert.alert(
          'Acesso não permitido',
          'Este registro não pertence à sua conta.'
        );

        return;
      }

      await updateDoc(referencia, {
        humor: humor,
        descricao: descricao.trim(),
      });

      Alert.alert(
        'Sucesso',
        'Registro atualizado com sucesso.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );

    } catch (error) {
      console.log('Erro ao atualizar registro:', error);

      Alert.alert(
        'Erro',
        'Não foi possível salvar as alterações.'
      );

    } finally {
      setSalvando(false);
    }
  }

  // Exclui o registro após a confirmação.
  async function confirmarExclusao() {
    const usuario = auth.currentUser;

    if (!usuario || !registroId) {
      Alert.alert(
        'Erro',
        'Não foi possível identificar o usuário ou registro.'
      );

      return;
    }

    try {
      setExcluindo(true);

      const referencia = doc(
        db,
        'registrosHumor',
        registroId
      );

      const resultado = await getDoc(referencia);

      if (
        !resultado.exists() ||
        resultado.data().usuarioId !== usuario.uid
      ) {
        Alert.alert(
          'Acesso não permitido',
          'Este registro não pertence à sua conta.'
        );

        return;
      }

      await deleteDoc(referencia);

      Alert.alert(
        'Registro excluído',
        'O registro foi excluído com sucesso.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );

    } catch (error) {
      console.log('Erro ao excluir registro:', error);

      Alert.alert(
        'Erro',
        'Não foi possível excluir o registro.'
      );

    } finally {
      setExcluindo(false);
    }
  }

  // Solicita confirmação antes de excluir.
  function solicitarExclusao() {
    Alert.alert(
      'Excluir registro',
      'Tem certeza de que deseja excluir este registro? Essa ação não poderá ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: confirmarExclusao,
        },
      ]
    );
  }

  // Tela de carregamento.
  if (carregando) {
    return (
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.estado}>
          <ActivityIndicator
            size="large"
            color="#6938B0"
          />

          <Text style={styles.textoEstado}>
            Carregando registro...
          </Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.setaVoltar}>
            ‹
          </Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>
          Editar registro
        </Text>

        <Text style={styles.subtitulo}>
          Altere seu sentimento ou a descrição do dia
        </Text>

        <Text style={styles.rotulo}>
          Como você estava se sentindo?
        </Text>

        <View style={styles.opcoes}>
          {opcoesHumor.map((opcao) => (
            <TouchableOpacity
              key={opcao.nome}
              style={[
                styles.botaoHumor,
                humor === opcao.nome && styles.humorSelecionado,
              ]}
              onPress={() => setHumor(opcao.nome)}
              activeOpacity={0.8}
            >
              <Image
                source={opcao.imagem}
                style={styles.imagemHumor}
                resizeMode="contain"
              />

              <Text style={styles.nomeHumor}>
                {opcao.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.rotulo}>
          Descrição
        </Text>

        <TextInput
          style={styles.campoDescricao}
          placeholder="Escreva aqui como foi seu dia..."
          placeholderTextColor="#9A86AE"
          multiline
          value={descricao}
          onChangeText={setDescricao}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[
            styles.botaoSalvar,
            (salvando || excluindo) && styles.botaoDesativado,
          ]}
          onPress={salvarAlteracoes}
          disabled={salvando || excluindo}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>
            {salvando ? 'Salvando...' : 'Salvar alterações'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.botaoExcluir,
            (salvando || excluindo) && styles.botaoDesativado,
          ]}
          onPress={solicitarExclusao}
          disabled={salvando || excluindo}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotaoExcluir}>
            {excluindo ? 'Excluindo...' : 'Excluir registro'}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </ImageBackground>
  );
}

// Estilização da tela.
const styles = StyleSheet.create({

  background: {
    flex: 1,
    backgroundColor: '#F5E8FF',
  },

  conteudo: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 55,
    paddingBottom: 35,
  },

  estado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  textoEstado: {
    color: '#6B587D',
    fontSize: 14,
    marginTop: 12,
  },

  botaoVoltar: {
    width: 40,
    height: 42,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  setaVoltar: {
    fontSize: 40,
    lineHeight: 43,
    color: '#6938B0',
    fontWeight: '300',
  },

  titulo: {
    color: '#32105F',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },

  subtitulo: {
    color: '#6B587D',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 9,
    marginBottom: 28,
  },

  rotulo: {
    color: '#32105F',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 12,
  },

  opcoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },

  botaoHumor: {
    width: '30%',
    minHeight: 105,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E8D8F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  humorSelecionado: {
    borderColor: '#6938B0',
    borderWidth: 2,
    backgroundColor: '#F0E5FF',
  },

  imagemHumor: {
    width: 53,
    height: 53,
  },

  nomeHumor: {
    color: '#4B2673',
    fontSize: 12,
    marginTop: 4,
  },

  campoDescricao: {
    minHeight: 130,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E8D8F5',
    padding: 15,
    color: '#4B2673',
    fontSize: 15,
  },

  botaoSalvar: {
    backgroundColor: '#6938B0',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 25,
  },

  botaoDesativado: {
    opacity: 0.6,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  botaoExcluir: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C94A59',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 12,
  },

  textoBotaoExcluir: {
    color: '#B83245',
    fontSize: 16,
    fontWeight: 'bold',
  },

});