var heatmapColor = "#fff";
var consChart;
var lineChart = [];
$(document).ready(function () {
  // heatmap
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
  // barchart
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
  // RTLineChart
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

  function doConverElectricValue(value, type) {
    if (type == "I") {
      return (value / 1000).toFixed(2) + "kA";
    } else {
      return (value / 1000).toFixed(2) + "kW";
    }
  }
  // realtime chart
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
});
