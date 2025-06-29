# Planejedu

Uma aplicação full-stack para gerenciamento de temas e tópicos de estudo, com autenticação via e-mail/senha e Google.  
Desenvolvida com **Next.js**, **Prisma**, **SQLite/PostgreSQL**, **NextAuth**, **Tailwind CSS**.

---

## Funcionalidades

- Cadastro e login com e-mail/senha  
- Login social via Google  
- Criação e edição de temas de estudo  
- Criação e marcação de tópicos como concluídos  
- Limites para evitar uso excessivo:
    - Máx. 10 usuários
    - Máx. 30 temas por usuário
    - Máx. 50 tópicos por tema  

- Interface responsiva com Tailwind CSS  
- Proteção de rotas com `NextAuth`  

---

## Tecnologias

- [Next.js](https://nextjs.org/)
- [Prisma ORM](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SQLite](https://www.sqlite.org/) (dev) / [PostgreSQL](https://www.postgresql.org/) (produção)
- [Vercel](https://vercel.com/) (deploy)

---

## Configuração local

### 1 Clonar o projeto
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```
### 2 Clonar o projeto
```bash
npm install
```
### 3 Configurar variáveis de ambiente
Crie um arquivo .env na raiz com o seguinte conteúdo (ajuste os valores):
```env
DATABASE_URL="file:./prisma/dev.db"   # ou URL do Postgres no Vercel
NEXTAUTH_SECRET="uma_chave_secreta_forte"

GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret
```
Se estiver usando PostgreSQL, configure DATABASE_URL corretamente.
### 4 Gerar o banco e cliente Prisma
```bash
npx prisma migrate dev --name init
```
ou (para bancos existentes):
```bash
npx prisma db push
```
```bash
npx prisma generate
```
### 5 Rodar o projeto
```bash
npm run dev
```

## Fluxo de autenticação
- Usuário pode registrar com e-mail/senha.
- Login social cria usuário no banco na primeira autenticação (caso não exista).
- As rotas protegidas redirecionam para /auth/login caso o usuário não esteja autenticado.

## Limitações
- No máximo 10 usuários
- No máximo 30 temas por usuário
- No máximo 50 tópicos por tema
- Pensada para demonstração; ideal para uso leve.

## Licença
Este projeto foi desenvolvido para fins de estudo e demonstração
