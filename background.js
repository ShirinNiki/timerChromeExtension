chrome.alarms.create({ periodInMinutes: 1 / 60 });

chrome.alarms.onAlarm.addListener((alarms) => {
  chrome.storage.local.get(["timer", "isRunning"], function (result) {
    const time = result.timer ?? 0;
    const isRunning = result.isRunning ?? true;
    if (!isRunning) {
      return;
    }
    chrome.storage.local.set({ timer: time + 1 });
    chrome.action.setBadgeText({
      text: `${time + 1}`,
    });
    chrome.storage.sync.get(["notificationTime"], function (res) {
      const notificationTime = res.notificationTime;
      if (time % notificationTime == 0) {
        this.registration.showNotification("chorom timer Extention", {
          body: `${notificationTime} second passed!`,
          icon: "icon.png",
        });
      }
    });
  });
});