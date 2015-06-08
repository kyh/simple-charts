(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var BarChart = require('./charts/Bar.js');
var LineChart = require('./charts/Line.js');
var DonutChart = require('./charts/Donut.js');

var data = [{
    label: 'Jan',
    data: 35
  }, {
    label: 'Feb',
    data: 20
  }, {
    label: 'Mar',
    data: 28
  }, {
    label: 'Apr',
    data: 8
  }, {
    label: 'May',
    data: 17
  }, {
    label: 'Jun',
    data: 38
  }, {
    label: 'Jul',
    data: 20
  }
];

function extend(destination, source) {
  for (var property in source) {
    destination[property] = source[property];
  }
  return destination;
}

function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Bar Chart
var barChartConfig = {
  elementID: '#bar-chart',
  chartWidth: document.querySelector('.bar-chart-container').offsetWidth,
  chartHeight: 400,
  classes: {
    group: 'bar-group',
    bar: 'bar',
    label: 'labels'
  },
  axis: {
    y: {
      ticks: 8
    }
  },
  margin: {
    top: 20,
    bot: 30,
    left: 30,
    right: 0
  }
};

var barChart = new BarChart(data, barChartConfig);
console.log(barChart);

(function updateChart(d){
  var updatedData = d || data.concat([
    { label: 'Aug', data: 70 },
    { label: 'Sep', data: 14 }
  ]);
  setTimeout(function(){
    barChart.updateData(updatedData);
    if (updatedData.length < 4) {
      updateChart(data);
    } else {
      updateChart(updatedData.slice(~~(Math.random() * updatedData.length - 2)));
    }
  }, ~~(Math.random() * 5000) + 5000);
})();

// Line Chart
var lineChartConfig = {
  elementID: '#line-chart',
  chartWidth: document.querySelector('.line-chart-container').offsetWidth,
  chartHeight: 400,
  axis: {
    y: {
      ticks: 8
    }
  },
  classes: {
    group: 'group',
    point: 'point',
    line: 'line',
    label: 'labels'
  },
  margin: {
      top: 20,
      bot: 30,
      left: 30,
      right: 0
  }
};

var lineChart = new LineChart(data, lineChartConfig);
console.log(lineChart);

// Donut Chart
var donutChartConfig = {
  elementID: '#donut-chart',
  chartWidth: 150,
  chartHeight: 150,
  colorScale: ['#56CB84', '#f1f3f2'],
  margin: {
      top: 0,
      bot: 0,
      left: 0,
      right: 0
  }
};

var donutChartConfig2 = extend(copy(donutChartConfig), {
  elementID: '#donut-chart2',
  colorScale: ['#2cc5c6', '#f1f3f2']
});

var donutChartConfig3 = extend(copy(donutChartConfig), {
  elementID: '#donut-chart3',
  colorScale: ['#58699A', '#f1f3f2']
});

var donutChart = new DonutChart([].concat(data[0], data[1]), donutChartConfig);
var donutChart2 = new DonutChart([].concat(data[2], data[3]), donutChartConfig2);
var donutChart3 = new DonutChart([].concat(data[4], data[5]), donutChartConfig3);

console.log(donutChart);

},{"./charts/Bar.js":2,"./charts/Donut.js":4,"./charts/Line.js":5}],2:[function(require,module,exports){
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

},{"./Chart":3}],3:[function(require,module,exports){
'use strict';

function setupGraph(type, config) {
  this.chart = {
    height: config.chartHeight - config.margin.top - config.margin.bot,
    width: config.chartWidth - config.margin.left - config.margin.right
  };

  if (type === 'bar' || type === 'line') {
    this.scale = generateScales.call(this);
    this.axis = generateAxis.call(this);
  }
}

function generateSVG(grid) {
  var self = this;
  var chart = self.chart;
  var margin = self.config.margin;

  var svg = d3.select(self.config.elementID)
      .append('svg')
      .attr({
        'width': chart.width + margin.left + margin.right,
        'height': chart.height + margin.top + margin.bot,
      }).append('g');

  if (grid) {
    svg.attr('transform', 'translate('+margin.left+','+margin.top+')');
    svg.append('g')
      .attr('class', 'grid axis')
      .call(self.axis.yAxis);
  } else {
    svg.attr('transform', 'translate(' + ((chart.width/2)+margin.left) + ',' + ((chart.height/2)+margin.top) + ')');
  }

  self.svg = svg;
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

},{}],4:[function(require,module,exports){
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

},{"./Chart":3}],5:[function(require,module,exports){
'use strict';

var Chart = require('./Chart');

function LineChart(data, config) {
  this.data = data;
  this.config = config;

  // Setup chart width/height, axis and scales
  this.setupGraph('line', config);

  // Generate the Graph
  this.generateSVG(true);
  this.generateLines();

  return this;
}

LineChart.prototype = Object.create(Chart);

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

},{"./Chart":3}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL2FwcC9zY3JpcHRzL21haW4uanMiLCIvVXNlcnMva2FpeXVoc3UvUHJvamVjdHMvbGFicy9kMy9hcHAvc2NyaXB0cy9jaGFydHMvQmFyLmpzIiwiL1VzZXJzL2thaXl1aHN1L1Byb2plY3RzL2xhYnMvZDMvYXBwL3NjcmlwdHMvY2hhcnRzL0NoYXJ0LmpzIiwiL1VzZXJzL2thaXl1aHN1L1Byb2plY3RzL2xhYnMvZDMvYXBwL3NjcmlwdHMvY2hhcnRzL0RvbnV0LmpzIiwiL1VzZXJzL2thaXl1aHN1L1Byb2plY3RzL2xhYnMvZDMvYXBwL3NjcmlwdHMvY2hhcnRzL0xpbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBCYXJDaGFydCA9IHJlcXVpcmUoJy4vY2hhcnRzL0Jhci5qcycpO1xudmFyIExpbmVDaGFydCA9IHJlcXVpcmUoJy4vY2hhcnRzL0xpbmUuanMnKTtcbnZhciBEb251dENoYXJ0ID0gcmVxdWlyZSgnLi9jaGFydHMvRG9udXQuanMnKTtcblxudmFyIGRhdGEgPSBbe1xuICAgIGxhYmVsOiAnSmFuJyxcbiAgICBkYXRhOiAzNVxuICB9LCB7XG4gICAgbGFiZWw6ICdGZWInLFxuICAgIGRhdGE6IDIwXG4gIH0sIHtcbiAgICBsYWJlbDogJ01hcicsXG4gICAgZGF0YTogMjhcbiAgfSwge1xuICAgIGxhYmVsOiAnQXByJyxcbiAgICBkYXRhOiA4XG4gIH0sIHtcbiAgICBsYWJlbDogJ01heScsXG4gICAgZGF0YTogMTdcbiAgfSwge1xuICAgIGxhYmVsOiAnSnVuJyxcbiAgICBkYXRhOiAzOFxuICB9LCB7XG4gICAgbGFiZWw6ICdKdWwnLFxuICAgIGRhdGE6IDIwXG4gIH1cbl07XG5cbmZ1bmN0aW9uIGV4dGVuZChkZXN0aW5hdGlvbiwgc291cmNlKSB7XG4gIGZvciAodmFyIHByb3BlcnR5IGluIHNvdXJjZSkge1xuICAgIGRlc3RpbmF0aW9uW3Byb3BlcnR5XSA9IHNvdXJjZVtwcm9wZXJ0eV07XG4gIH1cbiAgcmV0dXJuIGRlc3RpbmF0aW9uO1xufVxuXG5mdW5jdGlvbiBjb3B5KG9iaikge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLy8gQmFyIENoYXJ0XG52YXIgYmFyQ2hhcnRDb25maWcgPSB7XG4gIGVsZW1lbnRJRDogJyNiYXItY2hhcnQnLFxuICBjaGFydFdpZHRoOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFyLWNoYXJ0LWNvbnRhaW5lcicpLm9mZnNldFdpZHRoLFxuICBjaGFydEhlaWdodDogNDAwLFxuICBjbGFzc2VzOiB7XG4gICAgZ3JvdXA6ICdiYXItZ3JvdXAnLFxuICAgIGJhcjogJ2JhcicsXG4gICAgbGFiZWw6ICdsYWJlbHMnXG4gIH0sXG4gIGF4aXM6IHtcbiAgICB5OiB7XG4gICAgICB0aWNrczogOFxuICAgIH1cbiAgfSxcbiAgbWFyZ2luOiB7XG4gICAgdG9wOiAyMCxcbiAgICBib3Q6IDMwLFxuICAgIGxlZnQ6IDMwLFxuICAgIHJpZ2h0OiAwXG4gIH1cbn07XG5cbnZhciBiYXJDaGFydCA9IG5ldyBCYXJDaGFydChkYXRhLCBiYXJDaGFydENvbmZpZyk7XG5jb25zb2xlLmxvZyhiYXJDaGFydCk7XG5cbihmdW5jdGlvbiB1cGRhdGVDaGFydChkKXtcbiAgdmFyIHVwZGF0ZWREYXRhID0gZCB8fCBkYXRhLmNvbmNhdChbXG4gICAgeyBsYWJlbDogJ0F1ZycsIGRhdGE6IDcwIH0sXG4gICAgeyBsYWJlbDogJ1NlcCcsIGRhdGE6IDE0IH1cbiAgXSk7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICBiYXJDaGFydC51cGRhdGVEYXRhKHVwZGF0ZWREYXRhKTtcbiAgICBpZiAodXBkYXRlZERhdGEubGVuZ3RoIDwgNCkge1xuICAgICAgdXBkYXRlQ2hhcnQoZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVwZGF0ZUNoYXJ0KHVwZGF0ZWREYXRhLnNsaWNlKH5+KE1hdGgucmFuZG9tKCkgKiB1cGRhdGVkRGF0YS5sZW5ndGggLSAyKSkpO1xuICAgIH1cbiAgfSwgfn4oTWF0aC5yYW5kb20oKSAqIDUwMDApICsgNTAwMCk7XG59KSgpO1xuXG4vLyBMaW5lIENoYXJ0XG52YXIgbGluZUNoYXJ0Q29uZmlnID0ge1xuICBlbGVtZW50SUQ6ICcjbGluZS1jaGFydCcsXG4gIGNoYXJ0V2lkdGg6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lLWNoYXJ0LWNvbnRhaW5lcicpLm9mZnNldFdpZHRoLFxuICBjaGFydEhlaWdodDogNDAwLFxuICBheGlzOiB7XG4gICAgeToge1xuICAgICAgdGlja3M6IDhcbiAgICB9XG4gIH0sXG4gIGNsYXNzZXM6IHtcbiAgICBncm91cDogJ2dyb3VwJyxcbiAgICBwb2ludDogJ3BvaW50JyxcbiAgICBsaW5lOiAnbGluZScsXG4gICAgbGFiZWw6ICdsYWJlbHMnXG4gIH0sXG4gIG1hcmdpbjoge1xuICAgICAgdG9wOiAyMCxcbiAgICAgIGJvdDogMzAsXG4gICAgICBsZWZ0OiAzMCxcbiAgICAgIHJpZ2h0OiAwXG4gIH1cbn07XG5cbnZhciBsaW5lQ2hhcnQgPSBuZXcgTGluZUNoYXJ0KGRhdGEsIGxpbmVDaGFydENvbmZpZyk7XG5jb25zb2xlLmxvZyhsaW5lQ2hhcnQpO1xuXG4vLyBEb251dCBDaGFydFxudmFyIGRvbnV0Q2hhcnRDb25maWcgPSB7XG4gIGVsZW1lbnRJRDogJyNkb251dC1jaGFydCcsXG4gIGNoYXJ0V2lkdGg6IDE1MCxcbiAgY2hhcnRIZWlnaHQ6IDE1MCxcbiAgY29sb3JTY2FsZTogWycjNTZDQjg0JywgJyNmMWYzZjInXSxcbiAgbWFyZ2luOiB7XG4gICAgICB0b3A6IDAsXG4gICAgICBib3Q6IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgcmlnaHQ6IDBcbiAgfVxufTtcblxudmFyIGRvbnV0Q2hhcnRDb25maWcyID0gZXh0ZW5kKGNvcHkoZG9udXRDaGFydENvbmZpZyksIHtcbiAgZWxlbWVudElEOiAnI2RvbnV0LWNoYXJ0MicsXG4gIGNvbG9yU2NhbGU6IFsnIzJjYzVjNicsICcjZjFmM2YyJ11cbn0pO1xuXG52YXIgZG9udXRDaGFydENvbmZpZzMgPSBleHRlbmQoY29weShkb251dENoYXJ0Q29uZmlnKSwge1xuICBlbGVtZW50SUQ6ICcjZG9udXQtY2hhcnQzJyxcbiAgY29sb3JTY2FsZTogWycjNTg2OTlBJywgJyNmMWYzZjInXVxufSk7XG5cbnZhciBkb251dENoYXJ0ID0gbmV3IERvbnV0Q2hhcnQoW10uY29uY2F0KGRhdGFbMF0sIGRhdGFbMV0pLCBkb251dENoYXJ0Q29uZmlnKTtcbnZhciBkb251dENoYXJ0MiA9IG5ldyBEb251dENoYXJ0KFtdLmNvbmNhdChkYXRhWzJdLCBkYXRhWzNdKSwgZG9udXRDaGFydENvbmZpZzIpO1xudmFyIGRvbnV0Q2hhcnQzID0gbmV3IERvbnV0Q2hhcnQoW10uY29uY2F0KGRhdGFbNF0sIGRhdGFbNV0pLCBkb251dENoYXJ0Q29uZmlnMyk7XG5cbmNvbnNvbGUubG9nKGRvbnV0Q2hhcnQpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2hhcnQgPSByZXF1aXJlKCcuL0NoYXJ0Jyk7XG5cbmZ1bmN0aW9uIEJhckNoYXJ0KGRhdGEsIGNvbmZpZykge1xuICB0aGlzLmRhdGEgPSBkYXRhO1xuICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAvLyBTZXR1cCBjaGFydCB3aWR0aC9oZWlnaHQsIGF4aXMgYW5kIHNjYWxlc1xuICB0aGlzLnNldHVwR3JhcGgoJ2JhcicsIGNvbmZpZyk7XG5cbiAgLy8gR2VuZXJhdGUgdGhlIEdyYXBoXG4gIHRoaXMuZ2VuZXJhdGVTVkcodHJ1ZSk7XG4gIHRoaXMuZ2VuZXJhdGVCYXJzKCk7XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbkJhckNoYXJ0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ2hhcnQpO1xuXG5CYXJDaGFydC5wcm90b3R5cGUuZ2VuZXJhdGVCYXJzID0gZnVuY3Rpb24oKSB7XG4gIC8vIEJBUlNcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgc2NhbGUgPSBzZWxmLnNjYWxlO1xuICB2YXIgY2hhcnQgPSBzZWxmLmNoYXJ0O1xuXG4gIHZhciBjbGFzc2VzID0gc2VsZi5jb25maWcuY2xhc3NlcztcbiAgdmFyIGJhcnMgPSBzZWxmLnN2Zy5zZWxlY3RBbGwoJ2JhcnMnKS5kYXRhKHNlbGYuZGF0YSk7XG4gIHZhciBiYXIgPSBiYXJzLmVudGVyKCkuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCBjbGFzc2VzLmdyb3VwKTtcblxuICBiYXIuYXBwZW5kKCdyZWN0JylcbiAgICAuYXR0cih7XG4gICAgICAneCc6IGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHNjYWxlLnhTY2FsZShkLmxhYmVsKTsgfSxcbiAgICAgICd5JzogY2hhcnQuaGVpZ2h0LFxuICAgICAgJ2hlaWdodCc6IDAsXG4gICAgICAnd2lkdGgnOiBzY2FsZS54U2NhbGUucmFuZ2VCYW5kKCksXG4gICAgICAnY2xhc3MnOiBjbGFzc2VzLmJhclxuICAgIH0pXG4gICAgLnRyYW5zaXRpb24oKVxuICAgIC5kdXJhdGlvbig2MDApXG4gICAgLmRlbGF5KGZ1bmN0aW9uKGQsIGkpIHsgcmV0dXJuIDIwMCAqIGk7IH0pXG4gICAgLmF0dHIoe1xuICAgICAgJ3knOiBmdW5jdGlvbihkKSB7IHJldHVybiBzY2FsZS55U2NhbGUoZC5kYXRhKTsgfSxcbiAgICAgICdoZWlnaHQnOiBmdW5jdGlvbihkKSB7IHJldHVybiBjaGFydC5oZWlnaHQgLSBzY2FsZS55U2NhbGUoZC5kYXRhKTsgfSxcbiAgICB9KTtcblxuICBiYXIuYXBwZW5kKCd0ZXh0JylcbiAgICAudGV4dChmdW5jdGlvbihkKXsgcmV0dXJuIGQubGFiZWw7IH0pXG4gICAgLmF0dHIoe1xuICAgICAgJ2NsYXNzJzogY2xhc3Nlcy5sYWJlbCxcbiAgICAgICd4JzogZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gc2NhbGUueFNjYWxlKGQubGFiZWwpICsgc2NhbGUueFNjYWxlLnJhbmdlQmFuZCgpLzI7XG4gICAgICB9LFxuICAgICAgJ3knOiBjaGFydC5oZWlnaHQgKyAxMCxcbiAgICAgICd0ZXh0LWFuY2hvcic6ICdtaWRkbGUnLFxuICAgICAgJ29wYWNpdHknOiAwXG4gICAgfSlcbiAgICAudHJhbnNpdGlvbigpXG4gICAgLmRlbGF5KGZ1bmN0aW9uKGQsIGkpIHsgcmV0dXJuIDIwMCAqIGk7IH0pXG4gICAgLmF0dHIoe1xuICAgICAgJ3knOiBzZWxmLmNvbmZpZy5jaGFydEhlaWdodCAtIHNlbGYuY29uZmlnLm1hcmdpbi5ib3QsXG4gICAgICAnb3BhY2l0eSc6IDFcbiAgICB9KTtcbn07XG5cbkJhckNoYXJ0LnByb3RvdHlwZS5yZW1vdmVBbGxCYXJzID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgY2xhc3NlcyA9IHNlbGYuY29uZmlnLmNsYXNzZXM7XG4gIHZhciBiYXJzID0gc2VsZi5zdmcuc2VsZWN0QWxsKCcuJytjbGFzc2VzLmdyb3VwKTtcblxuICBiYXJzLnNlbGVjdCgncmVjdCcpXG4gICAgLnRyYW5zaXRpb24oKVxuICAgIC5hdHRyKHtcbiAgICAgICdoZWlnaHQnOiAwLFxuICAgICAgJ3knOiBzZWxmLmNoYXJ0LmhlaWdodFxuICAgIH0pXG4gICAgLmVhY2goJ2VuZCcsIGZ1bmN0aW9uKCl7XG4gICAgICBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKS5yZW1vdmUoKTtcbiAgICB9KTtcblxuICBiYXJzLnNlbGVjdCgndGV4dCcpXG4gICAgLnRyYW5zaXRpb24oKVxuICAgIC5hdHRyKHtcbiAgICAgICd5Jzogc2VsZi5jaGFydC5oZWlnaHQgKyAxMCxcbiAgICAgICdvcGFjaXR5JzogMFxuICAgIH0pXG4gICAgLmNhbGwoQ2hhcnQuZW5kQWxsLCBjYWxsYmFjayk7XG5cbiAgcmV0dXJuIHNlbGY7XG59O1xuXG5CYXJDaGFydC5wcm90b3R5cGUudXBkYXRlRGF0YSA9IGZ1bmN0aW9uKG5ld0RhdGEpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgc3ZnID0gc2VsZi5zdmc7XG4gIHNlbGYuZGF0YSA9IG5ld0RhdGE7XG5cbiAgc2VsZi5yZW1vdmVBbGxCYXJzKGZ1bmN0aW9uKCl7XG4gICAgQ2hhcnQuc2V0dXBHcmFwaC5jYWxsKHNlbGYsICdiYXInLCBzZWxmLmNvbmZpZyk7XG4gICAgc3ZnLnNlbGVjdEFsbCgnZy5ncmlkLmF4aXMnKVxuICAgICAgLnRyYW5zaXRpb24oKS5kdXJhdGlvbig4MDApLmVhc2UoJ3Npbi1pbi1vdXQnKVxuICAgICAgLmNhbGwoc2VsZi5heGlzLnlBeGlzKTtcbiAgICBzZWxmLmdlbmVyYXRlQmFycygpO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQmFyQ2hhcnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHNldHVwR3JhcGgodHlwZSwgY29uZmlnKSB7XG4gIHRoaXMuY2hhcnQgPSB7XG4gICAgaGVpZ2h0OiBjb25maWcuY2hhcnRIZWlnaHQgLSBjb25maWcubWFyZ2luLnRvcCAtIGNvbmZpZy5tYXJnaW4uYm90LFxuICAgIHdpZHRoOiBjb25maWcuY2hhcnRXaWR0aCAtIGNvbmZpZy5tYXJnaW4ubGVmdCAtIGNvbmZpZy5tYXJnaW4ucmlnaHRcbiAgfTtcblxuICBpZiAodHlwZSA9PT0gJ2JhcicgfHwgdHlwZSA9PT0gJ2xpbmUnKSB7XG4gICAgdGhpcy5zY2FsZSA9IGdlbmVyYXRlU2NhbGVzLmNhbGwodGhpcyk7XG4gICAgdGhpcy5heGlzID0gZ2VuZXJhdGVBeGlzLmNhbGwodGhpcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVTVkcoZ3JpZCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBjaGFydCA9IHNlbGYuY2hhcnQ7XG4gIHZhciBtYXJnaW4gPSBzZWxmLmNvbmZpZy5tYXJnaW47XG5cbiAgdmFyIHN2ZyA9IGQzLnNlbGVjdChzZWxmLmNvbmZpZy5lbGVtZW50SUQpXG4gICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgLmF0dHIoe1xuICAgICAgICAnd2lkdGgnOiBjaGFydC53aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0LFxuICAgICAgICAnaGVpZ2h0JzogY2hhcnQuaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3QsXG4gICAgICB9KS5hcHBlbmQoJ2cnKTtcblxuICBpZiAoZ3JpZCkge1xuICAgIHN2Zy5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcrbWFyZ2luLmxlZnQrJywnK21hcmdpbi50b3ArJyknKTtcbiAgICBzdmcuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkIGF4aXMnKVxuICAgICAgLmNhbGwoc2VsZi5heGlzLnlBeGlzKTtcbiAgfSBlbHNlIHtcbiAgICBzdmcuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgKChjaGFydC53aWR0aC8yKSttYXJnaW4ubGVmdCkgKyAnLCcgKyAoKGNoYXJ0LmhlaWdodC8yKSttYXJnaW4udG9wKSArICcpJyk7XG4gIH1cblxuICBzZWxmLnN2ZyA9IHN2Zztcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVBeGlzTGluZXMoc3ZnLCBjaGFydCkge1xuICAvLyBYICYgWSBBWElTXG4gIHZhciBheGlzID0gc3ZnLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ2F4aXMnKTtcbiAgYXhpcy5hcHBlbmQoJ2xpbmUnKVxuICAgIC5hdHRyKHtcbiAgICAgICd5MSc6IGNoYXJ0LmhlaWdodCxcbiAgICAgICd4Mic6IGNoYXJ0LndpZHRoLFxuICAgICAgJ3kyJzogY2hhcnQuaGVpZ2h0LFxuICAgICAgJ3N0cm9rZS13aWR0aCc6IDEsXG4gICAgICAnY2xhc3MnOiAneCdcbiAgICB9KTtcbiAgYXhpcy5hcHBlbmQoJ2xpbmUnKVxuICAgIC5hdHRyKHtcbiAgICAgICd5Mic6IGNoYXJ0LmhlaWdodCxcbiAgICAgICdzdHJva2Utd2lkdGgnOiAxLFxuICAgICAgJ2NsYXNzJzogJ3knXG4gICAgfSk7XG5cbiAgcmV0dXJuIGF4aXM7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlU2NhbGVzKCkge1xuICByZXR1cm4ge1xuICAgICd4U2NhbGUnOiBkMy5zY2FsZS5vcmRpbmFsKClcbiAgICAgIC5kb21haW4odGhpcy5kYXRhLm1hcChmdW5jdGlvbihkKSB7IHJldHVybiBkLmxhYmVsOyB9KSlcbiAgICAgIC5yYW5nZVJvdW5kQmFuZHMoWzAsIHRoaXMuY2hhcnQud2lkdGhdLCAwLjUpLFxuICAgICd5U2NhbGUnOiBkMy5zY2FsZS5saW5lYXIoKVxuICAgICAgLmRvbWFpbihbMCwgZDMubWF4KHRoaXMuZGF0YSwgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5kYXRhOyB9KV0pXG4gICAgICAucmFuZ2UoW3RoaXMuY2hhcnQuaGVpZ2h0LCAwXSlcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVUaWNrcygpIHtcbiAgcmV0dXJuIGQzLnN2Zy5heGlzKClcbiAgICAuc2NhbGUodGhpcy5zY2FsZS55U2NhbGUpXG4gICAgLm9yaWVudCgnbGVmdCcpXG4gICAgLnRpY2tzKHRoaXMuY29uZmlnLmF4aXMueS50aWNrcylcbiAgICAub3V0ZXJUaWNrU2l6ZSgwKVxuICAgIC50aWNrU2l6ZSgtdGhpcy5jaGFydC53aWR0aCk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlQXhpcygpIHtcbiAgcmV0dXJuIHtcbiAgICAneUF4aXMnOiBnZW5lcmF0ZVRpY2tzLmNhbGwodGhpcyksXG4gICAgJ3hBeGlzJzogbnVsbFxuICB9O1xufVxuXG5mdW5jdGlvbiBlbmRBbGwodHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgdmFyIG47XG4gIGlmICh0cmFuc2l0aW9uLmVtcHR5KCkpIHtcbiAgICBjYWxsYmFjaygpO1xuICB9IGVsc2Uge1xuICAgIG4gPSB0cmFuc2l0aW9uLnNpemUoKTtcbiAgICB0cmFuc2l0aW9uLmVhY2goJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIG4tLTtcbiAgICAgIGlmIChuID09PSAwKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxudmFyIENoYXJ0ID0ge1xuICBzZXR1cEdyYXBoOiBzZXR1cEdyYXBoLFxuICBnZW5lcmF0ZVNWRzogZ2VuZXJhdGVTVkcsXG4gIGdlbmVyYXRlQXhpc0xpbmVzOiBnZW5lcmF0ZUF4aXNMaW5lcyxcbiAgZ2VuZXJhdGVTY2FsZXM6IGdlbmVyYXRlU2NhbGVzLFxuICBnZW5lcmF0ZUF4aXM6IGdlbmVyYXRlQXhpcyxcbiAgZW5kQWxsOiBlbmRBbGxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hhcnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDaGFydCA9IHJlcXVpcmUoJy4vQ2hhcnQnKTtcblxuZnVuY3Rpb24gRG9udXRDaGFydChkYXRhLCBjb25maWcpIHtcbiAgdGhpcy5kYXRhID0gZGF0YTtcbiAgdGhpcy5jb25maWcgPSBjb25maWc7XG5cbiAgLy8gU2V0dXAgY2hhcnQgd2lkdGgvaGVpZ2h0XG4gIHRoaXMuc2V0dXBHcmFwaCgnZG9udXQnLCBjb25maWcpO1xuXG4gIC8vIEdlbmVyYXRlIHRoZSBHcmFwaFxuICB0aGlzLmdlbmVyYXRlU1ZHKGZhbHNlKTtcbiAgdGhpcy5nZW5lcmF0ZURvbnV0KCk7XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbkRvbnV0Q2hhcnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDaGFydCk7XG5cbkRvbnV0Q2hhcnQucHJvdG90eXBlLmdlbmVyYXRlRG9udXQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgcmFkaXVzID0gTWF0aC5taW4oc2VsZi5jaGFydC53aWR0aCwgc2VsZi5jaGFydC5oZWlnaHQpIC8gMjtcbiAgdmFyIGNvbG9yID0gZDMuc2NhbGUub3JkaW5hbCgpLnJhbmdlKHNlbGYuY29uZmlnLmNvbG9yU2NhbGUpO1xuXG4gIHZhciBhcmMgPSBkMy5zdmcuYXJjKClcbiAgICAub3V0ZXJSYWRpdXMocmFkaXVzKVxuICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgLSA1KTtcblxuICB2YXIgcGllID0gZDMubGF5b3V0LnBpZSgpXG4gICAgLnNvcnQobnVsbClcbiAgICAuc3RhcnRBbmdsZSgxICogTWF0aC5QSSlcbiAgICAuZW5kQW5nbGUoMyAqIE1hdGguUEkpXG4gICAgLnZhbHVlKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuZGF0YTsgfSk7XG5cbiAgdmFyIGcgPSBzZWxmLnN2Zy5zZWxlY3RBbGwoJy5hcmMnKVxuICAgIC5kYXRhKHBpZShzZWxmLmRhdGEpKVxuICAgIC5lbnRlcigpXG4gICAgLmFwcGVuZCgnZycpXG4gICAgLmF0dHIoJ2NsYXNzJywgJ2FyYycpO1xuXG4gIGcuYXBwZW5kKCdwYXRoJylcbiAgICAuc3R5bGUoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7IHJldHVybiBjb2xvcihkLmRhdGEubGFiZWwpOyB9KVxuICAgIC50cmFuc2l0aW9uKClcbiAgICAuZGVsYXkoZnVuY3Rpb24oZCwgaSkgeyByZXR1cm4gaSAqIDUwMDsgfSlcbiAgICAuZHVyYXRpb24oNTAwKVxuICAgIC5hdHRyVHdlZW4oJ2QnLCBmdW5jdGlvbihkKSB7XG4gICAgICB2YXIgaSA9IGQzLmludGVycG9sYXRlKGQuc3RhcnRBbmdsZSArIDAuMSwgZC5lbmRBbmdsZSk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgICBkLmVuZEFuZ2xlID0gaSh0KTtcbiAgICAgICAgcmV0dXJuIGFyYyhkKTtcbiAgICAgIH07XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERvbnV0Q2hhcnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDaGFydCA9IHJlcXVpcmUoJy4vQ2hhcnQnKTtcblxuZnVuY3Rpb24gTGluZUNoYXJ0KGRhdGEsIGNvbmZpZykge1xuICB0aGlzLmRhdGEgPSBkYXRhO1xuICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAvLyBTZXR1cCBjaGFydCB3aWR0aC9oZWlnaHQsIGF4aXMgYW5kIHNjYWxlc1xuICB0aGlzLnNldHVwR3JhcGgoJ2xpbmUnLCBjb25maWcpO1xuXG4gIC8vIEdlbmVyYXRlIHRoZSBHcmFwaFxuICB0aGlzLmdlbmVyYXRlU1ZHKHRydWUpO1xuICB0aGlzLmdlbmVyYXRlTGluZXMoKTtcblxuICByZXR1cm4gdGhpcztcbn1cblxuTGluZUNoYXJ0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ2hhcnQpO1xuXG5MaW5lQ2hhcnQucHJvdG90eXBlLmdlbmVyYXRlTGluZXMgPSBmdW5jdGlvbigpe1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBjbGFzc05hbWVzID0gc2VsZi5jb25maWcuY2xhc3NlcztcbiAgdmFyIGxpbmVHZW4gPSBkMy5zdmcubGluZSgpXG4gICAgLngoZnVuY3Rpb24oZCkgeyByZXR1cm4gc2VsZi5zY2FsZS54U2NhbGUoZC5sYWJlbCk7IH0pXG4gICAgLnkoZnVuY3Rpb24oZCkgeyByZXR1cm4gc2VsZi5zY2FsZS55U2NhbGUoZC5kYXRhKTsgfSk7XG5cbiAgdmFyIHBhdGggPSBzZWxmLnN2Zy5hcHBlbmQoJ3BhdGgnKVxuICAgIC5hdHRyKHtcbiAgICAgICdjbGFzcyc6IGNsYXNzTmFtZXMubGluZSxcbiAgICAgICdkJzogbGluZUdlbihzZWxmLmRhdGEpXG4gICAgfSk7XG5cbiAgdmFyIHRvdGFsTGVuZ3RoID0gcGF0aC5ub2RlKCkuZ2V0VG90YWxMZW5ndGgoKTtcbiAgcGF0aC5hdHRyKHtcbiAgICAgICdzdHJva2UtZGFzaGFycmF5JzogdG90YWxMZW5ndGggKyAnICcgKyB0b3RhbExlbmd0aCxcbiAgICAgICdzdHJva2UtZGFzaG9mZnNldCc6IHRvdGFsTGVuZ3RoXG4gICAgfSlcbiAgICAudHJhbnNpdGlvbigpXG4gICAgLmVhc2UoJ2xpbmVhcicpXG4gICAgLmR1cmF0aW9uKDIwMCAqIHNlbGYuZGF0YS5sZW5ndGgpXG4gICAgLmF0dHIoJ3N0cm9rZS1kYXNob2Zmc2V0JywgMCk7XG5cbiAgdmFyIGNpcmNsZXMgPSBzZWxmLnN2Zy5zZWxlY3RBbGwoJ2NpcmNsZXMnKS5kYXRhKHNlbGYuZGF0YSk7XG4gIHZhciBjaXJjbGUgPSBjaXJjbGVzLmVudGVyKCkuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCBjbGFzc05hbWVzLmdyb3VwKVxuICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oKXtcbiAgICAgIGQzLnNlbGVjdCh0aGlzLmNoaWxkTm9kZXNbMF0pLnRyYW5zaXRpb24oKS5hdHRyKCdyJywgNyk7XG4gICAgfSlcbiAgICAub24oJ21vdXNlb3V0JywgZnVuY3Rpb24oKXtcbiAgICAgIGQzLnNlbGVjdCh0aGlzLmNoaWxkTm9kZXNbMF0pLnRyYW5zaXRpb24oKS5hdHRyKCdyJywgNSk7XG4gICAgfSk7XG4gIGNpcmNsZS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgLmF0dHIoe1xuICAgICAgJ2NsYXNzJzogY2xhc3NOYW1lcy5wb2ludCxcbiAgICAgICdjeCc6IGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHNlbGYuc2NhbGUueFNjYWxlKGQubGFiZWwpOyB9LFxuICAgICAgJ2N5JzogZnVuY3Rpb24oZCkgeyByZXR1cm4gc2VsZi5zY2FsZS55U2NhbGUoZC5kYXRhKTsgfSxcbiAgICAgICdyJzogMFxuICAgIH0pXG4gICAgLnRyYW5zaXRpb24oKVxuICAgIC5kdXJhdGlvbigxMjAwKVxuICAgIC5kZWxheShmdW5jdGlvbihkLCBpKXsgcmV0dXJuIDIwMCAqIGk7IH0pXG4gICAgLmVhc2UoJ2VsYXN0aWMnKVxuICAgIC5hdHRyKCdyJywgNSk7XG5cbiAgY2lyY2xlLmFwcGVuZCgndGV4dCcpXG4gICAgLnRleHQoZnVuY3Rpb24oZCl7IHJldHVybiBkLmxhYmVsOyB9KVxuICAgIC5hdHRyKHtcbiAgICAgICdjbGFzcyc6IGNsYXNzTmFtZXMubGFiZWwsXG4gICAgICAneCc6IGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHNlbGYuc2NhbGUueFNjYWxlKGQubGFiZWwpOyB9LFxuICAgICAgJ3knOiBzZWxmLmNoYXJ0LmhlaWdodCArIDEwLFxuICAgICAgJ3RleHQtYW5jaG9yJzogJ21pZGRsZScsXG4gICAgICAnb3BhY2l0eSc6IDBcbiAgICB9KVxuICAgIC50cmFuc2l0aW9uKClcbiAgICAuZGVsYXkoZnVuY3Rpb24oZCwgaSkgeyByZXR1cm4gMjAwICogaTsgfSlcbiAgICAuYXR0cih7XG4gICAgICAneSc6IHNlbGYuY29uZmlnLmNoYXJ0SGVpZ2h0IC0gc2VsZi5jb25maWcubWFyZ2luLmJvdCxcbiAgICAgICdvcGFjaXR5JzogMVxuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMaW5lQ2hhcnQ7XG4iXX0=
