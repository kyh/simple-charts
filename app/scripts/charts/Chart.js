'use strict';

function setupGraph(config) {
  this.chart = {
    height: config.chartHeight - config.margin.top - config.margin.bot,
    width: config.chartWidth - config.margin.left - config.margin.right
  };
  this.scale = generateScales.call(this);
  this.axis = generateAxis.call(this);
}

function generateSVG() {
  var self = this;
  var chart = self.chart;
  var margin = self.config.margin;

  var svg = d3.select(self.config.elementID)
      .append('svg')
      .attr({
        'width': chart.width + margin.left + margin.right,
        'height': chart.height + margin.top + margin.bot,
      })
      .append('g')
      .attr('transform', 'translate('+margin.left+','+margin.top+')');

  svg.append('g')
    .attr('class', 'grid axis')
    .call(self.axis.yAxis);

  return svg;
}

function generateAxisLines(svg, chart) {
  // X & Y AXIS
  var axis = svg.append('g').attr('class', 'axis');
  axis.append('line')
    .attr({
      'y1': chart.height,
      'x2': chart.width,
      'y2': chart.height,
      'stroke-width': 1,
      'class': 'x'
    });
  axis.append('line')
    .attr({
      'y2': chart.height,
      'stroke-width': 1,
      'class': 'y'
    });

  return axis;
}

function generateScales() {
  return {
    'xScale': d3.scale.ordinal()
      .domain(this.data.map(function(d) { return d.label; }))
      .rangeRoundBands([0, this.chart.width], 0.5),
    'yScale': d3.scale.linear()
      .domain([0, d3.max(this.data, function(d) { return d.data; })])
      .range([this.chart.height, 0])
  };
}

function generateTicks() {
  return d3.svg.axis()
    .scale(this.scale.yScale)
    .orient('left')
    .ticks(this.config.axis.y.ticks)
    .outerTickSize(0)
    .tickSize(-this.chart.width);
}

function generateAxis() {
  return {
    'yAxis': generateTicks.call(this),
    'xAxis': null
  };
}

function endAll(transition, callback) {
  var n;
  if (transition.empty()) {
    callback();
  } else {
    n = transition.size();
    transition.each('end', function () {
      n--;
      if (n === 0) {
        callback();
      }
    });
  }
}

var Chart = {
  setupGraph: setupGraph,
  generateSVG: generateSVG,
  generateAxisLines: generateAxisLines,
  generateScales: generateScales,
  generateAxis: generateAxis,
  endAll: endAll
};

module.exports = Chart;
