import express from 'express';

const app = express();

const PORT = 3002;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

const datas = [];

app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
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
        eformat: req.body.eformat
    };

    datas.push(data);
    console.log(datas);

    res.sendFile(`${import.meta.dirname}/views/confirm.html`);
});

app.get('/admin', (req, res) => {
    res.send(datas);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});