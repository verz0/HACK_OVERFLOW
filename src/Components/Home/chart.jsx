import React, { Component } from 'react';

import ReactApexChart from 'react-apexcharts';

class Chart extends Component {
  constructor(props) {
    super(props);

  
    this.state = {
          
        series: [{
          name: 'Income',
          data: [31, 40, 28, 51, 42, 109, 100]
        }, {
          name: 'Expense',
          data: [11, 32, 45, 32, 34, 52, 41]
        }],
        options: {
          chart: {
            height: 550,
            type: 'area',
            toolbar: {
              show : false
            }

          },
          dataLabels: {
            enabled: true
          },
          stroke: {
            curve: 'smooth',
            width: 2,

          },
          xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          },
        },
      
      
      };
    }


  render() {
    return (
      <div>
        <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={450} />
      </div>
    );
  }
}

export default Chart;