const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let usuarios = [
  { id: 1, nome: 'Luciana' },
  { id: 2, nome: 'João' },
];

// Rota para obter todos os usuários
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// Rota para obter um usuário pelo ID
app.get('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).send('Usuário não encontrado');
  res.json(usuario);
});

// Rota para criar um novo usuário
app.post('/usuarios', (req, res) => {
  const usuario = {
    id: usuarios.length + 1,
    nome: req.body.nome
  };
  usuarios.push(usuario);
  res.status(201).json(usuario);
});

// Atualizar um usuário existente
app.put('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).send('Usuário não encontrado');

  const usuarionovo = usuario.nome;
  
  usuario.nome = req.body.nome;
  res.json({ usuarioAtualizado: usuario, nomeAnterior: usuarionovo });
});

// Deletar um usuário
app.delete('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).send('Usuário não encontrado');

  const index = usuarios.indexOf(usuario);
  usuarios.splice(index, 1);
  res.json(usuario);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
