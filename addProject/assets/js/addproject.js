//  danh sách các thiết bị
var projectData = {
  projectCode: "",
  projectName: "",
  devices: [],
};

// structure dự án
var jsonStructure = {
  level0: [],
};

//mapping
var mapping = {
  CH1: ["A11", "A21", "A31", "P1", "P2", "P3"],
  CH2: ["A12", "A22", "A32"],
  CH3: ["A13", "A23", "A33"],
  CH4: ["A14", "A24", "A34"],
  CH5: ["A15", "A25", "A35"],
  CH6: ["A16", "A26", "A36"],
  CH7: ["A41", "A51", "A61"],
  CH8: ["A42", "A52", "A62"],
  CH9: ["A43", "A53", "A63"],
  CH10: ["A44", "A54", "A64"],
  CH11: ["A45", "A55", "A65"],
  CH12: ["A46", "A56", "A66"],
};
var reversedMapping = {};
for (var key in mapping) {
  if (mapping.hasOwnProperty(key)) {
    var values = mapping[key];
    for (var i = 0; i < values.length; i++) {
      var value = values[i];
      if (!reversedMapping.hasOwnProperty(value)) {
        reversedMapping[value] = [];
      }
      reversedMapping[value].push(key);
    }
  }
}

$(document).ready(function () {
  // mockup thêm thiết bị
  // mở
  $("#add-project").on("click", ".add-device-btn", function () {
    $(".device-container").removeClass("hide");
    createSelectInputsForLevels(".device-lv");
    var addDeviceIndex =
      '<button type="reset" class="btn btn-primary me-1 mb-1 device-add">Save</button>';
    $(".device-btns").append(addDeviceIndex);
    $("#ma").focus();
  });

  // thêm
  $(".add-device-mockup").on("click", ".device-add", function () {
    // đọc dữ liệu
    if (
      $("#ma").val() === "" ||
      $("#loaitb").val() === "" ||
      $("#loaitb").val() === null
    ) {
      alert("Điền đủ mã thiết bị và loại thiết bị");
      return;
    }

    var device = {
      code: $("#ma").val(),
      cabinet: $("#cabinet").val() || 0,
      date: $("#ngay").val() || 0,
      lv1: $(".level1-inputs").val() || 0,
      lv2: $(".level2-inputs").val() || 0,
      lv3: $(".level3-inputs").val() || 0,
      lv4: $(".level4-inputs").val() || 0,
      lv1code: $(".level1-inputs").find("option:selected").data("code"),
      lv2code: $(".level2-inputs").find("option:selected").data("code"),
      lv3code: $(".level3-inputs").find("option:selected").data("code"),
      lv4code: $(".level4-inputs").find("option:selected").data("code"),
      deviceType: $("#loaitb").val(),
      channels: [],
    };

    // kiểm tra mã thiết bị
    for (var i = 0; i < projectData.devices.length; i++) {
      var check = projectData.devices[i];
      if (device.code == check.code) {
        alert("Mã thiết bị đã tồn tại");
        return;
      }
    }

    // thêm thiết bị vào data
    projectData.devices.push(device);

    var newDevices =
      '<li class="sidebar-item  ">' +
      '<div class="device-added device-added-' +
      device.code +
      '">' +
      '<div class="device-hd" data-info="' +
      device.code +
      '" data-type="' +
      device.deviceType +
      '">' +
      "<span>" +
      device.code +
      " - " +
      device.deviceType +
      "</span>" +
      "</li>";
    $(".menu").append(newDevices);

    $(".color-gray").removeClass("color-gray");
    $(this).toggleClass("color-gray");
    $("#main").find(".device-added").remove();
    addProject(device);

    switch (device.deviceType) {
      case "1k3p":
        addChannelList1k3p(device.code);
        break;
      case "6k1p":
        addChannelList6k1p(device.code);
        break;
      case "6k3p":
        addChannelList6k3p(device.code);
        break;
      case "12k3p":
        addChannelList12k3p(device.code);
        break;
    }

    initializeTooltips();

    // đặt lại giá trị về mặc định
    $("#ma").val("");
    $("#cabinet").val("");
    $("#ngay").val("");
    $("#loaitb").val("");

    // ẩn mockup
    $(".device-lv").find(".mockup").remove();
    $(".device-add").remove();
    $(".device-container").addClass("hide");
  });

  // sửa
  $(".add-device").on("click", ".edit-device-btn", function () {
    $(this).parent().addClass("editing");
    $(".device-container").removeClass("hide");
    $(".add-device-mockup").find(".loaitb").prop("disabled", true);

    var deviceCode = $(this).data("info");
    createSelectInputsForLevels(".device-lv");
    for (var i = 0; i < projectData.devices.length; i++) {
      var device = projectData.devices[i];
      if (device.code == deviceCode) {
        $("#ma").val(device.code);
        $("#cabinet").val(device.cabinet);
        $("#ngay").val(device.date);
        $(".level1-inputs").val(device.lv1);
        populateSelectOptionsForLevel(device.lv1, 2);
        $(".level2-inputs").val(device.lv2);
        populateSelectOptionsForLevel(device.lv2, 3);
        $(".level3-inputs").val(device.lv3);
        populateSelectOptionsForLevel(device.lv3, 4);
        $(".level4-inputs").val(device.lv4);
        $("#loaitb").val(device.deviceType);
      }
    }

    var editDeviceIndex =
      '<button type="reset" class="btn btn-primary me-1 mb-1 edit-device-save" data-info="' +
      deviceCode +
      '">Save</button>';
    $(".device-btns").append(editDeviceIndex);
  });

  // lưu sau khi sửa
  $(".add-device-mockup").on("click", ".edit-device-save", function () {
    var deviceCode = $(".editing").data("info");
    $(".add-device-mockup").find(".loaitb").prop("disabled", false);
    for (var i = 0; i < projectData.devices.length; i++) {
      var device = projectData.devices[i];
      if (device.code == deviceCode) {
        device.code = $("#ma").val();
        device.cabinet = $("#cabinet").val();
        device.date = $("#ngay").val();
        device.lv1 = $(".level1-inputs").val();
        device.lv2 = $(".level2-inputs").val();
        device.lv3 = $(".level3-inputs").val();
        device.lv4 = $(".level4-inputs").val();
        device.lv1code = $(".level1-inputs")
          .find("option:selected")
          .data("code");
        device.lv2code = $(".level2-inputs")
          .find("option:selected")
          .data("code");
        device.lv3code = $(".level3-inputs")
          .find("option:selected")
          .data("code");
        device.lv4code = $(".level4-inputs")
          .find("option:selected")
          .data("code");
        break; // Kết thúc vòng lặp khi tìm thấy thiết bị cần chỉnh sửa
      }
    }
    $(".editing").removeClass("editing");
    $(".edit-device-save").remove();
    $(".device-container").addClass("hide");
    $(".device-lv").find(".mockup").remove();
  });

  // xóa
  $(".add-device").on("click", ".delete-device-btn", function () {
    var deviceID = $(this).data("info");
    var check = confirm("Are you sure you want to delete?");
    if (check) {
      $(this).parent().parent().remove();
    } else {
      return;
    }
    for (var i = 0; i < projectData.devices.length; i++) {
      var device = projectData.devices[i];
      if (device.code == deviceID) {
        projectData.devices.splice(i, 1);
        break;
      }
    }
    $(".menu")
      .find(".device-added-" + deviceID)
      .remove();
  });

  // chọn thiết bị
  $(".menu").on("click", ".device-hd", function () {
    $(".color-gray").removeClass("color-gray");
    $(this).toggleClass("color-gray");
    var deviceID = $(this).data("info");
    var deviceType = $(this).data("type");
    $("#main").find(".device-added").remove();
    for (var i = 0; i < projectData.devices.length; i++) {
      var device = projectData.devices[i];
      if (device.code == deviceID) {
        addProject(device);
      }
    }
    switch (deviceType) {
      case "1k3p":
        addChannelList1k3p(deviceID);
        break;
      case "6k1p":
        addChannelList6k1p(deviceID);
        break;
      case "6k3p":
        addChannelList6k3p(deviceID);
        break;
      case "12k3p":
        addChannelList12k3p(deviceID);
        break;
    }
    // khởi tạo danh sách thiết bị
    if (device.channels && device.channels.length > 0) {
      $(".device-added-" + device.code)
        .find("table")
        .remove();
      $("#main")
        .find(".device-added-" + device.code)
        .append(createchannelTable(device.code));
    }

    for (var i = 0; i < projectData.devices.length; i++) {
      if (projectData.devices[i].code == deviceID) {
        var foundDevice = projectData.devices[i];
        for (var j = 0; j < foundDevice.channels.length; j++) {
          if (mapping.hasOwnProperty(foundDevice.channels[j].chonch)) {
            var Values = mapping[foundDevice.channels[j].chonch];
            for (var k = 0; k < Values.length; k++) {
              $("#main")
                .find(".device-added-" + deviceID)
                .find(".channel-" + Values[k])
                .addClass("created");
            }
          }
          $("#main")
            .find(".device-added-" + deviceID)
            .find(".channel-" + foundDevice.channels[j].chonch)
            .addClass("created");
        }
      }
    }

    initializeTooltips();
  });

  // đóng
  $(".add-device-mockup").on("click", ".device-close", function (event) {
    event.preventDefault();
    $(".edit-device-save").remove();
    $(".device-add").remove();
    $(".add-device-mockup").find(".loaitb").prop("disabled", false);
    $(".device-container").addClass("hide");
    $(".device-lv").find(".mockup").remove();
  });

  // Hàm
  // tạo trang thông tin
  function addProject(device) {
    var newDevice =
      '<div class="device-added device-added-' +
      device.code +
      '" data-info="' +
      device.code +
      '">' +
      '<div style="border:1px #fff solid; padding-top:20px">' +
      '<div class="channel-diagram"></div>' +
      '<div class="channel-list" data-info="' +
      device.code +
      '"></div>' +
      "</div>" +
      '<div class="device-hd" data-info="' +
      device.code +
      '">' +
      "<span>" +
      device.code +
      " - " +
      device.cabinet +
      " - " +
      device.date +
      " - " +
      device.deviceType +
      "</span>" +
      '<span class="edit-device-btn" data-info="' +
      device.code +
      '"><i class="fa-solid fa-pen-to-square"></i> Edit Device</span>' +
      '<span class="delete-device-btn" data-info="' +
      device.code +
      '"><i class="fa-solid fa-trash"></i> Delete Device</span>';
    // '<span class="add-channel-btn" style="margin-right:10px" data-info="' + device.code + '" data-type="' + device.deviceType + '"><i class="fa-solid fa-plus"></i> Add channel</span>' +
    // '<i class="fa-solid fa-caret-down" data-info="' + device.code + '"></i>';

    // Thêm đối tượng mới vào DOM
    $(".add-device-main").append(newDevice);
    if (device.channels && device.channels.length > 0) {
      $(".device-added-" + device.code)
        .find("table")
        .remove();
      $("#main")
        .find(".device-added-" + device.code)
        .append(createchannelTable(device.code));
    }
  }

  //tạo danh sách kênh
  function addChannelList1k3p(deviceID) {
    var list = ["CH1"];
    for (var i = 0; i < list.length; i++) {
      var chonch = list[i];
      var channelID = i + 1;
      $(".channel-diagram").append(
        createChannelLink(channelID, chonch, deviceID)
      );
    }
    var channelList = ["CT A", "CT B", "CT C"];
    var PhaseA = $("<div></div>").addClass("Phase");
    for (var i = 1; i <= 3; i++) {
      var chonch = "P" + i;
      var button = createSVGButton(deviceID, chonch, channelList[i - 1]);
      PhaseA.append(button);
    }
    $(".channel-list").append(PhaseA);
    var img = '<img src="./assets/img/1k3p.png" alt="" style="width: 100%">';
    $(".channel-list").parent().append(img);
  }

  function addChannelList6k1p(deviceID) {
    var channelList = ["C6", "C5", "C4", "C3", "C2", "C1"];
    var PhaseA = $("<div></div>").addClass("Phase");
    for (var i = 6; i >= 1; i--) {
      var chonch = "A1" + i;
      var button = createSVGButton(deviceID, chonch, channelList[i - 1]);
      PhaseA.append(button);
    }
    $(".channel-list").append(PhaseA);
    var img =
      '<img src="./assets/img/6k1p.png" alt="" style="width: 100%; background-color: #000">';
    $(".channel-list").parent().append(img);
  }

  function addChannelList6k3p(deviceID) {
    var list = ["CH1", "CH2", "CH3", "CH4", "CH5", "CH6"];
    for (var i = 0; i < list.length; i++) {
      var chonch = list[i];
      var channelID = i + 1; // Sử dụng chỉ số i + 1 để tạo ID cho mỗi kênh
      $(".channel-diagram").append(
        createChannelLink(channelID, chonch, deviceID)
      );
    }
    var channelList = ["01", "02", "03", "04", "05", "06"];
    var PhaseA = $("<div></div>").addClass("PhaseA");
    for (var i = 1; i <= 6; i++) {
      var chonch = "A1" + i;
      var button = createSVGButton(deviceID, chonch, channelList[i - 1]);
      PhaseA.append(button);
    }
    $(".channel-list").append(PhaseA);
    var PhaseB = $("<div></div>").addClass("PhaseB");
    for (var i = 1; i <= 6; i++) {
      var chonch = "A2" + i;
      var button = createSVGButton(deviceID, chonch, channelList[i - 1]);
      PhaseB.append(button);
    }
    $(".channel-list").append(PhaseB);
    var PhaseC = $("<div></div>").addClass("PhaseC");
    for (var i = 1; i <= 6; i++) {
      var chonch = "A3" + i;
      var button = createSVGButton(deviceID, chonch, channelList[i - 1]);
      PhaseC.append(button);
    }
    $(".channel-list").append(PhaseC);
    var img = '<img src="./assets/img/6k3p.png" alt="" style="width: 100%">';
    $(".channel-list").parent().append(img);
  }

  function addChannelList12k3p(deviceID) {
    var list = [
      "CH1",
      "CH2",
      "CH3",
      "CH4",
      "CH5",
      "CH6",
      "CH7",
      "CH8",
      "CH9",
      "CH10",
      "CH11",
      "CH12",
    ];
    for (var i = 0; i < list.length; i++) {
      var chonch = list[i];
      var channelID = i + 1; // Sử dụng chỉ số i + 1 để tạo ID cho mỗi kênh
      $(".channel-diagram").append(
        createChannelLink(channelID, chonch, deviceID)
      );
    }

    var channelList = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    var PhaseA = $("<div></div>").addClass("PhaseA");
    for (var i = 1; i <= 6; i++) {
      var chonch = "A1" + i;
      var button = createSVGButton(deviceID, chonch, channelList[i - 1]);
      PhaseA.append(button);
    }
    for (var i = 1; i <= 6; i++) {
      var chonch = "A4" + i;
      var button = createSVGButtonBot(deviceID, chonch, channelList[i + 5]);
      PhaseA.append(button);
    }
    $(".channel-list").append(PhaseA);
    var PhaseB = $("<div></div>").addClass("PhaseB");
    for (var i = 1; i <= 6; i++) {
      var chonch = "A2" + i;
      var button = createSVGButton(deviceID, chonch, channelList[i - 1]);
      PhaseB.append(button);
    }
    for (var i = 1; i <= 6; i++) {
      var chonch = "A5" + i;
      var button = createSVGButtonBot(deviceID, chonch, channelList[i + 5]);
      PhaseB.append(button);
    }
    $(".channel-list").append(PhaseB);
    var PhaseC = $("<div></div>").addClass("PhaseC");
    for (var i = 1; i <= 6; i++) {
      var chonch = "A3" + i;
      var button = createSVGButton(deviceID, chonch, channelList[i - 1]);
      PhaseC.append(button);
    }
    for (var i = 1; i <= 6; i++) {
      var chonch = "A6" + i;
      var button = createSVGButtonBot(deviceID, chonch, channelList[i + 5]);
      PhaseC.append(button);
    }
    $(".channel-list").append(PhaseC);
    var img = '<img src="./assets/img/12k3p.png" alt="" style="width: 100%">';
    $(".channel-list").parent().append(img);
  }

  function createChannelLink(i, chonch, deviceID) {
    var html =
      '<div class="channel-link-' +
      i +
      ' channel-link" data-info="' +
      chonch +
      '">' +
      '<span class="' +
      chonch +
      '-channel channel1phase" data-chonch="' +
      chonch +
      '" data-chonpha="3 pha" data-deviceid="' +
      deviceID +
      '">' +
      chonch +
      "</span> </div>";
    return html;
  }
  // tạo nút chọn kênh
  function createSVGButton(deviceID, chonch, text) {
    var div = $("<div></div>")
      .addClass("channel")
      .addClass("channel-" + chonch)
      .data("chonch", chonch)
      .data("chonpha", "1 pha")
      .data("deviceid", deviceID)
      .attr("data-bs-toggle", "tooltip")
      .attr("data-bs-placement", "top")
      .prop("title", chonch);

    var svg = '<img src="./assets/img/test.svg" alt="">';
    div.append(svg);
    var span = $("<span></span>").text(text);
    div.append(span);
    return div;
  }

  function createSVGButtonBot(deviceID, chonch, text) {
    var div = $("<div></div>")
      .addClass("channel")
      .addClass("channel-" + chonch)
      .data("chonch", chonch)
      .data("chonpha", "1 pha")
      .data("deviceid", deviceID)
      .attr("data-bs-toggle", "tooltip")
      .attr("data-bs-placement", "bottom")
      .prop("title", chonch);

    var svg = '<img src="./assets/img/test.svg" alt="">';
    div.append(svg);
    var span = $("<span></span>").text(text);
    div.append(span);
    return div;
  }

  // hiệu ứng
  $("input").on("keypress keydown", function (event) {
    if (event.which === 13) {
      event.preventDefault();
    }
  });

  function initializeTooltips() {
    $("#main")
      .children()
      .each(function () {
        $(this)
          .find(".channel")
          .each(function () {
            $(this).tooltip({
              placement: $(this).data("bs-placement"),
              title: $(this).attr("title"),
            });
          });
      });
  }

  var hoverTimer;
  $("#main").on("mouseenter", ".channel1phase", function () {
    hoverTimer = setTimeout(function () {
      var Values = mapping[link];
      for (var i = 0; i < Values.length; i++) {
        $("#main")
          .find(".channel-" + Values[i])
          .addClass("related-link");
      }
    }, 200);

    var link = $(this).data("chonch");
  });

  $("#main").on("mouseleave", ".channel1phase", function () {
    clearTimeout(hoverTimer);
    var link = $(this).data("chonch");
    hoverTimer = setTimeout(function () {
      var Values = mapping[link];
      for (var i = 0; i < Values.length; i++) {
        $("#main")
          .find(".channel-" + Values[i])
          .removeClass("related-link");
      }
    }, 200);
  });
  // end
});
