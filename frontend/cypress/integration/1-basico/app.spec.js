describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress inicia com uma folha em branco para cada teste
    // então devemos dizer a ele para visitar nosso website com o comando `cy.visit ()`.
    // Como queremos visitar o mesmo URL no início de todos os nossos testes,
    // nós o incluímos em nossa função beforeEach para que seja executado antes de cada teste
    // https://docs.cypress.io/api/commands
    cy.visit('http://localhost:4200/')
  })

  it('Verifica título da App', () => {
      // Além de usar o comando `get` para obter um elemento por seletor,
      // também podemos usar o comando `contains` para obter um elemento por seu conteúdo.
      // No entanto, isso resultará em <label>, que é o elemento de nível mais baixo que contém o texto.
      // Para verificar o item, encontraremos o elemento <input> para este <label>
      // percorrendo o dom até o elemento pai. A partir daí, podemos `encontrar`
      // o elemento <input> da caixa de seleção filho e use o comando `check` para verificá-lo.
      cy.contains('Angular Testing')
        .parent()
        .find('.title') // encontra por css
        .should('have.text', 'Angular Testing')

      cy.contains('Angular Testing')
        .parent()
       .find('#title') // encontra por id
        .should('have.text', 'Angular Testing')
    })

  it('Verifica se lista de itens contém itens por padrão', () => {
    // Usamos o comando `cy.get ()` para obter todos os elementos que correspondem ao seletor.
    // Então, usamos `deveria` para afirmar que existem dois itens correspondentes,
    // quais são os dois itens padrão.
    cy.get('tr').should('have.length', 9) // linhas da tabela default

    // Podemos ir ainda mais longe e verificar se cada padrão todos contém
    // o texto correto. Usamos as funções `primeiro` e` último`
    // para obter apenas o primeiro e o último elemento correspondido individualmente,
    // e então realizar uma asserção com `deveria`.
    cy.get('td').first().should('have.text', ' 9fd43452-b17b-4671-8e9a-bd1b63d557e0 ')
   })

  it('Verifica adição de item', () => {
    const produto = { name:'IPhone X', price: 1000, quantity: 1000 }

    // Vamos pegar o elemento de entrada e usar o comando `type` para
    // insira nosso novo item de lista. Depois de digitar o conteúdo do nosso item,
    // também precisamos digitar a chave enter para enviar a entrada.
    // Melhores práticas: https://on.cypress.io/selecting-elements
    cy.get('#btnAdicionar').click()
    cy.get('#mat-input-1').type(`${produto.name}`)
    cy.get('#mat-input-2').type(`${produto.price}`)
    cy.get('#mat-input-3').type(`${produto.quantity}`)
    cy.get('#action-button').click()

    // Agora que digitamos nosso novo item, vamos verificar se ele realmente foi adicionado à lista.
    // Por ser o item mais recente, ele deve existir como o último elemento da lista.
    // Além disso, com os 9 itens padrão, devemos ter um total de 10 elementos na lista.
    //cy.get('tr').should('have.length', 10) // linhas da tabela após adicionar item

    //remove o item adicionado para deixar teste repetitível
    cy.wait(1000)
    cy.get('tr').last().find('a').last().click()
    cy.get('#action-button').click()
    cy.get('tr').should('have.length', 9) // linhas da tabela default
  })

})
