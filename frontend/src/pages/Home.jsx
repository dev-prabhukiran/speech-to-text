// src/pages/Home.tsx
import React from "react";
import {Controls} from "../components/Controls";

export const Home = () => {

  return (
    <>
      <div className="w-full flex justify-start pt-5">
        <Controls
          onStartStream={(deviceId) => {
            console.log("Start stream with device:", deviceId);
          }}
        />
        
      </div>

      <div className="w-full h-105 mx-auto p-6 border border-blue-900 border-4 shadow-lg mx-10 rounded-2xl flex flex-col w-90wh mb-6">
        <h2 className="text-4xl text-blue-900 font-sans mb-2">
          Live Transcription
        </h2>
        <hr className="border-t-2 border-solid border-blue-900" />
      </div>
    </>
  );
};
export default Home;
