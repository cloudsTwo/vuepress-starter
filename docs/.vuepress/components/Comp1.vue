<template>
  <div class="main">
     <div id="hello"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted } from '@vue/runtime-core';

export default {
  name: 'Comp1',
  setup(){
    onMounted(() =>{
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('hello'));

      var data = [];

      for (var i = 0; i <= 100; i++) {
          var theta = i / 100 * 360;
          var r = 5 * (1 + Math.sin(theta / 180 * Math.PI));
          data.push([r, theta]);
      }

      const option = {
          legend: {
              data: ['line']
          },
          polar: {},
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross'
              }
          },
          angleAxis: {
              type: 'value',
              startAngle: 0
          },
          radiusAxis: {
          },
          series: [{
              coordinateSystem: 'polar',
              name: 'line',
              type: 'line',
              data: data
          }],

          media: [ // 这里定义了 media query 的逐条规则。
          {
            query: {
              minWidth: 200,
              maxHeight: 300,
              minAspectRatio: 1.3
            },   // 这里写规则。
            option: {       // 这里写此规则满足下的option。
              gride:{
                right: 'center',
                top: 'middle',
                orient: 'horizontal'
              }
            }
          },
          {
            query: {
              maxHeight: 500,
              minAspectRatio: 1.3
            },   // 这里写规则。
            option: {       // 这里写此规则满足下的option。
              gride:{
                right: 'center',
                top: 'middle',
                orient: 'horizontal'
              }
            }
          },
          {
            option: {       // 这里写此规则满足下的option。
              gride:{
                right: 'center',
                top: 'middle',
                orient: 'horizontal'
              }
            }
          },
        ]
      };

      // 绘制图表
      myChart.setOption(option);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  width: 100%;
}

#hello{
  width: 100%;
  height: 500px;
  margin: 0 auto;
}
</style>
