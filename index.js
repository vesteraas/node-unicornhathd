var SPI = require('pi-spi');

function UnicornHatHD(device) {
    this.matrix = [];

    for (var y=0; y<16; y++) {
        this.matrix.push([]);
        for (var x=0; x<16; x++) {
            this.matrix[y].push({
                r: 0,
                g: 0,
                b: 0
            })
        }
    }

    this.brightness = 0.5;

    this.spi = SPI.initialize(device);
}

UnicornHatHD.prototype.setBrightness = function (brightness) {
    this.brightness = brightness;
};

UnicornHatHD.prototype.getBrightness = function () {
    return this.brightness;
};

UnicornHatHD.prototype.setAll = function (r, g, b) {
    if (r !== parseInt(r, 10)) {
        throw 'r must be an integer';
    }

    if (g !== parseInt(g, 10)) {
        throw 'r must be an integer';
    }

    if (b !== parseInt(b, 10)) {
        throw 'b must be an integer';
    }

    for (var x=0; x<16; x++) {
        for (var y=0; y<16; y++) {
            this.matrix[x][y].r = r;
            this.matrix[x][y].g = g;
            this.matrix[x][y].b = b;
        }
    }
};

UnicornHatHD.prototype.setPixel = function (x, y, r, g, b) {
    this.matrix[x][y].r = r;
    this.matrix[x][y].g = g;
    this.matrix[x][y].b = b;
};

UnicornHatHD.prototype.getPixel = function (x, y) {
    return [
        this.matrix[x][y].r,
        this.matrix[x][y].g,
        this.matrix[x][y].b
    ];
};

UnicornHatHD.prototype.clear = function () {
    this.setAll(0, 0, 0);
};

UnicornHatHD.prototype.show = function (flip_horizontal, flip_vertical) {
    if (flip_horizontal) {
        for(var i=0;i<this.matrix.length;i++){
            this.matrix[i].reverse();
        }
    }

    if (flip_vertical) {
        this.matrix.reverse();
    }

    var buffer = new Buffer(16 * 16 * 3);

    for (var y=0; y<16; y++) {
        for (var x=0; x<16; x++) {
            buffer[y * 16 * 3 + x * 3 + 0] = this.matrix[x][y].r * this.brightness;
            buffer[y * 16 * 3 + x * 3 + 1] = this.matrix[x][y].g * this.brightness;
            buffer[y * 16 * 3 + x * 3 + 2] = this.matrix[x][y].b * this.brightness;
        }
    }

    this.spi.write(Buffer.concat([new Buffer([0x72]), buffer]), function (err) {
        if (err) {
            throw 'Something went wrong!';
        }
    });
};

UnicornHatHD.prototype.show = function () {
    this.show(false, false);
};

UnicornHatHD.prototype.off = function () {
    this.clear();
    this.show();
};

module.exports = UnicornHatHD;