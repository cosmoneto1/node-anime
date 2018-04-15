const request = require("request")
const cheerio = require('cheerio')

const options = {
    method: 'GET',
    url: 'http://www.animesonlinebr.com.br/',
    headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:56.0) Gecko/20100101 Firefox/56.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
}

request(options, function(error, response, body) {
    if (error) {
        throw new Error(error)
    }

    //console.log(body)
    if (body) {
        var $ = cheerio.load(body)
        var lista = [];
        lista = $('.telinhas>ul>li').map((i, el) => {
            //console.log($(el).html())
            var item = {
                data: $(el).find('p').html().replace('Data: ', ''),
                titulo: $(el).find('a').attr('title'),
                img: $(el).find('img').attr('data-src'),
                video: $(el).find('a.thumbTT').attr('href'),
                page: $(el).find('.episodiosLink>a').attr('href')
            }
            console.log(item)
            return item
        })


        console.log(lista.length)

    }

})