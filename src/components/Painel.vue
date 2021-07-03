<template> 
    <h1 class="text-blue-500 text-5xl font-bold text-center tracking-wide ml-5 my-5">Painel inicial</h1>
    <div class="flex flex-col text-md text-center mt-8">

      <div class="flex gap-10 justify-center">

        <div class="w-1/4 flex flex-col border border-4 border-black shadow-lg rounded-md border-opacity-10">
          <h1 class="semibold">Contas a pagar</h1>

          <div class="p-5">
            <div class="flex justify-between">
              <h1 class="font-bold">R$ {{totalNaoPago}} Não pago</h1>
              <h1 class="text-sm">Últimos 30 dias</h1>
            </div>
            <div class="flex justify-between">
              <h1 class="text-sm">Em atraso</h1>
              <h1 class="text-sm">Em dia</h1> 
            </div>
              <div class="relative pt-1">
                <div class="overflow-hidden h-8 mb-4 text-xs flex rounded bg-amber-200">
                  <div id="firstBar" style="width: 50%" class="h-full shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
                  <div id="secondBar" style="width: 50%" class="h-full shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                </div>
              </div>
          </div>

          <div class="p-5">
            <div class="flex justify-between">
              <h1 class="font-bold">R$ {{totalPago}} Pago</h1>
              <h1 class="text-sm">Últimos 30 dias</h1>
            </div>
            <div class="flex justify-between">
              <h1 class="text-sm">Em atraso</h1>
              <h1 class="text-sm">Em dia</h1> 
            </div>
              <div class="relative pt-1">
                <div class="overflow-hidden h-8 mb-4 text-xs flex rounded bg-amber-200">
                  <div id="firstBarPago" style="width: 50%" class="h-full shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                  <div id="secondBarPago" style="width: 50%" class="h-full shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
                </div>
              </div>
          </div>
        </div>

        
        <div class="border border-4 border-black shadow-lg border-opacity-10 rounded-md flex flex-col flex-shrink">
          <h1 class="semibold">Despesas</h1>

          <div class="flex text-left gap-2 p-2">
            <h1 class="font-bold">R$ - {{valorTotalDespesa}}</h1>
            <span class="text-sm">Total deste Mês</span>
          </div>

          <div>
            <div style="height:350px;width:350px;">
              <p></p>
              <vue3-chart-js
                  :id="doughnutChart.id"
                  :type="doughnutChart.type"
                  :data="doughnutChart.data"
              ></vue3-chart-js>
            </div>

            <p class="text-sm p-2">*O grafico acima se refere as 4 maiores despesas do mês</p>
          </div>
          
        </div>

        <div class="border border-4 border-black shadow-lg border-opacity-10 rounded-md flex flex-col flex-shrink">
          <h1 class="semibold">Receita</h1>

          <div class="flex text-left gap-2 p-2">
            <h1 class="font-bold">R$ {{valorTotalReceita}}</h1>
            <span class="text-sm">Total deste Mês</span>
          </div>

          <div>
            <div style="height:350px;width:350px;">
              <vue3-chart-js
                  :id="doughnutChart2.id"
                  :type="doughnutChart2.type"
                  :data="doughnutChart2.data"
              ></vue3-chart-js>
            </div>

            <p class="text-sm p-2">*O grafico acima se refere as 4 maiores Receitas do mês</p>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-3 opacity-50	">
        <div class="border border-4 border-black shadow-lg border-opacity-10 rounded-md flex flex-col p-8 px-10">
          <h1 class="semibold">Fluxo de caixa</h1>

          <div class="flex text-left gap-2 p-2">
            <h1 class="font-bold">R$ 0</h1>
            <span class="text-sm">Total</span>
          </div>

          <div style="height:auto;width:auto;">
            <vue3-chart-js
            :id="lineGraph.id"
            :type="lineGraph.type"
            :data="lineGraph.data"
        ></vue3-chart-js>
          </div>
        </div>

    </div>

    </div>
</template>

<script>
  import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
  import {db} from '@/firebase'

    export default {
        name: 'Painel',
        props:['dataValues','dataValuesDespesa'],
        components: {
          Vue3ChartJs
        },

        data () {
          return {
            valorTotalReceita:null,
            valorTotalDespesa:null,
            naoPagoBar:[],
            totalNaoPago:null,
            totalPago:null,
            receitaData:[],
            receitaDataComputed:[],
            propsValue: this.dataValues
          }
        },

        created () {

          const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
          "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
          ];

          const d = new Date();

          db.collection('receita')
          .where("mes", "==" ,monthNames[d.getMonth()])
          .where("ano", "==", (d.getFullYear()).toString())
          .orderBy("timestamp").onSnapshot((snapshotChange => {
              this.allIdsReceita=[]
              snapshotChange.forEach((doc) => {
                  this.allIdsReceita.push({
                      key:doc.id,
                      idNumberDoc:doc.data().idNumberDoc,
                      valor:doc.data().valor
                      })
                  });
                  
                  const valorTotal = this.allIdsReceita.map(function (match) {
                  return match.valor
                  })

                  var valorTotalSomado =  valorTotal.reduce(function (total, currentvalue) {
                      return total + currentvalue
                  })

                  var valorTotalSomadoRegex = valorTotalSomado.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                  this.valorTotalReceita = valorTotalSomadoRegex
              }))


          db.collection('despesa')
          .where("mes", "==" ,monthNames[d.getMonth()])
          .where("ano", "==", (d.getFullYear()).toString())
          .orderBy("timestamp").onSnapshot((snapshotChange => {
              this.allIdsdespesa=[]
              snapshotChange.forEach((doc) => {
                  this.allIdsdespesa.push({
                      key:doc.id,
                      idNumberDoc:doc.data().idNumberDoc,
                      valor:doc.data().valor
                      })
                  });
                  
                  if (this.allIdsdespesa.length == 0 ) {
                      this.allIdsdespesa.push({valor:0})
                  }

                  const valorTotal = this.allIdsdespesa.map(function (match) {
                  return match.valor
                  })

                  var valorTotalSomado =  valorTotal.reduce(function (total, currentvalue) {
                      return total + currentvalue
                  })

                  var valorTotalSomadoRegex = valorTotalSomado.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                  this.valorTotalDespesa = valorTotalSomadoRegex
              }))


          db.collection("despesa")
          .where("mes", "==" ,monthNames[d.getMonth()])
          .where("ano", "==", (d.getFullYear()).toString())
          .where("controle", "!=", "Pago")
          .onSnapshot((snapshotChange => {
            this.receitaDataNaoPago = []
            snapshotChange.forEach((doc) => {
              this.receitaDataNaoPago.push(doc.data().valor)
            })
            
            this.naoPagoBar.push(this.receitaDataNaoPago.length)

            if (this.receitaDataNaoPago.length == 0) {
              this.receitaDataNaoPago.push(0)
            }

            this.totalNaoPago =  this.receitaDataNaoPago.reduce(function (total, currentvalue) {
                return total + currentvalue
            })
          }))

          db.collection("despesa")
          .where("mes", "==" ,monthNames[d.getMonth()])
          .where("ano", "==", (d.getFullYear()).toString())
          .where("controle", "==", "Pago")
          .onSnapshot((snapshotChange => {
            this.receitaDataPago = []
            snapshotChange.forEach((doc) => {
              this.receitaDataPago.push(doc.data().valor)
            })

            this.totalPago =  this.receitaDataPago.reduce(function (total, currentvalue) {
                return total + currentvalue
            })
            
            this.naoPagoBar.push(this.receitaDataPago.length)

            var totalLengthValue = this.naoPagoBar.reduce(function (total, currentvalue) {
                return total + currentvalue
            })
            
            var firstBarValue = ((this.naoPagoBar[0]*100)/totalLengthValue).toFixed(0).toString()
            var secondBarValue = 100 - ((this.naoPagoBar[0]*100)/totalLengthValue).toFixed(0)
            
            document.getElementById("firstBar").style.width = firstBarValue + "%";
            document.getElementById("secondBar").style.width = secondBarValue + "%";
            document.getElementById("firstBarPago").style.width = firstBarValue + "%";
            document.getElementById("secondBarPago").style.width = secondBarValue + "%";
          }))


        },

        mounted () {
          this.$nextTick(function () {
            
          })
        },

        setup(props) {
          const doughnutChart = {
            id: 'doughnut',
            type: 'doughnut',
            data: {
              labels: [props.dataValues[0].fornecedor,props.dataValues[1].fornecedor,props.dataValues[2].fornecedor,props.dataValues[3].fornecedor],
              datasets: [
                {
                  backgroundColor: [
                    '#41B883',
                    '#E46651',
                    '#00D8FF',
                    '#DD1B16'
                  ],
                  data: [props.dataValues[0].valor,props.dataValues[1].valor,props.dataValues[2].valor,props.dataValues[3].valor]
                }
              ]
            }
          }
          

          const doughnutChart2 = {
            id: 'doughnut',
            type: 'doughnut',
            data: {
              labels: [props.dataValuesDespesa[0].fornecedor,props.dataValuesDespesa[1].fornecedor,props.dataValuesDespesa[2].fornecedor,props.dataValuesDespesa[3].fornecedor],
              datasets: [
                {
                  backgroundColor: [
                    '#41B883',
                    '#E46651',
                    '#00D8FF',
                    '#DD1B16'
                  ],
                  data: [props.dataValuesDespesa[0].valor,props.dataValuesDespesa[1].valor,props.dataValuesDespesa[2].valor,props.dataValuesDespesa[3].valor]
                }
              ]
            }
          }


          const lineGraph = {
            id: 'graphInLine',
            type: 'line',
            data: {
              labels: [
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio'
              ],
              datasets: [{
                label: 'Valores',
                data: [1535, 2554, 3211, 1154, 555],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)',
                  'rgb(255, 205, 86)',
                  'rgb(255, 205, 86)'
                ],
                hoverOffset: 4,
              }]
            }
          }

          return {
            lineGraph,
            doughnutChart,
            doughnutChart2,
          }
        },
    }


</script>