// src/components/Controls.jsx
import React, { useState } from "react";
import { useAudioDevices } from "../hooks/useAudioDevices";
import muted from "../assets/mike-muted.png";
import unmuted from "../assets/mike-unmuted.png";

export const Controls = ({ onStartStream }) => {
  const {
    devices,
    selectedDevice,
    setSelectedDevice,
    requestMicrophoneAccess,
    loading,
    error,
  } = useAudioDevices();

  // Only track explicit permission result from "Allow microphone" button
  const [explicitPermissionGranted, setExplicitPermissionGranted] =
    useState(false);
  const [mute, setMute] = useState(false);

  // Infer permission from existing devices/labels or selected device
  const inferredPermission =
    !!selectedDevice || (devices && devices.length > 0 && !!devices[0].label);

  // Final value used in UI
  const permissionGranted = explicitPermissionGranted || inferredPermission;

  const handleAllow = async () => {
    const ok = await requestMicrophoneAccess();
    if (ok) {
      setExplicitPermissionGranted(true);
    }
  };

  const handleSelect = (e) => {
    const dev = e.target.value || null;
    setSelectedDevice(dev);
    if (onStartStream) onStartStream(dev || undefined);
  };

  return (
    <div className="p-4 rounded-2xl border-4 border-blue-900 shadow-lg w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-col w-24">
              <img
                src={mute ? muted : unmuted}
                alt="microphone"
                className="h-16"
              />
            </div>
            <div>
              <h3 className="text-2xl text-blue-900 font-semibold">
                Microphone
              </h3>
              <p className="text-sm text-blue-800">Input device & permission</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMute((m) => !m)}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium border border-blue-900"
          >
            {mute ? "Unmute" : "Mute"}
          </button>

          <button
            onClick={handleAllow}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium border border-blue-900"
            disabled={loading}
          >
            {permissionGranted
              ? "Mic allowed"
              : loading
              ? "Requesting..."
              : "Allow microphone"}
          </button>
        </div>
      </div>

      <div className="mt-4">
        {error && <div className="text-red-600 mb-2">{error}</div>}

        <label className="block text-sm text-blue-900 mb-1">
          Select audio input
        </label>
        <select
          value={selectedDevice ?? ""}
          onChange={handleSelect}
          className="w-full p-2 rounded-lg border-2 border-blue-900 bg-white"
        >
          <option value="">Default microphone</option>
          {(devices || []).map((d) => (
            <option key={d.deviceId} value={d.deviceId}>
              {d.label || "Microphone"}
            </option>
          ))}
        </select>

        <p className="text-xs text-blue-800 mt-2">
          Selection persists for this session. If labels are empty, allow
          microphone permission first.
        </p>
      </div>
    </div>
  );
};
