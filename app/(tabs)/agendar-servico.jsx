import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const AgendarServico = ({ route, navigation }) => {
  const { profissional, dataSelecionada } = route.params;
  const [horarios, setHorarios] = useState([]);
  const [selectedServico, setSelectedServico] = useState(null);

  useEffect(() => {
    const horariosDisponiveis = profissional.horarios.filter(horario => horario.dia === dataSelecionada);
    setHorarios(horariosDisponiveis);
  }, []);

  const confirmarAgendamento = (horario) => {
    if (selectedServico) {
      alert(`Serviço agendado: ${selectedServico.nome} com ${profissional.nome} no dia ${dataSelecionada} às ${horario.hora_inicio}`);
      navigation.goBack();
    } else {
      alert('Selecione um serviço antes de confirmar o agendamento.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar com {profissional.nome}</Text>
      <Text style={styles.subtitle}>Data: {dataSelecionada}</Text>

      <Text style={styles.subtitle}>Selecione um Serviço:</Text>
      <FlatList
        data={profissional.servicos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.servicoItem} onPress={() => setSelectedServico(item)}>
            <Text style={selectedServico?.id === item.id ? styles.servicoSelected : styles.servicoName}>{item.nome} - R${item.preco}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.subtitle}>Horários Disponíveis:</Text>
      <FlatList
        data={horarios}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.horarioItem}>
            <Text>{item.hora_inicio} - {item.hora_fim}</Text>
            <Button title="Agendar" onPress={() => confirmarAgendamento(item)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  servicoItem: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  servicoName: {
    fontSize: 16,
  },
  servicoSelected: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  horarioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
});

export default AgendarServico;
