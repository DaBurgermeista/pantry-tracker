import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { upsertItem } from "@/src/db/items";

export default function EditItem() {
  const { barcode } = useLocalSearchParams<{ barcode?: string }>();
  const [name, setName] = useState("");
  const [qty, setQty] = useState("1");

  return (
    <View style={{ padding: 16, gap: 12 }}>
      {barcode ? <Text>Barcode: {barcode}</Text> : null}
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
      />
      <TextInput
        placeholder="Qty"
        keyboardType="decimal-pad"
        value={qty}
        onChangeText={setQty}
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
      />
      <Button
        title="Save"
        onPress={async () => {
          await upsertItem({
            name,
            qty: Number(qty),
            barcode: barcode ?? null,
          });
          router.replace("/"); // back to tabs root (Pantry)
        }}
      />
    </View>
  );
}
