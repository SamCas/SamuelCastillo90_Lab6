let uuid = require('uuid');
let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

let app = express();
app.use(express.static('public'));
app.use(morgan('dev'));

let comments = [{
    id: uuid(),
    titulo: "Bye bye London",
    contenido: "Yes, this is my post.",
    autor: "Samuel",
    fecha: "2020-30-01"
},{
    id: uuid(),
    titulo: "New Comment",
    contenido: null,
    autor: "Manuel",
    fecha: "2020-30-03"
}];

app.listen(8080, () => {
    console.log('Corriendo servidor en puerto 8080.');
});

app.get('/blog-api/comentarios', (req, res) => {
    res.status(200).json(comments);
});

app.get('/blog-api/comentarios-por-autor', (req, res) => {
    let autor = req.query.autor;
    console.log(autor);
    if(isBlank(autor)){
        return res.status(406).send('Ingrese un autor valido.');
    }else{
        let findAutor = comments.find((comment) => comment.autor == autor && isBlank(comment.contenido));
        if(isBlank(findAutor)){
            return res.status(406).send('No se encontro ningun autor o no hay ningun commentario.');
        }
        return res.status(200).json(findAutor);
    }
});

app.post('/blog-api/nuevo-comentario',jsonParser,(req, res) => {
    let newComment = {
        id : uuid(),
        titulo : req.body.titulo,
        autor : req.body.autor,
        fecha : Date()
    }

    if(isBlank(newComment.titulo) || isBlank(newComment.autor)){
        return res.status(406).send('Titulo o autor no valido.');
    }else{
        return res.status(200).send('Commentario agregado con exito.');
    }
});

function isBlank(param) {
    if(param == undefined || param == null || param == "" || param == " "){
        return true;
    }else{
        return false;
    }
}