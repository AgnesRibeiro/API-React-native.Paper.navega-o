import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { 
  Card,
  Title,
  Paragraph,
  Text,
  Button
} from 'react-native-paper';

export default function FavoritesScreen() { // ← ADICIONAR export default
  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        Meus Favoritos
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Sua lista de filmes favoritos do Studio Ghibli
      </Text>

      <Card style={styles.emptyCard}>
        <Card.Content style={styles.emptyContent}>
          <Title style={styles.emptyTitle}>
            Nenhum favorito ainda
          </Title>
          <Paragraph style={styles.emptyText}>
            Toque no ícone de coração nos filmes para adicioná-los aos favoritos.
          </Paragraph>
          <Button mode="contained" style={styles.button}>
            Explorar Filmes
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
  emptyCard: {
    elevation: 4,
    marginTop: 20,
  },
  emptyContent: {
    padding: 30,
    alignItems: 'center',
  },
  emptyTitle: {
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  button: {
    marginTop: 10,
  },
});