var graph, paper, customNamespace;

var CustomDiaImg = joint.dia.Element.define(
  "examples.CustomDiaImg",
  {
    attrs: {
      img: {
        // x: '-calc(0.5*w)',
        // // anchor:'center',
        // width: 'calc(1*w)',
        // height: 'calc(1*h)'
      },
    },
    size: {},
    infor: {},
  },
  {
    markup: [
      {
        tagName: "image",
        selector: "icon",
      },
    ],
  }
);
var CustomDiaVolt = joint.dia.Element.define(
  "examples.CustomDiaVolt",
  {
    attrs: {
      ut: {
        textVerticalAnchor: "middle",
        fill: "white",
        text: "U ",
        fontSize: "1.25rem",
        cursor: "all-scroll",
      },
      uavg: {
        textVerticalAnchor: "middle",
        fill: "white",
        x: "calc(0.3*w)",
        y: "calc(0.08*h)",
        text: "avg",
        fontSize: "0.8rem",
        cursor: "all-scroll",
      },
      u: {
        textVerticalAnchor: "middle",
        fill: "#0acf32",
        x: "calc(0.9*w)",
        // y: 'calc(0.25*h)',
        fontSize: "1.25rem",
        fontFamily: "Orbitron",
        cursor: "all-scroll",
      },
    },
    size: { width: 40, height: 80 },
    infor: {},
  },
  {
    markup: [
      {
        tagName: "text",
        selector: "ut",
      },
      {
        tagName: "text",
        selector: "uavg",
      },
      {
        tagName: "text",
        selector: "u",
      },
      // {
      //     tagName: 'text',
      //     selector: 'iavg'
      // },
      // {
      //     tagName: 'text',
      //     selector: 'pavg'
      // },
      // {
      //     tagName: 'text',
      //     selector: 'it'
      // },
      // {
      //     tagName: 'text',
      //     selector: 'pt'
      // },

      // {
      //     tagName: 'text',
      //     selector: 'i'
      // },
      // {
      //     tagName: 'text',
      //     selector: 'p'
      // },
      // {
      //     tagName: 'text',
      //     selector: 'name'
      // },
      // {
      //     tagName: 'text',
      //     selector: 'ptt'
      // },
    ],
  }
);
var CustomDiaPower = joint.dia.Element.define(
  "examples.CustomDiaPower",
  {
    attrs: {
      p1t: {
        textVerticalAnchor: "middle",
        fill: "white",
        text: "Pa",

        fontSize: "1.25rem",
      },
      p2t: {
        textVerticalAnchor: "middle",
        fill: "white",
        text: "Pb",
        y: "calc(0.25*h)",

        fontSize: "1.25rem",
      },
      p3t: {
        textVerticalAnchor: "middle",
        fill: "white",
        text: "Pc",
        y: "calc(0.5*h)",

        fontSize: "1.25rem",
      },
      p1: {
        textVerticalAnchor: "middle",
        fill: "#0acf32",
        x: "calc(0.9*w)",

        fontSize: "1.25rem",
        fontFamily: "Orbitron",
      },
      p2: {
        textVerticalAnchor: "middle",
        fill: "#0acf32",
        x: "calc(0.9*w)",
        y: "calc(0.25*h)",

        fontSize: "1.25rem",
        fontFamily: "Orbitron",
      },
      p3: {
        textVerticalAnchor: "middle",
        fill: "#0acf32",
        x: "calc(0.9*w)",
        y: "calc(0.5*h)",

        fontSize: "1.25rem",
        fontFamily: "Orbitron",
      },
    },
    size: { width: 40, height: 80 },
    infor: {},
  },
  {
    markup: [
      {
        tagName: "text",
        selector: "p1t",
      },
      {
        tagName: "text",
        selector: "p2t",
      },
      {
        tagName: "text",
        selector: "p3t",
      },
      {
        tagName: "text",
        selector: "p1",
      },
      {
        tagName: "text",
        selector: "p2",
      },
      {
        tagName: "text",
        selector: "p3",
      },
    ],
  }
);
var CustomDiaData = joint.dia.Element.define(
  "examples.CustomDiaData",
  {
    //     attrs: {

    //         rect1: {
    //             x: 'calc(-0.1*w)',
    //             y: 'calc(0.2*h)',
    //             width: "calc(2.9*w)",
    //             height: "calc(2.5*h)",
    //             strokeWidth: 1,
    //             stroke: '#FFFFFF',
    //             strokeOpacity: 0.3,
    //             fillOpacity: "0"

    //         },
    //         rect2: {
    //             x: 'calc(0.25*w)',
    //             y: 'calc(-0.2*h)',
    //             width: "calc(2.55*w)",
    //             height: "calc(0.4*h)",
    //             strokeWidth: 1,
    //             stroke: '#FFFFFF',
    //             strokeOpacity: 0.3,
    //             fillOpacity: "0"

    //         },
    //         line1: {
    //             x1: 'calc(-0.1*w)',
    //             y1: 'calc(1.2*h)',
    //             x2: 'calc(2.8*w)',
    //             y2: 'calc(1.2*h)',
    //             strokeWidth: 1,
    //             stroke: '#FFFFFF',
    //             strokeOpacity: 0.3,

    //         },
    //         line2: {
    //             x1: 'calc(-0.1*w)',
    //             y1: 'calc(1.7*h)',
    //             x2: 'calc(2.8*w)',
    //             y2: 'calc(1.7*h)',
    //             strokeWidth: 1,
    //             stroke: '#FFFFFF',
    //             strokeOpacity: 0.3,

    //         },
    //         line3: {
    //             x1: 'calc(-0.1*w)',
    //             y1: 'calc(2.2*h)',
    //             x2: 'calc(2.8*w)',
    //             y2: 'calc(2.2*h)',
    //             strokeWidth: 1,
    //             stroke: '#FFFFFF',
    //             strokeOpacity: 0.3,

    //         },
    //         line4: {
    //             x1: 'calc(1.3*w)',
    //             y1: 'calc(1.2*h)',
    //             x2: 'calc(1.3*w)',
    //             y2: 'calc(2.7*h+1)',
    //             strokeWidth: 1,
    //             stroke: '#FFFFFF',
    //             strokeOpacity: 0.3,

    //         },
    //         line5: {
    //             x1: 'calc(-0.1*w)',
    //             y1: 'calc(0.7*h)',
    //             x2: 'calc(2.8*w)',
    //             y2: 'calc(0.7*h)',
    //             strokeWidth: 1,
    //             stroke: '#FFFFFF',
    //             strokeOpacity: 0.3,

    //         },

    //         l1: {
    //             textVerticalAnchor: 'middle',
    //             fill: 'white',
    //             x: 'calc(0.25*w)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',
    //             text: 'P1/PA',
    //             t:'name'
    //         },
    //         l2: {

    //             textVerticalAnchor: 'middle',
    //             fill: 'white',
    //             x: 'calc(1.2*w)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',
    //             text: 'P2/PB',
    //             t:'name'
    //         },
    //         l3: {

    //             textVerticalAnchor: 'middle',
    //             fill: 'white',
    //             x: 'calc(2.1*w)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',
    //             text: 'P3/PC',
    //             t:'name'
    //         },

    //         Ut: {
    //             textVerticalAnchor: 'middle',
    //             fill: 'white',

    //             y: 'calc(0.5*h)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',
    //             text: 'U',
    //             t:'name'
    //         },
    //         It: {

    //             textVerticalAnchor: 'middle',
    //             fill: 'white',

    //             y: 'calc(1*h)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',
    //             text: 'I',
    //             t:'name'
    //         },
    //         Pt: {

    //             textVerticalAnchor: 'middle',
    //             fill: 'white',

    //             y: 'calc(1.5*h)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',
    //             text: 'P',
    //             t:'name'
    //         },
    //         Qt: {

    //             textVerticalAnchor: 'middle',
    //             fill: 'white',
    //             x: 'calc(1.35*w)',
    //             y: 'calc(1.5*h)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',
    //             text: 'Q',
    //             t:'name'
    //         },
    //         Et: {

    //             textVerticalAnchor: 'middle',
    //             fill: 'white',
    //             y: 'calc(2*h)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',
    //             text: 'E',
    //             t:'name'
    //         },
    //         rEt: {

    //             textVerticalAnchor: 'middle',
    //             fill: 'white',
    //             x: 'calc(1.35*w)',
    //             y: 'calc(2*h)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',
    //             text: 'rE',
    //             t:'name'
    //         },
    //         PFt: {

    //             textVerticalAnchor: 'middle',
    //             fill: 'white',
    //             y: 'calc(2.5*h)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',
    //             text: 'PF',
    //             t:'name'
    //         },
    //         fret: {

    //             textVerticalAnchor: 'middle',
    //             fill: 'white',
    //             x: 'calc(1.35*w)',
    //             y: 'calc(2.5*h)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.5rem',
    //             text: 'f',
    //             t:'name'
    //         },

    //         U1: {

    //             textVerticalAnchor: 'middle',
    //             fill: '#0acf32',
    //             x: 'calc(0.25*w)',
    //             y: 'calc(0.5*h)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',
    //             text: '230V',

    //         },
    //         I1: {

    //             textVerticalAnchor: 'middle',
    //             fill: '#0acf32',
    //             x: 'calc(0.25*w)',
    //             y: 'calc(1*h)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',

    //             text: '120A'
    //         },
    //         U2: {

    //             textVerticalAnchor: 'middle',
    //             fill: '#0acf32',
    //             x: 'calc(1.2*w)',
    //             y: 'calc(0.5*h)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',

    //             text: '230V',
    //         },
    //         I2: {

    //             textVerticalAnchor: 'middle',
    //             fill: '#0acf32',
    //             x: 'calc(1.2*w)',
    //             y: 'calc(1*h)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',

    //             text: '120A'
    //         },
    //         U3: {

    //             textVerticalAnchor: 'middle',
    //             fill: '#0acf32',
    //             x: 'calc(2.1*w)',
    //             y: 'calc(0.5*h)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',

    //             text: '230V',
    //         },
    //         I3: {

    //             textVerticalAnchor: 'middle',
    //             fill: '#0acf32',
    //             x: 'calc(2.1*w)',
    //             y: 'calc(1*h)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',

    //             text: '120A'
    //         },
    //         P: {
    //             textVerticalAnchor: 'middle',
    //             fill: '#0acf32',
    //             x: 'calc(0.25*w)',
    //             y: 'calc(1.5*h)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',

    //             text: '900kW'
    //         },
    //         Q: {
    //             textVerticalAnchor: 'middle',
    //             fill: '#0acf32',
    //             x: 'calc(1.65*w)',
    //             y: 'calc(1.5*h)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',

    //             text: '900kVAr'
    //         },
    //         E: {

    //             textVerticalAnchor: 'middle',
    //             fill: '#0acf32',
    //             x: 'calc(0.25*w)',
    //             y: 'calc(2*h)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',

    //             text: '900kWh'
    //         },
    //         rE: {
    //             textVerticalAnchor: 'middle',
    //             fill: '#0acf32',
    //             x: 'calc(1.65*w)',
    //             y: 'calc(2*h)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',

    //             text: '900kVArh'
    //         },
    //         PF: {
    //             textVerticalAnchor: 'middle',
    //             fill: '#0acf32',
    //             x: 'calc(0.25*w)',
    //             y: 'calc(2.5*h)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',

    //             text: '0.96'
    //         },
    //         fre: {
    //             textVerticalAnchor: 'middle',
    //             fill: '#0acf32',
    //             x: 'calc(1.65*w)',
    //             y: 'calc(2.5*h)',
    //             fontWeight: 600,
    //             cursor: 'pointer',
    //             fontSize: '1.15rem',

    //             text: '50Hz'
    //         },

    //     },
    //     size: { width: 100, height: 80 },
    //     infor: {}
    // }, {
    //     markup: [
    //         {
    //             tagName: 'rect',
    //             selector: 'rect1'
    //         },
    //         {
    //             tagName: 'rect',
    //             selector: 'rect2'
    //         },
    //         {
    //             tagName: 'line',
    //             selector: 'line1'
    //         },
    //         {
    //             tagName: 'line',
    //             selector: 'line2'
    //         },
    //         {
    //             tagName: 'line',
    //             selector: 'line3'
    //         },
    //         {
    //             tagName: 'line',
    //             selector: 'line4'
    //         },
    //         {
    //             tagName: 'line',
    //             selector: 'line5'
    //         },

    //         {
    //             tagName: 'text',
    //             selector: 'l1',
    //             t:'name'
    //         },
    //         {
    //             tagName: 'text',
    //             selector: 'l2',
    //             t:'name'
    //         },
    //         {
    //             tagName: 'text',
    //             selector: 'l3',
    //             t:'name'
    //         },
    //         {
    //             tagName: 'text',
    //             selector: 'Ut',
    //             t:'name'
    //         },
    //         {
    //             tagName: 'text',
    //             selector: 'It',
    //             t:'name'
    //         },
    //         {
    //             tagName: 'text',
    //             selector: 'Pt',
    //             t:'name'
    //         },
    //         {
    //             tagName: 'text',
    //             selector: 'Qt',
    //             t:'name'
    //         },
    //         {
    //             tagName: 'text',
    //             selector: 'Et',
    //             t:'name'
    //         },
    //         {
    //             tagName: 'text',
    //             selector: 'rEt',
    //             t:'name'
    //         },
    //         {
    //             tagName: 'text',
    //             selector: 'PFt',
    //             t:'name'
    //         },
    //         {
    //             tagName: 'text',
    //             selector: 'fret',
    //             t:'name'
    //         },

    //         {
    //             tagName: 'text',
    //             selector: 'P'
    //         },
    //         {
    //             tagName: 'text',
    //             selector: 'Q'
    //         },
    //         {
    //             tagName: 'text',
    //             selector: 'rE'
    //         },
    //         {
    //             tagName: 'text',
    //             selector: 'E'
    //         },
    //         {
    //             tagName: 'text',
    //             selector: 'PF'
    //         },
    //         {
    //             tagName: 'text',
    //             selector: 'fre'
    //         },

    //         {
    //             tagName: 'text',
    //             selector: 'U1'
    //         },
    //         {
    //             tagName: 'text',
    //             selector: 'I1'
    //         },
    //         {
    //             tagName: 'text',
    //             selector: 'U2'
    //         },
    //         {
    //             tagName: 'text',
    //             selector: 'I2'
    //         },
    //         {
    //             tagName: 'text',
    //             selector: 'U3'
    //         },
    //         {
    //             tagName: 'text',
    //             selector: 'I3'
    //         },

    //     ]
    attrs: {
      it: {
        textVerticalAnchor: "middle",
        fill: "gray",
        t: "name",
        text: "I",
        y: "calc(0.35*h)",
        fontSize: "1rem",
      },
      iavg: {
        textVerticalAnchor: "middle",
        fill: "gray",
        t: "name",
        x: "calc(0.15*w)",
        y: "calc(0.43*h)",
        text: "avg",
        fontSize: "0.8rem",
      },
      pt: {
        textVerticalAnchor: "middle",
        fill: "gray",
        t: "name",
        text: "P",
        y: "calc(0.7*h)",
        fontSize: "1rem",
      },
      pavg: {
        textVerticalAnchor: "middle",
        fill: "gray",
        t: "name",
        x: "calc(0.25*w)",
        y: "calc(0.78*h)",
        text: "3p",
        fontSize: "0.8rem",
      },
      u: {
        textVerticalAnchor: "middle",
        fill: "#0acf32",
        x: "calc(0.9*w)",
        // y: 'calc(0.25*h)',
        fontSize: "1rem",
        fontFamily: "Orbitron",
      },
      i: {
        textVerticalAnchor: "middle",
        fill: "#0acf32",
        x: "calc(0.9*w)",
        y: "calc(0.35*h)",
        fontSize: "1rem",
        fontFamily: "Orbitron",
        cursor: "pointer",
      },
      p: {
        textVerticalAnchor: "middle",
        fill: "#0acf32",
        x: "calc(0.9*w)",
        y: "calc(0.7*h)",
        fontSize: "1rem",
        fontFamily: "Orbitron",
        cursor: "pointer",
      },
      name: {
        textAnchor: "middle",
        textVerticalAnchor: "middle",
        fill: "gray",
        t: "name",
        // text: "",
        fontSize: "1rem",
        x: "calc(-0.5*w)",
        y: "calc(1.25*h)",
        cursor: "pointer",
      },
      ptt: {
        textAnchor: "middle",
        textVerticalAnchor: "middle",
        fill: "gray",
        t: "name",
        // text: "",
        fontSize: "1rem",
        x: "calc(-0.5*w)",
        y: "calc(1.6*h)",
        cursor: "pointer",
      },
    },
    size: { width: 40, height: 80 },
    infor: {},
  },
  {
    markup: [
      // {
      //     tagName: 'text',
      //     selector: 'ut'
      // },
      // {
      //     tagName: 'text',
      //     selector: 'uavg'
      // },
      {
        tagName: "text",
        selector: "iavg",
      },
      {
        tagName: "text",
        selector: "pavg",
      },
      {
        tagName: "text",
        selector: "it",
      },
      {
        tagName: "text",
        selector: "pt",
      },
      {
        tagName: "text",
        selector: "u",
      },
      {
        tagName: "text",
        selector: "i",
      },
      {
        tagName: "text",
        selector: "p",
      },
      {
        tagName: "text",
        selector: "name",
      },
      {
        tagName: "text",
        selector: "ptt",
      },
    ],
  }
);
var edit = {
  id: "",
  flag: 0,
};

$(document).ready(function () {
  graph = new joint.dia.Graph({}, { cellNamespace: customNamespace });

  paper = new joint.dia.Paper({
    //el: document.getElementById('myholder'),
    el: $("#myholder"),
    //gridSize: 10,
    height: $("#diaSpace").height(),
    width: $("#diaSpace").width(),
    model: graph,
    cellViewNamespace: customNamespace,
    interactive: true,
  });

  // event click [+] after choosing selection
  $(".row").on("click", "#addElemment", function (e) {
    edit.flag = 0;
    let selectedValue = $("#optionModal").val();
    switch (selectedValue) {
      case "sdnl":
        $("#modalSDNL").modal("show");
        $("#form-sdnl")[0].reset();
        break;
      case "U":
        $("#modalU").modal("show");
        $("#form-tsda")[0].reset();
        break;
      case "TST":
        let arr = [];
        $("#modalTST").modal("show");
        $("#childbox").empty();

        let ele = $($("#box").children());
        for (let i = 0; i < ele.length; i++) {
          let type = $(ele[i]).attr("type");
          if (type == "tsn") {
            // arr.push(ele);
            let data = JSON.parse($(ele[i]).find(".data").text());
            $("#branchEle")
              .tmpl([
                {
                  id: $("#childbox").children().length,
                  data: JSON.stringify(data),
                  branchNameSave: data.infor.dbName,
                },
              ])
              .appendTo("#childbox");
          }
        }
        $("#form-tst")[0].reset();
        break;
      case "TSN":
        $("#modalTSN").modal("show");
        $("#form-tsn")[0].reset();
        break;
      default:
        break;
    }
  });
  $("#reload").click(function (e) {
    updatePos2Data();
    reloadJoin();
  });

  // event close modal [x]
  $('.modal [data-bs-dismiss="modal"]').click(function () {
    $(this).closest(".modal").modal("hide");
  });

  //event click icon Edit
  $("#box").on("click", ".edit", function () {
    let id = $(this).parent().parent().attr("id");
    console.log(
      JSON.parse(
        $("#" + id)
          .find(".data")
          .text()
      )
    );
    let data = JSON.parse(
      $("#" + id)
        .find(".data")
        .text()
    );
    console.log(data);

    $("#nameBranch").attr("value", data.infor.dbName);
    edit.id = id;
    edit.flag = 1;
    switch ($("#" + id).attr("type")) {
      case "sdnl":
        $("#modalSDNL").modal("show");
        $("#form-sdnl")[0].reset();

        $("#nameModal").attr("value", data.infor.name);
        $("#preLevelModal").attr("value", data.infor.preLevel);
        $("#urlModal").attr("value", data.attrs.icon.xlinkHref.split("/")[2]);
        $("#widthModal").attr("value", data.attrs.icon.width);
        break;
      case "tsda":
        $("#modalU").modal("show");
        $("#form-tsda")[0].reset();
        $("#idP1").attr("value", data.infor.dbItems[0].id);
        $("#chP1").attr("value", data.infor.dbItems[0].ch);
        $("#idP2").attr("value", data.infor.dbItems[1].id);
        $("#chP2").attr("value", data.infor.dbItems[1].ch);
        $("#idP3").attr("value", data.infor.dbItems[2].id);
        $("#chP3").attr("value", data.infor.dbItems[2].ch);
        // $("#U-x-modal").attr("value", data.position.x); $("#U-y-modal").attr("value", data.position.y);

        break;
      case "tst":
        $("#modalTST").modal("show");
        $("#form-tst")[0].reset();
        $("#sum-Itt-modal").attr("value", data.infor.itt);
        $("#sum-Ptt-modal").attr("value", data.infor.ptt);
        // $("#sum-x-modal").attr("value", data.position.x); $("#sum-y-modal").attr("value", data.position.y);
        break;
      case "tsn":
        $("#modalTSN").modal("show");
        $("#form-tsn")[0].reset();
        $("#idP1-branch").attr("value", data.infor.dbItems[0].id);
        $("#chP1-branch").attr("value", data.infor.dbItems[0].ch);
        $("#idP2-branch").attr("value", data.infor.dbItems[1].id);
        $("#chP2-branch").attr("value", data.infor.dbItems[1].ch);
        $("#idP3-branch").attr("value", data.infor.dbItems[2].id);
        $("#chP3-branch").attr("value", data.infor.dbItems[2].ch);
        $("#branch-Itt-modal").attr("value", data.infor.itt);
        $("#branch-Ptt-modal").attr("value", data.infor.ptt);

        // $("#branch-x-modal").attr("value", data.position.x); $("#branch-y-modal").attr("value", data.position.y);
        break;
      default:
        break;
    }
  });
  $("#box").on("click", ".remove", function () {
    $(this).parent().parent().remove();
    let ele = $($("#box").children());

    for (let i = 0; i < ele.length; i++) {
      $(ele[i]).attr("id", i);
      let data = JSON.parse($(ele[i]).find(".data").text());
      data.id = i;
      $(ele[i]).find(".data").text(JSON.stringify(data));
    }

    // console.log(JSON.parse($("#" + id).find(".data").text()));
    // let data = JSON.parse($("#" + id).find(".data").text());
    // console.log(data)
  });

  //save modal SDNL without reload page
  $("#saveModal-sdnl").click(function (e) {
    let outputUrl = $("#urlModal").val();
    let outputWidth = Number($("#widthModal").val());
    let outputName = $("#nameModal").val();
    let outputPreLevel = $("#preLevelModal").val();
    let data = {
      type: "examples.CustomDiaImg",
      id: $("#box").children().length,
      position: { x: 0, y: 0 },
      attrs: {
        icon: { xlinkHref: "public/dia/" + outputUrl, width: outputWidth },
      },
      position: { x: 0, y: 0 },
      infor: {
        type: "img",
        name: outputName,
        preLevel: outputPreLevel,
        nextLevel: "",
      },
    };

    e.preventDefault();
    $("#modalSDNL").modal("hide");

    if (edit.flag == 0) {
      $("#template-sdnl")
        .tmpl([
          {
            id: $("#box").children().length,
            data: JSON.stringify(data),
            width: outputWidth,
            url: outputUrl,
          },
        ])
        .appendTo("#box");
      graph.addCell(data);
    } else {
      $("#" + edit.id + " .data").text(JSON.stringify(data));
      $("#" + edit.id + " .imgWith").val(outputWidth);
      $("#" + edit.id + " .imgUrl").val(outputUrl);
    }
    edit.flag = 0;
  });

  //save modal TSDA without reload page
  $("#saveModal-tsda").click(function (e) {
    let outputX = Number($("#U-x-modal").val());
    let outputY = Number($("#U-y-modal").val());
    let ID1 = $("#idP1").val();
    let CH1 = $("#chP1").val();
    let ID2 = $("#idP2").val();
    let CH2 = $("#chP2").val();
    let ID3 = $("#idP3").val();
    let CH3 = $("#chP3").val();

    let valueSave = [];

    e.preventDefault();
    $("#modalU").modal("hide");

    if ((ID1 != "") & (CH1 != "")) {
      valueSave.push({ id: ID1, ch: CH1 });
    }
    if ((ID2 != "") & (CH2 != "")) {
      valueSave.push({ id: ID2, ch: CH2 });
    }
    if ((ID3 != "") & (CH3 != "")) {
      valueSave.push({ id: ID3, ch: CH3 });
    }

    let data = {
      type: "examples.CustomDiaVolt",
      id: $("#box").children().length,
      attrs: { u: { text: "222.1 V", fill: "#0acf32" } },
      position: { x: outputX, y: outputY },
      infor: {
        type: "volt",
        dbItems: valueSave,
      },
    };
    if (edit.flag == 0) {
      graph.addCell(data);
      $("#template-tsda")
        .tmpl([
          {
            id: $("#box").children().length,
            data: JSON.stringify(data),
            Ux: outputX,
            Uy: outputY,
          },
        ])
        .appendTo("#box");
    } else {
      $("#" + edit.id + " .data").text(JSON.stringify(data));
    }
    edit.flag = 0;
  });
  //save modal TST without reload page
  $("#saveModal-tst").click(function (e) {
    let outputX = Number($("#sum-x-modal").val());
    let outputY = Number($("#sum-y-modal").val());
    let c_itt,
      c_ptt,
      ittSuVal = 0,
      pttSuVal = 0;
    e.preventDefault();
    $("#modalTST").modal("hide");

    //check the checkbox status
    let dataArr = [],
      nameArr = [];
    let ele = $("#childbox").children();

    if ($("#sum-Itt-modal").val() != "") {
      ittSuVal = parseFloat($("#sum-Itt-modal").val());
      c_itt = 1;
    } else {
      c_itt = 0;
    }

    if ($("#sum-Ptt-modal").val() != "") {
      pttSuVal = parseFloat($("#sum-Ptt-modal").val());
      c_ptt = 1;
    } else {
      c_ptt = 0;
    }

    for (let i = 0; i < ele.length; i++) {
      let status = $(ele[i]).find(".checkbox").is(":checked");
      if (status) {
        console.log(JSON.parse($(ele[i]).find(".data").text()));
        let bufData = JSON.parse($(ele[i]).find(".data").text());
        dataArr.push(bufData.infor.dbItems);
        nameArr.push(bufData.infor.dbName);
        // attArr.push([
        //     $(ele[i]).attr("jnameP1"),
        //     $(ele[i]).attr("jchP1"),
        //     $(ele[i]).attr("jnameP2"),
        //     $(ele[i]).attr("jchP2"),
        //     $(ele[i]).attr("jnameP3"),
        //     $(ele[i]).attr("jchP3"),
        //     $(ele[i]).attr("jname"),
        //     $(ele[i]).attr("jitt"),
        //     $(ele[i]).attr("jptt"),
        // ]);
        // check the id and ch of 1P - 3P

        //check the value of sum-itt and sum-ptt
        if (c_itt == 0) {
          ittSuVal += Number(bufData.infor.itt);
        }
        if (c_ptt == 0) {
          pttSuVal += Number(bufData.infor.ptt);
        }
      }
    }
    let data = {
      type: "examples.CustomDiaData",
      id: $("#box").children().length,
      attrs: {
        i: { text: "3.9 A" },
        p: { text: "26.1 kW" },
      },
      position: { x: outputX, y: outputY },
      infor: {
        type: "diaDataTotal",
        dbItems: dataArr,
        dbName: nameArr,
        itt: Number(ittSuVal),
        ptt: Number(pttSuVal),
        nextLevel: "",
      },
    };
    if (edit.flag == 0) {
      graph.addCell(data);
      $("#template-tst")
        .tmpl([
          {
            id: $("#box").children().length,
            data: JSON.stringify(data),
            x: outputX,
            y: outputY,
          },
        ])
        .appendTo("#box");
    } else {
      $("#" + edit.id + " .data").text(JSON.stringify(data));
    }
    edit.flag = 0;
  });
  //save modal TSN without reload page
  $("#saveModal-tsn").click(function (e) {
    let outputX = Number($("#branch-x-modal").val());
    let outputY = Number($("#branch-y-modal").val());
    let ID1 = $("#idP1-branch").val();
    let CH1 = $("#chP1-branch").val();
    let ID2 = $("#idP2-branch").val();
    let CH2 = $("#chP2-branch").val();
    let ID3 = $("#idP3-branch").val();
    let CH3 = $("#chP3-branch").val();
    let nameBr = $("#nameBranch").val();
    nameBr = nameBr.replace("\\n", "\n");
    let nlBr = $("#nextLevelBranch").val();
    let ittBr = Number($("#branch-Itt-modal").val());
    let pttBr = Number($("#branch-Ptt-modal").val());
    let valueSave = [];
    e.preventDefault();
    $("#modalTSN").modal("hide");

    if ((ID1 != "") & (CH1 != "")) {
      valueSave.push({ id: ID1, ch: CH1 });
    }
    if ((ID2 != "") & (CH2 != "")) {
      valueSave.push({ id: ID2, ch: CH2 });
    }
    if ((ID3 != "") & (CH3 != "")) {
      valueSave.push({ id: ID3, ch: CH3 });
    }
    //add element thông số nhánh vào thông số tổng
    let data = {
      type: "examples.CustomDiaData",
      id: $("#box").children().length,
      attrs: {
        i: { text: "8.1 A", fill: "#0acf32" },
        name: { text: nameBr },
        p: { text: "4.3 kW", fill: "#0acf32" },
        ptt: { text: "(" + pttBr + "kW)" },
      },
      position: { x: outputX, y: outputY },
      infor: {
        type: "diaData",
        dbItems: valueSave,
        dbName: nameBr,
        itt: ittBr,
        ptt: pttBr,
        nextLevel: nlBr,
      },
    };
    if (edit.flag == 0) {
      graph.addCell(data);
      $("#template-tsn")
        .tmpl([
          {
            id: $("#box").children().length,
            name: nameBr,
            data: JSON.stringify(data),
            x: outputX,
            y: outputY,
          },
        ])
        .appendTo("#box");
    } else {
      $("#" + edit.id + " .data").text(JSON.stringify(data));
    }
    edit.flag = 0;
  });

  $("#saveButton").click(function (e) {
    doCreatDataforJoint();
  });
  //update the position x-y of element in slidebar
  paper.on("element:pointerup", function (elementView) {
    $("#" + elementView.model.attributes.id + " .posx").val(
      Number(elementView.model.attributes.position.x)
    );
    $("#" + elementView.model.attributes.id + " .posy").val(
      Number(elementView.model.attributes.position.y)
    );
    console.log(elementView.model.attributes.id);
    console.log(
      $("#" + elementView.model.attributes.id)
        .find(".data")
        .text()
    );
    if (
      $("#" + elementView.model.attributes.id)
        .find(".data")
        .text() != ""
    ) {
      let data = JSON.parse(
        $("#" + elementView.model.attributes.id)
          .find(".data")
          .text()
      );
      if ($("#" + elementView.model.attributes.id).attr("type") != "sdnl") {
        data.position.x = elementView.model.attributes.position.x;
        data.position.y = elementView.model.attributes.position.y;
      }
      $("#" + elementView.model.attributes.id)
        .find(".data")
        .text(JSON.stringify(data));
    }
  });

  if (PreData.length > 0) {
    for (let i = 0; i < PreData.length; i++) {
      switch (PreData[i].infor.type) {
        case "img":
          $("#template-sdnl")
            .tmpl([
              {
                id: $("#box").children().length,
                data: JSON.stringify(PreData[i]),
                width: PreData[i].attrs.icon.width,
                url: PreData[i].attrs.icon.xlinkHref,
              },
            ])
            .appendTo("#box");
          graph.addCell(PreData[i]);
          break;
        case "volt":
          PreData[i].attrs = { u: { text: "222.1 V", fill: "#0acf32" } };
          graph.addCell(PreData[i]);
          $("#template-tsda")
            .tmpl([
              {
                id: $("#box").children().length,
                data: JSON.stringify(PreData[i]),
                Ux: PreData[i].position.x,
                Uy: PreData[i].position.y,
              },
            ])
            .appendTo("#box");
          break;
        case "diaData":
          PreData[i].attrs = {
            i: { text: "8.1 A", fill: "#0acf32" },
            name: { text: PreData[i].infor.dbName },
            p: { text: "4.3 kW", fill: "#0acf32" },
            ptt: { text: "(" + PreData[i].infor.ptt + "kW)" },
          };
          graph.addCell(PreData[i]);
          $("#template-tsn")
            .tmpl([
              {
                id: $("#box").children().length,
                name: PreData[i].infor.dbName,
                data: JSON.stringify(PreData[i]),
                x: PreData[i].position.x,
                y: PreData[i].position.y,
              },
            ])
            .appendTo("#box");
          break;
        case "diaDataTotal":
          PreData[i].attrs = {
            i: { text: "3.9 A" },
            p: { text: "26.1 kW" },
          };
          graph.addCell(PreData[i]);
          $("#template-tst")
            .tmpl([
              {
                id: $("#box").children().length,
                data: JSON.stringify(PreData[i]),
                x: PreData[i].position.x,
                y: PreData[i].position.y,
              },
            ])
            .appendTo("#box");
          break;
      }
    }
  }
});

reloadJoin = () => {
  let ele = $($("#box").children());
  graph.removeCells(graph.getCells());
  for (let i = 0; i < ele.length; i++) {
    // console.log(JSON.parse($(ele[i]).find(".data").text()))
    graph.addCell(JSON.parse($(ele[i]).find(".data").text()));
  }
  for (let i = 1; i < 11; i++) {
    setTimeout(scale, i * 200);
  }
};
updatePos2Data = () => {
  let ele = $($("#box").children());
  for (let i = 0; i < ele.length; i++) {
    let data = JSON.parse($(ele[i]).find(".data").text());
    // console.log($(ele[i]).find(".posx").val())
    if ($(ele[i]).attr("type") != "sdnl") {
      data.position.x = Number($(ele[i]).find(".posx").val());
      data.position.y = Number($(ele[i]).find(".posy").val());
    }

    $(ele[i]).find(".data").text(JSON.stringify(data));
    // console.log(JSON.stringify(data))
  }
};
//**************end new index */
scale = () => {
  let contentDim = paper.getContentArea();
  // console.log("dim")
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
function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
doCreatDataforJoint = () => {
  let data = "[";
  let dataJoint = graph.toJSON().cells;
  dataJoint.forEach((element) => {
    if (element.type == "examples.CustomDiaImg") {
      data =
        data +
        JSON.stringify({
          type: element.type,
          id: element.id,
          attrs: element.attrs,
          position: element.position,
          infor: element.infor,
        });
    } else {
      data =
        data +
        JSON.stringify({
          type: element.type,
          id: element.id,
          attrs: {},
          position: element.position,
          infor: element.infor,
        });
    }

    data = data + "\n,";
  });
  data = data + "]";
  console.log(data);
  download(data, "data.txt", "text/plain");
};
