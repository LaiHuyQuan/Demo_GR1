var diaData;
var heatmapData;
$(document).ready(function () {
  async function fetchLayoutData() {
    try {
      const response = await $.ajax({
        url: 'https://ems.ioteamvn.com/test/test2?json={"token":"O1L486UPS9MVY7jcihhe4idshRBb0TyD"}',
        method: "GET",
        dataType: "json",
      });
      DiagramData = response;
      graph.addCells(DiagramData["total"]);
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
        url: "https://ems.ioteamvn.com/test/hm?json={%22realtimeChart%22:{%22type%22:%22diaDataTotal%22,%22items%22:[[{%22id%22:%22gw44e65437a2_11%22,%22ch%22:%22P1%22},{%22id%22:%22gw44e65437a2_11%22,%22ch%22:%22P2%22},{%22id%22:%22gw44e65437a2_11%22,%22ch%22:%22P3%22}],[{%22id%22:%22gsnl5d4d17ff%22,%22ch%22:%22A11%22},{%22id%22:%22gsnl5d4d17ff%22,%22ch%22:%22A21%22},{%22id%22:%22gsnl5d4d17ff%22,%22ch%22:%22A31%22}],[{%22id%22:%22gsnl7eb883d7%22,%22ch%22:%22A11%22},{%22id%22:%22gsnl7eb883d7%22,%22ch%22:%22A21%22},{%22id%22:%22gsnl7eb883d7%22,%22ch%22:%22A31%22}]],%22NuP%22:3,%22p%22:1,%22name%22:%22Nh%C3%A0%20m%C3%A1y%20VLXD%22,%22ptt%22:6752,%22itt%22:10230},%22token%22:%22O1L486UPS9MVY7jcihhe4idshRBb0TyD%22}",
        method: "GET",
        dataType: "json",
      });
      heatmapData = response;
      renderHeatmapChart(heatmapData);
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

  fetchLayoutData();
  fetchDiaData();
  fetchHeatmapData();
});
