import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

const app = express();

app.set('view engine', 'ejs');

const PORT = 3002;

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const datas = [];

app.get('/db-test', async (req, res) => {
    try {
        const [datas] = await pool.query('SELECT * FROM contacts');
        res.send(datas);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Database error: ' + err.message);
    }
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/form', (req, res) => {
    res.render('form');
});

app.post('/submit-order', async (req, res) => {
    try {
        const data = req.body;
        console.log('New request submitted:', data);

        data.addmail = Array.isArray(data.addmail) ? "yes" : "no";

        const sql = `INSERT INTO contacts(fname, lname, meet, job, company, linkedin, email, message, maillist, mailformat) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const params = [
            data.fname,
            data.lname,
            data.meet,
            data.jobtitle,
            data.company,
            data.linkurl,
            data.email,
            data.message,
            data.addmail,
            data.eformat
        ];

        const [result] = await pool.execute(sql, params);
        console.log('Order saved with ID:', result.insertId);

        res.render('confirm', { data });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Sorry, there was an error processing your request. Please try again.');
    }
});

app.get('/admin', async (req, res) => {
    try {
        const [datas] = await pool.query('SELECT * FROM contacts ORDER BY timestamp DESC');
        res.render('admin', { datas });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Error loading orders: ' + err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});