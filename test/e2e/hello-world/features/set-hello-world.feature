# language: pt
Funcionalidade: setHelloWorld - Atualiza o olá mundo

Cenário: Deve atualizar o olá mundo
  Dado a mensagem "Hello underworld!"
  Quando chamar o endpoint "/hello-world"
  Então deve retornar sucesso com status "200"
