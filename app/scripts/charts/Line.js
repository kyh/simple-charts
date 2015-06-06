'use strict';

var Chart = require('./Chart');

function LineChart(data, config) {
  this.data = data;
  this.config = config;

  // Setup chart width/height, axis and scales
  Chart.setupGraph.call(this, config);

  // Generate the Graph
  this.svg = Chart.generateSVG.call(this);
  this.generateLines();

  return this;
}

LineChart.prototype.generateLines = function(){
  var self = this;
  var classNames = self.config.classes;
  var lineGen = d3.svg.line()
    .x(function(d) { return self.scale.xScale(d.label); })
    .y(function(d) { return self.scale.yScale(d.data); });

  var path = self.svg.append('path')
    .attr({
      'class': classNames.line,
      'd': lineGen(self.data)
    });

  var totalLength = path.node().getTotalLength();
  path.attr({
      'stroke-dasharray': totalLength + ' ' + totalLength,
      'stroke-dashoffset': totalLength
    })
    .transition()
    .ease('linear')
    .duration(200 * self.data.length)
    .attr('stroke-dashoffset', 0);

  var circles = self.svg.selectAll('circles').data(self.data);
  var circle = circles.enter().append('g').attr('class', classNames.group)
    .on('mouseover', function(){
      d3.select(this.childNodes[0]).transition().attr('r', 7);
    })
    .on('mouseout', function(){
      d3.select(this.childNodes[0]).transition().attr('r', 5);
    });
  circle.append('circle')
    .attr({
      'class': classNames.point,
      'cx': function(d) { return self.scale.xScale(d.label); },
      'cy': function(d) { return self.scale.yScale(d.data); },
      'r': 0
    })
    .transition()
    .duration(1200)
    .delay(function(d, i){ return 200 * i; })
    .ease('elastic')
    .attr('r', 5);

  circle.append('text')
    .text(function(d){ return d.label; })
    .attr({
      'class': classNames.label,
      'x': function(d) { return self.scale.xScale(d.label); },
      'y': self.chart.height + 10,
      'text-anchor': 'middle',
      'opacity': 0
    })
    .transition()
    .delay(function(d, i) { return 200 * i; })
    .attr({
      'y': self.config.chartHeight - self.config.margin.bot,
      'opacity': 1
    });
};

module.exports = LineChart;
