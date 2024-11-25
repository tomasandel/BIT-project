const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { userInput: '', output: '', name: '', age: 0, role: '' });
  });

app.post('/', (req, res) => {
  const userInput = req.body.userInput; 
  const data = {
    name: 'Janko',
    age: 30,
    role: 'Administrátor',
  };

  try {
    const rendered = ejs.render(userInput, data);

    res.render('index', { userInput, output: rendered });
  } catch (err) {
    res.render('index', { userInput, output: `Error: ${err.message}` });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
