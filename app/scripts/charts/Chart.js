'use strict';

function Chart(data, config) {
  this.data = data;
  this.chart = {
    height: config.chartHeight - config.margin.top - config.margin.bot,
    width: config.chartWidth - config.margin.left - config.margin.right,
    scale: generateScales.call(this, data)
  };
}

function generateScales(data){
  return {
    'xScale': d3.scale.ordinal()
      .domain(data.map(function(d) { return d.label; }))
      .rangeRoundBands([0, this.chart.width], 0.5),
    'yScale': d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.data; })])
      .range([this.chart.height, 0])
  };
}

module.exports = Chart;
