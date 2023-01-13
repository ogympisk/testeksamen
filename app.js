const express = require('express');

// express app
const app = express();

app.get('/', (req, res) => {
    res.render('index', {title: 'My Website'});
})
app.get('/Om', (req, res) => {
  res.render('Om', {title: 'Om'})
})
app.get('/kart', (req, res) => {
  res.render('kart', {title: 'kart'})
})
app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});




// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});