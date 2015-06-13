basicCharts
=======

Basic, beautiful, charting library for simple and reusable D3 charts.

[View Basic Examples](http://kyh.io/D3/dist/) | 

## Usage
Coming Soon

#### Dependencies
basicCharts is built on top of [d3.js](http://d3js.org/). Please include `d3.js` before basicCharts.

#### Supported Browsers
* Google Chrome: latest version
* Opera 15+ (i.e. webkit version)
* Safari: latest version
* Firefox: latest version
* Internet Explorer: 10+

## API
### BarChart
|     Name      |      Type     |   Default     |  Description  |
| ------------- | ------------- | ------------- | ------------- |
| elementID     | string        | *required     | ID of the container element you want the chart to be injected into  |
| chartWidth    | int           | 400           | Width of the bar chart  |
| chartHeight   | int           | 400           | Height of the bar chart  |
| classes       | object        | { group: 'bar-group', bar: 'bar', label: 'labels'} | class names for the bar chart elements |
| axis          | object        | { y: { ticks: 8 } } | Config for number of ticks of the axis  |
| margin        | object        | { top: 20, bot: 30, left: 30, right: 0 } | Spacing around the chart svg  |

##### Example

    var barChartConfig = {
      elementID: '#bar-chart',
      chartWidth: document.querySelector('.bar-chart-container').offsetWidth,
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

    var barChart = new BarChart(data, barChartConfig);

### LineChart
|     Name      |      Type     |   Default     |  Description  |
| ------------- | ------------- | ------------- | ------------- |
| elementID     | string        | *required     | ID of the container element you want the chart to be injected into  |
| chartWidth    | int           | 400           | Width of the line chart  |
| chartHeight   | int           | 400           | Height of the line chart  |
| classes       | object        | { group: 'group', point: 'point', line: 'line', label: 'labels' } | class names for the line chart elements |
| axis          | object        | { y: { ticks: 8 } } | Config for number of ticks of the axis  |
| margin        | object        | { top: 20, bot: 30, left: 30, right: 0 } | Spacing around the chart svg  |

##### Example

    var lineChartConfig = {
      elementID: '#line-chart',
      chartWidth: document.querySelector('.line-chart-container').offsetWidth,
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

    var lineChart = new LineChart(data, lineChartConfig);

More Coming soon
