### Comando para permitir a execução dos scripts:

```
chmod +x ./scripts/build.sh
chmod +x ./scripts/common.sh
chmod +x ./scripts/migrations.sh
```

O projeto possui 3 scripts:

- build.sh => Script responsável por configurar o ambiente de build, instalar dependências, construir o frontend e iniciar o servidor utilizando o PM2.
- common.sh => Script que contém funções auxiliares, como a exibição de opções interativas no terminal para seleção de ambiente.
- migrations.sh => Script responsável por executar as migrações do banco de dados, garantindo que a estrutura esteja atualizada de acordo com as alterações definidas.