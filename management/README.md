# Mô tả

Trang quản lý các thiết bị trong dự án

# Cấu trúc

**/assets/complied/css**
**/assets/complied/js**

```
app.js          //default
api.js          // các thao tác lấy dữu liệu từ api
chart.js        // các thao tác vẽ đồ thị
control.js      // thao tác thiết lập
diagram.js      // các thao tác với đồ thị
element.js      // thiết lập các element
management.js   // khởi tạo và vẽ đồ thị
```

# Hướng dẫn bảo trì

## 1.Thao tác lấy dữ liệu từ API(api.js)

### 1.1 Dữ liệu

#### 1.1.1: Biến lưu trữ

```
var diaData;  // Biến lưu trữ thông tin đồ thị
var heatmapData; //Biến lưu thông tin heatmap
var chartData;  //Biến lưu trữ thông tin biểu đồ
var phaseColor = ["#ff3838", "#fff200", "#18dcff"];
var c1name = ["Pha A", "Pha B", "Pha C"];
var lineChart = {}; // trạng thái đồ thị
var selectCells = [] // tọa độ các element
var Daycap = [];
var Bienap = [];
var Tudien = [];
var Dongcat = []; // biến lưu trữ thông tin thiết bị
```

#### 1.1.2: Biến lưu trữ element

```
var selectCells = [
  { x: 147, y: 250, w: 70, h: 50, id: "a1" },
  { x: 288, y: 250, w: 70, h: 50, id: "a2" },
  { x: 429, y: 250, w: 70, h: 50, id: "a3" },
  { x: 573, y: 250, w: 70, h: 50, id: "a4" },
  { x: 701, y: 250, w: 70, h: 50, id: "a5" },
  { x: 848, y: 250, w: 70, h: 50, id: "a6" },
  { x: 985, y: 250, w: 70, h: 50, id: "a7" },
  { x: 1126, y: 250, w: 70, h: 50, id: "a8" },
  { x: 1261, y: 250, w: 70, h: 50, id: "a9" },
  { x: 1400, y: 250, w: 70, h: 50, id: "a10" },
  { x: 1543, y: 250, w: 70, h: 50, id: "a11" },
  { x: 26, y: 750, w: 70, h: 50, id: "a12" },
  { x: 168, y: 750, w: 70, h: 50, id: "a13" },
  { x: 405, y: 750, w: 70, h: 50, id: "a14" },
  { x: 543, y: 750, w: 70, h: 50, id: "a15" },
  { x: 671, y: 750, w: 70, h: 50, id: "a16" },
  { x: 807, y: 750, w: 70, h: 50, id: "a17" },
  { x: 939, y: 750, w: 70, h: 50, id: "a18" },
  { x: 1091, y: 750, w: 70, h: 50, id: "a19" },
  { x: 1233, y: 750, w: 70, h: 50, id: "a20" },
  { x: 1367, y: 750, w: 70, h: 50, id: "a21" },
  { x: 1497, y: 750, w: 70, h: 50, id: "a22" },
  { x: 1629, y: 750, w: 70, h: 50, id: "a23" },
  { x: 90, y: 615, w: 70, h: 50, id: "a24" },
  { x: 1010, y: 613, w: 70, h: 50, id: "a25" },
  { x: 840, y: 119, w: 70, h: 50, id: "a26" },
  { x: 812, y: 40, w: 70, h: 50, id: "ba1" },
  { x: 980, y: 540, w: 70, h: 50, id: "ba2" },
  { x: 70, y: 540, w: 70, h: 50, id: "ba3" },
  { x: 110, y: 205, w: 1500, h: 15, id: "dc1" },
  { x: 0, y: 702, w: 225, h: 15, id: "dc2" },
  { x: 365, y: 702, w: 1335, h: 15, id: "dc3" },
];

var selectCellsLayout = [
  { x: 955, y: 245, w: 175, h: 85, id: "td1" },
  { x: 955, y: 525, w: 175, h: 85, id: "td2" },
  { x: 955, y: 810, w: 175, h: 85, id: "td3" },
  { x: 1010, y: 1100, w: 185, h: 245, id: "td4" },
  { x: 1350, y: 1125, w: 135, h: 180, id: "td5" },
  { x: 0, y: 1505, w: 1105, h: 15, id: "dc1" },
];
```

#### 1.1.3: Biến lưu trữ đồ thị

```
var Layout = {
  attrs: {
    icon: {
      width: 1700,
      xlinkHref: "public/dia/layout.svg",
    },
  },
  id: 0,
  infor: {
    name: "Nhà máy VLXD",
    preLevel: "",
    type: "img",
  },
  position: {
    x: 0,
    y: 0,
  },
  type: "examples.CustomDiaImg",
};

var map = {
  attrs: {
    icon: {
      width: 1700,
      xlinkHref: "public/dia/map.jpg",
    },
  },
  id: 0,
  infor: {
    name: "Nhà máy VLXD",
    preLevel: "",
    type: "img",
  },
  position: {
    x: 0,
    y: 0,
  },
  type: "examples.CustomDiaImg",
};
```

### 1.2 Sự kiện

#### 1.2.1: Hàm thêm element

```
 var rectCells = createRectCells(selectCells);
  var rectCellsLayout = createRectCells(selectCellsLayout);
  function addCellsToGraph(graph, cells) {
    cells.forEach(function (cell) {
      graph.addCell(cell); // Thêm ô vào sơ đồ
    });
  }
```

#### 1.2.2: Hàm lấy dữ liệu

##### 1.2.2.1: Hàm lấy dữ liệu đồ thị

```
async function fetchLayoutData() {
    try {
      const response = await $.ajax({
        url: 'https://ems.ioteamvn.com/test/test2?json={"token":"O1L486UPS9MVY7jcihhe4idshRBb0TyD"}',
        method: "GET",
        dataType: "json",
      });
      DiagramData = response;
      // graph.addCell(cell1);
      graph.addCells(DiagramData["total"]);
      addCellsToGraph(graph, rectCells);
      scale();
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  }
```

```
async function fetchDiaData() {
    try {
      const response = await $.ajax({
        url: "https://ems.ioteamvn.com/test/test1?json={%22token%22:%22O1L486UPS9MVY7jcihhe4idshRBb0TyD%22,%22ui%22:%22total%22}",
        method: "GET",
        dataType: "json",
      });
      diaData = response;
      loadDiagramData(diaData, DiagramData);
      scale();
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  }
```

##### 1.2.2.2: Hàm lấy dữ liệu Heatmap

```
async function fetchHeatmapData() {
    try {
      const response = await $.ajax({
        url: "https://ems.ioteamvn.com/test/hm?json={%22realtimeChart%22:{%22type%22:%22diaDataTotal%22,%22items%22:[[{%22id%22:%22gw44e65437a2_11%22,%22ch%22:%22P1%22},{%22id%22:%22gw44e65437a2_11%22,%22ch%22:%22P2%22},{%22id%22:%22gw44e65437a2_11%22,%22ch%22:%22P3%22}],[{%22id%22:%22gsnl5d4d17ff%22,%22ch%22:%22A11%22},{%22id%22:%22gsnl5d4d17ff%22,%22ch%22:%22A21%22},{%22id%22:%22gsnl5d4d17ff%22,%22ch%22:%22A31%22}],[{%22id%22:%22gsnl7eb883d7%22,%22ch%22:%22A11%22},{%22id%22:%22gsnl7eb883d7%22,%22ch%22:%22A21%22},{%22id%22:%22gsnl7eb883d7%22,%22ch%22:%22A31%22}]],%22NuP%22:3,%22p%22:1,%22name%22:%22Nh%C3%A0%20m%C3%A1y%20VLXD%22,%22ptt%22:6752,%22itt%22:10250},%22token%22:%22O1L486UPS9MVY7jcihhe4idshRBb0TyD%22}",
        method: "GET",
        dataType: "json",
      });
      heatmapData = response;
      renderHeatmapChart(heatmapData);
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  }
```

##### 1.2.2.3: Hàm lấy dữ liệu đồ thị

```
async function fetchChartData() {
    try {
      const response = await $.ajax({
        url: "https://ems.ioteamvn.com/test/rt?json={%22realtimeChart%22:{%22type%22:%22diaDataTotal%22,%22items%22:[[{%22id%22:%22gw44e65437a2_11%22,%22ch%22:%22P1%22},{%22id%22:%22gw44e65437a2_11%22,%22ch%22:%22P2%22},{%22id%22:%22gw44e65437a2_11%22,%22ch%22:%22P3%22}],[{%22id%22:%22gsnl5d4d17ff%22,%22ch%22:%22A11%22},{%22id%22:%22gsnl5d4d17ff%22,%22ch%22:%22A21%22},{%22id%22:%22gsnl5d4d17ff%22,%22ch%22:%22A31%22}],[{%22id%22:%22gsnl7eb883d7%22,%22ch%22:%22A11%22},{%22id%22:%22gsnl7eb883d7%22,%22ch%22:%22A21%22},{%22id%22:%22gsnl7eb883d7%22,%22ch%22:%22A31%22}]],%22NuP%22:3,%22p%22:1,%22name%22:%22Nh%C3%A0%20m%C3%A1y%20VLXD%22,%22ptt%22:6752,%22itt%22:10250},%22token%22:%22O1L486UPS9MVY7jcihhe4idshRBb0TyD%22}",
        method: "GET",
        dataType: "json",
      });
      chartData = response;
      renderBarChart({
        data: chartData.barData,
        name: c1name,
        color: chartData.color,
        stack: false,
        horizontal: false,
        id: "c1",
      });
      renderRTLineChart({
        data: chartData.curr,
        name: "curr",
        type: "I",
        color: phaseColor,
        stack: false,
        id: "c2",
      });
      renderRTLineChart({
        data: chartData.power,
        name: "curr",
        type: "P",
        color: phaseColor,
        stack: false,
        id: "c3",
      });
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  }
```

##### 1.2.2.4: Hàm lấy dữ liệu thiết bị

```
async function fetchDaycapData() {
    try {
      const response = await $.ajax({
        url: "data/daycap.json",
        method: "GET",
        dataType: "json",
      });
      for (var i = 0; i < response.length; i++) {
        daycapID.push(response[i].id);
      }
      Daycap = response;
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  }

```

```
async function fetchBienapData() {
    try {
      const response = await $.ajax({
        url: "data/bienap.json",
        method: "GET",
        dataType: "json",
      });
      for (var i = 0; i < response.length; i++) {
        bienapID.push(response[i].id);
      }
      Bienap = response;
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  }
```

```
async function fetchTudienData() {
    try {
      const response = await $.ajax({
        url: "data/tudien.json",
        method: "GET",
        dataType: "json",
      });
      for (var i = 0; i < response.length; i++) {
        tudienID.push(response[i].id);
      }
      Tudien = response;
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  }
```

```
async function fetchDongcatData() {
    try {
      const response = await $.ajax({
        url: "data/dongcat.json",
        method: "GET",
        dataType: "json",
      });
      for (var i = 0; i < response.length; i++) {
        dongcatID.push(response[i].id);
      }
      Dongcat = response;
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  }
```

##### 1.2.2.5: Hàm điều chỉnh dữ liệu

```
function loadDiagramData(diaData, DiagramData) {
    for (var i = 1; i < diaData.rs.length + 2; i++) {
      DiagramData.total[i].attrs = diaData.rs[i];
      DiagramData.total[i] = setupOnlineJoinElemen(DiagramData.total[i]);
      removeCell(i);
      graph.addCell(DiagramData.total[i]);
      scale();
    }
  }
```

```
    function removeCell(cellId) {
    var cell = graph.getCell(cellId);
    if (cell) {
      cell.remove();
    }
  }
```

#### 1.2.3: Hàm vẽ đồ thị

##### 1.2.3.1: Hiển thị thiết bị onl

```
setupOnlineJoinElemen = (data) => {
    let obj = window[data.type.split(".")[1]].prototype.defaults.attrs;
    let arr = Object.keys(obj);
    arr.forEach((element) => {
      if (obj[element]["t"] == "name") {
        data["attrs"][element] = Object.assign({}, data["attrs"][element], {
          fill: "white",
        });
      }
    });
    return data;
  };
```

##### 1.2.3.2: Hàm tạo element

```
function createRectCells(positions) {
    var cells = [];

    positions.forEach(function (position) {
      var rect = new joint.shapes.standard.Rectangle({
        position: { x: position.x, y: position.y },
        size: { width: position.w, height: position.h },
        attrs: {
          body: { fill: "blue", opacity: 0.25, cursor: "pointer" },
          label: { text: "", fill: "transperment" },
        },
      });
      rect.set("id", position.id);
      cells.push(rect);
    });

    return cells;
  }

  function createLayout() {
    graph.addCell(Layout);
    addCellsToGraph(graph, rectCellsLayout);
    // scale();
  }

  function createMap() {
    graph.addCell(map);
  }
```

## 2.Các thao tác với đồ thị(Chart.js)

### 2.1: Hàm vẽ đồ thị

#### 2.1.1: Heatmap

```
renderHeatmapChart = ({
    data = [],
    colorRange = heatmapColor,
    id = "heatmap-chart",
  } = {}) => {
    let max = 0;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i]["data"].length; j++) {
        if (max < data[i]["data"][j]["y"]) max = data[i]["data"][j]["y"];
      }
    }

    let optionsHeatmap = {
      series: data,
      theme: {
        mode: "dark",
      },
      legend: {
        show: true,
        position: "bottom",
      },
      chart: {
        redrawOnParentResize: true,

        animations: {
          enabled: false,
        },
        height: "100%",
        type: "heatmap",
        background: "transparent",
        id: id,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        heatmap: {
          enableShades: true,
          shadeIntensity: 0.6,
          useFillColorAsStroke: false,
          colorScale: {
            ranges: [
              //xám, xanh, vàng đỏ
              //'#65665E', '#11869D', '#FFEE0F', '#B61E08'
              //'#3D4352', '#01AEBF', '#E4F430', '#B80C09'

              //xám, xanh, lục, vàng, đỏ
              //'#6E7171', '#50B2C0', '#60C050', '#FFF500', '#FF4000'
              //#546E7A #4ECDC4	#C7F464	#81D4FA	#FD6A6A
              //#546E7A #008FFB	#00E396	#FEB019	#FF4560	#775DD0
              {
                from: 0,
                to: 2,
                color: "#546E7A",
              },
              {
                from: 2,
                to: 20,
                color: "#008FFB",
              },
              {
                from: 20,
                to: 40,
                color: "#00E396",
              },
              {
                from: 40,
                to: 60,
                color: "#FEB019",
              },
              {
                from: 60,
                to: 80,
                color: "#FF4560",
              },
              {
                from: 80,
                to: 100,
                color: "#775DD0",
              },
            ],
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        colors: ["#1e1e2d"],
      },
      xaxis: {
        // tick:24,
        // type: 'datetime',
        type: "category",
        tickAmount: 12,
        tickPlacement: "on",
        categories: [
          "00:00",
          "00:30",
          "01:00",
          "01:30",
          "02:00",
          "02:30",
          "03:00",
          "03:30",
          "04:00",
          "04:30",
          "05:00",
          "05:30",
          "06:00",
          "06:30",
          "07:00",
          "07:30",
          "08:00",
          "08:30",
          "09:00",
          "09:30",
          "10:00",
          "10:30",
          "11:00",
          "11:30",
          "12:00",
          "12:30",
          "13:00",
          "13:30",
          "14:00",
          "14:30",
          "15:00",
          "15:30",
          "16:00",
          "16:30",
          "17:00",
          "17:30",
          "18:00",
          "18:30",
          "19:00",
          "19:30",
          "20:00",
          "20:30",
          "21:00",
          "21:30",
          "22:00",
          "22:30",
          "23:00",
          "23:30",
        ],
        labels: {
          show: true,

          rotate: 0,
          datetimeUTC: false,
          datetimeFormatter: {
            year: "yyyy",
            month: "MM/yy",
            day: "dd/MM",
            hour: "HH:mm",
          },
        },
      },
      tooltip: {
        intersect: false,
        shared: true,
        x: {
          show: true,
          format: "dd/MM HH:mm",
          // formatter: undefined,
        },
        y: {
          formatter: function (val) {
            return val.toFixed(2) + "%";
          },
        },
      },
    };
    if (consChart == undefined) {
      consChart = new ApexCharts(document.querySelector("#" + id), {
        ...optionsHeatmap,
      });
      consChart.render();
    } else {
      ApexCharts.exec(id, "updateOptions", { ...optionsHeatmap }, false, true);
    }
  };
```

### 2.1.2: BarChart

```
 renderBarChart = ({
    data = [],
    name = [],
    color = phaseColor,
    stack = false,
    horizontal = false,
    id = "c1",
  } = {}) => {
    let optionsBar = {
      series: [
        {
          data: data,
        },
      ],
      theme: {
        mode: "dark",
      },
      chart: {
        height: $("#" + id).height(),
        type: "bar",
        id: id,
        stacked: stack,
        background: "transparent",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter: function (val, opts) {
          return val.toFixed(2) + "%";
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: horizontal,
          distributed: true,
        },
      },
      xaxis: {
        categories: name,
      },
      grid: {
        borderColor: "#555",
      },
      tooltip: {
        theme: "dark",

        x: {
          show: true,
        },
        y: {
          title: {
            formatter: function () {
              return "";
            },
          },
        },
      },
      legend: {
        show: false,
      },
      colors: color,
      yaxis: {
        // forceNiceScale: true,
        decimalsInFloat: 1,
        min: 0,
        max: 120,
        tickAmount: 6,
        forceNiceScale: false,
        // labels:
        // {
        //     formatter: function (value) {
        //         return (value).toFixed(1) + "%";
        //     }
        // },
      },
    };
    if (horizontal) {
      optionsBar.xaxis.labels = {
        formatter: function (value) {
          return value.toFixed(1) + "%";
        },
      };
    } else {
      optionsBar.yaxis.labels = {
        formatter: function (value) {
          return value.toFixed(1) + "%";
        },
      };
    }
    if (lineChart[id] == undefined) {
      lineChart[id] = new ApexCharts(
        document.querySelector("#" + id),
        optionsBar
      );
      lineChart[id].render();
    } else {
      //
      ApexCharts.exec(id, "updateOptions", { ...optionsBar }, false, true);
    }
  };
```

### 2.1.3: LineChart

```
renderRTLineChart = ({
    data = [],
    name = [],
    type = "I",
    color = phaseColor,
    stack = false,
    id = "c2",
  } = {}) => {
    let anoArr = [];
    if (data[0]["data"].length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i]["data"].length > 0) {
          anoArr[i] = {
            x: new Date(
              data[i]["data"][data[i]["data"].length - 1]["x"]
            ).getTime(),
            y: data[i]["data"][data[i]["data"].length - 1]["y"],
            marker: {
              size: 6,
              strokeColor: color[i],
            },
            label: {
              offsetX: -20,
              borderColor: color[i],
              style: {
                color: "#fff",
                background: color[i],
              },
              text: doConverElectricValue(
                data[i]["data"][data[i]["data"].length - 1]["y"].toFixed(1),
                type
              ),
            },
          };
          if (stack && i > 0) {
            anoArr[i]["y"] += anoArr[i - 1]["y"];
          }
        }
      }
    }

    let optionsLine = {
      annotations: {
        points: anoArr,
      },
      colors: color,
      series: data,
      theme: {
        mode: "dark",
      },
      noData: {
        text: "No Data",
      },
      stroke: { width: 2.5, curve: "smooth" },
      chart: {
        id: id,
        stacked: stack,
        animations: {
          enabled: false,
        },

        type: "line",
        background: "transparent",
        height: $("#" + id).height(),
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      yaxis: {
        // forceNiceScale: true,
        decimalsInFloat: 1,
        labels: {
          // formatter: function (value) {
          //     return (value / 1000).toFixed(1) + " kW";
          // }
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          datetimeUTC: false,
          datetimeFormatter: {
            year: "yyyy",
            month: "MM/yy",
            day: "dd/MM",
            hour: "HH:mm",
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        borderColor: "#555",
      },
      tooltip: {
        shared: true,
        intersect: false,
        x: {
          format: "dd/MM HH:mm",
        },
        y: {},
      },
    };

    if (type == "I") {
      optionsLine.yaxis.labels = {
        formatter: function (value) {
          return value.toFixed(1) + " A";
        },
      };
      optionsLine.tooltip.y = {
        formatter: function (value) {
          return value.toFixed(1) + " A";
        },
      };
    } else if (type == "P") {
      optionsLine.yaxis.labels = {
        formatter: function (value) {
          if (value < 1000) {
            return value.toFixed(1) + " W";
          } else {
            return (value / 1000).toFixed(1) + " kW";
          }
        },
      };
      optionsLine.tooltip.y = {
        formatter: function (value) {
          if (value < 1000) {
            return value.toFixed(1) + " W";
          } else {
            return (value / 1000).toFixed(1) + " kW";
          }
        },
      };
    }
    if (lineChart[id] == undefined) {
      lineChart[id] = new ApexCharts(
        document.querySelector("#" + id),
        optionsLine
      );
      lineChart[id].render();
    } else {
      //
      ApexCharts.exec(id, "updateOptions", { ...optionsLine }, false, true);
    }
  };
```

### 2.2: Hàm chuyển đổi dữ liệu

```
function doConverElectricValue(value, type) {
    if (type == "I") {
      return (value / 1000).toFixed(2) + "kA";
    } else {
      return (value / 1000).toFixed(2) + "kW";
    }
  }
```

### 2.3: Hàm lấy dữ liệu thời gian thực

```
 getDataForRealtimeChart = (Arr, type, index = 0) => {
    if (type == "diaMBAData") {
      realtimeChart.type = type;
      realtimeChart.items = doDeepCopy(Arr[index].infor.dbItems).slice(0, -1);
      realtimeChart.ptt = Arr[index].infor.itt;
      realtimeChart.itt = Arr[index].infor.itt;
      realtimeChart.name = Arr[index].infor.dbName;
    } else if (type == "diaData") {
      realtimeChart.type = type;
      realtimeChart.items = doDeepCopy(Arr[index].infor.dbItems);
      realtimeChart.ptt = Arr[index].infor.itt;
      realtimeChart.itt = Arr[index].infor.itt;
      realtimeChart.name = Arr[index].infor.dbName;
    } else {
      realtimeChart.type = "diaDataTotal";
      realtimeChart.items = [];
      realtimeChart.ptt = 0;
      realtimeChart.itt = 0;
      realtimeChart.name = Arr[0].infor.name;
      for (let i = 0; i < Arr.length; i++) {
        if ("type" in Arr[i].infor) {
          if (Arr[i].infor.type == "diaDataTotal") {
            realtimeChart.items = realtimeChart.items.concat(
              Arr[i].infor.dbItems
            );
            realtimeChart.itt = realtimeChart.itt + Arr[i].infor.itt;
            realtimeChart.ptt = realtimeChart.ptt + Arr[i].infor.ptt;
          }
        }
      }
      if (realtimeChart.items.length == 0) {
        for (let i = 0; i < Arr.length; i++) {
          if ("type" in Arr[i].infor) {
            if (Arr[i].infor.type == "diaData") {
              realtimeChart.items.push(Arr[i].infor.dbItems);
              realtimeChart.itt = realtimeChart.itt + Arr[i].infor.itt;
              realtimeChart.ptt = realtimeChart.ptt + Arr[i].infor.ptt;
            } else if (Arr[i].infor.type == "diaMBAData") {
              realtimeChart.items.push(
                doDeepCopy(Arr[i].infor.dbItems).slice(0, -1)
              );
              realtimeChart.itt = realtimeChart.itt + Arr[i].infor.itt;
              realtimeChart.ptt = realtimeChart.ptt + Arr[i].infor.ptt;
            }
          }
        }
      }
    }
  };
```

## 3. Các thao tác điều khiển(control.js)

```
$(document).ready(function () {
  $("#app").on("click", ".btn", function () {
    console.log(1);
    $(this).parent().children().removeClass("btn-primary");
    $(this).removeClass("btn-primary");
    $(this).addClass("btn-primary");
  });
});
```

## 4.Các thao tác với đồ thị(diagram.js)

### 4.1: Xử lý sự kiện click

```
var clickTimeout;
var holdTimeout;
```

Click

```
paper.on("cell:pointerclick", function (elementView) {
    var element = elementView.model;

    // Xóa bộ đếm thời gian nếu có
    clearTimeout(clickTimeout);
    clearTimeout(holdTimeout);

    // Thiết lập bộ đếm thời gian mới cho click
    clickTimeout = setTimeout(function () {
      // alert("Element clicked: " + element.id);
      checkClickCells(element.id);
    }, 300); // Độ trễ 300ms để xác định double click
  });
```

DoubleClick

```
paper.on("cell:pointerdblclick", function (elementView) {
    var element = elementView.model;

    // Xóa bộ đếm thời gian sự kiện click
    clearTimeout(clickTimeout);

    alert("Element double-clicked: " + element.id);
    console.log("Double Clicked", element.id);
  });
```

Hold

```
paper.on("element:pointerdown", function (elementView) {
    var element = elementView.model;

    // Thiết lập bộ đếm thời gian cho hold
    holdTimeout = setTimeout(function () {
      // alert("Element held: " + element.id);
      if (element.id != 0) {
        hold();
      }
    }, 300); // Giữ chuột trong 1 giây

    paper.on("element:pointerup", function () {
      clearTimeout(holdTimeout);
    });

    paper.on("element:pointermove", function () {
      clearTimeout(holdTimeout);
    });
  });
```

### 4.2: Thực thi

#### 4.2.1: Nhấn giữ

```
function hold() {
    var myModal = new bootstrap.Modal(document.getElementById("Modal"), {
      keyboard: false,
    });
    myModal.show();
  }
```

#### 4.2.2: Click

```
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
    if (tudienID.includes(cellId)) {
      rmShow();
      $("#tudien").removeClass("d-sm-none");
      addCarousel("#tudien", cellId);
    }
    if (dongcatID.includes(cellId)) {
      rmShow();
      $("#dongcat").removeClass("d-sm-none");
      addCarousel("#dongcat", cellId);
    }
  }
```

```
function rmShow() {
    $("#newCarousel").remove();
    $("#heatmap").addClass("d-sm-none");
    $("#bienap").addClass("d-sm-none");
    $("#daycap").addClass("d-sm-none");
    $("#tudien").addClass("d-sm-none");
    $("#dongcat").addClass("d-sm-none");
  }
```

### 4.3: Khởi tạo

#### 4.3.1: Carousel

```
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
      case "#tudien":
        addTableForTudien(type, ID);
        break;
      case "#dongcat":
        addTableForDongcat(type, ID);
        break;
      default:
        console.log("ID không hợp lệ");
        break;
    }
  }
```

#### 4.3.2: Table

```
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
```

```
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
        <table class="table table-hover mb-0 table-striped" style="text-align: center">
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
```

```
function addTableForTudien(type, ID) {
    var data;
    for (var i = 0; i < Tudien.length; i++) {
      if (Tudien[i].id == ID) {
        data = Tudien[i];
      }
    }

    var hoatdong = data.hoatdong;
    var thietke = data.thietke;

    var newTable =
      `
<div class="table-responsive table-bot">
    <div class="table-responsive">
        <table class="table table-hover mb-0 table-striped" style="text-align: center">
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
      `<div class="table-responsive">
                                <table
                                  class="table table-hover mb-0 table-striped"
                                >
                                  <thead>
                                    <tr>
                                      <th style="width: 40%"></th>
                                      <th style="width: 60%">Tủ điện</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td class="text-bold-500">Ptt</td>
                                      <td>` +
      thietke.Ptt +
      `kW</td>
                                    </tr>
                                    <tr>
                                      <td class="text-bold-500">Số lộ</td>
                                      <td>` +
      thietke.solo +
      `</td>
                                    </tr>
                                    <tr>
                                      <td class="text-bold-500">Tên tủ</td>
                                      <td>` +
      thietke.ten +
      `</td>
                                    </tr>
                                    <tr>
                                      <td class="text-bold-500">
                                        Loại tải chính
                                      </td>
                                      <td>` +
      thietke.Loaitaichinh +
      `</td>
                                    </tr>
                                    <tr>
                                      <td class="text-bold-500">
                                        Hệ số đồng thời
                                      </td>
                                      <td>` +
      thietke.hesodongthoi +
      `</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>`;

    $(type).find("#v-pills-home").append(newTable1);
  }
```

```
function addTableForDongcat(type, ID) {
    var data;
    for (var i = 0; i < Dongcat.length; i++) {
      if (Dongcat[i].id == ID) {
        data = Dongcat[i];
      }
    }

    var hoatdong = data.hoatdong;
    var thietke = data.thietke;
    var newTable =
      `<div class="table-responsive">
                                <table
                                  class="table table-hover mb-0 table-striped"
                                >
                                  <thead>
                                    <tr>
                                      <th style="width: 40%"></th>
                                      <th style="width: 60%">TB đóng cắt</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td class="text-bold-500">Loại</td>
                                      <td>` +
      thietke.Loai +
      `</td>
                                    </tr>
                                    <tr>
                                      <td class="text-bold-500">Iđm</td>
                                      <td>` +
      thietke.Idm +
      `A</td>
                                    </tr>
                                    <tr>
                                      <td class="text-bold-500">In</td>
                                      <td>` +
      thietke.In +
      `kA</td>
                                    </tr>
                                    <tr>
                                      <td class="text-bold-500">Hãng</td>
                                      <td>` +
      thietke.Hang +
      `</td>
                                    </tr>
                                    <tr>
                                      <td class="text-bold-500">Dạng</td>
                                      <td>` +
      thietke.Dang +
      `AF</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>`;
    $(type).find("#v-pills-home").append(newTable);

    var newTable1 =
      `<div class="table-responsive" style= "text-align:center">
                                <table
                                class="table table-hover mb-0 table-striped"
                                >
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
                                      <td colspan="3">` +
      hoatdong.T +
      `&degC</td>
                                    </tr>
                                    <tr>
                                      <td style="font-weight: bold">STT</td>
                                      <td colspan="2" style= "text-align:left">` +
      hoatdong.STT[0] +
      `</td>
                                      <td>` +
      hoatdong.STT[1] +
      `</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>`;

    $(type).find("#v-pills-profile").append(newTable1);
  }
```

## 5. Các element (element.js)

## 6. Các thao các chính (management.js)

### 6.1: Khởi tạo jointjs

```
graph = new joint.dia.Graph({}, { cellNamespace: namespace });

  paper = new joint.dia.Paper({
    el: $("#myholder"),
    model: graph,
    height: $("#myholder").height(),
    width: $("#myholder").width(),
    interactive: false,
  });
```

### 6.2: Hàm căn chỉnh jointjs

```
scale = () => {
    let contentDim = paper.getContentArea();
    let diaH = contentDim.height;
    let diaW = contentDim.width;
    let spaH = $("#diaSpace").height();
    let spaW = $("#diaSpace").width();
    let t = diaH / spaH;
    if (diaW / t <= spaW) {
      $("#myholder").width(diaW / t);
      $("#myholder").height(spaH);
      paper.setDimensions(diaW / t, spaH);
    } else {
      let _t = diaW / spaW;
      $("#myholder").width(spaW);
      $("#myholder").height(diaH / _t);
      paper.setDimensions(spaW, diaH / _t);
    }
    paper.scaleContentToFit();
  };
```
