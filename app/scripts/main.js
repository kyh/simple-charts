'use strict';

var BarChart = require('./charts/Bar.js');
var LineChart = require('./charts/Line.js');

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

