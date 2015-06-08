'use strict';

var Chart = require('./Chart');

function BarChart(data, config) {
  this.data = data;
  this.config = config;

  // Setup chart width/height, axis and scales
  this.setupGraph('bar', config);

  // Generate the Graph
  this.generateSVG(true);
  this.generateBars();

  return this;
}

BarChart.prototype = Object.create(Chart);

BarChart.prototype.generateBars = function() {
  // BARS
  var self = this;
  var scale = self.scale;
  var chart = self.chart;

  var classes = self.config.classes;
  var bars = self.svg.selectAll('bars').data(self.data);
  var bar = bars.enter().append('g').attr('class', classes.group);

  bar.append('rect')
    .attr({
      'x': function(d) { return scale.xScale(d.label); },
      'y': chart.height,
      'height': 0,
      'width': scale.xScale.rangeBand(),
      'class': classes.bar
    })
    .transition()
    .duration(600)
    .delay(function(d, i) { return 200 * i; })
    .attr({
      'y': function(d) { return scale.yScale(d.data); },
      'height': function(d) { return chart.height - scale.yScale(d.data); },
    });

  bar.append('text')
    .text(function(d){ return d.label; })
    .attr({
      'class': classes.label,
      'x': function(d) {
        return scale.xScale(d.label) + scale.xScale.rangeBand()/2;
      },
      'y': chart.height + 10,
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

BarChart.prototype.removeAllBars = function(callback) {
  var self = this;
  var classes = self.config.classes;
  var bars = self.svg.selectAll('.'+classes.group);

  bars.select('rect')
    .transition()
    .attr({
      'height': 0,
      'y': self.chart.height
    })
    .each('end', function(){
      d3.select(this.parentNode).remove();
    });

  bars.select('text')
    .transition()
    .attr({
      'y': self.chart.height + 10,
      'opacity': 0
    })
    .call(Chart.endAll, callback);

  return self;
};

BarChart.prototype.updateData = function(newData) {
  var self = this;
  var svg = self.svg;
  self.data = newData;

  self.removeAllBars(function(){
    Chart.setupGraph.call(self, 'bar', self.config);
    svg.selectAll('g.grid.axis')
      .transition().duration(800).ease('sin-in-out')
      .call(self.axis.yAxis);
    self.generateBars();
  });
};

module.exports = BarChart;
