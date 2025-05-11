import MyMessage from "./MyMessage"
import SendingMessage from "./SendingInput"
import UserMessage from "./UserMessage"


export default function ChatPage(){
    return(
    <div className="bg-white">
        <div className="h-[95vh]">

        <MyMessage></MyMessage>
        <UserMessage></UserMessage>
        <MyMessage></MyMessage>
        <UserMessage></UserMessage>
        <UserMessage></UserMessage>
                  <UserMessage></UserMessage>
          <SendingMessage></SendingMessage>

        
        </div>
        {/* <div className="sticky left-0 bottom-0 h-[5vh] ">
        <SendingMessage></SendingMessage>
        </div> */}
    </div>
    
    
    )
}