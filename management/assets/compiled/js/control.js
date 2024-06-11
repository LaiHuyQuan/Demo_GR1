$(document).ready(function () {
  $("#app").on("click", ".btn", function () {
    console.log(1);
    $(this).parent().children().removeClass("btn-primary");
    $(this).removeClass("btn-primary");
    $(this).addClass("btn-primary");
  });
});
