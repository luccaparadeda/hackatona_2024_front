import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import Image from "next/image";

interface RecognitionProps {
  strDescFunc: React.Dispatch<React.SetStateAction<string>>;
}

export interface SpeechRecognitionHandle {
  stopListening: () => void;
}

const SpeechRecognitionComponent = forwardRef<
  SpeechRecognitionHandle,
  RecognitionProps
>(({ strDescFunc }, ref) => {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null,
  );
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert(
        "Your browser does not support speech recognition. Try using Chrome.",
      );
      return;
    }

    const recognition = new (
      window as any
    ).webkitSpeechRecognition() as SpeechRecognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "pt-BR";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      strDescFunc(finalTranscript || interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error detected: " + event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    setRecognition(recognition);

    return () => {
      recognition.stop();
      recognition.onstart = null;
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
    };
  }, [strDescFunc]);

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  // Expose the stopListening function to parent components
  useImperativeHandle(ref, () => ({
    stopListening,
  }));

  return (
    <div>
      {!isListening && (
        <button onClick={startListening}>
          <Image
            src="/micIcon.svg"
            alt="microfoneIcon"
            width={32}
            height={32}
          />
        </button>
      )}

      {isListening && (
        <button onClick={stopListening}>
          <Image
            src="/micOnIcon.svg"
            alt="microfoneIcon On"
            width={32}
            height={32}
          />
        </button>
      )}
    </div>
  );
});

export default SpeechRecognitionComponent;
