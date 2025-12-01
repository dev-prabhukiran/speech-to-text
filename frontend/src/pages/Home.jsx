import muted from "../assets/mike-muted.png";
import unmuted from "../assets/mike-unmuted.png";
export const Home = () => {
    const mute=true;
    return (
      <>
        <div className="flex flex-row items-center mt-6 w-full border py-3 rounded-2xl border-blue-900 border-2">
          <div className="flex flex-col w-full gap-3 bg-blue-500">
            <hr className="flex-1 border-t-2 border-solid border-blue-900" />
            <hr className="flex-1 border-t-2 border-solid border-blue-900" />
          </div>

          {mute ? (
            <img src={unmuted} alt="Microphone" className="h-20" />
          ) : (
            <img src={muted} alt="Microphone" className="h-20" />
          )}
          <div className="flex flex-col w-full gap-3 bg-blue-500">
            <hr className="flex-1 border-t-2 border-solid border-blue-900" />
            <hr className="flex-1 border-t-2 border-solid border-blue-900" />
          </div>
        </div>
        <div className="w-full h-105 mx-auto p-6 border border-blue-900 border-4 shadow-lg mx-10 rounded-2xl flex flex-col w-90wh mb-6">
          <h2 className="text-4xl text-blue-900 font-sans mb-2">
            Live Transcription
          </h2>
          <hr className="border-t-2 border-solid border-blue-900" />
        </div>
      </>
    );
}