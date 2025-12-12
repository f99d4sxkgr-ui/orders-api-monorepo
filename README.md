# Orders API - Monorepo Pattern

API serverless para gerenciamento de pedidos usando o padrão monorepo com AWS SAM, API Gateway e Lambda.

## Arquitetura

- **API Gateway**: Endpoint único para todas as operações
- **Lambda Functions**: Funções separadas por responsabilidade
- **DynamoDB**: Armazenamento de pedidos
- **AWS SAM**: Infrastructure as Code

## Estrutura do Projeto

```
orders-api/
├── template.yaml          # SAM template - infraestrutura
├── samconfig.toml         # Configurações por ambiente
├── src/
│   ├── CreateOrder/       # POST /orders
│   ├── GetOrder/          # GET /orders/{orderId}
│   ├── CancelOrder/       # PUT /orders/{orderId}/cancel
│   └── Shared/            # Utilitários compartilhados
└── .github/workflows/     # Pipeline CI/CD
```

## Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/orders` | Criar novo pedido |
| GET | `/orders/{orderId}` | Buscar pedido por ID |
| PUT | `/orders/{orderId}/cancel` | Cancelar pedido |

## Ambientes e Deploy

- **develop** → `orders-api-dev` (automático via `.github/workflows/deploy.yml`)
- **main** → `orders-api-hml` (automático via `.github/workflows/deploy-hml.yml`)
- **tag vX.Y.Z** → `orders-api-prd` (automático via `.github/workflows/deploy-prd.yml`)

## Deploy Local

```bash
# Ver comandos disponíveis
make help

# Deploy para dev
make deploy-dev

# Deploy para hml
make deploy-hml

# Deploy para prd
make deploy-prd

# Limpar build
make clean
```

## Exemplo de Uso

### Criar Pedido
```bash
curl -X POST https://api-url/dev/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "customer-123",
    "items": [
      {"productId": "prod-1", "quantity": 2, "price": 29.99}
    ],
    "totalAmount": 59.98
  }'
```

### Buscar Pedido
```bash
curl https://api-url/dev/orders/{orderId}
```

### Cancelar Pedido
```bash
curl -X PUT https://api-url/dev/orders/{orderId}/cancel
```

## Vantagens do Monorepo

✅ Deploy atômico de API + Lambdas  
✅ Versionamento conjunto  
✅ Rollback simplificado  
✅ Reduz drift entre componentes  
✅ Pipeline único  
✅ Facilita code review  

## Desenvolvimento

1. Clone o repositório
2. Instale as dependências: `npm install` em cada pasta de função
3. Execute `sam build` para compilar
4. Use `sam local start-api` para desenvolvimento local