describe('Teste de Tarefas', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/index.html')
            .catch(() => {
                cy.visit('http://127.0.0.1:5500/todo-list-alpine-js/index.html')
            })
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

});