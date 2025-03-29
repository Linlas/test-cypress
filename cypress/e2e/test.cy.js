describe('Teste de Tarefas', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/index.html')
    })
    it('Deve adicionar uma tarefa a lista', () => {
        cy.get('#todo_title').type('Fazer compras');
        cy.contains('Criar tarefa').click();
        cy.get('[x-text="todo.task"]').contains('Fazer compras').should('exist');

    })
    it('Adicionar mais tarefas', () => {
        const tarefas = ['Fazer exercicios', 'Comer', 'Tomar banho'];
        tarefas.forEach((tarefa) => {
            cy.get('#todo_title').type(tarefa);
            cy.contains('Criar tarefa').click();
            cy.get('[x-text="todo.task"]').contains(tarefa).should('exist');
        });
    });

    it('Deve garantir que a lista está vazia ao carregar a página', () => {
        cy.get('table tbody tr').should('not.exist');
    });

    it('Deve permitir excluir uma tarefa', () => {
        cy.get('#todo_title').type('Tarefa para excluir');
        cy.get('.bg-white > .col-auto > .btn').click();
        cy.get('.form-check-input').click();
        cy.get('.text-end > .btn').click();
        cy.get('[x-text="todo.task"]').contains('Tarefa para excluir').should('not.exist');
    });

    it('Deve marcar uma tarefa como concluída', () => {
        cy.get('#todo_title').type('Tarefa para concluir');
        cy.get('.bg-white > .col-auto > .btn').click();
    });

    it('Não deve adicionar tarefa com título vazio', () => {
        cy.get('.bg-white > .col-auto > .btn').click();
        cy.get('table tbody tr').should('not.exist');
    });

    it('Deve limpar o campo de input após adicionar uma tarefa', () => {
        cy.get('#todo_title').type('Nova tarefa');
        cy.get('.bg-white > .col-auto > .btn').click();
        cy.get('#todo_title').should('have.value', '');
    });
});