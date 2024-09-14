const { GoogleGenerativeAI } = require("@google/generative-ai");
const mime = require('mime-types');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

const transcribeAudio = async (audioBuffer, mimeType, lang) => {
    console.log("transcribing audio");
    const audio = {
        inlineData: {
            data: Buffer.from(audioBuffer).toString("base64"),
            mimeType: mimeType || 'audio/wav',
        },
    };

    const prompt = `transcribe the audio and give the transcription in ${lang} without any timestamps and new line characters`;

    const result = await model.generateContent([audio, prompt]);
    return result.response.text();  // Return the transcription result
};


const handleAudio = async (req, res) => {
    console.log("Received POST request");
    try {
        const { audio, mimeType, lang } = req.body;
        // console.log("audio ", audio);
        // console.log("mimeType ", mimeType);
        // console.log("lang ", lang);
        if (!audio) {
            return res.status(400).json({ message: "No audio data received" });
        }
        if (!lang) {
            return res.status(400).json({ message: "No language data received" });
        }

        // Decode Base64 audio data
        const audioBuffer = Buffer.from(audio, 'base64');
        const mimeTypeFromHeader = mimeType || 'audio/wav';

        // Perform transcription
        const transcription = await transcribeAudio(audioBuffer, mimeTypeFromHeader, lang);
        console.log(transcription);
        res.status(200).json({ message: "Transcription completed", transcription });

    } catch (error) {
        console.error("Error processing audio: ", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


module.exports = {handleAudio};