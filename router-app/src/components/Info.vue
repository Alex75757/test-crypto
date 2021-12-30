<template>
  <div>
    <p>Name: {{ coin.name }}</p>
    <p>Symbol: {{ coin.symbol }}</p>
    <p>Price (USD): {{ coin.price_usd }}</p>
  
  
  
  <b-button variant="success">Запуск</b-button>
  <b-button variant="danger">Остановка</b-button>
  <b-button variant="warning">Сброс</b-button>
  
</div>
</template>
<script>
  import axios from 'axios'
import { ButtonPlugin } from 'bootstrap-vue'



  export default {
    name: 'Info',

    data() {
      return {
        coin: {}
      }
    },

    created() {
      this.fetchData()
    },

    watch: {
      '$route': 'fetchData'
    },

    methods: {
      fetchData() {
        axios.get(
            // 'https://api.coinmarketcap.com/v1/ticker/'+this.$route.params.id+'/')
            'wss://ws.blockchain.info/inv')
            // 'https://api.blockchain.com/v3/exchange')
        .then((resp) => {
          this.coin = resp.data
          console.log(resp)
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>