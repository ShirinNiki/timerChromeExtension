const nameInput = document.getElementById("name-input");
const timeInput = document.getElementById("time-input");
const savebtn = document.getElementById("save-btn");

savebtn.addEventListener("click", () => {
  const name = nameInput.value;
  const notificationTime = timeInput.value;
  chrome.storage.sync.set(
    {
      name,
      notificationTime,
    },
    function () {
      console.log("Value is set to " + name);
    }
  );
});

chrome.storage.sync.get(["name", "notificationTime"], function (result) {
  nameInput.value = result.name ?? "...";
  timeInput.value = result.notificationTime ?? 1000;
  console.log("Value currently is " + result.name);
});
