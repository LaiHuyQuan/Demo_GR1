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
    console.log(1);
    if (bienapID.includes(cellId)) {
      rmShow();
      $("#bienap").removeClass("d-sm-none");
      addCarousel("#bienap");
    }
    if (daycapID.includes(cellId)) {
      rmShow();
      $("#daycap").removeClass("d-sm-none");
      addCarousel("#daycap");
    }
  }

  function rmShow() {
    $("#heatmap").addClass("d-sm-none");
    $("#bienap").addClass("d-sm-none");
    $("#daycap").addClass("d-sm-none");
  }

  // function addCarousel(ID){
  //   var newCarousel = '<div class="card-body p-3" id="newCarousel">'+
  //   '<div class="row">'+
  //     '<div class="col-3">'+
  //       '<div'+
  //         'class="nav flex-column nav-pills"'+
  //         'id="v-pills-tab"'+
  //         'role="tablist"'+
  //         'aria-orientation="vertical"'+
  //       '>'+
  //        ' <a'+
  //         '  class="nav-link active"'+
  //          ' id="v-pills-profile-tab"'+
  //           'data-bs-toggle="pill"'+
  //           'href="#v-pills-profile"'+
  //           'role="tab"'+
  //           'aria-controls="v-pills-profile"'+
  //           'aria-selected="false"'+
  //           'tabindex="-1"'+
  //           '>Thông số hoạt động</a'+
  //         '>'+
  //         '<a'+
  //          ' class="nav-link"'+
  //           'id="v-pills-settings-tab"'+
  //           'data-bs-toggle="pill"'+
  //           'href="#v-pills-settings"'+
  //           'role="tab"'+
  //           'aria-controls="v-pills-settings"'+
  //           'aria-selected="false"'+
  //           'tabindex="-1"'+
  //           '>Thiết lập, điều khiển</a'+
  //         '>'+
  //         '<a'+
  //          ' class="nav-link"'+
  //           'id="v-pills-home-tab"'+
  //           'data-bs-toggle="pill"'+
  //           'href="#v-pills-home"'+
  //           'role="tab"'+
  //           'aria-controls="v-pills-home"'+
  //           'aria-selected="false"'+
  //           'tabindex="-1"'+
  //           '>Thông số thiết kế</a'+
  //         '>'+
  //       '</div>'+
  //     '</div>'+
  //     '<div class="col-9">
  //       '<div
  //        ' class="tab-content overflow-auto"
  //         'style="height: 35vh"
  //         'id="v-pills-tabContent"
  //       '>
  //        ' <div
  //         '  class="tab-pane fade active show"
  //          ' id="v-pills-profile"
  //           'role="tabpanel"
  //           'aria-labelledby="v-pills-profile-tab"
  //         '>
  //          ' <div class="table-responsive">
  //           '  <table
  //           '    class="table table-hover mb-0 table-striped"
  //           '  >
  //           '    <thead>
  //           '      <tr>
  //            '       <th></th>
  //            '       <th>Pha A</th>
  //             '      <th>Pha B</th>
  //              '     <th>Pha C</th>
  //               '  </tr>
  //               '</thead>
  //               '<tbody>
  //                ' <tr>
  //                 '  <td style="font-weight: bold">U</td>
  //                  ' <td>220.3</td>
  //                  ' <td>220.3</td>
  //                   '<td>220.3</td>
  //                 '</tr>
  //                 '<tr>
  //                  ' <td style="font-weight: bold">I</td>
  //                   '<td>845</td>
  //                   '<td>896</td>
  //                   '<td>856</td>
  //                 '</tr>
  //                 '<tr>
  //                  ' <td style="font-weight: bold">P</td>
  //                   '<td>230</td>
  //                   '<td>245</td>
  //                   '<td>289</td>
  //                 '</tr>
  //                 '<tr>
  //                  ' <td style="font-weight: bold">Pf</td>
  //                   '<td>0.96</td>
  //                   '<td>0.93</td>
  //                   '<td>0.95</td>
  //                 '</tr>
  //                 '<tr>
  //                  ' <td style="font-weight: bold">Q</td>
  //                   '<td>-</td>
  //                   '<td>-</td>
  //                   '<td>-</td>
  //                 '</tr>
  //                 '<tr>
  //                  ' <td style="font-weight: bold">T</td>
  //                   '<td colspan="3">55&deg;C</td>
  //                 '</tr>
  //                 '<tr>
  //                  ' <td style="font-weight: bold">Pre</td>
  //                   '<td colspan="3">50.1 Hz</td>
  //                 '</tr>
  //               '</tbody>
  //             </table>
  //           </div>
  //         </div>
  //         <div
  //           class="tab-pane fade"
  //           id="v-pills-settings"
  //           role="tabpanel"
  //           aria-labelledby="v-pills-settings-tab"
  //         >
  //           <div class="form-group has-icon-left">
  //             <label for="password-id-icon">Mật khẩu</label>
  //             <div class="position-relative">
  //               <div class="input-group mb-3">
  //                 <input
  //                   type="password"
  //                   class="form-control"
  //                   placeholder="Password"
  //                   id="password-id-icon"
  //                 />
  //                 <div class="form-control-icon">
  //                   <i class="bi bi-lock"></i>
  //                 </div>
  //                 <button
  //                   class="btn btn-primary"
  //                   type="button"
  //                   id="button-addon1"
  //                 >
  //                   Xác minh
  //                 </button>
  //               </div>
  //               <p class="text-muted">Điều khiển</p>
  //               <div
  //                 class="btn-group btn-group-lg"
  //                 role="group"
  //                 aria-label="Basic example"
  //               >
  //                 <button type="button" class="btn">
  //                   ON
  //                 </button>
  //                 <button
  //                   type="button"
  //                   class="btn btn-primary"
  //                 >
  //                   OFF
  //                 </button>
  //               </div>
  //               <div
  //                 class="btn-group btn-group-lg"
  //                 role="group"
  //                 aria-label="Basic example"
  //               >
  //                 <button type="button" class="btn">
  //                   Mode 1
  //                 </button>
  //                 <button
  //                   type="button"
  //                   class="btn btn-primary"
  //                 >
  //                   Mode 2
  //                 </button>
  //                 <button type="button" class="btn">
  //                   Mode 3
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div
  //           class="tab-pane fade"
  //           id="v-pills-home"
  //           role="tabpanel"
  //           aria-labelledby="v-pills-home-tab"
  //         >
  //           <div class="table-responsive">
  //             <table
  //               class="table table-hover mb-0 table-striped"
  //             >
  //               <thead>
  //                 <tr>
  //                   <th></th>
  //                   <th>Dây cáp điện</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 <tr>
  //                   <td class="text-bold-500">Cỡ dây</td>
  //                   <td>2x2.5mm</td>
  //                 </tr>
  //                 <tr>
  //                   <td class="text-bold-500">Số lõi</td>
  //                   <td>3</td>
  //                 </tr>
  //                 <tr>
  //                   <td class="text-bold-500">Iđm</td>
  //                   <td>200A</td>
  //                 </tr>
  //                 <tr>
  //                   <td class="text-bold-500">Độ dài</td>
  //                   <td>65m</td>
  //                 </tr>
  //                 <tr>
  //                   <td class="text-bold-500">Hãng</td>
  //                   <td>CADIVI</td>
  //                 </tr>
  //               </tbody>
  //             </table>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>';

  // $("#bienap").append(newCarousel);
  // }
});
