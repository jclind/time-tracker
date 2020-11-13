let ms = 0, s = 0, m = 0, h = 0;

let st = Date.now();

function start() {
    setInterval(() => {
        let tempT = Date.now();
        elapsedTime = tempT - st;
        ms = elapsedTime % 1000;
        elapsedTime = Math.floor(elapsedTime / 1000);
        s = elapsedTime % 60;
        elapsedTime = Math.floor(elapsedTime / 60);
        m = elapsedTime % 60;
        elapsedTime = Math.floor(elapsedTime / 60);
        h = elapsedTime % 60;
        
        console.log(h + ':' + m + ':' + s + "." + ms);

        // if (ms >= 1000) {
        //     s += Math.floor(ms / 1000);
        //     ms = ms % 1000;
        // }
        // if (s >= 60) {
        //     m += Math.floor(s / 60);
        //     s += s % 60;
        // }
        // console.log(m + ':' + s + '.' + ms);
    }, 50);
}

start();