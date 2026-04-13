import swaggerJsdoc, { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tenda Solar API",
      version: "1.0.0",
      description:
        "Documentação da API para gerenciamento de usuários, endereços e contratos.",
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:3000",
        description: "Servidor de Desenvolvimento",
      },
    ],
    tags: [
      {
        name: "Usuários",
        description: "Operações relacionadas aos usuários",
      },
      {
        name: "Contratos",
        description: "Gerenciamento de contratos",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Insira o token no formato: Bearer {token}",
        },
      },
      schemas: {
        Endereco: {
          type: "object",
          required: ["cep", "logradouro", "numero", "bairro", "cidade"],
          properties: {
            cep: {
              type: "string",
              example: "79000000",
            },
            logradouro: {
              type: "string",
              example: "Rua das Flores",
            },
            numero: {
              type: "string",
              example: "123",
            },
            bairro: {
              type: "string",
              example: "Centro",
            },
            cidade: {
              type: "string",
              example: "Campo Grande",
            },
            complemento: {
              type: "string",
              example: "Apt 43",
            },
          },
        },
        CriarUsuario: {
          type: "object",
          required: ["email", "telefone", "senha", "cpf", "enderecos"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "ruan5@email.com",
            },
            telefone: {
              type: "string",
              example: "67992999998",
            },
            senha: {
              type: "string",
              format: "password",
              example: "123451",
            },
            cpf: {
              type: "string",
              example: "17132176113",
            },
            enderecos: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Endereco",
              },
            },
          },
        },
        Usuario: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "b3f5c2c4-8d9f-4c4d-9a7f-1b2c3d4e5f6a",
            },
            email: {
              type: "string",
              example: "ruan5@email.com",
            },
            telefone: {
              type: "string",
              example: "67992999998",
            },
            cpf: {
              type: "string",
              example: "17132176113",
            },
            enderecos: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Endereco",
              },
            },
          },
        },
        Login: {
          type: "object",
          required: ["email", "senha"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "ruan5@email.com",
            },
            senha: {
              type: "string",
              format: "password",
              example: "123451",
            },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },
        CriarContrato: {
          type: "object",
          required: ["duracao_contrato", "qtd_energia", "valor_kwh"],
          properties: {
            duracao_contrato: {
              type: "integer",
              example: 24,
            },
            qtd_energia: {
              type: "number",
              format: "float",
              example: 500.0,
            },
            valor_kwh: {
              type: "number",
              format: "float",
              example: 0.34,
            },
          },
        },
        Contrato: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            duracao_contrato: {
              type: "integer",
              example: 24,
            },
            qtd_energia: {
              type: "number",
              example: 500.0,
            },
            valor_kwh: {
              type: "number",
              example: 0.34,
            },
            pagamento_mensal: {
              type: "number",
              example: 170.0,
            },
            custo_total: {
              type: "number",
              example: 4080.0,
            },
            status: {
              type: "string",
              enum: ["PENDENTE", "ASSINADO", "CANCELADO", "FINALIZADO"],
            },
          },
        },
        Erro: {
          type: "object",
          properties: {
            statusCode: { type: "integer", example: 400 },
            message: { type: "string", example: "Erro de validação" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
    paths: {
      "/usuarios": {
        post: {
          tags: ["Usuários"],
          summary: "Cadastrar um novo usuário",
          description: "Cria um usuário com seus respectivos endereços.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CriarUsuario",
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Usuário criado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Usuario",
                  },
                },
              },
            },
            "400": {
              description: "Dados inválidos",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Erro",
                  },
                },
              },
            },
          },
        },
      },
      "/usuarios/login": {
        post: {
          tags: ["Usuários"],
          summary: "Realizar login",
          description: "Autentica o usuário e retorna um token JWT.",
          security: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Login",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Autenticação realizada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/AuthResponse",
                  },
                },
              },
            },
            "401": {
              description: "Credenciais inválidas",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Erro",
                  },
                },
              },
            },
          },
        },
      },
      "/gerar/contratos": {
        post: {
          tags: ["Contratos"],
          summary: "Criar um novo contrato",
          description: "Cria um contrato para o usuário autenticado.",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CriarContrato",
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Contrato criado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Contrato",
                  },
                },
              },
            },
            "401": {
              description: "Não autorizado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Erro",
                  },
                },
              },
            },
          },
        },
      },
      "/contrato/{id}/assinar": {
        post: {
          tags: ["Contratos"],
          summary: "Assinar contrato",
          description:
            "Realiza a assinatura de um contrato existente, alterando seu status para ASSINADO.",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID do contrato",
              schema: {
                type: "string",
                format: "uuid",
                example: "b3f5c2c4-8d9f-4c4d-9a7f-1b2c3d4e5f6a",
              },
            },
          ],
          responses: {
            "200": {
              description: "Contrato assinado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Contrato",
                  },
                },
              },
            },
            "401": {
              description: "Não autorizado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Erro",
                  },
                },
              },
            },
            "404": {
              description: "Contrato não encontrado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Erro",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [], // Não é necessário usar anotações JSDoc, pois os paths já estão definidos
};

export const swaggerSpec = swaggerJsdoc(options);
