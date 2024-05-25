$(document).ready(function () {
  $(".btn-group").on("click", ".btn", function () {
    $(this).parent().children().removeClass("btn-success");
    $(this).parent().children().addClass("btn-secondary");
    $(this).removeClass("btn-secondary");
    $(this).addClass("btn-success");
  });
});
