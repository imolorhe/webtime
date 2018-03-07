import Vue from 'vue';

import Home from './home/Home.vue';

/**
 * We need to use the render() function because template is not CSP-compliant.
 * Only render() function used in conjunction with vue files is CSP-compliant.
 */

new Vue({
  el: '#app',
  render: h => h(Home)
});


/**
 * http://colorhunt.co/c/107218
 * 
 * #5628B4
 * #D80E70
 * #E7455F
 * #F7B236
 *
backgroundColor: [
  '#5628B4',
  '#D80E70',
  '#E7455F',
  '#F7B236',
],
 */