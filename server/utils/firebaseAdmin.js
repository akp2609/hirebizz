import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


const serviceAccount = JSON.parse(
  fs.readFileSync(process.env.hirebizz-firebase-key)
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hirebizz-chat-default-rtdb.firebaseio.com"
});

const db = admin.database();
export default db;