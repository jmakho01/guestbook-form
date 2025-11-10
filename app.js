import express from 'express';

const app = express();

app.set('view engine', 'ejs');

const PORT = 3002;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

const datas = [];

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/form', (req, res) => {
    res.render('form');
});

app.post('/submit-order', (req, res) => {
    const data = {
        fname: req.body.fname,
        lname: req.body.lname,
        jobtitle: req.body.jobtitle,
        company: req.body.company,
        linkurl: req.body.linkurl,
        email: req.body.email,
        meet: req.body.meet,
        other: req.body.other,
        message: req.body.message,
        addmail: req.body.addmail,
        eformat: req.body.eformat,
        timestamp: new Date()
    };

    datas.push(data);
    console.log(datas);

    res.render('confirm', { data });
});

app.get('/admin', (req, res) => {
    res.render('admin', { datas });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});