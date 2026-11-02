// ¿Qué harías tú? - lógica del juego
// El progreso se guarda localmente en este navegador mediante localStorage.

const categories = [
  { name: "Familia", icon: "🏡", description: "Convivencia y apoyo" },
  { name: "Amistad", icon: "🤝", description: "Confianza y solidaridad" },
  { name: "Escuela", icon: "🎒", description: "Inclusión y compañerismo" },
  { name: "Respeto", icon: "💗", description: "Límites y aceptación" },
  { name: "Comunicación", icon: "💬", description: "Diálogo y escucha" }
];

// Cada categoría contiene 10 situaciones. La dificultad se distribuye entre ellas.
const questions = [
  // FAMILIA (10)
  {c:"Familia",l:"Fácil",t:"Una tarea en casa",q:"En casa todos tienen tareas que realizar. Un familiar está ocupado y no puede terminar la suya. ¿Qué harías?",a:["Criticarlo delante de todos.","Preguntarle si necesita ayuda y organizarse juntos.","Ignorar la situación."],k:1,e:"Ofrecer ayuda y organizarse demuestra colaboración y fortalece la convivencia familiar."},
  {c:"Familia",l:"Fácil",t:"Un día difícil",q:"Un familiar llega a casa preocupado y casi no habla. ¿Qué harías?",a:["Exigirle que cuente todo inmediatamente.","Burlarte de su estado de ánimo.","Darle espacio y preguntarle con respeto si desea conversar."],k:2,e:"Respetar sus tiempos y mostrar interés permite que se sienta acompañado sin presión."},
  {c:"Familia",l:"Fácil",t:"Compartir responsabilidades",q:"Te corresponde ordenar un espacio común de la casa. ¿Qué harías?",a:["Cumplir tu responsabilidad sin esperar que otros lo hagan.","Dejarlo para que alguien más lo resuelva.","Discutir porque no quieres colaborar."],k:0,e:"Cumplir los acuerdos ayuda a mantener un ambiente ordenado y respetuoso."},
  {c:"Familia",l:"Intermedio",t:"Una opinión diferente",q:"Tú y un familiar tienen opiniones distintas sobre un plan familiar. ¿Cómo actuarías?",a:["Interrumpir hasta imponer tu idea.","Escuchar su punto de vista y explicar el tuyo con calma.","Dejar de hablarle para evitar el tema."],k:1,e:"Escuchar y expresar las ideas con calma ayuda a encontrar acuerdos sin desvalorizar a nadie."},
  {c:"Familia",l:"Intermedio",t:"Un error en casa",q:"Un hermano o hermana rompe accidentalmente un objeto que apreciabas. ¿Qué harías?",a:["Insultarlo para que aprenda.","Contar a todos el error para avergonzarlo.","Explicar que te molestó y conversar sobre cómo resolverlo."],k:2,e:"Expresar el malestar sin agredir permite solucionar el problema y cuidar el vínculo."},
  {c:"Familia",l:"Intermedio",t:"Necesitas apoyo",q:"Tienes muchas responsabilidades escolares y familiares y sientes que no puedes con todo. ¿Qué harías?",a:["Hablar con alguien de confianza y pedir ayuda para organizarte.","Ocultar lo que sucede y culpar a los demás.","Descargar tu molestia con cualquier familiar."],k:0,e:"Pedir apoyo es una forma responsable de comunicar tus necesidades."},
  {c:"Familia",l:"Difícil",t:"Un desacuerdo importante",q:"En una reunión familiar surge un desacuerdo y varias personas comienzan a hablar al mismo tiempo. ¿Qué sería lo más adecuado?",a:["Gritar más fuerte para que te escuchen.","Proponer turnarse para hablar y escuchar cada opinión.","Retirarte dejando mensajes ofensivos."],k:1,e:"Establecer turnos y escuchar reduce la tensión y permite comprender diferentes puntos de vista."},
  {c:"Familia",l:"Difícil",t:"Un límite personal",q:"Un familiar insiste en revisar tus conversaciones privadas aunque ya expresaste que te incomoda. ¿Qué harías?",a:["Aceptar siempre, aunque te incomode.","Responder con insultos.","Explicar con firmeza y respeto que necesitas privacidad y buscar apoyo si no se respeta ese límite."],k:2,e:"La privacidad también es importante en la familia. Comunicar límites con respeto y buscar apoyo cuando sea necesario protege tu bienestar."},
  {c:"Familia",l:"Difícil",t:"Un comentario injusto",q:"Durante una discusión, un familiar hace una generalización injusta sobre ti. ¿Cómo responderías?",a:["Pedir que conversen sobre el hecho concreto sin descalificaciones.","Devolverle otra ofensa.","Compartir el comentario para que todos se burlen."],k:0,e:"Hablar sobre hechos concretos evita etiquetas y ayuda a resolver el desacuerdo con respeto."},
  {c:"Familia",l:"Difícil",t:"Apoyar sin decidir por otro",q:"Un familiar te cuenta una decisión personal y te pide opinión, pero tú elegirías algo diferente. ¿Qué harías?",a:["Decidir por esa persona porque crees saber qué le conviene.","Compartir tu opinión con respeto y reconocer que la decisión le corresponde.","Dejar de apoyarla por no seguir tu consejo."],k:1,e:"Acompañar no significa controlar. Es importante respetar la autonomía de cada persona."},

  // AMISTAD (10)
  {c:"Amistad",l:"Fácil",t:"Un amigo está triste",q:"Tu amigo está triste porque tuvo una discusión con otro compañero. ¿Qué harías?",a:["Burlarte para que se olvide.","Escucharlo y ofrecerle apoyo.","Ignorarlo porque no es tu problema."],k:1,e:"Escuchar y apoyar demuestra empatía, solidaridad y confianza."},
  {c:"Amistad",l:"Fácil",t:"Un secreto",q:"Un amigo te cuenta algo personal y te pide que no lo difundas. ¿Qué harías?",a:["Contárselo a otros como una noticia.","Publicar una indirecta en redes.","Respetar su confianza y no compartirlo."],k:2,e:"Respetar la privacidad fortalece la confianza. Si existe un riesgo para su seguridad, busca ayuda de un adulto de confianza."},
  {c:"Amistad",l:"Fácil",t:"Un nuevo compañero",q:"Un estudiante nuevo quiere integrarse al grupo de amigos. ¿Qué harías?",a:["Invitarlo a participar y conocerlo.","Excluirlo porque no lo conoces.","Hacer bromas sobre él."],k:0,e:"Incluir a otras personas favorece la amistad y crea un ambiente acogedor."},
  {c:"Amistad",l:"Intermedio",t:"Una promesa incumplida",q:"Un amigo no pudo cumplir un plan que habían acordado y no te avisó a tiempo. ¿Qué harías?",a:["Terminar la amistad sin escucharlo.","Explicarle cómo te sentiste y escuchar qué ocurrió.","Inventar un rumor sobre él."],k:1,e:"Hablar con sinceridad permite expresar sentimientos y comprender lo sucedido."},
  {c:"Amistad",l:"Intermedio",t:"Presión del grupo",q:"Tus amigos quieren que participes en una broma que podría humillar a otro estudiante. ¿Qué harías?",a:["Participar para no quedar fuera.","Grabar la broma y compartirla.","Negarte y proponer una actividad que no lastime a nadie."],k:2,e:"Una amistad saludable no exige hacer algo que dañe a otra persona. Decir no también es una decisión valiente."},
  {c:"Amistad",l:"Intermedio",t:"Un desacuerdo",q:"Tu amigo piensa diferente a ti sobre un tema importante. ¿Qué harías?",a:["Respetar su opinión y conversar sin intentar imponer la tuya.","Decir que su opinión no vale.","Evitar que participe en el grupo."],k:0,e:"La amistad permite tener diferencias. El respeto no depende de pensar igual."},
  {c:"Amistad",l:"Difícil",t:"Una amistad posesiva",q:"Un amigo se molesta cuando compartes tiempo con otras personas y te exige estar siempre disponible. ¿Qué harías?",a:["Dejar todas tus otras amistades para evitar problemas.","Explicarle que puedes tener distintas amistades y establecer límites.","Aceptar que controle con quién hablas."],k:1,e:"Las amistades saludables respetan la autonomía y no deben controlar las relaciones de los demás."},
  {c:"Amistad",l:"Difícil",t:"Un rumor en el grupo",q:"En tu grupo circula un rumor sobre una amiga, pero nadie sabe si es cierto. ¿Qué harías?",a:["Repetirlo para encajar.","Añadir detalles para hacerlo más interesante.","No difundirlo y animar al grupo a no juzgar sin conocer los hechos."],k:2,e:"No difundir rumores protege la privacidad y evita daños. Es mejor buscar información responsablemente."},
  {c:"Amistad",l:"Difícil",t:"Reconocer un error",q:"Te das cuenta de que hiciste un comentario que lastimó a un amigo, aunque no era tu intención. ¿Qué harías?",a:["Reconocer el efecto de tus palabras, disculparte y escucharle.","Decir que exagera.","Culpar a otra persona."],k:0,e:"Una disculpa sincera reconoce el daño, evita excusas y busca reparar la relación."},
  {c:"Amistad",l:"Difícil",t:"Apoyo y confidencialidad",q:"Un amigo te cuenta que está pasando por una situación que le hace sentir inseguro y te pide que no se lo digas a nadie. ¿Qué harías?",a:["Prometer guardar silencio sin importar lo que ocurra.","Escucharlo y explicarle que, si su seguridad está en riesgo, buscarán ayuda de un adulto confiable.","Contarlo a todo el grupo."],k:1,e:"Puedes respetar su confianza y, al mismo tiempo, buscar ayuda responsable si su seguridad o bienestar están en riesgo."},

  // ESCUELA (10)
  {c:"Escuela",l:"Fácil",t:"Trabajo en equipo",q:"En un trabajo grupal, un compañero tiene dificultades para comprender la actividad. ¿Qué harías?",a:["Excluirlo del trabajo.","Hacer todo sin explicarle nada.","Explicarle la actividad y repartir las tareas de manera justa."],k:2,e:"La cooperación permite que todos participen y aprendan."},
  {c:"Escuela",l:"Fácil",t:"Alguien está solo",q:"Durante el recreo observas que un estudiante está solo. ¿Qué harías?",a:["Acercarte amablemente e invitarlo a conversar o jugar.","Reírte con tus amigos.","Ignorarlo siempre."],k:0,e:"Un gesto de inclusión puede ayudar a que otra persona se sienta bienvenida."},
  {c:"Escuela",l:"Fácil",t:"Cuidar los materiales",q:"Un compañero necesita un material que tú estás utilizando y te lo pide amablemente. ¿Qué harías?",a:["Negarte sin escucharlo.","Coordinar para compartirlo cuando termines o si es posible.","Esconderlo."],k:1,e:"Compartir y llegar a acuerdos favorece la cooperación."},
  {c:"Escuela",l:"Intermedio",t:"Una burla en clase",q:"Escuchas que varios estudiantes se burlan de un compañero por equivocarse al responder. ¿Qué harías?",a:["Sumarte a las burlas.","Grabarlo para compartirlo.","No participar, mostrar respeto y buscar apoyo docente si continúa."],k:2,e:"No reforzar las burlas y pedir apoyo ayuda a mantener un ambiente seguro."},
  {c:"Escuela",l:"Intermedio",t:"Crédito por el trabajo",q:"Un compañero presenta como propia una idea que tú aportaste al grupo. ¿Qué harías?",a:["Conversar con él y aclarar cómo reconocer las contribuciones de todos.","Insultarlo delante del salón.","Arruinar su parte del trabajo."],k:0,e:"Aclarar el problema con respeto permite defender tu aporte sin generar más conflicto."},
  {c:"Escuela",l:"Intermedio",t:"Un conflicto en el aula",q:"Dos compañeros discuten y te piden que tomes partido sin conocer bien lo sucedido. ¿Qué harías?",a:["Apoyar automáticamente a tu mejor amigo.","Escuchar sin difundir versiones y sugerir que dialoguen con ayuda docente.","Publicar el conflicto en redes."],k:1,e:"Evitar juicios apresurados y buscar diálogo ayuda a resolver conflictos de forma justa."},
  {c:"Escuela",l:"Difícil",t:"Exclusión de un grupo",q:"Un grupo de estudiantes decide no incluir a una compañera en una actividad por sus diferencias personales. ¿Qué harías?",a:["Aceptar la decisión para evitar problemas.","Hacer comentarios sobre ella también.","Promover una participación justa y comunicar la exclusión a un docente si continúa."],k:2,e:"La inclusión y la igualdad de trato son esenciales para una convivencia escolar saludable."},
  {c:"Escuela",l:"Difícil",t:"Una acusación sin pruebas",q:"Un compañero es acusado de haber dañado un material, pero no hay información suficiente. ¿Qué harías?",a:["Evitar señalarlo sin pruebas y permitir que se aclare lo ocurrido.","Repetir la acusación.","Presionarlo para que admita algo."],k:0,e:"Actuar con justicia implica no difundir acusaciones sin evidencia y escuchar a las personas involucradas."},
  {c:"Escuela",l:"Difícil",t:"Un conflicto digital",q:"En un chat del salón comparten una imagen para ridiculizar a un estudiante. ¿Qué harías?",a:["Reenviarla a otros grupos.","No compartirla, pedir que la retiren y comunicarlo a un adulto responsable.","Responder con otra imagen humillante."],k:1,e:"No difundir contenido humillante evita ampliar el daño. Pedir apoyo ayuda a detener la situación."},
  {c:"Escuela",l:"Difícil",t:"Participación equitativa",q:"En una actividad, una persona del grupo toma todas las decisiones y no deja hablar a los demás. ¿Qué harías?",a:["Abandonar el trabajo sin explicar.","Permitirlo porque termina más rápido.","Proponer turnos de participación y distribuir responsabilidades."],k:2,e:"La participación equitativa permite que todas las voces sean escuchadas y que el trabajo sea compartido."},

  // RESPETO (10)
  {c:"Respeto",l:"Fácil",t:"Una opinión diferente",q:"Alguien expresa una opinión distinta a la tuya. ¿Qué harías?",a:["Escuchar y responder con respeto.","Burlarte de su opinión.","Impedir que siga hablando."],k:0,e:"Respetar no significa estar de acuerdo, sino reconocer el derecho de los demás a expresarse."},
  {c:"Respeto",l:"Fácil",t:"Pedir permiso",q:"Quieres utilizar un objeto personal de otra persona. ¿Qué harías?",a:["Tomarlo sin preguntar.","Pedir permiso y aceptar su respuesta.","Esconderlo como broma."],k:1,e:"Pedir permiso reconoce que cada persona tiene derecho sobre sus pertenencias."},
  {c:"Respeto",l:"Fácil",t:"Un límite claro",q:"Un compañero te dice que no quiere recibir bromas sobre su apariencia. ¿Qué harías?",a:["Continuar porque para ti es divertido.","Decirle que no tiene sentido molestarse.","Respetar lo que expresó y cambiar tu comportamiento."],k:2,e:"Respetar los límites implica tomar en serio cómo se sienten los demás."},
  {c:"Respeto",l:"Intermedio",t:"Diferencias personales",q:"Una persona de tu grupo tiene costumbres diferentes a las tuyas. ¿Qué harías?",a:["Tratarla con respeto y conocer sus costumbres sin juzgar.","Imitarla para ridiculizarla.","Excluirla del grupo."],k:0,e:"Aceptar las diferencias fortalece la convivencia y evita la discriminación."},
  {c:"Respeto",l:"Intermedio",t:"Decir que no",q:"Un conocido insiste en que hagas algo que no deseas. ¿Qué harías?",a:["Aceptar por miedo a que se moleste.","Expresar claramente que no quieres y buscar apoyo si insiste.","Hacerlo para evitar una discusión."],k:1,e:"Tienes derecho a establecer límites y a que tu decisión sea respetada."},
  {c:"Respeto",l:"Intermedio",t:"Una broma incómoda",q:"Alguien hace una broma sobre un tema que te incomoda y te pide que no exageres. ¿Qué harías?",a:["Fingir que no te afecta siempre.","Responder humillándolo.","Explicar con calma que te incomoda y pedir que no lo repita."],k:2,e:"Comunicar lo que te incomoda ayuda a establecer límites sin agredir."},
  {c:"Respeto",l:"Difícil",t:"Privacidad en redes",q:"Un amigo quiere publicar una fotografía tuya sin preguntarte y tú no estás de acuerdo. ¿Qué harías?",a:["Pedirle que no la publique y explicar que necesitas dar tu consentimiento.","Aceptar porque es tu amigo.","Publicar una foto suya como venganza."],k:0,e:"Tu imagen y privacidad merecen respeto. Es válido expresar que no autorizas su publicación."},
  {c:"Respeto",l:"Difícil",t:"Presión para encajar",q:"Un grupo te pide cambiar tu forma de ser para aceptarte y se burla cuando no lo haces. ¿Qué harías?",a:["Cambiar todo para obtener su aprobación.","Mantener tu dignidad, poner límites y acercarte a personas que te respeten.","Insultar a todos."],k:1,e:"No necesitas renunciar a tu identidad para merecer respeto y pertenecer a un grupo."},
  {c:"Respeto",l:"Difícil",t:"Un límite ignorado",q:"Ya expresaste varias veces que no quieres que revisen tus pertenencias, pero alguien continúa haciéndolo. ¿Qué harías?",a:["Pensar que no tienes derecho a reclamar.","Responder dañando sus cosas.","Reafirmar el límite y pedir apoyo a una persona adulta de confianza."],k:2,e:"Cuando un límite no se respeta, es adecuado buscar apoyo. No tienes que resolverlo a solas."},
  {c:"Respeto",l:"Difícil",t:"Trato igualitario",q:"En una actividad, alguien propone excluir a una persona por su forma de vestir o expresarse. ¿Qué harías?",a:["Rechazar la exclusión y defender un trato digno para todos.","Apoyar la propuesta para evitar discusiones.","Hacer comentarios sobre esa persona."],k:0,e:"Todas las personas merecen un trato digno, sin discriminación por su apariencia o forma de expresarse."},

  // COMUNICACIÓN (10)
  {c:"Comunicación",l:"Fácil",t:"Escuchar con atención",q:"Un compañero quiere contarte algo importante mientras estás usando tu teléfono. ¿Qué harías?",a:["Seguir mirando el teléfono y responder sin escuchar.","Prestarle atención y escuchar antes de responder.","Cambiar de tema."],k:1,e:"Escuchar activamente demuestra interés y ayuda a comprender el mensaje."},
  {c:"Comunicación",l:"Fácil",t:"Expresar una emoción",q:"Algo que ocurrió te hizo sentir decepcionado. ¿Qué harías?",a:["Gritar a quien esté cerca.","Guardar molestia y esperar que lo adivinen.","Explicar con palabras cómo te sentiste y qué ocurrió."],k:2,e:"Expresar emociones de manera clara ayuda a que los demás comprendan lo que necesitas."},
  {c:"Comunicación",l:"Fácil",t:"Pedir una aclaración",q:"No entendiste una indicación que te dieron. ¿Qué harías?",a:["Preguntar amablemente para que te la expliquen de nuevo.","Hacer cualquier cosa sin preguntar.","Culpar a quien explicó."],k:0,e:"Preguntar cuando algo no está claro evita confusiones y demuestra interés."},
  {c:"Comunicación",l:"Intermedio",t:"Un mensaje confuso",q:"Recibes un mensaje que parece molesto, pero no sabes qué quiso decir la otra persona. ¿Qué harías?",a:["Responder inmediatamente con enojo.","Preguntar qué quiso expresar antes de sacar conclusiones.","Compartir el mensaje para que otros opinen."],k:1,e:"Aclarar el significado antes de responder evita malentendidos."},
  {c:"Comunicación",l:"Intermedio",t:"Resolver un desacuerdo",q:"Durante una conversación, notas que ambos están molestos y ya no se escuchan. ¿Qué harías?",a:["Continuar discutiendo hasta ganar.","Recordar errores antiguos.","Proponer una pausa y retomar el diálogo cuando estén más tranquilos."],k:2,e:"Una pausa puede ayudar a regular las emociones y continuar una conversación respetuosa."},
  {c:"Comunicación",l:"Intermedio",t:"Dar una opinión",q:"Un compañero te pide opinión sobre su trabajo y observas algo que podría mejorar. ¿Qué harías?",a:["Señalarlo con respeto y ofrecer una sugerencia concreta.","Decir que todo está mal.","Burlarte de su esfuerzo."],k:0,e:"Una opinión constructiva es específica, respetuosa y busca ayudar."},
  {c:"Comunicación",l:"Difícil",t:"Reconocer un malentendido",q:"Una discusión comenzó porque interpretaste mal las palabras de alguien. ¿Qué harías?",a:["Insistir en que la culpa es de la otra persona.","Reconocer la confusión, explicar cómo lo entendiste y escuchar su aclaración.","Evitar hablar del tema para siempre."],k:1,e:"Reconocer un malentendido permite aclarar intenciones y reparar la comunicación."},
  {c:"Comunicación",l:"Difícil",t:"Conversación difícil",q:"Necesitas hablar con alguien sobre una conducta que te ha incomodado varias veces. ¿Cómo iniciarías?",a:["Acusarlo de ser una mala persona.","Hablar del problema frente a todos para avergonzarlo.","Elegir un momento adecuado, describir la conducta y explicar cómo te afecta."],k:2,e:"Hablar en un momento adecuado y centrarse en la conducta facilita una conversación respetuosa."},
  {c:"Comunicación",l:"Difícil",t:"Escuchar dos versiones",q:"Dos personas te cuentan versiones distintas de un conflicto y ambas esperan que las apoyes. ¿Qué harías?",a:["Escuchar sin interrumpir, evitar tomar partido apresuradamente y animar a buscar una solución.","Elegir la primera versión que escuchaste.","Contar ambas versiones a todo el grupo."],k:0,e:"Escuchar con imparcialidad evita aumentar el conflicto y permite comprender mejor la situación."},
  {c:"Comunicación",l:"Difícil",t:"Poner límites al diálogo",q:"Una conversación se convierte en una serie de insultos y ya no pueden dialogar. ¿Qué harías?",a:["Responder con insultos más fuertes.","Decir que continuarás cuando puedan hablar sin ofenderse y buscar mediación si hace falta.","Compartir la discusión en redes."],k:1,e:"No es necesario continuar una conversación agresiva. Poner límites y pedir mediación puede ayudar."}
];

const STORAGE_KEY = "que-harias-tu-progress-v1";
let state = loadState();
let selectedLevel = "Todos";
let selectedCategory = "Todas";
let sessionQuestions = [];
let sessionIndex = 0;
let selectedAnswer = null;
let answeredCurrent = false;

const $ = (id) => document.getElementById(id);
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved && saved.answers ? saved : { answers: {}, points: 0, badges: [] };
  } catch { return { answers: {}, points: 0, badges: [] }; }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function getCompletedIds() { return Object.keys(state.answers); }
function renderCategories() {
  $("categoryChoices").innerHTML = "";
  categories.forEach(cat => {
    const count = questions.filter(q => q.c === cat.name && (selectedLevel === "Todos" || q.l === selectedLevel)).length;
    const button = document.createElement("button");
    button.className = "category-card" + (selectedCategory === cat.name ? " selected" : "");
    button.innerHTML = `<span>${cat.icon}</span><strong>${cat.name}</strong><small>${count} situaciones</small>`;
    button.addEventListener("click", () => {
      selectedCategory = selectedCategory === cat.name ? "Todas" : cat.name;
      renderCategories();
      if (selectedCategory !== "Todas") startGame();
    });
    $("categoryChoices").appendChild(button);
  });
}
function startGame() {
  sessionQuestions = questions.filter(q =>
    (selectedLevel === "Todos" || q.l === selectedLevel) &&
    (selectedCategory === "Todas" || q.c === selectedCategory)
  );
  // Las preguntas ya están ordenadas por categoría y nivel.
  sessionIndex = 0;
  selectedAnswer = null;
  showScreen("gameScreen");
  showQuestion();
}
function showQuestion() {
  if (sessionIndex >= sessionQuestions.length) { finishGame(); return; }
  const q = sessionQuestions[sessionIndex];
  selectedAnswer = null;
  answeredCurrent = false;
  $("questionCounter").textContent = `Situación ${sessionIndex + 1} de ${sessionQuestions.length}`;
  $("progressFill").style.width = `${(sessionIndex / sessionQuestions.length) * 100}%`;
  $("questionCategory").textContent = q.c;
  $("questionLevel").textContent = q.l;
  $("questionTitle").textContent = q.t;
  $("questionText").textContent = q.q;
  $("answers").innerHTML = "";
  $("feedback").className = "feedback hidden";
  $("feedback").textContent = "";
  $("confirmButton").classList.remove("hidden");
  $("confirmButton").disabled = true;
  $("nextButton").classList.add("hidden");
  q.a.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-option";
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span></span>`;
    button.querySelector("span:last-child").textContent = answer;
    button.addEventListener("click", () => {
      if (answeredCurrent) return;
      selectedAnswer = index;
      document.querySelectorAll(".answer-option").forEach((el, i) => el.classList.toggle("selected", i === index));
      $("confirmButton").disabled = false;
    });
    $("answers").appendChild(button);
  });
}
function confirmAnswer() {
  if (selectedAnswer === null || answeredCurrent) return;
  answeredCurrent = true;
  const q = sessionQuestions[sessionIndex];
  const isHealthy = selectedAnswer === q.k;
  const previous = state.answers[qid(q)];
  if (!previous) {
    state.answers[qid(q)] = { choice: selectedAnswer, healthy: isHealthy, category: q.c };
    if (isHealthy) state.points += 100;
  } else {
    // No se suman puntos repetidos por volver a jugar la misma situación.
    state.answers[qid(q)] = { ...previous, lastChoice: selectedAnswer };
  }
  updateBadges();
  saveState();
  $("feedback").className = "feedback" + (isHealthy ? "" : " bad");
  $("feedback").innerHTML = `<strong>${isHealthy ? "¡Buena decisión! 🌟" : "Puedes mejorar tu decisión 💡"}</strong><span></span>`;
  $("feedback").querySelector("span").textContent = q.e;
  $("confirmButton").classList.add("hidden");
  $("nextButton").classList.remove("hidden");
  $("progressFill").style.width = `${((sessionIndex + 1) / sessionQuestions.length) * 100}%`;
}
function qid(q) { return questions.indexOf(q).toString(); }
function updateBadges() {
  const completed = Object.values(state.answers);
  const doneCategories = categories.filter(c => questions.filter(q => q.c === c.name).every(q => state.answers[qid(q)]));
  const badges = [];
  if (completed.some(a => a.healthy && a.category === "Amistad")) badges.push("💗 Corazón empático");
  if (doneCategories.some(c => c.name === "Escuela") && doneCategories.some(c => c.name === "Amistad")) badges.push("🤝 Buen compañero");
  if (questions.every((q, i) => state.answers[String(i)])) badges.push("🏆 Experto en vínculos");
  state.badges = badges;
}
function nextQuestion() { sessionIndex++; showQuestion(); }
function finishGame() {
  updateBadges(); saveState();
  $("finalPoints").textContent = state.points;
  $("finalDone").textContent = sessionQuestions.length;
  $("finalBadges").innerHTML = state.badges.map(b => `<span class="badge-pill">${b}</span>`).join("") || '<span class="muted">Sigue jugando para conseguir insignias.</span>';
  showScreen("finalScreen");
}
function renderProgress() {
  updateBadges();
  const entries = Object.values(state.answers);
  const healthy = entries.filter(a => a.healthy).length;
  $("statPoints").textContent = state.points;
  $("statDone").textContent = `${entries.length}/50`;
  $("statPercent").textContent = `${entries.length ? Math.round(healthy / entries.length * 100) : 0}%`;
  $("categoryProgress").innerHTML = categories.map(c => {
    const done = questions.filter(q => q.c === c.name && state.answers[qid(q)]).length;
    return `<div class="progress-row"><strong>${c.name}</strong><div class="mini-track"><div class="mini-fill" style="width:${done * 10}%"></div></div><span>${done}/10</span></div>`;
  }).join("");
  const allBadges = ["💗 Corazón empático", "🤝 Buen compañero", "🏆 Experto en vínculos"];
  $("badgeList").innerHTML = allBadges.map(b => `<span class="badge-pill ${state.badges.includes(b) ? "" : "locked"}">${b}</span>`).join("");
}
function resetProgress() {
  if (!confirm("¿Seguro que quieres borrar todo tu progreso y empezar de nuevo?")) return;
  state = { answers: {}, points: 0, badges: [] };
  saveState(); renderProgress(); showScreen("homeScreen");
}

$("startButton").addEventListener("click", () => { selectedCategory = "Todas"; renderCategories(); showScreen("setupScreen"); });
$("howButton").addEventListener("click", () => $("modal").classList.remove("hidden"));
$("closeModal").addEventListener("click", () => $("modal").classList.add("hidden"));
$("modal").addEventListener("click", e => { if (e.target === $("modal")) $("modal").classList.add("hidden"); });
$("brandHome").addEventListener("click", e => { e.preventDefault(); showScreen("homeScreen"); });
$("progressButton").addEventListener("click", () => { renderProgress(); showScreen("progressScreen"); });
$("confirmButton").addEventListener("click", confirmAnswer);
$("nextButton").addEventListener("click", nextQuestion);
$("playAllButton").addEventListener("click", () => { selectedCategory = "Todas"; startGame(); });
$("exitButton").addEventListener("click", () => { if (confirm("¿Quieres salir? Tu progreso ya está guardado.")) showScreen("setupScreen"); });
$("resetButton").addEventListener("click", resetProgress);
$("againButton").addEventListener("click", () => { selectedCategory = "Todas"; selectedLevel = "Todos"; document.querySelectorAll(".level-card").forEach(b => b.classList.toggle("selected", b.dataset.level === "Todos")); renderCategories(); startGame(); });
document.querySelectorAll(".level-card").forEach(button => button.addEventListener("click", () => {
  selectedLevel = button.dataset.level;
  document.querySelectorAll(".level-card").forEach(b => b.classList.toggle("selected", b === button));
  selectedCategory = "Todas"; renderCategories();
}));
document.querySelectorAll("[data-go]").forEach(button => button.addEventListener("click", () => showScreen(button.dataset.go)));

renderCategories();
