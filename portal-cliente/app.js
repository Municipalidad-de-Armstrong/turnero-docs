// Datos de Requerimientos y Casos de Uso
const REQUIREMENTS_DATA = [
  {
    id: 'USU-01',
    actor: 'USU',
    title: 'Interfaz para elegir turnos',
    desc: 'El sistema debe contar con una pantalla sencilla y adaptada para ver y reservar citas desde celulares o computadoras.',
    userStories: [
      { detail: 'Permitir al ciudadano elegir el tipo de trámite y luego los detalles específicos del mismo de manera intuitiva.' }
    ],
    details: 'Se implementa a través de un asistente paso a paso que guía al usuario durante todo el proceso.'
  },
  {
    id: 'USU-02',
    actor: 'USU',
    title: 'Registro de ciudadanos',
    desc: 'El ciudadano se registra ingresando su DNI, dirección de correo electrónico, número de teléfono celular y una contraseña.',
    userStories: [
      { detail: 'Registro inicial de ciudadanos con validación de datos para evitar cuentas duplicadas.' },
      { detail: 'Posibilidad de modificar los datos de contacto en cualquier momento.' }
    ],
    details: 'El sistema verifica que no exista otro usuario con el mismo documento o correo, y envía un mensaje de confirmación para activar la cuenta.'
  },
  {
    id: 'USU-03',
    actor: 'USU',
    title: 'Selección de trámite y variantes',
    desc: 'Menú estructurado donde el usuario elige la categoría general del trámite y luego las opciones particulares correspondientes.',
    userStories: [
      { detail: 'Seleccionar el trámite deseado y ver los requisitos y documentos que debe presentar en la oficina.' }
    ],
    details: 'Al seleccionar las opciones del trámite, se informa al usuario la documentación necesaria para la cita.'
  },
  {
    id: 'USU-04',
    actor: 'USU',
    title: 'Selección de múltiples trámites simultáneos',
    desc: 'El ciudadano puede seleccionar más de una opción en una misma reserva para realizar varios trámites en una única visita.',
    userStories: [
      { detail: 'Elegir más de una variante de trámite en la misma reserva para ahorrar tiempo y visitas a la municipalidad.' }
    ],
    details: 'El sistema calcula el tiempo de duración acumulado de todos los trámites seleccionados y reserva un bloque continuo para la atención.'
  },
  {
    id: 'USU-05',
    actor: 'USU',
    title: 'Selección de fecha y hora',
    desc: 'El usuario visualiza los días y horarios libres para elegir el que le resulte más conveniente.',
    userStories: [
      { detail: 'Elegir libremente el horario entre los cupos de agenda disponibles.' }
    ],
    details: 'El sistema reserva inmediatamente el horario elegido para evitar que otro usuario tome el mismo cupo en el mismo momento.'
  },
  {
    id: 'USU-06',
    actor: 'USU',
    title: 'Visualización de disponibilidad',
    desc: 'La pantalla muestra en tiempo real qué fechas y horarios tienen cupos libres y cuáles están completos o cerrados.',
    userStories: [
      { detail: 'Ver claramente qué turnos están vacíos para facilitar una rápida elección.' }
    ],
    details: 'La grilla horaria se actualiza de forma automática en base a las reservas ya confirmadas y la capacidad de atención configurada.'
  },
  {
    id: 'USU-07',
    actor: 'USU',
    title: 'Opción rápida de primer turno disponible',
    desc: 'Un botón que busca y asigna automáticamente la fecha y el horario libre más cercano.',
    userStories: [
      { detail: 'Asignar el turno disponible más próximo de manera automática si se tiene urgencia.' }
    ],
    details: 'El sistema recorre la agenda a partir del momento actual y selecciona el primer espacio vacío con capacidad suficiente.'
  },
  {
    id: 'USU-08',
    actor: 'USU',
    title: 'Notificaciones automáticas',
    desc: 'Envío de confirmaciones, cambios o cancelaciones por tres canales: en la propia página web, por correo electrónico y mediante WhatsApp.',
    userStories: [
      { detail: 'Recibir confirmaciones y avisos de modificación o cancelación de turnos por email y WhatsApp.' }
    ],
    details: 'Los avisos se procesan de manera automática en segundo plano para asegurar una entrega rápida sin demorar al usuario.'
  },
  {
    id: 'USU-09',
    actor: 'USU',
    title: 'Descarga de planillas',
    desc: 'Enlace para bajar los formularios correspondientes que deben presentarse completos el día de la cita.',
    userStories: [
      { detail: 'Descargar el formulario del trámite para traerlo completo a la municipalidad.' }
    ],
    details: 'Las planillas se envían también en los mensajes de confirmación de WhatsApp y correo electrónico.'
  },
  {
    id: 'USU-10',
    actor: 'USU',
    title: 'Avisos de vencimiento de carnet',
    desc: 'El sistema supervisa las fechas de vencimiento de los documentos emitidos y avisa automáticamente al ciudadano con anticipación.',
    userStories: [
      { detail: 'Recibir un recordatorio antes del vencimiento del carnet de conducir para renovarlo a tiempo.' }
    ],
    details: 'Un proceso automático diario busca los carnets que están a punto de vencer en el plazo configurado y despacha alertas al usuario.'
  },
  {
    id: 'USU-11',
    actor: 'USU',
    title: 'Panel personal del ciudadano',
    desc: 'Una sección donde el ciudadano puede ver el historial de sus turnos pasados, activos o sobreturnos.',
    userStories: [
      { detail: 'Visualizar todas las citas y sobreturnos asignados a mi nombre en una sección personal.' }
    ],
    details: 'Permite consultar el estado de cada cita (reservado, completado, cancelado).'
  },
  {
    id: 'ADT-01',
    actor: 'ADT',
    title: 'Panel para el personal municipal',
    desc: 'Acceso privado exclusivo para los operadores del municipio encargado de gestionar turnos y agendas.',
    userStories: [
      { detail: 'Ingresar a un panel exclusivo para ver, crear y modificar turnos de todas las áreas municipales.' }
    ],
    details: 'El ingreso requiere el uso de correo y clave de acceso y está protegido mediante controles de seguridad.'
  },
  {
    id: 'ADT-03',
    actor: 'ADT',
    title: 'Gestión operativa diaria',
    desc: 'Permite al personal registrar nuevos trámites, configurar los requisitos y revisar las citas del día.',
    userStories: [
      { detail: 'Ver, organizar y administrar el flujo de trámites y turnos diarios.' }
    ],
    details: 'Los cambios realizados se aplican de manera instantánea a las pantallas de los ciudadanos.'
  },
  {
    id: 'ADT-04',
    actor: 'ADT',
    title: 'Registro de turnos presenciales o telefónicos',
    desc: 'El personal administrativo puede ingresar turnos manualmente para ciudadanos que asisten en persona o llaman por teléfono.',
    userStories: [
      { detail: 'Cargar un turno manualmente y buscar al ciudadano por su documento, o registrarlo en el momento si no tiene cuenta.' }
    ],
    details: 'Permite unificar la atención telefónica y presencial con el calendario digital del sistema.'
  },
  {
    id: 'ADT-05',
    actor: 'ADT',
    title: 'Modificación de turnos existentes',
    desc: 'El operador municipal puede cambiar la fecha, el horario o reasignar cualquier turno registrado.',
    userStories: [
      { detail: 'Modificar los datos o reprogramar cualquier turno del sistema.' }
    ],
    details: 'Cada modificación genera un registro automático de control para seguridad del municipio.'
  },
  {
    id: 'ADT-06',
    actor: 'ADT',
    title: 'Configuración de requisitos',
    desc: 'El personal municipal puede definir y actualizar qué documentos y requisitos son obligatorios para cada tipo de trámite.',
    userStories: [
      { detail: 'Establecer y editar la documentación requerida que los ciudadanos deben presentar.' }
    ],
    details: 'Los requisitos configurados se muestran de inmediato al ciudadano al momento de reservar su cita.'
  },
  {
    id: 'ADT-07',
    actor: 'ADT',
    title: 'Administración de la agenda',
    desc: 'Configuración de los días hábiles, los horarios de atención de cada oficina y la cantidad de personas que se pueden atender a la vez.',
    userStories: [
      { detail: 'Definir el calendario de atención y los cupos disponibles por bloque horario.' }
    ],
    details: 'Regula de manera automática la cantidad de turnos disponibles que la página ofrecerá a los ciudadanos.'
  },
  {
    id: 'ADT-08',
    actor: 'ADT',
    title: 'Asignación de sobreturnos',
    desc: 'Creación de turnos extraordinarios para urgencias que se atienden fuera del calendario regular.',
    userStories: [
      { detail: 'Cargar sobreturnos en un día específico y asignarles una prioridad de atención.' }
    ],
    details: 'Los sobreturnos no ocupan slots de tiempo de la agenda regular. Se organizan por prioridad de atención y por orden de llegada en una lista de espera diaria.'
  },
  {
    id: 'ADT-09',
    actor: 'ADT',
    title: 'Cierre del trámite y resultado',
    desc: 'Al terminar de atender a un ciudadano, el operador registra si el trámite finalizó correctamente o si faltó documentación.',
    userStories: [
      { detail: 'Marcar el turno como completo, incompleto o ausente según corresponda.' }
    ],
    details: 'Si el trámite es de entrega de licencias o credenciales, al completarse se registra la fecha de vencimiento para activar los recordatorios automáticos.'
  },
  {
    id: 'ADM-01',
    actor: 'ADM',
    title: 'Control global del sistema',
    desc: 'Acceso total para configurar los parámetros generales del sistema, como plazos de cancelación y días de aviso de vencimientos.',
    userStories: [
      { detail: 'Gestionar la configuración general y reglas del sistema de turnos.' }
    ],
    details: 'Gobernanza completa de las variables del turnero municipal.'
  },
  {
    id: 'ADM-03',
    actor: 'ADM',
    title: 'Administración de usuarios internos',
    desc: 'El administrador general puede dar de alta cuentas para el personal municipal de atención al público.',
    userStories: [
      { detail: 'Registrar y crear credenciales de acceso para nuevos empleados del municipio.' }
    ],
    details: 'Garantiza la seguridad controlando quiénes pueden operar el sistema.'
  },
  {
    id: 'ADM-04',
    actor: 'ADM',
    title: 'Baja de usuarios internos',
    desc: 'Permite inhabilitar o eliminar cuentas de empleados municipales en caso de cambios en el personal.',
    userStories: [
      { detail: 'Eliminar o dar de baja cuentas administrativas que ya no deben acceder.' }
    ],
    details: 'Las bajas quedan documentadas de forma inalterable en el sistema de auditoría.'
  }
];

// Instancia de propuestas
let proposalsList = [];

// Inicialización de la Aplicación al Cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  renderRequirements(REQUIREMENTS_DATA);
  setupFilters();
  setupModal();
  setupSimulators();
  loadProposals();
});

// 1. Manejo de Pestañas (Tabs)
function setupTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remover activas
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      // Agregar activa al botón
      tab.classList.add('active');
      
      // Mostrar contenedor
      const contentId = tab.getAttribute('data-tab');
      document.getElementById(contentId).classList.add('active');

      // Si se navega a propuestas, recargar
      if (contentId === 'proposals') {
        loadProposals();
      }
    });
  });
}

// 2. Render de Requerimientos y Buscador
function renderRequirements(data) {
  const container = document.getElementById('requirements-container');
  if (data.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No se encontraron requerimientos con el filtro actual.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  data.forEach(req => {
    const card = document.createElement('div');
    card.className = 'card';
    
    let actorBadgeClass = 'badge-neutral';
    let actorName = 'Usuario';
    if (req.actor === 'USU') { actorBadgeClass = 'badge-orange'; actorName = 'Ciudadano'; }
    if (req.actor === 'ADT') { actorBadgeClass = 'badge-neutral'; actorName = 'Administrativo'; }
    if (req.actor === 'ADM') { actorBadgeClass = 'badge-neutral'; actorName = 'Administrador'; }

    // Generar historias de usuario sin codigos tecnicos
    const huHtml = `<ul class="custom-bullet-list">` +
      req.userStories.map(story => `
        <li>
          ${story.detail}
        </li>
      `).join('') +
      `</ul>`;

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
        <h3 class="card-title" style="margin-bottom: 0;">${req.title}</h3>
        <span class="badge ${actorBadgeClass}">${actorName}</span>
      </div>
      <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${req.desc}</p>
      
      <div>
        <h4 style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.25rem;">Necesidades del usuario</h4>
        ${huHtml}
      </div>

      <div class="use-cases-container">
        <div class="use-case-item">
          <div class="use-case-summary" style="cursor: default;">
            <span>Detalles de funcionamiento</span>
          </div>
          <div class="use-case-content">
            <p>${req.details}</p>
          </div>
        </div>
      </div>

      <div style="margin-top: 1rem; display: flex; justify-content: flex-end;">
        <button class="btn btn-primary" onclick="openFeedbackModal('${req.id}', '${req.title}')">
          Proponer cambio o comentario
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function setupFilters() {
  const searchInput = document.getElementById('search-input');
  const actorFilter = document.getElementById('actor-filter');

  const filterAction = () => {
    const query = searchInput.value.toLowerCase().trim();
    const actor = actorFilter.value;

    const filtered = REQUIREMENTS_DATA.filter(req => {
      const matchesSearch = req.title.toLowerCase().includes(query) || 
                            req.desc.toLowerCase().includes(query) ||
                            req.details.toLowerCase().includes(query) ||
                            req.userStories.some(story => story.detail.toLowerCase().includes(query));
      
      const matchesActor = actor === 'ALL' || req.actor === actor;

      return matchesSearch && matchesActor;
    });

    renderRequirements(filtered);
  };

  searchInput.addEventListener('input', filterAction);
  actorFilter.addEventListener('change', filterAction);
}

// 3. Modal de Propuestas
let currentReqId = '';
let currentReqTitle = '';

function setupModal() {
  const modalOverlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close-btn');
  const cancelBtn = document.getElementById('modal-cancel-btn');
  const form = document.getElementById('feedback-form');

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    form.reset();
  };

  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  
  // Cerrar al hacer clic fuera del modal
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitProposal(closeModal);
  });
}

window.openFeedbackModal = function(id, title) {
  currentReqId = id;
  currentReqTitle = title;
  
  document.getElementById('modal-req-info').innerText = title;
  document.getElementById('modal-overlay').classList.add('active');
  document.getElementById('comment-field').focus();
};

window.openNewRequirementModal = function() {
  currentReqId = 'NUEVO';
  currentReqTitle = 'Nuevo Requerimiento';
  
  document.getElementById('modal-req-info').innerText = 'Proponer un nuevo requerimiento para el sistema';
  document.getElementById('modal-overlay').classList.add('active');
  document.getElementById('comment-field').focus();
};

// 4. API Backend Integración (Save & Load) y Respaldo Local (localStorage)

// Configuración de GitHub (Se auto-detecta si está en GitHub Pages, de lo contrario usa los valores por defecto)
const GITHUB_CONFIG = {
  owner: 'pablocontreras', // Reemplazar con tu usuario de GitHub si falla la auto-detección
  repo: 'Municipalidad-de-Armstrong', // Reemplazar con tu repositorio de GitHub si falla la auto-detección
  label: 'propuesta'
};

// Intentar auto-detectar desde la URL de GitHub Pages
if (window.location.hostname.endsWith('.github.io')) {
  const parts = window.location.pathname.split('/');
  if (parts.length > 1 && parts[1]) {
    GITHUB_CONFIG.owner = window.location.hostname.split('.')[0];
    GITHUB_CONFIG.repo = parts[1];
  }
}

function getProposalsFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem('portal_feedback') || '[]');
  } catch (e) {
    return [];
  }
}

function saveProposalToLocalStorage(prop) {
  const props = getProposalsFromLocalStorage();
  if (!props.some(p => p.id === prop.id)) {
    props.push(prop);
    localStorage.setItem('portal_feedback', JSON.stringify(props));
  }
}

function deleteProposalFromLocalStorage(id) {
  const props = getProposalsFromLocalStorage();
  const filtered = props.filter(p => {
    if (p.id === id) return false;
    if (!p.id && (id === 'undefined' || id === 'null' || !id || id === '')) return false;
    if (String(p.id) === String(id)) return false;
    return true;
  });
  localStorage.setItem('portal_feedback', JSON.stringify(filtered));
}

// Función auxiliar para parsear propuestas desde los Issues de GitHub
function parseProposalFromIssue(issue) {
  try {
    const match = issue.body.match(/<!-- DATA:\s*([\s\S]*?)\s*-->/);
    if (match && match[1]) {
      const data = JSON.parse(match[1]);
      return {
        id: 'github_' + issue.number,
        requirementId: data.requirementId || 'NUEVO',
        requirementTitle: data.requirementTitle || issue.title,
        type: data.type || 'cambio',
        author: data.author || issue.user.login,
        comment: data.comment || '',
        proposedText: data.proposedText || '',
        timestamp: data.timestamp || issue.created_at,
        url: issue.html_url
      };
    }
  } catch (e) {
    console.warn('No se pudo parsear metadata del issue #' + issue.number, e);
  }
  
  // Fallback si no hay metadata formateada
  return {
    id: 'github_' + issue.number,
    requirementId: 'GENERAL',
    requirementTitle: issue.title,
    type: 'cambio',
    author: issue.user.login,
    comment: issue.body,
    proposedText: '',
    timestamp: issue.created_at,
    url: issue.html_url
  };
}

// Función para abrir la ventana de GitHub pre-cargando la propuesta
function openGitHubIssue(prop) {
  const issueTitle = `[Propuesta] ${prop.requirementTitle} - Por ${prop.author}`;
  const issueBody = `### Propuesta de Cambio / Comentario del Cliente

- **Requerimiento:** ${prop.requirementTitle} (${prop.requirementId})
- **Autor:** ${prop.author}
- **Tipo de Propuesta:** ${prop.type === 'nuevo' ? 'Nuevo Requerimiento' : 'Modificación'}

#### Comentario / Razón del cambio:
${prop.comment}

${prop.proposedText ? `#### Texto Propuesto:
\`\`\`
${prop.proposedText}
\`\`\`` : ''}

---
*Esta propuesta fue enviada desde el Portal de Clientes de la Municipalidad.*

<!-- DATA:
{
  "requirementId": "${prop.requirementId}",
  "requirementTitle": "${prop.requirementTitle.replace(/"/g, '\\"')}",
  "type": "${prop.type}",
  "author": "${prop.author.replace(/"/g, '\\"')}",
  "comment": "${prop.comment.replace(/"/g, '\\"').replace(/\n/g, '\\n')}",
  "proposedText": "${prop.proposedText.replace(/"/g, '\\"').replace(/\n/g, '\\n')}",
  "timestamp": "${prop.timestamp}"
}
-->`;

  const githubUrl = `https://github.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}&labels=${GITHUB_CONFIG.label}`;
  window.open(githubUrl, '_blank');
}

async function submitProposal(callback) {
  const author = document.getElementById('author-field').value.trim() || 'Cliente';
  const type = document.getElementById('type-field').value;
  const comment = document.getElementById('comment-field').value.trim();
  const proposedText = document.getElementById('proposed-text-field').value.trim();

  if (!comment) {
    showToast('Por favor escribe tu comentario o propuesta.');
    return;
  }

  const newProp = {
    id: 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    requirementId: currentReqId || 'NUEVO',
    requirementTitle: currentReqTitle || 'Nuevo Requerimiento',
    type: type,
    author: author,
    comment: comment,
    proposedText: proposedText,
    timestamp: new Date().toISOString()
  };

  // Guardar primero localmente
  saveProposalToLocalStorage(newProp);
  showToast('Propuesta guardada localmente.');
  
  // Ofrecer publicar en GitHub
  if (confirm('Tu propuesta se guardó localmente en el navegador. ¿Deseas publicarla oficialmente en GitHub ahora?')) {
    openGitHubIssue(newProp);
  }

  callback();
  loadProposals();
}

async function loadProposals() {
  let serverProps = [];
  
  if (GITHUB_CONFIG.owner && GITHUB_CONFIG.repo) {
    try {
      const response = await fetch(`https://api.github.io/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/issues?labels=${GITHUB_CONFIG.label}&state=all`);
      if (response.ok) {
        const issues = await response.json();
        serverProps = issues.map(parseProposalFromIssue);
      } else {
        console.warn('No se pudieron obtener propuestas de GitHub (Status: ' + response.status + ')');
      }
    } catch (error) {
      console.warn('Error de red al consultar GitHub Issues, operando en modo local.', error);
    }
  }

  // Obtener locales
  const localProps = getProposalsFromLocalStorage();

  // Combinar únicos por ID o por contenido (evita duplicar si ya se subió a GitHub)
  const allProps = [...serverProps];
  localProps.forEach(lp => {
    const isAlreadyUploaded = allProps.some(sp => 
      sp.id === lp.id || 
      (sp.timestamp === lp.timestamp && sp.author === lp.author)
    );
    if (!isAlreadyUploaded) {
      allProps.push(lp);
    }
  });

  // Ordenar por fecha descendiente
  allProps.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  proposalsList = allProps;
  renderProposals(allProps);
}

function renderProposals(proposals) {
  const container = document.getElementById('proposals-container');
  const countBadge = document.getElementById('proposal-count');
  
  if (countBadge) {
    countBadge.innerText = proposals.length;
  }

  if (proposals.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No has registrado ninguna propuesta aún.</p>
        <p style="font-size: 0.8rem; margin-top: 0.5rem;">Navega por la pestaña de Requerimientos y haz clic en "Proponer cambio" para comenzar.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  proposals.forEach(prop => {
    const dateStr = new Date(prop.timestamp).toLocaleString();
    const item = document.createElement('div');
    item.className = 'proposal-item';
    
    let typeLabel = prop.type === 'nuevo' ? 'Nuevo Requerimiento' : 'Modificación';
    let typeClass = prop.type === 'nuevo' ? 'badge-orange' : 'badge-neutral';
    
    let actionsHtml = '';
    if (prop.id.startsWith('github_')) {
      actionsHtml = `
        <a href="${prop.url}" target="_blank" class="btn btn-primary" style="text-decoration: none; display: inline-flex; align-items: center; justify-content: center; background-color: #24292e; border-color: #24292e;">
          Ver en GitHub ↗
        </a>
      `;
    } else {
      actionsHtml = `
        <span class="badge badge-neutral" style="align-self: center;">Solo local</span>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-danger" onclick="deleteProposal('${prop.id}')">Eliminar</button>
          <button class="btn btn-primary" onclick="publishLocalProposal('${prop.id}')">Publicar en GitHub</button>
        </div>
      `;
    }

    item.innerHTML = `
      <div class="proposal-header">
        <div>
          <span>Por: <strong>${prop.author}</strong></span> | 
          <span class="badge ${typeClass}">${typeLabel}</span>
        </div>
        <span>${dateStr}</span>
      </div>
      <div class="proposal-body">
        <p style="margin-bottom: 0.5rem;">
          Destinado a: <span class="proposal-target">${prop.requirementTitle}</span>
        </p>
        <p style="font-weight: 500; color: var(--text-main); margin-bottom: 0.25rem;">Comentario:</p>
        <p style="color: var(--text-secondary); background-color: var(--bg-main); padding: 0.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border-light); margin-bottom: 0.5rem; font-style: italic;">
          "${prop.comment}"
        </p>
        ${prop.proposedText ? `
          <p style="font-weight: 500; color: var(--text-main); margin-bottom: 0.25rem;">Texto Propuesto:</p>
          <pre style="font-family: var(--font-family); font-size: 0.85rem; white-space: pre-wrap; background-color: #f3f4f6; padding: 0.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border-light); color: var(--text-secondary);">${prop.proposedText}</pre>
        ` : ''}
      </div>
      <div style="margin-top: 1rem; display: flex; justify-content: flex-end; gap: 0.5rem;">
        ${actionsHtml}
      </div>
    `;
    container.appendChild(item);
  });
}

window.deleteProposal = async function(id) {
  if (!confirm('¿Estás seguro de que deseas eliminar esta propuesta local?')) return;

  // Borrar de localStorage
  deleteProposalFromLocalStorage(id);
  showToast('Propuesta local eliminada.');
  loadProposals();
};

window.publishLocalProposal = function(id) {
  const props = getProposalsFromLocalStorage();
  const prop = props.find(p => p.id === id);
  if (prop) {
    openGitHubIssue(prop);
  } else {
    showToast('No se encontró la propuesta local.');
  }
};

window.exportProposalsMarkdown = function() {
  if (proposalsList.length === 0) {
    showToast('No hay propuestas para exportar.');
    return;
  }

  let textContent = `Propuestas de Cambio y Comentarios del Cliente\n`;
  textContent += `Generado el: ${new Date().toLocaleString()}\n\n`;
  textContent += `Este archivo consolida las propuestas y comentarios realizados por el cliente en el portal.\n\n`;
  textContent += `--------------------------------------------------\n\n`;

  proposalsList.forEach((prop, index) => {
    textContent += `Propuesta ${index + 1}:\n`;
    textContent += `- Tipo: ${prop.type === 'nuevo' ? 'Nuevo Requerimiento' : 'Modificación'}\n`;
    textContent += `- Destinado a: ${prop.requirementTitle}\n`;
    textContent += `- Autor: ${prop.author}\n`;
    textContent += `- Comentario: ${prop.comment}\n`;
    if (prop.proposedText) {
      textContent += `- Texto Propuesto: ${prop.proposedText}\n`;
    }
    textContent += `\n--------------------------------------------------\n\n`;
  });

  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `propuestas_cliente_${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Archivo de propuestas descargado.');
};

// 5. Toast Notification
function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      container.removeChild(toast);
    }, 300);
  }, 3500);
}

// 6. Simuladores Interactivos (Sistema de Diseño)
function setupSimulators() {
  // Simulador A: Carrito de Variantes
  const checkboxes = document.querySelectorAll('.sim-variant-check');
  const totalDurationLabel = document.getElementById('sim-total-duration');
  
  const calculateTotal = () => {
    let total = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) {
        total += parseInt(cb.getAttribute('data-duration'));
      }
    });
    totalDurationLabel.innerText = total;
  };

  checkboxes.forEach(cb => {
    cb.addEventListener('change', calculateTotal);
  });

  // Simulador B: Grilla de Slots
  const slotItems = document.querySelectorAll('.slot-item:not(.occupied)');
  const bookingStatusLabel = document.getElementById('sim-booking-status');

  slotItems.forEach(slot => {
    slot.addEventListener('click', () => {
      slotItems.forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
      const time = slot.getAttribute('data-time');
      bookingStatusLabel.innerHTML = `
        <span style="color: var(--state-completo); font-weight: 600;">
          Seleccionado: horario de las ${time} hs.
        </span>
      `;
    });
  });
}
