import './dotenv';
import { port } from './config';
import app from './app';

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});
