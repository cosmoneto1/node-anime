let request = require('request')
let cheerio = require('cheerio')
var asyncLoop = require('node-async-loop')


var url = 'https://www.animakai.info'

var lista = [];

function consulta(callbackFull) {
    lista = [];
    request(url, function (error, response, body) {
        if (error) { throw new Error('Unexpected status code', error); }
        let $ = cheerio.load(body)
        let episodios = $('.ultimos-episodios div.box-episodio:not(.visible-lg)')

        episodios.each(function () {
            var obj = { titulo: '', linkpage: '', img: '', epi: '', link: '' }
            obj.titulo = $(this).children('.nome-thumb').children('a.tt').text();
            obj.linkpage = url + '/' + $(this).children('.nome-thumb').children('a.tt').attr('href');
            obj.img = $(this).children('.nome-thumb').children('.thumb').children('.img-full').attr('src');
            obj.epi = $(this).children('.lista-servers').children('.content-servers').children('.btn-online').attr('href');
            lista.push(obj);
        });

        asyncLoop(lista, carregaUrlLista, fim);



        function fim(err) {
            if (err) {
                console.error('Error: ' + err.message);
                return;
            }
            callbackFull(lista)
        }

    })
}


function carregaUrlLista(item, next) {
    pegaVideo(item.epi, function (result) {
        item.link = result
        next()
    })
}


function pegaVideo(urlPagina, callback) {
    if (urlPagina) {
        request(urlPagina, function (error, response, body) {
            if (error) { throw new Error('Erro em pega o video do episodio!'); }
            let $ = cheerio.load(body)
            link = $('video').children('source').attr('src')
            callback(link.trim())
        })

    }
}


module.exports = {
    animakai: consulta
}