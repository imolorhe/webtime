<script>
import { Line } from 'vue-chartjs'
import { getColors, getFormattedSeconds } from '../utils';

export default {
  extends: Line,
  props: ['histogramData', 'options'],
  mounted () {
    this.renderWithData();
  },
  watch: {
    histogramData() {
      this.renderWithData();
    }
  },
  methods: {
    renderWithData() {
      const labels = this.histogramData.map(data => data.date);
      const data = this.histogramData.map(data => data.value);
      this.renderChart({
        labels,
        datasets: [
          {
            label: 'Total Browsing Time',
            // backgroundColor: '#f87979',
            borderColor: getColors(1)[0],
            data
          }
        ]
      }, {
        legend: {
          display: false
        },
        maintainAspectRatio: false,
        height: 300,
        scales: {
          xAxes: [{
            gridLines: {
              drawBorder: false,
              color: 'rgba(255, 255, 255, .1)'
            },
            ticks: {
              fontColor: '#ffffff'
            }
          }],
          yAxes: [{
            gridLines: {
              drawBorder: false,
              color: 'rgba(255, 255, 255, .1)'
            },
            ticks: {
              fontColor: '#ffffff',
              beginAtZero: true
            }
          }]
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: (tooltipItems, data) => getFormattedSeconds(tooltipItems.yLabel),
          }
        }
      });
    }
  }
}
</script>
