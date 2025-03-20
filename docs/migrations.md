## Instruções para Gerenciar Migrations

Este projeto utiliza [TypeORM](https://typeorm.io/) para gerenciar migrations no banco de dados. A seguir, apresentamos um guia detalhado sobre como executar, reverter, listar e gerar migrations em diferentes ambientes (homologação e produção).

### Índice

1. [Introdução](#introducao)
2. [Comandos para Migrations](#comandos-para-migrations)
   - [Executar Migrations](#executar-migrations)
   - [Reverter Migrations](#reverter-migrations)
   - [Exibir Migrations](#exibir-migrations)
   - [Gerar Migrations](#gerar-migrations)
3. [Verificar Schema](#verificar-schema)
4. [Considerações Finais](#consideracoes-finais)

### Introdução

Os comandos de migrations permitem que você gerencie mudanças no esquema do banco de dados de forma programática. Esses comandos são essenciais para garantir que os ambientes de homologação e produção estejam sincronizados e funcionando corretamente.

Nosso projeto suporta conexão com múltiplos bancos, e, por isso, as migrations são organizadas separadamente para cada banco e ambiente.

A variável `FOLDER_NAME` define o banco e também organiza as entidades e migrations dentro dos diretórios apropriados. Vale ressaltar que, por padrão, as migrations para o ambiente de desenvolvimento estão desativadas.

### Comandos para Migrations

#### Executar Migrations

Para aplicar todas as migrations pendentes ao banco de dados, utilize:

- **Homologação**:

  ```sh
  cross-env NODE_ENV=staging FOLDER_NAME=contensterdb npm run typeorm -- migration:run -d ./src/config/typeorm/typeorm.config.ts
  ```

- **Produção**:
  
  ```sh
  cross-env NODE_ENV=production FOLDER_NAME=contensterdb npm run typeorm -- migration:run -d ./src/config/typeorm/typeorm.config.ts
  ```

#### Reverter Migrations

Se for necessário desfazer a última migration aplicada, utilize:

- **Homologação**:

  ```sh
  cross-env NODE_ENV=staging FOLDER_NAME=contensterdb npm run typeorm -- migration:revert -d ./src/config/typeorm/typeorm.config.ts
  ```

- **Produção**:
  
  ```sh
  cross-env NODE_ENV=production FOLDER_NAME=contensterdb npm run typeorm -- migration:revert -d ./src/config/typeorm/typeorm.config.ts
  ```

#### Exibir Migrations

Para visualizar quais migrations estão pendentes ou foram aplicadas, utilize:

- **Homologação**:

  ```sh
  cross-env NODE_ENV=staging FOLDER_NAME=contensterdb npm run typeorm -- migration:show -d ./src/config/typeorm/typeorm.config.ts
  ```

- **Produção**:
  
  ```sh
  cross-env NODE_ENV=production FOLDER_NAME=contensterdb npm run typeorm -- migration:show -d ./src/config/typeorm/typeorm.config.ts
  ```

#### Gerar Migrations

Se precisar criar uma nova migration baseada nas alterações do código, utilize:

**ATENÇÃO:** É necessário incluir `FOLDER_NAME` no caminho ao gerar a migration.

- **Homologação**:

  ```sh
  cross-env NODE_ENV=staging FOLDER_NAME=contensterdb npm run typeorm -- migration:generate ./src/migrations/{FOLDER_NAME}/{nomeDaMigration} -d ./src/config/typeorm/typeorm.config.ts
  ```

- **Produção**:
  
  ```sh
  cross-env NODE_ENV=production FOLDER_NAME=contensterdb npm run typeorm -- migration:generate ./src/migrations/{FOLDER_NAME}/{nomeDaMigration} -d ./src/config/typeorm/typeorm.config.ts
  ```

### Verificar Schema

Para verificar diferenças entre o esquema do banco e o modelo atual do TypeORM, utilize:

- **Homologação**:

  ```sh
  cross-env NODE_ENV=staging FOLDER_NAME=contensterdb npm run typeorm -- schema:log -d ./src/config/typeorm/typeorm.config.ts
  ```

- **Produção**:
  
  ```sh
  cross-env NODE_ENV=production FOLDER_NAME=contensterdb npm run typeorm -- schema:log -d ./src/config/typeorm/typeorm.config.ts
  ```

### Considerações Finais

- Sempre verifique se está utilizando o `NODE_ENV` correto antes de executar qualquer comando.
- Para evitar problemas de compatibilidade, certifique-se de que todas as migrations foram aplicadas antes de iniciar a aplicação em produção.
- Mantenha um controle de versão adequado para as migrations, garantindo que nenhuma alteração crítica seja feita sem documentação.

Seguindo estas diretrizes, você garantirá um ambiente estável e confiável para seu banco de dados.

Caso tenha dúvidas, consulte a [documentação oficial do TypeORM](https://typeorm.io/) para mais informações.

