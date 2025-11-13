import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { 
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  Chip,
  Button,
  Text,
  Searchbar,
  Snackbar
} from 'react-native-paper';
import { useRouter } from 'expo-router'; // ← ADICIONAR import

type Movie = {
  id: string;
  title: string;
  image: string;
  director: string;
  release_date: string;
  rt_score: string;
  description: string;
};

export default function FilmsScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const router = useRouter(); // ← ADICIONAR router

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://ghibliapi.vercel.app/films');
        
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        
        const data = await response.json();
        const formattedMovies: Movie[] = data.map((film: any) => ({
          id: film.id,
          title: film.title,
          image: film.movie_banner,
          director: film.director,
          release_date: film.release_date,
          rt_score: film.rt_score,
          description: film.description
        }));
        
        setMovies(formattedMovies);
      } catch (error) {
        setError('Erro ao carregar filmes');
        setSnackbarVisible(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ← ADICIONAR função para navegar para detalhes
  const navigateToFilmDetails = (movie: Movie) => {
    router.push({
      pathname: '/film-details',
      params: { movie: JSON.stringify(movie) }
    });
  };

  if (loading) {
    return (
      <ScrollView contentContainerStyle={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando filmes...</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Searchbar
        placeholder="Buscar filmes..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <Text variant="headlineMedium" style={styles.header}>
        Studio Ghibli
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        {filteredMovies.length} filmes encontrados
      </Text>

      {filteredMovies.map(movie => (
        <Card key={movie.id} style={styles.card}>
          <Card.Cover source={{ uri: movie.image }} />
          <Card.Content style={styles.cardContent}>
            <Title>{movie.title}</Title>
            <Paragraph numberOfLines={2}>
              {movie.description}
            </Paragraph>
            
            <ScrollView horizontal style={styles.chipsContainer}>
              <Chip style={styles.chip}>{movie.director}</Chip>
              <Chip style={styles.chip}>{movie.release_date}</Chip>
              <Chip style={styles.chip}>⭐ {movie.rt_score}/100</Chip>
            </ScrollView>

            <Button 
              mode="contained" 
              onPress={() => navigateToFilmDetails(movie)} // ← CORRIGIDO: agora é clicável
              style={styles.button}
            >
              Ver Detalhes
            </Button>
          </Card.Content>
        </Card>
      ))}

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {error}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  searchbar: {
    marginBottom: 16,
  },
  header: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#4a6572',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  card: {
    marginBottom: 16,
  },
  cardContent: {
    paddingTop: 16,
  },
  chipsContainer: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  chip: {
    marginRight: 8,
  },
  button: {
    marginTop: 8,
  },
});