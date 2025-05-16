import EmojiPicker from "emoji-picker-react";
import { Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SendingMessage() {
  const [EmojiOnHover, setEmojiOnHover] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [emojicolor, setemojicolor] = useState(false);
  const ref = useRef(null);
  const emojiRef = useRef(null); // 👈 ref for emoji picker container

  const handleeMojiAdding = (Emojidata, event) => {
    ref.current.focus();
    setMessageBody((prev) => prev + Emojidata.emoji);
  };

  const [customPadding, setCustomPadding] = useState(1);
  function detectDirection(text) {
    const persianChars = /[\u0600-\u06FF]/;
    return persianChars.test(text) ? "rtl" : "ltr";
  }

  useEffect(() => {
    const persianChars = /[\u0600-\u06FF]/;
    setCustomPadding(persianChars.test(messageBody) ? 1 : 0);
  }, [messageBody]);

  // ✅ Close emoji picker on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiRef.current &&
        !emojiRef.current   .contains(event.target) &&
        !event.target.closest(".emoji-toggle") // prevent closing when clicking emoji icon
      ) {
        setEmojiOnHover(false);
        setemojicolor(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("asdad");
      }}
      dir="rtl"
      className=" sticky  bottom-0  bg-[#d9f0ff] p-4 border-t flex gap-2"
    >
      <div className="flex-1 relative  rounded-2xl ">
        <input
          dir={detectDirection(messageBody)}
          ref={ref}
          className={`bg-white w-full h-full border rounded-2xl ${customPadding ? "px-4" : "px-10"}`}
          onChange={(e) => setMessageBody(e.target.value)}
          
          value={messageBody}
        />

        {/* emoji toggle button */}
        <section
          onClick={() => {
            setEmojiOnHover(!EmojiOnHover);
            setemojicolor((prev) => !prev);
            
          }}
          className="emoji-toggle absolute left-2 top-[7.3px] cursor-pointer hover:scale-105 transition-all duration-200"
        >
          {!emojicolor ? <Smile color="blue" /> : <Smile color="red" />}
        </section>

        {/* emoji picker box */}
        <div ref={emojiRef} className="absolute bottom-[6vh] left-0 z-10 ">
          <EmojiPicker open={EmojiOnHover} onEmojiClick={handleeMojiAdding} />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        فرستادن
      </button>
    </form>
  );
}
