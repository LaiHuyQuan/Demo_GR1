var diaData; // Biến lưu trữ thông tin đồ thị
var heatmapData; //Biến lưu thông tin heatmap
var chartData; //Biến lưu trữ thông tin biểu đồ
var Daycap = [];
var Bienap = [];
var Tudien = [];
var Dongcat = [];
var phaseColor = ["#ff3838", "#fff200", "#18dcff"]; // màu của đồ thị
var c1name = ["Pha A", "Pha B", "Pha C"];
var lineChart = {}; //trạng thái đồ thị
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

$(document).ready(function () {
  var rectCells = createRectCells(selectCells);
  var rectCellsLayout = createRectCells(selectCellsLayout);
  function addCellsToGraph(graph, cells) {
    cells.forEach(function (cell) {
      graph.addCell(cell); // Thêm ô vào sơ đồ
    });
  }

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

  function loadDiagramData(diaData, DiagramData) {
    for (var i = 1; i < diaData.rs.length + 2; i++) {
      DiagramData.total[i].attrs = diaData.rs[i];
      DiagramData.total[i] = setupOnlineJoinElemen(DiagramData.total[i]);
      removeCell(i);
      graph.addCell(DiagramData.total[i]);
      scale();
    }
  }

  function removeCell(cellId) {
    var cell = graph.getCell(cellId);
    if (cell) {
      cell.remove();
    }
  }

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

  if ($("#myDiv").find("#layout").length) {
    createLayout();
    scale();
  } else if ($("#myDiv").find("#map").length) {
    createMap();
    scale();
  } else {
    fetchDiaData();
    fetchLayoutData();
  }

  fetchHeatmapData();
  fetchChartData();
  scale();

  fetchDaycapData();
  fetchBienapData();
  fetchTudienData();
  fetchDongcatData();
});
