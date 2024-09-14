import * as React from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';


export default function Recorder() {
  //Funciton to handle POST request
  const handleAudioUpload = async (blob) => {
    const formData = new FormData();
    formData.append('audio', blob, 'recording.wav');
    const response = await fetch("http://localhost:5050/", {
      method : 'POST',
      body : formData
    });
  };
  return (
    <div>
      <AudioRecorder
        onRecordingComplete={handleAudioUpload} //sending POST request
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
          // autoGainControl,
          // channelCount,
          // deviceId,
          // groupId,
          // sampleRate,
          // sampleSize,
        }}
        onNotAllowedOrFound={(err) => console.table(err)}
        downloadOnSavePress={false}
        downloadFileExtension="webm"
        mediaRecorderOptions={{
          audioBitsPerSecond: 128000,
        }}
        showVisualizer={true}
      />
    </div>
  );
}