const express = require('express');
const bodyParser = require('body-parser');

// instância do aplicativo Express
const app = express();

// Middleware para analisar solicitações JSON
app.use(bodyParser.json());

const lista_produtos = {
  produtos: [
    { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João" },
    { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans" },
    { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé" },
    { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps" },
    { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé" },
  ]
};

app.get('/produtos', (req, res) => {
  res.json(lista_produtos);
});

app.get('/produtos/:id', (req, res) => {
  const produtoId = parseInt(req.params.id);
  const produto = lista_produtos.produtos.find(item => item.id === produtoId);
  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ mensagem: "Produto não encontrado" });
  }
});

app.post('/produtos', (req, res) => {
  const novoProduto = req.body;
  novoProduto.id = lista_produtos.produtos.length + 1;
  lista_produtos.produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

app.put('/produtos/:id', (req, res) => {
  const produtoId = parseInt(req.params.id);
  const index = lista_produtos.produtos.findIndex(item => item.id === produtoId);
  if (index !== -1) {
    lista_produtos.produtos[index] = req.body;
    res.json(lista_produtos.produtos[index]);
  } else {
    res.status(404).json({ mensagem: "Produto não encontrado" });
  }
});

app.delete('/produtos/:id', (req, res) => {
  const produtoId = parseInt(req.params.id);
  const index = lista_produtos.produtos.findIndex(item => item.id === produtoId);
  if (index !== -1) {
    const produtoExcluido = lista_produtos.produtos.splice(index, 1);
    res.json(produtoExcluido[0]);
  } else {
    res.status(404).json({ mensagem: "Produto não encontrado" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});
