var noble = require('@abandonware/noble');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
noble.on('stateChange', async (state) => {
    await noble.startScanningAsync([], true);
    noble.on('discover', async (state) => {
        if (state.advertisement.localName === "MX Keys") {
            await state.connectAsync();
            state.once('connect', () => { console.log("connect") });
            state.once('disconnect', async () => {
                console.log("disconnect");
                await exec("sudo hidapitester -v --vidpid 046D:B023 --usagePage 0xFF43 --usage 0x0202 --open --length 20 --send-output 0x11,0x00,0x0A,0x1B,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00")
            });
        }
    });
});