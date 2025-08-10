import { useCallback, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { listItems } from "@/src/db/items";
import type { Item } from "@/src/db/items";

export default function PantryTab() {
  const [items, setItems] = useState<Item[]>([]);
  const refresh = useCallback(async () => setItems(await listItems()), []);
  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.id)}
        contentContainerStyle={{ gap: 8, padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>
              {item.qty} {item.unit} • {item.location}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center" }}>No items yet.</Text>
        }
      />

      <View style={styles.row}>
        <Link href="/scan" asChild>
          <Pressable style={styles.btn}>
            <Text style={styles.btnText}>Scan</Text>
          </Pressable>
        </Link>
        <Link href="/edit" asChild>
          <Pressable style={styles.btn}>
            <Text style={styles.btnText}>Add</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { padding: 12, borderWidth: 1, borderRadius: 8 },
  name: { fontWeight: "600", marginBottom: 2 },
  row: { flexDirection: "row", gap: 12, padding: 16 },
  btn: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
  },
  btnText: { fontWeight: "600" },
});
