var diaData;
var heatmapData;
var chartData;
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

  async function fetchChartData() {
    try {
      const response = await $.ajax({
        url: "https://ems.ioteamvn.com/test/rt?json={%22realtimeChart%22:{%22type%22:%22diaDataTotal%22,%22items%22:[[{%22id%22:%22gw44e65437a2_11%22,%22ch%22:%22P1%22},{%22id%22:%22gw44e65437a2_11%22,%22ch%22:%22P2%22},{%22id%22:%22gw44e65437a2_11%22,%22ch%22:%22P3%22}],[{%22id%22:%22gsnl5d4d17ff%22,%22ch%22:%22A11%22},{%22id%22:%22gsnl5d4d17ff%22,%22ch%22:%22A21%22},{%22id%22:%22gsnl5d4d17ff%22,%22ch%22:%22A31%22}],[{%22id%22:%22gsnl7eb883d7%22,%22ch%22:%22A11%22},{%22id%22:%22gsnl7eb883d7%22,%22ch%22:%22A21%22},{%22id%22:%22gsnl7eb883d7%22,%22ch%22:%22A31%22}]],%22NuP%22:3,%22p%22:1,%22name%22:%22Nh%C3%A0%20m%C3%A1y%20VLXD%22,%22ptt%22:6752,%22itt%22:10230},%22token%22:%22O1L486UPS9MVY7jcihhe4idshRBb0TyD%22}",
        method: "GET",
        dataType: "json",
      });
      chartData = response;
      renderLoadFactor(chartData.barData);
      renderRealtime(chartData.curr, "current");
      renderRealtime(chartData.power, "power");
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

  function renderLoadFactor(data) {
    var options = {
      series: [
        {
          name: "sales",
          data: [
            {
              x: "Pha A",
              y: data[0].toFixed(2),
            },
            {
              x: "Pha B",
              y: data[1].toFixed(2),
            },
            {
              x: "Pha C",
              y: data[2].toFixed(2),
            },
          ],
        },
      ],

      chart: {
        type: "bar",
        height: 190,
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
        },
      },
      xaxis: {
        type: "category",
        group: {
          style: {
            fontSize: "10px",
            fontWeight: 700,
          },
        },
      },
      yaxis: {
        min: 0,
        max: 120,
        tickAmount: 6,
        labels: {
          formatter: function (val) {
            return val.toFixed(1) + "%";
          },
        },
      },
    };

    var Loadfactor = new ApexCharts(
      document.querySelector("#Loadfactor"),
      options
    );
    Loadfactor.render();
  }

  function renderRealtime(rlData, id) {
    var data0 = [];
    for (var i = 0; i < rlData[0].data.length; i++) {
      data0.push(rlData[0].data[i].y);
    }

    var data1 = [];
    for (var i = 0; i < rlData[1].data.length; i++) {
      data1.push(rlData[1].data[i].y);
    }

    var data2 = [];
    for (var i = 0; i < rlData[2].data.length; i++) {
      data2.push(rlData[2].data[i].y);
    }

    var options = {
      series: [
        {
          data: data0,
          name: rlData[0].name,
        },
        {
          data: data1,
          name: rlData[1].name,
        },
        {
          data: data2,
          name: rlData[2].name,
        },
      ],
      chart: {
        height: 190,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        color: "#0096FF",
        width: [2, 2, 2],
        curve: "smooth",
      },
      tooltip: {},
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      toolbar: {
        show: false,
      },
      yaxis: {
        color: "#000",
        tickAmount: 6,
        labels: {
          formatter: function (val) {
            if (id == "power") {
              return (val / 1000).toFixed(1) + "kW";
            } else {
              return val.toFixed(1) + "A";
            }
          },
        },
      },
      xaxis: {
        categories: ["16:07:00"],
        tickAmount: 1,
        labels: {
          align: "center",
          offsetX: 0,
        },
        axisTicks: {
          show: false, // Ẩn phân vạch trục x
        },
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    };

    var current = new ApexCharts(document.querySelector("#" + id), options);
    current.render();
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
  fetchChartData();
});
