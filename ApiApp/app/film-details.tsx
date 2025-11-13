import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { 
  Card,
  Title,
  Paragraph,
  Chip,
  Button,
  Text
} from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';

type Movie = {
  id: string;
  title: string;
  image: string;
  director: string;
  release_date: string;
  rt_score: string;
  description: string;
};

export default function FilmDetailsScreen() {
  const { movie } = useLocalSearchParams();
  const router = useRouter();
  
  // ← CORRIGIDO: tratamento melhor dos parâmetros
  let film: Movie | null = null;
  
  try {
    if (typeof movie === 'string') {
      film = JSON.parse(movie);
    }
  } catch (error) {
    console.error('Erro ao parsear filme:', error);
  }

  // Se não conseguir carregar o filme, mostrar mensagem de erro
  if (!film) {
    return (
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            <Title style={styles.title}>Erro ao carregar filme</Title>
            <Paragraph style={styles.description}>
              Não foi possível carregar as informações do filme.
            </Paragraph>
            <Button 
              mode="outlined" 
              onPress={() => router.back()}
              style={styles.button}
            >
              Voltar
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover 
          source={{ uri: film.image }} 
          style={styles.cover}
          resizeMode="cover"
        />
        <Card.Content style={styles.content}>
          <Title style={styles.title}>{film.title}</Title>
          
          <Paragraph style={styles.detailText}>
            <Text style={styles.label}>🎬 Diretor: </Text>
            {film.director}
          </Paragraph>
          
          <Paragraph style={styles.detailText}>
            <Text style={styles.label}>📅 Lançamento: </Text>
            {film.release_date}
          </Paragraph>

          <Chip style={styles.ratingChip}>
            ⭐ Avaliação: {film.rt_score}/100
          </Chip>

          <Paragraph style={styles.description}>
            {film.description}
          </Paragraph>

          <Button 
            mode="outlined" 
            onPress={() => router.back()}
            style={styles.button}
          >
            Voltar
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    elevation: 8,
  },
  cover: {
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#4a6572',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 24,
  },
  label: {
    fontWeight: 'bold',
    color: '#4a6572',
  },
  ratingChip: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    backgroundColor: '#4a6572',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'justify',
  },
  button: {
    marginTop: 10,
  },
});