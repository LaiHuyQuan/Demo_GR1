var diaData;
var heatmapData;
var chartData;
var phaseColor = ["#ff3838", "#fff200", "#18dcff"];
var c1name = ["Pha A", "Pha B", "Pha C"];
var lineChart = {};
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

  function doConverElectricValue(value, type) {
    if (type == "I") {
      return value / 1000 + "kA";
    } else {
      return value / 1000 + "kW";
    }
  }

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
        height: $("#" + id).height() - 15,
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
        height: $("#" + id).height() - 15,
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
