(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Chart = require('./Chart');

function BarChart(data, config) {
  Chart.call(this, data, config);
  console.log(this);
}

module.exports = BarChart;

},{"./Chart":2}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
/* jshint devel:true */
'use strict';
var BarChart = require('./charts/Bar.js');

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

var config = {
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

var barChart = new BarChart(data, config);
  // var barChart = new Chart.BarChart(chartData, barChartConfig);

  // (function updateChart(d){
  //   var updatedData = d || chartData.concat([
  //     { label: 'Aug', data: 70 },
  //     { label: 'Sep', data: 14 }
  //   ]);
  //   setTimeout(function(){
  //     barChart.updateData(updatedData);
  //     if (updatedData.length < 4) {
  //       updateChart(chartData);
  //     } else {
  //       updateChart(updatedData.slice(~~(Math.random() * updatedData.length - 2)));
  //     }
  //   }, ~~(Math.random() * 5000) + 5000);
  // })();

  // // Line Chart
  // var lineChartConfig = {
  //   elementID: '#line-chart',
  //   chartWidth: $('.line-chart-container')[0].offsetWidth,
  //   chartHeight: 400,
  //   axis: {
  //     y: {
  //       ticks: 8
  //     }
  //   },
  //   classes: {
  //     group: 'group',
  //     point: 'point',
  //     line: 'line',
  //     label: 'labels'
  //   },
  //   margin: {
  //       top: 20,
  //       bot: 30,
  //       left: 30,
  //       right: 0
  //   }
  // };

  // var lineChart = new Chart.LineChart(chartData, lineChartConfig);

  // // Pie Chart
  // var pieChartData = [{
  //   label: 'Complete',
  //   data: 77
  // }];

  // var pieChartConfig = {
  //   elementID: '#pie-chart',
  //   chartWidth: $('.pie-chart-container')[0].offsetWidth,
  //   chartHeight: 400,
  //   margin: {
  //       top: 0,
  //       bot: 0,
  //       left: 0,
  //       right: 0
  //   }
  // };

  // var pieChart = new Chart.PieChart(pieChartData, pieChartConfig);


},{"./charts/Bar.js":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9jaGFydHMvQmFyLmpzIiwiYXBwL3NjcmlwdHMvY2hhcnRzL0NoYXJ0LmpzIiwiYXBwL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBDaGFydCA9IHJlcXVpcmUoJy4vQ2hhcnQnKTtcblxuZnVuY3Rpb24gQmFyQ2hhcnQoZGF0YSwgY29uZmlnKSB7XG4gIENoYXJ0LmNhbGwodGhpcywgZGF0YSwgY29uZmlnKTtcbiAgY29uc29sZS5sb2codGhpcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFyQ2hhcnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIENoYXJ0KGRhdGEsIGNvbmZpZykge1xuICB0aGlzLmRhdGEgPSBkYXRhO1xuICB0aGlzLmNoYXJ0ID0ge1xuICAgIGhlaWdodDogY29uZmlnLmNoYXJ0SGVpZ2h0IC0gY29uZmlnLm1hcmdpbi50b3AgLSBjb25maWcubWFyZ2luLmJvdCxcbiAgICB3aWR0aDogY29uZmlnLmNoYXJ0V2lkdGggLSBjb25maWcubWFyZ2luLmxlZnQgLSBjb25maWcubWFyZ2luLnJpZ2h0LFxuICAgIHNjYWxlOiBnZW5lcmF0ZVNjYWxlcy5jYWxsKHRoaXMsIGRhdGEpXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlU2NhbGVzKGRhdGEpe1xuICByZXR1cm4ge1xuICAgICd4U2NhbGUnOiBkMy5zY2FsZS5vcmRpbmFsKClcbiAgICAgIC5kb21haW4oZGF0YS5tYXAoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5sYWJlbDsgfSkpXG4gICAgICAucmFuZ2VSb3VuZEJhbmRzKFswLCB0aGlzLmNoYXJ0LndpZHRoXSwgMC41KSxcbiAgICAneVNjYWxlJzogZDMuc2NhbGUubGluZWFyKClcbiAgICAgIC5kb21haW4oWzAsIGQzLm1heChkYXRhLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLmRhdGE7IH0pXSlcbiAgICAgIC5yYW5nZShbdGhpcy5jaGFydC5oZWlnaHQsIDBdKVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXJ0O1xuIiwiLyoganNoaW50IGRldmVsOnRydWUgKi9cbid1c2Ugc3RyaWN0JztcbnZhciBCYXJDaGFydCA9IHJlcXVpcmUoJy4vY2hhcnRzL0Jhci5qcycpO1xuXG52YXIgZGF0YSA9IFt7XG4gICAgbGFiZWw6ICdKYW4nLFxuICAgIGRhdGE6IDM1XG4gIH0sIHtcbiAgICBsYWJlbDogJ0ZlYicsXG4gICAgZGF0YTogMjBcbiAgfSwge1xuICAgIGxhYmVsOiAnTWFyJyxcbiAgICBkYXRhOiAyOFxuICB9LCB7XG4gICAgbGFiZWw6ICdBcHInLFxuICAgIGRhdGE6IDhcbiAgfSwge1xuICAgIGxhYmVsOiAnTWF5JyxcbiAgICBkYXRhOiAxN1xuICB9LCB7XG4gICAgbGFiZWw6ICdKdW4nLFxuICAgIGRhdGE6IDM4XG4gIH0sIHtcbiAgICBsYWJlbDogJ0p1bCcsXG4gICAgZGF0YTogMjBcbiAgfVxuXTtcblxudmFyIGNvbmZpZyA9IHtcbiAgZWxlbWVudElEOiAnI2Jhci1jaGFydCcsXG4gIGNoYXJ0V2lkdGg6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYXItY2hhcnQtY29udGFpbmVyJykub2Zmc2V0V2lkdGgsXG4gIGNoYXJ0SGVpZ2h0OiA0MDAsXG4gIGNsYXNzZXM6IHtcbiAgICBncm91cDogJ2Jhci1ncm91cCcsXG4gICAgYmFyOiAnYmFyJyxcbiAgICBsYWJlbDogJ2xhYmVscydcbiAgfSxcbiAgYXhpczoge1xuICAgIHk6IHtcbiAgICAgIHRpY2tzOiA4XG4gICAgfVxuICB9LFxuICBtYXJnaW46IHtcbiAgICB0b3A6IDIwLFxuICAgIGJvdDogMzAsXG4gICAgbGVmdDogMzAsXG4gICAgcmlnaHQ6IDBcbiAgfVxufTtcblxudmFyIGJhckNoYXJ0ID0gbmV3IEJhckNoYXJ0KGRhdGEsIGNvbmZpZyk7XG4gIC8vIHZhciBiYXJDaGFydCA9IG5ldyBDaGFydC5CYXJDaGFydChjaGFydERhdGEsIGJhckNoYXJ0Q29uZmlnKTtcblxuICAvLyAoZnVuY3Rpb24gdXBkYXRlQ2hhcnQoZCl7XG4gIC8vICAgdmFyIHVwZGF0ZWREYXRhID0gZCB8fCBjaGFydERhdGEuY29uY2F0KFtcbiAgLy8gICAgIHsgbGFiZWw6ICdBdWcnLCBkYXRhOiA3MCB9LFxuICAvLyAgICAgeyBsYWJlbDogJ1NlcCcsIGRhdGE6IDE0IH1cbiAgLy8gICBdKTtcbiAgLy8gICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gIC8vICAgICBiYXJDaGFydC51cGRhdGVEYXRhKHVwZGF0ZWREYXRhKTtcbiAgLy8gICAgIGlmICh1cGRhdGVkRGF0YS5sZW5ndGggPCA0KSB7XG4gIC8vICAgICAgIHVwZGF0ZUNoYXJ0KGNoYXJ0RGF0YSk7XG4gIC8vICAgICB9IGVsc2Uge1xuICAvLyAgICAgICB1cGRhdGVDaGFydCh1cGRhdGVkRGF0YS5zbGljZSh+fihNYXRoLnJhbmRvbSgpICogdXBkYXRlZERhdGEubGVuZ3RoIC0gMikpKTtcbiAgLy8gICAgIH1cbiAgLy8gICB9LCB+fihNYXRoLnJhbmRvbSgpICogNTAwMCkgKyA1MDAwKTtcbiAgLy8gfSkoKTtcblxuICAvLyAvLyBMaW5lIENoYXJ0XG4gIC8vIHZhciBsaW5lQ2hhcnRDb25maWcgPSB7XG4gIC8vICAgZWxlbWVudElEOiAnI2xpbmUtY2hhcnQnLFxuICAvLyAgIGNoYXJ0V2lkdGg6ICQoJy5saW5lLWNoYXJ0LWNvbnRhaW5lcicpWzBdLm9mZnNldFdpZHRoLFxuICAvLyAgIGNoYXJ0SGVpZ2h0OiA0MDAsXG4gIC8vICAgYXhpczoge1xuICAvLyAgICAgeToge1xuICAvLyAgICAgICB0aWNrczogOFxuICAvLyAgICAgfVxuICAvLyAgIH0sXG4gIC8vICAgY2xhc3Nlczoge1xuICAvLyAgICAgZ3JvdXA6ICdncm91cCcsXG4gIC8vICAgICBwb2ludDogJ3BvaW50JyxcbiAgLy8gICAgIGxpbmU6ICdsaW5lJyxcbiAgLy8gICAgIGxhYmVsOiAnbGFiZWxzJ1xuICAvLyAgIH0sXG4gIC8vICAgbWFyZ2luOiB7XG4gIC8vICAgICAgIHRvcDogMjAsXG4gIC8vICAgICAgIGJvdDogMzAsXG4gIC8vICAgICAgIGxlZnQ6IDMwLFxuICAvLyAgICAgICByaWdodDogMFxuICAvLyAgIH1cbiAgLy8gfTtcblxuICAvLyB2YXIgbGluZUNoYXJ0ID0gbmV3IENoYXJ0LkxpbmVDaGFydChjaGFydERhdGEsIGxpbmVDaGFydENvbmZpZyk7XG5cbiAgLy8gLy8gUGllIENoYXJ0XG4gIC8vIHZhciBwaWVDaGFydERhdGEgPSBbe1xuICAvLyAgIGxhYmVsOiAnQ29tcGxldGUnLFxuICAvLyAgIGRhdGE6IDc3XG4gIC8vIH1dO1xuXG4gIC8vIHZhciBwaWVDaGFydENvbmZpZyA9IHtcbiAgLy8gICBlbGVtZW50SUQ6ICcjcGllLWNoYXJ0JyxcbiAgLy8gICBjaGFydFdpZHRoOiAkKCcucGllLWNoYXJ0LWNvbnRhaW5lcicpWzBdLm9mZnNldFdpZHRoLFxuICAvLyAgIGNoYXJ0SGVpZ2h0OiA0MDAsXG4gIC8vICAgbWFyZ2luOiB7XG4gIC8vICAgICAgIHRvcDogMCxcbiAgLy8gICAgICAgYm90OiAwLFxuICAvLyAgICAgICBsZWZ0OiAwLFxuICAvLyAgICAgICByaWdodDogMFxuICAvLyAgIH1cbiAgLy8gfTtcblxuICAvLyB2YXIgcGllQ2hhcnQgPSBuZXcgQ2hhcnQuUGllQ2hhcnQocGllQ2hhcnREYXRhLCBwaWVDaGFydENvbmZpZyk7XG5cbiJdfQ==
