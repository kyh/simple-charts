/* jshint devel:true */
(function(Chart){
	'use strict';

	// Bar Chart
	var chartData = [
		{
			label: 'Jan',
			data: 35
		},
		{
			label: 'Feb',
			data: 20
		},
		{
			label: 'Mar',
			data: 28
		},
		{
			label: 'Apr',
			data: 8
		},
		{
			label: 'May',
			data: 17
		},
		{
			label: 'Jun',
			data: 38
		},
		{
			label: 'Jul',
			data: 20
		}
	];

	var barChartConfig = {
		elementID: '#bar-chart',
		chartWidth: $('.bar-chart-container')[0].offsetWidth,
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

	var barChart = new Chart.BarChart(chartData, barChartConfig);

	(function updateChart(d){
		var updatedData = d || chartData.concat([
			{ label: 'Aug', data: 70 },
			{ label: 'Sep', data: 14 }
		]);
		setTimeout(function(){
			barChart.updateData(updatedData);
			console.log(updatedData);
			if (updatedData.length < 4) {
				updateChart(chartData);
			} else {
				updateChart(updatedData.slice(Math.floor(Math.random() * updatedData.length - 1)));
			}
		}, Math.floor(Math.random() * 5000) + 5000);
	})();
	
	// Line Chart
	var lineChartConfig = {
		elementID: '#line-chart',
		chartWidth: $('.line-chart-container')[0].offsetWidth,
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

	var lineChart = new Chart.LineChart(chartData, lineChartConfig);

	// Pie Chart
	var pieChartData = [{
		label: 'Complete',
		data: 77
	}];

	var pieChartConfig = {
		elementID: '#pie-chart',
		chartWidth: $('.pie-chart-container')[0].offsetWidth,
		chartHeight: 400,
		margin: {
		    top: 0,
		    bot: 0,
		    left: 0,
		    right: 0
		}
	};

	var pieChart = new Chart.PieChart(pieChartData, pieChartConfig);

})(window.Chart);

