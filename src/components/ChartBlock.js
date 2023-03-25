import {Line} from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    labels: {
      type: Array,
      default: () => []
    },
    legend: {
      type: Boolean,
      default: true
    },
    datalabel: {
      type: String,
      default: ''
    },
    chartdata: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  mounted () {

    //let bgColor = 'rgba(139,142,206,0.35)'

    let bgColor = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    bgColor.addColorStop(0, 'rgba(139,142,206, 0.35)')
    bgColor.addColorStop(1, 'rgba(139,142,206, 0.01)')



    let legendConfig = false
    if (this.legend) {
      legendConfig = {
        labels: {
          fontColor: "#FFFC",
        }
      }
    }

    let backgroundColors = [
      '#F24360',
      //'#2EAC86',
      //'#DBB104',
      '#F49EE1',
      '#E15882',
      '#5B80E3',
      '#96B9F3',
      '#7B5EC6',
      '#0A7A50',
      '#EA6B05',
      '#2F6F8B',
      '#676BA0',
      '#E0B6C2',
      '#BCBCBC',
      '#D9F57F',
      '#794633',
      '#70ECD6',
      '#11A7FD',
      '#6E396A',
      '#354764',
      '#A02E0F',
      '#45155C',
      '#48E746',
      '#13548C',
      '#43D0D3',
      '#8551ED',
      '#F5B797',
      '#727046',
      '#5DA8B8',
      '#7DA273',
    ]

    let datasets = []
    let count = 0

    if (typeof this.chartdata[0] === "number") {
      datasets = [{
        label: this.datalabel,
        borderColor: backgroundColors[count],
        pointBackgroundColor: backgroundColors[count],
        borderWidth: 2,
        pointBorderColor: backgroundColors[count],
        backgroundColor: bgColor,
        data: this.chartdata,
      }]
    } else {
      for (let i = 0; i < this.chartdata.length; i++) {
        datasets.push({
          label: this.chartdata[i].meta,
          borderColor: backgroundColors[count],
          pointBackgroundColor: backgroundColors[count],
          borderWidth: 2,
          pointBorderColor: backgroundColors[count],
          backgroundColor: bgColor,
          data: this.chartdata[i].data,
        })
        count++
      }
    }


    this.renderChart({
      labels: this.labels,
      datasets: datasets
    }, {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          title: function(tooltipItems, data) {
            let time = tooltipItems[0].xLabel
            return time.toString().substr(0, 4) + '.' + time.toString().substr(4, 2) + '.' + time.toString().substr(6, 2);
          },
        }
      },
      legend: legendConfig,
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '$color-blue',
          },
          gridLines: {
            color: 'rgba(255,116,117,0.2)',
          },
        }],
        xAxes: [{
          ticks: {
            fontColor: '$color-blue',
            callback: function(label, index, labels) {
              if (index%2 === 0) return ""
              return label.toString().substr(0, 4) + '.' + label.toString().substr(4, 2) + '.' + label.toString().substr(6, 2);
            }
          },
          gridLines: {
            color: 'rgba(255,116,117,0.2)',
          },
        }]
      }
    })

  }
}
