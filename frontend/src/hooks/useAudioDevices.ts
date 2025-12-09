// src/hooks/useAudioDevices.ts
import { useEffect, useState, useCallback } from "react";

export type AudioDevice = {
  deviceId: string;
  label: string;
  groupId?: string;
};

const SESSION_KEY = "selectedAudioInputDeviceId";

export function useAudioDevices() {
  const [devices, setDevices] = useState<AudioDevice[]>([]);
  const [selectedDevice, setSelectedDeviceState] = useState<string | null>(
    () => {
      try {
        return sessionStorage.getItem(SESSION_KEY);
      } catch {
        return null;
      }
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enumerate = useCallback(async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      setError("Browser does not support media devices API.");
      return;
    }
    try {
      const list = await navigator.mediaDevices.enumerateDevices();
      const inputs = list
        .filter((d) => d.kind === "audioinput")
        .map((d) => ({
          deviceId: d.deviceId,
          label: d.label || "Microphone",
          groupId: (d as any).groupId,
        }));
      setDevices(inputs);
    } catch (err: any) {
      setError(err?.message || "Failed to enumerate devices.");
    }
  }, []);

  // Request permission explicitly (will also allow labels to appear)
  const requestMicrophoneAccess = useCallback(async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("getUserMedia not supported.");
      return false;
    }
    setLoading(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Immediately stop tracks: we only needed permission and labels
      stream.getTracks().forEach((t) => t.stop());
      await enumerate();
      setLoading(false);
      return true;
    } catch (err: any) {
      setError(err?.message || "Microphone permission denied.");
      setLoading(false);
      return false;
    }
  }, [enumerate]);

  // Persist selection in sessionStorage and in state
  const setSelectedDevice = useCallback((deviceId: string | null) => {
    setSelectedDeviceState(deviceId);
    try {
      if (deviceId) sessionStorage.setItem(SESSION_KEY, deviceId);
      else sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    enumerate();
    const handler = () => enumerate();
    navigator.mediaDevices?.addEventListener?.("devicechange", handler);
    return () =>
      navigator.mediaDevices?.removeEventListener?.("devicechange", handler);
  }, [enumerate]);

  return {
    devices,
    selectedDevice,
    setSelectedDevice,
    requestMicrophoneAccess,
    loading,
    error,
  };
}
