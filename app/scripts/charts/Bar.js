'use strict';

var Chart = require('./Chart');

function BarChart(data, config) {
  Chart.call(this, data, config);
  console.log(this);
}

module.exports = BarChart;
