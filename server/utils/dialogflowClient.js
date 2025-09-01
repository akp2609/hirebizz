import {SessionClient} from '@google-cloud/dialogflow-cx';
import fs from 'fs';

const keyPath = '/etc/secrets/dialogflow/dialogflow-key';
const credentials = JSON.parse(fs.readFileSync(keyPath,'utf8'));

const client = new SessionClient({credentials});

export default client;