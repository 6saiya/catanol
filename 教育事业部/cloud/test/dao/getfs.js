let fs = require('fs'),
    path = require('path'),
    out = process.stdout;

let getfs = {
    getfs: (req, res, next) => {
        let date = new Date()
        let name = req.query.title + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds()
        fs.writeFile(path.join(__dirname, `../folder/${req.query.id}/${name}.py`), req.query.msg, 'utf8', function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("创建成功");
            }
        })



        res.end('test')
        // let filePath = '/Users/chen/Movies/Game.of.Thrones.S04E07.1080p.HDTV.x264-BATV.mkv';

        // let readStream = fs.createReadStream(filePath);
        // let writeStream = fs.createWriteStream('file.mkv');

        // let stat = fs.statSync(filePath);

        // let totalSize = stat.size;
        // let passedLength = 0;
        // let lastSize = 0;
        // let startTime = Date.now();

        // readStream.on('data', function (chunk) {

        //     passedLength += chunk.length;

        //     if (writeStream.write(chunk) === false) {
        //         readStream.pause();
        //     }
        // });

        // readStream.on('end', function () {
        //     writeStream.end();
        // });

        // writeStream.on('drain', function () {
        //     readStream.resume();
        // });

        // setTimeout(function show() {
        //     let percent = Math.ceil((passedLength / totalSize) * 100);
        //     let size = Math.ceil(passedLength / 1000000);
        //     let diff = size - lastSize;
        //     lastSize = size;
        //     out.clearLine();
        //     out.cursorTo(0);
        //     out.write('已完成' + size + 'MB, ' + percent + '%, 速度：' + diff * 2 + 'MB/s');
        //     if (passedLength < totalSize) {
        //         setTimeout(show, 500);
        //     } else {
        //         let endTime = Date.now();
        //         console.log();
        //         console.log('共用时：' + (endTime - startTime) / 1000 + '秒。');
        //     }
        // }, 500);
    }
}

module.exports = getfs;