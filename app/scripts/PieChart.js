(function(window){
	'use strict';

	function PieChart(data, config){
		var self = this;
		var width, height, radius, colors, colorScale, donutWidth;

		initLocalVariables(self.setupGraph(data, config));

		var SVG = self.getSVGChart(config.elementID);
		var ARC = self.generateArc(SVG);
		var BARS = generatePie(SVG, data);

		// RETURN DATA
		self.data = data;
		self.config = config;
		self.updateData = updateData;
		self.chart = {
			barChart: SVG,
			bars: BARS
		};

		function initLocalVariables(c){
			width = c.width              || 500;
			height = c.height            || 500;
			radius = c.radius            || Math.min(width, height) / 2;
			donutWidth = c.donutWidth    || 75;
			colors = c.colors            || [];

			colorScale = d3.scale.ordinal().range(colors);
		}

		function generatePie(svg, dataset){
			var pie = d3.layout.pie()
	          .value(function(d) { return d.data; })
	          .sort(null);

	        var path = svg.selectAll('path')
	          .data(pie(dataset))
	          .enter()
	          .append('path')
	          .attr('d', ARC)
	          .attr('fill', function(d, i) {
	            return color(d.data.label);
	          });
		}

		function updateData(){}
	}

	PieChart.prototype = new Chart.GraphChart();
	// Export to window
	window.Chart = window.Chart || {};
	window.Chart.PieChart = PieChart;

})(window);
