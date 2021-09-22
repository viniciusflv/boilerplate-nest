# language: pt
Funcionalidade: queryHelloWorld - Pega o olá mundo

Cenário: Deve pegar o olá mundo
  Dado a mensagem "Olá mundo!"
  Quando chamar o endpoint "/gql" com a query
  """
  query {
    helloWorld {
      helloWorld
    }
  }
  """
  Então deve retornar sucesso com status "200"
