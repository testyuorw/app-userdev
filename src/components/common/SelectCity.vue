<template>
	<div class="selectCity">
    <van-area :area-list="arealist" :value="district.toString() || '110000'" title="选择城市"
              @confirm="sureHandle" @change="getCityData" @cancel="cancelHandle"
              :item-height='50'/>
	</div>
</template>
<script>
	import page from '../page'
  import citylist from './area'
	const store = {};
	const method = {};
	store.areaShow=false;
	store.arealist = {
		province_list: {},
		city_list: {},
		county_list:{}
	};
	store.active = -1;
	store.provinceObj = null;
	method.cancelHandle = function(){
		store.vm.$emit('pupStatus', 1);
		method.clearArry();
	};
	method.sureHandle = function(){
		store.vm.$emit('pupStatus', store.provinceObj);
		method.clearArry();
	};
	method.areaShowFn = function(){
		store.areaShow=true;
		store.provinceObj = {"province":"110000","provinceName":"北京市","city":"110100","cityName":"北京市","district":"110101","districtName":"东城区"};
	};
	method.getCityData=function(data,obj) {
    obj = data.getValues();

    let provinceName = obj[0].name;
    let provinceId = obj[0].code;

    let cityName = obj[1].name;
    let cityId = obj[1].code;

    let areaName = obj[2].name?obj[2].name:'';
    let areaId = obj[2].code?obj[2].code:'';
    store.active = -1;
		store.provinceObj = {
			province: provinceId,
			provinceName: provinceName,
			city: cityId,
			cityName: cityName,
			district: areaId,
			districtName: areaName
		};
	};
	method.clearArry = function () {
		store.active = -1;
		store.arealist = {
			province_list: {},
			city_list: {},
			county_list:{}
		}
	};
	method.initCity = function () {
		// 城市数组处理
		for(let i in citylist){
			let province = citylist[i];
			if(province.id== 810000 || province.id == 820000) return; //排除港澳
			store.arealist.province_list[province.id] = province.name;
			for(let j in province.child){
				let city = province.child[j];
				store.arealist.city_list[city.id] = city.name;
				for(let m in city.child){
					let area = city.child[m];
					store.arealist.county_list[area.id] = area.name;
				}
			}
		}
		localStorage.arealist = JSON.stringify(store.arealist);
	};
	export default {
		name: 'SelectCity',
		data(){
			return store;
		},
		props: ['district'],
		methods: method,
		created () {
			if(localStorage.arealist){
				this.arealist = JSON.parse(localStorage.arealist);
			}else{
				this.initCity();
			}
		},
		mounted() {
			store.vm = this;
			page.title("筛选城市");
		}
	}
</script>
<style scoped lang="scss">
</style>

