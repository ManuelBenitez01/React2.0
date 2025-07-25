import express from 'express';
import cors from 'cors';
import router from './src/routes/route.js'; 


const app = express();

app.disable('x-powered-by');
app.disable('etag');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Pescaderialoca');
});

app.use('/', router);

app.listen(3000, () => {
  console.log('servidor abierto como leo en  http://localhost:3000');
});