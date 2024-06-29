$(document).ready(function () {
  // tạo khối project(prjList)
  function addProject(project, online, total) {
    var htmlString =
      '<div class="col-6 col-lg-3 col-md-6 prjBtn" data-info="' +
      project +
      '" >' +
      '<div class="card">' +
      '<div class="card-body px-4 py-4-5">' +
      '<div class="row">' +
      '<div class="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">' +
      '<div class="stats-icon purple mb-2">' +
      '<i class="fa-solid fa-eye fa-xs"></i>' +
      "</div>" +
      "</div>" +
      '<div class="col-md-8 col-lg-12 col-xl-12 col-xxl-7">' +
      '<h6 class="text-muted font-semibold">' +
      project +
      "</h6>" +
      '<h6 class="font-extrabold mb-0">On:' +
      online +
      "/" +
      total +
      "</h6>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";

    $(".prjList").append(htmlString); //thêm khối vào prjList
  }

  // API
  function fetchData() {
    $(".prjList").empty(); // reset bảng dự án
    $(".table-responsive").empty(); // reset bảng thiết bị
    $.ajax({
      url: "assets/data/test.json",
      method: "GET",
      dataType: "json",
      data: {
        json: '{"token":"O1L486UPS9MVY7jcihhe4idshRBb0TyD"}',
      },
      success: function (data) {
        // Xử lý dữ liệu khi yêu cầu thành công
        var result = countOnlineElements(data); // Đếm và tạo nút dự án
        console.log(result);
        createTable(data); // Tạo bảng dữ liệu
      },
      error: function (xhr, status, error) {
        // Xử lý lỗi khi yêu cầu thất bại
        console.error(status, error);
      },
    });
  }
  fetchData();
  setInterval(fetchData, 60000);

  // đếm thiết bị trong project || tạo khối
  function countOnlineElements(data) {
    var counts = {};

    $.each(data, function (project, projectData) {
      var onlineCount = 0;
      var totalCount = projectData.length;

      // đếm số thiết bị online
      $.each(projectData, function (index, item) {
        if (item[1] === "Online") {
          onlineCount++;
        }
      });
      // thông tin project
      counts[project] = {
        online: onlineCount,
        total: totalCount,
      };
      addProject(project, onlineCount, totalCount); // tạo khối project
    });
    return counts;
  }
  // tạo bảng theo dõi thiết bị
  function createTable(data) {
    $.each(data, function (parentName, childrenData) {
      var tableNameCSS = convertToValidCSSClass(parentName);
      var tableHTML =
        '<div class="table-container hide ' +
        tableNameCSS +
        ' " >' +
        '<div class ="table-hd-container">' +
        '<h3 class="table-hd ">' +
        parentName +
        "</h3>" +
        "<div>" +
        '<i class="fa-solid fa-sort" " data-info="' +
        tableNameCSS +
        '"></i>' +
        '<i class="fa-solid fa-x" " data-info="' +
        tableNameCSS +
        '"></i>' +
        "</div>" +
        "</div>" +
        '<table class="table table-lg ' +
        tableNameCSS +
        '">' +
        "<thead>" +
        "<tr>" +
        "<th>ID</th>" +
        "<th>STATUS</th>" +
        "<th>Lv1</th>" +
        "<th>Lv2</th>" +
        "<th>Lv3</th>" +
        "<th>Lv4</th>" +
        "</tr>" +
        "</thead>" +
        '<tbody class="' +
        tableNameCSS +
        '">';
      // kiểm tra trạng thái thiêt bị
      $.each(childrenData, function (index, childData) {
        if (childData[1] == "Online") {
          childStatus =
            "<td>" +
            '<span class="online">' +
            childData[1] +
            "</span>" +
            "</td>";
        } else {
          childStatus =
            "<td>" +
            '<span style="padding: 10px 15px">' +
            childData[1] +
            "</span>" +
            "</td>";
        }
        tableHTML +=
          '<tr data-original-index="' +
          index +
          '">' +
          '<td class="text-bold-500">' +
          childData[0] +
          "</td>" +
          childStatus +
          '<td class="text-bold-500">' +
          childData[2] +
          "</td>" +
          '<td class="text-bold-500">' +
          childData[3] +
          "</td>" +
          '<td class="text-bold-500">' +
          childData[4] +
          "</td>" +
          '<td class="text-bold-500">' +
          childData[5] +
          "</td>" +
          "</tr>";
      });

      tableHTML += "</tbody></table></div>";
      // tạo bảng
      $(".table-responsive").append(tableHTML);
    });
  }

  // hiển thị bảng theo dõi thiết bị
  $(".prjList").on("click", ".prjBtn", function closeTable() {
    // tìm đối tượng
    var tableName = $(this).data("info");
    // console.log(tableName)
    var tableNameCSS = convertToValidCSSClass(tableName);
    // console.log(tableNameCSS)
    var tableContainer = $(".table-container." + tableNameCSS);

    tableContainer.toggleClass("show"); // đánh dấu đối tượng
    $(".table-container:not(.show)").addClass("hide"); // ẩn bảng

    tableContainer.toggleClass("hide"); // hiện đối tượng
    tableContainer.toggleClass("show"); // xóa đánh dấu

    resetTable(tableNameCSS); //reset bảng
    $("." + tableNameCSS).removeClass("sorted");
  });
  // chuyển đổi tên dự án --> class
  function convertToValidCSSClass(str) {
    return str.replace(/\W+/g, "-").toLowerCase();
  }

  // sắp xếp thiết bị
  function sortDiviceByStatus(tableName) {
    var $tbody = $("." + tableName + " tbody");
    console.log($tbody);

    $tbody
      .find("tr")
      .sort(function (a, b) {
        var statusA = $(a).find("td:eq(1) span").text().trim();
        var statusB = $(b).find("td:eq(1) span").text().trim();

        // Sắp xếp online trước, sau đó là offline
        if (statusA === "Online" && statusB === "Offline") {
          return -1;
        } else if (statusA === "Offline" && statusB === "Online") {
          return 1;
        } else {
          return 0;
        }
      })
      .appendTo($tbody);
  }

  function resetTable(tableName) {
    var $tbody = $("." + tableName + " tbody");
    var $originalRows = $tbody
      .find("tr")
      .toArray()
      .sort(function (a, b) {
        return $(a).data("original-index") - $(b).data("original-index");
      });
    $tbody.empty().append($originalRows);
  }

  // click nút sort
  $(".card-body").on("click", ".fa-sort", function () {
    var tableName = $(this).data("info");
    console.log("ok");
    if (!$("." + tableName).hasClass("sorted")) {
      sortDiviceByStatus(tableName); // xếp bảng
      $("." + tableName).addClass("sorted");
      // console.log('1')
    } else {
      resetTable(tableName); //reset bảng
      $("." + tableName).removeClass("sorted");
      // console.log('2')
    }
  });

  // click nút close
  $(".card-body").on("click", ".fa-x", function () {
    console.log("ok");
    var tableName = $(this).data("info");
    var tableContainer = $(".table-container." + tableName);
    tableContainer.toggleClass("hide");
  });
});
