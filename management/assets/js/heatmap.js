var heatmapColor = "#fff";
var consChart;
$(document).ready(function () {
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
  //   getDataForRealtimeChart = (Arr, type, index = 0) => {
  //     if (type == "diaMBAData") {
  //       realtimeChart.type = type;
  //       realtimeChart.items = doDeepCopy(Arr[index].infor.dbItems).slice(0, -1);
  //       realtimeChart.ptt = Arr[index].infor.itt;
  //       realtimeChart.itt = Arr[index].infor.itt;
  //       realtimeChart.name = Arr[index].infor.dbName;
  //     } else if (type == "diaData") {
  //       realtimeChart.type = type;
  //       realtimeChart.items = doDeepCopy(Arr[index].infor.dbItems);
  //       realtimeChart.ptt = Arr[index].infor.itt;
  //       realtimeChart.itt = Arr[index].infor.itt;
  //       realtimeChart.name = Arr[index].infor.dbName;
  //     } else {
  //       realtimeChart.type = "diaDataTotal";
  //       realtimeChart.items = [];
  //       realtimeChart.ptt = 0;
  //       realtimeChart.itt = 0;
  //       realtimeChart.name = Arr[0].infor.name;
  //       for (let i = 0; i < Arr.length; i++) {
  //         if ("type" in Arr[i].infor) {
  //           if (Arr[i].infor.type == "diaDataTotal") {
  //             realtimeChart.items = realtimeChart.items.concat(
  //               Arr[i].infor.dbItems
  //             );
  //             realtimeChart.itt = realtimeChart.itt + Arr[i].infor.itt;
  //             realtimeChart.ptt = realtimeChart.ptt + Arr[i].infor.ptt;
  //           }
  //         }
  //       }
  //       if (realtimeChart.items.length == 0) {
  //         for (let i = 0; i < Arr.length; i++) {
  //           if ("type" in Arr[i].infor) {
  //             if (Arr[i].infor.type == "diaData") {
  //               realtimeChart.items.push(Arr[i].infor.dbItems);
  //               realtimeChart.itt = realtimeChart.itt + Arr[i].infor.itt;
  //               realtimeChart.ptt = realtimeChart.ptt + Arr[i].infor.ptt;
  //             } else if (Arr[i].infor.type == "diaMBAData") {
  //               realtimeChart.items.push(
  //                 doDeepCopy(Arr[i].infor.dbItems).slice(0, -1)
  //               );
  //               realtimeChart.itt = realtimeChart.itt + Arr[i].infor.itt;
  //               realtimeChart.ptt = realtimeChart.ptt + Arr[i].infor.ptt;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   };
});
