# language: pt
Funcionalidade: getHelloWorld - Pega o olá mundo

Cenário: Deve pegar o olá mundo
  Dado a mensagem "Olá mundo!"
  Quando chamar o endpoint "/hello-world"
  Então deve retornar sucesso com status "200"
