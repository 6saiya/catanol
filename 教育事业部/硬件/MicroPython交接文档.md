## 更好的阅读文档
可以上传到Github或者用VS Code打开并预览

## 在micropython开发板中使用

    import network
    sta_if = network.WLAN(network.STA_IF)
    sta_if.airkiss() 返回当前状态
    sta_if.airkiss(True) 开启Airkiss（会强制切换到STA模式）
    sta_if.airkiss(False) 关闭Airkiss

## 虚拟机启动
系统为Ubuntu

登录的时候选择其他用户(也可以不用root，但我个人觉得这样权限高一些，跑命令就不那么麻烦了)
用户名：root
密码：2018Bunny

还有一个是安装的时候的新建的用户
用户名：Timerry
密码：2018Bunny

## ESP-IDF
由于Micropython官方文档建议使用Ubuntu系统，所以不选择在Windows下编译。

已经按照官方网站配置了编译环境：[ESP-IDF中文文档](https://docs.espressif.com/projects/esp-idf/zh_CN/v3.1.1/get-started/index.html)

从Github中拉取和配置ESP-IDF

    cd ~/esp
    git clone -b v3.1.1 --recursive https://github.com/espressif/esp-idf.git

    cd ~/esp/esp-idf
    git submodule update --init

在用户配置文件中添加 IDF_PATH
在 ~/.profile 文件中加入以下指令，创建 IDF_PATH：

    export IDF_PATH=~/esp/esp-idf

注销并重新登录以使此更改生效。

## 源码路径及说明
所有的源码都在/root/esp文件夹下

### 文件夹名及其作用
`esp-idf` `xtensa-esp32-idf` 为工具链文件夹，可以不用碰它

`micropython` 是实验性文件夹，可以删掉，也可以做实验，实验一些难以调试的程序代码段。

`micropython1` 是ESP32添加了Airkiss功能的文件夹

`micropython` -addfun是我研究micropython添加自定义命令的文件夹

`smart_config` 是ESP-IDF中的Airkiss配网示例源码

### MicroPython中ESP32部分源码编译及烧录
编译使用下面的命令

    cd ~/esp/micropython1/ports/esp32
    make

清除编译使用下面的命令

    make clean

烧录则使用下面的命令

    make deploy

### 编写Micropython建议使用的编辑器
我用的是Visual Studio Code编辑器

使用编辑器打开micropython1，可以在文件列表中看到我修改了哪些文件。

也可以使用Ctrl + ~ 进入终端，方便编译和调试

## 源码说明
下面说的文件都在路径：`~/esp/micropython1/ports/esp32` 下

`makefile`：请注意，这个makefile是首字母是小写的，配置了串口号、工具链路径，执行`make deploy`烧录时会调用这个串口号，具体说明请见MicroPython的官方说明：[Setting up the toolchain and ESP-IDF](https://github.com/micropython/micropython/tree/master/ports/esp32#setting-up-the-toolchain-and-esp-idf)

### main.c

`main.c`：程序的入口在这儿，我没有删掉Airkiss的源码，因为开机自启动Airkiss配网可能需要用到，如果需要开机自启动，可以去掉`initialise_wifi`下的注释

    // ESP_ERROR_CHECK( esp_wifi_init(&cfg) );
    // ESP_ERROR_CHECK( esp_wifi_set_mode(WIFI_MODE_STA) );
    // ESP_ERROR_CHECK( esp_wifi_start() );

为

    ESP_ERROR_CHECK( esp_wifi_init(&cfg) );
    ESP_ERROR_CHECK( esp_wifi_set_mode(WIFI_MODE_STA) );
    ESP_ERROR_CHECK( esp_wifi_start() );

这样便会开机启动WIFI，设置WIFI为STA模式（Airkiss在该模式下运行）

### modnetwork.c

`modnetwork.c`：自定义添加airkiss

建议使用VSCode查看我修改了哪些部分

    // #include <string.h>
    #include <stdlib.h>
    #include "freertos/FreeRTOS.h"
    #include "freertos/task.h"
    #include "freertos/event_groups.h"
    // #include "esp_wifi.h"
    #include "esp_wpa2.h"
    // #include "esp_event_loop.h"
    // #include "esp_log.h"
    #include "esp_system.h"
    // #include "nvs_flash.h"
    // #include "tcpip_adapter.h"
    #include "esp_smartconfig.h"

头文件，会调用ESP-IDF中的函数

    // airkiss的开启和关闭
    bool wifi_sta_airkiss = false;

这个建议看一下 `modnetwork.h`，`main.c` 文件会引用到这个变量

也就是当用户输入`sta_if.airkiss(True)`的时候，`wifi_sta_airkiss` 会设置为 `true`

`main.c` 会检测到这个变量发生了变化，选择是否加载 `Airkiss`

    STATIC mp_obj_t esp_initialize() {
        static int initialized = 0;
        if (!initialized) {
            // ESP_LOGD("modnetwork", "Initializing TCP/IP");
            // tcpip_adapter_init();
            // ESP_LOGD("modnetwork", "Initializing Event Loop");
            // ESP_EXCEPTIONS( esp_event_loop_init(event_handler, NULL) );
            // ESP_LOGD("modnetwork", "esp_event_loop_init done");
            initialized = 1;
        }
        return mp_const_none;
    }

注释掉代码是为了修复官方airkiss与micropython有冲突这一问题


    // ---------------------------------------------
    STATIC mp_obj_t esp_airkiss(size_t n_args, const mp_obj_t *args) {
        // self是获取是STA模式还是AP模式
        wlan_if_obj_t *self = MP_OBJ_TO_PTR(args[0]);

        // 判断wifi是否设置了STA或者AP 如果没有 返回WIFI_MODE_NULL
        wifi_mode_t mode;
        if (!wifi_started) {
            mode = WIFI_MODE_NULL;
        } else {
            // 储存当前的WIFI模式到mode
            ESP_EXCEPTIONS(esp_wifi_get_mode(&mode));
        }

        int bit = (self->if_id == WIFI_IF_STA) ? WIFI_MODE_STA : WIFI_MODE_AP;

        if (n_args > 1) {
            // 判断是True还是False 指定airkiss开还是关
            bool airkiss = mp_obj_is_true(args[1]);
            mode = airkiss ? (mode | bit) : (mode & ~bit);

            if (airkiss) {
                // 如果用户设置为True，则airkiss状态设置为True
                wifi_sta_airkiss = true;
            } else {
                // 如何用户设置为False，则airkiss状态设置为False
                wifi_sta_airkiss = false;
            }

            // 如果未定义STA和AP 停止WIFI 禁用WIFI
            if (mode == WIFI_MODE_NULL) {
                if (wifi_started) {
                    ESP_EXCEPTIONS(esp_wifi_stop());
                    wifi_started = false;
                }
            // 如果是处于STA模式，可以使用airkiss
            } else if (mode == WIFI_MODE_STA) {
                ESP_EXCEPTIONS(esp_wifi_set_mode(mode));
                if (!wifi_started) {
                    ESP_EXCEPTIONS(esp_wifi_start());
                    wifi_started = true;
                }
                // 下面是airkiss的运行
            // 其它情况下airkiss可能不正常，这段函数先保留
            // 想了一下，可能会遇到AP模式，需要切换到STA模式才能正常的使用airkiss
            } else {
                ESP_EXCEPTIONS(esp_wifi_set_mode(mode));
                if (!wifi_started) {
                    ESP_EXCEPTIONS(esp_wifi_start());
                    wifi_started = true;
                }
            }
        }

        return (mode & bit) ? mp_const_true : mp_const_false;
    }

    STATIC MP_DEFINE_CONST_FUN_OBJ_VAR_BETWEEN(esp_airkiss_obj, 1, 2, esp_airkiss);

    // ---------------------------------------------

这是我添加的自定义airkiss的关键源码 能添加注释的地方我已经注释了说明

其中 `STATIC MP_DEFINE_CONST_FUN_OBJ_VAR_BETWEEN(esp_airkiss_obj, 1, 2, esp_airkiss);` 是将`esp_airkiss()`函数注册到`network.WLAN(network.STA_IF)`这一事件中，也就是执行

    sta_if = network.WLAN(network.STA_IF)
    sta_if.airkiss()

命令时，会运行`esp_airkiss()`这一函数

其中`sta_if.airkiss()`的`airkiss()`自定义是：

STATIC const mp_rom_map_elem_t wlan_if_locals_dict_table[] = {
    { MP_ROM_QSTR(MP_QSTR_active), MP_ROM_PTR(&esp_active_obj) },
    { MP_ROM_QSTR(MP_QSTR_airkiss), MP_ROM_PTR(&esp_airkiss_obj) },
    { MP_ROM_QSTR(MP_QSTR_connect), MP_ROM_PTR(&esp_connect_obj) },
    { MP_ROM_QSTR(MP_QSTR_disconnect), MP_ROM_PTR(&esp_disconnect_obj) },
    { MP_ROM_QSTR(MP_QSTR_status), MP_ROM_PTR(&esp_status_obj) },
    { MP_ROM_QSTR(MP_QSTR_scan), MP_ROM_PTR(&esp_scan_obj) },
    { MP_ROM_QSTR(MP_QSTR_isconnected), MP_ROM_PTR(&esp_isconnected_obj) },
    { MP_ROM_QSTR(MP_QSTR_config), MP_ROM_PTR(&esp_config_obj) },
    { MP_ROM_QSTR(MP_QSTR_ifconfig), MP_ROM_PTR(&esp_ifconfig_obj) },
};

中`{ MP_ROM_QSTR(MP_QSTR_airkiss), MP_ROM_PTR(&esp_airkiss_obj) },` 这一句话注册的

    MP_QSTR_airkiss

也就是 `MP_QSTR_xxx` 中的xxx就是你要自定义的命令

    &esp_airkiss_obj 

这个是绑定的事件，可以用 ctrl + f 搜索 `esp_airkiss_obj`

### modnetwork.h
    // airkiss的开启和关闭
    bool wifi_sta_airkiss = false;

添加了这些

在`mian.c`和`modnetwork.h`都会调用到`wifi_sta_airkiss`这个变量，具体说明请见`modnetwork.c`