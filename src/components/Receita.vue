<template>
    
    <div class="flex flex-col overflow-y-hidden relative h-screen">
        <div class="absolute w-full">
            <h1 class="text-blue-500 text-5xl font-bold text-left tracking-wide ml-5 mt-12 mb-8">Adicione suas receitas</h1>

            <div class='flex gap-10'>
                <div class="p-2">
                    <div class="inline-flex items-center bg-white leading-none text-black rounded-full p-2 shadow-lg text-teal text-sm">
                        <span class="inline-flex bg-blue-500 text-white text-xl rounded-full h-6 px-3 justify-center items-center">Valor Total</span>
                        <span class="inline-flex px-2 text-xl text-green-600">R$ {{valorTotalReceita}}</span>
                    </div>
                </div>

                <div class="p-2">
                    <div class="inline-flex items-center bg-white leading-none text-black rounded-full p-2 shadow-lg text-teal text-lg">
                        <span class="inline-flex bg-blue-500 text-white text-xl rounded-full h-6 px-3 justify-center items-center">Mês</span>
                        <div class='ml-1 text-blue-500 border border-blue-500'>
                            <select v-on:change="getDateFilter($event)" ref='currentMonth' class="apperance-none" id="monthSelectForAdd">
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
                            <option>Adição  mais antigo</option>
                            <option>Adição mais recente</option>
                        </optgroup>
                        <optgroup label="Valor">
                            <option>Valor mais alto</option>
                            <option>Valor mais baixo</option>
                        </optgroup>
                        <optgroup label="Vencimento">
                            <option>Data de vencimento recente</option>
                            <option>Data de vencimento antigo</option>
                        </optgroup>
                        <optgroup label="F.PG">
                            <option>Boleto</option>
                            <option>Dinheiro</option>
                            <option>Parcelamento</option>
                            <option>Cartão de debito</option>
                            <option>Cartão de credito</option>
                            <option>Carnê</option>
                            <option>Outros</option>
                        </optgroup>
                        <optgroup label="Controle">
                            <option>Pago</option>
                            <option>Em aberto</option>
                            <option>Não pago</option>
                            <option>Vencido</option>
                        </optgroup>
                    </select>
                </div>
            </div>
            
            <table class="w-full">
                <thead >
                    <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th class="p-2 font-bold uppercase text-blue-500">Tipo</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Data</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Fornecedor</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Vencimento</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Serviço</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Categoria</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Valor R$</th>
                        <th class="p-2 font-bold uppercase text-blue-500">F.PG</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Controle</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Descrição</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Arquivos</th>
                        <th class="p-2 font-bold uppercase text-blue-500">Modificar</th>
                    </tr>
                </thead>
                <tbody v-for='data in receitaData' :key='data.key' class="text-gray-700 text-base font-light">
                    <tr class="border-b border-gray-200 hover:bg-gray-100 bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                        <td class="flex flex-row justify-center p-3 text-gray-800 block">    
                            <img :src="data.tipo" class="h-8 w-8 rounded-2x1 object-cover">
                        </td>
                        
                        <td class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                            {{data.data}} 
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            {{data.fornecedor}}
                        </td>

                        <td :id="data.key">
                            
                            {{data.vencimento}}
                        </td>

                        <td class="flex justify-between text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            {{data.servico}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            {{data.categoria}}
                        </td>

                        <td class="text-green-600 text-xl w-full lg:w-auto p-3 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            R$ {{data.valor}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            {{data.fpg}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            {{data.controle}}
                        </td>

                        <td ref="descricaoFull" class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 text-center block lg:table-cell relative lg:static">
                            {{data.descricao}}
                        </td>

                        <td class="text-xl w-full lg:w-auto p-3 text-gray-800 text-center border-b border-blue-200 block lg:table-cell relative lg:static">
                            <p class="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl cursor-pointer mr-2 px-1" @click="listAllAnexos(data.key);">Anexos</p>
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

                <div class="flex text-center justify-center clear-both">
                    <span class="font-bold text-gray-700">***</span>
                    <h1 class="font-bold text-gray-700 mr-2">Para ver a descrição completa, basta clicar em </h1>
                    <button disabled class="cursor-default text-center bg-blue-600 text-white py-1 px-2 rounded-3xl mr-2">E</button>
                </div>

        </div>

        <div v-show="editDiv" class="relative flex flex-col justify-center sm:py-8 :max-w-xl sm:mx-auto h-full w-full    bg-black bg-opacity-80">
            
            <div v-for='value in receitaUpdate' :key='value.key' class="max-w-md mx-auto px-4 py-4 bg-white mx-8 rounded-3xl border-4 border-blue-500">
                <form @submit.prevent="onUpdateForm">
                <div class="flex items-center space-x-5">
                <div class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i</div>
                <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
                    <h2 class="leading-relaxed">Atualizar receita</h2>
                    <p class="text-sm text-gray-500 font-normal leading-relaxed">Complete com as informações referente as mudanças da entrada</p>
                </div>
                </div>

                <div class="flex">
                    <div class="flex">
                        <div class="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                            <div class="flex flex-col">
                            <label class="leading-loose">Fornecedor</label>
                            <input type="text" required v-model="futureUpdate.fornecedor" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: Semente...">
                            </div>
                            <div class="flex flex-col">
                                <label class="leading-loose">Valor R$</label>
                                <input id="updateValor" type="number" required min="0" step="any" v-model.number="numeroInputAddUpdate" @input="handleInput" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="R$ 0,00">
                            </div>
                            <div class="flex items-center space-x-4">
                            <div class="flex flex-col">
                                <label class="leading-loose">Categoria</label>
                                <div class="relative focus-within:text-gray-600 text-gray-800">
                                    <select required v-on:change="getSelectInputs($event)" v-model="selectedValue" class="rounded border p-1">
                                        <option disabled value="">Selecione um tipo</option>
                                        <option value="img/boi.png" id="Categoria Teste 1">Categoria Teste 1</option>
                                        <option value="img/money.png " id="Categoria Teste 2">Categoria Teste 2</option>
                                        <option value="img/contrato.png" id="Categoria Teste 3" >Categoria Teste 3</option>
                                        <option value="img/venda.png" id="Categoria Teste 4" >Categoria Teste 4</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex flex-col">
                            <label class="leading-loose">Descrição</label>
                            <div class="w-full">
                                <input v-model="futureUpdate.descricao" type="text" class="px-4 py-6 border focus:ring-gray-500 focus:border-gray-900  sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Adicione detalhes a sua nova entrada (opcional)">
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col py-4 pl-3 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

                        <div>
                            <label class="leading-loose">Servico</label>
                            <input type="text" required v-model="futureUpdate.servico" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: Semente...">
                        </div>
                        
                        <div class="flex flex-col">
                            <label class="leading-loose">Vencimento</label>
                            <input type="date" required v-model="futureUpdate.vencimento" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Optional">
                        </div>

                        <div>
                            <label class="leading-loose">Controle</label>
                            <div class="relative focus-within:text-gray-600 text-gray-800">
                                    <select required ref="ControleSelectUpdate" v-model="futureUpdate.controle" class="rounded border p-1">
                                        <option disabled value="">Selecione um tipo</option>
                                        <option>Pago</option>
                                        <option>Em aberto</option>
                                        <option>Não pago</option>
                                        <option>Vencido</option>
                                    </select>
                                </div>
                        </div>

                        <div class="flex flex-col">
                                <label class="leading-loose">Forma de pagamento</label>
                                <div class="relative focus-within:text-gray-600 text-gray-800">
                                    <select required @change="checkParcelas" v-model="futureUpdate.fpg" class="rounded border p-1">
                                        <option disabled value="">Selecione um tipo</option>
                                        <option>Boleto</option>
                                        <option>Dinheiro</option>
                                        <option>Parcelamento</option>
                                        <option>Cartão de debito</option>
                                        <option>Cartão de credito</option>
                                        <option>Carnê</option>
                                        <option>Outros</option>
                                    </select>
                                </div>
                        </div>

                        <div v-show="parcelado">
                            <label class="leading-loose">Nº de parcelas(Max-18*)</label>
                            <input type="number" max="18" min="1" v-model="receitaNew.ndeparcelas" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: Semente...">
                        </div>

                    </div>
                </div>

                </div>
                    <div class="pt-4 flex items-center space-x-4">
                        <span @click="HideEditDiv" class="cursor-pointer flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                            <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Cancelar
                        </span>
                        <button @click.prevent="HideEditDiv();" id="sendbutton" class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Atualizar</button>
                    </div>
                </form>
            </div>
        </div>

        
        <div v-show="addDiv" class="relative flex flex-col justify-center sm:py-8 :max-w-xl sm:mx-auto h-full w-full bg-black bg-opacity-80">
            
            <div class="max-w-md mx-auto px-4 py-4 bg-white rounded-3xl border-4 border-blue-500">
                <form @submit.prevent="onFormSubmit">
                <div class="flex items-center space-x-5">
                <div class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i</div>
                <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
                    <h2 class="leading-relaxed">Adicionar receita</h2>
                    <p class="text-sm text-gray-500 font-normal leading-relaxed">Complete com as informações referente a nova receita</p>
                </div>
                </div>

                <div class="flex">
                    <div class="flex">
                        <div class="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                            <div class="flex flex-col">
                            <label class="leading-loose">Fornecedor</label>
                            <input type="text" required v-model="receitaNew.fornecedor" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: Semente...">
                            </div>
                            <div class="flex flex-col">
                                <label class="leading-loose">Valor R$</label>
                                <input type="number" required min="0" step="any" v-model.number="numeroInputAdd" @input="handleInput" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="R$ 0,00">
                            </div>
                            <div class="flex items-center space-x-4">
                            <div class="flex flex-col">
                                <label class="leading-loose">Categoria</label>
                                <div class="relative focus-within:text-gray-600 text-gray-800">
                                    <select required v-on:change="getSelectInputs($event)" v-model="selectedValue" class="rounded border p-1">
                                        <option disabled value="">Selecione um tipo</option>
                                        <option value="img/frete.png" id="Frete">Frete</option>
                                        <option value="img/money.png " id="Entrada de dinheiro">Entrada de dinheiro</option>
                                        <option value="img/contrato.png" id="Contrato" >Contrato</option>
                                        <option value="img/venda.png" id="Vendas Gerais" >Vendas Gerais</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col">
                            <label class="leading-loose">Data</label>
                            <input type="date" required v-model="receitaNew.data" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Optional">
                        </div>
                        
                        <div class="flex flex-col">
                            <label class="leading-loose">Descrição</label>
                            <div class="w-full">
                                <input v-model="receitaNew.descricao" type="text" class="px-4 py-6 border focus:ring-gray-500 focus:border-gray-900  sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Adicione detalhes a sua nova entrada (opcional)">
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col py-4 pl-3 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

                        <div>
                            <label class="leading-loose">Servico</label>
                            <input type="text" required v-model="receitaNew.servico" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: Semente...">
                        </div>
                        
                        <div class="flex flex-col">
                            <label class="leading-loose">Vencimento</label>
                            <input type="date" required v-model="receitaNew.vencimento" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Optional">
                        </div>

                        <div>
                            <label class="leading-loose">Controle</label>
                            <div class="relative focus-within:text-gray-600 text-gray-800">
                                    <select required v-model="selectedValueControle" class="rounded border p-1">
                                        <option disabled value="">Selecione um tipo</option>
                                        <option>Pago</option>
                                        <option>Em aberto</option>
                                        <option>Não pago</option>
                                        <option>Vencido</option>
                                    </select>
                                </div>
                        </div>

                        <div class="flex flex-col">
                                <label class="leading-loose">Forma de pagamento</label>
                                <div class="relative focus-within:text-gray-600 text-gray-800">
                                    <select required @change="checkParcelas" v-model="selectedValueFPG" class="rounded border p-1">
                                        <option disabled value="">Selecione um tipo</option>
                                        <option>Boleto</option>
                                        <option>Dinheiro</option>
                                        <option>Parcelamento</option>
                                        <option>Cartão de debito</option>
                                        <option>Cartão de credito</option>
                                        <option>Carnê</option>
                                        <option>Outros</option>
                                    </select>
                                </div>
                        </div>

                        <div v-show="parcelado">
                            <label class="leading-loose">Nº de parcelas(Max-12*)</label>
                            <input type="number" max="12" min="1" v-model="receitaNew.ndeparcelas" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-900" placeholder="Ex: Semente...">
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

        <div v-if="loadingFilesCategoria" class="relative flex flex-col justify-center sm:py-8 :max-w-xl sm:mx-auto h-full w-full bg-black bg-opacity-80">
            <div v-if="loadingFiles" class="max-w-md mx-auto px-4 py-3 bg-white rounded-2xl text-xl">
                <div class="max-w-md mx-auto px-4 py-3"> 
                    <img src="img/cloud.png" class="h-40 w-40 animate-bounce">
                </div>
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
                <div class="max-w-md mx-auto px-4 py-3"> 
                    <img src="img/cloud.png" class="h-40 w-40 animate-bounce">
                </div>
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
                            <p>Nenhum arquivo anexo referente a essa receita</p>
                        </div>
                        <tbody v-else v-for="data in receitaFiles" :key="data.key" class="text-gray-700 text-base font-light">
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
            valorTotalReceita: null,
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
            futureUpdate:[],
            receitaData: [],
            receitaFilter: [
                {
                    clicked:''
                },
            ],
            receitaUpdate: [
                {
                    key:"",
                    fornecedor:"",
                    valor:"",
                    vencimento:"",
                    categoria:"",
                    descricao:"",
                    controle:"",
                    fpg:"",
                    servico:"",
                },
            ],
            totalOfDocs:'',
            lastDocNumber:'',
            receitaNew: {},
            editDiv: false,
            addDiv: false,
            numeroInputAdd: null,
            numeroAntesInputAdd: null,
            numeroInputAddUpdate:null,
            numeroAntesInputAddUpdate: null,
            allIdsReceita:[],
            ValuesDesc:[],
            ValuesAscen:[],
            deleteID:'',
            mappedReceitaCategoria:[],
            receitaDataMonth:[],
            alertcategoria:false,
            alertMessage:false,
            queryInput:'',
            receitaQuery:[],
            searchisActive:false,
            previousMonth:"",
            fileData: null,
            file:null,
            alertFiles:false,
            receitaFiles:[],
            emptyAnexos:true,
            timeschecked:0,
            uploadValue:0,
            receitaFilesID:[],
            loadingFiles:true,
            messageMaxFiles:false,
            lastSuccessfulMonthEntry:null,
            selectedValueFPG:"",
            parcelado:false,
            selectedValueControle:"",
            emptyMessage:false,
            queryUpdate:null,
            receitaPageOnAdd:[],
            receitaDataPrint:[],
            loadingFilesCategoria:false,
        }
    },

    created() {
        db.collection('receita').orderBy("timestamp", "desc").limit(1).onSnapshot((snapshotChange) => {
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
        
        db.collection('receita').orderBy("timestamp", "desc").onSnapshot((snapshotChange => {
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

            var date = new Date()
            var receitaDataVencimentoNewDate = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
            date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())
        
            db.collection('receita')
            .where("mes", "==" ,RefMounth.options[RefMounth.selectedIndex].text)
            .where("ano", "==", RefYear.options[RefYear.selectedIndex].text)
            .orderBy("timestamp")
            .limit(5) 
            .onSnapshot((snapshotChange) => {
                this.receitaData=[]
                var vencimentoCheck = ""
                snapshotChange.forEach((doc)=> {
                    if (new Date(receitaDataVencimentoNewDate) > new Date(doc.data().vencimento.split('/').reverse().join('-'))){
                        vencimentoCheck = true
                    }else {
                        vencimentoCheck = false
                    }
                    this.receitaData.push ({
                        key:doc.id,
                        vencimentoCheck:vencimentoCheck,
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
            })

            db.collection('receita')
            .where("mes", "==" ,RefMounth.options[RefMounth.selectedIndex].text)
            .where("ano", "==", RefYear.options[RefYear.selectedIndex].text)
            .orderBy("timestamp")
            .onSnapshot((snapshotChange) => {
                this.receitaDataMonth=[]
                snapshotChange.forEach((doc)=> {
                    this.receitaDataMonth.push ({
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
            })

            db.collection('receita')
                .where("mes", "==" ,RefMounth.options[RefMounth.selectedIndex].text)
                .where("ano", "==", RefYear.options[RefYear.selectedIndex].text)
                .where("valor", ">", 0)
                .orderBy("valor")
                .onSnapshot((snapshotChange => {
                this.ValuesDesc=[]
                snapshotChange.forEach((doc) => {
                    this.ValuesDesc.push({
                        key:doc.id,
                        fornecedor:doc.data().fornecedor,
                        veiculo:doc.data().veiculo,
                        servico:doc.data().servico,
                        vencimento:doc.data().vencimento,
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
                });
            }))


            db.collection('receita')
                .where("mes", "==" ,RefMounth.options[RefMounth.selectedIndex].text)
                .where("ano", "==", RefYear.options[RefYear.selectedIndex].text)
                .where("valor", ">", 0)
                .orderBy("valor")
                .onSnapshot((snapshotChange => {
                this.ValuesAscen=[]
                snapshotChange.forEach((doc) => {
                    this.ValuesAscen.push({
                        key:doc.id,
                        fornecedor:doc.data().fornecedor,
                        veiculo:doc.data().veiculo,
                        servico:doc.data().servico,
                        vencimento:doc.data().vencimento,
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
                });
            }))

            db.collection('receita')
            .where("mes", "==" ,RefMounth.options[RefMounth.selectedIndex].text)
            .where("ano", "==", RefYear.options[RefYear.selectedIndex].text)
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
        
            this.receitaData.forEach((match) => {
                console.log(match)
                var receitaDataVencimento = new Date(match.vencimento.split('/').reverse().join('-'))
                var date = new Date()
                var receitaDataVencimentoNewDate = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
                date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())
                if (new Date(receitaDataVencimentoNewDate) > receitaDataVencimento ) {
                    console.log(document.getElementById("CpuSqSJKMc9TEtOiakga").className)
                }else {
                    console.log(document.getElementById("CpuSqSJKMc9TEtOiakga").className)
                }
                console.log("executed")
            })

        })
    },
   
    computed: {
        getDeletedID: function () {
            var deletedID = this.deleteID
            var checkedID = (match) => match.key == deletedID
            var positionOfDeletedIndex= this.allIdsReceita.findIndex(checkedID) + 1
            var allIdsReceitaNew = this.allIdsReceita.slice((positionOfDeletedIndex))
            return allIdsReceitaNew
        },

        testevencimento: function() {
            this.receitaData.forEach((match) => {
                var receitaDataVencimento = new Date(match.vencimento.split('/').reverse().join('-'))
                var date = new Date()
                var receitaDataVencimentoNewDate = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
                date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())
                if (new Date(receitaDataVencimentoNewDate) > receitaDataVencimento ) {
                    console.log(document.getElementById(match.key).className)
                }else {
                    document.getElementById(match.key).className = "or"
                }
            console.log(match)
            })
            return false
        }
    },

    updated() { 
            this.$nextTick(function () {
                if (this.receitaData.length != 0) {
                    this.receitaData.forEach((match) => {
                        var receitaDataVencimento = new Date(match.vencimento.split('/').reverse().join('-'))
                        var date = new Date()
                        var receitaDataVencimentoNewDate = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
                        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())
                        if (new Date(receitaDataVencimentoNewDate) > receitaDataVencimento ) {
                            document.getElementById(match.key).className = "flex text-xl w-full lg:w-auto p-3 text-red-500 text-center border-b border-blue-200 block lg:table-cell relative lg:static"
                        }else {
                            document.getElementById(match.key).className = "flex text-xl w-full lg:w-auto p-3 text-green-800 text-center border-b border-blue-200 block lg:table-cell relative lg:static"
                        }
                
                    })

                }
                
            })
        },

    methods: {

        printPageArea(){
            var image = new Image()
            image.src= "img/report.png"

            var currentDayAndHour = new Date().toLocaleString()
            var currentDaySplit = currentDayAndHour.split(" ")

            let i = 0
            var receitaDataPrint = []
            this.receitaData.map(function (match,index) {
                receitaDataPrint[index] = match
            })

            if (this.receitaData.length < 5 ) {
                while (i < 5) {
                    if (this.receitaData[i] == undefined) {

                        receitaDataPrint.push({
                            fornecedor:"",
                            vencimento:"",
                            data:"",
                            servico:"",
                            categoria:"-",
                            valor:0,
                            fpg:"",
                            controle:"",
                            descricao:"-",
                        })
                    }
                    i++ 
                }
            }
            const doc = new jsPDF();
            
            
            doc.autoTable({
                margin: { top: 20, left: 0, right: 0 },
                head: [['Fornecedor', 'Data', 'Vencimento', 'Servico', 'Categoria', 'Fpg', 'Controle', 'Valor', 'Descrição']],
                body: [
                    [receitaDataPrint[0].fornecedor, receitaDataPrint[0].data , receitaDataPrint[0].vencimento,receitaDataPrint[0].servico , receitaDataPrint[0].categoria, receitaDataPrint[0].fpg, receitaDataPrint[0].controle, receitaDataPrint[0].valor, receitaDataPrint[0].descricao],
                    [receitaDataPrint[1].fornecedor, receitaDataPrint[1].data , receitaDataPrint[1].vencimento,receitaDataPrint[1].servico , receitaDataPrint[1].categoria, receitaDataPrint[1].fpg, receitaDataPrint[1].controle, receitaDataPrint[1].valor, receitaDataPrint[1].descricao],
                    [receitaDataPrint[2].fornecedor, receitaDataPrint[2].data , receitaDataPrint[2].vencimento,receitaDataPrint[2].servico , receitaDataPrint[2].categoria, receitaDataPrint[2].fpg, receitaDataPrint[2].controle, receitaDataPrint[2].valor, receitaDataPrint[2].descricao],
                    [receitaDataPrint[3].fornecedor, receitaDataPrint[3].data , receitaDataPrint[3].vencimento,receitaDataPrint[3].servico , receitaDataPrint[3].categoria, receitaDataPrint[3].fpg, receitaDataPrint[3].controle, receitaDataPrint[3].valor, receitaDataPrint[3].descricao],
                    [receitaDataPrint[4].fornecedor, receitaDataPrint[4].data , receitaDataPrint[4].vencimento,receitaDataPrint[4].servico , receitaDataPrint[4].categoria, receitaDataPrint[4].fpg, receitaDataPrint[4].controle, receitaDataPrint[4].valor, receitaDataPrint[4].descricao],
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

            doc.save("Receita relatório " + `${currentDaySplit.[0]}` + ".pdf");

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
            }, 800)

            this.alertFiles = true
            // Create a reference under which you want to list
            var listRef = firebase.storage().ref("Boletos").child(keyID);

            // Find all the prefixes and items.
            this.receitaFiles= []
            this.receitaFilesID = []
            listRef.listAll()
            .then((res) => {
                res.items.forEach((itemRef) => {
                    this.receitaFiles.push({  
                        fileName:itemRef.name,
                    })
                    
                    this.receitaFilesID.push ({
                        keyID:keyID
                    })

                    this.emptyAnexos = false
                });
            }).catch((error) => {
                    console.log("Error catch" + error)
            });

            if(this.receitaFiles.length == 0) {
                this.emptyAnexos = true
                this.receitaFilesID.push({
                    keyID:keyID
                })
            }
            
        },

        uploadFile (event) {
        
            this.fileData = event.target.files[0]

            if(this.fileData != undefined && this.receitaFiles.length < 5) {
                var fileID = Math.floor((Math.random() * 10000000) + 1).toString()
                var uploadTask = firebase.storage().ref("Boletos").child(this.receitaFilesID[0].keyID + "/" + fileID).put(this.fileData)
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
                    this.emptyAnexos = false
                }, 
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                        console.log(url)
                        this.fileData = undefined
                        this.emptyAnexos = false
                        this.receitaFiles.push({
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
                var starsRef = firebase.storage().ref("Boletos").child(this.receitaFilesID[0].keyID + "/" + fileName);
                
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
            this.loadingFilesCategoria = true
            if(this.queryInput != "") {
                db.collection('receita')
                .where("query", "array-contains", this.queryInput.toLowerCase())
                .onSnapshot((snapshotChange) => {
                    this.receitaQuery=[]
                    snapshotChange.forEach((doc) => {
                        this.receitaQuery.push({
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
                            query:doc.data().query,
                            controle:doc.data().controle,
                            idNumberDoc:doc.data().idNumberDoc
                        })
                    })

                    var RefMounth = this.$refs.currentMonth

                    if(this.receitaQuery.length !== 0) {

                        setTimeout(() => {
                            this.loadingFilesCategoria = false;
                            this.searchisActive = true
                        }, 800)
                        
                        if(RefMounth.options.length == 12) {
                            var selectOptionForAdd = document.getElementById("monthSelectForAdd");
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

                        this.mappedreceitaQuery = this.receitaQuery.map(function (match) {
                            return match
                        })
                                
                        const mappedreceitaQueryFirstSlice = this.receitaQuery.slice(0,5)
                        
                        for (var i = 0; i < this.receitaData.length ; i++) {
                            this.receitaData = mappedreceitaQueryFirstSlice
                        }

                    }else {
                        if(RefMounth.options.length > 11) {
                            selectOptionForAdd = document.getElementById("monthSelectForAdd");
                            selectOptionForAdd.remove(12);
                        }

                        setTimeout(() => {
                            this.loadingFilesCategoria = false;
                            this.searchisActive = false
                            this.alertcategoria = true
                            this.alertMessage = true
                        }, 800)
                    }
                })
            }else {
                var RefMounth = this.$refs.currentMonth
                if(RefMounth.options.length > 11) {
                    var selectOptionForAdd = document.getElementById("monthSelectForAdd");
                        selectOptionForAdd.remove(12);
                }

                setTimeout(() => {
                    this.loadingFilesCategoria = false;
                    this.searchisActive = false
                    this.getDateFilter()
                }, 800)
            }
        },
    
        hideAlert () {
            this.alertcategoria = false;
            this.alertMessage = true;
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

            }else {
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
                db.collection('receita').orderBy("timestamp").limit(5).onSnapshot((snapshotChange) => {
                this.receitaData=[]
                snapshotChange.forEach((doc)=> {
                    this.receitaData.push ({
                        key:doc.id,
                        fornecedor:doc.data().fornecedor,
                        veiculo:doc.data().veiculo,
                        servico:doc.data().servico,
                        vencimento:doc.data().vencimento,
                        fpg:doc.data().fpg,
                        valor:doc.data().valor,
                        categoria:doc.data().categoria,
                        data:doc.data().data.split('-').reverse().join('/'),
                        tipo:doc.data().tipo,
                        descricao:doc.data().descricao.substring(0,10) + "...",
                        idNumberDoc:doc.data().idNumberDoc
                    })
                })
            })
            
        }
    },

        nextPage (event) {
            this.clickedPageValue = event.target.innerHTML
            var clickedPageValueInteger = parseInt(this.clickedPageValue,10)

            if(this.searchisActive == true) {
                if(this.receitaFPG != undefined) {
                    if (clickedPageValueInteger >  Math.ceil(this.receitaFPG.length/5) || clickedPageValueInteger >  Math.ceil(this.receitaDataMonth.length/5)) {
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
                    if (clickedPageValueInteger >  Math.ceil(this.receitaQuery.length/5)) {
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
                if(this.receitaFPG != undefined) {
                    if (clickedPageValueInteger >  Math.ceil(this.receitaFPG.length/5) || clickedPageValueInteger >  Math.ceil(this.receitaDataMonth.length/5)) {
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
                    if (clickedPageValueInteger >  Math.ceil(this.receitaDataMonth.length/5)) {
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
                    if(clickedPageValueInteger <= Math.ceil(this.receitaQuery.length/5)) {
                            if(clickedPageValueInteger > 0 ) {
                                var lastSliceQuery = clickedPageValueInteger * 5
                                var startSliceQuery = lastSliceQuery - 5

                                if(this.receitaData[0] != undefined && this.receitaQuery.length > startSliceQuery) {
                                    let i = 0
                                    while (i < this.receitaData.length) {
                                        this.receitaData = this.receitaQuery.slice(startSliceQuery, lastSliceQuery)
                                        i++
                                    }
                                }else {
                                    this.alertcategoria = true
                                    this.alertMessage = false
                                }
                            }
                        } 
                }else if (this.selectedFilterValue == "Valor mais alto"){
                    if(clickedPageValueInteger <= Math.ceil(this.ValuesAscen.length/5)) {
                            if (clickedPageValueInteger > 0 ) {
                                var lastSliceAscenQuery = clickedPageValueInteger * 5
                                var startSliceAscenQuery = lastSliceAscenQuery - 5
                                
                                if(this.receitaData[0] != undefined && this.ValuesAscen.length > startSliceAscenQuery) {
                                    let i = 0
                                    while (i < this.receitaData.length) {
                                        this.receitaData = this.ValuesAscen.slice(startSliceAscenQuery, lastSliceAscenQuery)
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

                }else if (this.selectedFilterValue == "Valor mais baixo") {
                    if(clickedPageValueInteger <= Math.ceil(this.ValuesDesc.length/5)) {
                            if (clickedPageValueInteger > 0 ) {
                                var lastSliceDescQuery = clickedPageValueInteger * 5
                                var startSliceDescQuery = lastSliceDescQuery - 5
                                
                                if(this.receitaData[0] != undefined && this.ValuesDesc.length > startSliceDescQuery) {
                                    let i = 0
                                    while (i < this.receitaData.length) {
                                        this.receitaData = this.ValuesDesc.slice(startSliceDescQuery, lastSliceDescQuery)
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

                }else if ( this.receitaFilter[0].clicked >= 7 && this.receitaFilter[0].clicked < 13 && this.receitaFPG.length > 5) {
                        if(clickedPageValueInteger <= Math.ceil(this.receitaFPG.length/5)) {
                            if (clickedPageValueInteger > 0 ) {
                                var lastSliceQueryFPG = clickedPageValueInteger * 5
                                var startSliceQueryFPG = lastSliceQueryFPG - 5
                                
                                if(this.receitaData[0] != undefined && this.receitaFPG.length > startSliceQueryFPG) {
                                    let i = 0
                                    while (i < this.receitaData.length) {
                                        this.receitaData = this.receitaFPG.slice(startSliceQueryFPG, lastSliceQueryFPG)
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
                }else if (this.receitaFilter[0].clicked >= 13 && this.receitaControle.length > 5) {
                    if(clickedPageValueInteger <= Math.ceil(this.receitaControle.length/5)) {
                            if (clickedPageValueInteger > 0 ) {
                                var lastSliceQueryControle = clickedPageValueInteger * 5
                                var startSliceQueryControle = lastSliceQueryControle - 5
                                
                                if(this.receitaData[0] != undefined && this.receitaControle.length > startSliceQueryControle) {
                                    let i = 0
                                    while (i < this.receitaData.length) {
                                        this.receitaData = this.receitaControle.slice(startSliceQueryControle, lastSliceQueryControle)
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
                    if(clickedPageValueInteger <= Math.ceil(this.receitaDataMonth.length/5)) {
                        if(clickedPageValueInteger > 0 ) {
                            var lastSliceMonthFilter = clickedPageValueInteger * 5
                            var startSliceMonthFilter = lastSliceMonthFilter - 5

                            if(this.receitaData[0] != undefined && this.receitaDataMonth.length > startSliceMonthFilter) {
                                let i = 0
                                while (i < this.receitaData.length) {
                                    this.receitaData = this.receitaDataMonth.slice(startSliceMonthFilter, lastSliceMonthFilter)
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
                
                    }else if(this.selectedFilterValue == "Valor mais alto") {
                    
                        if(clickedPageValueInteger <= Math.ceil(this.ValuesAscen.length/5)) {
                            if (clickedPageValueInteger > 0 ) {
                                var lastSliceAscen = clickedPageValueInteger * 5
                                var startSliceAscen = lastSliceAscen - 5
                                
                                if(this.receitaData[0] != undefined && this.ValuesAscen.length > startSliceAscen) {
                                    let i = 0
                                    while (i < this.receitaData.length) {
                                        this.receitaData = this.ValuesAscen.slice(startSliceAscen, lastSliceAscen)
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

                    }else if (this.selectedFilterValue == "Valor mais baixo") {

                        if(clickedPageValueInteger <= Math.ceil(this.ValuesDesc.length/5)) {
                            if (clickedPageValueInteger > 0 ) {
                                var lastSliceDesc = clickedPageValueInteger * 5
                                var startSliceDesc = lastSliceDesc - 5
                                
                                if(this.receitaData[0] != undefined && this.ValuesDesc.length > startSliceDesc) {
                                    let i = 0
                                    while (i < this.receitaData.length) {
                                        this.receitaData = this.ValuesDesc.slice(startSliceDesc, lastSliceDesc)
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
                    }else if ( this.receitaFilter[0].clicked >= 7 && this.receitaFilter[0].clicked < 13 && this.receitaFPG.length > 5) {
                        if(clickedPageValueInteger <= Math.ceil(this.receitaFPG.length/5)) {
                            if (clickedPageValueInteger > 0 ) {
                                var lastSliceFPG = clickedPageValueInteger * 5
                                var startSliceFPG = lastSliceFPG - 5
                                
                                if(this.receitaData[0] != undefined && this.receitaFPG.length > startSliceFPG) {
                                    let i = 0
                                    while (i < this.receitaData.length) {
                                        this.receitaData = this.receitaFPG.slice(startSliceFPG, lastSliceFPG)
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
                    }else if (this.receitaFilter[0].clicked >= 13 && this.receitaControle.length > 5) {
                        if(clickedPageValueInteger <= Math.ceil(this.receitaControle.length/5)) {
                            if (clickedPageValueInteger > 0 ) {
                                var lastSliceControle = clickedPageValueInteger * 5
                                var startSliceControle = lastSliceControle - 5
                                
                                if(this.receitaData[0] != undefined && this.receitaControle.length > startSliceControle) {
                                    let i = 0
                                    while (i < this.receitaData.length) {
                                        this.receitaData = this.receitaControle.slice(startSliceControle, lastSliceControle)
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
                }

            /*        
            }else {
                if(clickedPageValueInteger <= Math.ceil(this.receitaDataMonth.length/5 )) {
                    
                    if(clickedPageValueInteger > 0 ) {
                        var lastSliceMonth = clickedPageValueInteger * 5
                        var startSliceMonth = lastSliceMonth - 5

                        if (this.receitaData[0] != undefined && this.receitaDataMonth.length > startSliceMonth) {    
                                let i = 0
                                while (i < this.receitaData.length) {
                                    this.receitaData = this.receitaDataMonth.slice(startSliceMonth, lastSliceMonth)
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
                db.collection('receita').where("page", "==", clickedPageValueInteger).orderBy("timestamp").limit(5).get().then((querySnapshot) => {
                    this.receitaData=[]
                    querySnapshot.forEach((doc) => {
                        this.receitaData.push ({
                            key:doc.id,
                            fornecedor:doc.data().fornecedor,
                            veiculo:doc.data().veiculo,
                            servico:doc.data().servico,
                            vencimento:doc.data().vencimento,
                            fpg:doc.data().fpg,
                            valor:doc.data().valor,
                            categoria:doc.data().categoria,
                            data:doc.data().data.split('-').reverse().join('/'),
                            tipo:doc.data().tipo,
                            controle:doc.data().controle,
                            descricao:doc.data().descricao.substring(0,10) + "...",
                            idNumberDoc:doc.data().idNumberDoc
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

            db.collection('receita')
            .where("mes", "==" ,RefMounthFailedFPG.options[RefMounthFailedFPG.selectedIndex].text)
            .where("ano", "==", RefYearValorFailedFPG.options[RefYearValorFailedFPG.selectedIndex].text)
            .orderBy("timestamp")
            .get()
            .then((snapshotChange => {
            this.receitaPageOnAdd=[]
            snapshotChange.forEach((doc) => {
                this.receitaPageOnAdd.push({
                    key:doc.id,
                    fornecedor:doc.data().fornecedor,
                    servico:doc.data().servico,
                    vencimento:doc.data().vencimento,
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

            var pagesCalculatedArray = []
            var indexPagesCalculatedArray = 0
            this.receitaPageOnAdd.map(function (match,index) {
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
            this.receitaData=[]
            while (i < pagesCalculatedArray[pagesCalculatedArray.length-1].length) {
                this.receitaData[i] = pagesCalculatedArray[pagesCalculatedArray.length-1].[i]
                i++
            }

            let clickedPageValue = Math.ceil((this.receitaPageOnAdd.length + 1) / 5)
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

            /*
            var pageArray = []
            var lastAddPage = []
            let i = 1
            while (i < 6) {

                var currentIndex = this.receitaPageOnAdd.indexOf(this.receitaPageOnAdd[this.receitaPageOnAdd.length-i])
                var pageCalculated = Math.ceil((currentIndex+1) / 5)

                pageArray.push({
                    page:pageCalculated,
                    element:this.receitaPageOnAdd[this.receitaPageOnAdd.length-i]
                })

                var highestPage = pageArray[pageArray.length-1].page
                
                i++
            }

            pageArray.map(function (match) {
                if(match.page == highestPage) {
                    lastAddPage.push(match)
                }
            })

            console.log(lastAddPage)
            let a = 0
            while (a < this.receitaData.length) {
                this.receitaData[a] = lastAddPage[a].element
                a++
            }





            
            var currentIndex = this.receitaPageOnAdd.indexOf(this.receitaPageOnAdd[this.receitaPageOnAdd.length-i])
            var pageCalculated = Math.ceil((currentIndex+1) / 5)

            let clickedPageValue = pageCalculated
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
        

        
            db.collection('receita').where("page", "==", clickedPageValue).orderBy("timestamp").limit(5).get().then((querySnapshot) => {
                this.receitaData=[]
                querySnapshot.forEach((doc) => {
                    this.receitaData.push ({
                        key:doc.id,
                            fornecedor:doc.data().fornecedor,
                            veiculo:doc.data().veiculo,
                            servico:doc.data().servico,
                            vencimento:doc.data().vencimento,
                            fpg:doc.data().fpg,
                            valor:doc.data().valor,
                            categoria:doc.data().categoria,
                            data:doc.data().data.split('-').reverse().join('/'),
                            tipo:doc.data().tipo,
                            controle:doc.data().controle,
                            descricao:doc.data().descricao.substring(0,10) + "...",
                            idNumberDoc:doc.data().idNumberDoc
                    })
                })
            })

            */
        },

        getDateFilter () {
            /*
            console.log(RefMounth.options.selectedIndex=0)
            */
            var RefMounth = this.$refs.currentMonth
            var RefYear = this.$refs.yearselect
            this.receitaFPG = undefined

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

            db.collection('receita')
            .where("mes", "==" ,RefMounth.options[RefMounth.selectedIndex].text)
            .where("ano", "==", RefYear.options[RefYear.selectedIndex].text)
            .orderBy("timestamp")
            .onSnapshot((snapshotChange) => {
                this.receitaDataMonth=[]
                snapshotChange.forEach((doc)=> {
                    this.receitaDataMonth.push ({
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
                        controle:doc.data().controle,
                        idNumberDoc:doc.data().idNumberDoc
                    })
                })
                
                if(this.receitaDataMonth.length !== 0 ) {

                    if(RefMounth.options.length > 11) {
                        var selectOptionForAdd = document.getElementById("monthSelectForAdd");
                        selectOptionForAdd.remove(12);
                    }

                    this.lastSuccessfulMonthEntry = RefMounth.options.selectedIndex

                    this.queryInput = ''
                    this.searchisActive = false

                    this.mappedreceitaDataMonth = this.receitaDataMonth.map(function (match) {
                        return match
                    })
                            
                    const mappedreceitaDataMonthFirstSlice = this.receitaDataMonth.slice(0,5)
                    
                    for (var i = 0; i < this.receitaData.length ; i++) {
                        this.receitaData = mappedreceitaDataMonthFirstSlice
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

            this.receitaFilter.forEach(function (match) {
                match.clicked = event.target.selectedIndex
            })

            if(this.searchisActive == true) {
                if(this.selectedFilterValue == "Sem filtro" || this.selectedFilterValue == "Adição mais antigo") {

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

                    db.collection('receita')
                    .where("query", "array-contains", this.queryInput.toLowerCase())
                    .orderBy("data")
                    .onSnapshot((snapshotChange) => {
                        this.receitaQuery=[]
                        snapshotChange.forEach((doc) => {
                            this.receitaQuery.push({
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
                                query:doc.data().query,
                                controle:doc.data().controle,
                                idNumberDoc:doc.data().idNumberDoc
                            })
                        })

                        if(this.receitaQuery.length !== 0) {
                        this.mappedreceitaQuery = this.receitaQuery.map(function (match) {
                            return match
                        })
                                
                        const mappedreceitaQueryFirstSlice = this.receitaQuery.slice(0,5)
                        
                        for (var i = 0; i < this.receitaData.length ; i++) {
                            this.receitaData = mappedreceitaQueryFirstSlice
                        }

                        }else {
                            this.alertcategoria = true
                            this.alertMessage = true
                        }

                    })

                    }else if (this.selectedFilterValue == "Adição mais recente") {

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

                    db.collection('receita')
                    .where("query", "array-contains", this.queryInput.toLowerCase())
                    .orderBy("data", "desc")
                    .onSnapshot((snapshotChange) => {
                    this.receitaQuery=[]
                    snapshotChange.forEach((doc) => {
                        this.receitaQuery.push({
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
                            query:doc.data().query,
                            controle:doc.data().controle,
                            idNumberDoc:doc.data().idNumberDoc
                        })
                    })

                        if(this.receitaQuery.length !== 0) {
                        this.mappedreceitaQuery = this.receitaQuery.map(function (match) {
                            return match
                        })
                                
                        const mappedreceitaQueryFirstSlice = this.receitaQuery.slice(0,5)
                        
                        for (var i = 0; i < this.receitaData.length ; i++) {
                            this.receitaData = mappedreceitaQueryFirstSlice
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

                    db.collection('receita')
                    .where("query", "array-contains", this.queryInput.toLowerCase())
                    .orderBy("valor")
                    .onSnapshot((snapshotChange) => {
                        this.ValuesDesc=[]
                        snapshotChange.forEach((doc) => {
                            this.ValuesDesc.push({
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
                                query:doc.data().query,
                                controle:doc.data().controle,
                                idNumberDoc:doc.data().idNumberDoc
                            })
                        })
                        
                        var slicedValuesDesc = this.ValuesDesc.slice(0,5)

                        for (var a=0 ; a < this.receitaData.length; a++) {
                            this.receitaData = slicedValuesDesc
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

                    db.collection('receita')
                    .where("query", "array-contains", this.queryInput.toLowerCase())
                    .orderBy("valor", "desc")
                    .onSnapshot((snapshotChange) => {
                        this.ValuesAscen=[]
                        snapshotChange.forEach((doc) => {
                            this.ValuesAscen.push({
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
                                query:doc.data().query,
                                controle:doc.data().controle,
                                idNumberDoc:doc.data().idNumberDoc
                            })
                        })
                        var slicedValuesAscen = this.ValuesAscen.slice(0,5)

                        for (var i=0 ; i < this.receitaData.length; i++) {
                            this.receitaData = slicedValuesAscen
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
                
                    db.collection('receita')
                    .where("query", "array-contains", this.queryInput.toLowerCase())
                    .orderBy("vencimento")
                    .onSnapshot((snapshotChange) => {
                        this.receitaDataMonth=[]
                        snapshotChange.forEach((doc)=> {
                            this.receitaDataMonth.push ({
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
                                controle:doc.data().controle,
                                idNumberDoc:doc.data().idNumberDoc
                            })
                        })

                        if(this.receitaDataMonth.length !== 0) {
                        this.mappedreceitaDataMonth = this.receitaDataMonth.map(function (match) {
                            return match
                        })
                                
                        const mappedreceitaDataMonthFirstSlice = this.receitaDataMonth.slice(0,5)
                        
                        for (var i = 0; i < this.receitaData.length ; i++) {
                            this.receitaData = mappedreceitaDataMonthFirstSlice
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
                    
                    db.collection('receita')
                    .where("query", "array-contains", this.queryInput.toLowerCase())
                    .orderBy("vencimento", "desc")
                    .onSnapshot((snapshotChange) => {
                        this.receitaDataMonth=[]
                        snapshotChange.forEach((doc)=> {
                            this.receitaDataMonth.push ({
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
                                controle:doc.data().controle,
                                idNumberDoc:doc.data().idNumberDoc
                            })
                        })

                        if(this.receitaDataMonth.length !== 0) {
                        this.mappedreceitaDataMonth = this.receitaDataMonth.map(function (match) {
                            return match
                        })
                                
                        const mappedreceitaDataMonthFirstSlice = this.receitaDataMonth.slice(0,5)
                        
                        for (var i = 0; i < this.receitaData.length ; i++) {
                            this.receitaData = mappedreceitaDataMonthFirstSlice
                        }

                        }else {
                            this.alertcategoria = true
                            this.alertMessage = true
                        }

                    })
                }else if (event.target.selectedIndex >= 7 && event.target.selectedIndex < 13) {

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

                    db.collection('receita')
                    .where("query", "array-contains", this.queryInput.toLowerCase())
                    .where("fpg", "==", this.selectedFilterValue)
                    .orderBy("valor")
                    .onSnapshot((snapshotChange) => {
                        this.receitaFPG=[]
                        snapshotChange.forEach((doc)=> {
                            this.receitaFPG.push ({
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
                                controle:doc.data().controle,
                                idNumberDoc:doc.data().idNumberDoc
                            })
                        })

                        if(this.receitaFPG.length !== 0) {
                        this.mappedreceitaFPG = this.receitaFPG.map(function (match) {
                            return match
                        })
                                
                        const mappedreceitaFPGFirstSlice = this.receitaFPG.slice(0,5)
                        
                        for (var i = 0; i < this.receitaData.length ; i++) {
                            this.receitaData = mappedreceitaFPGFirstSlice
                        }

                        }else {
                            this.selectedFilterValue= "Sem filtro"
                            this.receitaFPG = undefined
                            
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

                            db.collection('receita')
                            .where("query", "array-contains", this.queryInput.toLowerCase())
                            .orderBy("data")
                            .onSnapshot((snapshotChange) => {
                                this.receitaQuery=[]
                                snapshotChange.forEach((doc) => {
                                    this.receitaQuery.push({
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
                                        query:doc.data().query,
                                        controle:doc.data().controle,
                                        idNumberDoc:doc.data().idNumberDoc
                                    })
                                })

                                if(this.receitaQuery.length !== 0) {
                                this.mappedreceitaQuery = this.receitaQuery.map(function (match) {
                                    return match
                                })
                                        
                                const mappedreceitaQueryFirstSlice = this.receitaQuery.slice(0,5)
                                
                                for (var i = 0; i < this.receitaData.length ; i++) {
                                    this.receitaData = mappedreceitaQueryFirstSlice
                                }

                                }else {
                                    this.alertcategoria = true
                                    this.alertMessage = true
                                }

                            })
                        }

                    })
                }else if (event.target.selectedIndex >= 13) {
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

                    db.collection('receita')
                    .where("query", "array-contains", this.queryInput.toLowerCase())
                    .where("controle", "==", this.selectedFilterValue)
                    .orderBy("valor")
                    .onSnapshot((snapshotChange) => {
                        this.receitaControle=[]
                        snapshotChange.forEach((doc)=> {
                            this.receitaControle.push ({
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
                                controle:doc.data().controle,
                                idNumberDoc:doc.data().idNumberDoc
                            })
                        })

                        if(this.receitaControle.length !== 0) {
                        this.mappedreceitaControle = this.receitaControle.map(function (match) {
                            return match
                        })
                                
                        const mappedreceitaControleFirstSlice = this.receitaControle.slice(0,5)
                        
                        for (var i = 0; i < this.receitaData.length ; i++) {
                            this.receitaData = mappedreceitaControleFirstSlice
                        }

                        }else {
                            this.selectedFilterValue= "Sem filtro"
                            this.receitaControle = undefined
                            
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

                            db.collection('receita')
                            .where("query", "array-contains", this.queryInput.toLowerCase())
                            .orderBy("data")
                            .onSnapshot((snapshotChange) => {
                                this.receitaQuery=[]
                                snapshotChange.forEach((doc) => {
                                    this.receitaQuery.push({
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
                                        query:doc.data().query,
                                        controle:doc.data().controle,
                                        idNumberDoc:doc.data().idNumberDoc
                                    })
                                })

                                if(this.receitaQuery.length !== 0) {
                                this.mappedreceitaQuery = this.receitaQuery.map(function (match) {
                                    return match
                                })
                                        
                                const mappedreceitaQueryFirstSlice = this.receitaQuery.slice(0,5)
                                
                                for (var i = 0; i < this.receitaData.length ; i++) {
                                    this.receitaData = mappedreceitaQueryFirstSlice
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
                if(this.selectedFilterValue == "Sem filtro" || this.selectedFilterValue == "Adição mais antigo") {

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

                    db.collection('receita')
                    .where("mes", "==" ,RefMounth.options[RefMounth.selectedIndex].text)
                    .where("ano", "==", RefYear.options[RefYear.selectedIndex].text)
                    .orderBy("data")
                    .onSnapshot((snapshotChange) => {
                        this.receitaDataMonth=[]
                        snapshotChange.forEach((doc)=> {
                            this.receitaDataMonth.push ({
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
                                controle:doc.data().controle,
                                idNumberDoc:doc.data().idNumberDoc
                            })
                        })

                        if(this.receitaDataMonth.length !== 0) {
                        this.mappedreceitaDataMonth = this.receitaDataMonth.map(function (match) {
                            return match
                        })
                                
                        const mappedreceitaDataMonthFirstSlice = this.receitaDataMonth.slice(0,5)
                        
                        for (var i = 0; i < this.receitaData.length ; i++) {
                            this.receitaData = mappedreceitaDataMonthFirstSlice
                        }

                        }else {
                            this.alertcategoria = true
                            this.alertMessage = true
                        }

                    })

                    }else if (this.selectedFilterValue == "Adição mais recente") {

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

                    db.collection('receita')
                    .where("mes", "==" ,RefMonthFilterOldest.options[RefMonthFilterOldest.selectedIndex].text)
                    .where("ano", "==", RefYearFilterOldest.options[RefYearFilterOldest.selectedIndex].text)
                    .orderBy("data", "desc")
                    .onSnapshot((snapshotChange) => {
                        this.receitaDataMonth=[]
                        snapshotChange.forEach((doc)=> {
                            this.receitaDataMonth.push ({
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
                                controle:doc.data().controle,
                                idNumberDoc:doc.data().idNumberDoc
                            })
                        })

                        if(this.receitaDataMonth.length !== 0) {
                        this.mappedreceitaDataMonth = this.receitaDataMonth.map(function (match) {
                            return match
                        })
                                
                        const mappedreceitaDataMonthFirstSlice = this.receitaDataMonth.slice(0,5)
                        
                        for (var i = 0; i < this.receitaData.length ; i++) {
                            this.receitaData = mappedreceitaDataMonthFirstSlice
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

                    db.collection('receita')
                    .where("mes", "==" ,RefMounthValorFilter.options[RefMounthValorFilter.selectedIndex].text)
                    .where("ano", "==", RefYearValorFilter.options[RefYearValorFilter.selectedIndex].text)
                    .where("valor", ">", 0)
                    .orderBy("valor")
                    .onSnapshot((snapshotChange => {
                    this.ValuesDesc=[]
                    snapshotChange.forEach((doc) => {
                        this.ValuesDesc.push({
                            key:doc.id,
                            fornecedor:doc.data().fornecedor,
                            veiculo:doc.data().veiculo,
                            servico:doc.data().servico,
                            vencimento:doc.data().vencimento,
                            fpg:doc.data().fpg,
                            valor:doc.data().valor,
                            categoria:doc.data().categoria,
                            data:doc.data().data.split('-').reverse().join('/'),
                            tipo:doc.data().tipo,
                            descricao:doc.data().descricao.substring(0,10) + "...",
                            page:doc.data().page,
                            controle:doc.data().controle,
                            idNumberDoc:doc.data().idNumberDoc
                            })
                        });
                        var slicedValuesDesc = this.ValuesDesc.slice(0,5)

                        for (var a=0 ; a < this.receitaData.length; a++) {
                            this.receitaData = slicedValuesDesc
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

                    db.collection('receita')
                    .where("mes", "==" ,RefMounthValorAscenFilter.options[RefMounthValorAscenFilter.selectedIndex].text)
                    .where("ano", "==", RefYearValorAscenFilter.options[RefYearValorAscenFilter.selectedIndex].text)
                    .where("valor", ">", 0)
                    .orderBy("valor", "desc")
                    .onSnapshot((snapshotChange => {
                    this.ValuesAscen=[]
                    snapshotChange.forEach((doc) => {
                        this.ValuesAscen.push({
                            key:doc.id,
                            fornecedor:doc.data().fornecedor,
                            veiculo:doc.data().veiculo,
                            servico:doc.data().servico,
                            vencimento:doc.data().vencimento,
                            fpg:doc.data().fpg,
                            valor:doc.data().valor,
                            categoria:doc.data().categoria,
                            data:doc.data().data.split('-').reverse().join('/'),
                            tipo:doc.data().tipo,
                            descricao:doc.data().descricao.substring(0,10) + "...",
                            page:doc.data().page,
                            controle:doc.data().controle,
                            idNumberDoc:doc.data().idNumberDoc
                            })
                        });
                        var slicedValuesAscen = this.ValuesAscen.slice(0,5)

                        for (var i=0 ; i < this.receitaData.length; i++) {
                            this.receitaData = slicedValuesAscen
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

                    db.collection('receita')
                    .where("mes", "==" ,RefMounthVencimento.options[RefMounthVencimento.selectedIndex].text)
                    .where("ano", "==", RefYearValorVencimento.options[RefYearValorVencimento.selectedIndex].text)
                    .orderBy("vencimento")
                    .onSnapshot((snapshotChange) => {
                        this.receitaDataMonth=[]
                        snapshotChange.forEach((doc)=> {
                            this.receitaDataMonth.push ({
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
                                controle:doc.data().controle,
                                idNumberDoc:doc.data().idNumberDoc
                            })
                        })

                        if(this.receitaDataMonth.length !== 0) {
                        this.mappedreceitaDataMonth = this.receitaDataMonth.map(function (match) {
                            return match
                        })
                                
                        const mappedreceitaDataMonthFirstSlice = this.receitaDataMonth.slice(0,5)
                        
                        for (var i = 0; i < this.receitaData.length ; i++) {
                            this.receitaData = mappedreceitaDataMonthFirstSlice
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

                    db.collection('receita')
                    .where("mes", "==" ,RefMounthVencimentoOldest.options[RefMounthVencimentoOldest.selectedIndex].text)
                    .where("ano", "==", RefYearValorVencimentoOldest.options[RefYearValorVencimentoOldest.selectedIndex].text)
                    .orderBy("vencimento", "desc")
                    .onSnapshot((snapshotChange) => {
                        this.receitaDataMonth=[]
                        snapshotChange.forEach((doc)=> {
                            this.receitaDataMonth.push ({
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
                                controle:doc.data().controle,
                                idNumberDoc:doc.data().idNumberDoc
                            })
                        })

                        if(this.receitaDataMonth.length !== 0) {
                        this.mappedreceitaDataMonth = this.receitaDataMonth.map(function (match) {
                            return match
                        })
                                
                        const mappedreceitaDataMonthFirstSlice = this.receitaDataMonth.slice(0,5)
                        
                        for (var i = 0; i < this.receitaData.length ; i++) {
                            this.receitaData = mappedreceitaDataMonthFirstSlice
                        }

                        }else {
                            this.alertcategoria = true
                            this.alertMessage = true
                        }

                    })
                }else if (event.target.selectedIndex >= 7 && event.target.selectedIndex < 13) {

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

                    db.collection('receita')
                    .where("mes", "==" ,RefMounthVencimentoFPG.options[RefMounthVencimentoFPG.selectedIndex].text)
                    .where("ano", "==", RefYearValorVencimentoFPG.options[RefYearValorVencimentoFPG.selectedIndex].text)
                    .where("fpg", "==", this.selectedFilterValue)
                    .orderBy("valor")
                    .onSnapshot((snapshotChange) => {
                        this.receitaFPG=[]
                        snapshotChange.forEach((doc)=> {
                            this.receitaFPG.push ({
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
                                controle:doc.data().controle,
                                idNumberDoc:doc.data().idNumberDoc
                            })
                        })

                        if(this.receitaFPG.length !== 0) {
                        this.mappedreceitaFPG = this.receitaFPG.map(function (match) {
                            return match
                        })
                                
                        const mappedreceitaFPGFirstSlice = this.receitaFPG.slice(0,5)
                        
                        for (var i = 0; i < this.receitaData.length ; i++) {
                            this.receitaData = mappedreceitaFPGFirstSlice
                        }

                        }else {
                            this.selectedFilterValue= "Sem filtro"
                            this.receitaFPG = undefined
                            
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

                            db.collection('receita')
                            .where("mes", "==" ,RefMounthFailedFPG.options[RefMounthFailedFPG.selectedIndex].text)
                            .where("ano", "==", RefYearValorFailedFPG.options[RefYearValorFailedFPG.selectedIndex].text)
                            .orderBy("data")
                            .onSnapshot((snapshotChange) => {
                                this.receitaDataMonth=[]
                                snapshotChange.forEach((doc)=> {
                                    this.receitaDataMonth.push ({
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
                                        controle:doc.data().controle,
                                        idNumberDoc:doc.data().idNumberDoc
                                    })
                                })

                                if(this.receitaDataMonth.length !== 0) {
                                this.mappedreceitaDataMonth = this.receitaDataMonth.map(function (match) {
                                    return match
                                })
                                        
                                const mappedreceitaDataMonthFirstSlice = this.receitaDataMonth.slice(0,5)
                                
                                for (var i = 0; i < this.receitaData.length ; i++) {
                                    this.receitaData = mappedreceitaDataMonthFirstSlice
                                }

                                }else {
                                    this.alertcategoria = true
                                    this.alertMessage = true
                                }

                            })
                            
                        }

                    })
                }else if (event.target.selectedIndex >= 13) {
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

                    var RefMounthControle = this.$refs.currentMonth
                    var RefYearValorControle = this.$refs.yearselect

                    db.collection('receita')
                    .where("mes", "==" ,RefMounthControle.options[RefMounthControle.selectedIndex].text)
                    .where("ano", "==", RefYearValorControle.options[RefYearValorControle.selectedIndex].text)
                    .where("controle", "==", this.selectedFilterValue)
                    .orderBy("valor")
                    .onSnapshot((snapshotChange) => {
                        this.receitaControle=[]
                        snapshotChange.forEach((doc)=> {
                            this.receitaControle.push ({
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
                                controle:doc.data().controle,
                                idNumberDoc:doc.data().idNumberDoc
                            })
                        })

                        if(this.receitaControle.length !== 0) {
                        this.mappedreceitaControle = this.receitaControle.map(function (match) {
                            return match
                        })
                                
                        const mappedreceitaControleFirstSlice = this.receitaControle.slice(0,5)
                        
                        for (var i = 0; i < this.receitaData.length ; i++) {
                            this.receitaData = mappedreceitaControleFirstSlice
                        }

                        }else {
                            this.selectedFilterValue= "Sem filtro"
                            this.receitaControle = undefined
                            
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

                            db.collection('receita')
                            .where("mes", "==" ,RefMounthFailedFPG.options[RefMounthFailedFPG.selectedIndex].text)
                            .where("ano", "==", RefYearValorFailedFPG.options[RefYearValorFailedFPG.selectedIndex].text)
                            .orderBy("data")
                            .onSnapshot((snapshotChange) => {
                                this.receitaDataMonth=[]
                                snapshotChange.forEach((doc)=> {
                                    this.receitaDataMonth.push ({
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
                                        controle:doc.data().controle,
                                        idNumberDoc:doc.data().idNumberDoc
                                    })
                                })

                                if(this.receitaDataMonth.length !== 0) {
                                this.mappedreceitaDataMonth = this.receitaDataMonth.map(function (match) {
                                    return match
                                })
                                        
                                const mappedreceitaDataMonthFirstSlice = this.receitaDataMonth.slice(0,5)
                                
                                for (var i = 0; i < this.receitaData.length ; i++) {
                                    this.receitaData = mappedreceitaDataMonthFirstSlice
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
            if(this.receitaNew.descricao == undefined) {
                this.receitaNew.descricao = "."}

            if(this.receitaNew.ndeparcelas == undefined) {
                this.receitaNew.ndeparcelas = 1
            }
            this.receitaNew.page = Math.ceil((this.totalOfDocs + 1) / 5)
            this.receitaNew.idNumberDoc = this.totalOfDocs + 1
            
            this.ValuesAscen.push(this.receitaNew)
            this.ValuesDesc.push(this.receitaNew)

            const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
            ];
            var monthGetDate = this.receitaNew.data
            
            var monthValue = monthGetDate.split('-')[1];
            var monthAdd = null

            if (monthValue.includes("0") && monthValue != "10" && monthValue != "0" )  {
                var monthValueNoZero = monthGetDate.split('-')[1].split("0")[1]
                monthAdd = monthNames[monthValueNoZero-1]
            }else {
                monthAdd = monthNames[monthValue-1]
            }

            var yearAdd = new Date (this.receitaNew.data).getFullYear().toString()

            var RefMounth = this.$refs.currentMonth
            var RefYear = this.$refs.yearselect

            var inputsReceitaNew = new Array(this.receitaNew)
            

            inputsReceitaNew.push({
                valor:this.numeroAntesInputAdd,
                categoria:this.selectedId,
                tipo:this.selectedValue,
                controle:this.selectedValueControle,
                fpg:this.selectedValueFPG
            })
            
            this.addDiv = false

            if (this.receitaNew.ndeparcelas > 1 ) {
                var numberOfParcelas = this.receitaNew.ndeparcelas
                monthNames.map(function (match,index) {
                    if (match == RefMounth.options[RefMounth.selectedIndex].text) {
                        let i = 0
                        var nextCount = 0
                        var selectedIndex = index
                        var yearSelected = RefYear.options[RefYear.selectedIndex].text
                        while (i < numberOfParcelas) {
                            var querySubstringFornecedor = []
                            var querySubstringDescricao = []
                            var querySubstringServico = []

                            if (inputsReceitaNew[0].fornecedor != undefined) {
                                var queryFornecedor = inputsReceitaNew[0].fornecedor.toLowerCase()
                                querySubstringFornecedor = queryFornecedor.split(" ")
                            }
                            if (inputsReceitaNew[0].descricao != undefined) {
                                var queryDescricao = inputsReceitaNew[0].descricao.toLowerCase()
                                querySubstringDescricao = queryDescricao.split(" ")
                            }
                            if (inputsReceitaNew[0].servico != undefined) {
                                var queryServico = inputsReceitaNew[0].servico.toLowerCase()
                                querySubstringServico = queryServico.split(" ")
                            }

                            var querySubstringCategoria = inputsReceitaNew[1].categoria.toLowerCase().split(" ")

                            if(selectedIndex + i > 11) {

                                var queryArray = querySubstringFornecedor.concat(querySubstringDescricao,querySubstringServico,querySubstringCategoria)
                                queryArray.push(
                                    inputsReceitaNew[1].valor,
                                    inputsReceitaNew[1].categoria.toLowerCase(),
                                    inputsReceitaNew[1].controle.toLowerCase(),
                                    monthNames[nextCount],
                                    (parseInt(yearSelected) + 1).toString(),
                                    inputsReceitaNew[0].data.split('-').reverse().join('/'),
                                    inputsReceitaNew[0].vencimento.split('-').reverse().join('/'),
                                    inputsReceitaNew[1].fpg.toLowerCase(),
                                    inputsReceitaNew[0].page,
                                    inputsReceitaNew[0].idNumberDoc,
                                    i+1 + "/" + inputsReceitaNew[0].ndeparcelas)


                                db.collection("receita").add({
                                    fornecedor: inputsReceitaNew[0].fornecedor,
                                    data: inputsReceitaNew[0].data,
                                    valor: inputsReceitaNew[1].valor,
                                    categoria: inputsReceitaNew[1].categoria,
                                    tipo: inputsReceitaNew[1].tipo, 
                                    descricao: inputsReceitaNew[0].descricao,
                                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                                    controle:inputsReceitaNew[1].controle + `(${i+1}/${numberOfParcelas})`,
                                    vencimento:inputsReceitaNew[0].vencimento,
                                    servico:inputsReceitaNew[0].servico,
                                    fpg:inputsReceitaNew[1].fpg,
                                    page:inputsReceitaNew[0].page,
                                    mes:monthNames[nextCount],
                                    ano:(parseInt(yearSelected) + 1).toString(),
                                    idNumberDoc:inputsReceitaNew[0].idNumberDoc,
                                    ndeparcelas:i+1 + "/" + inputsReceitaNew[0].ndeparcelas,
                                    query:queryArray
                                })
                                nextCount++
                            }else {
                                var queryArrayParcelmentoCurto = querySubstringFornecedor.concat(querySubstringDescricao,querySubstringServico,querySubstringCategoria)

                                queryArrayParcelmentoCurto.push(
                                    inputsReceitaNew[1].valor,
                                    inputsReceitaNew[1].categoria.toLowerCase(),
                                    inputsReceitaNew[1].controle.toLowerCase(),
                                    monthNames[selectedIndex+i],
                                    yearAdd,
                                    inputsReceitaNew[0].data.split('-').reverse().join('/'),
                                    inputsReceitaNew[0].vencimento.split('-').reverse().join('/'),
                                    inputsReceitaNew[1].fpg.toLowerCase(),
                                    inputsReceitaNew[0].page,
                                    inputsReceitaNew[0].idNumberDoc,
                                    i+1 + "/" + inputsReceitaNew[0].ndeparcelas)
                                
                                db.collection('receita').add({
                                    fornecedor: inputsReceitaNew[0].fornecedor,
                                    data: inputsReceitaNew[0].data,
                                    valor: inputsReceitaNew[1].valor,
                                    categoria: inputsReceitaNew[1].categoria,
                                    tipo: inputsReceitaNew[1].tipo, 
                                    descricao: inputsReceitaNew[0].descricao,
                                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                                    controle:inputsReceitaNew[1].controle + `(${i+1}/${numberOfParcelas})`,
                                    vencimento:inputsReceitaNew[0].vencimento,
                                    servico:inputsReceitaNew[0].servico,
                                    fpg:inputsReceitaNew[1].fpg,
                                    page:inputsReceitaNew[0].page,
                                    mes:monthNames[selectedIndex+i],
                                    ano:yearAdd,
                                    idNumberDoc:inputsReceitaNew[0].idNumberDoc,
                                    ndeparcelas: i+1 + "/" + inputsReceitaNew[0].ndeparcelas,
                                    query:queryArrayParcelmentoCurto
                                })
                                
                            }
                            i++
                        }
                    }
                })
            }else {
                var querySubstringFornecedor = []
                var querySubstringDescricao = []
                var querySubstringServico = []


                if (this.receitaNew.fornecedor != undefined) {
                    var queryFornecedor = this.receitaNew.fornecedor.toLowerCase()
                    querySubstringFornecedor = queryFornecedor.split(" ")
                }
                if (this.receitaNew.descricao != undefined) {
                    var queryDescricao = this.receitaNew.descricao.toLowerCase()
                    querySubstringDescricao = queryDescricao.split(" ")
                }
                if (this.receitaNew.servico != undefined) {
                    var queryServico = this.receitaNew.servico.toLowerCase()
                    querySubstringServico = queryServico.split(" ")
                }

                var querySubstringCategoria = this.selectedId.toLowerCase().split(" ")

                var queryArray = querySubstringFornecedor.concat(querySubstringDescricao,querySubstringServico,querySubstringCategoria)
                queryArray.push(
                    this.numeroAntesInputAdd,
                    this.selectedId.toLowerCase(),
                    this.selectedValueControle.toLowerCase(),
                    monthAdd,
                    yearAdd,
                    this.receitaNew.data.split('-').reverse().join('/'),
                    this.receitaNew.vencimento.split('-').reverse().join('/'),
                    this.selectedValueFPG.toLowerCase(),
                    this.receitaNew.page,
                    this.receitaNew.idNumberDoc,
                    this.receitaNew.ndeparcelas)

                db.collection('receita').add({
                    fornecedor: this.receitaNew.fornecedor,
                    data: this.receitaNew.data,
                    valor: this.numeroAntesInputAdd,
                    categoria: this.selectedId,
                    tipo: this.selectedValue, 
                    descricao: this.receitaNew.descricao,
                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                    controle:this.selectedValueControle,
                    vencimento:this.receitaNew.vencimento,
                    servico:this.receitaNew.servico,
                    fpg:this.selectedValueFPG,
                    page:this.receitaNew.page,
                    mes:monthAdd,
                    ano:yearAdd,
                    idNumberDoc:this.receitaNew.idNumberDoc,
                    ndeparcelas:this.receitaNew.ndeparcelas,
                    query:queryArray
                })
            }
            this.updatePageOnAdd();
        },

        deleteData (id){
            this.deleteID = id;

            if (window.confirm("Você quer realmente deletar essa entrada ?")) {
                
                
                db.collection('receita').doc(id).delete().then(()=> {
                    
                })
                .catch ((error)=> {
                    console.error(error)
                })
                
                this.getDeletedID
                
                for (var i = 0; i < this.getDeletedID.length;  i++) {
                    var newIdNumberDocValue = this.getDeletedID[i].idNumberDoc - 1
                    var newPageValue = Math.ceil(newIdNumberDocValue / 5)
                    db.collection('receita').doc(this.getDeletedID[i].key).update({
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
            var controleSelect = this.$refs.ControleSelectUpdate

            controleSelect.options[1].innerHTML = "Pago"
            controleSelect.options[2].innerHTML = "Em aberto"
            controleSelect.options[3].innerHTML = "Não pago"
            controleSelect.options[4].innerHTML = "Vencido"

            let dbRef = db.collection('receita').doc(id);
                dbRef.get().then((doc) => {
                    this.futureUpdate = doc.data();
                    this.futureUpdate.key= id;
                    this.numeroInputAddUpdate = this.futureUpdate.valor
                    this.queryUpdate = doc.data().query
                    
                    if(this.futureUpdate.controle.includes("(")) {
                        let i = 1
                        while (i < controleSelect.options.length) {
                            controleSelect.options[i].innerHTML = controleSelect.options[i].innerHTML + `(${doc.data().ndeparcelas})`
                            i++
                        }   
                    }else {
                        console.log("Sem parcelamento")
                    }
                    
                }).catch((error) => {
                    console.log(error)
            })
        },


        showAddDiv () {
            this.addDiv = true
            this.receitaNew.fornecedor=''
            this.receitaNew.data=''
            this.receitaNew.valor=''
            this.receitaNew.categoria=''
            this.receitaNew.tipo=''
            this.receitaNew.descricao=''
            this.receitaNew.vencimento=''
            this.receitaNew.servico=''
            this.selectedValueFPG=''
            this.selectedValueControle=""
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

                    var querySubstringFornecedor = []
                    var querySubstringDescricao = []
                    var querySubstringServico = []


                    if (this.futureUpdate.fornecedor != undefined) {
                        var queryFornecedor = this.futureUpdate.fornecedor.toLowerCase()
                        querySubstringFornecedor = queryFornecedor.split(" ")
                    }
                    if (this.futureUpdate.descricao != undefined) {
                        var queryDescricao = this.futureUpdate.descricao.toLowerCase()
                        querySubstringDescricao = queryDescricao.split(" ")
                    }
                    if (this.futureUpdate.servico != undefined) {
                        var queryServico = this.futureUpdate.servico.toLowerCase()
                        querySubstringServico = queryServico.split(" ")
                    }

                    var querySubstringCategoria = this.selectedId.toLowerCase().split(" ")

                    var queryArray = querySubstringFornecedor.concat(querySubstringDescricao,querySubstringServico,querySubstringCategoria)
                    queryArray.push(
                        this.futureUpdate.categoria.toLowerCase(),
                        this.futureUpdate.valor,
                        this.futureUpdate.controle.match(/([^(]+)/)[0].toLowerCase(),
                        this.futureUpdate.data.split('-').reverse().join('/'),
                        this.futureUpdate.vencimento.split('-').reverse().join('/'),
                        this.futureUpdate.fpg.toLowerCase(),
                        this.futureUpdate.page,
                        this.futureUpdate.idNumberDoc,
                        this.futureUpdate.ndeparcelas)

                    
                    db.collection('receita').doc(this.futureUpdate.key)
                    .update({
                        fornecedor:this.futureUpdate.fornecedor,
                        valor:this.futureUpdate.valor,
                        categoria:this.futureUpdate.categoria,
                        descricao:this.futureUpdate.descricao,
                        servico:this.futureUpdate.servico,
                        vencimento:this.futureUpdate.vencimento,
                        controle:this.futureUpdate.controle,
                        fpg:this.futureUpdate.fpg,
                        query:queryArray
                    }).then(()=> {
                        console.log("Entrada atualizada com sucesso")
                    }).catch((error) => {
                        console.log(error);
                    })
                    this.editDiv = false;
                    
                }
            }else {
                if (window.confirm("Você está prestes a sair sem salvar as mudanças, tem certeza ?")) {
                    this.editDiv = false;
                    this.futureUpdate.fornecedor=''
                    this.futureUpdate.valor=''
                    this.selectedValue=''
                    this.futureUpdate.descricao=''
                    this.futureUpdate.vencimento=''
                    this.futureUpdate.servico=''
                    this.futureUpdate.fpg=''
                    this.futureUpdate.controle=""
                }
            }
        },
    }
}
</script>