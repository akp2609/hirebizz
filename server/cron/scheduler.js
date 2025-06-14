import cron from "node-cron";
import { checkUnseenMessages } from "../controllers/chatController.js";

export const scheduleRemindersMessage = ()=>{
    cron.schedule("*/60 * * * *",()=>{
        console.log("⏰ Running message reminder job");
        checkUnseenMessages({},{json: ()=>{},status: ()=>({json:()=>{}})});
    })
}