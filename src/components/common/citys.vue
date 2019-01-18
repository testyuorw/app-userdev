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
  import lstore from '../../tools/lstore';
  
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
    if(areadata[this.province] && this.city[this.citymodel] && this.county[this.countrymodel])
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
  var self = this;
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
        }
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
        let sType = lstore.get_item("sharetype") ==null ? 0 : lstore.get_item("sharetype").val;
        console.log("sType:");
        console.log(sType);
        if(typeof(sType) == undefined || sType == 0){
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
        }else{
          areadata = [{"child":[{"child":[{"id":310106,"name":"静安区","parent_id":310100},{"id":310110,"name":"杨浦区","parent_id":310100},{"id":310115,"name":"浦东新区","parent_id":310100},{"id":310120,"name":"奉贤区","parent_id":310100},{"id":310101,"name":"黄浦区","parent_id":310100},{"id":310107,"name":"普陀区","parent_id":310100},{"id":310112,"name":"闵行区","parent_id":310100},{"id":310116,"name":"金山区","parent_id":310100},{"id":310230,"name":"崇明县","parent_id":310100},{"id":310104,"name":"徐汇区","parent_id":310100},{"id":310108,"name":"闸北区","parent_id":310100},{"id":310113,"name":"宝山区","parent_id":310100},{"id":310117,"name":"松江区","parent_id":310100},{"id":310105,"name":"长宁区","parent_id":310100},{"id":310109,"name":"虹口区","parent_id":310100},{"id":310114,"name":"嘉定区","parent_id":310100},{"id":310118,"name":"青浦区","parent_id":310100}],"id":310100,"name":"上海市","parent_id":310000}],"id":310000,"name":"上海","parent_id":0},{"child":[{"child":[{"id":320105,"name":"建邺区","parent_id":320100},{"id":320114,"name":"雨花台区","parent_id":320100},{"id":320125,"name":"高淳区","parent_id":320100},{"id":320106,"name":"鼓楼区","parent_id":320100},{"id":320115,"name":"江宁区","parent_id":320100},{"id":320102,"name":"玄武区","parent_id":320100},{"id":320111,"name":"浦口区","parent_id":320100},{"id":320116,"name":"六合区","parent_id":320100},{"id":320104,"name":"秦淮区","parent_id":320100},{"id":320113,"name":"栖霞区","parent_id":320100},{"id":320124,"name":"溧水区","parent_id":320100}],"id":320100,"name":"南京市","parent_id":320000},{"child":[{"id":320507,"name":"相城区","parent_id":320500},{"id":320583,"name":"昆山市","parent_id":320500},{"id":320508,"name":"姑苏区","parent_id":320500},{"id":320584,"name":"吴江区","parent_id":320500},{"id":320505,"name":"虎丘区","parent_id":320500},{"id":320581,"name":"常熟市","parent_id":320500},{"id":320585,"name":"太仓市","parent_id":320500},{"id":320506,"name":"吴中区","parent_id":320500},{"id":320582,"name":"张家港市","parent_id":320500}],"id":320500,"name":"苏州市","parent_id":320000},{"child":[{"id":320921,"name":"响水县","parent_id":320900},{"id":320925,"name":"建湖县","parent_id":320900},{"id":320922,"name":"滨海县","parent_id":320900},{"id":320981,"name":"东台市","parent_id":320900},{"id":320902,"name":"亭湖区","parent_id":320900},{"id":320923,"name":"阜宁县","parent_id":320900},{"id":320982,"name":"大丰市","parent_id":320900},{"id":320903,"name":"盐都区","parent_id":320900},{"id":320924,"name":"射阳县","parent_id":320900}],"id":320900,"name":"盐城市","parent_id":320000},{"child":[{"id":321323,"name":"泗阳县","parent_id":321300},{"id":321302,"name":"宿城区","parent_id":321300},{"id":321324,"name":"泗洪县","parent_id":321300},{"id":321311,"name":"宿豫区","parent_id":321300},{"id":321322,"name":"沭阳县","parent_id":321300}],"id":321300,"name":"宿迁市","parent_id":320000},{"child":[{"id":320205,"name":"锡山区","parent_id":320200},{"id":320282,"name":"宜兴市","parent_id":320200},{"id":320202,"name":"崇安区","parent_id":320200},{"id":320206,"name":"惠山区","parent_id":320200},{"id":320203,"name":"南长区","parent_id":320200},{"id":320211,"name":"滨湖区","parent_id":320200},{"id":320204,"name":"北塘区","parent_id":320200},{"id":320281,"name":"江阴市","parent_id":320200}],"id":320200,"name":"无锡市","parent_id":320000},{"child":[{"id":320611,"name":"港闸区","parent_id":320600},{"id":320681,"name":"启东市","parent_id":320600},{"id":320612,"name":"通州区","parent_id":320600},{"id":320682,"name":"如皋市","parent_id":320600},{"id":320621,"name":"海安县","parent_id":320600},{"id":320684,"name":"海门市","parent_id":320600},{"id":320602,"name":"崇川区","parent_id":320600},{"id":320623,"name":"如东县","parent_id":320600}],"id":320600,"name":"南通市","parent_id":320000},{"child":[{"id":321003,"name":"邗江区","parent_id":321000},{"id":321088,"name":"江都区","parent_id":321000},{"id":321023,"name":"宝应县","parent_id":321000},{"id":321081,"name":"仪征市","parent_id":321000},{"id":321002,"name":"广陵区","parent_id":321000},{"id":321084,"name":"高邮市","parent_id":321000}],"id":321000,"name":"扬州市","parent_id":320000},{"child":[{"id":320311,"name":"泉山区","parent_id":320300},{"id":320324,"name":"睢宁县","parent_id":320300},{"id":320302,"name":"鼓楼区","parent_id":320300},{"id":320321,"name":"丰县","parent_id":320300},{"id":320381,"name":"新沂市","parent_id":320300},{"id":320303,"name":"云龙区","parent_id":320300},{"id":320322,"name":"沛县","parent_id":320300},{"id":320382,"name":"邳州市","parent_id":320300},{"id":320305,"name":"贾汪区","parent_id":320300},{"id":320323,"name":"铜山区","parent_id":320300}],"id":320300,"name":"徐州市","parent_id":320000},{"child":[{"id":320705,"name":"新浦区","parent_id":320700},{"id":320723,"name":"灌云县","parent_id":320700},{"id":320706,"name":"海州区","parent_id":320700},{"id":320724,"name":"灌南县","parent_id":320700},{"id":320721,"name":"赣榆县","parent_id":320700},{"id":320703,"name":"连云区","parent_id":320700},{"id":320722,"name":"东海县","parent_id":320700}],"id":320700,"name":"连云港市","parent_id":320000},{"child":[{"id":321181,"name":"丹阳市","parent_id":321100},{"id":321102,"name":"京口区","parent_id":321100},{"id":321182,"name":"扬中市","parent_id":321100},{"id":321111,"name":"润州区","parent_id":321100},{"id":321183,"name":"句容市","parent_id":321100},{"id":321112,"name":"丹徒区","parent_id":321100}],"id":321100,"name":"镇江市","parent_id":320000},{"child":[{"id":320404,"name":"钟楼区","parent_id":320400},{"id":320481,"name":"溧阳市","parent_id":320400},{"id":320405,"name":"戚墅堰区","parent_id":320400},{"id":320482,"name":"金坛市","parent_id":320400},{"id":320411,"name":"新北区","parent_id":320400},{"id":320402,"name":"天宁区","parent_id":320400},{"id":320412,"name":"武进区","parent_id":320400}],"id":320400,"name":"常州市","parent_id":320000},{"child":[{"id":320804,"name":"淮阴区","parent_id":320800},{"id":320830,"name":"盱眙县","parent_id":320800},{"id":320811,"name":"清浦区","parent_id":320800},{"id":320831,"name":"金湖县","parent_id":320800},{"id":320802,"name":"清河区","parent_id":320800},{"id":320826,"name":"涟水县","parent_id":320800},{"id":320803,"name":"淮安区","parent_id":320800},{"id":320829,"name":"洪泽县","parent_id":320800}],"id":320800,"name":"淮安市","parent_id":320000},{"child":[{"id":321203,"name":"高港区","parent_id":321200},{"id":321284,"name":"姜堰区","parent_id":321200},{"id":321281,"name":"兴化市","parent_id":321200},{"id":321282,"name":"靖江市","parent_id":321200},{"id":321202,"name":"海陵区","parent_id":321200},{"id":321283,"name":"泰兴市","parent_id":321200}],"id":321200,"name":"泰州市","parent_id":320000}],"id":320000,"name":"江苏省","parent_id":0},{"child":[{"child":[{"id":330424,"name":"海盐县","parent_id":330400},{"id":330402,"name":"南湖区","parent_id":330400},{"id":330481,"name":"海宁市","parent_id":330400},{"id":330411,"name":"秀洲区","parent_id":330400},{"id":330482,"name":"平湖市","parent_id":330400},{"id":330421,"name":"嘉善县","parent_id":330400},{"id":330483,"name":"桐乡市","parent_id":330400}],"id":330400,"name":"嘉兴市","parent_id":330000},{"child":[{"id":330802,"name":"柯城区","parent_id":330800},{"id":330825,"name":"龙游县","parent_id":330800},{"id":330803,"name":"衢江区","parent_id":330800},{"id":330881,"name":"江山市","parent_id":330800},{"id":330822,"name":"常山县","parent_id":330800},{"id":330824,"name":"开化县","parent_id":330800}],"id":330800,"name":"衢州市","parent_id":330000},{"child":[{"id":330104,"name":"江干区","parent_id":330100},{"id":330109,"name":"萧山区","parent_id":330100},{"id":330182,"name":"建德市","parent_id":330100},{"id":330105,"name":"拱墅区","parent_id":330100},{"id":330110,"name":"余杭区","parent_id":330100},{"id":330183,"name":"富阳市","parent_id":330100},{"id":330102,"name":"上城区","parent_id":330100},{"id":330106,"name":"西湖区","parent_id":330100},{"id":330122,"name":"桐庐县","parent_id":330100},{"id":330185,"name":"临安市","parent_id":330100},{"id":330103,"name":"下城区","parent_id":330100},{"id":330108,"name":"滨江区","parent_id":330100},{"id":330127,"name":"淳安县","parent_id":330100}],"id":330100,"name":"杭州市","parent_id":330000},{"child":[{"id":330502,"name":"吴兴区","parent_id":330500},{"id":330523,"name":"安吉县","parent_id":330500},{"id":330503,"name":"南浔区","parent_id":330500},{"id":330521,"name":"德清县","parent_id":330500},{"id":330522,"name":"长兴县","parent_id":330500}],"id":330500,"name":"湖州市","parent_id":330000},{"child":[{"id":330921,"name":"岱山县","parent_id":330900},{"id":330922,"name":"嵊泗县","parent_id":330900},{"id":330902,"name":"定海区","parent_id":330900},{"id":330903,"name":"普陀区","parent_id":330900}],"id":330900,"name":"舟山市","parent_id":330000},{"child":[{"id":330204,"name":"江东区","parent_id":330200},{"id":330212,"name":"鄞州区","parent_id":330200},{"id":330282,"name":"慈溪市","parent_id":330200},{"id":330205,"name":"江北区","parent_id":330200},{"id":330225,"name":"象山县","parent_id":330200},{"id":330283,"name":"奉化市","parent_id":330200},{"id":330206,"name":"北仑区","parent_id":330200},{"id":330226,"name":"宁海县","parent_id":330200},{"id":330203,"name":"海曙区","parent_id":330200},{"id":330211,"name":"镇海区","parent_id":330200},{"id":330281,"name":"余姚市","parent_id":330200}],"id":330200,"name":"宁波市","parent_id":330000},{"child":[{"id":330681,"name":"诸暨市","parent_id":330600},{"id":330602,"name":"越城区","parent_id":330600},{"id":330682,"name":"上虞市","parent_id":330600},{"id":330621,"name":"绍兴县","parent_id":330600},{"id":330683,"name":"嵊州市","parent_id":330600},{"id":330624,"name":"新昌县","parent_id":330600}],"id":330600,"name":"绍兴市","parent_id":330000},{"child":[{"id":331004,"name":"路桥区","parent_id":331000},{"id":331024,"name":"仙居县","parent_id":331000},{"id":331021,"name":"玉环县","parent_id":331000},{"id":331081,"name":"温岭市","parent_id":331000},{"id":331002,"name":"椒江区","parent_id":331000},{"id":331022,"name":"三门县","parent_id":331000},{"id":331082,"name":"临海市","parent_id":331000},{"id":331003,"name":"黄岩区","parent_id":331000},{"id":331023,"name":"天台县","parent_id":331000}],"id":331000,"name":"台州市","parent_id":330000},{"child":[{"id":330304,"name":"瓯海区","parent_id":330300},{"id":330327,"name":"苍南县","parent_id":330300},{"id":330382,"name":"乐清市","parent_id":330300},{"id":330322,"name":"洞头县","parent_id":330300},{"id":330328,"name":"文成县","parent_id":330300},{"id":330302,"name":"鹿城区","parent_id":330300},{"id":330324,"name":"永嘉县","parent_id":330300},{"id":330329,"name":"泰顺县","parent_id":330300},{"id":330303,"name":"龙湾区","parent_id":330300},{"id":330326,"name":"平阳县","parent_id":330300},{"id":330381,"name":"瑞安市","parent_id":330300}],"id":330300,"name":"温州市","parent_id":330000},{"child":[{"id":330703,"name":"金东区","parent_id":330700},{"id":330781,"name":"兰溪市","parent_id":330700},{"id":330723,"name":"武义县","parent_id":330700},{"id":330782,"name":"义乌市","parent_id":330700},{"id":330726,"name":"浦江县","parent_id":330700},{"id":330783,"name":"东阳市","parent_id":330700},{"id":330702,"name":"婺城区","parent_id":330700},{"id":330727,"name":"磐安县","parent_id":330700},{"id":330784,"name":"永康市","parent_id":330700}],"id":330700,"name":"金华市","parent_id":330000},{"child":[{"id":331121,"name":"青田县","parent_id":331100},{"id":331125,"name":"云和县","parent_id":331100},{"id":331122,"name":"缙云县","parent_id":331100},{"id":331126,"name":"庆元县","parent_id":331100},{"id":331123,"name":"遂昌县","parent_id":331100},{"id":331127,"name":"景宁畲族自治县","parent_id":331100},{"id":331102,"name":"莲都区","parent_id":331100},{"id":331124,"name":"松阳县","parent_id":331100},{"id":331181,"name":"龙泉市","parent_id":331100}],"id":331100,"name":"丽水市","parent_id":330000}],"id":330000,"name":"浙江省","parent_id":0}];
          _stroe.areadata = areadata;
          _stroe.city = areadata[0]['child'];
          _stroe.county = areadata[0]['child'][0]['child'];
          _stroe.countrymodel = _stroe.county[0];
        }
        return _stroe;
      }
  }
</script>
