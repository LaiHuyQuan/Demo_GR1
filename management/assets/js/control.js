$(document).ready(function () {
  $(".btn-group").on("click", ".btn", function () {
    $(this).parent().children().removeClass("btn-primary");
    $(this).removeClass("btn-primary");
    $(this).addClass("btn-primary");
  });
});
