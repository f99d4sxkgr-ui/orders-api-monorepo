# Setup IAM para CI/CD

## 1. Criar usuário IAM

```bash
# Criar usuário para CI/CD
aws iam create-user --user-name orders-api-cicd

# Criar access key
aws iam create-access-key --user-name orders-api-cicd
```

## 2. Criar e anexar policy

```bash
# Criar policy com permissões mínimas
aws iam create-policy \
  --policy-name OrdersApiCICDPolicy \
  --policy-document file://iam-policy.json

# Anexar policy ao usuário
aws iam attach-user-policy \
  --user-name orders-api-cicd \
  --policy-arn arn:aws:iam::SEU_ACCOUNT_ID:policy/OrdersApiCICDPolicy
```

## 3. Configurar secrets no GitHub

No repositório GitHub:
- Settings → Secrets and variables → Actions
- New repository secret:
  - `AWS_ACCESS_KEY_ID`: access key do usuário orders-api-cicd
  - `AWS_SECRET_ACCESS_KEY`: secret key do usuário orders-api-cicd

## 4. Permissões incluídas

✅ **CloudFormation**: Criar/atualizar stacks  
✅ **S3**: Bucket para artefatos SAM  
✅ **Lambda**: Criar/atualizar funções  
✅ **API Gateway**: Criar/gerenciar APIs  
✅ **DynamoDB**: Criar/gerenciar tabelas  
✅ **IAM**: Criar roles para Lambda  
✅ **CloudWatch Logs**: Logs das funções  

## 5. Segurança

- Permissões limitadas apenas aos recursos `orders-api-*`
- Usuário específico para CI/CD (não root)
- Sem permissões desnecessárias
- Resources com wildcards limitados

## 6. Teste

Após configurar, teste fazendo um push na branch `develop`:

```bash
git checkout develop
git commit --allow-empty -m "test: trigger deploy"
git push
```

O workflow deve executar e fazer deploy para o ambiente DEV.