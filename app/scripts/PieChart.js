(function(window){
	'use strict';

	function PieChart(data, config){
		var self = this;
		var width, height, radius, colors, colorScale;

		initLocalVariables(config);

		function initLocalVariables(c){
			width = c.width 	|| 500;
			height = c.height 	|| 500;
			radius = c.radius	|| Math.min(width, height) / 2;
			colors = c.colors 	|| [];

			colorScale = d3.scale.ordinal().range(colors);
		}
	}

	PieChart.prototype = new Chart.GraphChart();
	// Export to window
	window.Chart = window.Chart || {};
	window.Chart.PieChart = PieChart;

})(window);