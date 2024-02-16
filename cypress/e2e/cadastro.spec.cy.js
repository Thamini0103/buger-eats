describe('Cadastro', ()=>{
    it('Usuário deve se tornar um entregador', ()=>{
        cy.viewport(1440,900)
        cy.visit('https://buger-eats.vercel.app')

        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')

        var entregador = {
            nome: 'Thamini Vila Real',
            cpf: '48558395071',
            email: 'thamini.vilareal@gmail.com',
            whatsapp: '11999999999',
            endereco: {
                cep: '59136340',
                rua: 'Rua Piripiri',
                numero: '165',
                complemento: 'Apto 11',
                bairro: 'Lagoa Azul',
                cidade_uf: 'Natal/RN'
            },
            metodo_entrega: 'Moto',
            cnh: 'Cnh_generica.png'
        }

        cy.get('input[name="name"]').type(entregador.nome).invoke('val').then(texto =>{
            expect(entregador.nome).to.match(/^[a-zA-Z\s]+$/)
        })
        cy.get('input[name="cpf"]').type(entregador.cpf).invoke('val').then(texto =>{
            expect(entregador.cpf).to.match(/^\d+$/),
            expect(entregador.cpf).to.have.lengthOf(11)
        })
        cy.get('input[name="email"]').type(entregador.email).invoke('val').then(email => {
            expect(entregador.email).to.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
          })
        cy.get('input[name="whatsapp"]').type(entregador.whatsapp).invoke('val').then(texto =>{
            expect(entregador.whatsapp).to.match(/^\d+$/),
            expect(entregador.whatsapp).to.have.lengthOf(11)
        })
        cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
        cy.get('input[type="button"][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(entregador.endereco.numero)
        cy.get('input[name="address-details"]').type(entregador.endereco.complemento)

        cy.get('input[name="address"]').should('have.value', entregador.endereco.rua)
        cy.get('input[name="district"]').should('have.value', entregador.endereco.bairro)
        cy.get('input[name="city-uf"]').should('have.value', entregador.endereco.cidade_uf)

        cy.contains('.delivery-method li', entregador.metodo_entrega).click()
        cy.get('input[accept^="image"]').attachFile('/images/' + entregador.cnh)

        cy.get('button[type="submit"]').click()
    })
})