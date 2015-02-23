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
		margin = _setup.margin;
		width = _setup.width;
		height = _setup.height;
		xScale = _setup.xScale;
		yScale = _setup.yScale;
		yAxis = _setup.yAxis;
	}

	function generateLines(_svg, _data){
		var lineGen = d3.svg.line()
			.x(function(d) { return xScale(d.name) })
			.y(function(d) { return yScale(d.data) });

		_svg.append('path')
			.attr({
				'class': 'line',
				'd': lineGen(_data)
			});
	}

	function updateData(){

	}

	return self;
}

LineChart.prototype = new GraphChart();