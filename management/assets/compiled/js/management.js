var DiagramData = [];
var namespace = joint.shapes;
var graph;
var paper;
var paper1;
$(document).ready(function () {
  graph = new joint.dia.Graph({}, { cellNamespace: namespace });

  paper = new joint.dia.Paper({
    el: $("#myholder"),
    model: graph,
    height: $("#myholder").height(),
    width: $("#myholder").width(),
    interactive: false,
  });

  // hàm tự động scale về giữa cho jointJS
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
});
