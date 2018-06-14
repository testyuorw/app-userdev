<template>
  <!--<div>-->
    <pd-select-box>
      <div class="btn-group-city">
      <button type="button" class="btn2" @click="toggle($event)">取消</button>
      <button type="button" class="btn2" @click="confirm($event)">完成</button>
      </div>
      <div  style="width: 100%;display: flex;">
        <pd-select-item :listData="areadata" v-model="province"></pd-select-item>
        <pd-select-item :listData="city" v-model="citymodel"></pd-select-item>
        <pd-select-item :listData="county" v-model="countrymodel"></pd-select-item>
      </div>
    </pd-select-box>

  <!--</div>-->
</template>
<script>
  import pdSelectItem from './components/selectitem.vue'
  import pdSelectBox from './components/slectBox.vue'
  import api from '../../services/api'
  import error from '../../services/error'
  import _areadata from './area'
  // import cityServ from '../../services/cityServ'
  var method = {};
  let  areadata = _areadata;
  method.toggle =function (event) {
    this.$emit('select',false);
    event.stopPropagation();
  };
  method.confirm = function () {
    this.$emit('select',false);
    event.stopPropagation();
    this.$emit('areas',areadata[this.province].id,areadata[this.province].name,this.city[this.citymodel].id,this.city[this.citymodel].name,this.county[this.countrymodel].id,this.county[this.countrymodel].name);
  };

  method.chooseprovince = function () {
    this.county = this.city = {};
    this.city = areadata[this.province]['child'];
    this.citymodel = 0;
    method.choosecity.apply(this);
  };
  method.choosecity = function () {
    this.county = {};
    this.county = areadata[this.province]['child'][this.citymodel]['child'];
    this.countrymodel = 0;
  };
  // method.choosecountry = function () {
  //   this.address = cityData[0][this.province] + ' ' + this.city[this.citymodel] + ' ' + this.countrymodel;
  // };

  export default{
      name:'city',
      methods:method,
      components: {
        pdSelectItem,
        pdSelectBox
      },
      watch:{
        province:function () {
            this.chooseprovince();
        },
        citymodel:function () {
            this.choosecity();
        },
      },
      data(){
        let _stroe = {areadata:[],city:[],county:[],countrymodel:[]};
        _stroe.province = '';
        _stroe.citymodel = 0;
        _stroe.isShow = false;
        _stroe.areadataLists = '';
        _stroe.message = "请选择地址";
        _stroe.areadata = areadata;
        _stroe.city = areadata[0]['child'];
        _stroe.county = areadata[0]['child'][0]['child'];
        _stroe.countrymodel = _stroe.county[0];
        try {
          api.showCities().then(function (res) {
            if (res.code = error.success) {
              areadata = res.result;
              _stroe.areadata = areadata;
              _stroe.city = areadata[0]['child'];
              _stroe.county = areadata[0]['child'][0]['child'];
              _stroe.countrymodel = _stroe.county[0];
            }
          })
        }catch(e){

        }
        return _stroe;
      }

  }
</script>
