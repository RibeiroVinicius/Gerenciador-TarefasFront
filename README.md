# Gerenciador de Tarefas - Front-End

Aplicação web desenvolvida em **Angular 17**, com foco em usabilidade, responsividade e integração com API autenticada via JWT. Permite gerenciamento completo de tarefas com filtros, ordenações e notificações.

---

## 🚀 Tecnologias Utilizadas

- Angular 17
- Angular Material
- RxJS
- TypeScript
- SCSS
- Reactive Forms

---

## ⚙️ Como Executar

1. Clone o repositório:

bash
git clone https://github.com/RibeiroVinicius/Gerenciador-TarefasFront
cd Gerenciador-TarefasFront

2. Instale as dependências:
npm install

3. Inicie a aplicação:
ng serve

4. Acesse no navegador:

http://localhost:4200


## 🔐 Acesso
Use o mesmo login configurado no back-end:

Usuário: administrador

Senha: mv


## ✅ Funcionalidades Implementadas
- Tela de login com autenticação JWT

- Listagem de tarefas em tabela (MatTable)

- Criação e edição de tarefas via modal

- Filtros por:

  Texto (pesquisa)

  Status (pendente ou concluída)

  Período (data inicial e final)

- Ordenação por colunas

- Paginação com MatPaginator

- Snackbar para feedback de ações (sucesso ou erro)

- Scroll local na tabela para melhor UX

- Botão “Limpar Filtros”

- Logout e controle de sessão

- Estilo responsivo com Angular Material


## 📁 Estrutura do Projeto
components/ – Componentes da tela (listagem, modal, login)

services/ – Serviços responsáveis por chamada à API

interface/ – Interface das entidades

guards/ – Proteção de rotas autenticadas

pipes/ – Formatações personalizadas


## 🔗 Integração com o Back-End
Certifique-se de que o back-end (https://localhost:5129) esteja rodando e acessível, com CORS habilitado.
