document.addEventListener('DOMContentLoaded', () => {
  // MÓDULO DE LOGIN POR SENHA
  const loginScreen = document.getElementById('login-screen');
  const loginForm = document.getElementById('login-form');
  const loginPassword = document.getElementById('login-password');
  const loginError = document.getElementById('login-error');

  // Exibe a tela de login ao carregar a página
  loginScreen.style.display = 'flex';

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (loginPassword.value === 'Clinicafono1570') {
      // Se a senha estiver correta, oculta a tela de login e exibe a mensagem de boas-vindas
      loginScreen.style.display = 'none';
      showSection('welcome');
    } else {
      // Em caso de senha incorreta, exibe a mensagem de erro
      loginError.classList.remove('hidden');
      loginError.textContent = 'Senha incorreta. Tente novamente.';
    }
  });

  // Mapeamento das seções
  const sections = {
    'welcome': document.getElementById('welcome'),
    'cadastro-pacientes': document.getElementById('cadastro-pacientes'),
    'cadastro-especialistas': document.getElementById('cadastro-especialistas'),
    'cadastro-consultas': document.getElementById('cadastro-consultas'),
    'consultas-gerais': document.getElementById('consultas-gerais'),
    'consultas-dia': document.getElementById('consultas-dia'),
    'pacientes': document.getElementById('pacientes'),
    'profissionais': document.getElementById('profissionais')
  };

  // Mapeamento dos formulários
  const forms = {
    paciente: document.getElementById('form-paciente'),
    especialista: document.getElementById('form-especialista'),
    consulta: document.getElementById('form-consulta')
  };

  // Carrega os dados do localStorage
  let dbPacientes = JSON.parse(localStorage.getItem('db_pacientes')) || [];
  let dbEspecialistas = JSON.parse(localStorage.getItem('db_especialistas')) || [];
  let dbConsultas = JSON.parse(localStorage.getItem('db_consultas')) || [];

  // Variáveis de edição separadas para cada entidade
  let editingPacienteId = null;
  let editingEspecialistaId = null;
  let editingConsultaId = null;

  // Função para salvar dados no localStorage
  const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Função para mostrar uma seção (remove/adiciona a classe 'hidden')
  window.showSection = (sectionId) => {
    Object.entries(sections).forEach(([key, section]) => {
      if (key === sectionId) {
        section.classList.remove('hidden');
        section.classList.add('active', 'fade-in');
      } else {
        section.classList.add('hidden');
        section.classList.remove('active');
      }
    });
  };

  // Função para alternar o menu lateral
  const toggleMenu = () => {
    const menuLateral = document.getElementById('menu-lateral');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    menuLateral.classList.toggle('minimizado');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
  };
  document.getElementById('toggle-menu').addEventListener('click', toggleMenu);

  // Função para adicionar/atualizar um paciente
  if (forms.paciente) {
    forms.paciente.addEventListener('submit', (e) => {
      e.preventDefault();
      const paciente = {
        id: editingPacienteId || Date.now(),
        nome: document.getElementById('nome-paciente').value,
        cpf: document.getElementById('cpf-paciente').value,
        idade: document.getElementById('idade-paciente').value,
        responsavel: document.getElementById('responsavel-paciente').value,
        telefone: document.getElementById('telefone-paciente').value,
        email: document.getElementById('email-paciente').value,
        ultimaConsulta: document.getElementById('ultima-consulta').value
      };

      if (editingPacienteId) {
        const index = dbPacientes.findIndex(p => p.id === editingPacienteId);
        dbPacientes[index] = paciente;
        editingPacienteId = null;
      } else {
        dbPacientes.push(paciente);
      saveData('db_pacientes', dbPacientes);
      forms.paciente.reset();
      updatePacientesTable();
      alert('Paciente salvo com sucesso!');
    });
  }

  // Função para atualizar a tabela de pacientes
  window.updatePacientesTable = function () {
    const tabela = document.getElementById('tabela-pacientes');
    const tbody = tabela.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    dbPacientes.forEach(paciente => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="p-2">${paciente.nome}</td>
        <td class="p-2">${paciente.cpf}</td>
        <td class="p-2">${paciente.idade}</td>
        <td class="p-2">${paciente.responsavel}</td>
        <td class="p-2">${paciente.telefone}</td>
        <td class="p-2">${paciente.email}</td>
        <td class="p-2">${paciente.ultimaConsulta}</td>
        <td class="p-2 flex space-x-2">
          <button onclick="editarPaciente(${paciente.id})" class="bg-yellow-500 text-white px-2 py-1 rounded">Editar</button>
          <button onclick="excluirPaciente(${paciente.id})" class="bg-red-500 text-white px-2 py-1 rounded">Excluir</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  };

  // Funções para editar e excluir paciente
  window.editarPaciente = function (id) {
    const paciente = dbPacientes.find(p => p.id === id);
    if (paciente) {
      editingPacienteId = id;
      document.getElementById('nome-paciente').value = paciente.nome;
      document.getElementById('cpf-paciente').value = paciente.cpf;
      document.getElementById('idade-paciente').value = paciente.idade;
      document.getElementById('responsavel-paciente').value = paciente.responsavel;
      document.getElementById('telefone-paciente').value = paciente.telefone;
      document.getElementById('email-paciente').value = paciente.email;
      document.getElementById('ultima-consulta').value = paciente.ultimaConsulta;
      showSection('cadastro-pacientes');
    }
  };

  window.excluirPaciente = function (id) {
    if (confirm('Tem certeza que deseja excluir este paciente?')) {
      dbPacientes = dbPacientes.filter(p => p.id !== id);
      saveData('db_pacientes', dbPacientes);
      updatePacientesTable();
    }
  };

  // Função para adicionar/atualizar uma consulta
  if (forms.consulta) {
    forms.consulta.addEventListener('submit', (e) => {
      e.preventDefault();
      const consulta = {
        id: editingConsultaId || Date.now(),
        data: document.getElementById('data-consulta').value,
        horario: document.getElementById('horario-consulta').value,
        paciente: document.getElementById('nome-consulta').value,
        idade: document.getElementById('idade-consulta').value,
        responsavel: document.getElementById('responsavel-consulta').value,
        telefone: document.getElementById('telefone-consulta').value,
        especialidade: document.getElementById('especialidade-consulta').value,
        consultorio: document.getElementById('consultorio-consulta').value,
        especialista: document.getElementById('especialista-consulta').value
      };

      if (editingConsultaId) {
        const index = dbConsultas.findIndex(c => c.id === editingConsultaId);
        dbConsultas[index] = consulta;
        editingConsultaId = null;
      } else {
        dbConsultas.push(consulta);
      }

      saveData('db_consultas', dbConsultas);
      forms.consulta.reset();
      updateConsultasTables();
      alert('Consulta salva com sucesso!');
    });
  }

  // Função para atualizar as tabelas de consultas
  window.updateConsultasTables = function () {
    const tabelaConsultasGerais = document.getElementById('tabela-consultas-gerais').getElementsByTagName('tbody')[0];
    const tabelaConsultasDia = document.getElementById('tabela-consultas-dia').getElementsByTagName('tbody')[0];
    tabelaConsultasGerais.innerHTML = '';
    tabelaConsultasDia.innerHTML = '';

    const hoje = new Date().toISOString().split('T')[0];

    dbConsultas.forEach(consulta => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="p -2">${consulta.data}</td>
        <td class="p-2">${consulta.horario}</td>
        <td class="p-2">${consulta.paciente}</td>
        <td class="p-2">${consulta.idade}</td>
        <td class="p-2">${consulta.responsavel}</td>
        <td class="p-2">${consulta.telefone}</td>
        <td class="p-2">${consulta.especialidade}</td>
        <td class="p-2">${consulta.consultorio}</td>
        <td class="p-2">${consulta.especialista}</td>
        <td class="p-2 flex space-x-2">
          <button onclick="editarConsulta(${consulta.id})" class="bg-yellow-500 text-white px-2 py-1 rounded">Editar</button>
          <button onclick="excluirConsulta(${consulta.id})" class="bg-red-500 text-white px-2 py-1 rounded">Excluir</button>
        </td>
      `;
      tabelaConsultasGerais.appendChild(row);

      if (consulta.data === hoje) {
        const rowDia = row.cloneNode(true);
        tabelaConsultasDia.appendChild(rowDia);
      }
    });
  };

  // Funções para editar e excluir consulta
  window.editarConsulta = function (id) {
    const consulta = dbConsultas.find(c => c.id === id);
    if (consulta) {
      editingConsultaId = id;
      document.getElementById('data-consulta').value = consulta.data;
      document.getElementById('horario-consulta').value = consulta.horario;
      document.getElementById('nome-consulta').value = consulta.paciente;
      document.getElementById('idade-consulta').value = consulta.idade;
      document.getElementById('responsavel-consulta').value = consulta.responsavel;
      document.getElementById('telefone-consulta').value = consulta.telefone;
      document.getElementById('especialidade-consulta').value = consulta.especialidade;
      document.getElementById('consultorio-consulta').value = consulta.consultorio;
      document.getElementById('especialista-consulta').value = consulta.especialista;
      showSection('cadastro-consultas');
    }
  };

  window.excluirConsulta = function (id) {
    if (confirm('Tem certeza que deseja excluir esta consulta?')) {
      dbConsultas = dbConsultas.filter(c => c.id !== id);
      saveData('db_consultas', dbConsultas);
      updateConsultasTables();
    }
  };

  // Função para adicionar/atualizar um especialista
  if (forms.especialista) {
    forms.especialista.addEventListener('submit', (e) => {
      e.preventDefault();
      const especialista = {
        id: editingEspecialistaId || Date.now(),
        nome: document.getElementById('nome-especialista').value,
        cpf: document.getElementById('cpf-especialista').value,
        especialidade: document.getElementById('especialidade-especialista').value,
        turno: document.getElementById('turno-especialista').value,
        telefone: document.getElementById('telefone-especialista').value,
        email: document.getElementById('email-especialista').value
      };

      if (editingEspecialistaId) {
        const index = dbEspecialistas.findIndex(e => e.id === editingEspecialistaId);
        dbEspecialistas[index] = especialista;
        editingEspecialistaId = null;
      } else {
        dbEspecialistas.push(especialista);
      }

      saveData('db_especialistas', dbEspecialistas);
      forms.especialista.reset();
      updateProfissionaisTable();
      alert('Especialista salvo com sucesso!');
    });
  }

  // Função para atualizar a tabela de profissionais
  window.updateProfissionaisTable = function () {
    const tabela = document.getElementById('tabela-profissionais');
    const tbody = tabela.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    dbEspecialistas.forEach(especialista => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="p-2">${especialista.nome}</td>
        <td class="p-2">${especialista.cpf}</td>
        <td class="p-2">${especialista.especialidade}</td>
        <td class="p-2">${especialista.turno}</td>
        <td class="p-2">${especialista.telefone}</td>
        <td class="p-2">${especialista.email}</td>
        <td class="p-2">
          <button onclick="editarEspecialista(${especialista.id})" class="bg-yellow-500 text-white px- 2 py-1 rounded">Editar</button>
          <button onclick="excluirEspecialista(${especialista.id})" class="bg-red-500 text-white px-2 py-1 rounded">Excluir</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  };

  // Funções para editar e excluir especialista
  window.editarEspecialista = function (id) {
    const especialista = dbEspecialistas.find(e => e.id === id);
    if (especialista) {
      editingEspecialistaId = id;
      document.getElementById('nome-especialista').value = especialista.nome;
      document.getElementById('cpf-especialista').value = especialista.cpf;
      document.getElementById('especialidade-especialista').value = especialista.especialidade;
      document.getElementById('turno-especialista').value = especialista.turno;
      document.getElementById('telefone-especialista').value = especialista.telefone;
      document.getElementById('email-especialista').value = especialista.email;
      showSection('cadastro-especialistas');
    }
  };

  window.excluirEspecialista = function (id) {
    if (confirm('Tem certeza que deseja excluir este especialista?')) {
      dbEspecialistas = dbEspecialistas.filter(e => e.id !== id);
      saveData('db_especialistas', dbEspecialistas);
      updateProfissionaisTable();
    }
  };

  // Inicialização das tabelas e carregamento dos dados
  updatePacientesTable();
  updateConsultasTables();
  updateProfissionaisTable();

  // Registra o Service Worker, se suportado
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch((error) => {
          console.log('Falha ao registrar o Service Worker:', error);
        });
    });
  }
});