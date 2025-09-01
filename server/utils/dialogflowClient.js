import dialogflowCx from '@google-cloud/dialogflow-cx';
const { SessionsClient } = dialogflowCx;

import fs from 'fs';

const keyPath = '/etc/secrets/dialogflow/dialogflow-key';
const credentials = JSON.parse(fs.readFileSync(keyPath,'utf8'));

const client = new SessionsClient({credentials});

export default client;