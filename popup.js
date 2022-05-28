const timeElement = document.getElementById("time");
const nameElement = document.getElementById("name");
const timerElement = document.getElementById("timer");

function updateTimeElement() {
  const currentTime = new Date().toLocaleTimeString();
  timeElement.textContent = `The current time is: ${currentTime}`;

  chrome.storage.local.get(["timer"], function (result) {
    const timer = result.timer ?? 0;
    timerElement.textContent = `current time is ${timer}`;
  });
}
updateTimeElement();
setInterval(updateTimeElement, 1000);

chrome.storage.sync.get(["name"], function (result) {
  //?? only allows undefined and null values ==>> (if undefined) ?? (use this)
  const name = result.name ?? " honey!";
  nameElement.textContent = `Hello ${name}`;
});

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

startBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: true,
  });
});
stopBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: false,
  });
});
resetBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: false,
    timer: 0,
  });
  chrome.action.setBadgeText({
    text: `0`,
  });
});
