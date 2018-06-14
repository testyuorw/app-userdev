<template>
  <div class="star-rating">
    <label class="star-rating__star" v-for="rating in ratings" :class="{ 'is-selected' : ((value >= rating) && value != null), 'is-disabled' : disabled}"  v-on:mouseover="star_over(rating)" v-on:mouseout="star_out" v-on:click.prevent="set(rating)">
      <input class="star-rating star-rating__checkbox" type="radio" v-model="value">★
    </label>
    </div>

</template>
<script>
  export default{
    name:'stars',
    props:
      {
      value:{
        type:Number,
        default:0
      },
      max:{
        type:Number,
        default:5
      },
      disabled:{
        type:Boolean,
        default:false
      }
    },
    methods: {
      star_over: function (index) {
        if (this.disabled) {
          return;
        }
        this.temp_value = this.value;
        this.value = index;
      },
      star_out: function () {
        if (this.disabled) {
          return;
        }

        this.value = this.temp_value;
      },
      set: function (value) {
        if (this.disabled) {
          return;
        }

        this.temp_value = value;
        this.value = value;
      }
    },
    computed : {
      ratings : function(){
        if(!this.max) { return [1, 2, 3, 4, 5]; }

        var numberArray = [];

        for(var i = 1; this.max >= i; i++){
          numberArray.push(i);
        }

        return numberArray;
      }
    }
  }
</script>
