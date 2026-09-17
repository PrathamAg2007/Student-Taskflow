require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')

const connectDB = require('./db/connect')

const AuthRouter = require('./routes/auth')
const TasksRouter = require('./routes/tasks')

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

app.use(cors()) //{origin: "https://student-taskflow-red.vercel.app"}
// routes
app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/tasks', TasksRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
