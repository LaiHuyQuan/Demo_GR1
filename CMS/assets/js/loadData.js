var ProjectData;
var DeviceData = [];
$(document).ready(function () {
  async function fetchLayoutData() {
    try {
      const response = await $.ajax({
        url: "project_data.JSON",
        method: "GET",
        dataType: "json",
      });
      ProjectData = response;
      loadDeviceData(ProjectData);
      scale();
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  }

  function loadDeviceData(data) {
    DeviceData = data.Devices;
    for (var i = 0; i < DeviceData.length; i++) {
      var newOption =
        '<option value="' +
        DeviceData[i].deviceCode +
        '">' +
        DeviceData[i].deviceCode +
        "</option>";
      $("#idP1").append(newOption);
      $("#idP1-branch").append(newOption);
    }
  }

  $(".modal-body").on("change", "#idP1", function () {
    var selectedValue = $(this).val();
    populateChannel(selectedValue, "#chP1");
  });

  $(".modal-body").on("change", "#idP1-branch", function () {
    var selectedValue = $(this).val();
    reloadData();
    populateChannel(selectedValue, "#chP1-branch");
  });

  $(".modal-body").on("change", "#chP1-branch", function () {
    var selectedValue = $(this).val();
    var DeviceID = $(this).parent().parent().find("#idP1-branch").val();
    populateValue(selectedValue, DeviceID);
  });

  function reloadData() {
    $("#nameBranch").val(0);
    $("#branch-Itt-modal").val(0);
    $("#branch-Ptt-modal").val(0);
    $("#nextLevelBranch").val(0);
  }

  function populateValue(selectedValue, DeviceID) {
    var data = ProjectData.Channels;
    for (var i = 0; i < data.length; i++) {
      if (data[i].deviceID == DeviceID && data[i].chonch == selectedValue) {
        $("#nameBranch").val(data[i].name);
        $("#branch-Itt-modal").val(data[i].itt);
        $("#branch-Ptt-modal").val(data[i].ptt);
        $("#nextLevelBranch").val(data[i].itt);
      }
    }
  }

  function populateChannel(selectedValue, target) {
    var ChannelData = getChannelData(selectedValue, ProjectData.Channels);
    var selectInputs = $(target);
    // Xóa các lựa chọn hiện có
    selectInputs.empty();
    selectInputs.append('<option value="0" data-code="0">Channel</option>'); // Thêm một lựa chọn rỗng

    // Thêm các lựa chọn cho cấp độ hiện tại dựa trên giá trị đã chọn ở cấp độ trước
    if (ChannelData && ChannelData.length > 0) {
      ChannelData.forEach(function (item) {
        var option = $("<option>");
        option.text(item);
        option.val(item);
        selectInputs.append(option);
      });
    }
  }

  function getChannelData(selectedValue, data) {
    var ChannelData = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].deviceID == selectedValue) {
        ChannelData.push(data[i].chonch);
      }
    }
    return ChannelData;
  }

  fetchLayoutData();
});
