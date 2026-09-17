require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')

const connectDB = require('./db/connect')

const AuthRouter = require('./routes/auth')
const TasksRouter = require('./routes/tasks')

const authMiddleware = require('./middleware/authentication')

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const allowedOrigins = [
  'http://localhost:5173',
  'https://student-taskflow-red.vercel.app'
]

app.use(express.json());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}))

// routes
app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/tasks', authMiddleware, TasksRouter)

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
