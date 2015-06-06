(function(window, Chart){
	'use strict';

	function LineChart(data, config){
		var self = this;
		var margin, width, height, xScale, yScale, yAxis;

		initLocalVariables(self.setupGraph(data, config));
		
		var SVG = self.getSVGChart(config.elementID);
		var AXIS = self.generateAxisLines(SVG);
		var LINES = generateLines(SVG, data);

		// RETURN DATA
		self.data = data;
		self.config = config;
		self.updateData = updateData;
		self.chart = {
			lineChart: SVG,
			lines: LINES 
		};

		function initLocalVariables(_setup) {
			margin = _setup.margin 	|| { top: 20, bot: 30, left: 30, right: 0 };
			width = _setup.width 	|| 500;
			height = _setup.height 	|| 500;
			xScale = _setup.xScale;
			yScale = _setup.yScale;
			yAxis = _setup.yAxis;
		}

		function generateLines(_svg, _data){
			var classNames = config.classes;
			var lineGen = d3.svg.line()
				.x(function(d) { return xScale(d.label); })
				.y(function(d) { return yScale(d.data); });

			var path = _svg.append('path')
				.attr({
					'class': classNames.line,
					'd': lineGen(_data)
				});

			var totalLength = path.node().getTotalLength();
			path.attr({
					'stroke-dasharray': totalLength + ' ' + totalLength,
					'stroke-dashoffset': totalLength
				})
				.transition()
				.ease('linear')
				.duration(200 * _data.length)
				.attr('stroke-dashoffset', 0);

			var circles = _svg.selectAll('circles').data(_data);
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
					'cx': function(d) { return xScale(d.label); },
					'cy': function(d) { return yScale(d.data); },
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
					'x': function(d) { return xScale(d.label); },
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

		function updateData(){

		}

		return self;
	}

	LineChart.prototype = new Chart.GraphChart();

	// Export to window
	window.Chart = window.Chart || {};
	window.Chart.LineChart = LineChart;

})(window, window.Chart);