import React from 'react';

import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const conteudo = {
  Feliz: {
    emoji: require('../../../assets/emojis/feliz.png'),
    principal: 'Sua felicidade merece ser aproveitada!',
    balao: 'Não tenha pressa! Aproveite cada detalhe das coisas boas que acontecem!',
    dica: 'Você sabia que nossas emoções também são influenciadas pelas relações sociais? Que tal conversar com alguém querido ou compartilhar uma conquista?',
  },

  Triste: {
    emoji: require('../../../assets/emojis/triste.png'),
    principal: 'Tudo bem ter dias difíceis. Seus sentimentos merecem atenção!',
    balao: 'Respeite seu tempo e lembre-se de que você não precisa enfrentar tudo sozinho!',
    dica: 'Ouvir uma música, desenhar, fazer uma atividade agradável ou conversar com alguém de confiança pode proporcionar momentos de conforto. Escolha algo de que você goste e vá no seu ritmo!',
  },

  Irritado: {
    emoji: require('../../../assets/emojis/irritado.png'),
    principal: 'Você pode sentir raiva sem deixar que ela controle suas atitudes!',
    balao: 'Dê um tempo para seus pensamentos se organizarem antes de responder!',
    dica: 'Você sabia que, em situações de estresse, o organismo pode liberar adrenalina e cortisol? Experimente respirar lentamente, afastar-se por alguns minutos da situação e depois pensar no que fazer!',
  },

  Ansioso: {
    emoji: require('../../../assets/emojis/ansioso.png'),
    principal: 'Você não precisa dar conta de tudo ao mesmo tempo!',
    balao: 'Traga sua atenção para o presente e respeite seu próprio ritmo!',
    dica: 'Organizar tarefas em partes menores pode torná-las mais fáceis de administrar. Escolha uma pequena atividade e concentre-se nela!',
  },

  Tranquilo: {
    emoji: require('../../../assets/emojis/tranquilo.png'),
    principal: 'Sua tranquilidade também merece ser valorizada!',
    balao: 'Valorize essa sensação e continue cultivando hábitos que fazem bem!',
    dica: 'Você sabia que o sistema nervoso parassimpático participa dos processos de recuperação e descanso do organismo? Aproveite o momento para relaxar e fazer algo de que gosta!',
  },

  Cansado: {
    emoji: require('../../../assets/emojis/cansado.png'),
    principal: 'Parece que você precisa de um tempinho para recarregar as energias!',
    balao: 'Respeite seus limites. Descansar também faz parte de ser produtivo!',
    dica: 'Durante o sono, o cérebro realiza processos importantes para a memória e a aprendizagem. Faça uma pausa e tente ter uma boa noite de descanso!',
  },
};

export default function MensagemScreen({ navigation, route }) {
  const humor = route.params?.humor;
  const mensagem = conteudo[humor];

  if (!mensagem) {
    return (
      <View style={styles.container}>
        <Text style={styles.principal}>
          Não foi possível identificar seu humor.
        </Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.textoBotao}>
            VOLTAR PARA A HOME
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../../assets/images/background.png')}
      style={styles.fundo}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={mensagem.emoji}
          style={styles.emoji}
          resizeMode="contain"
        />

        <Text style={styles.principal}>
          {mensagem.principal}
        </Text>

        <View style={styles.balao}>
          <Text style={styles.textoBalao}>
            {mensagem.balao}
          </Text>
        </View>

        <View style={styles.divisor}>
          <View style={styles.linha} />
          <Text style={styles.coracao}>♡</Text>
          <View style={styles.linha} />
        </View>

        <View style={styles.caixaDica}>
          <Text style={styles.textoDica}>
            <Text style={styles.destaqueDica}>Dica: </Text>
            {mensagem.dica}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>
            VOLTAR PARA A HOME
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 35,
  },

  emoji: {
    width: 125,
    height: 125,
    marginBottom: 18,
  },

  principal: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#24152F',
    textAlign: 'center',
    lineHeight: 29,
    marginBottom: 22,
  },

  balao: {
    backgroundColor: '#EAD5FA',
    borderRadius: 25,
    padding: 20,
    width: '100%',
  },

  textoBalao: {
    fontSize: 16,
    fontWeight: '50',
    color: '#24152F',
    lineHeight: 26,
    textAlign: 'justify',
  },

  divisor: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 22,
  },

  linha: {
    flex: 1,
    height: 1,
    backgroundColor: '#9475B5',
  },

  coracao: {
    fontSize: 27,
    color: '#7942A8',
    marginHorizontal: 12,
  },

  caixaDica: {
    backgroundColor: '#EAD5FA',
    borderRadius: 25,
    padding: 20,
    width: '100%',
  },

  textoDica: {
    fontSize: 15,
    color: '#24152F',
    lineHeight: 24,
    textAlign: 'justify',
  },

  destaqueDica: {
    fontWeight: 'bold',
  },

  botao: {
    backgroundColor: '#7135B5',
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 28,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});