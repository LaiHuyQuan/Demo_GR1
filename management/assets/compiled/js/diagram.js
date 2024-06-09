var cell;
var timer;
let isLongPress = false;
let notLongPress;
let clickCount = 0;
let clickTimeout;
var bienapID = ["a27", "a28", "a29"];
var daycapID = ["a30", "a31", "a32"];
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
            checkClickCells(cellId);
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

  function checkClickCells(cellId) {
    if (bienapID.includes(cellId)) {
      rmShow();
      $("#bienap").removeClass("d-sm-none");
      addCarousel("#bienap", cellId);
    }
    if (daycapID.includes(cellId)) {
      rmShow();
      $("#daycap").removeClass("d-sm-none");
      addCarousel("#daycap", cellId);
    }
  }

  function rmShow() {
    $("#newCarousel").remove();
    $("#heatmap").addClass("d-sm-none");
    $("#bienap").addClass("d-sm-none");
    $("#daycap").addClass("d-sm-none");
  }

  function addCarousel(type, ID) {
    var newCarousel =
      '<div class="card-body p-3" id="newCarousel">' +
      '<div class="row">' +
      '<div class="col-3">' +
      '<div class="nav flex-column nav-pills"' +
      'id="v-pills-tab"' +
      'role="tablist"' +
      'aria-orientation="vertical">' +
      ' <a class="nav-link active"' +
      'id="v-pills-profile-tab"' +
      'data-bs-toggle="pill"' +
      'href="#v-pills-profile"' +
      'role="tab"' +
      'aria-controls="v-pills-profile"' +
      'aria-selected="false"' +
      'tabindex="-1">' +
      "Thông số hoạt động</a>" +
      '<a class="nav-link"' +
      'id="v-pills-settings-tab"' +
      'data-bs-toggle="pill"' +
      'href="#v-pills-settings"' +
      'role="tab"' +
      'aria-controls="v-pills-settings"' +
      'aria-selected="false"' +
      'tabindex="-1">' +
      "Thiết lập, điều khiển</a>" +
      '<a class="nav-link"' +
      'id="v-pills-home-tab"' +
      'data-bs-toggle="pill"' +
      'href="#v-pills-home"' +
      'role="tab"' +
      'aria-controls="v-pills-home"' +
      'aria-selected="false"' +
      'tabindex="-1">' +
      "Thông số thiết kế</a>" +
      "</div>" +
      "</div>" +
      '<div class="col-9">' +
      '<div class="tab-content overflow-auto"' +
      'style="height: 35vh"' +
      'id="v-pills-tabContent">' +
      '<div class="tab-pane fade active show"' +
      'id="v-pills-profile"' +
      'role="tabpanel"' +
      'aria-labelledby="v-pills-profile-tab">' +
      "</div>" +
      '<div class="tab-pane fade"' +
      'id="v-pills-settings"' +
      'role="tabpanel"' +
      'aria-labelledby="v-pills-settings-tab">' +
      '<div class="form-group has-icon-left">' +
      '<label for="password-id-icon">Mật khẩu</label>' +
      '<div class="position-relative">' +
      '<div class="input-group mb-3">' +
      '<input type="password"' +
      'class="form-control"' +
      'placeholder="Password"' +
      'id="password-id-icon"/>' +
      '<div class="form-control-icon">' +
      '<i class="bi bi-lock"></i>' +
      "</div>" +
      '<button class="btn btn-primary"' +
      'type="button"' +
      'id="button-addon1">' +
      "Xác minh" +
      "</button>" +
      "</div>" +
      '<p class="text-muted">Điều khiển</p>' +
      '<div class="btn-group btn-group-lg"' +
      'role="group"' +
      'aria-label="Basic example">' +
      '<button type="button" class="btn">' +
      "ON" +
      "</button>" +
      '<button type="button" class="btn btn-primary">' +
      "OFF" +
      "</button>" +
      "</div>" +
      '<div class="btn-group btn-group-lg"' +
      'role="group"' +
      'aria-label="Basic example">' +
      '<button type="button" class="btn">' +
      "Mode 1" +
      "</button>" +
      '<button type="button" class="btn btn-primary">' +
      "Mode 2" +
      "</button>" +
      '<button type="button" class="btn">' +
      "Mode 3" +
      "</button>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="tab-pane fade"' +
      'id="v-pills-home"' +
      'role="tabpanel"' +
      'aria-labelledby="v-pills-home-tab">' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";

    $(type).find(".card").append(newCarousel);

    switch (type) {
      case "#daycap":
        addTableForDaycap(type, ID);
        break;
      case "#bienap":
        addTableForBienap(type, ID);
        break;
      default:
        console.log("ID không hợp lệ");
        break;
    }
  }

  function addTableForDaycap(type, ID) {
    var data;
    for (var i = 0; i < Daycap.length; i++) {
      if (Daycap[i].id == ID) {
        data = Daycap[i];
      }
    }

    var hoatdong = data.hoatdong;
    var thietke = data.thietke;

    var newTable =
      '<div class="table-responsive">' +
      '<table class="table table-hover mb-0 table-striped" style="text-align:center">' +
      "<thead>" +
      "<tr>" +
      "<th></th>" +
      "<th>Pha A</th>" +
      "<th>Pha B</th>" +
      "<th>Pha C</th>" +
      "</tr>" +
      "</thead>" +
      "<tbody>" +
      "<tr>" +
      '<td style="font-weight: bold">U</td>' +
      "<td>" +
      hoatdong.U[0] +
      "</td>" +
      "<td>" +
      hoatdong.U[1] +
      "</td>" +
      "<td>" +
      hoatdong.U[2] +
      "</td>" +
      "</tr>" +
      "<tr>" +
      '<td style="font-weight: bold">I</td>' +
      "<td>" +
      hoatdong.I[0] +
      "</td>" +
      "<td>" +
      hoatdong.I[1] +
      "</td>" +
      "<td>" +
      hoatdong.I[2] +
      "</td>" +
      "</tr>" +
      "<tr>" +
      '<td style="font-weight: bold">P</td>' +
      "<td>" +
      hoatdong.P[0] +
      "</td>" +
      "<td>" +
      hoatdong.P[1] +
      "</td>" +
      "<td>" +
      hoatdong.P[2] +
      "</td>" +
      "</tr>" +
      "<tr>" +
      '<td style="font-weight: bold">Pf</td>' +
      "<td>" +
      hoatdong.Pf[0] +
      "</td>" +
      "<td>" +
      hoatdong.Pf[1] +
      "</td>" +
      "<td>" +
      hoatdong.Pf[2] +
      "</td>" +
      "</tr>" +
      "<tr>" +
      '<td style="font-weight: bold">Q</td>' +
      "<td>" +
      hoatdong.Q[0] +
      "</td>" +
      "<td>" +
      hoatdong.Q[1] +
      "</td>" +
      "<td>" +
      hoatdong.Q[2] +
      "</td>" +
      "</tr>" +
      "<tr>" +
      '<td style="font-weight: bold">T</td>' +
      '<td colspan="3">' +
      hoatdong.T +
      "&deg;C</td>" +
      "</tr>" +
      "<tr>" +
      '<td style="font-weight: bold">Pre</td>' +
      '<td colspan="3">' +
      hoatdong.Pre +
      " Hz</td>" +
      "</tr>" +
      "</tbody>" +
      "</table>" +
      "</div>";

    $(type).find("#v-pills-profile").append(newTable);

    var newTable1 =
      '<div class="table-responsive">' +
      '<table class="table table-hover mb-0 table-striped">' +
      "<thead>" +
      "<tr>" +
      "<th></th>" +
      "<th>Dây cáp điện</th>" +
      "</tr>" +
      "</thead>" +
      "<tbody>" +
      "<tr>" +
      '<td class="text-bold-500">Cỡ dây</td>' +
      "<td>" +
      thietke.coday +
      "mm</td>" +
      "</tr>" +
      "<tr>" +
      '<td class="text-bold-500">Số lõi</td>' +
      "<td>" +
      thietke.soloi +
      "</td>" +
      "</tr>" +
      "<tr>" +
      '<td class="text-bold-500">Iđm</td>' +
      "<td>" +
      thietke.idm +
      "A</td>" +
      "</tr>" +
      "<tr>" +
      '<td class="text-bold-500">Độ dài</td>' +
      "<td>" +
      thietke.dodai +
      "m</td>" +
      "</tr>" +
      "<tr>" +
      '<td class="text-bold-500">Hãng</td>' +
      "<td>" +
      thietke.hang +
      "</td>" +
      "</tr>" +
      "</tbody>" +
      "</table>" +
      "</div>";

    $(type).find("#v-pills-home").append(newTable1);
  }

  function addTableForBienap(type, ID) {
    var data;
    for (var i = 0; i < Bienap.length; i++) {
      if (Bienap[i].id == ID) {
        data = Bienap[i];
      }
    }
    console.log(data);

    var hoatdong = data.hoatdong;
    var thietke = data.thietke;
    var newTable =
      `
<div class="table-responsive table-bot">
    <div class="table-responsive">
        <table class="table table-hover mb-0 table-striped">
            <thead>
                <tr>
                    <th></th>
                    <th>Pha A</th>
                    <th>Pha B</th>
                    <th>Pha C</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="font-weight: bold">U</td>
                    <td>` +
      hoatdong.U[0] +
      `</td>
                    <td>` +
      hoatdong.U[1] +
      `</td>
                    <td>` +
      hoatdong.U[2] +
      `</td>
                </tr>
                <tr>
                    <td style="font-weight: bold">I</td>
                    <td>` +
      hoatdong.I[0] +
      `</td>
                    <td>` +
      hoatdong.I[1] +
      `</td>
                    <td>` +
      hoatdong.I[2] +
      `</td>
                </tr>
                <tr>
                    <td style="font-weight: bold">P</td>
                    <td>` +
      hoatdong.P[0] +
      `</td>
                    <td>` +
      hoatdong.P[1] +
      `</td>
                    <td>` +
      hoatdong.P[2] +
      `</td>
                </tr>
                <tr>
                    <td style="font-weight: bold">Pf</td>
                    <td>` +
      hoatdong.Pf[0] +
      `</td>
                    <td>` +
      hoatdong.Pf[1] +
      `</td>
                    <td>` +
      hoatdong.Pf[2] +
      `</td>
                </tr>
                <tr>
                    <td style="font-weight: bold">Q</td>
                    <td>` +
      hoatdong.Q[0] +
      `</td>
                    <td>` +
      hoatdong.Q[1] +
      `</td>
                    <td>` +
      hoatdong.Q[2] +
      `</td>
                </tr>
                <tr>
                    <td style="font-weight: bold">T</td>
                    <td colspan="3" style="text-align: center">` +
      hoatdong.T +
      `&deg;C</td>
                </tr>
                <tr>
                    <td style="font-weight: bold">H</td>
                    <td colspan="3" style="text-align: center">` +
      hoatdong.H +
      `%</td>
                </tr>
                <tr>
                    <td style="font-weight: bold">Pre</td>
                    <td colspan="3" style="text-align: center">` +
      hoatdong.Pre +
      ` Hz</td>
                </tr>
                <tr>
                    <td style="font-weight: bold">STATUS</td>
                    <td colspan="3" style="background-color: #209935; text-align: center;">` +
      hoatdong.STATUS +
      `</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
`;

    $(type).find("#v-pills-profile").append(newTable);

    var newTable1 =
      `
    <div class="table-responsive">
        <table class="table table-hover mb-0 table-striped">
            <thead>
                <tr>
                    <th></th>
                    <th>Máy biến áp</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-bold-500">Tỉ số</td>
                    <td>` +
      thietke.tiso +
      `</td>
                </tr>
                <tr>
                    <td class="text-bold-500">Công suất</td>
                    <td>` +
      thietke.congsuat +
      `kVA</td>
                </tr>
                <tr>
                    <td class="text-bold-500">Un</td>
                    <td>` +
      thietke.Un +
      `V</td>
                </tr>
                <tr>
                    <td class="text-bold-500">Po</td>
                    <td>` +
      thietke.Po +
      `W</td>
                </tr>
                <tr>
                    <td class="text-bold-500">Pn</td>
                    <td>` +
      thietke.Pn +
      `W</td>
                </tr>
            </tbody>
        </table>
    </div>
    `;

    $(type).find("#v-pills-home").append(newTable1);
  }
});
