const app = require("express")();
const request = require('request');
const cheerio = require("cheerio");
const PORT = 8080;

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});



app.get("/headlines", (req, res) => {
    request('https://www.theonion.com/latest', function (
        error,
        response,
        body
      ) {
        let $ = cheerio.load(body);
        let articles = [];
        $(".kVbhAZ .js_post_item").each((idx, ref) => {
            const articleInfo = {title:"", description:"", category:""};

            articleInfo.title = $(ref).find(".bnjwdx").text();
            articleInfo.description = $(ref).find(".bOfvBY").text();
            articleInfo.category = $(ref).find(".js_link .fa-DBgw").last().text();


            articles.push(articleInfo) 
            // console.log(articleInfo)
        });
        res.status(200).send({"articles":articles})
        //res.status(401).send({"error":"error"})
      })
    })
