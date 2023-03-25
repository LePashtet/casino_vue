import {Doughnut} from 'vue-chartjs'
export default {
  extends: Doughnut,
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

    this.renderChart({
      labels: this.labels,
      //labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
      datasets: [
        {
          backgroundColor: [
            '#F24360',
            '#2EAC86',
            '#DBB104',
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
          ],

          //data: [25, 25, 25, 25],
          data: this.chartdata,
          borderColor: '#2b2d5e',
          borderWidth: 2,
        }
      ],

    }, {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            let dataset = data.datasets[0].data[tooltipItem.index];
            return data.labels[tooltipItem.index] + ' ' + dataset.toString() + '%';
          },
        }
      },
      legend: {
        position: 'bottom',
        labels: {
          fontColor: "$color-blue",
        }
      },

      animation: {
        animateScale: true,
        animateRotate: true
      }
    })
  },
}
