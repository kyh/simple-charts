'use strict';

var Chart = require('./Chart');

function DonutChart(data, config) {
  this.data = data;
  this.config = config;

  // Setup chart width/height
  this.setupGraph('donut', config);

  // Generate the Graph
  this.generateSVG(false);
  this.generateDonut();

  return this;
}

DonutChart.prototype = Object.create(Chart);

DonutChart.prototype.generateDonut = function() {
  var self = this;
  var radius = Math.min(self.chart.width, self.chart.height) / 2;
  var color = d3.scale.ordinal().range(self.config.colorScale);

  var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(radius - 5);

  var pie = d3.layout.pie()
    .sort(null)
    .startAngle(1 * Math.PI)
    .endAngle(3 * Math.PI)
    .value(function(d) { return d.data; });

  var g = self.svg.selectAll('.arc')
    .data(pie(self.data))
    .enter()
    .append('g')
    .attr('class', 'arc');

  g.append('path')
    .style('fill', function(d) { return color(d.data.label); })
    .transition()
    .delay(function(d, i) { return i * 500; })
    .duration(500)
    .attrTween('d', function(d) {
      var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
      return function(t) {
        d.endAngle = i(t);
        return arc(d);
      };
    });
};

module.exports = DonutChart;
