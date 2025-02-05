document.addEventListener('DOMContentLoaded', () => {
  const forms = {
    paciente: document.getElementById('form-paciente'),
    consulta: document.getElementById('form-consulta'),
    especialista: document.getElementById('form-especialista')
  };

  // Banco de dados inicial
  let dbPacientes = JSON.parse(localStorage.getItem('db_pacientes')) || [];
  let dbConsultas = JSON.parse(localStorage.getItem('db_consultas')) || [];
  let dbEspecialistas = JSON.parse(localStorage.getItem('db_especialistas')) || [];
  
  // Variáveis de controle de edição
  let editingPacienteId = null;
  let editingConsultaId = null;
  let editingEspecialistaId = null;

  // ========== FUNÇÕES GERAIS ========== //
  function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
      section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
  }

  // ========== PACIENTES ========== //
  if (forms.paciente) {
    forms.paciente.addEventListener('submit', (e) => {
      e.preventDefault();
      const paciente = {
        id: editingPacienteId || Date.now(),
        nome: document.getElementById('nome-paciente').value,
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
      }

      saveData('db_pacientes', dbPacientes);
      forms.paciente.reset();
      updatePacientesTable();
      alert('Paciente salvo com sucesso!');
    });
  }

  window.updatePacientesTable = function () {
    const tbody = document.getElementById('tabela-pacientes').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    dbPacientes.forEach(paciente => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="p-2">${paciente.nome}</td>
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

  window.editarPaciente = function (id) {
    const paciente = dbPacientes.find(p => p.id === id);
    if (paciente) {
      editingPacienteId = id;
      document.getElementById('nome-paciente').value = paciente.nome;
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

  // ========== CONSULTAS ========== //
  if (forms.consulta) {
    forms.consulta.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Validação básica
      if (!document.getElementById('data-consulta').value || 
          !document.getElementById('nome-consulta').value) {
        alert('Preencha os campos obrigatórios!');
        return;
      }

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

      // Atualiza ou adiciona
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
      alert('Consulta agendada com sucesso!');
    });
  }

  window.updateConsultasTables = function () {
    const hoje = new Date().toISOString().split('T')[0];
    const tables = ['tabela-consultas-gerais', 'tabela-consultas-dia'];

    tables.forEach(tableId => {
      const tbody = document.getElementById(tableId).getElementsByTagName('tbody')[0];
      tbody.innerHTML = '';

      dbConsultas.forEach(consulta => {
        if (tableId === 'tabela-consultas-dia' && consulta.data !== hoje) return;

        const row = document.createElement('tr');
        row.innerHTML = `
          <td class="p-2">${consulta.data}</td>
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
        tbody.appendChild(row);
      });
    });
  };

  window.editarConsulta = function (id) {
    const consulta = dbConsultas.find(c => c.id === id);
    if (consulta) {
      editingConsultaId = id;
      // Preenche todos os campos do formulário
      document.getElementById('data-consulta').value = consulta.data;
      document.getElementById('horario-consulta').value = consulta.horario;
      document.getElementById('nome-consulta').value = consulta.paciente;
      // ... (preencher outros campos)
      showSection('cadastro-consultas');
    }
  };

  window.excluirConsulta = function (id) {
    if (confirm('Excluir esta consulta?')) {
      dbConsultas = dbConsultas.filter(c => c.id !== id);
      saveData('db_consultas', dbConsultas);
      updateConsultasTables();
    }
  };

  // ========== ESPECIALISTAS ========== //
  if (forms.especialista) {
    forms.especialista.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Validação
      if (!document.getElementById('nome-especialista').value || 
          !document.getElementById('cpf-especialista').value) {
        alert('Preencha os campos obrigatórios!');
        return;
      }

      const especialista = {
        id: editingEspecialistaId || Date.now(),
        nome: document.getElementById('nome-especialista').value,
        cpf: document.getElementById('cpf-especialista').value,
        especialidade: document.getElementById('especialidade-especialista').value,
        turno: document.getElementById('turno-especialista').value,
        telefone: document.getElementById('telefone-especialista').value,
        email: document.getElementById('email-especialista').value
      };

      // Atualiza ou adiciona
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
      alert('Especialista cadastrado!');
    });
  }

  window.updateProfissionaisTable = function () {
    const tbody = document.getElementById('tabela-profissionais').getElementsByTagName('tbody')[0];
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
        <td class="p-2 flex space-x-2">
          <button onclick="editarEspecialista(${especialista.id})" class="bg-yellow-500 text-white px-2 py-1 rounded">Editar</button>
          <button onclick="excluirEspecialista(${especialista.id})" class="bg-red-500 text-white px-2 py-1 rounded">Excluir</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  };

  window.editarEspecialista = function (id) {
    const especialista = dbEspecialistas.find(e => e.id === id);
    if (especialista) {
      editingEspecialistaId = id;
      // Preenche o formulário
      document.getElementById('nome-especialista').value = especialista.nome;
      document.getElementById('cpf-especialista').value = especialista.cpf;
      // ... (preencher outros campos)
      showSection('cadastro-especialistas');
    }
  };

  window.excluirEspecialista = function (id) {
    if (confirm('Excluir este especialista?')) {
      dbEspecialistas = dbEspecialistas.filter(e => e.id !== id);
      saveData('db_especialistas', dbEspecialistas);
      updateProfissionaisTable();
    }
  };

  // ========== INICIALIZAÇÃO ========== //
  updatePacientesTable();
  updateConsultasTables();
  updateProfissionaisTable();

  // Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => console.log('SW registrado:', registration))
      .catch(error => console.log('Falha no SW:', error));
  }
});