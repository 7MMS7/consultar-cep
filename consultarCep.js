// Input onde insere o CEP
let cepInput = document.querySelector('[data-js=cepInput]')
// Button que realizar a busca do CEP
let searchButton = document.querySelector('[data-js=searchButton]')
// Span da mensagem de erro ao tentar buscar um CEP invalido
let messageInvalidCep = document.querySelector('[data-js=messageInvalidCep]')
// Div onde estão todos os elementos utilizados na busca do CEP
let searchForm = document.querySelector('[data-js=searchForm]')
// Div onde estão todos os elementos utilizados no retorno da requisição para aa API do viacep
let responseSearch = document.querySelector('[data-js=responseSearch]')
// Button para realizar uma nova busca
let returnButton = document.querySelector('[data-js=returnButton]')
// Table para conter retorno da requisição de consulta do cep
let tableCep = document.querySelector('[data-js=tableCep]')


// Limpar campo de input e eliminar a mensagem de erro
const cleanCepInput = () => {
    cepInput.removeAttribute('class')
    messageInvalidCep.innerHTML = ''
    messageInvalidCep.removeAttribute('class')
}

// Função para validar os caracteres inseridos no input de CEP antes da consulta
const validateCepInput = () => {
    // Recuperar o tamanho do input
    const lengthInput = cepInput.value.length
    // Remover os caracteres não numéricos do campo input
    cepInput.value = cepInput.value.replace(/\D/g, '')
    // Se eu tiver 6 ou mais digitos
    if (lengthInput >= 6) {
        // Adicionar o caracter '-' para pradronizar o formato do cep
        cepInput.value = cepInput.value.slice(0, 5) + '-' +  cepInput.value.slice(5)
    } 
    // Tamanho maximo de digitos no input de CEP deve ser 9
    if (lengthInput == 10) {
        // Tamanho maximo do input é 9 caracteres
        cepInput.value = cepInput.value.slice(0, -1)
    }
}

// Função para validar a busca do CEP inserido no input
const buscarCepInput = () => {
    // Regex para a mascara do CEP '00000-000'
    const regexCep = /^\d{5}-\d{3}$/

    // Se os input tiver o formato de um CEP valido
    if (regexCep.test(cepInput.value)) {
        // CEP com apenas os números digitados
        const cep = cepInput.value.replace(/\D/g, '')
        // URL para realizar a requisição para a consulta do CEP utilizando o viacep
        const url = 'https://viacep.com.br/ws/' + cep + '/json/'
        // Variável de requisição
        let req = new XMLHttpRequest()
        // Realizando get na url
        req.open('GET', url)

        // Tratar erros na requisição
        req.onerror = () =>  {
            cepInput.classList.add('invalid')
            messageInvalidCep.classList.add('invalid')
            messageInvalidCep.innerHTML = 'Não foi possível consultar o CEP neste momento!'
        }

        // Validar o retorno da requisição
        req.onload = () => {
            // Resposta da requisição
            const res = JSON.parse(req.responseText)
            console.log(res)
            // A requisição foi bem sucedida
            if (res.erro !== 'true') {
                // Esconder os elementos utilizados na busca
                searchForm.classList.add('hideme')
                // Mostrar os elementos de retorno busca
                responseSearch.classList.remove('hideme')
                tableCep.classList.add('cepInfo')

                // Para cada informação retornada do CEP
                for (let info in res) {
                    if (res[info] !== '') {
                        // Criar uma nova tupla na tabela
                        const row = tableCep.insertRow()
                        // Criar as celulas inseridas na nova tupla
                        const keyInfo = row.insertCell(0)
                        const cepInfo = row.insertCell(1)

                        // Adicionar os estilos e as informações nas celulas criadas
                        keyInfo.classList.add('key')
                        keyInfo.innerHTML = info.toUpperCase() + ':'
                        cepInfo.classList.add('info')
                        cepInfo.innerHTML = res[info]
                    } 
                }
               
            } else {
                // mostrar mensagem de erro
                cepInput.classList.add('invalid')
                messageInvalidCep.classList.add('invalid')
                messageInvalidCep.innerHTML = 'Não foi possível encontrar o CEP digitado!'
            }
        }
        
        // enviar requisição
        req.send()

    // O CEP inserido é invalido
    } else {
        // Mostrar mensagem de erro
        console.log('CEP invalido')
        cepInput.classList.add('invalid')
        messageInvalidCep.classList.add('invalid')
        messageInvalidCep.innerHTML = 'Digite um CEP válido!'
    }
}

// Função para retornar os campos do formulario para realizar a busca de um novo CEP
const realizarNovaBuscaCep = () => {
    // Ocultar elementos utilizados no retorno da busca
    responseSearch.classList.add('hideme')
    // Mostrar os elementos utilizados na busca
    searchForm.classList.remove('hideme')
    // Limpar tabela
    tableCep.innerHTML = ''
}

// Adicionar eventos aos elementos
cepInput.addEventListener('input', validateCepInput)
cepInput.addEventListener('focus', cleanCepInput)
searchButton.addEventListener('click', buscarCepInput)
returnButton.addEventListener('click', realizarNovaBuscaCep)