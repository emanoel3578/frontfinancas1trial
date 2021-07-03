<template>
<div id="titleBar" class="block md:hidden relative bg-gray-900 h-10 w-full">
  <div class="flex flex-row items-center justify-between">
    <div class="flex items-center">
      <img class="w-8 h-8 m-1" src="img/cloud.png">
    </div>
    <div class="flex items-center">
      <p class="text-white">Front Finanças - Admin: Roberto Feitoza</p>
    </div>
    <div id="closingItems" class="flex justify-between">
      <img @click="minimizeWindow()" class="cursor-pointer w-9 h-10 py-2 px-2 mr-3 hover:bg-gray-700" src="img/minimize.png">
      <img @click="maximizeWindow()" class="cursor-pointer	w-10 h-10 py-3 px-3 mr-3  hover:bg-gray-700" src="img/maximize.png">
      <img @click="closeWindow()" class="cursor-pointer w-10 h-10 py-3 px-3 hover:bg-red-700" src="img/close.png">
    </div>
  </div>
</div>
    
    <div class="sidebar flex">
      <div class="flex-none flex-col left-0 bg-gray-900 h-screen shadow-lg">
        <div class="mt-2 flex justify-end">
          <img v-if="closeMenu" src="img/menu.png" class="m-4 w-8 h-8 cursor-pointer" @click="showMenu = !showMenu,closeMenu = !closeMenu">
          <p v-else class="rounded-full bg-red-800 mx-4 mt-2 cursor-pointer h-6 w-6 text-white text-center" @click="showMenu = !showMenu,closeMenu = !closeMenu">X</p>
        </div>

        <transition name="fade">
          <div v-if="showMenu">
              <div class="flex items-center pl-2 h-20 border-b border-gray-800">
                <img src="img/seubeto.jfif" class="max-h-14 rounded-full">
                  <div class="ml-1">
                      <p class="pr-2 ml-1 text-md font-medium tracking-wide truncate text-gray-100 font-sans">Roberto Feitoza</p>
                      <div class="badge">
                            <span class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full">Admin</span>
                      </div>
                  </div>
              </div>
              <div class="overflow-y-auto overflow-x-hidden flex-grow">
              <ul class="flex flex-col py-8 space-y-1 ">
                  <li class="px-5">
                      <div class="flex flex-row items-center h-8">
                          <div class="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase">Menu</div>
                      </div>
                  </li>
                  <li>
                      <a @click="clickedPainel" href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                          <span class="inline-flex justify-center items-center ml-4">
                          <img class="w-5 h-5" src="img/painel.png">
                          </span>
                          <span  class="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Painel</span>
                      </a>
                  </li>
                  <li >
                      <a @click="clickedReceita" href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                          <span class="inline-flex justify-center items-center ml-4">
                          <img class="w-5 h-5" src="img/receita.png">
                          </span>
                          <span  class="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Receitas</span>
                          
                      </a>
                  </li>
                
                  <li>
                  <a @click="clickedDespesas" href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                      <span class="inline-flex justify-center items-center ml-4">
                      <img class="w-5 h-5" src="img/despesas.png">
                      </span>
                      <span  class="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Despesas</span>
                  </a>
                  </li>

                  <li>
                  <a @click="clickedviagens" href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                      <span class="inline-flex justify-center items-center ml-4">
                      <img class="w-5 h-5" src="img/bus.png">
                      </span>
                      <span  class="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Viagens</span>
                  </a>
                  </li>
                  
                  <li>
                  <a @click="clickedFluxo" href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                      <span class="inline-flex justify-center items-center ml-4">
                      <img class="w-5 h-5" src="img/fluxo.png">
                      </span>
                      <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Fluxo</span>
                  </a>
                  </li>
              </ul>
              </div>
            </div>
          </transition>
      </div>

          
    <main class="relative h-screen w-screen">
      <div v-if="firstLoading" class="absolute flex flex-col justify-center sm:py-8 :max-w-xl sm:mx-auto h-full w-full bg-black bg-opacity-80">
            <div class="max-w-md mx-auto px-4 py-3"> 
                <img src="img/cloud.png" class="h-40 w-40 animate-bounce">
            </div>
        </div>

        <div v-if="painel">
          <Suspense>
            <template #default>
                <PainelComponent :dataValues="[this.receitaDataComputed[0],this.receitaDataComputed[1],this.receitaDataComputed[2],this.receitaDataComputed[3]]" 
                :dataValuesDespesa="[this.despesaDataComputed[0],this.despesaDataComputed[1],this.despesaDataComputed[2],this.despesaDataComputed[3]]"/>
            </template>

            <template #fallback>
                <div class="flex justify-center h-screen">
                  <div class="m-auto">
                    <Loading />
                  </div>
                </div>
            </template>

          </Suspense>
        </div>

        <div v-show="receita">
          <Suspense>
            <template #default>
                <ReceitaComponent />
            </template>

            <template #fallback>
                <div class="flex justify-center h-screen">
                  <div class="m-auto">
                    <Loading />
                  </div>
                </div>
            </template>

          </Suspense>
        </div>

        <div v-show="despesas">
          <Suspense>
            <template #default>
                <DespesasComponent />
            </template>

            <template #fallback>
                <div class="flex justify-center h-screen">
                  <div class="m-auto">
                    <Loading />
                  </div>
                </div>
            </template>

          </Suspense>
        </div>

        <div v-show="viagens">
          <Viagens />
        </div>

        <div v-show="fluxo">
          <Fluxo />
        </div>
    </main>
  </div>
</template>

<script>
import Fluxo from './components/Fluxo.vue'
import Viagens from './components/Viagens.vue'
import Loading from './components/Loading.vue'
import {defineAsyncComponent} from 'vue'
import {db} from '@/firebase'

const PainelComponent = defineAsyncComponent(async () => {
  await new Promise (r => setTimeout(r, 500))
  return import('./components/Painel.vue')
})

const DespesasComponent = defineAsyncComponent(async () => {
  await new Promise (r => setTimeout(r, 500))
  return import('./components/Despesas.vue')
})

const ReceitaComponent = defineAsyncComponent(async () => {
  await new Promise (r => setTimeout(r, 500))
  return import('./components/Receita.vue')
})


export default {
  name: 'App',
  props:["Teste"],
  components: {
    Loading,
    PainelComponent ,
    ReceitaComponent,
    DespesasComponent,
    Fluxo,
    Viagens,
  },

  data () {
    return {
        receitaData: [],
        receitaDataComputed: [],
        despesaDataComputed: [],
        painel : false,
        receita : false,
        despesas : false,
        fluxo: false,
        viagens: false,
        showMenu:false,
        closeMenu:true,
        firstLoading:true,
        Users: []
      }
  },

  created () {
    
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
      const d = new Date();
  
      db.collection('receita')
      .where("mes", "==" , monthNames[d.getMonth()])
      .where("ano", "==", (d.getFullYear()).toString())
      .orderBy("valor", "desc")
      .limit(4)
      .onSnapshot((snapshotChange) => {
          this.receitaData=[]
          snapshotChange.forEach((doc)=> {
              this.receitaData.push ({
                  key:doc.id,
                  fornecedor:doc.data().fornecedor,
                  veiculo:doc.data().veiculo,
                  servico:doc.data().servico,
                  vencimento:doc.data().vencimento.split('-').reverse().join('/'),
                  fpg:doc.data().fpg,
                  valor:doc.data().valor,
                  categoria:doc.data().categoria,
                  data:doc.data().data.split('-').reverse().join('/'),
                  tipo:doc.data().tipo,
                  descricao:doc.data().descricao.substring(0,10) + "...",
                  page:doc.data().page,
                  idNumberDoc:doc.data().idNumberDoc,
                  controle:doc.data().controle,
                  fileID:doc.data().fileID,
              })
              
          })

          if (this.receitaData.length < 4 ) {
            let i = 0
            while (i < 4) {
              this.receitaDataComputed.push({
                fornecedor:"Nada",
                valor:0
              })
              i++
            }
          }else {
            this.receitaDataComputed = this.receitaData.map(function (match) {
              return match
            })
          }

      })


      db.collection('despesa')
      .where("mes", "==" , monthNames[d.getMonth()])
      .where("ano", "==", (d.getFullYear()).toString())
      .orderBy("valor", "desc")
      .limit(4)
      .onSnapshot((snapshotChange) => {
          this.despesaData=[]
          snapshotChange.forEach((doc)=> {
              this.despesaData.push ({
                  key:doc.id,
                  fornecedor:doc.data().fornecedor,
                  veiculo:doc.data().veiculo,
                  servico:doc.data().servico,
                  vencimento:doc.data().vencimento.split('-').reverse().join('/'),
                  fpg:doc.data().fpg,
                  valor:doc.data().valor,
                  categoria:doc.data().categoria,
                  data:doc.data().data.split('-').reverse().join('/'),
                  tipo:doc.data().tipo,
                  descricao:doc.data().descricao.substring(0,10) + "...",
                  page:doc.data().page,
                  idNumberDoc:doc.data().idNumberDoc,
                  controle:doc.data().controle,
                  fileID:doc.data().fileID,
              })
              
          })

          if (this.despesaData.length < 4 ) {
            let i = 0
            while (i < 4) {
              this.despesaDataComputed.push({
                fornecedor:"Nada",
                valor:0
              })
              i++
            }
          }else {
            this.despesaDataComputed = this.despesaData.map(function (match) {
              return match
            })
          }

      })

  },

  

  mounted() {
    this.$nextTick(function () {
        setTimeout(() => {
        this.firstLoading = false
        this.painel = true
      }, 2000);
    })
  },

  methods: {

    closeWindow () {
      window.ipcRenderer.send('closeApp')
    },

    minimizeWindow () {
      window.ipcRenderer.send('minimizeApp')
      console.log("clicked")
    },

    maximizeWindow () {
      window.ipcRenderer.send('maximizeApp')
    },

    clickedPainel: function() {
        this.painel = true
        this.receita = false
        this.despesas = false
        this.fluxo = false
        this.viagens = false
      },

      clickedReceita: function() {
        this.painel = false
        this.receita = true
        this.despesas = false
        this.fluxo = false
        this.viagens = false
      },

      clickedDespesas: function() {
        this.painel = false
        this.receita = false
        this.despesas = true
        this.fluxo = false
        this.viagens = false
      },

      clickedFluxo: function() {
        this.painel = false
        this.receita = false
        this.despesas = false
        this.fluxo = true
        this.viagens = false
      },

      clickedviagens: function() {
        this.painel = false
        this.receita = false
        this.despesas = false
        this.fluxo = false
        this.viagens = true
      },

  }
}
</script>

<style src="./assets/tailwind.css"></style>
<style>

#titleBar {
  -webkit-app-region: drag;
}

#closingItems {
  -webkit-app-region: no-drag;
}

body {
  overflow:hidden
}

.fade-enter-from{
  opacity:0;
}
.fade-enter-to{
  opacity:1;
}
.fade-enter-active{
  transition:all 2s ease;
}
.fade-leave-from{

}
.fade-leave-to{

}
.fade-leave-active{

}

@keyframes bounce {
  20%, 50%, 80%, to {
    transform: translateY(0);
  }
  40%{
    transform: translateY(-50px);
  }
  70%{
    transform: translateY(-25px);
  }
  90%{
    transform: translateY(-10px);
  }
}
</style>




