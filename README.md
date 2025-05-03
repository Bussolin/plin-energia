# Plin Energia - API de Processamento de Documentos

Este projeto é uma API de processamento de documentos que pode extrair texto de PDFs e páginas web.

## Funcionalidades

- Processamento de PDF:
    - Extração de texto de PDFs baseados em texto
    - Processamento OCR para PDFs baseados em imagem
    - Detecção automática do tipo de PDF (texto/imagem)
- Web Scraping:
    - Extração de conteúdo de páginas web
    - Extração automática de título e conteúdo
- Gerenciamento de Documentos:
    - Armazenamento de documentos processados
    - Histórico de documentos
    - Categorização de tipos de documento (PDF/Website)
- CRUD de usuários:
    - Criação
    - Deleção
    - Edição
    - Busca por usuário específico
    - Busca por todos os usuários

## Tecnologias

- Node.js
- NestJS
- PostgreSQL
- Docker
- Bibliotecas de Processamento de PDF:
    - pdf-poppler (Conversão de PDF para Imagem)
    - pdf-parse (Extração de texto de PDF)
    - tesseract.js (processamento OCR)
- Bibliotecas de Processamento Web:
    - Axios
    - Cheerio

## Pré-requisitos

- Node.js (v20 ou superior)
- Docker e Docker Compose
- PostgreSQL (se executar sem Docker)

## Configuração

1. Clone o repositório:

```bash
git clone <repository-url>
cd plin-energia
```

2. Crie um arquivo `.env` de acordo com o arquivo .env.example no diretório raiz:

Exemplo:

```env
DATABASE_URL="postgres://postgres:examplepass@localhost/plin_leitor"

JWT_SECRET="700e4ff6d59ec3e898103d97878de79b0e5cdeb77d0481ddf831d72002f9ce3e"
JWT_EXPIRATION_TIME="240H"
```

3. Instale as dependências:

```bash
npm install
```

## Documentação da API

Após iniciar a aplicação, você pode acessar a documentação Swagger em:

```
http://localhost:3000/api
```

### Endpoints Disponíveis

#### Documentos

- `POST /document-scrapper/pdf`

    - Upload e processamento de arquivos PDF
    - Suporta PDFs baseados em texto e imagem
    - Retorna texto extraído e metadados

- `POST /document-scrapper/url`

    - Processamento de páginas web
    - Extrai conteúdo e título
    - Retorna conteúdo processado

- `GET /document-data`
    - Lista de documentos processados
    - Inclui tipo e título do documento

#### Clientes

- `POST /clients`

    - Criar novo cliente
    - Corpo da requisição:

    ```json
    {
        "name": "string",
        "email": "string",
        "password": "string"
    }
    ```

- `GET /clients`

    - Listar todos os clientes
    - Requer autenticação

- `GET /clients/:id`

    - Buscar cliente por ID
    - Requer autenticação

- `PUT /clients/:id`

    - Atualizar dados do cliente
    - Requer autenticação
    - Corpo da requisição:

    ```json
    {
        "name": "string",
        "email": "string"
    }
    ```

- `DELETE /clients/:id`

    - Remover cliente
    - Requer autenticação

## Desenvolvimento

1. Executar em modo desenvolvimento:

```bash
npm run start:dev
```

2. Construir o projeto:

```bash
npm run build
```

## Suporte Docker

O projeto inclui configuração Docker para ambientes de desenvolvimento e produção, mas não funciona devido a um pacote que não tem suporte Linux (pdf-poppler):

- `docker/Dockerfile`: Container principal da aplicação
- `docker/docker-compose-services.yml`: Orquestração de serviços

## Tratamento de Erros

A API implementa tratamento abrangente de erros:

- Validação de entrada
- Verificação de tipo de arquivo
- Gerenciamento de erros de processamento
- Tratamento de erros de banco de dados

## Observações

Devido a falta de experiência com Testes unitários e de integração, resolvi deixar de lado para entregar o
que tinha conhecimento e prática
