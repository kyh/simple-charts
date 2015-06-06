(function(window, Chart){
	'use strict';

	function BarChart(data, config){

		var self = this;
		var margin, width, height, xScale, yScale, yAxis;

		initLocalVariables(self.setupGraph(data, config));
		
		var SVG = self.getSVGChart(config.elementID);
		var AXIS = self.generateAxisLines(SVG);
		var BARS = generateBars(SVG, data);

		// RETURN DATA
		self.data = data;
		self.config = config;
		self.updateData = updateData;
		self.chart = {
			barChart: SVG,
			bars: BARS 
		};

		function initLocalVariables(_setup) {
			margin = _setup.margin 	|| { top: 20, bot: 30, left: 30, right: 0 };
			width = _setup.width 	|| 500;
			height = _setup.height 	|| 500;
			xScale = _setup.xScale;
			yScale = _setup.yScale;
			yAxis = _setup.yAxis;
		}

		function updateData(newData){
			var _svg = self.chart.barChart;
			self.data = newData;
			removeAllBars(_svg, function(){
				initLocalVariables(self.setupGraph(newData, self.config));
				_svg.selectAll('g.grid.axis')
					.transition().duration(800).ease('sin-in-out')
					.call(yAxis);
				generateBars(_svg, newData);
			});
		}

		function generateBars(_svg, _data){
			// BARS
			var classes = config.classes;
			var bars = _svg.selectAll('bars').data(_data);
			var bar = bars.enter().append('g').attr('class', classes.group);
			bar.append('rect')
				.attr({
					'x': function(d) { return xScale(d.label); },
					'y': height,
					'height': 0,
					'width': xScale.rangeBand(),
					'class': classes.bar
				})
				.transition()
				.duration(600)
				.delay(function(d, i) { return 200 * i; })
				.attr({
					'y': function(d) { return yScale(d.data); },
					'height': function(d) { return height - yScale(d.data); },
				});
			bar.append('text')
				.text(function(d){ return d.label; })
				.attr({
					'class': classes.label,
					'x': function(d) {
						return xScale(d.label) + xScale.rangeBand()/2;
					},
					'y': height + 10,
					'text-anchor': 'middle',
					'opacity': 0
				})
				.transition()
				.delay(function(d, i) { return 200 * i; })
				.attr({
					'y': config.chartHeight - margin.bot,
					'opacity': 1
				});
		}

		function removeAllBars(_svg, callback){
			var classes = config.classes;
			var bars = _svg.selectAll('.'+classes.group);

			bars.select('rect')
				.transition()
				.attr({
					'height': 0,
					'y': height
				})
				.each('end', function(){
					d3.select(this.parentNode).remove();
				});
			bars.select('text')
				.transition()
				.attr({
					'y': height + 10,
					'opacity': 0
				})
				.call(self.endAll, callback);
		}

		return self;
	}

	BarChart.prototype = new Chart.GraphChart();

	// Export to window
	window.Chart = window.Chart || {};
	window.Chart.BarChart = BarChart;

})(window, window.Chart);