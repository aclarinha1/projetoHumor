
import React, { useState } from 'react';

import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import {
  addDoc,
  collection,
  serverTimestamp
} from 'firebase/firestore';

import { auth, db } from '../../services/firebase';

export default function RegistrarHumorScreen({ navigation }) {

  const [humor, setHumor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [salvando, setSalvando] = useState(false);

  // Opções de humor com as imagens do projeto
  const opcoesHumor = [
    {
      nome: 'Feliz',
      imagem: require('../../../assets/emojis/feliz.png')
    },
    {
      nome: 'Triste',
      imagem: require('../../../assets/emojis/triste.png')
    },
    {
      nome: 'Ansioso',
      imagem: require('../../../assets/emojis/ansioso.png')
    },
    {
      nome: 'Cansado',
      imagem: require('../../../assets/emojis/cansado.png')
    },
    {
      nome: 'Irritado',
      imagem: require('../../../assets/emojis/irritado.png')
    },
    {
      nome: 'Tranquilo',
      imagem: require('../../../assets/emojis/tranquilo.png')
    },
  ];

  // Função para salvar o registro de humor
  async function salvarHumor() {

    if (!humor) {
      Alert.alert(
        'Atenção',
        'Selecione como você está se sentindo.'
      );
      return;
    }

    if (!auth.currentUser) {
      Alert.alert(
        'Erro',
        'Você precisa estar conectado para salvar.'
      );
      return;
    }

    try {

      setSalvando(true);

      await addDoc(collection(db, 'registrosHumor'), {

        usuarioId: auth.currentUser.uid,
        humor: humor,
        descricao: descricao.trim(),
        data: serverTimestamp(),

      });

      Alert.alert(
        'Sucesso',
        'Seu humor foi registrado!'
      );

      setHumor('');
      setDescricao('');

      navigation.goBack();

    } catch (error) {

      console.log('Erro ao salvar humor:', error);

      Alert.alert(
        'Erro',
        'Não foi possível salvar seu registro.'
      );

    } finally {

      setSalvando(false);

    }
  }

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Como você está se sentindo?
      </Text>

      {/* Opções de humor */}

      <View style={styles.opcoes}>

        {opcoesHumor.map((opcao) => (

          <TouchableOpacity
            key={opcao.nome}

            style={[
              styles.botaoHumor,
              humor === opcao.nome && styles.selecionado
            ]}

            onPress={() => setHumor(opcao.nome)}
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

      {/* Campo de descrição */}

      <Text style={styles.subtitulo}>
        Quer contar um pouco mais?
      </Text>

      <TextInput
        style={styles.campo}
        placeholder="Escreva aqui como foi seu dia..."
        multiline
        value={descricao}
        onChangeText={setDescricao}
        textAlignVertical="top"
      />

      {/* Botão de salvar */}

      <TouchableOpacity
        style={[
          styles.botaoSalvar,
          salvando && styles.botaoDesativado
        ]}
        onPress={salvarHumor}
        disabled={salvando}
      >

        <Text style={styles.textoBotao}>
          {salvando ? 'Salvando...' : 'Salvar humor'}
        </Text>

      </TouchableOpacity>

    </View>

  );
}

// Estilização da tela

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    padding: 24,
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#513B35',
    textAlign: 'center',
    marginBottom: 30,
  },

  opcoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },

  botaoHumor: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 95,
    borderWidth: 1,
    borderColor: '#E5D5CB',
  },

  selecionado: {
    borderColor: '#A66B55',
    borderWidth: 2,
    backgroundColor: '#F5E4D9',
  },

  imagemHumor: {
    width: 55,
    height: 55,
    marginBottom: 5,
  },

  nomeHumor: {
    color: '#513B35',
    fontSize: 13,
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 17,
    fontWeight: '600',
    color: '#513B35',
    marginTop: 35,
    marginBottom: 12,
  },

  campo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    height: 120,
    borderWidth: 1,
    borderColor: '#E5D5CB',
    fontSize: 15,
  },

  botaoSalvar: {
    backgroundColor: '#A66B55',
    padding: 16,
    borderRadius: 12,
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

});
