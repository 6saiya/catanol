## esp32 debug
### erase
`sudo esptool.py --chip esp32 --port /dev/cu.SLAB_USBtoUART erase_flash`
### download
`sudo esptool.py --chip esp32 --port /dev/cu.SLAB_USBtoUART write_flash -z 0x1000 ~/Desktop/work/esp32-20180511-v1.9.4.bin`
### serail
`picocom -b 115200 /dev/cu.SLAB_USBtoUART`

## clond

### network
`
    import network
    sta_if = network.WLAN(network.STA_IF)
    sta_if.active(True)
    sta_if.scan()                             
    sta_if.connect("Timerry", "2018Bunny") 
    sta_if.isconnected()
`
### upload

`import urequests`

### test

`response = urequests.get('http://192.168.1.120:3000/getfs?id=fsdbhgrwh5&title=main&msg=def%20calc_sum(*args)%3A%0A%20%20%20%20ax%20%3D%200%0A%20%20%20%20for%20n%20in%20args%3A%0A%20%20%20%20%20%20%20%20ax%20%3D%20ax%20%2B%20n%0A%20%20%20%20return%20ax%0A%20%20%20%20%0Adef%20lazy_sum(*args)%3A%0A%20%20%20%20def%20sum()%3A%0A%20%20%20%20%20%20%20%20ax%20%3D%200%0A%20%20%20%20%20%20%20%20for%20n%20in%20args%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20ax%20%3D%20ax%20%2B%20n%0A%20%20%20%20%20%20%20%20return%20ax%0A%20%20%20%20return%20sum%0A%20%20%20%20')`

`print(response.text)`
   
### example upload 'boot.py'

`
    import urequests
    import os
    os.listdir(os.getcwd())
    f = open('boot.py', 'r')
    f.read()
    s = "# This file is executed on every boot (including wake-boot from deepsleep)\n#import esp\n#esp.osdebug(None)\n#import webrepl\n#webrepl.start()\n"
    print(s)
    f.close()
    get = 'http://192.168.1.120:3000/getfs?id=fsdbhgrwh5&title=boot&msg='
    response = urequests.get(get+s)

`





