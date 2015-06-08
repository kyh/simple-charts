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
