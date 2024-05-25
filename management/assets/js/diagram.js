var cell;
var timer;
let isLongPress = false;
let notLongPress;
let clickCount = 0;
let clickTimeout;
$(document).ready(function () {
  // click
  $(document).on("mousedown", ".joint-cell", async function () {
    notLongPress = false;

    timer = setTimeout(() => {
      var cellId = $(this).attr("model-id");
      if (cellId == 0) return;
      console.log("Cell được nhấn:", cellId);
      hold();
      isLongPress = true;
    }, 300);

    await new Promise((resolve) => {
      setTimeout(() => {
        if (!isLongPress) {
          notLongPress = true;
        }
        resolve();
      }, 300);
    });

    clickCount++;
    if (clickCount === 1) {
      clickTimeout = setTimeout(() => {
        if (clickCount === 1) {
          if (notLongPress) {
            var cellId = $(this).attr("model-id");
            console.log("Cell được click:", cellId);
          }
        } else {
          console.log("Double click");
        }
        clickCount = 0;
      }, 200);
    } else if (clickCount === 2) {
      clearTimeout(clickTimeout);
      clickCount = 0;
      console.log("Double click");
    }
  });

  $(document).on("mouseup", ".joint-cell", function () {
    clearTimeout(timer);
    isLongPress = false;
  });

  function hold() {
    var myModal = new bootstrap.Modal(document.getElementById("Modal"), {
      keyboard: false,
    });
    myModal.show();
  }
});
