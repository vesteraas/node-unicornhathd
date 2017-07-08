# node-unicornhathd

A Node.js module for the [Pimoroni Unicorn Hat HD](https://shop.pimoroni.com/products/unicorn-hat-hd), for the Raspberry Pi.

### Author

Werner Vesterås <wvesteraas@gmail.com>

### Documentation

**UnicornHat.setBrightness(brightness)**

Sets the brightness of the LED's.  1.0 is the maximum brightness.

**UnicornHatHD.getBrightness()**

Returns the current brightness. The default brightness is 0.5.

**UnicornHatHD.setAll(red, green, blue)**

Sets all LED's to the color specified.  Use numbers between 0 and 255 to specify the color components.

**UnicornHatHD.setPixel(x, y, red, green, blue)**

Sets the pixel at coordinate X, Y, to the color [red, green, blue].

**UnicornHatHD.getPixel(x, y)**

Retrieves an array of the color components at coordinate X, Y.

**UnicornHatHD.clear()**

Clears the buffer.

**UnicornHatHD.show(flip_horizontal, flip_vertical)**

Displays the buffer, flipped around the horizontal or vertical axis, or both.

**UnicornHatHD.off()**

Clears the buffer and turns off all the LED's.

### Example program

```javascript
var UnicornHatHD = require('unicornhat-hd');

var unicornHatHD = new UnicornHat('/dev/spidev0.0');

unicornHatHD.setBrightness(1.0);

unicornHatHD.setPixel(0, 0, 255, 0, 0);
unicornHatHD.setPixel(1, 0, 0, 255, 0);
unicornHatHD.setPixel(2, 0, 0, 0, 255);

var flipHorizontal = true;
var flipVertical = false;

unicornHatHD.show(flipHorizontal, flipVertical);
```
