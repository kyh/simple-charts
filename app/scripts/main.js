/* jshint devel:true */
var barChartData = [
	{
		name: 'Jan',
		data: 35
	},
	{
		name: 'Feb',
		data: 20
	},
	{
		name: 'Mar',
		data: 28
	},
	{
		name: 'Apr',
		data: 8
	},
	{
		name: 'May',
		data: 17
	},
	{
		name: 'Jun',
		data: 38
	},
	{
		name: 'Jul',
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

var barChart = new BarChart(barChartData, barChartConfig);

setTimeout(function(){
	var updatedData = barChartData.concat([
		{ name: 'Aug', data: 70 },
		{ name: 'Sep', data: 14 }
	]);
	barChart.updateData(updatedData);
}, 5000);

