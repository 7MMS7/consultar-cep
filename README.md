# consultar-cep
 Formulário simples, que consome a API do Viacep para buscar as informações de um CEP.

## HTML

No HTML foi composto principalmente de um camapo de input para validar o CEP, um botão de buscar que realiza uma requisição para 
consumir a API viacep, e uma tabela com o as informações do retorno da requisição realizada para viacep.

## CSS

O CSS foi mantido simples, o foco foi facer os elemntos da tela terem uma colorção parecida com a imagem utilizada como background.

Além disso, o CSS também é responsável pela mudança de classes de alguns elementos dependendo do evento, como por exemplo, aplicando 
invisible aos elementos do formulario do CEP para ser mais facíl mostrar o retorno das informações recebidas na requisição.

## JavaScript

O JavaScript é responsável pelo funcionamento dos elementos e o consumo da API do viacep para a realização da consulta do CEP. Algumas funções atribuidas a ele são:

* Validação do input do formulário para verificar o CEP digitado é valido.
* Validação dos caracteres inseridos no input do formulario (Apenas permite que números sejam inseridos).
* Limite do tamanho do input do formulario (Tamanho de um CEP valido é de 8 digitos).
* Mensagens de erro devem ser enviadas para a interface no caso do CEP inserido ser invalido ou inexistente.
* Após a validação do CEP e o consumo da API viacep. as informações do CEP digitado são mostradas de forma clara por meio de uma tabela.
* É selecionado o botão voltar no caso do usuário querer realizar uma nova requisição.
