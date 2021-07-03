<template>
    
    <div class="flex flex-col overflow-y-hidden relative h-screen">
        <div class="absolute w-full">
            <h1 class="text-blue-500 text-5xl font-bold text-left tracking-wide my-8 ml-5 mt-12 ">Fluxo de caixa</h1>


            <div class='flex gap-10'>

                <div class="p-2">
                    <div class="inline-flex items-center bg-white leading-none text-black rounded-full p-2 shadow-lg text-teal text-lg">
                        <span class="inline-flex bg-blue-500 text-white text-xl rounded-full h-6 px-3 justify-center items-center">Relatório</span>
                        <div class='ml-1 text-blue-500 border border-blue-500'>
                            <select class="apperance-none">
                                <option>Mensal</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="p-2">
                    <div class="inline-flex items-center bg-white leading-none text-black rounded-full p-2 shadow-lg text-teal text-lg">
                        <span class="inline-flex bg-blue-500 text-white text-xl rounded-full h-6 px-3 justify-center items-center">Mês</span>
                        <div class='ml-1 text-blue-500 border border-blue-500'>
                            <select v-on:change="getMonthFluxo($event)" class="apperance-none" ref='currentMonth'>
                                <option>Janeiro</option>
                                <option>Fevereiro</option>
                                <option>Março</option>
                                <option>Abril</option>
                                <option>Maio</option>
                                <option>Junho</option>
                                <option>Julho</option>
                                <option>Agosto</option>
                                <option>Setembro</option>
                                <option>Outubro</option>
                                <option>Novembro</option>
                                <option>Dezembro</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="p-2">
                    <div class="inline-flex items-center bg-white leading-none text-black rounded-full p-2 shadow-lg text-teal text-lg">
                        <span class="inline-flex bg-blue-500 text-white text-xl rounded-full h-6 px-3 justify-center items-center">Ano</span>
                        <div class='ml-1 text-blue-500 border border-blue-500'>
                            <select v-on:change="getMonthFluxo($event)" ref='yearselect' class="apperance-none">
                                <option value='2021'>2021</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="p-2 right-0">
                    <div class="inline-flex items-center bg-white leading-none text-black rounded-full p-2 shadow-lg text-teal text-lg">
                        <img class="cursor-pointer" @click="printPageArea('printableArea')" src="img/print.png">
                    </div>
                </div>
            </div>

            <div class='text-blue-500 text-2xl font-bold text-left tracking-wide mt-8 ml-5'>Receita</div>
            <div>
                <table class="w-full" id="receitaTable">
                <thead >
                    <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th class="p-2 font-bold uppercase text-blue-500">Saldo no 1º dia do mês</th>
                        <th class="p-2 font-bold uppercase text-blue-500">1ª semana</th>
                        <th class="p-2 font-bold uppercase text-blue-500">2ª semana</th>
                        <th class="p-2 font-bold uppercase text-blue-500">3ª semana</th>
                        <th class="p-2 font-bold uppercase text-blue-500">4ª semana</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Total do mês</th>
                    </tr>
                </thead>

                <tbody v-for='data in fluxoDataReceita' :key='data.key' class="text-gray-700 text-base font-light">

                    <tr class="border-b border-gray-200 hover:bg-gray-100 bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">

                        <td class="text-xl w-full lg:w-auto p-3 text-green-600 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                            R${{data.initialMonth}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-green-600 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            R${{data.firstWeek}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-green-600 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            R$ {{data.secondWeek}}
                        </td>

                        <td class="text-red-600 text-xl w-full text-green-600 lg:w-auto p-3 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            R$ {{data.thirdWeek}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-green-600 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            R$ {{data.forthWeek}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-green-600 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            R$ {{data.totalWeek}}
                        </td>

                    </tr>


                </tbody>
            </table>
        </div>

        <div class='text-blue-500 text-2xl font-bold text-left tracking-wide ml-5'>Viagens</div>
        <div>
                <table class="w-full" id="viagemTable">
                <thead >
                    <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th class="p-2 font-bold uppercase text-blue-500">Saldo no 1º dia do mês</th>
                        <th class="p-2 font-bold uppercase text-blue-500">1ª semana</th>
                        <th class="p-2 font-bold uppercase text-blue-500">2ª semana</th>
                        <th class="p-2 font-bold uppercase text-blue-500">3ª semana</th>
                        <th class="p-2 font-bold uppercase text-blue-500">4ª semana</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Total do mês</th>
                    </tr>
                </thead>

                <tbody v-for='data in fluxoDataViagen' :key='data.key' class="text-gray-700 text-base font-light">

                    <tr class="border-b border-gray-200 hover:bg-gray-100 bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">

                        <td class="text-xl w-full lg:w-auto p-3 text-green-600 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                            R${{data.initialMonth}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-green-600 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            R${{data.firstWeek}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-green-600 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            R$ {{data.secondWeek}}
                        </td>

                        <td class="text-red-600 text-xl w-full text-green-600 lg:w-auto p-3 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            R$ {{data.thirdWeek}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-green-600 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            R$ {{data.forthWeek}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-green-600 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            R$ {{data.totalWeek}}
                        </td>

                    </tr>


                </tbody>
            </table>
        </div>

        <div class='text-blue-500 text-2xl font-bold text-left tracking-wide ml-5'>Despesas</div>
        <div>
                <table class="w-full" id="despesaTable">
                <thead >
                    <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th class="p-2 font-bold uppercase text-blue-500">Saldo no 1º dia do mês</th>
                        <th class="p-2 font-bold uppercase text-blue-500">1ª semana</th>
                        <th class="p-2 font-bold uppercase text-blue-500">2ª semana</th>
                        <th class="p-2 font-bold uppercase text-blue-500">3ª semana</th>
                        <th class="p-2 font-bold uppercase text-blue-500">4ª semana</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Total do mês</th>
                    </tr>
                </thead>

                <tbody  v-for='data in fluxoDataDespesas' :key='data.key' class="text-gray-700 text-base font-light">

                    <tr class="border-b border-gray-200 hover:bg-gray-100 bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">

                        <td class="text-xl w-full lg:w-auto p-3 text-green-600 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                            R${{data.initialMonth}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-red-600 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            R${{data.firstWeek}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-red-600 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            R$ {{data.secondWeek}}
                        </td>

                        <td class="text-red-600 text-xl w-full text-red-600 lg:w-auto p-3 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            R$ {{data.thirdWeek}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-red-600 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            R$ {{data.forthWeek}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-red-600 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            R$ {{data.totalWeek}}
                        </td>

                    </tr>
                </tbody>

                <tbody v-for='data in faturamentofinal' :key='data.key' class="text-gray-700 text-base font-light">
                    <td class="text-blue-600 text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                            Faturamento
                    </td>
                    <td class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                            R${{data.firstWeekFinal}}
                    </td>
                    <td class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                            R${{data.secondWeekFinal}}
                    </td>
                    <td class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                            R${{data.thirdWeekFinal}}
                    </td>
                    <td class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                            R${{data.forthWeekFinal}}
                    </td>
                    <td class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                            R${{data.totalWeekFinal.toFixed(2)}}
                    </td>
                </tbody>
            </table>
        </div>

        <div class='text-blue-500 text-2xl font-bold text-left tracking-wide ml-5'>Saldo final de caixa </div>
        <div>
                <table class="w-full" id="finalTable">
                <thead >
                    <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th class="p-2 font-bold uppercase text-blue-500">Faturamento total do mês</th>
                    </tr>
                </thead>

                <tbody v-for='data in faturamentofinal' :key='data.key' class="text-gray-700 text-base font-light">
                    <tr class="border-b border-gray-200 hover:bg-gray-100 bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                        <td id="faturamentoTotal" class="text-xl w-full lg:w-auto p-3 font-bold	 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                           R${{data.totalWeekFinal.toFixed(2)}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div v-show="alertMessage" class="relative flex flex-col justify-center sm:py-8 :max-w-xl sm:mx-auto h-full w-full bg-black bg-opacity-80">
            <div class="max-w-md mx-auto px-4 py-3 bg-white rounded-2xl text-xl"> 
                <div @click="hideAlert" class='float-right cursor-pointer'>X</div>
                <h1 v-if="alertGetMonthType" class='float-left'>Nenhuma receita encontrada</h1>
                <h1 v-else class='float-left'>Nenhuma despesa encontrada</h1>
            </div>
        </div>
    
    </div>
</template>

<script>
import {db} from '@/firebase'
import { jsPDF } from "jspdf";
import 'jspdf-autotable'

    export default {
        name: 'Fluxo',
        data () {
            return {
                despesasData:[],
                receitaData:[],
                viagenData:[],
                lastSuccessfulMonthEntry:null,
                fluxoDataDespesas:[],
                fluxoDataReceita:[],
                fluxoDataViagen:[],
                faturamentofinal:[],
                firstcheck:0,
                alertMessage:false,
                alertGetMonthType:false,
                fluxoDataPrint:[],
            }
        },

        mounted () {
            this.$nextTick(function () {
                var monthForCheck = new Date().getMonth()
                var RefMounth = this.$refs.currentMonth
                var RefYear = this.$refs.yearselect

                if (new Date().getFullYear() > 2021) {
                var currentYearSelect = this.$refs.yearselect
                var newYearOption = document.createElement('option')
                var currentYear = new Date().getFullYear()

                newYearOption.text = currentYear + 1 
                currentYearSelect.add(newYearOption, currentYearSelect[0])
                }

                if (monthForCheck >= 0) {
                    RefMounth.options[monthForCheck].defaultSelected = true
                }

                db.collection('despesa')
                .where("mes", "==" ,RefMounth.options[RefMounth.selectedIndex].text)
                .where("ano", "==", RefYear.options[RefYear.selectedIndex].text)
                .where("valor", ">", 0)
                .orderBy("valor", "asc")
                .onSnapshot((snapshotChange => {
                this.despesasData=[]
                snapshotChange.forEach((doc) => {
                    this.despesasData.push({
                        key:doc.id,
                        data:doc.data().data.split('-').reverse().join('/'),
                        valor:doc.data().valor
                        })
                    })

                    if (this.despesasData != 0 ) {

                        var firstWeek = []
                        var secondWeek = []
                        var thirdWeek = []
                        var forthWeek = []
                        var initialMonthValue = 0

                        this.mappedDespesasWeeks = this.despesasData.map(function (i) {
                            var dataRegexed = i.data.match(/[^/]+/)
                            var dataRegexedInteger = parseInt(dataRegexed)

                            if (dataRegexedInteger == 1 ) {
                                initialMonthValue = i.valor
                            }

                            if (dataRegexedInteger >= 1 && dataRegexedInteger <= 7 ) {
                                firstWeek.push(i.valor)

                            }else if (dataRegexedInteger >= 8 && dataRegexedInteger <= 15 ) {
                                secondWeek.push(i.valor)

                            }else if (dataRegexedInteger >= 16 && dataRegexedInteger <= 23) {
                                thirdWeek.push(i.valor)

                            }else if (dataRegexedInteger >= 24 && dataRegexedInteger <= 31) {
                                forthWeek.push(i.valor)
                            }
                        })

                        if(firstWeek.length !== 0 ) {
                            var firstWeekSum =  firstWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            firstWeekSum = 0
                        }
                        
                        if(secondWeek.length !== 0 ) {
                            var secondWeekSum =  secondWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            secondWeekSum = 0
                        }

                        if(thirdWeek.length !== 0 ) {
                            var thirdWeekSum =  thirdWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            thirdWeekSum = 0
                        }

                        if(forthWeek.length !== 0 ) {
                            var forthWeekSum =  forthWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            forthWeekSum = 0
                        }

                        var totalWeek = firstWeekSum + secondWeekSum + thirdWeekSum + forthWeekSum

                        if (this.fluxoDataDespesas.length > 0) {
                            this.fluxoDataDespesas.[0] = {
                                key: 2,
                                initialMonth: initialMonthValue,
                                firstWeek: firstWeekSum,
                                secondWeek: secondWeekSum,
                                thirdWeek: thirdWeekSum,
                                forthWeek: forthWeekSum,
                                totalWeek: totalWeek
                            }

                        }else {
                            this.fluxoDataDespesas.push({
                                key:1,
                                initialMonth: initialMonthValue,
                                firstWeek: firstWeekSum,
                                secondWeek: secondWeekSum,
                                thirdWeek: thirdWeekSum,
                                forthWeek: forthWeekSum,
                                totalWeek: totalWeek,
                            })

                        }
                    }else {
                        this.fluxoDataDespesas = []
                        this.fluxoDataDespesas.push({
                            key:1,
                            initialMonth: 0,
                            firstWeek: 0,
                            secondWeek: 0,
                            thirdWeek: 0,
                            forthWeek: 0,
                            totalWeek: 0,
                        })
                    }
                    
                
            }))

                db.collection('viagen')
                .where("mes", "==" ,RefMounth.options[RefMounth.selectedIndex].text)
                .where("ano", "==", RefYear.options[RefYear.selectedIndex].text)
                .where("totalFrete", ">", 0)
                .orderBy("totalFrete", "asc")
                .onSnapshot((snapshotChange => {
                this.viagenData=[]
                snapshotChange.forEach((doc) => {
                    this.viagenData.push({
                        key:doc.id,
                        data:doc.data().data.split('-').reverse().join('/'),
                        totalFrete:doc.data().totalFrete,
                        comissao:doc.data().comissao,
                        drs:doc.data().drs
                        })
                    })

                    if(this.viagenData != 0) {

                        var firstWeek = []
                        var secondWeek = []
                        var thirdWeek = []
                        var forthWeek = []
                        var initialMonthValue = 0

                        this.mappedviagenWeeks = this.viagenData.map(function (i) {
                            var dataRegexed = i.data.match(/[^/]+/)
                            var dataRegexedInteger = parseInt(dataRegexed)
                            var valorCalculado = i.totalFrete - i.comissao - i.drs

                            if (dataRegexedInteger == 1 ) {
                                initialMonthValue = valorCalculado
                            }

                            if (dataRegexedInteger >= 1 && dataRegexedInteger <= 7 ) {
                                firstWeek.push(valorCalculado)

                            }else if (dataRegexedInteger >= 8 && dataRegexedInteger <= 15 ) {
                                secondWeek.push(valorCalculado)

                            }else if (dataRegexedInteger >= 16 && dataRegexedInteger <= 23) {
                                thirdWeek.push(valorCalculado)

                            }else if (dataRegexedInteger >= 24 && dataRegexedInteger <= 31) {
                                forthWeek.push(valorCalculado)
                            }
                        })

                        if(firstWeek.length !== 0 ) {
                            var firstWeekSum =  firstWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            firstWeekSum = 0
                        }
                        
                        if(secondWeek.length !== 0 ) {
                            var secondWeekSum =  secondWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            secondWeekSum = 0
                        }

                        if(thirdWeek.length !== 0 ) {
                            var thirdWeekSum =  thirdWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            thirdWeekSum = 0
                        }

                        if(forthWeek.length !== 0 ) {
                            var forthWeekSum =  forthWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            forthWeekSum = 0
                        }

                        var totalWeek = firstWeekSum + secondWeekSum + thirdWeekSum + forthWeekSum

                        if (this.fluxoDataViagen.length > 0) {
                            this.fluxoDataViagen.[0] = {
                                key: 2,
                                initialMonth: initialMonthValue,
                                firstWeek: firstWeekSum,
                                secondWeek: secondWeekSum,
                                thirdWeek: thirdWeekSum,
                                forthWeek: forthWeekSum,
                                totalWeek: totalWeek
                            }

                        }else {
                            this.fluxoDataViagen.push({
                                key:1,
                                initialMonth: initialMonthValue,
                                firstWeek: firstWeekSum,
                                secondWeek: secondWeekSum,
                                thirdWeek: thirdWeekSum,
                                forthWeek: forthWeekSum,
                                totalWeek: totalWeek,
                            })

                        }
                    }else {
                        this.fluxoDataViagen = []
                        this.fluxoDataViagen.push({
                            key:1,
                            initialMonth: 0,
                            firstWeek: 0,
                            secondWeek: 0,
                            thirdWeek: 0,
                            forthWeek: 0,
                            totalWeek: 0,
                        })
                    }
                    
                
            }))


                db.collection('receita')
                .where("mes", "==" ,RefMounth.options[RefMounth.selectedIndex].text)
                .where("ano", "==", RefYear.options[RefYear.selectedIndex].text)
                .where("valor", ">", 0)
                .orderBy("valor", "asc")
                .onSnapshot((snapshotChange => {
                this.receitaData=[]
                snapshotChange.forEach((doc) => {
                    this.receitaData.push({
                        key:doc.id,
                        data:doc.data().data.split('-').reverse().join('/'),
                        valor:doc.data().valor
                        })
                    })

                    if(this.receitaData != 0 ) {
                        var firstWeek = []
                        var secondWeek = []
                        var thirdWeek = []
                        var forthWeek = []
                        var initialMonthValue = 0

                        this.mappedreceitaWeeks = this.receitaData.map(function (i) {
                            var dataRegexed = i.data.match(/[^/]+/)
                            var dataRegexedInteger = parseInt(dataRegexed)

                            if (dataRegexedInteger == 1 ) {
                                initialMonthValue = i.valor
                            }

                            if (dataRegexedInteger >= 1 && dataRegexedInteger <= 7 ) {
                                firstWeek.push(i.valor)

                            }else if (dataRegexedInteger >= 8 && dataRegexedInteger <= 15 ) {
                                secondWeek.push(i.valor)

                            }else if (dataRegexedInteger >= 16 && dataRegexedInteger <= 23) {
                                thirdWeek.push(i.valor)

                            }else if (dataRegexedInteger >= 24 && dataRegexedInteger <= 31) {
                                forthWeek.push(i.valor)
                            }
                        })

                        if(firstWeek.length !== 0 ) {
                            var firstWeekSum =  firstWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            firstWeekSum = 0
                        }
                        
                        if(secondWeek.length !== 0 ) {
                            var secondWeekSum =  secondWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            secondWeekSum = 0
                        }

                        if(thirdWeek.length !== 0 ) {
                            var thirdWeekSum =  thirdWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            thirdWeekSum = 0
                        }

                        if(forthWeek.length !== 0 ) {
                            var forthWeekSum =  forthWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            forthWeekSum = 0
                        }

                        var totalWeek = firstWeekSum + secondWeekSum + thirdWeekSum + forthWeekSum
                        
                        if (this.fluxoDataReceita.length > 0) {
                            this.fluxoDataReceita.[0] = {
                                key: 2,
                                initialMonth: initialMonthValue,
                                firstWeek: firstWeekSum,
                                secondWeek: secondWeekSum,
                                thirdWeek: thirdWeekSum,
                                forthWeek: forthWeekSum,
                                totalWeek: totalWeek
                            }

                            this.faturamentofinal.[0] = {
                                firstWeekFinal: this.fluxoDataReceita[0].firstWeek - this.fluxoDataDespesas[0].firstWeek + this.fluxoDataViagen[0].firstWeek,
                                secondWeekFinal: this.fluxoDataReceita[0].secondWeek - this.fluxoDataDespesas[0].secondWeek + this.fluxoDataViagen[0].secondWeek,
                                thirdWeekFinal: this.fluxoDataReceita[0].thirdWeek - this.fluxoDataDespesas[0].thirdWeek + this.fluxoDataViagen[0].thirdWeek,
                                forthWeekFinal: this.fluxoDataReceita[0].forthWeek - this.fluxoDataDespesas[0].forthWeek + this.fluxoDataViagen[0].forthWeek,
                                totalWeekFinal: this.fluxoDataReceita[0].totalWeek - this.fluxoDataDespesas[0].totalWeek + this.fluxoDataViagen[0].totalWeek
                            }
                        }else {
                            this.fluxoDataReceita.push({
                                key:1,
                                initialMonth: initialMonthValue,
                                firstWeek: firstWeekSum,
                                secondWeek: secondWeekSum,
                                thirdWeek: thirdWeekSum,
                                forthWeek: forthWeekSum,
                                totalWeek: totalWeek,
                            })

                            this.faturamentofinal.push({
                                firstWeekFinal: this.fluxoDataReceita[0].firstWeek - this.fluxoDataDespesas[0].firstWeek + this.fluxoDataViagen[0].firstWeek,
                                secondWeekFinal: this.fluxoDataReceita[0].secondWeek - this.fluxoDataDespesas[0].secondWeek + this.fluxoDataViagen[0].secondWeek,
                                thirdWeekFinal: this.fluxoDataReceita[0].thirdWeek - this.fluxoDataDespesas[0].thirdWeek + this.fluxoDataViagen[0].thirdWeek,
                                forthWeekFinal: this.fluxoDataReceita[0].forthWeek - this.fluxoDataDespesas[0].forthWeek + this.fluxoDataViagen[0].forthWeek,
                                totalWeekFinal: this.fluxoDataReceita[0].totalWeek - this.fluxoDataDespesas[0].totalWeek + this.fluxoDataViagen[0].totalWeek
                            })
                        }

                    }else {
                        this.receitaData = []
                        this.receitaData.push({
                            key:1,
                            initialMonth: 0,
                            firstWeek: 0,
                            secondWeek: 0,
                            thirdWeek: 0,
                            forthWeek: 0,
                            totalWeek: 0,
                        })

                        if (this.fluxoDataReceita.length > 0) {
                            this.fluxoDataReceita.[0] = {
                                key: 2,
                                initialMonth: initialMonthValue,
                                firstWeek: firstWeekSum,
                                secondWeek: secondWeekSum,
                                thirdWeek: thirdWeekSum,
                                forthWeek: forthWeekSum,
                                totalWeek: totalWeek
                            }

                            this.faturamentofinal.[0] = {
                                firstWeekFinal: this.fluxoDataReceita[0].firstWeek - this.fluxoDataDespesas[0].firstWeek + this.fluxoDataViagen[0].firstWeek,
                                secondWeekFinal: this.fluxoDataReceita[0].secondWeek - this.fluxoDataDespesas[0].secondWeek + this.fluxoDataViagen[0].secondWeek,
                                thirdWeekFinal: this.fluxoDataReceita[0].thirdWeek - this.fluxoDataDespesas[0].thirdWeek + this.fluxoDataViagen[0].thirdWeek,
                                forthWeekFinal: this.fluxoDataReceita[0].forthWeek - this.fluxoDataDespesas[0].forthWeek + this.fluxoDataViagen[0].forthWeek,
                                totalWeekFinal: this.fluxoDataReceita[0].totalWeek - this.fluxoDataDespesas[0].totalWeek + this.fluxoDataViagen[0].totalWeek
                            }
                        }else {
                            this.fluxoDataReceita.push({
                                key:1,
                                initialMonth: initialMonthValue,
                                firstWeek: firstWeekSum,
                                secondWeek: secondWeekSum,
                                thirdWeek: thirdWeekSum,
                                forthWeek: forthWeekSum,
                                totalWeek: totalWeek,
                            })

                            this.faturamentofinal.push({
                                firstWeekFinal: this.fluxoDataReceita[0].firstWeek - this.fluxoDataDespesas[0].firstWeek + this.fluxoDataViagen[0].firstWeek,
                                secondWeekFinal: this.fluxoDataReceita[0].secondWeek - this.fluxoDataDespesas[0].secondWeek + this.fluxoDataViagen[0].secondWeek,
                                thirdWeekFinal: this.fluxoDataReceita[0].thirdWeek - this.fluxoDataDespesas[0].thirdWeek + this.fluxoDataViagen[0].thirdWeek,
                                forthWeekFinal: this.fluxoDataReceita[0].forthWeek - this.fluxoDataDespesas[0].forthWeek + this.fluxoDataViagen[0].forthWeek,
                                totalWeekFinal: this.fluxoDataReceita[0].totalWeek - this.fluxoDataDespesas[0].totalWeek + this.fluxoDataViagen[0].totalWeek
                            })
                        }

                    }

                }))
            })   
        },


        updated() {
            this.$nextTick(function () {
                /*
                if(Math.sign(this.faturamentofinal[0].totalWeekFinal) == 1) {
                        document.getElementById("faturamentoTotal").className = "text-xl w-full lg:w-auto p-3 text-green-600 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static"
                    }else {
                        document.getElementById("faturamentoTotal").className = "text-xl w-full lg:w-auto p-3 text-red-600 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static"
                    }
                */
            })
        },

        methods: {
            

            printPageArea(){
            var image = new Image()
            image.src= "img/report.png"

            var currentDayAndHour = new Date().toLocaleString()
            var currentDaySplit = currentDayAndHour.split(" ")

            

            const doc = new jsPDF();
            
            
            var res = doc.autoTableHtmlToJson(document.getElementById("receitaTable"), true);
            doc.autoTable(res.columns, res.data, {
                margin: {top: 24},
                
                didDrawPage: function (data) {
                    doc.text('Receita', data.settings.margin.left + 8, 22).setFontSize(7)
                }
                });

            var res1 = doc.autoTableHtmlToJson(document.getElementById("viagemTable"), true);
            doc.autoTable(res1.columns, res1.data, {
                margin: {top: 24},
                
                didDrawPage: function (data) {
                    doc.text('Viagem', data.settings.margin.left + 8, 43).setFontSize(7)
                }
                });

            var res2 = doc.autoTableHtmlToJson(document.getElementById("despesaTable"), true);
            doc.autoTable(res2.columns, res2.data, {
                margin: {top: 24},
                
                didDrawPage: function (data) {
                    doc.text('Despesa', data.settings.margin.left + 8, 66).setFontSize(7)
                }
                });

            var res3 = doc.autoTableHtmlToJson(document.getElementById("finalTable"), true);

            doc.autoTable(res3.columns, res3.data, {
                startY: doc.lastAutoTable.finalY + 15,

                didDrawPage: function () {
                    doc.setTextColor(40)
                    if (image) {
                        doc.addImage(image, 'PNG', 3, 5, 10, 10)
                    }
                    doc.text('Relatório', 13, 12).setFontSize(9)
                    doc.text('Saldo Final de Caixa', 14, 93)
                    doc.text("Data de impressão:" + currentDayAndHour, 140, 15).setFontSize(10)
                }
            });



            doc.save("Fluxo relatório " + `${currentDaySplit.[0]}` + ".pdf");

        },



            hideAlert () {
                this.alertMessage = false;
            },

            getMonthFluxo() {
                var RefMounth = this.$refs.currentMonth
                var RefYear = this.$refs.yearselect

                db.collection('despesa')
                .where("valor", ">", 0)
                .where("mes", "==", RefMounth.options[RefMounth.selectedIndex].text)
                .where("ano", "==", RefYear.options[RefYear.selectedIndex].text)
                .orderBy("valor", "asc")
                .onSnapshot((snapshotChange => {
                this.despesasDataCheck=[]
                snapshotChange.forEach((doc) => {
                    this.despesasDataCheck.push({
                        key:doc.id,
                        data:doc.data().data.split('-').reverse().join('/'),
                        valor:doc.data().valor
                        })
                    })
                    
                    if (this.despesasDataCheck.length != 0 ){
                        this.despesasEmpty = false

                        this.lastSuccessfulMonthEntry = RefMounth.options.selectedIndex

                        var firstWeek = []
                        var secondWeek = []
                        var thirdWeek = []
                        var forthWeek = []
                        var initialMonthValue = 0

                        this.mappedDespesasWeeks = this.despesasDataCheck.map(function (i) {
                            var dataRegexed = i.data.match(/[^/]+/)
                            var dataRegexedInteger = parseInt(dataRegexed)

                            if (dataRegexedInteger == 1 ) {
                                initialMonthValue = i.valor
                            }

                            if (dataRegexedInteger >= 1 && dataRegexedInteger <= 7 ) {
                                firstWeek.push(i.valor)

                            }else if (dataRegexedInteger >= 8 && dataRegexedInteger <= 15 ) {
                                secondWeek.push(i.valor)

                            }else if (dataRegexedInteger >= 16 && dataRegexedInteger <= 23) {
                                thirdWeek.push(i.valor)

                            }else if (dataRegexedInteger >= 24 && dataRegexedInteger <= 31) {
                                forthWeek.push(i.valor)
                            }
                        })

                        if(firstWeek.length !== 0 ) {
                            var firstWeekSum =  firstWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            firstWeekSum = 0
                        }
                        
                        if(secondWeek.length !== 0 ) {
                            var secondWeekSum =  secondWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            secondWeekSum = 0
                        }

                        if(thirdWeek.length !== 0 ) {
                            var thirdWeekSum =  thirdWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            thirdWeekSum = 0
                        }

                        if(forthWeek.length !== 0 ) {
                            var forthWeekSum =  forthWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            forthWeekSum = 0
                        }
                        var totalWeek = firstWeekSum + secondWeekSum + thirdWeekSum + forthWeekSum
                        
                        this.fluxoDataDespesas = []
                        this.fluxoDataDespesas.push({
                            key:1,
                            initialMonth: initialMonthValue,
                            firstWeek: firstWeekSum,
                            secondWeek: secondWeekSum,
                            thirdWeek: thirdWeekSum,
                            forthWeek: forthWeekSum,
                            totalWeek: totalWeek,
                        })

                    }else {
                        this.despesasEmpty = true
                        this.alertMessage = true
                        this.alertGetMonthType = false

                        this.fluxoDataDespesas = []
                        this.fluxoDataDespesas.push({
                            key:1,
                            initialMonth: 0,
                            firstWeek: 0,
                            secondWeek: 0,
                            thirdWeek: 0,
                            forthWeek: 0,
                            totalWeek: 0,
                        })
                        
                    }
            }))

            db.collection('viagen')
                .where("mes", "==" ,RefMounth.options[RefMounth.selectedIndex].text)
                .where("ano", "==", RefYear.options[RefYear.selectedIndex].text)
                .where("totalFrete", ">", 0)
                .orderBy("totalFrete", "asc")
                .onSnapshot((snapshotChange => {
                this.viagenDataCheck=[]
                snapshotChange.forEach((doc) => {
                    this.viagenDataCheck.push({
                        key:doc.id,
                        data:doc.data().data.split('-').reverse().join('/'),
                        totalFrete:doc.data().totalFrete,
                        comissao:doc.data().comissao,
                        drs:doc.data().drs
                        })
                    })

                    if (this.viagenDataCheck.length != 0) {

                        var firstWeek = []
                        var secondWeek = []
                        var thirdWeek = []
                        var forthWeek = []
                        var initialMonthValue = 0

                        this.mappedviagenWeeks = this.viagenData.map(function (i) {
                            var dataRegexed = i.data.match(/[^/]+/)
                            var dataRegexedInteger = parseInt(dataRegexed)
                            var valorCalculado = i.totalFrete - i.comissao - i.drs

                            if (dataRegexedInteger == 1 ) {
                                initialMonthValue = valorCalculado
                            }

                            if (dataRegexedInteger >= 1 && dataRegexedInteger <= 7 ) {
                                firstWeek.push(valorCalculado)

                            }else if (dataRegexedInteger >= 8 && dataRegexedInteger <= 15 ) {
                                secondWeek.push(valorCalculado)

                            }else if (dataRegexedInteger >= 16 && dataRegexedInteger <= 23) {
                                thirdWeek.push(valorCalculado)

                            }else if (dataRegexedInteger >= 24 && dataRegexedInteger <= 31) {
                                forthWeek.push(valorCalculado)
                            }
                        })

                        if(firstWeek.length !== 0 ) {
                            var firstWeekSum =  firstWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            firstWeekSum = 0
                        }
                        
                        if(secondWeek.length !== 0 ) {
                            var secondWeekSum =  secondWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            secondWeekSum = 0
                        }

                        if(thirdWeek.length !== 0 ) {
                            var thirdWeekSum =  thirdWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            thirdWeekSum = 0
                        }

                        if(forthWeek.length !== 0 ) {
                            var forthWeekSum =  forthWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            forthWeekSum = 0
                        }

                        var totalWeek = firstWeekSum + secondWeekSum + thirdWeekSum + forthWeekSum
                        
                        this.fluxoDataViagen = []
                            this.fluxoDataViagen.push({
                                key:1,
                                initialMonth: initialMonthValue,
                                firstWeek: firstWeekSum,
                                secondWeek: secondWeekSum,
                                thirdWeek: thirdWeekSum,
                                forthWeek: forthWeekSum,
                                totalWeek: totalWeek,
                            })
                    }else {

                        this.fluxoDataViagen = []
                        this.fluxoDataViagen.push({
                            key:1,
                            initialMonth: 0,
                            firstWeek: 0,
                            secondWeek: 0,
                            thirdWeek: 0,
                            forthWeek: 0,
                            totalWeek: 0,
                        })

                    }
                    
                
            }))


            db.collection('receita')
            .where("valor", ">", 0)
            .where("mes", "==", RefMounth.options[RefMounth.selectedIndex].text)
            .where("ano", "==", RefYear.options[RefYear.selectedIndex].text)
            .orderBy("valor", "asc")
            .onSnapshot((snapshotChange => {
                this.receitaDataCheck=[]
                snapshotChange.forEach((doc) => {
                    this.receitaDataCheck.push({
                        key:doc.id,
                        data:doc.data().data.split('-').reverse().join('/'),
                        valor:doc.data().valor
                        })
                    })
                    
                    this.receitaData = []
                    if(this.receitaDataCheck.length != 0) {
                        this.receitaEmpty = false
                        
                        var firstWeek = []
                        var secondWeek = []
                        var thirdWeek = []
                        var forthWeek = []
                        var initialMonthValue = 0

                        this.mappedreceitaWeeks = this.receitaDataCheck.map(function (i) {
                            var dataRegexed = i.data.match(/[^/]+/)
                            var dataRegexedInteger = parseInt(dataRegexed)

                            if (dataRegexedInteger == 1 ) {
                                initialMonthValue = i.valor
                            }

                            if (dataRegexedInteger >= 1 && dataRegexedInteger <= 7 ) {
                                firstWeek.push(i.valor)

                            }else if (dataRegexedInteger >= 8 && dataRegexedInteger <= 15 ) {
                                secondWeek.push(i.valor)

                            }else if (dataRegexedInteger >= 16 && dataRegexedInteger <= 23) {
                                thirdWeek.push(i.valor)

                            }else if (dataRegexedInteger >= 24 && dataRegexedInteger <= 31) {
                                forthWeek.push(i.valor)
                            }
                        })

                        if(firstWeek.length !== 0 ) {
                            var firstWeekSum =  firstWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            firstWeekSum = 0
                        }
                        
                        if(secondWeek.length !== 0 ) {
                            var secondWeekSum =  secondWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            secondWeekSum = 0
                        }

                        if(thirdWeek.length !== 0 ) {
                            var thirdWeekSum =  thirdWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            thirdWeekSum = 0
                        }

                        if(forthWeek.length !== 0 ) {
                            var forthWeekSum =  forthWeek.reduce(function (total, currentvalue) {
                                return total + currentvalue
                            })
                        }else {
                            forthWeekSum = 0
                        }

                        var totalWeek = firstWeekSum + secondWeekSum + thirdWeekSum + forthWeekSum
                        
                        this.fluxoDataReceita = []
                        this.fluxoDataReceita.push({
                            key:1,
                            initialMonth: initialMonthValue,
                            firstWeek: firstWeekSum,
                            secondWeek: secondWeekSum,
                            thirdWeek: thirdWeekSum,
                            forthWeek: forthWeekSum,
                            totalWeek: totalWeek,
                        })
                    }else {
                        this.receitaEmpty = true
                        this.alertMessage = true
                        this.alertGetMonthType = true

                        this.fluxoDataReceita = []
                        this.fluxoDataReceita.push({
                            key:1,
                            initialMonth: 0,
                            firstWeek: 0,
                            secondWeek: 0,
                            thirdWeek: 0,
                            forthWeek: 0,
                            totalWeek: 0,
                        })
                    }

                        this.faturamentofinal = []
                        this.fluxoDataReceita.forEach((num1, index) => {
                            this.faturamentofinal.push({
                            firstWeekFinal: num1.firstWeek - this.fluxoDataDespesas[index].firstWeek + (this.fluxoDataViagen[index].firstWeek),
                            secondWeekFinal: num1.secondWeek - this.fluxoDataDespesas[index].secondWeek + (this.fluxoDataViagen[index].secondWeek),
                            thirdWeekFinal: num1.thirdWeek - this.fluxoDataDespesas[index].thirdWeek + (this.fluxoDataViagen[index].thirdWeek),
                            forthWeekFinal: num1.forthWeek - this.fluxoDataDespesas[index].forthWeek + (this.fluxoDataViagen[index].forthWeek),
                            totalWeekFinal: num1.totalWeek - this.fluxoDataDespesas[index].totalWeek + (this.fluxoDataViagen[index].totalWeek)
                            })
                        })
            }))
            }
        }
    }
</script>