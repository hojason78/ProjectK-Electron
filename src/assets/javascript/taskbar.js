class Taskbar {
    static init() {
        Taskbar.updateWifi();
        Taskbar.updateTime();
    }

    static updateTime() {
        setInterval(() => {
            var docDate = new Date();
            document.getElementsByClassName("tb-time")[0].innerHTML = docDate.getHours() + ":" + (docDate.getMinutes() < 10 ? "0" + docDate.getMinutes() : docDate.getMinutes()) + " " + (docDate.getHours >= 12 ? 'PM' : 'AM');
        }, 5000);
    }

    static updateWifi() {
        setInterval(() => {
            try {
                if(navigator.onLine) {
                    document.getElementsByClassName("tb-wifi-status")[0].innerHTML = "network_wifi";
                } else {
                    document.getElementsByClassName("tb-wifi-status")[0].innerHTML = "signal_wifi_off";
                }
            } catch (e) {
                document.getElementsByClassName("tb-wifi-status")[0].innerHTML = "perm_scan_wifi";
            }
        }, 10000);
    }
}

onloadfuncs.push(Taskbar.init);
