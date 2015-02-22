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
		margin = config.margin,
		axis = config.axis,
		height = config.chartHeight - margin.top - margin.bot,
		width = config.chartWidth - margin.left - margin.right;

	var xScale = d3.scale.ordinal()
		.domain(data.map(function(d) { return d.name; }))
		.rangeRoundBands([0, width], 0.5);

	var yScale = d3.scale.linear()
	    .domain([0, d3.max(data, function(d) { return d.data; })])
	    .range([height, 0]);

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient('left')
		.ticks(axis.y.ticks)
		.outerTickSize(0)
		.tickSize(-width);

	// SVG
	var svg = d3.select(config.elementID)
	    .append('svg')
	    .attr({
	    	'width': width + margin.left + margin.right,
	    	'height': height + margin.top + margin.bot,
	    })
	    .append('g')
	    .attr('transform', 'translate('+margin.left+','+margin.top+')');

	svg.append('g')
		.attr('class', 'grid axis')
		.call(yAxis);

	// BARS
	var bars = svg.selectAll('bars').data(data);
	var bar = bars.enter().append('g').attr('class', 'bar-group');
	bar.append('rect')
		.attr({
			'x': function(d) { return xScale(d.name); },
			'y': function(d) { return yScale(d.data); },
			'height': function(d) { return height - yScale(d.data); },
			'width': xScale.rangeBand(),
			'class': config.barClass
		});
	bar.append('text')
		.text(function(d){ return d.name })
		.attr({
			'class': 'labels',
			'x': function(d) {
				return xScale(d.name) + xScale.rangeBand()/2;
			},
			'y': config.chartHeight - margin.bot,
			'text-anchor': 'middle'
		});

	// X & Y AXIS
	var axis = svg.append('g').attr('class', 'axis');
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

	// RETURN DATA
	self.data = data;
	self.config = config;
	self.chart = {
		barChart: svg,
		bars: bars 
	};

	return self;
}

