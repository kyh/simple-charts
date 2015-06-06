(function(window){
	'use strict';

	function GraphChart(){
		var margin, height, width, yAxis;

		this.setupGraph = function(_data, _config){
			margin = _config.margin;
			height = _config.chartHeight - margin.top - margin.bot;
			width = _config.chartWidth - margin.left - margin.right;

			var scales = generateScales(_data);
			yAxis = generateTicks(scales.yScale, _config.axis.y.ticks);
			return {
				'xScale': scales.xScale,
				'yScale': scales.yScale,
				'yAxis': yAxis,
				'width': width,
				'height': height,
				'margin': margin
			};
		};

		this.getSVGChart = function(elementID){
			// SVG CHART
			var _svg = d3.select(elementID)
			    .append('svg')
			    .attr({
			    	'width': width + margin.left + margin.right,
			    	'height': height + margin.top + margin.bot,
			    })
			    .append('g')
			    .attr('transform', 'translate('+margin.left+','+margin.top+')');
			// Appending grid
			_svg.append('g')
				.attr('class', 'grid axis')
				.call(yAxis);

			return _svg;
		};

		this.endAll = function(transition, callback) {
			var n;
			if (transition.empty()) {
				callback();
			} else {
				n = transition.size();
				transition.each('end', function () {
					n--;
					if (n === 0) {
						callback();
					}
				});
			}
		};

		this.generateAxisLines = function(_svg){
			// X & Y AXIS
			var axis = _svg.append('g').attr('class', 'axis');
			axis.append('line')
				.attr({
					'y1': height,
					'x2': width,
					'y2': height,
					'stroke-width': 1,
					'class': 'x'
				});
			axis.append('line')
				.attr({
					'y2': height,
					'stroke-width': 1,
					'class': 'y'
				});

			return axis;
		};

		this.generateArc = function(radius, donutWidth){
			return d3.svg.arc()
					.innerRadius(radius - donutWidth)
					.outerRadius(radius);
		};

		function generateScales(_data){
			return {
				'xScale': d3.scale.ordinal()
					.domain(_data.map(function(d) { return d.label; }))
					.rangeRoundBands([0, width], 0.5),
				'yScale': d3.scale.linear()
					.domain([0, d3.max(_data, function(d) { return d.data; })])
					.range([height, 0])
			};
		}

		function generateTicks(_yScale, _ticks){
			return d3.svg.axis()
				.scale(_yScale)
				.orient('left')
				.ticks(_ticks)
				.outerTickSize(0)
				.tickSize(-width);
		}

		return this;
	}

	// Export to window
	window.Chart = window.Chart || {};
	window.Chart.GraphChart = GraphChart;

})(window);