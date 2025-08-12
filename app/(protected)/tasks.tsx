import { auth, db } from "@/lib/firebase";
import { Task } from "@/models/task";
import { useUser } from "@/providers/auth";
import { signOut } from "firebase/auth";
import { onValue, push, ref, remove, update } from "firebase/database";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function TaskListScreen() {
  const user = useUser();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const tasksRef = ref(db, `tasks/${user.uid}`);

    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data: Record<string, Omit<Task, "id">> = snapshot.val();

      if (data) {
        const list = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));

        setTasks(list);
      } else {
        setTasks([]);
      }
    });

    return unsubscribe;
  }, []);

  const save = () => {
    if (title.trim() === "") return;

    if (editingId) {
      update(ref(db, `tasks/${user.uid}/${editingId}`), { title });
      setEditingId(null);
    } else {
      push(ref(db, `tasks/${user.uid}`), { title });
    }

    setTitle("");
  };

  const edit = (task: Task) => {
    setTitle(task.title);
    setEditingId(task.id);
  };

  const removeItem = (id: string) => {
    remove(ref(db, `tasks/${user.uid}/${id}`));
  };

  return (
    <View style={styles.container}>
      <Text>Bem-vindo, {user.email}!</Text>

      <TextInput
        style={styles.input}
        placeholder="Título da tarefa"
        value={title}
        onChangeText={setTitle}
      />

      <Button title={editingId ? "Atualizar" : "Salvar"} onPress={save} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
            <View style={styles.buttons}>
              <Button title="Editar" onPress={() => edit(item)} />
              <Button
                title="Remover"
                color="red"
                onPress={() => removeItem(item.id)}
              />
            </View>
          </View>
        )}
      />

      <Button onPress={() => signOut(auth)} title="Sair" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
});
