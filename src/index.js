const express = require('express');

const app = express();
const port = process.env.PORT;

const models = require('../models/index');
const todo = require('../models/todo');
const bodyParser = require('body-parser');

const Todo = models.Todo;
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from EXPRESS!');
});

app.get('/todos', async (req, res) => {
  const todos = await Todo.findAll();

  res.json({ todos });
});
app.post('/todos', async (req, res) => {
  console.log(req.body);
  const todo = new Todo({
    title: req.body.title,
    isCompleted: false,
  });
  const data = await todo.save();
  res.json({ todo: data });
});
app.delete('/todos/:id', async (req, res, next) => {
  console.log('1');
  try {
    let todoObj = await Todo.findOne({
      where: { id: req.params.id },
    });
    if (!todoObj) {
      next();
    }
    await Todo.destroy({
      where: { id: req.params.id },
    });
  } catch (error) {
    console.log(error.message);
  }

  res.status(204).end();
});
app.put('/todos/:id', async (req, res, next) => {
  let todoObj = await Todo.findOne({
    where: { id: req.params.id },
  });
  if (!todoObj) {
    next();
  }
  await Todo.update(
    { isCompleted: !todoObj.dataValues.isCompleted },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.status(204).end();
});
app.get('*', (req, res) => {
  res
    .status(404)
    .send(`<h1> Page http://localhost${req.url} doesn\`t exist</h1>`);
});
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
