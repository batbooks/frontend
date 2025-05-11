import EmojiPicker from "emoji-picker-react";
import { Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
export default function SendingMessage() {
  const [EmojiOnHover, setEmojiOnHover] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const ref = useRef(null);
  const handleeMojiAdding = (Emojidata, event) => {
    ref.current.focus();
    console.log(Emojidata);
    setMessageBody((prev) => prev + Emojidata.emoji);
  };
  const [customPadding, setCustomPadding] = useState(0);
  function detectDirection(text) {
    const persianChars = /[\u0600-\u06FF]/;
    
    return persianChars.test(text) ? "rtl" : "ltr";
  }
  useEffect (() => {
  const persianChars = /[\u0600-\u06FF]/;
  setCustomPadding(persianChars.test(messageBody) ? 1 : 0);
}, [messageBody]);
  return (
    <form
      onSubmit={console.log("asdad")}
      dir="rtl"
      className=" max-h-[70px] sticky bottom-0 bg-[#d9f0ff] p-4 border-t flex gap-2"
    >
      <div className="flex-1 relative border rounded  ">
        <input
          dir={detectDirection(messageBody)}
          ref={ref}
          className={`bg-white w-full h-full ${customPadding ? "px-4" : "px-10"}`}
          onChange={(e) => setMessageBody(e.target.value)}
          placeholder={messageBody}
          value={messageBody}
        />

        <section
          onClick={() => {
            setEmojiOnHover(!EmojiOnHover);
          }}
          className="absolute left-2 top-1"
        >
          {" "}
          <Smile color="blue" />
        </section>

        <div className="absolute bottom-[6vh] left-0">
          <EmojiPicker open={EmojiOnHover} onEmojiClick={handleeMojiAdding} />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>
      {console.log(messageBody)}
    </form>
  );
}
