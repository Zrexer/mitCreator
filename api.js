#!/usr/bin/env node 

const host = "127.0.0.1";
const port = 4646;

const alex = require('./node_modules/alexcolor/alexcolor/index');
const express = require("express")();

const license = (yearOrDate, name, softwareName, callback) => {
    const licensex = `Copyright ${yearOrDate} ${name} for Software: ${softwareName}
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`

    return callback(licensex);
}

express.listen(port, host, () => {
    console.log(alex.green("Running ON: ") + alex.yellow(`${host}${alex.red(":")}${alex.yellow(port)}\n`));
})

express.get("/mit/make", (req, res, nx) => {
    console.log(alex.cyan("Requested For ") + alex.red("/mit/make"));
    const yearOrDateForMit = req.query.date; 
    const name = req.query.name;
    const softwareName = req.query.softwareName; 

    if (yearOrDateForMit === undefined || name === undefined || softwareName === undefined){
        console.log(alex.red("Faild Client Usage For ") + alex.yellow("/mit/make"))
        const errorData = {
            'dev' : 'host1let',
            "mode" : "Mit License Creator",
            'Error' : true,
            'data' : "/mit/make?name=Ali&date=2023&softwareName=Nodejs"
        };
        res.send(errorData);
    }else{
        license(yearOrDateForMit, name, softwareName, (dataForSend) => {
            const errorData = {
                'dev' : 'host1let',
                "mode" : "Mit License Creator",
                'Error' : false,
                'data' : dataForSend
            };
            res.send(errorData);
        })
    }
})
