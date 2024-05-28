var diaData;
var heatmapData;
var chartData;
var phaseColor = ["#ff3838", "#fff200", "#18dcff"];
var c1name = ["Pha A", "Pha B", "Pha C"];
var lineChart = {};
var selectCells = [
  { x: 167, y: 250, id: "a1" },
  { x: 308, y: 250, id: "a2" },
  { x: 449, y: 250, id: "a3" },
  { x: 593, y: 250, id: "a4" },
  { x: 721, y: 250, id: "a5" },
  { x: 868, y: 250, id: "a6" },
  { x: 1005, y: 250, id: "a7" },
  { x: 1146, y: 250, id: "a8" },
  { x: 1281, y: 250, id: "a9" },
  { x: 1420, y: 250, id: "a10" },
  { x: 1563, y: 250, id: "a11" },
  { x: 46, y: 750, id: "a12" },
  { x: 188, y: 750, id: "a13" },
  { x: 425, y: 750, id: "a14" },
  { x: 563, y: 750, id: "a15" },
  { x: 691, y: 750, id: "a16" },
  { x: 827, y: 750, id: "a17" },
  { x: 959, y: 750, id: "a18" },
  { x: 1111, y: 750, id: "a19" },
  { x: 1253, y: 750, id: "a20" },
  { x: 1387, y: 750, id: "a21" },
  { x: 1517, y: 750, id: "a22" },
  { x: 1649, y: 750, id: "a23" },
  { x: 110, y: 615, id: "a24" },
  { x: 1030, y: 613, id: "a25" },
  { x: 860, y: 119, id: "a26" },
];

$(document).ready(function () {
  var rectCells = createRectCells(selectCells);
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
        size: { width: 50, height: 50 },
        attrs: {
          body: { fill: "blue", opacity: 0, cursor: "pointer" },
          label: { text: "", fill: "transperment" },
        },
      });
      rect.set("id", position.id);
      cells.push(rect);
    });

    return cells;
  }

  fetchDiaData();
  fetchLayoutData();
  // getSelectCell();
  fetchHeatmapData();
  fetchChartData();
});
