function initApp() {
  console.log("App is initializing...");
  const rewardButton = document.getElementById("reward-button");
  if (rewardButton) {
    rewardButton.addEventListener("click", function () {
      alert("Reward button clicked!");
      handleRewards();
    });
  }
}
function handleRewards() {
  console.log("Handling rewards...");
}

document.addEventListener("DOMContentLoaded", initApp);
