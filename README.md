# Planejedu

Aplicação full-stack para organização de estudos com autenticação e gerenciamento de temas e tópicos.  
Desenvolvida com: **Next.js**, **Prisma**, **NextAuth**, **Tailwind CSS**, **SQLite/PostgreSQL**.

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
- Proteção de rotas com NextAuth  

---

## Tecnologias

- [Next.js](https://nextjs.org/) – Framework React Fullstack
- [Prisma ORM](https://www.prisma.io/) – Acesso ao banco
- [NextAuth.js](https://next-auth.js.org/) – Autenticação
- [Tailwind CSS](https://tailwindcss.com/) – Estilização
- [SQLite](https://www.sqlite.org/) (dev) / [PostgreSQL](https://www.postgresql.org/) (produção)
- [Vercel](https://vercel.com/) – Deploy

---

## Instalação local

### 1 Clonar o projeto
```bash
git clone https://github.com/Ricardo-Tanabe/planejedu.git
cd seu-repositorio
```
### 2 Instalar dependências
```bash
npm install
```
### 3 Configurar variáveis de ambiente
Crie um arquivo .env na raiz com:
```env
DATABASE_URL="file:./prisma/dev.db"   # ou URL do Postgres no Vercel
NEXTAUTH_SECRET="uma_chave_secreta_forte"

GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret
```
Para PostgreSQL, substitua `DATABASE_URL` pela URL do banco em produção.
### 4 Inicializar banco de dados
```bash
npx prisma migrate dev --name init
# ou, se já existir
npx prisma db push
npx prisma generate
```
### 5 Rodar o projeto
```bash
npm run dev
```

## Fluxo de autenticação
- Cadastro com e-mail e senha via formulário.
- Login social via Google cria usuário automaticamente.
- Rotas protegidas redirecionam para `/auth/login` caso o usuário não esteja autenticado.

## Limitações
- Máximo de 10 usuários
- Máximo de 30 temas por usuário
- Máximo de 50 tópicos por tema

Esses limites são ajustáveis no backend; foram definidos para fins de demonstração.

## Licença
Este projeto foi desenvolvido com fins educacionais e demonstrativos.
Sinta-se à vontade para adaptá-lo ou contribuir.
