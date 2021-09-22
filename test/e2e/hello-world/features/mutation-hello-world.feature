# language: pt
Funcionalidade: mutateHelloWorld - Atualiza o olá mundo

Cenário: Deve atualizar o olá mundo
  Dado a mensagem "Hello underworld!"
  Quando chamar o endpoint "/gql" com a query
  """
  mutation ($message: String!) {
    setHelloWorld(message: $message) {
      helloWorld
    }
  }
  """
  Então deve retornar sucesso com status "200"
