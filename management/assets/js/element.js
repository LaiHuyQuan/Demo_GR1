//JoinJS element
var CustomLayoutData = joint.dia.Element.define(
  "examples.CustomLayoutData",
  {
    attrs: {
      name: {
        textAnchor: "middle",
        textVerticalAnchor: "middle",
        fill: "gray",
        t: "name",
        fontSize: "1.25rem",
      },
      des: {
        y: "calc(0.2*h)",
        textAnchor: "middle",
        textVerticalAnchor: "middle",
        fill: "gray",
        t: "name",
        fontSize: "1rem",
      },
      consumption: {
        y: "calc(0.3*h)",
        textAnchor: "middle",
        textVerticalAnchor: "middle",
        fill: "#0acf32",
        fontSize: "1.25rem",

        fontFamily: "Orbitron",
      },
      money: {
        y: "calc(0.5*h)",
        textAnchor: "middle",
        textVerticalAnchor: "middle",
        fill: "#0acf32",
        fontSize: "1rem",
      },
    },
    size: { width: 80, height: 80 },
    infor: {},
  },
  {
    markup: [
      {
        tagName: "text",
        selector: "name",
      },
      {
        tagName: "text",
        selector: "des",
      },
      {
        tagName: "text",
        selector: "consumption",
      },
      {
        tagName: "text",
        selector: "money",
      },
    ],
  }
);
var CustomDiaImg = joint.dia.Element.define(
  "examples.CustomDiaImg",
  {
    attrs: {
      img: {
        // x: "-calc(0.5*w)",
        // anchor: "center",
        // width: "calc(1*w)",
        // height: "calc(1*h)",
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
        fill: "gray",
        t: "name",
        text: "U ",
        fontSize: "1rem",
      },
      uavg: {
        textVerticalAnchor: "middle",
        fill: "gray",
        t: "name",
        x: "calc(0.3*w)",
        y: "calc(0.08*h)",
        text: "avg",
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

var CustomDiaData = joint.dia.Element.define(
  "examples.CustomDiaData",
  {
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

var CustomControl = joint.dia.Element.define(
  "examples.CustomControl",
  {
    attrs: {
      icon: {
        // x: '-calc(0.5*w)',
        // // anchor:'center',
        width: "calc(1*w)",
        height: "calc(1*h)",
      },
    },
    // size: { width: 40, height: 40 },
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
var CustomLayoutSensor = joint.dia.Element.define(
  "examples.CustomLayoutSensor",
  {
    attrs: {
      icon: {
        // x: '-calc(0.5*w)',
        // // anchor:'center',
        width: "calc(1*w)",
        height: "calc(1*h)",
      },
    },
    size: { width: 40, height: 40 },
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
