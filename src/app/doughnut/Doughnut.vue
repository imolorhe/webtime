<script>
import { Doughnut } from 'vue-chartjs'
import { getColors } from '../utils';

export default {
  extends: Doughnut,
  props: ['doughnutData', 'options'],
  mounted () {
  },
  watch: {
    doughnutData() {
      const labels = this.doughnutData.map(data => data.key);
      const data = this.doughnutData.map(data => parseInt(data.value, 10));
      // Overwriting base render method with actual data.
      this.renderChart({
        datasets: [{
          backgroundColor: getColors(data.length),
          data
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels
      }, {
        legend: {
          display: false
        },
        ...this.options
      });
    }
  }
}
</script>
