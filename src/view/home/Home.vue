<script>
import { configureChains, createClient } from "@wagmi/core";

import { goerli, mainnet, polygon, polygonMumbai } from "@wagmi/core/chains";

import { Web3Modal } from "@web3modal/html";

import { computed } from 'vue'
import { useStore } from 'vuex'

import { VERSION } from "../../config/settings"

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

const chains = [goerli, polygonMumbai,mainnet, polygon];

// Wagmi Core Client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "d1fb5ad7ec6097f12d41cf20db86054c" }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal and Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);
const web3modal = new Web3Modal(
  { projectId: "d1fb5ad7ec6097f12d41cf20db86054c" },
  ethereumClient
);

export default {
  setup() {
    const store = useStore()

    let web3modalObj 
    const  connectWallet = async() => {
      web3modalObj = await web3modal.openModal()
      console.log("==============web3modalObj===============", web3modalObj)
    }


    const  getRandomInt = (min, max) => {
      return Math.floor(Math.random()*(max-min+1))+min;
    }
    const  closeModal = async() => {
      // web3modal.closeModal()
      // let version = process.env.VUE_APP_VERSION
      // setContentRows
      console.log(getRandomInt(0,2))
      let arr = [[1,2,3],[4,5,6],[7,8,9]]
      store.dispatch('contentStore/setContentRows', arr[getRandomInt(0,2)])

      console.log("==============wagmiClient===============", VERSION)
      console.log("==============wagmiClient===============", VERSION)
    }

    return {connectWallet, closeModal, count: computed(() => store.state.contentStore.count), double: computed(() => store.getters.count)}
  },
}
</script>>
<template>
  <div class="home">
    <div class="home-title">
      web3 Dapp
    </div>
    <div class="notes-list">
      <h1>{{ double }}</h1>
      <w3m-network-switch ></w3m-network-switch>
      <w3m-core-button balance="show"></w3m-core-button>
         <p>{{ count }}</p>
     
      <!-- <router-link to="/example01">初始setup</router-link> -->
      <button class="btu" @click="connectWallet"> openModal</button>
      <button class="btu" @click="closeModal"> closeModal</button>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.home 
  text-align: center
  .home-title
    padding: 1.875rem
   
      
  .notes-list
    display: flex
    align-items: center
    justify-content: center
    padding: .3125rem
    .btu 
      padding: .275rem
      margin:2px 
      background: #23fb09

</style>