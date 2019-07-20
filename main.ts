/**
 * Utiliser le capteur de couleur Grove avec MicroBit V2 - Développée par A4 Technologie (www.a4.fr).
 * Dévellopeur : Louis Bernot - Caylar Instruments - 13/07/2019 - v1.0.0
 */

//% weight=100 color=#004696 icon="\uf121" block="Color Sensor A4 Techno" advanced=false
namespace A4_Color_Sensor_Grove {

    //% blockId=A4_Color_Sensor_Grove_Init
    //% block="Initialiser le capteur de couleur"
    export function initColorSensor(): void {
        let buf: Buffer = pins.createBuffer(2);
        //setTimingReg
        buf[0] = 129; //0x81
        buf[1] = 0; //0x00
        pins.i2cWriteBuffer(0x39, buf, false);
        basic.pause(10);
        //setInterruptSourceReg
        buf[0] = 131; //0x83
        buf[1] = 3; //0x03
        pins.i2cWriteBuffer(0x39, buf, false);
        basic.pause(10);
        //setInterruptControlReg
        buf[0] = 130; //0x82
        buf[1] = 16; //0x10 | 0x00
        pins.i2cWriteBuffer(0x39, buf, false);
        basic.pause(10);
        //setGain
        buf[0] = 135; //0x87
        buf[1] = 0; //
        pins.i2cWriteBuffer(0x39, buf, false);
        basic.pause(10)
        //setEnableADC
        buf[0] = 128; //0x80
        buf[1] = 3; //0x03
        pins.i2cWriteBuffer(0x39, buf, false);
        basic.pause(10);
    }

    //% blockId=A4_Color_Sensor_Grove_GetRGB
    //% block="Lire couleur RGB led $ledStatus"
    //% ledStatus.shadow="toggleOnOff"
    export function getRGBColors(ledStatus: boolean): number[] {
        let rgb_colors: number[] = [];
        let clear_ = 0;
        let blue_ = 0;
        let red_ = 0;
        let green_ = 0;
        let readingdata_: Buffer = pins.createBuffer(8);
        let buf3: Buffer = pins.createBuffer(1);

        buf3[0] = 208; //0xD0
        pins.i2cWriteBuffer(0x39, buf3, false);
        basic.pause(10);
        readingdata_ = pins.i2cReadBuffer(0x39, 8, false);
        basic.pause(300);
        buf3[0] = 224; //0xE0
        pins.i2cWriteBuffer(0x39, buf3, false);

        /*green_ = readingdata_[1] * 256 + readingdata_[0];
        red_ = readingdata_[3] * 256 + readingdata_[2];
        blue_ = readingdata_[5] * 256 + readingdata_[4];
        clear_ = readingdata_[7] * 256 + readingdata_[6];*/

        green_ = readingdata_.getNumber(NumberFormat.UInt8LE, 1) * 256 + readingdata_.getNumber(NumberFormat.UInt8LE, 0);
        red_ = readingdata_.getNumber(NumberFormat.UInt8LE, 3) * 256 + readingdata_.getNumber(NumberFormat.UInt8LE, 2);
        blue_ = readingdata_.getNumber(NumberFormat.UInt8LE, 5) * 256 + readingdata_.getNumber(NumberFormat.UInt8LE, 4);
        clear_ = readingdata_.getNumber(NumberFormat.UInt8LE, 7) * 256 + readingdata_.getNumber(NumberFormat.UInt8LE, 6);

        /*let tmp;
        let maxColor;
        if (ledStatus == true) {
            red_ = red_ * 1.7;
            blue_ = blue_ * 1.35;
            maxColor = Math.max(red_, green_);
            maxColor = Math.max(maxColor, blue_);
            if (maxColor > 255) {
                tmp = 250 / maxColor;
                green_ *= tmp;
                red_ *= tmp;
                blue_ *= tmp;
            }
        } else {
            maxColor = Math.max(red_, green_);
            maxColor = Math.max(maxColor, blue_);
            tmp = 250 / maxColor;
            green_ *= tmp;
            red_ *= tmp;
            blue_ *= tmp;
        }
        let minColor = Math.min(red_, green_);
        minColor = Math.min(minColor, blue_);
        maxColor = Math.max(red_, green_);
        maxColor = Math.max(maxColor, blue_);
        let greenTmp = green_;
        let redTmp = red_;
        let blueTmp = blue_;
        // when turn on LED, need to adjust the RGB
        // data,otherwise it is almost the white color
        if ((red_ < (0.8 * maxColor)) && (red_ >= (0.6 * maxColor))) {
            red_ *= 0.4;
        } else if (red_ < (0.6 * maxColor)) {
            red_ *= 0.2;
        }
        if ((green_ < (0.8 * maxColor)) && (green_ >= (0.6 * maxColor))) {
            green_ *= 0.4;
        } else if (green_ < (0.6 * maxColor)) {
            if ((maxColor == redTmp) && (greenTmp >= (2 * blueTmp)) && (greenTmp >= (0.2 * redTmp))) {
                green_ *= 5;
            }
            green_ *= 0.2;
        }
        if ((blue_ < (0.8 * maxColor)) && (blue_ >= (0.6 * maxColor))) {
            blue_ *= 0.4;
        } else if (blue_ < (0.6 * maxColor)) {
            if ((maxColor == redTmp) && (greenTmp >= (2 * blueTmp)) && (greenTmp >= (0.2 * redTmp))) {
                blue_ *= 0.5;
            }
            if ((maxColor == redTmp) && (greenTmp <= blueTmp) && (blueTmp >= (0.2 * redTmp))) {
                blue_ *= 5;
            }
            blue_ *= 0.2;
        }
        minColor = Math.min(red_, green_);
        minColor = Math.min(minColor, blue_);
        if (maxColor == green_ && red_ >= 0.85 * maxColor && minColor == blue_) {
            red_ = maxColor;
            blue_ *= 0.4;
        }
        red_ = Math.round(red_);
        green_ = Math.round(green_);
        blue_ = Math.round(blue_);*/
        rgb_colors = [red_, green_, green_, clear_];
        return rgb_colors;
    }
}