import express from 'express';
import fetch from 'node-fetch';
const planets = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//routes
//root route
app.get('/', async (req, res) => {
    let randomIndex = Math.floor(Math.random() * 50);
    let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar system"
    let response = await fetch(url);
    let data = await response.json();
    let randomImgURL = data.hits[randomIndex].largeImageURL;
   res.render('home.ejs', {randomImgURL})
});

app.get('/planetInfo', (req, res) => {
   let planet = req.query.planet;
   let planetInfo = planets[`get${planet}`]();
   res.render('planet.ejs', {planetInfo, planet})
});

app.get('/nasaPod', async(req, res) => {
    let url = "https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=2026-03-11"
    let response = await fetch(url);
    let data = await response.json();
    res.render('nasaPod.ejs', {data})
 });

 app.get('/Asteroids', (req, res) => {
    let planetInfo = planets[`getAsteroids`]();
    res.render('asteroids.ejs', {planetInfo})
 });

 app.get('/Comets', (req, res) => {
    let planetInfo = planets[`getComets`]();
    res.render('comets.ejs', {planetInfo})
 });


// app.get('/mercury', (req, res) => {
//    let mercuryInfo = planets.getMercury();
//    console.log(mercuryInfo);
//    res.render('mercury.ejs', {mercuryInfo})
// });


app.listen(3000, () => {
   console.log('server started');
});