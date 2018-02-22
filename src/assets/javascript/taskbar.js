class Taskbar {
    static init() {
        Taskbar.updateWifi();
        Taskbar.updateTime();
    }

    static updateTime() {
        setInterval(() => {
            var docDate = new Date();
            document.getElementsByClassName("tb-time")[0].innerHTML = docDate.getHours() + ":" + docDate.getMinutes() + " " + (docDate.getHours >= 12 ? 'PM' : 'AM');
        }, 1000);
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
        }, 1000);
    }
}

onloadfuncs.push(Taskbar.init);
