import express  from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
import bodyParser  from 'body-parser';

const app = express();
const port = 3005;
const secret_key = "6Lf3Wk4pAAAAAET_4HcFmP2fdNnW_wCKk6x5Btq6";
const users = [];

// app.use(express.static('public'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cors())
app.post('/login', function (req, res) {
    const newUser  = {...req.body, id:users.length + 1};
    users.push(req.body);
    const token = req.headers["g-recaptcha-response"];
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

    fetch(url, {
        method: 'post'
    })
        .then(response => response.json())
        .then(google_response => {
            res.json({ google_response, id: users.length + 1 })
        })
        .catch(error => res.json({ error }));
});

app.get('/userDetail', function (req, res) {
    res.json({ data:users})
});

app.get('/user/:id', function (req, res) {
    const user = users.find((u)=> u.id === req.params.id )
    const userData = users.find((u)=> u.id === req.params.id)
    const dummyData = {
        position: "Business Analyst",
        email: "test12@mashreq.com",
        joiningDate: "01/08/2021",
        squad: "Business Banking",
        id:req.params.id
        }
        res.json({ data:{...user, ...(userData ? userDate : dummyData)}});
   
});


app.listen(port, () => console.log(`Listening on port ${port}!`));