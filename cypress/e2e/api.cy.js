describe('Teste de api criação de um novo usuárrio', () => {

  const user = {
      username: 'cleber.santos',
      email: 'cleber@teste.com.br',
      password: "Teste123"
  }

  let userId
  it('Deve criar um novo usuário', () => {
    cy.request({
      method: 'POST',
      url: 'https://fakestoreapi.com/users',
      body: user
    }).then(response => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('id')

      userId = response.body.id
    })
  })
  it('Verificar o usuário criado', () => {
    cy.request({
      method: 'GET',
      url: `https://fakestoreapi.com/users/${userId}`
    }).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(userId)
    })
  })
})