basicCharts
=======

Basic, beautiful, charting library for simple and reusable D3 charts.

[View Examples](http://kyh.io/D3/dist/) | 

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
#### BarChart
|     Name      |      Type     |   Default     |  Description  |
| ------------- | ------------- | ------------- | ------------- |
| elementID     | string        | *required     | ID of the container element you want the bar chart to be injected into  |
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

More Coming soon
