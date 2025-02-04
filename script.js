// Função para mostrar uma seção e ocultar as outras
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('hidden');
  });
  const sectionToShow = document.getElementById(sectionId);
  if (sectionToShow) {
    sectionToShow.classList.remove('hidden');
  }
}

// Alternar menu lateral
document.getElementById('toggle-menu').addEventListener('click', function () {
  const menuLateral = document.getElementById('menu-lateral');
  menuLateral.classList.toggle('minimizado');

  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
});

// Função para carregar pacientes na tabela
function carregarPacientes() {
  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
  const tbody = document.querySelector('#tabela-pacientes tbody');
  tbody.innerHTML = ''; // Limpa a tabela antes de carregar os dados

  pacientes.forEach((paciente, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="p-2">${paciente.nome}</td>
      <td class="p-2">${paciente.cpf}</td>
      <td class="p-2">${paciente.idade}</td>
      <td class="p-2">${paciente.responsavel}</td>
      <td class="p-2">${paciente.telefone}</td>
      <td class="p-2">${paciente.email}</td>
      <td class="p-2">${paciente.ultimaConsulta}</td>
      <td class="p-2">
        <button onclick="editarPaciente(${index})" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Editar</button>
        <button onclick="excluirPaciente(${index})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Excluir</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Função para editar paciente
function editarPaciente(index) {
  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
  const paciente = pacientes[index];

  // Preenche o formulário com os dados do paciente
  document.getElementById('nome-paciente').value = paciente.nome;
  document.getElementById('cpf-paciente').value = paciente.cpf;
  document.getElementById('idade-paciente').value = paciente.idade;
  document.getElementById('responsavel-paciente').value = paciente.responsavel;
  document.getElementById('telefone-paciente').value = paciente.telefone;
  document.getElementById('email-paciente').value = paciente.email;
  document.getElementById('ultima-consulta').value = paciente.ultimaConsulta;

  // Remove o paciente da lista (para evitar duplicação)
  pacientes.splice(index, 1);
  localStorage.setItem('pacientes', JSON.stringify(pacientes));

  // Atualiza a tabela
  carregarPacientes();
}

// Função para excluir paciente
function excluirPaciente(index) {
  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
  pacientes.splice(index, 1); // Remove o paciente
  localStorage.setItem('pacientes', JSON.stringify(pacientes));
  carregarPacientes(); // Atualiza a tabela
}

// Função para filtrar pacientes
function filtrarPacientes() {
  const nome = document.getElementById('filter-paciente-nome').value.toLowerCase();
  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
  const tbody = document.querySelector('#tabela-pacientes tbody');
  tbody.innerHTML = ''; // Limpa a tabela

  pacientes.forEach((paciente, index) => {
    if (paciente.nome.toLowerCase().includes(nome)) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="p-2">${paciente.nome}</td>
        <td class="p-2">${paciente.cpf}</td>
        <td class="p-2">${paciente.idade}</td>
        <td class="p-2">${paciente.responsavel}</td>
        <td class="p-2">${paciente.telefone}</td>
        <td class="p-2">${paciente.email}</td>
        <td class="p-2">${paciente.ultimaConsulta}</td>
        <td class="p-2">
          <button onclick="editarPaciente(${index})" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Editar</button>
          <button onclick="excluirPaciente(${index})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Excluir</button>
        </td>
      `;
      tbody.appendChild(row);
    }
  });
}

// Função para carregar consultas na tabela
function carregarConsultas() {
  const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
  const tbody = document.querySelector('#tabela-consultas-gerais tbody');
  tbody.innerHTML = ''; // Limpa a tabela antes de carregar os dados

  consultas.forEach((consulta, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="p-2">${consulta.data}</td>
      <td class="p-2">${consulta.horario}</td>
      <td class="p-2">${consulta.nomePaciente}</td>
      <td class="p-2">${consulta.idadePaciente}</td>
      <td class="p-2">${consulta.responsavel}</td>
      <td class="p-2">${consulta.telefone}</td>
      <td class="p-2">${consulta.especialidade}</td>
      <td class="p-2">${consulta.consultorio}</td>
      <td class="p-2">${consulta.especialista}</td>
      <td class="p-2">
        <button onclick="editarConsulta(${index})" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Editar</button>
        <button onclick="excluirConsulta(${index})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Excluir</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Função para editar consulta
function editarConsulta(index) {
  const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
  const consulta = consultas[index];

  // Preenche o formulário com os dados da consulta
  document.getElementById('data-consulta').value = consulta.data;
  document.getElementById('horario-consulta').value = consulta.horario;
  document.getElementById('nome-paciente-consulta').value = consulta.nomePaciente;
  document.getElementById('idade-paciente-consulta').value = consulta.idadePaciente;
  document.getElementById('responsavel-consulta').value = consulta.responsavel;
  document.getElementById('telefone-consulta').value = consulta.telefone;
  document.getElementById('especialidade-consulta').value = consulta.especialidade;
  document.getElementById('consultorio-consulta').value = consulta.consultorio;
  document.getElementById('especialista-consulta').value = consulta.especialista;

  // Remove a consulta da lista (para evitar duplicação)
  consultas.splice(index, 1);
  localStorage.setItem('consultas', JSON.stringify(consultas));

  // Atualiza a tabela
  carregarConsultas();
}

// Função para excluir consulta
function excluirConsulta(index) {
  const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
  consultas.splice(index, 1); // Remove a consulta
  localStorage.setItem('consultas', JSON.stringify(consultas));
  carregarConsultas(); // Atualiza a tabela
}

// Função para filtrar consultas gerais
function filtrarConsultasGerais() {
  const nome = document.getElementById('filter-consulta-geral-nome').value.toLowerCase();
  const data = document.getElementById('filter-consulta-geral-data').value;
  const horario = document.getElementById('filter-consulta-geral-horario').value;
  const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
  const tbody = document.querySelector('#tabela-consultas-gerais tbody');
  tbody.innerHTML = ''; // Limpa a tabela

  consultas.forEach((consulta, index) => {
    if (
      consulta.nomePaciente.toLowerCase().includes(nome) &&
      (data === '' || consulta.data === data) &&
      (horario === '' || consulta.horario === horario)
    ) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="p-2">${consulta.data}</td>
        <td class="p-2">${consulta.horario}</td>
        <td class="p-2">${consulta.nomePaciente}</td>
        <td class="p-2">${consulta.idadePaciente}</td>
        <td class="p-2">${consulta.responsavel}</td>
        <td class="p-2">${consulta.telefone}</td>
        <td class="p-2">${consulta.especialidade}</td>
        <td class="p-2">${consulta.consultorio}</td>
        <td class="p-2">${consulta.especialista}</td>
        <td class="p-2">
          <button onclick="editarConsulta(${index})" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Editar</button>
          <button onclick="excluirConsulta(${index})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Excluir</button>
        </td>
      `;
      tbody.appendChild(row);
    }
  });
}

// Função para carregar especialistas na tabela
function carregarEspecialistas() {
  const especialistas = JSON.parse(localStorage.getItem('especialistas')) || [];
  const tbody = document.querySelector('#tabela-profissionais tbody');
  tbody.innerHTML = ''; // Limpa a tabela antes de carregar os dados

  especialistas.forEach((especialista, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="p-2">${especialista.nome}</td>
      <td class="p-2">${especialista.cpf}</td>
      <td class="p-2">${especialista.especialidade}</td>
      <td class="p-2">${especialista.turno}</td>
      <td class="p-2">${especialista.telefone}</td>
      <td class="p-2">${especialista.email}</td>
      <td class="p-2">
        <button onclick="editarEspecialista(${index})" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Editar</button>
        <button onclick="excluirEspecialista(${index})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Excluir</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Função para editar especialista
function editarEspecialista(index) {
  const especialistas = JSON.parse(localStorage.getItem('especialistas')) || [];
  const especialista = especialistas[index];

  // Preenche o formulário com os dados do especialista
  document.getElementById('nome-especialista').value = especialista.nome;
  document.getElementById('cpf-especialista').value = especialista.cpf;
  document.getElementById('especialidade').value = especialista.especialidade;
  document.getElementById('turno-especialista').value = especialista.turno;
  document.getElementById('telefone-especialista').value = especialista.telefone;
  document.getElementById('email-especialista').value = especialista.email;

  // Remove o especialista da lista (para evitar duplicação)
  especialistas.splice(index, 1);
  localStorage.setItem('especialistas', JSON.stringify(especialistas));

  // Atualiza a tabela
  carregarEspecialistas();
}

// Função para excluir especialista
function excluirEspecialista(index) {
  const especialistas = JSON.parse(localStorage.getItem('especialistas')) || [];
  especialistas.splice(index, 1); // Remove o especialista
  localStorage.setItem('especialistas', JSON.stringify(especialistas));
  carregarEspecialistas(); // Atualiza a tabela
}

// Carregar dados ao abrir a página
window.addEventListener('load', () => {
  carregarPacientes();
  carregarConsultas();
  carregarEspecialistas();
});

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch((error) => {
        console.log('Falha ao registrar o Service Worker:', error);
      });
  });
}
