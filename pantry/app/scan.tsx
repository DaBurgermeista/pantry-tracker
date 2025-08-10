import { useEffect, useRef } from "react";
import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const locked = useRef(false);

  useEffect(() => {
    if (!permission) requestPermission(); // first render asks permission
  }, [permission, requestPermission]);

  if (!permission) {
    return <Text style={{ padding: 16 }}>Checking camera permission…</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={{ padding: 16, gap: 12 }}>
        <Text>We need your permission to use the camera.</Text>
        <Button title="Grant permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        // narrow to the common retail codes so it fires faster
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e", "code128"],
        }}
        onBarcodeScanned={({ data }) => {
          if (locked.current) return; // ignore if already processing
          locked.current = true; // lock to prevent multiple scans
          router.replace({ pathname: "/edit", params: { barcode: data } });
        }}
      />
      <Button title="Cancel" onPress={() => router.back()} />
    </View>
  );
}
