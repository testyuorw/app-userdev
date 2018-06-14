<template>
  <div class="com-page" v-if="page>0">
    <div class="flex  com-page-box flex-ac">
      <router-link  v-if="nowpage>1" class="com-page-prev" :to="{query:queryString({page:prev})}">上一页</router-link>
      <router-link  v-text="item" :key="index" v-for="(item,index) in pagination" :to="{query: queryString({page:item})}"></router-link>
      <router-link  v-if="nowpage<page" :to="{query: queryString({ page:next })}">下一页</router-link>
    </div>
  </div>
</template>
<script>
  import copy  from '../../tools/copy'
  import clear from '../../tools/clearkey'
  var method = {};
  var CreateRange = function (start,end) {
    this.pagination = [];
    for (var i = start; i <= end; i++) {
      this.pagination.push(i);
    }
  };
  method.queryString = function (obj) {
    var _urlquery = {};
    var routerQuery = this.$route.query;
    copy(routerQuery, _urlquery);
    clear(_urlquery, ['page']);
    Object.assign(obj,_urlquery);
    return obj;
  };
  var PageQuery = function () {
    this.nowpage = Number(this.$route.query.page) || 1;
    this.prev = this.nowpage > 1 ? this.nowpage - 1 : 1;
    this.next = this.nowpage + 1;
    var offset = 4;
    var rangelength = 5;
    /**
    * end 为创建分页页码的最后一个值
    * */
    var end = (this.nowpage + offset);
    end = end > this.page ? this.page : end;
    var start = 0;
    if (end >= this.page) {
      start = Math.max((this.page - offset), 1);
    } else if (this.page < rangelength) {
      start = 1;
    } else if (end <= this.page) {
      start = this.nowpage;
    }
    /**
    *  如果end大于总条数，则取总条数，否则取end
    * */
    this.range = end > this.page ? this.page : end;
    /**
     * 如果end <= this.page 则从当前页码进行循环创建页码区间
     * 否则如果end 大于总条数，则总条数-offset做为最后一页的循环起始值
    * */
    CreateRange.call(this, start, this.range);
  };
  var instance = function () {
    var self = this;
    var t = setInterval(function () {
      if(self.total){
          clearInterval(t);
      }
      if (self.total > self.limit) {
        self.page = Math.ceil(self.total / self.limit);
        if (self.page > 1) {
          PageQuery.apply(self);
        }
      }else{
        self.page = 0;
      }
    },100);
  };
  export default{
    name: "pagenav",
    methods: method,
    watch: {
      '$route': instance
    },
    props: {
      total: {
        type: Number,
        required: true
      },
      limit: {
        type: Number,
        required: true
      }
    },
    data(){
      var _stroe = {};
      _stroe.range = 5;
      _stroe.prev = 1;
      _stroe.nowpage = 1;
      _stroe.next = 1;
      _stroe.pagination = [];
      _stroe.page = 0;
      return _stroe;
    },
    mounted(){
        instance.apply(this);
    }
  }
</script>
