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
	barClass: 'bar',
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

function BarChart(data, config){
	// Bar Settings
	var self = this,
		xScale, yScale, yAxis,
		margin = config.margin,
		axis = config.axis,
		height = config.chartHeight - margin.top - margin.bot,
		width = config.chartWidth - margin.left - margin.right;

	var SVG = setupGraph(config);
	var AXIS = generateAxis(SVG);
	var BARS = generateBars(SVG, data);

	// RETURN DATA
	self.data = data;
	self.config = config;
	self.updateData = updateData;
	self.chart = {
		barChart: SVG,
		bars: BARS 
	};

	function updateData(newData){
		var _svg = self.chart.barChart;
		self.data = newData;
		removeAllBars(_svg, function(){
			generateScales(newData);
			generateBars(_svg, newData);
		});
	}

	function setupGraph(config){
		generateScales(data);
		yAxis = d3.svg.axis()
			.scale(yScale)
			.orient('left')
			.ticks(axis.y.ticks)
			.outerTickSize(0)
			.tickSize(-width);

		return getSVGChart(config.elementID);
	}

	function getSVGChart(elementID){
		// SVG CHART
		var _svg = d3.select(elementID)
		    .append('svg')
		    .attr({
		    	'width': width + margin.left + margin.right,
		    	'height': height + margin.top + margin.bot,
		    })
		    .append('g')
		    .attr('transform', 'translate('+margin.left+','+margin.top+')');

		_svg.append('g')
			.attr('class', 'grid axis')
			.call(yAxis);

		return _svg;
	}

	function generateAxis(_svg){
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
	}

	function generateScales(_data){
		xScale = d3.scale.ordinal()
			.domain(_data.map(function(d) { return d.name; }))
			.rangeRoundBands([0, width], 0.5);

		yScale = d3.scale.linear()
			.domain([0, d3.max(_data, function(d) { return d.data; })])
			.range([height, 0]);
	}

	function generateBars(_svg, _data){
		// BARS
		var bars = _svg.selectAll('bars').data(_data);
		var bar = bars.enter().append('g').attr('class', 'bar-group');
		bar.append('rect')
			.attr({
				'x': function(d) { return xScale(d.name); },
				'y': height,
				'height': 0,
				'width': xScale.rangeBand(),
				'class': config.barClass
			})
			.transition()
			.duration(600)
			.delay(function(d, i) { return 200 * i })
			.attr({
				'y': function(d) { return yScale(d.data); },
				'height': function(d) { return height - yScale(d.data); },
			});
		bar.append('text')
			.text(function(d){ return d.name })
			.attr({
				'class': 'labels',
				'x': function(d) {
					return xScale(d.name) + xScale.rangeBand()/2;
				},
				'y': height + 10,
				'text-anchor': 'middle',
				'opacity': 0
			})
			.transition()
			.delay(function(d, i) { return 200 * i })
			.attr({
				'y': config.chartHeight - margin.bot,
				'opacity': 1
			});
	}

	function removeAllBars(_svg, callback){
		var bars = _svg.selectAll('.bar-group');
		bars.select('rect')
			.transition()
			.attr({
				'height': 0,
				'y': height
			})
		bars.select('text')
			.transition()
			.attr({
				'y': height + 10,
				'opacity': 0
			})
			.each('end', function(){
				d3.select(this.parentNode).remove();
			})
			.call(endAll, callback);
	}

	function endAll(transition, callback) {
		var n;

		if (transition.empty()) {
			callback();
		} else {
			n = transition.size();
			transition.each("end", function () {
				n--;
				if (n === 0) {
					callback();
				}
			});
		}
	}

	return self;
}

