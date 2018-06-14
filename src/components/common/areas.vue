<template>
  <div class="content-block">
    <input id="areas" type="text" readonly="" placeholder="城市选择特效" />
    <input id="value" type="hidden" value="20,234,504"/>
  </div>
</template>
<script>
import LArea from '../../tools/LArea'
import area from '../../services/area'
export  default{
    name:'areas',
}
</script>
