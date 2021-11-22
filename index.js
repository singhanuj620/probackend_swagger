const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const fileUpload = require('express-fileupload');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());

let courses = [
    {
        id: "11",
        name: "Learn ReactJS",
        price: 299
    },
    {
        id: "22",
        name: "Learn Angular",
        price: 399
    },
    {
        id: "33",
        name: "Learn Django",
        price: 499
    }
]

app.get("/", (req, res) => {
    res.send("HELLO")
})

app.get("/api/v1/lco", (req, res) => {
    res.send("HELLO from lco docs")
})

app.get("/api/v1/lcoobject", (req, res) => {
    res.json({ id: "55", name: "Learn backend", price: 999 });
})

app.get("/api/v1/courses", (req, res) => {
    res.json(courses);
})

app.get("/api/v1/mycourse/:courseid", (req, res) => {
    const myCourse = courses.find(course => course.id === req.params.courseid);
    res.json(myCourse);
});

app.post("/api/v1/addCourse", (req, res) => {
    console.log(req.body);
    courses.push(req.body);
    res.send(true);
});

app.get("/api/v1/coursequery", (req, res) => {
    let location = req.query.location;
    let device = req.query.device;

    res.send({ location, device })
});

app.post("/api/v1/courseupload", (req, res) => {
    console.log(req.headers);
    const file = req.files.file;
    let path = __dirname + "/images/" + Date.now() + ".jpg";
    file.mv(path, (err) => {
        res.send(true);
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})