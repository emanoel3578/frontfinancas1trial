<template>
    
    <div class="flex flex-col overflow-y-hidden relative h-screen">
        <div class="absolute w-full">
            <h1 class="text-blue-500 text-5xl font-bold text-left tracking-wide my-8 ml-5 mt-12 ">Adicione suas viagens</h1>

            <div class='flex gap-10'>

                <div class="p-2">
                    <div class="inline-flex items-center bg-white leading-none text-black rounded-full p-2 shadow-lg text-teal text-lg">
                        <span class="inline-flex bg-blue-500 text-white text-xl rounded-full h-6 px-3 justify-center items-center">Mês</span>
                        <div class='ml-1 text-blue-500 border border-blue-500'>
                            <select v-on:change="getDateFilter($event)" ref='currentMonth' class="apperance-none" id="monthSelectForAddViagen">
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
                            <select v-on:change="getDateFilter($event)" ref='yearselect' class="apperance-none">
                                <option value='2021'>2021</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="p-2">
                    <div class="inline-flex items-center bg-white leading-none text-black rounded-full p-2 shadow-lg text-teal text-lg">
                        <span class="inline-flex bg-blue-500 text-white text-xl rounded-full h-6 px-3 justify-center items-center">Busque aqui</span>
                        <div class='ml-1 text-blue-500 border border-blue-500'>
                            <input v-model="queryInput">
                        </div>
                        <button @click='searchQuery' class="inline-flex bg-blue-400 text-white text-sm rounded-full h-6 ml-2 px-3 justify-center items-center">Ok</button>
                    </div>
                </div>

                <div class="p-2 right-0">
                    <div class="inline-flex items-center bg-white leading-none text-black rounded-full p-2 shadow-lg text-teal text-lg">
                        <img class="cursor-pointer" @click="printPageArea('printableArea')" src="img/print.png">
                    </div>
                </div>

            </div>
            

            
            <div class="float-right text-blue-500 flex">
                
                <label>
                Filtre por:
                </label>

                <div class="border border-blue-500 flex">
                    <select class="apperance-none" ref="selectFilter" v-on:change="getSelectedFilter($event)" v-model="selectedFilterValue">
                        <option selected >Sem filtro</option>
                        <optgroup label="Data">
                            <option>Adição mais recente</option>
                            <option>Adição  mais antigo</option>
                        </optgroup>
                        <optgroup label="Valor do Frete">
                            <option>Frete mais alto</option>
                            <option>Frete mais baixo</option>
                        </optgroup>
                    </select>
                </div>
            </div>
            
            <table id="" class="w-full">
                <thead >
                    <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th class="p-2 font-bold uppercase text-blue-500">Tipo</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Data</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Motorista</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Origem</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Destino</th>
                        <th class="p-2 font-bold uppercase text-blue-500">KM Inicial</th>
                        <th class="p-2 font-bold uppercase text-blue-500">KM Final</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Placa</th>
                        <!-- place é a mesma coisa que veiculo !!!!!!!!!!!! -->
                        <th class="p-2 font-bold uppercase text-blue-500">D.LTS</th>
                        <th class="p-2 font-bold uppercase text-blue-500">D.R$</th>
                        <th class="p-2 font-bold uppercase text-blue-500">V/LTS</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Despesas</th>
                        <th class="p-2 font-bold uppercase text-blue-500">DT Cheg.</th>
                        <th class="p-2 font-bold uppercase text-blue-500">NFª</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Total Frete</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Comissão</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Saldo</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Modificar</th>
                    </tr>
                </thead>
                <tbody v-for="data in viagenData" :key="data.key" class="text-gray-700 text-base font-light">
                    <tr class="border-b border-gray-200 hover:bg-gray-100 bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                        <td class="flex flex-row justify-center p-3 text-gray-800 border-b border-blue-200 block">    
                            <img src="img/frete.png" class="h-8 w-8 rounded-2x1 object-cover">
                        </td>
                        
                        <td class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                            {{data.data}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            {{data.motorista}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-green-800 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            {{data.origem}} - {{data.origemEstado}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-red-800 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            {{data.destino}} - {{data.destinoEstado}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            {{data.kmInicial}}
                        </td>

                        <td ref="descricaoFull" class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                            {{data.kmFinal}}
                        </td>


                        <td class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            {{data.veiculo}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            {{data.dlts}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            R$ {{data.drs}}
                        </td>

                        <td ref="descricaoFull" class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                            {{data.vlts}}
                        </td>

                        <td ref="descricaoFull" class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                            {{data.despesas}}
                        </td>

                        <td ref="descricaoFull" class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                            {{data.dtcheg}}
                        </td>

                        <td class="text-green-600 text-xl w-full lg:w-auto p-3 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            {{data.Nf}}
                        </td>

                        <td ref="descricaoFull" class="text-xl w-full lg:w-auto p-3 text-green-800 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                            R${{data.totalFrete.toFixed(2)}}
                        </td>

                        <td ref="descricaoFull" class="text-xl w-full lg:w-auto p-3 text-red-800 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                            R${{data.comissao.toFixed(2)}}
                        </td>

                        <td ref="descricaoFull" class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                            R${{(data.totalFrete - data.comissao - data.drs).toFixed(2)}}
                        </td>

                        <td class="w-full lg:w-auto p-3 text-gray-800 text-center  border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                            <span @click="showEditDiv(); EditKeyGet(data.key);" class="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded-3xl cursor-pointer mr-2">E</span>
                            <span @click.prevent="deleteData(data.key)" class="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded-3xl focus:outline-none focus:shadow-outline cursor-pointer">R</span>
                            
                        </td>
                    </tr>
                </tbody>
            </table>
                
                <div v-for="item in pageCounter" :key="item.page1" class="flex justify-center mt-4 text-xl">
                    <button  @click="previousFivePages()" class="mx-3 cursor-pointer"> &#60;&#60; </button>
                    <button  @click="nextPage($event)" value="firstpage" class="mx-3 cursor-pointer bg-blue-500 rounded-full w-6 h-6" ref="firstpage">{{item.[0]}}</button>
                    <button  @click="nextPage($event)" value="secondpage" class="mx-3 cursor-pointer" ref="secondpage">{{item.[1]}}</button>
                    <button  @click="nextPage($event)" value="thirdpage" class="mx-3 cursor-pointer" ref="thirdpage">{{item.[2]}}</button>
                    <button  @click="nextPage($event)" value="forthpage" class="mx-3 cursor-pointer" ref="forthpage">{{item.[3]}}</button>
                    <button  @click="nextPage($event)" value="fifthpage" class="mx-3 cursor-pointer" ref="fifthpage">{{item.[4]}}</button>
                    <button  @click="nextFivePages()" class="mx-3 cursor-pointer"> &#62;&#62; </button>
                </div>

                <div class="text-center clear-both">
                    <button @click="showAddDiv()" class="float-right mt-2 mr-10 bg-blue-500 opacity-100 text-white font-bold py-2 px-4 border-b-4 rounded-md focus:outline-none">Adicionar entrada</button>
                </div>

                <div class="flex flex-col text-center justify-center clear-both">
                    <span class="font-bold text-gray-700">***</span>
                    <h1 class="font-bold text-gray-700">Para ver a descrição completa, basta clicar em "editar"</h1>
                </div>

        </div>

        <div v-show="editDiv" class="relative flex flex-col justify-center sm:py-8 :max-w-xl sm:mx-auto h-full w-full    bg-black bg-opacity-80">
            
            <div v-for='value in viagenUpdate' :key='value.key' class="border-4 border-blue-500 mx-auto px-4 py-4 bg-white mx-8 rounded-3xl">
                <form @submit.prevent="onUpdateForm">
                <div class="flex items-center space-x-5">
                <div class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i</div>
                <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
                    <h2 class="leading-relaxed">Editar viagem</h2>
                    <p class="text-sm text-gray-500 font-normal leading-relaxed">Complete com as informações referente as mudanças da entrada</p>
                </div>
                </div>
                
                <div class="flex">
                    <div class="flex">
                        <div class="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                            <div class="flex flex-col">
                                <label class="leading-loose">Motorista*</label>
                                <input type="text" required v-model="futureUpdate.motorista" class="px-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: Carlos...">
                            </div>
                            <div class="flex flex-col">
                                <div class="flex">
                                    <label class="leading-loose">Origem* - </label>
                                    <select required v-model="futureUpdate.origemEstado" class="text-base rounded border p-1 h-8">
                                        <option>AC</option>
                                        <option>AL</option>
                                        <option>AP</option>
                                        <option>AM</option>
                                        <option>BA</option>
                                        <option>CE</option>
                                        <option>DF</option>
                                        <option>ES</option>
                                        <option>GO</option>
                                        <option>MA</option>
                                        <option>MT</option>
                                        <option>MS</option>
                                        <option>MG</option>
                                        <option>PA</option>
                                        <option>PB</option>
                                        <option>PR</option>
                                        <option>PE</option>
                                        <option>PI</option>
                                        <option>RJ</option>
                                        <option>RN</option>
                                        <option>RS</option>
                                        <option>RO</option>
                                        <option>RR</option>
                                        <option>SC</option>
                                        <option>SP</option>
                                        <option>SE</option>
                                        <option>TO</option>
                                    </select>
                                </div>
                                <input type="text" required v-model="futureUpdate.origem" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: São Paulo...">
                            </div>
                            <div class="flex flex-col">
                                <div class="flex">
                                    <label class="leading-loose">Destino* - </label>
                                    <select required v-model="futureUpdate.destinoEstado" class="text-base rounded border p-1 h-8">
                                        <option>AC</option>
                                        <option>AL</option>
                                        <option>AP</option>
                                        <option>AM</option>
                                        <option>BA</option>
                                        <option>CE</option>
                                        <option>DF</option>
                                        <option>ES</option>
                                        <option>GO</option>
                                        <option>MA</option>
                                        <option>MT</option>
                                        <option>MS</option>
                                        <option>MG</option>
                                        <option>PA</option>
                                        <option>PB</option>
                                        <option>PR</option>
                                        <option>PE</option>
                                        <option>PI</option>
                                        <option>RJ</option>
                                        <option>RN</option>
                                        <option>RS</option>
                                        <option>RO</option>
                                        <option>RR</option>
                                        <option>SC</option>
                                        <option>SP</option>
                                        <option>SE</option>
                                        <option>TO</option>
                                    </select>
                                </div>
                                <input type="text" required v-model="futureUpdate.destino" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: Curitiba...">
                            </div>

                            <div class="flex flex-col">
                            <label class="leading-loose">Despesas</label>
                            <div class="w-full">
                                <input v-model="futureUpdate.despesas" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900  sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: Viagem feita com sucesso e tranquila...">
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col py-4 pl-3 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

                        <div>
                            <label class="leading-loose">Veiculo(Placa)*</label>
                            <input type="text" required v-model="futureUpdate.veiculo" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: QHT-0019...">
                        </div>
                        
                        <div class="flex flex-col">
                            <label class="leading-loose">D.LTS*</label>
                            <input type="number" required v-model="futureUpdate.dlts" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex:0000...">
                        </div>

                        <div class="flex flex-col">
                            <label class="leading-loose">D.R$*</label>
                            <input type="number" required min="0" step="any" 
                            v-model="futureUpdate.drs" id="updateValor" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="R$ 0,00">
                        </div>

                        <div>
                            <label class="leading-loose">DT Cheg</label>
                            <input type="number" v-model="futureUpdate.dtcheg" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex:0000...">
                        </div>

                        <div>
                            <label class="leading-loose">Frete Total*</label>
                            <input type="number" required v-model="futureUpdate.totalFrete" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: 2000...">
                        </div>

                    </div>

                    <div class="flex flex-col py-4 pl-3 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7" >
                        <div class="flex flex-col">
                            <label class="leading-loose">KM inicial*</label>
                            <div class="w-full">
                                <input type="number" required min="0" step="any" v-model.number="futureUpdate.kmInicial" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: 0000...">
                            </div>
                        </div>

                        <div class="flex flex-col">
                            <label class="leading-loose">KM Final</label>
                            <div class="w-full">
                                <input type="number" min="0" step="any" v-model.number="futureUpdate.kmFinal" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: 0000...">
                            </div>
                        </div>
                        
                        <div class="flex flex-col">
                            <label class="leading-loose">NFª</label>
                            <div class="w-full">
                                <input v-model="futureUpdate.Nf" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900  sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: Nota fiscal...">
                            </div>
                        </div>

                        <div>
                            <label class="leading-loose">Comissão*</label>
                            <input type="number" required v-model="futureUpdate.comissao" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: 2000...">
                        </div>
                    </div>
                </div>

            </div>
                    <div class="pt-4 flex items-center space-x-4">
                        <span @click="HideEditDiv" class="cursor-pointer flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                            <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Cancelar
                        </span>
                        <button @click.prevent="HideEditDiv(); updatePage();" id="sendbutton" class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Atualizar</button>
                    </div>
                </form>
            </div>
        </div>

        
        <div v-show="addDiv" class="relative flex justify-center flex-col h-full w-full bg-black bg-opacity-80">
            
            <div class="mx-auto px-4 py-4 bg-white rounded-3xl border-4 border-blue-500">
                <form @submit.prevent="onFormSubmit">
                <div class="flex items-center space-x-5">
                <div class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i</div>
                <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
                    <h2 class="leading-relaxed">Adicionar viagem</h2>
                    <p class="text-sm text-gray-500 font-normal leading-relaxed">Complete com as informações referente a nova viagem</p>
                </div>
                </div>

                <div class="flex">
                    <div class="flex">
                        <div class="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                            <div class="flex flex-col">
                                <label class="leading-loose">Motorista*</label>
                                <input type="text" required v-model="viagenNew.motorista" class="px-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: Carlos...">
                            </div>
                            <div class="flex flex-col">
                                <div class="flex">
                                    <label class="leading-loose">Origem* - </label>
                                    <select required v-model="selectedOrigem" class="text-base rounded border p-1 h-8">
                                        <option>AC</option>
                                        <option>AL</option>
                                        <option>AP</option>
                                        <option>AM</option>
                                        <option>BA</option>
                                        <option>CE</option>
                                        <option>DF</option>
                                        <option>ES</option>
                                        <option>GO</option>
                                        <option>MA</option>
                                        <option>MT</option>
                                        <option>MS</option>
                                        <option>MG</option>
                                        <option>PA</option>
                                        <option>PB</option>
                                        <option>PR</option>
                                        <option>PE</option>
                                        <option>PI</option>
                                        <option>RJ</option>
                                        <option>RN</option>
                                        <option>RS</option>
                                        <option>RO</option>
                                        <option>RR</option>
                                        <option>SC</option>
                                        <option>SP</option>
                                        <option>SE</option>
                                        <option>TO</option>
                                    </select>
                                </div>
                                <input type="text" required v-model="viagenNew.origem" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: São Paulo...">
                            </div>
                            <div class="flex flex-col">
                                <div class="flex">
                                    <label class="leading-loose">Destino* - </label>
                                    <select required v-model="selectedDestino" class="text-base rounded border p-1 h-8">
                                        <option>AC</option>
                                        <option>AL</option>
                                        <option>AP</option>
                                        <option>AM</option>
                                        <option>BA</option>
                                        <option>CE</option>
                                        <option>DF</option>
                                        <option>ES</option>
                                        <option>GO</option>
                                        <option>MA</option>
                                        <option>MT</option>
                                        <option>MS</option>
                                        <option>MG</option>
                                        <option>PA</option>
                                        <option>PB</option>
                                        <option>PR</option>
                                        <option>PE</option>
                                        <option>PI</option>
                                        <option>RJ</option>
                                        <option>RN</option>
                                        <option>RS</option>
                                        <option>RO</option>
                                        <option>RR</option>
                                        <option>SC</option>
                                        <option>SP</option>
                                        <option>SE</option>
                                        <option>TO</option>
                                    </select>
                                </div>
                                <input type="text" required v-model="viagenNew.destino" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: Curitiba...">
                            </div>

                        <div class="flex flex-col">
                            <label class="leading-loose">Data*</label>
                            <input type="date" required v-model="viagenNew.data" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Optional">
                        </div>

                        <div>
                            <label class="leading-loose">Frete Total*</label>
                            <input type="number" required v-model.number="viagenNew.totalFrete" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: 2000...">
                        </div>

                    </div>

                    <div class="flex flex-col py-4 pl-3 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

                        <div>
                            <label class="leading-loose">Veiculo(Placa)*</label>
                            <input type="text" required v-model="viagenNew.veiculo" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: QHT-0019...">
                        </div>
                        
                        <div class="flex flex-col">
                            <label class="leading-loose">D.LTS*</label>
                            <input type="number" required v-model="viagenNew.dlts" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex:0000...">
                        </div>

                        <div class="flex flex-col">
                            <label class="leading-loose">D.R$*</label>
                            <input type="number" required min="0" step="any" 
                            v-model="viagenNew.drs" id="updateValor" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="R$ 0,00">
                        </div>

                        <div>
                            <label class="leading-loose">DT Cheg</label>
                            <input type="number" v-model="viagenNew.dtcheg" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex:0000...">
                        </div>

                        <div class="flex flex-col">
                            <label class="leading-loose">Despesas</label>
                            <div class="w-full">
                                <input v-model="viagenNew.despesas" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900  sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: Viagem feita com sucesso e tranquila...">
                            </div>
                        </div>


                    </div>

                    <div class="flex flex-col py-4 pl-3 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7" >
                        <div class="flex flex-col">
                            <label class="leading-loose">KM inicial*</label>
                            <div class="w-full">
                                <input type="number" required min="0" step="any" v-model.number="viagenNew.kmInicial" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: 0000...">
                            </div>
                        </div>

                        <div class="flex flex-col">
                            <label class="leading-loose">KM Final</label>
                            <div class="w-full">
                                <input type="number" min="0" step="any" v-model.number="viagenNew.kmFinal" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: 0000...">
                            </div>
                        </div>
                        
                        <div class="flex flex-col">
                            <label class="leading-loose">NFª</label>
                            <div class="w-full">
                                <input v-model="viagenNew.Nf" type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900  sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: Nota fiscal...">
                            </div>
                        </div>

                        <div>
                            <label class="leading-loose">Comissão*</label>
                            <input type="number" required v-model="viagenNew.comissao" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: 2000...">
                        </div>

                    </div>
                </div>

            </div>
                <div class="flex items-center space-x-4">
                    <span @click="hideAddDiv();" class="cursor-pointer flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Cancelar
                    </span>
                    <button id="sendbuttonAdd" class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Criar</button>
                </div>
                </form>
            </div>
        </div>

        <div v-show="alertcategoria" class="relative flex flex-col justify-center sm:py-8 :max-w-xl sm:mx-auto h-full w-full bg-black bg-opacity-80">
            <div class="max-w-md mx-auto px-4 py-3 bg-white rounded-2xl text-xl"> 
                <div @click="hideAlert" class='float-right cursor-pointer'>X</div>
                <h1 v-if="alertMessage" class='float-left'>Nenhum resultado encontrada para categoria selecionada</h1>
                <h1 v-else class='float-left'>Nenhum resultado encontrada para a pagina selecionada</h1>
            </div>
        </div>

        <div v-show="alertFiles" class="relative flex flex-col justify-center sm:py-8 :max-w-xl sm:mx-auto h-full w-full bg-black bg-opacity-80">
            <div class="max-w-md mx-auto px-4 py-3 bg-white rounded-2xl text-xl">
            
            <div v-if="loadingFiles">
                <transition  class="max-w-md mx-auto" name=bounce>
                    <div class="half-circle-spinner">
                    <div class="circle circle-1"></div>
                    <div class="circle circle-2"></div>
                    </div>
                </transition>
            </div>

            <div v-else>
                <div class="flex h-8">
                    <label class="w-11/12 mr-4 text-center mb-2 bg-blue-600 hover:bg-blue-00 text-white rounded-3xl cursor-pointer">
                        Adicionar anexo
                        <input type="file" class="invisible absolute" @change="uploadFile">
                    </label>
                    <p @click="hideAlertFiles" class='w-auto cursor-pointer'>X</p>
                </div>

                    <div class="flex justify-center">
                        <progress class="w-full" id="progress" :value="uploadValue" max="100" ></progress>
                    </div>
                    
                    <div>
                        <div v-if="emptyAnexos">
                            <p>Nenhum arquivo anexo referente a essa viagem</p>
                        </div>
                        <tbody v-else v-for="data in viagenFiles" :key="data.key" class="text-gray-700 text-base font-light">
                            <tr class="border-b border-gray-200 hover:bg-gray-100 bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                                <td class="flex flex-row justify-center p-3 text-gray-800 border-b border-blue-200 block">    
                                    <img src="img/file.png" class="h-9 w-9 rounded-2x1 object-cover">
                                </td>

                                <td class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                                    {{data.fileName}}
                                </td>

                                <td class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                                    <p class="bg-blue-600 px-1 py-1 hover:bg-blue-700 text-white rounded-3xl cursor-pointer mr-2" @click="downloadAnexo(data.fileName);">Baixar Arquivo</p>
                                </td>
                            </tr>
                        </tbody>
                        
                        <p v-show="messageMaxFiles">Numero maximo de anexos atingido (5)</p>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import {db} from '@/firebase'
import firebase from 'firebase'
import { jsPDF } from "jspdf";
import 'jspdf-autotable'

export default {
    name: 'Despesa',
    data () {
        return{
            valorTotalViagen: null,
            isActive: {
                presentClick:false
            },
            actualPage: {
              "rounded-full bg-blue-500 h-6 w-6":false
            },
            pageCounter: [
                {
                    0:1,
                    1:2,
                    2:3,
                    3:4,
                    4:5,
                }
            ],

            clickedPageValue:'',
            dontShowFilteredResults: true,
            selectedFilterValue:'',
            selectedValue:'',
            selectedId:'',
            futureUpdate:{},
            viagenData: [],
            viagenFilter: [
                {
                    clicked:''
                },
            ],
            viagenUpdate: [
                {
                    key:"",
                    motorista:"",
                    origem:"",
                    destino:"",
                    origemEstado:"",
                    destinoEstado:"",
                    despesas:"",
                    veiculo:"",
                    dlts:"",
                    drs:"",
                    dtcheg:"",
                    kmInicial:"",
                    kmFinal:"",
                    Nf:"",
                    comissao:"",
                    valor:"",
                },
            ],
            totalOfDocs:'',
            lastDocNumber:'',
            viagenNew: {},
            editDiv: false,
            addDiv: false,
            numeroInputAdd: null,
            numeroAntesInputAdd: null,
            numeroInputAddUpdate:null,
            numeroAntesInputAddUpdate: null,
            allIdsViagen:[],
            ValuesDesc:[],
            ValuesAscen:[],
            deleteID:'',
            mappedViagenCategoria:[],
            viagenDataMonth:[],
            alertcategoria:false,
            alertMessage:false,
            queryInput:'',
            viagenQuery:[],
            searchisActive:false,
            previousMonth:"",
            fileData: null,
            file:null,
            alertFiles:false,
            viagenFiles:[],
            emptyAnexos:true,
            timeschecked:0,
            uploadValue:0,
            viagenFilesID:[],
            loadingFiles:true,
            messageMaxFiles:false,
            lastSuccessfulMonthEntry:null,
            selectedValueFPG:"",
            parcelado:false,
            selectedValueControle:"",
            selectedOrigem:"",
            selectedDestino:"",
            viagenDataPrint:[],
            
        }
    },

    created() {
        db.collection('viagen').orderBy("timestamp", "desc").limit(1).onSnapshot((snapshotChange) => {
            this.lastNumberDocArray = []
            snapshotChange.forEach((doc)=> {
                this.lastNumberDocArray.push ({
                    page:doc.data().page,
                    idNumberDoc:doc.data().idNumberDoc,
                })
                this.lastDocNumber = this.lastNumberDocArray[0].idNumberDoc
                this.lastPageNumber = this.lastNumberDocArray[0].page
            })
        })

        db.collection('viagen').orderBy("timestamp", "desc").onSnapshot((snapshotChange => {
            this.totalOfDocs = snapshotChange.docs.length
        }))
        
        
    },

    mounted() {
        this.$nextTick(function () {            
            var RefMounth = this.$refs.currentMonth
            var RefYear = this.$refs.yearselect
            var monthForCheck = new Date().getMonth()

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
        
            db.collection('viagen')
            .where("mes", "==" ,RefMounth.options[RefMounth.selectedIndex].text)
            .where("ano", "==", RefYear.options[RefYear.selectedIndex].text)
            .orderBy("timestamp")
            .limit(5)
            .onSnapshot((snapshotChange) => {
                this.viagenData=[]
                snapshotChange.forEach((doc)=> {
                    var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                    this.viagenData.push ({
                        key:doc.id,
                        motorista:doc.data().motorista,
                        totalFrete:doc.data().totalFrete,
                        origem:doc.data().origem,
                        origemEstado:doc.data().origemEstado,
                        comissao:doc.data().comissao,
                        despesas:doc.data().despesas,
                        destino:doc.data().destino,
                        destinoEstado:doc.data().destinoEstado,
                        dlts:doc.data().dlts,
                        drs:doc.data().drs,
                        vlts:vlts,
                        dtcheg:doc.data().dtcheg,
                        veiculo:doc.data().veiculo.toUpperCase(),
                        kmFinal:doc.data().kmFinal,
                        kmInicial:doc.data().kmInicial,
                        Nf:doc.data().Nf,
                        data:doc.data().data.split('-').reverse().join('/'),
                        page:doc.data().page,
                        idNumberDoc:doc.data().idNumberDoc,
                    })
                })
            })

            db.collection('viagen')
            .where("mes", "==" ,RefMounth.options[RefMounth.selectedIndex].text)
            .where("ano", "==", RefYear.options[RefYear.selectedIndex].text)
            .orderBy("timestamp")
            .onSnapshot((snapshotChange) => {
                this.viagenDataMonth=[]
                snapshotChange.forEach((doc)=> {
                    var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                    this.viagenDataMonth.push ({
                        key:doc.id,
                        motorista:doc.data().motorista,
                        totalFrete:doc.data().totalFrete,
                        origem:doc.data().origem,
                        origemEstado:doc.data().origemEstado,
                        comissao:doc.data().comissao,
                        despesas:doc.data().despesas,
                        destino:doc.data().destino,
                        destinoEstado:doc.data().destinoEstado,
                        dlts:doc.data().dlts,
                        drs:doc.data().drs,
                        vlts:vlts,
                        dtcheg:doc.data().dtcheg,
                        veiculo:doc.data().veiculo.toUpperCase(),
                        kmFinal:doc.data().kmFinal,
                        kmInicial:doc.data().kmInicial,
                        Nf:doc.data().Nf,
                        data:doc.data().data.split('-').reverse().join('/'),
                        page:doc.data().page,
                        idNumberDoc:doc.data().idNumberDoc,
                    })
                })
            })

            db.collection('viagen')
                .where("mes", "==" ,RefMounth.options[RefMounth.selectedIndex].text)
                .where("ano", "==", RefYear.options[RefYear.selectedIndex].text)
                .where("totalFrete", ">", 0)
                .orderBy("totalFrete")
                .onSnapshot((snapshotChange => {
                this.ValuesDesc=[]
                snapshotChange.forEach((doc) => {
                    var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                    this.ValuesDesc.push ({
                        key:doc.id,
                        motorista:doc.data().motorista,
                        totalFrete:doc.data().totalFrete,
                        origem:doc.data().origem,
                        origemEstado:doc.data().origemEstado,
                        comissao:doc.data().comissao,
                        despesas:doc.data().despesas,
                        destino:doc.data().destino,
                        destinoEstado:doc.data().destinoEstado,
                        dlts:doc.data().dlts,
                        drs:doc.data().drs,
                        vlts:vlts,
                        dtcheg:doc.data().dtcheg,
                        veiculo:doc.data().veiculo.toUpperCase(),
                        kmFinal:doc.data().kmFinal,
                        kmInicial:doc.data().kmInicial,
                        Nf:doc.data().Nf,
                        data:doc.data().data.split('-').reverse().join('/'),
                        page:doc.data().page,
                        idNumberDoc:doc.data().idNumberDoc,
                    })
                });
            }))


            db.collection('viagen')
                .where("mes", "==" ,RefMounth.options[RefMounth.selectedIndex].text)
                .where("ano", "==", RefYear.options[RefYear.selectedIndex].text)
                .where("totalFrete", ">", 0)
                .orderBy("totalFrete")
                .onSnapshot((snapshotChange => {
                this.ValuesAscen=[]
                snapshotChange.forEach((doc) => {
                    var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                    this.ValuesAscen.push ({
                        key:doc.id,
                        motorista:doc.data().motorista,
                        totalFrete:doc.data().totalFrete,
                        origem:doc.data().origem,
                        origemEstado:doc.data().origemEstado,
                        comissao:doc.data().comissao,
                        despesas:doc.data().despesas,
                        destino:doc.data().destino,
                        destinoEstado:doc.data().destinoEstado,
                        dlts:doc.data().dlts,
                        drs:doc.data().drs,
                        vlts:vlts,
                        dtcheg:doc.data().dtcheg,
                        veiculo:doc.data().veiculo.toUpperCase(),
                        kmFinal:doc.data().kmFinal,
                        kmInicial:doc.data().kmInicial,
                        Nf:doc.data().Nf,
                        data:doc.data().data.split('-').reverse().join('/'),
                        page:doc.data().page,
                        idNumberDoc:doc.data().idNumberDoc,
                    })
                });
            }))

        })

    },
   
    computed: {
        getDeletedID: function () {
            var deletedID = this.deleteID
            var checkedID = (match) => match.key == deletedID
            var positionOfDeletedIndex= this.allIdsViagen.findIndex(checkedID) + 1
            var allIdsViagenNew = this.allIdsViagen.slice((positionOfDeletedIndex))
            return allIdsViagenNew
        },

        testevencimento: function() {
            var viagenVencimentoCheck = []
            this.viagenData.forEach((match) => {
                var viagenDataVencimento = new Date(match.vencimento.split('/').reverse().join('-'))
                var date = new Date()
                var viagenDataVencimentoNewDate = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
                date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())
                if (new Date(viagenDataVencimentoNewDate) > viagenDataVencimento ) {
                    viagenVencimentoCheck.push({
                        vencimento:true
                    })
                    
                }else {
                    viagenVencimentoCheck.push({
                        vencimento:false
                    })
                }
                console.log()
            })
            
            viagenVencimentoCheck.map(function (match) {
                if(match.vencimento == true) {
                    console.log()
                }
            })

            return false
        }
    },

    methods: {
        printPageArea(){
            var image = new Image()
            image.src= "img/report.png"

            var currentDayAndHour = new Date().toLocaleString()
            var currentDaySplit = currentDayAndHour.split(" ")


            let i = 0
            var viagenDataPrint = []
            this.viagenData.map(function (match,index) {
                viagenDataPrint[index] = match
            })

            if (this.viagenData.length < 5 ) {
                while (i < 5) {
                    if (this.viagenData[i] == undefined) {

                        viagenDataPrint.push({
                            key:"",
                            motorista:"",
                            totalFrete:0,
                            origem:"",
                            origemEstado:"-",
                            comissao:0,
                            despesas:"",
                            destino:"",
                            destinoEstado:"-",
                            dlts:"",
                            drs:0,
                            vlts:"",
                            dtcheg:"",
                            veiculo:"",
                            kmFinal:"",
                            kmInicial:"",
                            Nf:"",
                            data:"",
                            page:"",
                            idNumberDoc:""
                        })
                    }
                    i++ 
                }
            }
            const doc = new jsPDF();

            doc.autoTable({
                margin: { top: 20, left: 0, right: 0 },
                head: [['Motorista', 'Origem', 'Destino', 'KmInicial', 'KmFinal', 'Placa', 'D.R$', 'V/LTS', 'Despesa', 'T/Frete', 'Comissão','Saldo']],
                body: [
                    [viagenDataPrint[0].motorista, viagenDataPrint[0].origem + '-' + viagenDataPrint[0].origemEstado, viagenDataPrint[0].destino + '-' + viagenDataPrint[0].destinoEstado, viagenDataPrint[0].kmInicial, viagenDataPrint[0].kmFinal, viagenDataPrint[0].veiculo, "R$" + viagenDataPrint[0].drs, viagenDataPrint[0].vlts, viagenDataPrint[0].despesas,"R$" + viagenDataPrint[0].totalFrete.toFixed(2),"R$" + viagenDataPrint[0].comissao,"R$" + (viagenDataPrint[0].totalFrete - viagenDataPrint[0].comissao - viagenDataPrint[0].drs).toFixed(2)],
                    [viagenDataPrint[1].motorista, viagenDataPrint[1].origem + '-' + viagenDataPrint[1].origemEstado, viagenDataPrint[1].destino + '-' + viagenDataPrint[1].destinoEstado, viagenDataPrint[1].kmInicial, viagenDataPrint[1].kmFinal, viagenDataPrint[1].veiculo, "R$" + viagenDataPrint[1].drs, viagenDataPrint[1].vlts, viagenDataPrint[1].despesas,"R$" + viagenDataPrint[1].totalFrete.toFixed(2),"R$" + viagenDataPrint[1].comissao,"R$" + (viagenDataPrint[1].totalFrete - viagenDataPrint[1].comissao - viagenDataPrint[1].drs).toFixed(2)],
                    [viagenDataPrint[2].motorista, viagenDataPrint[2].origem + '-' + viagenDataPrint[2].origemEstado, viagenDataPrint[2].destino + '-' + viagenDataPrint[2].destinoEstado, viagenDataPrint[2].kmInicial, viagenDataPrint[2].kmFinal, viagenDataPrint[2].veiculo, "R$" + viagenDataPrint[2].drs, viagenDataPrint[2].vlts, viagenDataPrint[2].despesas,"R$" + viagenDataPrint[2].totalFrete.toFixed(2),"R$" + viagenDataPrint[2].comissao,"R$" + (viagenDataPrint[2].totalFrete - viagenDataPrint[2].comissao - viagenDataPrint[2].drs).toFixed(2)],
                    [viagenDataPrint[3].motorista, viagenDataPrint[3].origem + '-' + viagenDataPrint[3].origemEstado, viagenDataPrint[3].destino + '-' + viagenDataPrint[3].destinoEstado, viagenDataPrint[3].kmInicial, viagenDataPrint[3].kmFinal, viagenDataPrint[3].veiculo, "R$" + viagenDataPrint[3].drs, viagenDataPrint[3].vlts, viagenDataPrint[3].despesas,"R$" + viagenDataPrint[3].totalFrete.toFixed(2),"R$" + viagenDataPrint[3].comissao,"R$" + (viagenDataPrint[3].totalFrete - viagenDataPrint[3].comissao - viagenDataPrint[3].drs).toFixed(2)],
                    [viagenDataPrint[4].motorista, viagenDataPrint[4].origem + '-' + viagenDataPrint[4].origemEstado, viagenDataPrint[4].destino + '-' + viagenDataPrint[4].destinoEstado, viagenDataPrint[4].kmInicial, viagenDataPrint[4].kmFinal, viagenDataPrint[4].veiculo, "R$" + viagenDataPrint[4].drs, viagenDataPrint[4].vlts, viagenDataPrint[4].despesas,"R$" + viagenDataPrint[4].totalFrete.toFixed(2),"R$" + viagenDataPrint[4].comissao,"R$" + (viagenDataPrint[4].totalFrete - viagenDataPrint[4].comissao - viagenDataPrint[4].drs).toFixed(2)],
                ],

                didDrawPage: function (data) {
                    doc.setTextColor(40)
                    if (image) {
                        doc.addImage(image, 'PNG', 3, 5, 10, 10)
                    }
                    doc.text('Relatório', data.settings.margin.left + 15, 12).setFontSize(9)
                    doc.text("Data de impressão:" + currentDayAndHour, 140, 15).setFontSize(10)
                }
            })

            doc.save("Viagem relatório " + `${currentDaySplit.[0]}` + ".pdf");


        },

        checkParcelas () {
            if (this.selectedValueFPG == "Parcelamento" || this.selectedValueFPG == "Cartão de credito") {
                this.parcelado = true
            }else {
                this.parcelado = false
            }
        },

        hideAlertFiles () {
            this.alertFiles = false
            this.uploadValue = 0
            this.loadingFiles = true
            this.messageMaxFiles = false
        },

        listAllAnexos(keyID) {

            setTimeout(() => {
                this.loadingFiles = false;
            }, 2000)

            this.alertFiles = true
            // Create a reference under which you want to list
            var listRef = firebase.storage().ref("Boletos").child(keyID);

            // Find all the prefixes and items.
            this.viagenFiles= []
            this.viagenFilesID = []
            listRef.listAll()
            .then((res) => {
                res.items.forEach((itemRef) => {
                    this.viagenFiles.push({  
                        fileName:itemRef.name,
                    })
                    
                    this.viagenFilesID.push ({
                        keyID:keyID
                    })

                    this.emptyAnexos = false
                });
            }).catch((error) => {
                    console.log("Error catch" + error)
            });

            if(this.viagenFiles.length == 0) {
                this.emptyAnexos = true
                this.viagenFilesID.push({
                    keyID:keyID
                })
            }
            
        },

        uploadFile (event) {
        
            this.fileData = event.target.files[0]

            if(this.fileData != undefined && this.viagenFiles.length < 5) {
                var fileID = Math.floor((Math.random() * 10000000) + 1).toString()
                var uploadTask = firebase.storage().ref("Boletos").child(this.viagenFilesID[0].keyID + "/" + fileID).put(this.fileData)
                uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    }
                }, 
                (error) => {
                    console.log("Error" + error)
                }, 
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then(() => {
                        this.fileData = undefined
                        this.viagenFiles.push({
                            fileName:fileID
                        })

                    });
                }
                );
            }else {
                this.messageMaxFiles = true
            }
            
        },


        downloadAnexo(fileName) {
            if (fileName != undefined) {
                // Create a reference to the file we want to download
                var starsRef = firebase.storage().ref("Boletos").child(this.viagenFilesID[0].keyID + "/" + fileName);
                
                // Get the download URL
                starsRef.getDownloadURL()
                .then((url) => {
                    window.open(url)
                })
                .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/object-not-found':
                    // File doesn't exist
                    break;
                    case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                    case 'storage/canceled':
                    // User canceled the upload
                    break;

                    // ...

                    case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
                }
                });
            }else {
                console.log("No file for download ")
            }
        },

        previewFile(event) {
            this.uploadValue=0;
            this.picture=null;
            this.fileData = event.target.files[0];
            console.log(this.fileData)
        },

        searchQuery () {
            if(this.queryInput != "") {
                db.collection('viagen')
                .where("query", "array-contains", this.queryInput.toLowerCase())
                .onSnapshot((snapshotChange) => {
                    this.viagenQuery=[]
                    snapshotChange.forEach((doc) => {
                        var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                        this.viagenQuery.push ({
                            key:doc.id,
                            motorista:doc.data().motorista,
                            totalFrete:doc.data().totalFrete,
                            origem:doc.data().origem,
                            origemEstado:doc.data().origemEstado,
                            comissao:doc.data().comissao,
                            despesas:doc.data().despesas,
                            destino:doc.data().destino,
                            destinoEstado:doc.data().destinoEstado,
                            dlts:doc.data().dlts,
                            drs:doc.data().drs,
                            vlts:vlts,
                            dtcheg:doc.data().dtcheg,
                            veiculo:doc.data().veiculo.toUpperCase(),
                            kmFinal:doc.data().kmFinal,
                            kmInicial:doc.data().kmInicial,
                            Nf:doc.data().Nf,
                            data:doc.data().data.split('-').reverse().join('/'),
                            page:doc.data().page,
                            idNumberDoc:doc.data().idNumberDoc,
                            })
                    })

                    var RefMounth = this.$refs.currentMonth

                    if(this.viagenQuery.length !== 0) {

                        if(RefMounth.options.length == 12) {
                            var selectOptionForAdd = document.getElementById("monthSelectForAddViagen");
                            var option = document.createElement("option");
                            option.text = "Pesquisa";
                            selectOptionForAdd.add(option);
                            RefMounth.options.selectedIndex = 12
                        }
                        
                        this.selectedFilterValue = ""

                        this.pageCounter[0].[0] = 1
                        this.pageCounter[0].[1] = 2
                        this.pageCounter[0].[2] = 3
                        this.pageCounter[0].[3] = 4
                        this.pageCounter[0].[4] = 5

                        this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                        this.$refs.secondpage.className = "mx-3"
                        this.$refs.thirdpage.className = "mx-3"
                        this.$refs.forthpage.className = "mx-3"
                        this.$refs.fifthpage.className = "mx-3"

                        this.searchisActive = true

                        this.mappedviagenQuery = this.viagenQuery.map(function (match) {
                            return match
                        })
                                
                        const mappedviagenQueryFirstSlice = this.viagenQuery.slice(0,5)
                        
                        for (var i = 0; i < this.viagenData.length ; i++) {
                            this.viagenData = mappedviagenQueryFirstSlice
                        }

                    }else {
                        if(RefMounth.options.length > 11) {
                            selectOptionForAdd = document.getElementById("monthSelectForAddViagen");
                            selectOptionForAdd.remove(12);
                        }
                        this.searchisActive = false
                        this.alertcategoria = true
                        this.alertMessage = true
                    }
                })
            }else {
                this.alertcategoria = true
                this.alertMessage = true
                this.searchisActive = false
                this.getDateFilter()
            }
        },
    
        hideAlert () {
            this.alertcategoria = false;
            this.alertMessage = true;
        },

        arrowCallingCategoria () {
            let latestDoc = null
            const getNextCategorias = async () =>  {
                const ref = db.collection('viagen')
                .orderBy("timestamp")
                .startAfter(latestDoc || 0)
                .limit(5)

                const dataget = await ref.get()

                dataget.docs.forEach(doc => {
                    console.log(doc.data())
                });

                latestDoc = dataget.docs[dataget.docs.length - 1]
            }

            const selectedOption = this.$refs.selectFilter

            const handleSelect = () => {
                if(this.event.target.selectedIndex >= 5) {
                    getNextCategorias();
                }else {
                    console.log("I'm just listening")
                }
            }

            selectedOption.addEventListener('change', handleSelect)
        },

        nextFivePages () {
            this.$refs.firstpage.className = "mx-3"
            this.$refs.secondpage.className = "mx-3"
            this.$refs.thirdpage.className = "mx-3"
            this.$refs.forthpage.className = "mx-3"
            this.$refs.fifthpage.className = "mx-3"
 '' 
            if (this.totalOfDocs > 25) {            
                
                for (var i = 0 ; i < 5; i++ ) {
                        this.pageCounter[0].[i] = this.pageCounter[0].[i]+5
                }
            }else {
                this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                this.$refs.secondpage.className = "mx-3"
                this.$refs.thirdpage.className = "mx-3"
                this.$refs.forthpage.className = "mx-3"
                this.$refs.fifthpage.className = "mx-3"
            }
        },

        previousFivePages () {
            this.$refs.firstpage.className = "mx-3"
            this.$refs.secondpage.className = "mx-3"
            this.$refs.thirdpage.className = "mx-3"
            this.$refs.forthpage.className = "mx-3"
            this.$refs.fifthpage.className = "mx-3"


            if (this.totalOfDocs > 25 && this.pageCounter[0].[0] != 1) {
                
                for (var i = 0 ; i < 5; i++ ) {
                        this.pageCounter[0].[i] = this.pageCounter[0].[i]-5
                }

            }else{
                this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                this.$refs.secondpage.className = "mx-3"
                this.$refs.thirdpage.className = "mx-3"
                this.$refs.forthpage.className = "mx-3"
                this.$refs.fifthpage.className = "mx-3"
            }

        },


        firstPage (event) {
            this.clickedPageValue = event.target.innerHTML

            if(this.clickedPageValue != 1 ){
                this.updatePage();
        }else{
                db.collection('viagen').orderBy("timestamp").limit(5).onSnapshot((snapshotChange) => {
                this.viagenData=[]
                snapshotChange.forEach((doc)=> {
                    var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                    this.viagenData.push ({
                        key:doc.id,
                        motorista:doc.data().motorista,
                        totalFrete:doc.data().totalFrete,
                        origem:doc.data().origem,
                        origemEstado:doc.data().origemEstado,
                        comissao:doc.data().comissao,
                        despesas:doc.data().despesas,
                        destino:doc.data().destino,
                        destinoEstado:doc.data().destinoEstado,
                        dlts:doc.data().dlts,
                        drs:doc.data().drs,
                        vlts:vlts,
                        dtcheg:doc.data().dtcheg,
                        veiculo:doc.data().veiculo.toUpperCase(),
                        kmFinal:doc.data().kmFinal,
                        kmInicial:doc.data().kmInicial,
                        Nf:doc.data().Nf,
                        data:doc.data().data.split('-').reverse().join('/'),
                        page:doc.data().page,
                        idNumberDoc:doc.data().idNumberDoc,
                    })
                })
            })
            
        }
    },

        nextPage (event) {
            this.clickedPageValue = event.target.innerHTML
            var clickedPageValueInteger = parseInt(this.clickedPageValue,10)

            if(this.searchisActive == true) {
                if(this.viagenFPG != undefined) {
                    if (clickedPageValueInteger >  Math.ceil(this.viagenFPG.length/5) || clickedPageValueInteger >  Math.ceil(this.viagenDataMonth.length/5)) {
                        this.alertcategoria = true;
                        this.alertMessage = false;
                    }else {
                        if (event.target.value == "firstpage") {
                        this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                        this.$refs.secondpage.className = "mx-3"
                        this.$refs.thirdpage.className = "mx-3"
                        this.$refs.forthpage.className = "mx-3"
                        this.$refs.fifthpage.className = "mx-3"
                    }
                    
                    if (event.target.value == "secondpage") {
                        this.$refs.firstpage.className = "mx-3"
                        this.$refs.secondpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                        this.$refs.thirdpage.className = "mx-3"
                        this.$refs.forthpage.className = "mx-3"
                        this.$refs.fifthpage.className = "mx-3"
                    }
                    
                    if (event.target.value == "thirdpage") {
                        this.$refs.firstpage.className = "mx-3"
                        this.$refs.secondpage.className = "mx-3"
                        this.$refs.thirdpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                        this.$refs.forthpage.className = "mx-3"
                        this.$refs.fifthpage.className = "mx-3"
                    }
                    
                    if (event.target.value == "forthpage") {
                        this.$refs.firstpage.className = "mx-3"
                        this.$refs.secondpage.className = "mx-3"
                        this.$refs.thirdpage.className = "mx-3"
                        this.$refs.forthpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                        this.$refs.fifthpage.className = "mx-3"
                    }
                    
                    if (event.target.value == "fifthpage") {
                        this.$refs.firstpage.className = "mx-3"
                        this.$refs.secondpage.className = "mx-3"
                        this.$refs.thirdpage.className = "mx-3"
                        this.$refs.forthpage.className = "mx-3"
                        this.$refs.fifthpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    }

                    }
                }else {
                    if (clickedPageValueInteger >  Math.ceil(this.viagenQuery.length/5)) {
                        this.alertcategoria = true;
                        this.alertMessage = false;
                    }else {
                        if (event.target.value == "firstpage") {
                            this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                            this.$refs.secondpage.className = "mx-3"
                            this.$refs.thirdpage.className = "mx-3"
                            this.$refs.forthpage.className = "mx-3"
                            this.$refs.fifthpage.className = "mx-3"
                        }
                        
                        if (event.target.value == "secondpage") {
                            this.$refs.firstpage.className = "mx-3"
                            this.$refs.secondpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                            this.$refs.thirdpage.className = "mx-3"
                            this.$refs.forthpage.className = "mx-3"
                            this.$refs.fifthpage.className = "mx-3"
                        }
                        
                        if (event.target.value == "thirdpage") {
                            this.$refs.firstpage.className = "mx-3"
                            this.$refs.secondpage.className = "mx-3"
                            this.$refs.thirdpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                            this.$refs.forthpage.className = "mx-3"
                            this.$refs.fifthpage.className = "mx-3"
                        }
                        
                        if (event.target.value == "forthpage") {
                            this.$refs.firstpage.className = "mx-3"
                            this.$refs.secondpage.className = "mx-3"
                            this.$refs.thirdpage.className = "mx-3"
                            this.$refs.forthpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                            this.$refs.fifthpage.className = "mx-3"
                        }
                        
                        if (event.target.value == "fifthpage") {
                            this.$refs.firstpage.className = "mx-3"
                            this.$refs.secondpage.className = "mx-3"
                            this.$refs.thirdpage.className = "mx-3"
                            this.$refs.forthpage.className = "mx-3"
                            this.$refs.fifthpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                        }
                    }
                }

            }else {
                if(this.viagenFPG != undefined) {
                    if (clickedPageValueInteger >  Math.ceil(this.viagenFPG.length/5) || clickedPageValueInteger >  Math.ceil(this.viagenDataMonth.length/5)) {
                        this.alertcategoria = true;
                        this.alertMessage = false;
                    }else {
                        if (event.target.value == "firstpage") {
                        this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                        this.$refs.secondpage.className = "mx-3"
                        this.$refs.thirdpage.className = "mx-3"
                        this.$refs.forthpage.className = "mx-3"
                        this.$refs.fifthpage.className = "mx-3"
                    }
                    
                    if (event.target.value == "secondpage") {
                        this.$refs.firstpage.className = "mx-3"
                        this.$refs.secondpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                        this.$refs.thirdpage.className = "mx-3"
                        this.$refs.forthpage.className = "mx-3"
                        this.$refs.fifthpage.className = "mx-3"
                    }
                    
                    if (event.target.value == "thirdpage") {
                        this.$refs.firstpage.className = "mx-3"
                        this.$refs.secondpage.className = "mx-3"
                        this.$refs.thirdpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                        this.$refs.forthpage.className = "mx-3"
                        this.$refs.fifthpage.className = "mx-3"
                    }
                    
                    if (event.target.value == "forthpage") {
                        this.$refs.firstpage.className = "mx-3"
                        this.$refs.secondpage.className = "mx-3"
                        this.$refs.thirdpage.className = "mx-3"
                        this.$refs.forthpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                        this.$refs.fifthpage.className = "mx-3"
                    }
                    
                    if (event.target.value == "fifthpage") {
                        this.$refs.firstpage.className = "mx-3"
                        this.$refs.secondpage.className = "mx-3"
                        this.$refs.thirdpage.className = "mx-3"
                        this.$refs.forthpage.className = "mx-3"
                        this.$refs.fifthpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    }

                    }
                }else {
                    if (clickedPageValueInteger >  Math.ceil(this.viagenDataMonth.length/5)) {
                        this.alertcategoria = true;
                        this.alertMessage = false;
                    }else {
                        if (event.target.value == "firstpage") {
                            this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                            this.$refs.secondpage.className = "mx-3"
                            this.$refs.thirdpage.className = "mx-3"
                            this.$refs.forthpage.className = "mx-3"
                            this.$refs.fifthpage.className = "mx-3"
                        }
                        
                        if (event.target.value == "secondpage") {
                            this.$refs.firstpage.className = "mx-3"
                            this.$refs.secondpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                            this.$refs.thirdpage.className = "mx-3"
                            this.$refs.forthpage.className = "mx-3"
                            this.$refs.fifthpage.className = "mx-3"
                        }
                        
                        if (event.target.value == "thirdpage") {
                            this.$refs.firstpage.className = "mx-3"
                            this.$refs.secondpage.className = "mx-3"
                            this.$refs.thirdpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                            this.$refs.forthpage.className = "mx-3"
                            this.$refs.fifthpage.className = "mx-3"
                        }
                        
                        if (event.target.value == "forthpage") {
                            this.$refs.firstpage.className = "mx-3"
                            this.$refs.secondpage.className = "mx-3"
                            this.$refs.thirdpage.className = "mx-3"
                            this.$refs.forthpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                            this.$refs.fifthpage.className = "mx-3"
                        }
                        
                        if (event.target.value == "fifthpage") {
                            this.$refs.firstpage.className = "mx-3"
                            this.$refs.secondpage.className = "mx-3"
                            this.$refs.thirdpage.className = "mx-3"
                            this.$refs.forthpage.className = "mx-3"
                            this.$refs.fifthpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                        }
                    }
                }

                }

            if(this.searchisActive == true) {
                if(this.selectedFilterValue == "Sem filtro" || this.selectedFilterValue == "Adição mais recente" || this.selectedFilterValue == "Adição mais antigo" || this.selectedFilterValue == ""
                || this.selectedFilterValue == "Data de vencimento antigo" || this.selectedFilterValue == "Data de vencimento recente") {    
                    if(clickedPageValueInteger <= Math.ceil(this.viagenQuery.length/5)) {
                            if(clickedPageValueInteger > 0 ) {
                                var lastSliceQuery = clickedPageValueInteger * 5
                                var startSliceQuery = lastSliceQuery - 5

                                if(this.viagenData[0] != undefined && this.viagenQuery.length > startSliceQuery) {
                                    let i = 0
                                    while (i < this.viagenData.length) {
                                        this.viagenData = this.viagenQuery.slice(startSliceQuery, lastSliceQuery)
                                        i++
                                    }
                                }else {
                                    this.alertcategoria = true
                                    this.alertMessage = false
                                }
                            }
                        } 
                }else if (this.selectedFilterValue == "Frete mais alto"){
                    if(clickedPageValueInteger <= Math.ceil(this.ValuesAscen.length/5)) {
                            if (clickedPageValueInteger > 0 ) {
                                var lastSliceAscenQuery = clickedPageValueInteger * 5
                                var startSliceAscenQuery = lastSliceAscenQuery - 5
                                
                                if(this.viagenData[0] != undefined && this.ValuesAscen.length > startSliceAscenQuery) {
                                    let i = 0
                                    while (i < this.viagenData.length) {
                                        this.viagenData = this.ValuesAscen.slice(startSliceAscenQuery, lastSliceAscenQuery)
                                        i++
                                    }
                                }
                            }else {
                                this.alertcategoria = true
                                this.alertMessage = false
                            }
                        }else {
                            
                            this.alertcategoria = true
                            this.alertMessage = false
                        }

                }else if (this.selectedFilterValue == "Frete mais baixo") {
                    if(clickedPageValueInteger <= Math.ceil(this.ValuesDesc.length/5)) {
                            if (clickedPageValueInteger > 0 ) {
                                var lastSliceDescQuery = clickedPageValueInteger * 5
                                var startSliceDescQuery = lastSliceDescQuery - 5
                                
                                if(this.viagenData[0] != undefined && this.ValuesDesc.length > startSliceDescQuery) {
                                    let i = 0
                                    while (i < this.viagenData.length) {
                                        this.viagenData = this.ValuesDesc.slice(startSliceDescQuery, lastSliceDescQuery)
                                        i++
                                    }
                                }
                            }else {
                                
                                this.alertcategoria = true
                                this.alertMessage = false
                            }
                        }else {
                            
                            this.alertcategoria = true
                            this.alertMessage = false
                        }

                }else if ( this.viagenFilter[0].clicked >= 7 && this.viagenFPG.length > 5) {
                        if(clickedPageValueInteger <= Math.ceil(this.viagenFPG.length/5)) {
                            if (clickedPageValueInteger > 0 ) {
                                var lastSliceQueryFPG = clickedPageValueInteger * 5
                                var startSliceQueryFPG = lastSliceQueryFPG - 5
                                
                                if(this.viagenData[0] != undefined && this.viagenFPG.length > startSliceQueryFPG) {
                                    let i = 0
                                    while (i < this.viagenData.length) {
                                        this.viagenData = this.viagenFPG.slice(startSliceQueryFPG, lastSliceQueryFPG)
                                        i++
                                    }
                                }
                            }else {
                                
                                this.alertcategoria = true
                                this.alertMessage = false
                            }
                        }else {
                            
                            this.alertcategoria = true
                            this.alertMessage = false
                        }
                    }
            }else {
                if(this.selectedFilterValue == "Sem filtro" || this.selectedFilterValue == "Adição mais recente" || this.selectedFilterValue == "Adição mais antigo" || this.selectedFilterValue == ""
                || this.selectedFilterValue == "Data de vencimento antigo" || this.selectedFilterValue == "Data de vencimento recente") {
                    if(clickedPageValueInteger <= Math.ceil(this.viagenDataMonth.length/5)) {
                        if(clickedPageValueInteger > 0 ) {
                            var lastSliceMonthFilter = clickedPageValueInteger * 5
                            var startSliceMonthFilter = lastSliceMonthFilter - 5

                            if(this.viagenData[0] != undefined && this.viagenDataMonth.length > startSliceMonthFilter) {
                                let i = 0
                                while (i < this.viagenData.length) {
                                    this.viagenData = this.viagenDataMonth.slice(startSliceMonthFilter, lastSliceMonthFilter)
                                    i++
                                }
                            }else {
                                this.alertcategoria = true
                                this.alertMessage = false
                            }
                        }
                    } else {
                        this.alertcategoria = true
                        this.alertMessage = false
                    }
                
                    }else if(this.selectedFilterValue == "Frete mais alto") {
                    
                        if(clickedPageValueInteger <= Math.ceil(this.ValuesAscen.length/5)) {
                            if (clickedPageValueInteger > 0 ) {
                                var lastSliceAscen = clickedPageValueInteger * 5
                                var startSliceAscen = lastSliceAscen - 5
                                
                                if(this.viagenData[0] != undefined && this.ValuesAscen.length > startSliceAscen) {
                                    let i = 0
                                    while (i < this.viagenData.length) {
                                        this.viagenData = this.ValuesAscen.slice(startSliceAscen, lastSliceAscen)
                                        i++
                                    }
                                }
                            }else {
                                this.alertcategoria = true
                                this.alertMessage = false
                            }
                        }else {
                            
                            this.alertcategoria = true
                            this.alertMessage = false
                        }

                    }else if (this.selectedFilterValue == "Frete mais baixo") {

                        if(clickedPageValueInteger <= Math.ceil(this.ValuesDesc.length/5)) {
                            if (clickedPageValueInteger > 0 ) {
                                var lastSliceDesc = clickedPageValueInteger * 5
                                var startSliceDesc = lastSliceDesc - 5
                                
                                if(this.viagenData[0] != undefined && this.ValuesDesc.length > startSliceDesc) {
                                    let i = 0
                                    while (i < this.viagenData.length) {
                                        this.viagenData = this.ValuesDesc.slice(startSliceDesc, lastSliceDesc)
                                        i++
                                    }
                                }
                            }else {
                                
                                this.alertcategoria = true
                                this.alertMessage = false
                            }
                        }else {
                            
                            this.alertcategoria = true
                            this.alertMessage = false
                        }
                    }else if ( this.viagenFilter[0].clicked >= 7 && this.viagenFPG.length > 5) {
                        if(clickedPageValueInteger <= Math.ceil(this.viagenFPG.length/5)) {
                            if (clickedPageValueInteger > 0 ) {
                                var lastSliceFPG = clickedPageValueInteger * 5
                                var startSliceFPG = lastSliceFPG - 5
                                
                                if(this.viagenData[0] != undefined && this.viagenFPG.length > startSliceFPG) {
                                    let i = 0
                                    while (i < this.viagenData.length) {
                                        this.viagenData = this.viagenFPG.slice(startSliceFPG, lastSliceFPG)
                                        i++
                                    }
                                }
                            }else {
                                
                                this.alertcategoria = true
                                this.alertMessage = false
                            }
                        }else {
                            
                            this.alertcategoria = true
                            this.alertMessage = false
                        }
                    }else if (this.searchisActive == true) {
                        console.log("Seach Active")
                    }
                }

            /*        
            }else {
                if(clickedPageValueInteger <= Math.ceil(this.viagenDataMonth.length/5 )) {
                    
                    if(clickedPageValueInteger > 0 ) {
                        var lastSliceMonth = clickedPageValueInteger * 5
                        var startSliceMonth = lastSliceMonth - 5

                        if (this.viagenData[0] != undefined && this.viagenDataMonth.length > startSliceMonth) {    
                                let i = 0
                                while (i < this.viagenData.length) {
                                    this.viagenData = this.viagenDataMonth.slice(startSliceMonth, lastSliceMonth)
                                    i++
                                }
                            }else {
                                this.alertcategoria = true
                                this.alertMessage = false
                            }
                        }
                }else {
                    
                    this.alertcategoria = true
                    this.alertMessage = false
                }
            }
            */
        },
            

        updatePage () {
            var clickedPageValueInteger = parseInt(this.clickedPageValue,10)
            if (this.clickedPageValue > "1" ) {
                db.collection('viagen').where("page", "==", clickedPageValueInteger).orderBy("timestamp").limit(5).get().then((querySnapshot) => {
                    this.viagenData=[]
                    querySnapshot.forEach((doc) => {
                        var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                        this.viagenData.push ({
                            key:doc.id,
                            motorista:doc.data().motorista,
                            totalFrete:doc.data().totalFrete,
                            origem:doc.data().origem,
                            origemEstado:doc.data().origemEstado,
                            comissao:doc.data().comissao,
                            despesas:doc.data().despesas,
                            destino:doc.data().destino,
                            destinoEstado:doc.data().destinoEstado,
                            dlts:doc.data().dlts,
                            drs:doc.data().drs,
                            vlts:vlts,
                            dtcheg:doc.data().dtcheg,
                            veiculo:doc.data().veiculo.toUpperCase(),
                            kmFinal:doc.data().kmFinal,
                            kmInicial:doc.data().kmInicial,
                            Nf:doc.data().Nf,
                            data:doc.data().data.split('-').reverse().join('/'),
                            page:doc.data().page,
                            idNumberDoc:doc.data().idNumberDoc,
                        })
                    })
                })
            }
        },

        updatePageOnAdd () {
            this.queryInput = ''
            this.searchisActive == false
            this.selectedFilterValue = ""


            var RefMounthFailedFPG = this.$refs.currentMonth
            var RefYearValorFailedFPG = this.$refs.yearselect

            db.collection('viagen')
            .where("mes", "==" ,RefMounthFailedFPG.options[RefMounthFailedFPG.selectedIndex].text)
            .where("ano", "==", RefYearValorFailedFPG.options[RefYearValorFailedFPG.selectedIndex].text)
            .orderBy("timestamp")
            .get()
            .then((snapshotChange => {
            this.viagenPageOnAdd=[]
            snapshotChange.forEach((doc) => {
                var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                    this.viagenPageOnAdd.push ({
                        key:doc.id,
                        motorista:doc.data().motorista,
                        totalFrete:doc.data().totalFrete,
                        origem:doc.data().origem,
                        origemEstado:doc.data().origemEstado,
                        comissao:doc.data().comissao,
                        despesas:doc.data().despesas,
                        destino:doc.data().destino,
                        destinoEstado:doc.data().destinoEstado,
                        dlts:doc.data().dlts,
                        drs:doc.data().drs,
                        vlts:vlts,
                        dtcheg:doc.data().dtcheg,
                        veiculo:doc.data().veiculo.toUpperCase(),
                        kmFinal:doc.data().kmFinal,
                        kmInicial:doc.data().kmInicial,
                        Nf:doc.data().Nf,
                        data:doc.data().data.split('-').reverse().join('/'),
                        page:doc.data().page,
                        idNumberDoc:doc.data().idNumberDoc,
                })
            })

            var pagesCalculatedArray = []
            var indexPagesCalculatedArray = 0
            this.viagenPageOnAdd.map(function (match,index) {
                if(Number.isInteger(index / 5) == false) {
                    if (pagesCalculatedArray.length == 0) {
                        pagesCalculatedArray[0] = new Array(match)
                    }else{
                        pagesCalculatedArray[indexPagesCalculatedArray].push(match)
                    }
                }else {
                    indexPagesCalculatedArray++ 
                    pagesCalculatedArray[indexPagesCalculatedArray] = new Array(match)
                }
            })

            let i = 0
            this.viagenData=[]
            while (i < pagesCalculatedArray[pagesCalculatedArray.length-1].length) {
                this.viagenData[i] = pagesCalculatedArray[pagesCalculatedArray.length-1].[i]
                i++
            }

            let clickedPageValue = Math.ceil((this.viagenPageOnAdd.length + 1) / 5)
            var numberOfLoops = clickedPageValue / 5

            if(clickedPageValue > 5) {
                if (Number.isInteger(numberOfLoops) ) {
                    numberOfLoops = numberOfLoops - 1
                }else {
                    numberOfLoops = Math.floor(numberOfLoops)
                }

                if (this.pageCounter.includes(parseInt(clickedPageValue))) {
                    console.log("here")
                }else {
                    let i = 0
                    while (i < numberOfLoops) {
                        this.pageCounter[0].[0] = this.pageCounter[0].[0]+5
                        this.pageCounter[0].[1] = this.pageCounter[0].[1]+5
                        this.pageCounter[0].[2] = this.pageCounter[0].[2]+5
                        this.pageCounter[0].[3] = this.pageCounter[0].[3]+5
                        this.pageCounter[0].[4] = this.pageCounter[0].[4]+5
                        i++    
                        console.log(this.pageCounter[0].[i])
                        console.log("number of loops", i)
                    }

                }
                var currentPageAdd = clickedPageValue - (numberOfLoops * 5)

                if (currentPageAdd == 1) {
                    this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.secondpage.className ="mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "mx-3"
                }

                if (currentPageAdd == 2 ) {
                    this.$refs.firstpage.className = "mx-3"
                    this.$refs.secondpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "mx-3"
                }

                if (currentPageAdd == 3 ) {
                    this.$refs.firstpage.className = "mx-3"
                    this.$refs.secondpage.className = "mx-3"
                    this.$refs.thirdpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "mx-3"
                }

                if(currentPageAdd == 4) {
                    this.$refs.firstpage.className = "mx-3"
                    this.$refs.secondpage.className = "mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.fifthpage.className = "mx-3"
                }
                
                if (currentPageAdd == 5 ) {
                    this.$refs.firstpage.className = "mx-3"
                    this.$refs.secondpage.className = "mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                }

            }else {
                if (clickedPageValue == 1) {
                    this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.secondpage.className ="mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "mx-3"
                }

                if (clickedPageValue == 2 ) {
                    this.$refs.firstpage.className = "mx-3"
                    this.$refs.secondpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "mx-3"
                }

                if (clickedPageValue == 3 ) {
                    this.$refs.firstpage.className = "mx-3"
                    this.$refs.secondpage.className = "mx-3"
                    this.$refs.thirdpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "mx-3"
                }

                if(clickedPageValue == 4) {
                    this.$refs.firstpage.className = "mx-3"
                    this.$refs.secondpage.className = "mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.fifthpage.className = "mx-3"
                }
                
                if (clickedPageValue == 5 ) {
                    this.$refs.firstpage.className = "mx-3"
                    this.$refs.secondpage.className = "mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                }

            }
            
            
        }))
        },

        getDateFilter () {
            /*
            console.log(RefMounth.options.selectedIndex=0)
            */
            var RefMounth = this.$refs.currentMonth
            var RefYear = this.$refs.yearselect
            this.viagenFPG = undefined

            this.pageCounter[0].[0] = 1
            this.pageCounter[0].[1] = 2
            this.pageCounter[0].[2] = 3
            this.pageCounter[0].[3] = 4
            this.pageCounter[0].[4] = 5

            this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
            this.$refs.secondpage.className = "mx-3"
            this.$refs.thirdpage.className = "mx-3"
            this.$refs.forthpage.className = "mx-3"
            this.$refs.fifthpage.className = "mx-3"

            db.collection('viagen')
            .where("mes", "==" ,RefMounth.options[RefMounth.selectedIndex].text)
            .where("ano", "==", RefYear.options[RefYear.selectedIndex].text)
            .orderBy("timestamp")
            .onSnapshot((snapshotChange) => {
                this.viagenDataMonth=[]
                snapshotChange.forEach((doc)=> {
                    var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                    this.viagenDataMonth.push ({
                        key:doc.id,
                        motorista:doc.data().motorista,
                        totalFrete:doc.data().totalFrete,
                        origem:doc.data().origem,
                        origemEstado:doc.data().origemEstado,
                        comissao:doc.data().comissao,
                        despesas:doc.data().despesas,
                        destino:doc.data().destino,
                        destinoEstado:doc.data().destinoEstado,
                        dlts:doc.data().dlts,
                        drs:doc.data().drs,
                        vlts:vlts,
                        dtcheg:doc.data().dtcheg,
                        veiculo:doc.data().veiculo.toUpperCase(),
                        kmFinal:doc.data().kmFinal,
                        kmInicial:doc.data().kmInicial,
                        Nf:doc.data().Nf,
                        data:doc.data().data.split('-').reverse().join('/'),
                        page:doc.data().page,
                        idNumberDoc:doc.data().idNumberDoc,
                    })
                })
                
                if(this.viagenDataMonth.length !== 0 ) {

                    if(RefMounth.options.length > 11) {
                        var selectOptionForAdd = document.getElementById("monthSelectForAddViagen");
                        selectOptionForAdd.remove(12);
                    }

                    this.lastSuccessfulMonthEntry = RefMounth.options.selectedIndex

                    this.queryInput = ''
                    this.searchisActive = false

                    this.mappedviagenDataMonth = this.viagenDataMonth.map(function (match) {
                        return match
                    })
                            
                    const mappedviagenDataMonthFirstSlice = this.viagenDataMonth.slice(0,5)
                    
                    for (var i = 0; i < this.viagenData.length ; i++) {
                        this.viagenData = mappedviagenDataMonthFirstSlice
                    }
                    
                }else {
                    if(this.searchisActive == true ) {
                        RefMounth.options.selectedIndex = 12
                    }else {
                        if(this.lastSuccessfulMonthEntry != null) {
                            RefMounth.options.selectedIndex= this.lastSuccessfulMonthEntry
                        }else {
                            RefMounth.options.selectedIndex = new Date().getMonth()
                        }
                    }
                    this.alertcategoria = true
                    this.alertMessage = true
                }
            })
            this.selectedFilterValue = ""
        },

        getSelectedFilter (event) {

            this.viagenFilter.forEach(function (match) {
                match.clicked = event.target.selectedIndex
            })

            if(this.searchisActive == true) {
                if(this.selectedFilterValue == "Sem filtro" || this.selectedFilterValue == "Adição mais recente") {

                    if(this.pageCounter[0].[0] > 1) {

                        let i = 0
                        while (i < 5) {
                            this.pageCounter[0].[i] = i + 1
                            i++
                        }
                    }

                    this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.secondpage.className = "mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "mx-3"

                    db.collection('viagen')
                    .where("query", "array-contains", this.queryInput.toLowerCase())
                    .orderBy("data")
                    .onSnapshot((snapshotChange) => {
                        this.viagenQuery=[]
                        snapshotChange.forEach((doc) => {
                            var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                            this.viagenQuery.push ({
                                key:doc.id,
                                motorista:doc.data().motorista,
                                totalFrete:doc.data().totalFrete,
                                origem:doc.data().origem,
                                origemEstado:doc.data().origemEstado,
                                comissao:doc.data().comissao,
                                despesas:doc.data().despesas,
                                destino:doc.data().destino,
                                destinoEstado:doc.data().destinoEstado,
                                dlts:doc.data().dlts,
                                drs:doc.data().drs,
                                vlts:vlts,
                                dtcheg:doc.data().dtcheg,
                                veiculo:doc.data().veiculo.toUpperCase(),
                                kmFinal:doc.data().kmFinal,
                                kmInicial:doc.data().kmInicial,
                                Nf:doc.data().Nf,
                                data:doc.data().data.split('-').reverse().join('/'),
                                page:doc.data().page,
                                idNumberDoc:doc.data().idNumberDoc,
                            })
                        })

                        if(this.viagenQuery.length !== 0) {
                        this.mappedviagenQuery = this.viagenQuery.map(function (match) {
                            return match
                        })
                                
                        const mappedviagenQueryFirstSlice = this.viagenQuery.slice(0,5)
                        
                        for (var i = 0; i < this.viagenData.length ; i++) {
                            this.viagenData = mappedviagenQueryFirstSlice
                        }

                        }else {
                            this.alertcategoria = true
                            this.alertMessage = true
                        }

                    })

                    }else if (this.selectedFilterValue == "Adição mais antigo") {

                    if(this.pageCounter[0].[0] > 1) {

                        let i = 0
                        while (i < 5) {
                            this.pageCounter[0].[i] = i + 1
                            i++
                        }
                    }

                    this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.secondpage.className = "mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "mx-3"

                    db.collection('viagen')
                    .where("query", "array-contains", this.queryInput.toLowerCase())
                    .orderBy("data", "desc")
                    .onSnapshot((snapshotChange) => {
                    this.viagenQuery=[]
                    snapshotChange.forEach((doc) => {
                        var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                        this.viagenQuery.push ({
                            key:doc.id,
                            motorista:doc.data().motorista,
                            totalFrete:doc.data().totalFrete,
                            origem:doc.data().origem,
                            origemEstado:doc.data().origemEstado,
                            comissao:doc.data().comissao,
                            despesas:doc.data().despesas,
                            destino:doc.data().destino,
                            destinoEstado:doc.data().destinoEstado,
                            dlts:doc.data().dlts,
                            drs:doc.data().drs,
                            vlts:vlts,
                            dtcheg:doc.data().dtcheg,
                            veiculo:doc.data().veiculo.toUpperCase(),
                            kmFinal:doc.data().kmFinal,
                            kmInicial:doc.data().kmInicial,
                            Nf:doc.data().Nf,
                            data:doc.data().data.split('-').reverse().join('/'),
                            page:doc.data().page,
                            idNumberDoc:doc.data().idNumberDoc,
                        })
                    })

                        if(this.viagenQuery.length !== 0) {
                        this.mappedviagenQuery = this.viagenQuery.map(function (match) {
                            return match
                        })
                                
                        const mappedviagenQueryFirstSlice = this.viagenQuery.slice(0,5)
                        
                        for (var i = 0; i < this.viagenData.length ; i++) {
                            this.viagenData = mappedviagenQueryFirstSlice
                        }

                    }else {
                        this.alertcategoria = true
                        this.alertMessage = true
                    }

                })

                }
                else if (event.target.selectedIndex == 4) {

                    if(this.pageCounter[0].[0] > 1) {

                        let i = 0
                        while (i < 5) {
                            this.pageCounter[0].[i] = i + 1
                            i++
                        }
                    }

                    this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.secondpage.className = "mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "mx-3"

                    db.collection('viagen')
                    .where("query", "array-contains", this.queryInput.toLowerCase())
                    .orderBy("valor")
                    .onSnapshot((snapshotChange) => {
                        this.ValuesDesc=[]
                        snapshotChange.forEach((doc) => {
                            var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                            this.ValuesDesc.push ({
                                key:doc.id,
                                motorista:doc.data().motorista,
                                totalFrete:doc.data().totalFrete,
                                origem:doc.data().origem,
                                origemEstado:doc.data().origemEstado,
                                comissao:doc.data().comissao,
                                despesas:doc.data().despesas,
                                destino:doc.data().destino,
                                destinoEstado:doc.data().destinoEstado,
                                dlts:doc.data().dlts,
                                drs:doc.data().drs,
                                vlts:vlts,
                                dtcheg:doc.data().dtcheg,
                                veiculo:doc.data().veiculo.toUpperCase(),
                                kmFinal:doc.data().kmFinal,
                                kmInicial:doc.data().kmInicial,
                                Nf:doc.data().Nf,
                                data:doc.data().data.split('-').reverse().join('/'),
                                page:doc.data().page,
                                idNumberDoc:doc.data().idNumberDoc,
                            })
                        })
                        
                        var slicedValuesDesc = this.ValuesDesc.slice(0,5)

                        for (var a=0 ; a < this.viagenData.length; a++) {
                            this.viagenData = slicedValuesDesc
                        }
                    })

                    

                }else if (event.target.selectedIndex == 3) {

                    if(this.pageCounter[0].[0] > 1) {

                        let i = 0
                        while (i < 5) {
                            this.pageCounter[0].[i] = i + 1
                            i++
                        }
                    }
                    
                    this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.secondpage.className = "mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "mx-3"

                    db.collection('viagen')
                    .where("query", "array-contains", this.queryInput.toLowerCase())
                    .orderBy("valor", "desc")
                    .onSnapshot((snapshotChange) => {
                        this.ValuesAscen=[]
                        snapshotChange.forEach((doc) => {
                            var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                            this.ValuesAscen.push ({
                                key:doc.id,
                                motorista:doc.data().motorista,
                                totalFrete:doc.data().totalFrete,
                                origem:doc.data().origem,
                                origemEstado:doc.data().origemEstado,
                                comissao:doc.data().comissao,
                                despesas:doc.data().despesas,
                                destino:doc.data().destino,
                                destinoEstado:doc.data().destinoEstado,
                                dlts:doc.data().dlts,
                                drs:doc.data().drs,
                                vlts:vlts,
                                dtcheg:doc.data().dtcheg,
                                veiculo:doc.data().veiculo.toUpperCase(),
                                kmFinal:doc.data().kmFinal,
                                kmInicial:doc.data().kmInicial,
                                Nf:doc.data().Nf,
                                data:doc.data().data.split('-').reverse().join('/'),
                                page:doc.data().page,
                                idNumberDoc:doc.data().idNumberDoc,
                            })
                        })
                        var slicedValuesAscen = this.ValuesAscen.slice(0,5)

                        for (var i=0 ; i < this.viagenData.length; i++) {
                            this.viagenData = slicedValuesAscen
                        }
                    })
                }else if (this.selectedFilterValue == "Data de vencimento recente") {

                    if(this.pageCounter[0].[0] > 1) {

                        let i = 0
                        while (i < 5) {
                            this.pageCounter[0].[i] = i + 1
                            i++
                        }
                    }
                    
                    this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.secondpage.className = "mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "mx-3"
                
                    db.collection('viagen')
                    .where("query", "array-contains", this.queryInput.toLowerCase())
                    .orderBy("vencimento")
                    .onSnapshot((snapshotChange) => {
                        this.viagenDataMonth=[]
                        snapshotChange.forEach((doc)=> {
                            var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                            this.viagenDataMonth.push ({
                                key:doc.id,
                                motorista:doc.data().motorista,
                                totalFrete:doc.data().totalFrete,
                                origem:doc.data().origem,
                                origemEstado:doc.data().origemEstado,
                                comissao:doc.data().comissao,
                                despesas:doc.data().despesas,
                                destino:doc.data().destino,
                                destinoEstado:doc.data().destinoEstado,
                                dlts:doc.data().dlts,
                                drs:doc.data().drs,
                                vlts:vlts,
                                dtcheg:doc.data().dtcheg,
                                veiculo:doc.data().veiculo.toUpperCase(),
                                kmFinal:doc.data().kmFinal,
                                kmInicial:doc.data().kmInicial,
                                Nf:doc.data().Nf,
                                data:doc.data().data.split('-').reverse().join('/'),
                                page:doc.data().page,
                                idNumberDoc:doc.data().idNumberDoc,
                            })
                        })

                        if(this.viagenDataMonth.length !== 0) {
                        this.mappedviagenDataMonth = this.viagenDataMonth.map(function (match) {
                            return match
                        })
                                
                        const mappedviagenDataMonthFirstSlice = this.viagenDataMonth.slice(0,5)
                        
                        for (var i = 0; i < this.viagenData.length ; i++) {
                            this.viagenData = mappedviagenDataMonthFirstSlice
                        }

                        }else {
                            this.alertcategoria = true
                            this.alertMessage = true
                        }

                    })
                }else if (this.selectedFilterValue == "Data de vencimento antigo") {

                    if(this.pageCounter[0].[0] > 1) {

                        let i = 0
                        while (i < 5) {
                            this.pageCounter[0].[i] = i + 1
                            i++
                        }
                    }
                    
                    this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.secondpage.className = "mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "mx-3"
                    
                    db.collection('viagen')
                    .where("query", "array-contains", this.queryInput.toLowerCase())
                    .orderBy("vencimento", "desc")
                    .onSnapshot((snapshotChange) => {
                        this.viagenDataMonth=[]
                        snapshotChange.forEach((doc)=> {
                            var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                            this.viagenDataMonth.push ({
                                key:doc.id,
                                motorista:doc.data().motorista,
                                totalFrete:doc.data().totalFrete,
                                origem:doc.data().origem,
                                origemEstado:doc.data().origemEstado,
                                comissao:doc.data().comissao,
                                despesas:doc.data().despesas,
                                destino:doc.data().destino,
                                destinoEstado:doc.data().destinoEstado,
                                dlts:doc.data().dlts,
                                drs:doc.data().drs,
                                vlts:vlts,
                                dtcheg:doc.data().dtcheg,
                                veiculo:doc.data().veiculo.toUpperCase(),
                                kmFinal:doc.data().kmFinal,
                                kmInicial:doc.data().kmInicial,
                                Nf:doc.data().Nf,
                                data:doc.data().data.split('-').reverse().join('/'),
                                page:doc.data().page,
                                idNumberDoc:doc.data().idNumberDoc,
                            })
                        })

                        if(this.viagenDataMonth.length !== 0) {
                        this.mappedviagenDataMonth = this.viagenDataMonth.map(function (match) {
                            return match
                        })
                                
                        const mappedviagenDataMonthFirstSlice = this.viagenDataMonth.slice(0,5)
                        
                        for (var i = 0; i < this.viagenData.length ; i++) {
                            this.viagenData = mappedviagenDataMonthFirstSlice
                        }

                        }else {
                            this.alertcategoria = true
                            this.alertMessage = true
                        }

                    })
                }else if (event.target.selectedIndex >= 7 ) {

                    if(this.pageCounter[0].[0] > 1) {

                        let i = 0
                        while (i < 5) {
                            this.pageCounter[0].[i] = i + 1
                            i++
                        }
                    }
                    
                    this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.secondpage.className = "mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "mx-3"

                    db.collection('viagen')
                    .where("query", "array-contains", this.queryInput.toLowerCase())
                    .where("fpg", "==", this.selectedFilterValue)
                    .orderBy("valor")
                    .onSnapshot((snapshotChange) => {
                        this.viagenFPG=[]
                        snapshotChange.forEach((doc)=> {
                            var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                            this.viagenFPG.push ({
                                key:doc.id,
                                motorista:doc.data().motorista,
                                totalFrete:doc.data().totalFrete,
                                origem:doc.data().origem,
                                origemEstado:doc.data().origemEstado,
                                comissao:doc.data().comissao,
                                despesas:doc.data().despesas,
                                destino:doc.data().destino,
                                destinoEstado:doc.data().destinoEstado,
                                dlts:doc.data().dlts,
                                drs:doc.data().drs,
                                vlts:vlts,
                                dtcheg:doc.data().dtcheg,
                                veiculo:doc.data().veiculo.toUpperCase(),
                                kmFinal:doc.data().kmFinal,
                                kmInicial:doc.data().kmInicial,
                                Nf:doc.data().Nf,
                                data:doc.data().data.split('-').reverse().join('/'),
                                page:doc.data().page,
                                idNumberDoc:doc.data().idNumberDoc,
                            })
                        })

                        if(this.viagenFPG.length !== 0) {
                        this.mappedviagenFPG = this.viagenFPG.map(function (match) {
                            return match
                        })
                                
                        const mappedviagenFPGFirstSlice = this.viagenFPG.slice(0,5)
                        
                        for (var i = 0; i < this.viagenData.length ; i++) {
                            this.viagenData = mappedviagenFPGFirstSlice
                        }

                        }else {
                            this.selectedFilterValue= "Sem filtro"
                            this.viagenFPG = undefined
                            
                            this.alertcategoria = true
                            this.alertMessage = true
                            
                            if(this.pageCounter[0].[0] > 1) {

                                let i = 0
                                while (i < 5) {
                                    this.pageCounter[0].[i] = i + 1
                                    i++
                                }
                            }
                            
                            this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                            this.$refs.secondpage.className = "mx-3"
                            this.$refs.thirdpage.className = "mx-3"
                            this.$refs.forthpage.className = "mx-3"
                            this.$refs.fifthpage.className = "mx-3"

                            db.collection('viagen')
                            .where("query", "array-contains", this.queryInput.toLowerCase())
                            .orderBy("data")
                            .onSnapshot((snapshotChange) => {
                                this.viagenQuery=[]
                                snapshotChange.forEach((doc) => {
                                    var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                                    this.viagenQuery.push ({
                                        key:doc.id,
                                        motorista:doc.data().motorista,
                                        totalFrete:doc.data().totalFrete,
                                        origem:doc.data().origem,
                                        origemEstado:doc.data().origemEstado,
                                        comissao:doc.data().comissao,
                                        despesas:doc.data().despesas,
                                        destino:doc.data().destino,
                                        destinoEstado:doc.data().destinoEstado,
                                        dlts:doc.data().dlts,
                                        drs:doc.data().drs,
                                        vlts:vlts,
                                        dtcheg:doc.data().dtcheg,
                                        veiculo:doc.data().veiculo.toUpperCase(),
                                        kmFinal:doc.data().kmFinal,
                                        kmInicial:doc.data().kmInicial,
                                        Nf:doc.data().Nf,
                                        data:doc.data().data.split('-').reverse().join('/'),
                                        page:doc.data().page,
                                        idNumberDoc:doc.data().idNumberDoc,
                                    })
                                })

                                if(this.viagenQuery.length !== 0) {
                                this.mappedviagenQuery = this.viagenQuery.map(function (match) {
                                    return match
                                })
                                        
                                const mappedviagenQueryFirstSlice = this.viagenQuery.slice(0,5)
                                
                                for (var i = 0; i < this.viagenData.length ; i++) {
                                    this.viagenData = mappedviagenQueryFirstSlice
                                }

                                }else {
                                    this.alertcategoria = true
                                    this.alertMessage = true
                                }

                            })
                        }

                    })
                }
                
            //All filters for no query
            }else {
                if(this.selectedFilterValue == "Sem filtro" || this.selectedFilterValue == "Adição mais recente") {

                    if(this.pageCounter[0].[0] > 1) {

                        let i = 0
                        while (i < 5) {
                            this.pageCounter[0].[i] = i + 1
                            i++
                        }
                    }

                    this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.secondpage.className = "mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "mx-3"

                    var RefMounth = this.$refs.currentMonth
                    var RefYear = this.$refs.yearselect

                    db.collection('viagen')
                    .where("mes", "==" ,RefMounth.options[RefMounth.selectedIndex].text)
                    .where("ano", "==", RefYear.options[RefYear.selectedIndex].text)
                    .orderBy("data")
                    .onSnapshot((snapshotChange) => {
                        this.viagenDataMonth=[]
                        snapshotChange.forEach((doc)=> {
                            var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                            this.viagenDataMonth.push ({
                                key:doc.id,
                                motorista:doc.data().motorista,
                                totalFrete:doc.data().totalFrete,
                                origem:doc.data().origem,
                                origemEstado:doc.data().origemEstado,
                                comissao:doc.data().comissao,
                                despesas:doc.data().despesas,
                                destino:doc.data().destino,
                                destinoEstado:doc.data().destinoEstado,
                                dlts:doc.data().dlts,
                                drs:doc.data().drs,
                                vlts:vlts,
                                dtcheg:doc.data().dtcheg,
                                veiculo:doc.data().veiculo.toUpperCase(),
                                kmFinal:doc.data().kmFinal,
                                kmInicial:doc.data().kmInicial,
                                Nf:doc.data().Nf,
                                data:doc.data().data.split('-').reverse().join('/'),
                                page:doc.data().page,
                                idNumberDoc:doc.data().idNumberDoc,
                            })
                        })

                        if(this.viagenDataMonth.length !== 0) {
                        this.mappedviagenDataMonth = this.viagenDataMonth.map(function (match) {
                            return match
                        })
                                
                        const mappedviagenDataMonthFirstSlice = this.viagenDataMonth.slice(0,5)
                        
                        for (var i = 0; i < this.viagenData.length ; i++) {
                            this.viagenData = mappedviagenDataMonthFirstSlice
                        }

                        }else {
                            this.alertcategoria = true
                            this.alertMessage = true
                        }

                    })

                    }else if (this.selectedFilterValue == "Adição mais antigo") {

                    if(this.pageCounter[0].[0] > 1) {

                        let i = 0
                        while (i < 5) {
                            this.pageCounter[0].[i] = i + 1
                            i++
                        }
                    }

                    this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.secondpage.className = "mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "mx-3"

                    var RefMonthFilterOldest = this.$refs.currentMonth
                    var RefYearFilterOldest = this.$refs.yearselect

                    db.collection('viagen')
                    .where("mes", "==" ,RefMonthFilterOldest.options[RefMonthFilterOldest.selectedIndex].text)
                    .where("ano", "==", RefYearFilterOldest.options[RefYearFilterOldest.selectedIndex].text)
                    .orderBy("data", "desc")
                    .onSnapshot((snapshotChange) => {
                        this.viagenDataMonth=[]
                        snapshotChange.forEach((doc)=> {
                            var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                            this.viagenDataMonth.push ({
                                key:doc.id,
                                motorista:doc.data().motorista,
                                totalFrete:doc.data().totalFrete,
                                origem:doc.data().origem,
                                origemEstado:doc.data().origemEstado,
                                comissao:doc.data().comissao,
                                despesas:doc.data().despesas,
                                destino:doc.data().destino,
                                destinoEstado:doc.data().destinoEstado,
                                dlts:doc.data().dlts,
                                drs:doc.data().drs,
                                vlts:vlts,
                                dtcheg:doc.data().dtcheg,
                                veiculo:doc.data().veiculo.toUpperCase(),
                                kmFinal:doc.data().kmFinal,
                                kmInicial:doc.data().kmInicial,
                                Nf:doc.data().Nf,
                                data:doc.data().data.split('-').reverse().join('/'),
                                page:doc.data().page,
                                idNumberDoc:doc.data().idNumberDoc,
                            })
                        })

                        if(this.viagenDataMonth.length !== 0) {
                        this.mappedviagenDataMonth = this.viagenDataMonth.map(function (match) {
                            return match
                        })
                                
                        const mappedviagenDataMonthFirstSlice = this.viagenDataMonth.slice(0,5)
                        
                        for (var i = 0; i < this.viagenData.length ; i++) {
                            this.viagenData = mappedviagenDataMonthFirstSlice
                        }

                    }else {
                        this.alertcategoria = true
                        this.alertMessage = true
                    }

                })

                
                }else if (event.target.selectedIndex == 4) {

                    if(this.pageCounter[0].[0] > 1) {

                        let i = 0
                        while (i < 5) {
                            this.pageCounter[0].[i] = i + 1
                            i++
                        }
                    }

                    this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.secondpage.className = "mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "mx-3"

                    var RefMounthValorFilter = this.$refs.currentMonth
                    var RefYearValorFilter = this.$refs.yearselect

                    db.collection('viagen')
                    .where("mes", "==" ,RefMounthValorFilter.options[RefMounthValorFilter.selectedIndex].text)
                    .where("ano", "==", RefYearValorFilter.options[RefYearValorFilter.selectedIndex].text)
                    .where("totalFrete", ">", 0)
                    .orderBy("totalFrete")
                    .onSnapshot((snapshotChange => {
                    this.ValuesDesc=[]
                    snapshotChange.forEach((doc) => {
                        var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                        this.ValuesDesc.push ({
                            key:doc.id,
                            motorista:doc.data().motorista,
                            totalFrete:doc.data().totalFrete,
                            origem:doc.data().origem,
                            origemEstado:doc.data().origemEstado,
                            comissao:doc.data().comissao,
                            despesas:doc.data().despesas,
                            destino:doc.data().destino,
                            destinoEstado:doc.data().destinoEstado,
                            dlts:doc.data().dlts,
                            drs:doc.data().drs,
                            vlts:vlts,
                            dtcheg:doc.data().dtcheg,
                            veiculo:doc.data().veiculo.toUpperCase(),
                            kmFinal:doc.data().kmFinal,
                            kmInicial:doc.data().kmInicial,
                            Nf:doc.data().Nf,
                            data:doc.data().data.split('-').reverse().join('/'),
                            page:doc.data().page,
                            idNumberDoc:doc.data().idNumberDoc,
                            })
                        });
                        var slicedValuesDesc = this.ValuesDesc.slice(0,5)

                        for (var a=0 ; a < this.viagenData.length; a++) {
                            this.viagenData = slicedValuesDesc
                        }
                    }))

                    

                }else if (event.target.selectedIndex == 3) {

                    if(this.pageCounter[0].[0] > 1) {

                        let i = 0
                        while (i < 5) {
                            this.pageCounter[0].[i] = i + 1
                            i++
                        }
                    }
                    
                    this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.secondpage.className = "mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "mx-3"

                    var RefMounthValorAscenFilter = this.$refs.currentMonth
                    var RefYearValorAscenFilter = this.$refs.yearselect

                    db.collection('viagen')
                    .where("mes", "==" ,RefMounthValorAscenFilter.options[RefMounthValorAscenFilter.selectedIndex].text)
                    .where("ano", "==", RefYearValorAscenFilter.options[RefYearValorAscenFilter.selectedIndex].text)
                    .where("totalFrete", ">", 0)
                    .orderBy("totalFrete", "desc")
                    .onSnapshot((snapshotChange => {
                    this.ValuesAscen=[]
                    snapshotChange.forEach((doc) => {
                        var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                        this.ValuesAscen.push ({
                            key:doc.id,
                            motorista:doc.data().motorista,
                            totalFrete:doc.data().totalFrete,
                            origem:doc.data().origem,
                            origemEstado:doc.data().origemEstado,
                            comissao:doc.data().comissao,
                            despesas:doc.data().despesas,
                            destino:doc.data().destino,
                            destinoEstado:doc.data().destinoEstado,
                            dlts:doc.data().dlts,
                            drs:doc.data().drs,
                            vlts:vlts,
                            dtcheg:doc.data().dtcheg,
                            veiculo:doc.data().veiculo.toUpperCase(),
                            kmFinal:doc.data().kmFinal,
                            kmInicial:doc.data().kmInicial,
                            Nf:doc.data().Nf,
                            data:doc.data().data.split('-').reverse().join('/'),
                            page:doc.data().page,
                            idNumberDoc:doc.data().idNumberDoc,
                            })
                        });
                        var slicedValuesAscen = this.ValuesAscen.slice(0,5)

                        for (var i=0 ; i < this.viagenData.length; i++) {
                            this.viagenData = slicedValuesAscen
                        }
                    }))
                }else if (this.selectedFilterValue == "Data de vencimento recente") {

                    if(this.pageCounter[0].[0] > 1) {

                        let i = 0
                        while (i < 5) {
                            this.pageCounter[0].[i] = i + 1
                            i++
                        }
                    }
                    
                    this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.secondpage.className = "mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "mx-3"
                    
                    var RefMounthVencimento = this.$refs.currentMonth
                    var RefYearValorVencimento = this.$refs.yearselect

                    db.collection('viagen')
                    .where("mes", "==" ,RefMounthVencimento.options[RefMounthVencimento.selectedIndex].text)
                    .where("ano", "==", RefYearValorVencimento.options[RefYearValorVencimento.selectedIndex].text)
                    .orderBy("vencimento")
                    .onSnapshot((snapshotChange) => {
                        this.viagenDataMonth=[]
                        snapshotChange.forEach((doc)=> {
                            var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                            this.viagenDataMonth.push ({
                                key:doc.id,
                                motorista:doc.data().motorista,
                                totalFrete:doc.data().totalFrete,
                                origem:doc.data().origem,
                                origemEstado:doc.data().origemEstado,
                                comissao:doc.data().comissao,
                                despesas:doc.data().despesas,
                                destino:doc.data().destino,
                                destinoEstado:doc.data().destinoEstado,
                                dlts:doc.data().dlts,
                                drs:doc.data().drs,
                                vlts:vlts,
                                dtcheg:doc.data().dtcheg,
                                veiculo:doc.data().veiculo.toUpperCase(),
                                kmFinal:doc.data().kmFinal,
                                kmInicial:doc.data().kmInicial,
                                Nf:doc.data().Nf,
                                data:doc.data().data.split('-').reverse().join('/'),
                                page:doc.data().page,
                                idNumberDoc:doc.data().idNumberDoc,
                            })
                        })

                        if(this.viagenDataMonth.length !== 0) {
                        this.mappedviagenDataMonth = this.viagenDataMonth.map(function (match) {
                            return match
                        })
                                
                        const mappedviagenDataMonthFirstSlice = this.viagenDataMonth.slice(0,5)
                        
                        for (var i = 0; i < this.viagenData.length ; i++) {
                            this.viagenData = mappedviagenDataMonthFirstSlice
                        }

                        }else {
                            this.alertcategoria = true
                            this.alertMessage = true
                        }

                    })
                }else if (this.selectedFilterValue == "Data de vencimento antigo") {

                    if(this.pageCounter[0].[0] > 1) {

                        let i = 0
                        while (i < 5) {
                            this.pageCounter[0].[i] = i + 1
                            i++
                        }
                    }
                    
                    this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.secondpage.className = "mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "mx-3"
                    
                    var RefMounthVencimentoOldest = this.$refs.currentMonth
                    var RefYearValorVencimentoOldest = this.$refs.yearselect

                    db.collection('viagen')
                    .where("mes", "==" ,RefMounthVencimentoOldest.options[RefMounthVencimentoOldest.selectedIndex].text)
                    .where("ano", "==", RefYearValorVencimentoOldest.options[RefYearValorVencimentoOldest.selectedIndex].text)
                    .orderBy("vencimento", "desc")
                    .onSnapshot((snapshotChange) => {
                        this.viagenDataMonth=[]
                        snapshotChange.forEach((doc)=> {
                            var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                            this.viagenDataMonth.push ({
                                key:doc.id,
                                motorista:doc.data().motorista,
                                totalFrete:doc.data().totalFrete,
                                origem:doc.data().origem,
                                origemEstado:doc.data().origemEstado,
                                comissao:doc.data().comissao,
                                despesas:doc.data().despesas,
                                destino:doc.data().destino,
                                destinoEstado:doc.data().destinoEstado,
                                dlts:doc.data().dlts,
                                drs:doc.data().drs,
                                vlts:vlts,
                                dtcheg:doc.data().dtcheg,
                                veiculo:doc.data().veiculo.toUpperCase(),
                                kmFinal:doc.data().kmFinal,
                                kmInicial:doc.data().kmInicial,
                                Nf:doc.data().Nf,
                                data:doc.data().data.split('-').reverse().join('/'),
                                page:doc.data().page,
                                idNumberDoc:doc.data().idNumberDoc,
                            })
                        })

                        if(this.viagenDataMonth.length !== 0) {
                        this.mappedviagenDataMonth = this.viagenDataMonth.map(function (match) {
                            return match
                        })
                                
                        const mappedviagenDataMonthFirstSlice = this.viagenDataMonth.slice(0,5)
                        
                        for (var i = 0; i < this.viagenData.length ; i++) {
                            this.viagenData = mappedviagenDataMonthFirstSlice
                        }

                        }else {
                            this.alertcategoria = true
                            this.alertMessage = true
                        }

                    })
                }else if (event.target.selectedIndex >= 7 ) {

                    if(this.pageCounter[0].[0] > 1) {

                        let i = 0
                        while (i < 5) {
                            this.pageCounter[0].[i] = i + 1
                            i++
                        }
                    }
                    
                    this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                    this.$refs.secondpage.className = "mx-3"
                    this.$refs.thirdpage.className = "mx-3"
                    this.$refs.forthpage.className = "mx-3"
                    this.$refs.fifthpage.className = "mx-3"

                    var RefMounthVencimentoFPG = this.$refs.currentMonth
                    var RefYearValorVencimentoFPG = this.$refs.yearselect

                    db.collection('viagen')
                    .where("mes", "==" ,RefMounthVencimentoFPG.options[RefMounthVencimentoFPG.selectedIndex].text)
                    .where("ano", "==", RefYearValorVencimentoFPG.options[RefYearValorVencimentoFPG.selectedIndex].text)
                    .where("fpg", "==", this.selectedFilterValue)
                    .orderBy("valor")
                    .onSnapshot((snapshotChange) => {
                        this.viagenFPG=[]
                        snapshotChange.forEach((doc)=> {
                            var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                            this.viagenFPG.push ({
                                key:doc.id,
                                motorista:doc.data().motorista,
                                totalFrete:doc.data().totalFrete,
                                origem:doc.data().origem,
                                origemEstado:doc.data().origemEstado,
                                comissao:doc.data().comissao,
                                despesas:doc.data().despesas,
                                destino:doc.data().destino,
                                destinoEstado:doc.data().destinoEstado,
                                dlts:doc.data().dlts,
                                drs:doc.data().drs,
                                vlts:vlts,
                                dtcheg:doc.data().dtcheg,
                                veiculo:doc.data().veiculo.toUpperCase(),
                                kmFinal:doc.data().kmFinal,
                                kmInicial:doc.data().kmInicial,
                                Nf:doc.data().Nf,
                                data:doc.data().data.split('-').reverse().join('/'),
                                page:doc.data().page,
                                idNumberDoc:doc.data().idNumberDoc,
                            })
                        })

                        if(this.viagenFPG.length !== 0) {
                        this.mappedviagenFPG = this.viagenFPG.map(function (match) {
                            return match
                        })
                                
                        const mappedviagenFPGFirstSlice = this.viagenFPG.slice(0,5)
                        
                        for (var i = 0; i < this.viagenData.length ; i++) {
                            this.viagenData = mappedviagenFPGFirstSlice
                        }

                        }else {
                            this.selectedFilterValue= "Sem filtro"
                            this.viagenFPG = undefined
                            
                            this.alertcategoria = true
                            this.alertMessage = true
                            
                            if(this.pageCounter[0].[0] > 1) {

                                let i = 0
                                while (i < 5) {
                                    this.pageCounter[0].[i] = i + 1
                                    i++
                                }
                            }
                            
                            this.$refs.firstpage.className = "bg-blue-500 rounded-full w-6 h-6 mx-3"
                            this.$refs.secondpage.className = "mx-3"
                            this.$refs.thirdpage.className = "mx-3"
                            this.$refs.forthpage.className = "mx-3"
                            this.$refs.fifthpage.className = "mx-3"

                            var RefMounthFailedFPG = this.$refs.currentMonth
                            var RefYearValorFailedFPG = this.$refs.yearselect

                            db.collection('viagen')
                            .where("mes", "==" ,RefMounthFailedFPG.options[RefMounthFailedFPG.selectedIndex].text)
                            .where("ano", "==", RefYearValorFailedFPG.options[RefYearValorFailedFPG.selectedIndex].text)
                            .orderBy("data")
                            .onSnapshot((snapshotChange) => {
                                this.viagenDataMonth=[]
                                snapshotChange.forEach((doc)=> {
                                    var vlts = (doc.data().drs / doc.data().dlts).toFixed(2)
                                    this.viagenDataMonth.push ({
                                        key:doc.id,
                                        motorista:doc.data().motorista,
                                        totalFrete:doc.data().totalFrete,
                                        origem:doc.data().origem,
                                        origemEstado:doc.data().origemEstado,
                                        comissao:doc.data().comissao,
                                        despesas:doc.data().despesas,
                                        destino:doc.data().destino,
                                        destinoEstado:doc.data().destinoEstado,
                                        dlts:doc.data().dlts,
                                        drs:doc.data().drs,
                                        vlts:vlts,
                                        dtcheg:doc.data().dtcheg,
                                        veiculo:doc.data().veiculo.toUpperCase(),
                                        kmFinal:doc.data().kmFinal,
                                        kmInicial:doc.data().kmInicial,
                                        Nf:doc.data().Nf,
                                        data:doc.data().data.split('-').reverse().join('/'),
                                        page:doc.data().page,
                                        idNumberDoc:doc.data().idNumberDoc,
                                    })
                                })

                                if(this.viagenDataMonth.length !== 0) {
                                this.mappedviagenDataMonth = this.viagenDataMonth.map(function (match) {
                                    return match
                                })
                                        
                                const mappedviagenDataMonthFirstSlice = this.viagenDataMonth.slice(0,5)
                                
                                for (var i = 0; i < this.viagenData.length ; i++) {
                                    this.viagenData = mappedviagenDataMonthFirstSlice
                                }

                                }else {
                                    this.alertcategoria = true
                                    this.alertMessage = true
                                }

                            })
                            
                        }

                    })
                }

            }

        },
        

        getSelectInputs (event) {
            if (event.target.id == "editar") {
                let selectedIndexNumber = event.target.options.selectedIndex
                this.futureUpdate.tipo = event.target.options[selectedIndexNumber].value
                this.futureUpdate.categoria = event.target.options[selectedIndexNumber].id
            }else {
                let selectedIndexNumber = event.target.options.selectedIndex
                this.selectedId = event.target.options[selectedIndexNumber].id
            }
        },

        handleInput (e) {
            if (e.target.id == "updateValor"){
                let stringValue = e.target.value.toString()
                
                let regex = /^\d*(\.\d{1,2})?$/
                if(!stringValue.match(regex) && this.numeroInputAddUpdate!== '') {
                this.numeroInputAddUpdate= this.numeroAntesInputAddUpdate
                this.futureUpdate.valor = this.numeroInputAddUpdate
            }
                this.numeroAntesInputAddUpdate = this.numeroInputAddUpdate
                this.futureUpdate.valor = parseFloat(this.numeroAntesInputAddUpdate)
            }else {
                let stringValue = e.target.value.toString()
                let regex = /^\d*(\.\d{1,2})?$/
                if(!stringValue.match(regex) && this.numeroInputAdd!== '') {
                    this.numeroInputAdd= this.numeroAntesInputAdd
                }
                this.numeroAntesInputAdd = this.numeroInputAdd
            }

        },

        onFormSubmit(event) {
            event.preventDefault()
            if(this.viagenNew.dtcheg == undefined) {
                this.viagenNew.dtcheg = "0"}

            if(this.viagenNew.kmFinal == undefined) {
                this.viagenNew.kmFinal = "0"
            }
            if(this.viagenNew.Nf == undefined) {
                this.viagenNew.Nf = "."
            }
            if(this.viagenNew.despesas == undefined) {
                this.viagenNew.despesas = "."
            }

            this.viagenNew.page = Math.ceil((this.totalOfDocs + 1) / 5)
            this.viagenNew.idNumberDoc = this.totalOfDocs + 1
            
            this.ValuesAscen.push(this.viagenNew)
            this.ValuesDesc.push(this.viagenNew)

            const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
            ];
            var monthGetDate = new Date(this.viagenNew.data)
            
            var monthAdd = monthNames[monthGetDate.getMonth()]
            var yearAdd = new Date (this.viagenNew.data).getFullYear().toString()
            
            db.collection('viagen').add({
                motorista: this.viagenNew.motorista,
                origem: this.viagenNew.origem,
                origemEstado: this.selectedOrigem,
                destino: this.viagenNew.destino,
                destinoEstado: this.selectedDestino,
                data: this.viagenNew.data,
                veiculo: this.viagenNew.veiculo.toUpperCase(),
                dlts: this.viagenNew.dlts,
                drs: this.viagenNew.drs, 
                dtcheg: this.viagenNew.dtcheg, 
                despesas: this.viagenNew.despesas,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                kmInicial:this.viagenNew.kmInicial,
                kmFinal:this.viagenNew.kmFinal,
                nf:this.viagenNew.Nf,
                totalFrete:this.viagenNew.totalFrete,
                comissao:Number(this.viagenNew.comissao),
                page:this.viagenNew.page,
                mes:monthAdd,
                ano:yearAdd,
                idNumberDoc:this.viagenNew.idNumberDoc,
                query:[
                    this.viagenNew.motorista.toLowerCase(),
                    this.viagenNew.origem.toLowerCase(),
                    this.selectedOrigem,
                    this.viagenNew.destino.toLowerCase(),
                    this.selectedDestino,
                    this.viagenNew.data.split('-').reverse().join('/'),
                    this.viagenNew.veiculo.toLowerCase(),
                    this.viagenNew.dlts,
                    this.viagenNew.drs,
                    this.viagenNew.dtcheg,
                    this.viagenNew.despesas,
                    this.viagenNew.kmInicial,
                    this.viagenNew.kmFinal,
                    this.viagenNew.Nf,
                    this.viagenNew.page,
                    this.viagenNew.totalFrete,
                    monthAdd,
                    yearAdd,
                    this.viagenNew.idNumberDoc,
                ]
            }).then(() => {
                this.viagenNew.motorista=''
                this.viagenNew.origem=""
                this.selectedOrigem=""
                this.viagenNew.destino=""
                this.selectedDestino=""
                this.viagenNew.dlts=""
                this.numeroInputAddUpdate=""
                this.viagenNew.data=''
                this.viagenNew.dtcheg=""
                this.viagenNew.despesas=""
                this.viagenNew.veiculo=''
                this.viagenNew.kmInicial=""
                this.viagenNew.kmFinal=""
                this.viagenNew.Nf=""
                this.viagenNew.comissao=""
                this.viagenNew.totalFrete=""
                this.addDiv = false;
                this.updatePageOnAdd();
            })
        },

        deleteData (id){
            this.deleteID = id;

            if (window.confirm("Você quer realmente deletar essa entrada ?")) {
                
                
                db.collection('viagen').doc(id).delete().then(()=> {
                    
                })
                .catch ((error)=> {
                    console.error(error)
                })
                
                this.getDeletedID
                
                for (var i = 0; i < this.getDeletedID.length;  i++) {
                    var newIdNumberDocValue = this.getDeletedID[i].idNumberDoc - 1
                    var newPageValue = Math.ceil(newIdNumberDocValue / 5)
                    db.collection('viagen').doc(this.getDeletedID[i].key).update({
                        page:newPageValue,
                        idNumberDoc:newIdNumberDocValue,
                    }).then(() => {
                        console.log("Yes it Worked !")
                    }).catch((error)=> {
                        console.log(error)
                    })
                }             
            }
        },

        EditKeyGet (id) {
            let dbRef = db.collection('viagen').doc(id);
                dbRef.get().then((doc) => {
                    this.futureUpdate = doc.data();
                    this.futureUpdate.key= id;
                    this.numeroInputAddUpdate = this.futureUpdate.valor
                    console.log(this.futureUpdate)
                }).catch((error) => {
                    console.log(error)
            })
        },


        showAddDiv () {
            this.addDiv = true
            this.numeroInputAdd = ""
        },

        hideAddDiv () {
            if(event.target.id == "sendbuttonAdd") {
                this.addDiv = false;
            }

            if (window.confirm("Você está prestes a sair sem adicionar a entrada, tem certeza ?")) {
                    this.addDiv = false;
            }
        },

        showEditDiv () {
            this.editDiv = true
        },

        HideEditDiv () {
            if (event.target.id == "sendbutton") {
                if (window.confirm("Confirmar as mudanças feita a entrada ?")) {
                    db.collection('viagen').doc(this.futureUpdate.key)
                    .update(this.futureUpdate).then(()=> {
                        console.log("Entrada atualizada com sucesso")
                    }).catch((error) => {
                        console.log(error);
                    })
                    this.editDiv = false;
                }
            }else {
                if (window.confirm("Você está prestes a sair sem salvar as mudanças, tem certeza ?")) {
                    this.editDiv = false;
                }
            }
        },
    }
}
</script>