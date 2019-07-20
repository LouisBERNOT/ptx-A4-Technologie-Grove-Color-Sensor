/**
 * Utiliser le capteur de couleur Grove avec MicroBit V2 - Développée par A4 Technologie (www.a4.fr).
 * Dévellopeur : Louis Bernot - Caylar Instruments - 13/07/2019 - v1.0.0
 */

//% weight=100 color=#004696 icon="\uf121" block="Color Sensor A4 Techno 2" advanced=false
namespace A4_Color_Sensor_Grove_2 {

    //% blockId=A4_Color_Sensor_Grove_Init_2
    //% block="Initialiser le capteur de couleur 2"
    export function initColorSensor(): void {
        //setTimingReg
        pins.i2cWriteNumber(0x39, 0x81, NumberFormat.UInt8LE, true);
        pins.i2cWriteNumber(0x39, 0, NumberFormat.UInt8LE, false);
        basic.pause(10);
        //setInterruptSourceReg
        pins.i2cWriteNumber(0x39, 0x83, NumberFormat.UInt8LE, true);
        pins.i2cWriteNumber(0x39, 0x03, NumberFormat.UInt8LE, false);
        basic.pause(10);
        //setInterruptControlReg
        pins.i2cWriteNumber(0x39, 0x82, NumberFormat.UInt8LE, true);
        pins.i2cWriteNumber(0x39, 0x10, NumberFormat.UInt8LE, false);
        basic.pause(10);
        //setGain
        pins.i2cWriteNumber(0x39, 0x87, NumberFormat.UInt8LE, true);
        pins.i2cWriteNumber(0x39, 0x00, NumberFormat.UInt8LE, false);
        basic.pause(10);
        //setEnableADC
        pins.i2cWriteNumber(0x39, 0x80, NumberFormat.UInt8LE, true);
        pins.i2cWriteNumber(0x39, 0x03, NumberFormat.UInt8LE, false);
        basic.pause(10);
    }

    //% blockId=A4_Color_Sensor_Grove_GetRGB_2
    //% block="Lire couleur RGB led $ledStatus 2"
    //% ledStatus.shadow="toggleOnOff"
    export function getRGBColors(ledStatus: boolean): number[] {
        //let readingdata_: number[] = [];
        let rgb_colors: number[] = [];
        let clear_ = 0;
        let blue_ = 0;
        let red_ = 0;
        let green_ = 0;

        pins.i2cWriteNumber(0x39, 0xD0, NumberFormat.UInt8LE, false);
        basic.pause(10);

        let readingdata_: Buffer = pins.createBuffer(8);
        readingdata_ = pins.i2cReadBuffer(0x39, 8, false);

        
        /*readingdata_[0] = pins.i2cReadNumber(0x39, NumberFormat.UInt8LE, true);
        readingdata_[1] = pins.i2cReadNumber(0x39, NumberFormat.UInt8LE, true);
        readingdata_[2] = pins.i2cReadNumber(0x39, NumberFormat.UInt8LE, true);
        readingdata_[3] = pins.i2cReadNumber(0x39, NumberFormat.UInt8LE, true);
        readingdata_[4] = pins.i2cReadNumber(0x39, NumberFormat.UInt8LE, true);
        readingdata_[5] = pins.i2cReadNumber(0x39, NumberFormat.UInt8LE, true);
        readingdata_[6] = pins.i2cReadNumber(0x39, NumberFormat.UInt8LE, true);
        readingdata_[7] = pins.i2cReadNumber(0x39, NumberFormat.UInt8LE, false);*/

        basic.pause(300);

        pins.i2cWriteNumber(0x39, 0xE0, NumberFormat.UInt8LE, false);
        basic.pause(10);

        /*green_ = readingdata_[1] * 256 + readingdata_[0];
        red_ = readingdata_[3] * 256 + readingdata_[2];
        blue_ = readingdata_[5] * 256 + readingdata_[4];
        clear_ = readingdata_[7] * 256 + readingdata_[6];*/

        rgb_colors = [red_, green_, green_, clear_];
        return rgb_colors;
    }
}