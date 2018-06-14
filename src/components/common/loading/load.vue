<template>
  <div class="w100 h100 flex-ajc" v-show="show">
    <div class="load-continer load5">
      <div class="loader">Loading...</div>
    </div>
  </div>


</template>
<script>
  export default{
    props: {
      show: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style lang="scss">
  .load-continer{
    background-color: rgba(50,50,50,0.5);
    padding:0.3rem 4rem;
    border-radius: 1rem;
  }

  .load5 .loader {
    margin: 4rem auto;
    font-size: 1rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    position: relative;
    text-indent: -9999rem;
    -webkit-animation: load5 1.1s infinite ease;
    animation: load5 1.1s infinite ease;
  }
  @-webkit-keyframes load5 {
    0%,
    100% {
      box-shadow: 0 -2.6rem 0 0 #ffffff,
      1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.2),
      2.5rem 0 0 0 rgba(255, 255, 255, 0.2),
      1.75rem 1.75rem 0 0 rgba(255, 255, 255, 0.2),
      0 2.5rem 0 0 rgba(255, 255, 255, 0.2),
      -1.8rem 1.8rem 0 0 rgba(255, 255, 255, 0.2),
      -2.6rem 0 0 0 rgba(255, 255, 255, 0.5),
      -1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.7);
    }
    12.5% {
      box-shadow: 0 -2.6rem 0 0 rgba(255, 255, 255, 0.7),
      1.8rem -1.8rem 0 0 #ffffff,
      2.5rem 0 0 0 rgba(255, 255, 255, 0.2),
      1.75rem 1.75rem 0 0 rgba(255, 255, 255, 0.2),
      0 2.5rem 0 0 rgba(255, 255, 255, 0.2),
      -1.8rem 1.8rem 0 0 rgba(255, 255, 255, 0.2),
      -2.6rem 0 0 0 rgba(255, 255, 255, 0.2),
      -1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.5);
    }
    25% {
      box-shadow: 0 -2.6rem 0 0 rgba(255, 255, 255, 0.5),
      1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.7),
      2.5rem 0 0 0 #ffffff,
      1.75rem 1.75rem 0 0 rgba(255, 255, 255, 0.2),
      0 2.5rem 0 0 rgba(255, 255, 255, 0.2),
      -1.8rem 1.8rem 0 0 rgba(255, 255, 255, 0.2),
      -2.6rem 0 0 0 rgba(255, 255, 255, 0.2),
      -1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.2);
    }
    37.5% {
      box-shadow: 0 -2.6rem 0 0 rgba(255, 255, 255, 0.2),
      1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.5),
      2.5rem 0 0 0 rgba(255, 255, 255, 0.7),
      1.75rem 1.75rem 0 0 rgba(255, 255, 255, 0.2),
      0 2.5rem 0 0 rgba(255, 255, 255, 0.2),
      -1.8rem 1.8rem 0 0 rgba(255, 255, 255, 0.2),
      -2.6rem 0 0 0 rgba(255, 255, 255, 0.2),
      -1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.2);
    }
    50% {
      box-shadow: 0 -2.6rem 0 0 rgba(255, 255, 255, 0.2),
      1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.2),
      2.5rem 0 0 0 rgba(255, 255, 255, 0.5),
      1.75rem 1.75rem 0 0 rgba(255, 255, 255, 0.7),
      0 2.5rem 0 0 #ffffff,
      -1.8rem 1.8rem 0 0 rgba(255, 255, 255, 0.2),
      -2.6rem 0 0 0 rgba(255, 255, 255, 0.2),
      -1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.2);
    }
    62.5% {
      box-shadow: 0 -2.6rem 0 0 rgba(255, 255, 255, 0.2),
      1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.2),
      2.5rem 0 0 0 rgba(255, 255, 255, 0.2),
      1.75rem 1.75rem 0 0 rgba(255, 255, 255, 0.5),
      0 2.5rem 0 0 rgba(255, 255, 255, 0.7),
      -1.8rem 1.8rem 0 0 #ffffff,
      -2.6rem 0 0 0 rgba(255, 255, 255, 0.2),
      -1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.2);
    }
    75% {
      box-shadow: 0 -2.6rem 0 0 rgba(255, 255, 255, 0.2),
      1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.2),
      2.5rem 0 0 0 rgba(255, 255, 255, 0.2),
      1.75rem 1.75rem 0 0 rgba(255, 255, 255, 0.2),
      0 2.5rem 0 0 rgba(255, 255, 255, 0.5),
      -1.8rem 1.8rem 0 0 rgba(255, 255, 255, 0.7),
      -2.6rem 0 0 0 #ffffff,
      -1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.2);
    }
    87.5% {
      box-shadow: 0 -2.6rem 0 0 rgba(255, 255, 255, 0.2), 1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.2), 2.5rem 0 0 0 rgba(255, 255, 255, 0.2), 1.75rem 1.75rem 0 0 rgba(255, 255, 255, 0.2), 0 2.5rem 0 0 rgba(255, 255, 255, 0.2), -1.8rem 1.8rem 0 0 rgba(255, 255, 255, 0.5), -2.6rem 0 0 0 rgba(255, 255, 255, 0.7), -1.8rem -1.8rem 0 0 #ffffff;
    }
  }
  @keyframes load5 {
    0%,
    100% {
      box-shadow: 0 -2.6rem 0 0 #ffffff, 1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.2), 2.5rem 0 0 0 rgba(255, 255, 255, 0.2), 1.75rem 1.75rem 0 0 rgba(255, 255, 255, 0.2), 0 2.5rem 0 0 rgba(255, 255, 255, 0.2), -1.8rem 1.8rem 0 0 rgba(255, 255, 255, 0.2), -2.6rem 0 0 0 rgba(255, 255, 255, 0.5), -1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.7);
    }
    12.5% {
      box-shadow: 0 -2.6rem 0 0 rgba(255, 255, 255, 0.7), 1.8rem -1.8rem 0 0 #ffffff, 2.5rem 0 0 0 rgba(255, 255, 255, 0.2), 1.75rem 1.75rem 0 0 rgba(255, 255, 255, 0.2), 0 2.5rem 0 0 rgba(255, 255, 255, 0.2), -1.8rem 1.8rem 0 0 rgba(255, 255, 255, 0.2), -2.6rem 0 0 0 rgba(255, 255, 255, 0.2), -1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.5);
    }
    25% {
      box-shadow: 0 -2.6rem 0 0 rgba(255, 255, 255, 0.5), 1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.7), 2.5rem 0 0 0 #ffffff, 1.75rem 1.75rem 0 0 rgba(255, 255, 255, 0.2), 0 2.5rem 0 0 rgba(255, 255, 255, 0.2), -1.8rem 1.8rem 0 0 rgba(255, 255, 255, 0.2), -2.6rem 0 0 0 rgba(255, 255, 255, 0.2), -1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.2);
    }
    37.5% {
      box-shadow: 0 -2.6rem 0 0 rgba(255, 255, 255, 0.2), 1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.5), 2.5rem 0 0 0 rgba(255, 255, 255, 0.7), 1.75rem 1.75rem 0 0 rgba(255, 255, 255, 0.2), 0 2.5rem 0 0 rgba(255, 255, 255, 0.2), -1.8rem 1.8rem 0 0 rgba(255, 255, 255, 0.2), -2.6rem 0 0 0 rgba(255, 255, 255, 0.2), -1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.2);
    }
    50% {
      box-shadow: 0 -2.6rem 0 0 rgba(255, 255, 255, 0.2), 1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.2), 2.5rem 0 0 0 rgba(255, 255, 255, 0.5), 1.75rem 1.75rem 0 0 rgba(255, 255, 255, 0.7), 0 2.5rem 0 0 #ffffff, -1.8rem 1.8rem 0 0 rgba(255, 255, 255, 0.2), -2.6rem 0 0 0 rgba(255, 255, 255, 0.2), -1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.2);
    }
    62.5% {
      box-shadow: 0 -2.6rem 0 0 rgba(255, 255, 255, 0.2), 1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.2), 2.5rem 0 0 0 rgba(255, 255, 255, 0.2), 1.75rem 1.75rem 0 0 rgba(255, 255, 255, 0.5), 0 2.5rem 0 0 rgba(255, 255, 255, 0.7), -1.8rem 1.8rem 0 0 #ffffff, -2.6rem 0 0 0 rgba(255, 255, 255, 0.2), -1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.2);
    }
    75% {
      box-shadow: 0 -2.6rem 0 0 rgba(255, 255, 255, 0.2), 1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.2), 2.5rem 0 0 0 rgba(255, 255, 255, 0.2), 1.75rem 1.75rem 0 0 rgba(255, 255, 255, 0.2), 0 2.5rem 0 0 rgba(255, 255, 255, 0.5), -1.8rem 1.8rem 0 0 rgba(255, 255, 255, 0.7), -2.6rem 0 0 0 #ffffff, -1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.2);
    }
    87.5% {
      box-shadow: 0 -2.6rem 0 0 rgba(255, 255, 255, 0.2), 1.8rem -1.8rem 0 0 rgba(255, 255, 255, 0.2), 2.5rem 0 0 0 rgba(255, 255, 255, 0.2), 1.75rem 1.75rem 0 0 rgba(255, 255, 255, 0.2), 0 2.5rem 0 0 rgba(255, 255, 255, 0.2), -1.8rem 1.8rem 0 0 rgba(255, 255, 255, 0.5), -2.6rem 0 0 0 rgba(255, 255, 255, 0.7), -1.8rem -1.8rem 0 0 #ffffff;
    }
  }


</style>

