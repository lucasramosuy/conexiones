/** Conexiones jurídico diario. El pool curado vive acá; no hay secretos ni APIs externas. */
const POOL = [
  // d1 amarillo, d2 verde, d3 azul, d4 violeta
  [
    ['Fuentes del derecho', ['LEY', 'COSTUMBRE', 'JURISPRUDENCIA', 'DOCTRINA']],
    ['Delitos contra la propiedad', ['HURTO', 'RAPIÑA', 'ESTAFA', 'EXTORSIÓN']],
    ['Contratos típicos', ['COMPRAVENTA', 'LOCACIÓN', 'MANDATO', 'MUTUO']],
    ['Instituciones de la justicia', ['JUZGADO', 'TRIBUNAL', 'FISCALÍA', 'DEFENSORÍA']],
  ],
  [
    ['Medios de prueba', ['TESTIGOS', 'DOCUMENTOS', 'PERICIA', 'CONFESIÓN']],
    ['Elementos del delito', ['ACCIÓN', 'TIPICIDAD', 'ANTIJURIDICIDAD', 'CULPABILIDAD']],
    ['Recursos', ['APELACIÓN', 'CASACIÓN', 'REVISIÓN', 'NULIDAD']],
    ['Garantías constitucionales', ['AMPARO', 'HÁBEAS CORPUS', 'HÁBEAS DATA', 'INCONSTITUCIONALIDAD']],
  ],
  [
    ['Juzgados según la materia', ['CIVIL', 'PENAL', 'LABORAL', 'FAMILIA']],
    ['Impuestos por sigla', ['IVA', 'IRPF', 'IRAE', 'IMEBA']],
    ['Derechos reales', ['PROPIEDAD', 'USUFRUCTO', 'USO', 'SERVIDUMBRE']],
    ['Etapas del proceso', ['DEMANDA', 'CONTESTACIÓN', 'PRUEBA', 'SENTENCIA']],
  ],
  [
    ['La familia en el Código', ['MATRIMONIO', 'DIVORCIO', 'PATRIA POTESTAD', 'ALIMENTOS']],
    ['La sucesión', ['TESTAMENTO', 'HEREDERO', 'LEGATARIO', 'ALBACEA']],
    ['Garantías reales', ['HIPOTECA', 'PRENDA', 'ANTICRESIS', 'PRIVILEGIO']],
    ['Sociedades comerciales', ['ANÓNIMA', 'COLECTIVA', 'COMANDITA', 'RESPONSABILIDAD LIMITADA']],
  ],
  [
    ['Conflicto colectivo', ['HUELGA', 'PARO', 'OCUPACIÓN', 'PIQUETE']],
    ['Conceptos salariales', ['AGUINALDO', 'SALARIO VACACIONAL', 'HORAS EXTRAS', 'VIÁTICOS']],
    ['Termina la relación laboral', ['DESPIDO', 'RENUNCIA', 'MUTUO ACUERDO', 'JUBILACIÓN']],
    ['Solución alternativa de conflictos', ['MEDIACIÓN', 'CONCILIACIÓN', 'ARBITRAJE', 'NEGOCIACIÓN']],
  ],
  [
    ['La culpa nace de', ['IMPRUDENCIA', 'NEGLIGENCIA', 'IMPERICIA', 'INOBSERVANCIA DE REGLAMENTOS']],
    ['El camino del delito', ['IDEACIÓN', 'PREPARACIÓN', 'EJECUCIÓN', 'CONSUMACIÓN']],
    ['Quiénes participan', ['AUTOR', 'COAUTOR', 'CÓMPLICE', 'ENCUBRIDOR']],
    ['Justifican el hecho', ['LEGÍTIMA DEFENSA', 'ESTADO DE NECESIDAD', 'CUMPLIMIENTO DE UN DEBER', 'CONSENTIMIENTO']],
  ],
  [
    ['Derechos políticos', ['VOTO', 'PLEBISCITO', 'REFERÉNDUM', 'INICIATIVA POPULAR']],
    ['Cosas de una elección uruguaya', ['BANCA', 'ESCRUTINIO', 'LISTA SÁBANA', 'CUARTO INTERMEDIO']],
    ['Siglas del Estado', ['BPS', 'DGI', 'IMM', 'BCU']],
    ['Ministerios', ['INTERIOR', 'ECONOMÍA', 'DEFENSA', 'RELACIONES EXTERIORES']],
  ],
  [
    ['Vicios del consentimiento', ['ERROR', 'DOLO', 'VIOLENCIA', 'LESIÓN']],
    ['Se extingue la obligación por', ['PAGO', 'NOVACIÓN', 'COMPENSACIÓN', 'CONFUSIÓN']],
    ['Se adquiere el dominio por', ['TRADICIÓN', 'ACCESIÓN', 'PRESCRIPCIÓN ADQUISITIVA', 'SUCESIÓN']],
    ['El acto jurídico puede ser', ['NULO', 'ANULABLE', 'RESCINDIBLE', 'INOPONIBLE']],
  ],
  [
    ['El seguro', ['PÓLIZA', 'PRIMA', 'SINIESTRO', 'ASEGURADOR']],
    ['Títulos de crédito', ['CHEQUE', 'PAGARÉ', 'LETRA DE CAMBIO', 'BONO']],
    ['El concurso y la quiebra', ['QUIEBRA', 'CONCURSO', 'SÍNDICO', 'ACREEDOR']],
    ['Propiedad intelectual', ['MARCA', 'PATENTE', 'DERECHO DE AUTOR', 'MODELO DE UTILIDAD']],
  ],
  [
    ['En el Registro', ['PADRÓN', 'FOLIO', 'ASIENTO', 'MATRÍCULA']],
    ['Documentos notariales', ['ESCRITURA', 'TESTIMONIO', 'PROTOCOLO', 'CERTIFICADO']],
    ['Medidas cautelares', ['EMBARGO', 'SECUESTRO', 'ANOTACIÓN', 'INHIBICIÓN']],
    ['Testamentos', ['OLÓGRAFO', 'ABIERTO', 'CERRADO', 'SOLEMNE']],
  ],
  [
    ['Actos de comunicación', ['CITACIÓN', 'NOTIFICACIÓN', 'EMPLAZAMIENTO', 'INTIMACIÓN']],
    ['Sujetos del proceso', ['ACTOR', 'DEMANDADO', 'TERCERO', 'MINISTERIO PÚBLICO']],
    ['Incidentes', ['RECUSACIÓN', 'EXCUSACIÓN', 'CONTUMACIA', 'PRECLUSIÓN']],
    ['La sentencia quedó', ['FIRME', 'EJECUTORIADA', 'CONSENTIDA', 'INAPELABLE']],
  ],
  [
    ['Penas principales', ['PRISIÓN', 'MULTA', 'INHABILITACIÓN ESPECIAL', 'INHABILITACIÓN ABSOLUTA']],
    ['Contra la administración pública', ['PECULADO', 'COHECHO', 'TRÁFICO DE INFLUENCIAS', 'ABUSO DE FUNCIONES']],
    ['Contra la libertad', ['PRIVACIÓN DE LIBERTAD', 'AMENAZAS', 'VIOLENCIA PRIVADA', 'VIOLACIÓN DE DOMICILIO']],
    ['Figuras del homicidio', ['HOMICIDIO CULPABLE', 'HOMICIDIO PIADOSO', 'FEMICIDIO', 'AYUDA AL SUICIDIO']],
  ],
  [
    ['Palabras migratorias', ['VISA', 'RESIDENCIA', 'REFUGIO', 'CIUDADANÍA']],
    ['Instrumentos internacionales', ['TRATADO', 'CONVENIO', 'PACTO', 'PROTOCOLO']],
    ['La familia del Mercosur', ['MERCOSUR', 'ALADI', 'PARLASUR', 'FOCEM']],
    ['Se gestionan entre países', ['EXEQUÁTUR', 'CARTA ROGATORIA', 'EXTRADICIÓN', 'APOSTILLA']],
  ],
  [
    ['Entes autónomos', ['ANTEL', 'UTE', 'OSE', 'ANCAP']],
    ['Gobierno departamental', ['INTENDENCIA', 'JUNTA DEPARTAMENTAL', 'ALCALDÍA', 'CONCEJO MUNICIPAL']],
    ['El Poder Legislativo', ['ASAMBLEA GENERAL', 'SENADO', 'CÁMARA DE REPRESENTANTES', 'COMISIÓN PERMANENTE']],
    ['Libertades públicas', ['EXPRESIÓN', 'CULTO', 'REUNIÓN', 'ASOCIACIÓN']],
  ],
  [
    ['Clases de bienes', ['MUEBLE', 'INMUEBLE', 'FUNGIBLE', 'CONSUMIBLE']],
    ['Quienes deben y cobran', ['ACREEDOR', 'DEUDOR', 'FIADOR', 'TERCERO']],
    ['El propietario puede', ['USAR', 'GOZAR', 'DISPONER', 'REIVINDICAR']],
    ['Etapas de la sucesión', ['APERTURA', 'DECLARATORIA', 'PARTICIÓN', 'ADJUDICACIÓN']],
  ],
  [
    ['El proceso penal, paso a paso', ['DENUNCIA', 'INVESTIGACIÓN', 'FORMALIZACIÓN', 'JUICIO']],
    ['En la audiencia penal', ['JUEZ', 'FISCAL', 'DEFENSOR', 'IMPUTADO']],
    ['Medidas contra el imputado', ['PRISIÓN PREVENTIVA', 'ARRESTO DOMICILIARIO', 'FIANZA', 'COMPARECENCIA']],
    ['Resoluciones judiciales', ['SENTENCIA', 'AUTO', 'PROVIDENCIA', 'DECRETO']],
  ],
  [
    ['___ civil', ['GUERRA', 'ESTADO', 'DERECHO', 'MATRIMONIO']],
    ['Partes de una norma', ['ARTÍCULO', 'INCISO', 'LITERAL', 'NUMERAL']],
    ['También son palabras comunes', ['CAUSA', 'LETRA', 'CARTA', 'ACTA']],
    ['Latinajos jurídicos', ['IPSO FACTO', 'BONA FIDE', 'A PRIORI', 'DE FACTO']],
  ],
  [
    ['Profesionales del foro', ['ABOGADO', 'PROCURADOR', 'ESCRIBANO', 'NOTARIO']],
    ['Colaboradores de la justicia', ['ALGUACIL', 'PERITO', 'TRADUCTOR PÚBLICO', 'RECEPTOR']],
    ['Lo que hace el escribano', ['CERTIFICA', 'PROTOCOLIZA', 'TESTIMONIA', 'AUTORIZA']],
    ['Dentro del expediente', ['FOJAS', 'CÉDULAS', 'OFICIOS', 'PROVIDENCIAS']],
  ],
  [
    ['Estados civiles', ['SOLTERO', 'CASADO', 'DIVORCIADO', 'VIUDO']],
    ['Se inscriben en el Registro Civil', ['NACIMIENTO', 'ADOPCIÓN', 'RECONOCIMIENTO', 'DEFUNCIÓN']],
    ['Documentos uruguayos', ['CÉDULA', 'CREDENCIAL CÍVICA', 'PASAPORTE', 'PARTIDA DE NACIMIENTO']],
    ['Atributos de la personalidad', ['NOMBRE', 'DOMICILIO', 'CAPACIDAD', 'PATRIMONIO']],
  ],
  [
    ['Pasos para comprar una casa', ['BOLETO DE RESERVA', 'ESTUDIO DE TÍTULOS', 'PROMESA', 'POSESIÓN']],
    ['Palabras del alquiler', ['ARRENDADOR', 'ARRENDATARIO', 'CANON', 'GARANTÍA']],
    ['En el remate', ['MARTILLERO', 'POSTOR', 'BASE', 'PUJA']],
    ['La propiedad horizontal', ['UNIDAD', 'GASTOS COMUNES', 'REGLAMENTO DE COPROPIEDAD', 'PROINDIVISO']],
  ],
  [
    ['El recibo de sueldo', ['NOMINAL', 'LÍQUIDO', 'APORTES', 'DESCUENTOS']],
    ['Instancias sindicales', ['ASAMBLEA', 'PLENARIO', 'CONGRESO', 'MESA REPRESENTATIVA']],
    ['Consejos de Salarios', ['LAUDO', 'ACUERDO SALARIAL', 'SALARIO MÍNIMO NACIONAL', 'TRIPARTITA']],
    ['Siglas del trabajo', ['MTSS', 'BSE', 'INEFOP', 'FONASA']],
  ],
  [
    ['Contra la administración de justicia', ['ENCUBRIMIENTO', 'AUTOEVASIÓN', 'FALSO TESTIMONIO', 'SIMULACIÓN DE DELITO']],
    ['Contra la fe pública', ['FALSIFICACIÓN DE MONEDA', 'FALSIFICACIÓN DE DOCUMENTOS', 'SUPRESIÓN DE DOCUMENTOS', 'USO DE DOCUMENTO FALSO']],
    ['Delitos económicos', ['QUIEBRA FRAUDULENTA', 'INSOLVENCIA FRAUDULENTA', 'RECEPTACIÓN', 'ABUSO DE FIRMA EN BLANCO']],
    ['Delitos informáticos', ['ACOSO TELEMÁTICO', 'ACCESO ILÍCITO A DATOS', 'DAÑO INFORMÁTICO', 'SUPLANTACIÓN DE IDENTIDAD']],
  ],
  [
    ['Papeles de una compra', ['FACTURA', 'TICKET', 'RECIBO', 'NOTA DE CRÉDITO']],
    ['Derechos del consumidor', ['INFORMACIÓN', 'SEGURIDAD', 'LIBRE ELECCIÓN', 'RECLAMO']],
    ['Palabras del préstamo', ['PRÉSTAMO', 'CUOTA', 'TASA', 'INTERÉS']],
    ['Medios de pago electrónicos', ['TARJETA DE CRÉDITO', 'TARJETA DE DÉBITO', 'TRANSFERENCIA', 'DINERO ELECTRÓNICO']],
  ],
  [
    ['Formas de violencia', ['FÍSICA', 'PSICOLÓGICA', 'SEXUAL', 'PATRIMONIAL']],
    ['Medidas de protección', ['ORDEN DE ALEJAMIENTO', 'PROHIBICIÓN DE COMUNICACIÓN', 'BOTÓN ANTIPÁNICO', 'TOBILLERA ELECTRÓNICA']],
    ['La niñez en el Código', ['GUARDA', 'TENENCIA', 'ADOPCIÓN', 'RÉGIMEN DE VISITAS']],
    ['Organismos de protección social', ['INAU', 'INDDHH', 'INJU', 'MIDES']],
  ],
  [
    ['___ jurídica', ['PERSONA', 'NORMA', 'SEGURIDAD', 'CIENCIA']],
    ['Dentro de la sociedad', ['ASAMBLEA', 'DIRECTORIO', 'ADMINISTRADOR', 'SOCIO']],
    ['Tienen personería jurídica', ['SINDICATO', 'PARTIDO POLÍTICO', 'ASOCIACIÓN CIVIL', 'FUNDACIÓN']],
    ['El fin de la persona jurídica', ['DISOLUCIÓN', 'LIQUIDACIÓN', 'LIQUIDADOR', 'EXTINCIÓN']],
  ],
  [
    ['Hereda por ley', ['DESCENDIENTES', 'ASCENDIENTES', 'CÓNYUGE', 'EL ESTADO']],
    ['Figuras testamentarias', ['SUSTITUCIÓN', 'FIDEICOMISO', 'LEGADO', 'CARGA']],
    ['Palabras de la sucesión forzosa', ['LEGÍTIMA', 'MEJORAS', 'COLACIÓN', 'INDIGNIDAD']],
    ['Para ordenar la herencia', ['INVENTARIO', 'AVALÚO', 'BENEFICIO DE INVENTARIO', 'SEPARACIÓN DE PATRIMONIOS']],
  ],
  [
    ['Requisitos del contrato', ['VOLUNTAD', 'OBJETO', 'CAUSA', 'FORMA']],
    ['De dónde nacen las obligaciones', ['CONTRATO', 'DELITO', 'CUASIDELITO', 'LA LEY']],
    ['Antes del contrato definitivo', ['OPCIÓN', 'PACTO DE PREFERENCIA', 'MINUTA', 'ARRAS']],
    ['El tiempo en el derecho', ['PRESCRIPCIÓN', 'CADUCIDAD', 'INTERRUPCIÓN', 'SUSPENSIÓN']],
  ],
  [
    ['Fuerzas de seguridad', ['POLICÍA NACIONAL', 'GUARDIA REPUBLICANA', 'POLICÍA CAMINERA', 'PREFECTURA']],
    ['Pistas de una investigación', ['HUELLA DACTILAR', 'ADN', 'CÁMARA DE SEGURIDAD', 'ARMA']],
    ['Actos de la policía', ['ALLANAMIENTO', 'DETENCIÓN', 'INCAUTACIÓN', 'APREHENSIÓN']],
    ['Derechos del detenido', ['GUARDAR SILENCIO', 'ABOGADO DEFENSOR', 'COMUNICACIÓN', 'INTEGRIDAD FÍSICA']],
  ],
  [
    ['Cosas de la facultad', ['CÁTEDRA', 'EXAMEN', 'REVÁLIDA', 'ESCOLARIDAD']],
    ['Lo que hojea un abogado', ['CÓDIGO', 'MANUAL', 'FALLADO', 'EXPEDIENTE']],
    ['Símbolos de la justicia', ['BALANZA', 'ESPADA', 'VENDA', 'TEMPLO']],
    ['Edificios del sistema', ['PALACIO DE JUSTICIA', 'REGISTRO CIVIL', 'ESCRIBANÍA', 'CÁRCEL']],
  ],
  [
    ['Se ganan o se pierden', ['JUICIO', 'DEMANDA', 'CASO', 'RECURSO']],
    ['Partes de un código', ['LIBRO', 'TÍTULO', 'CAPÍTULO', 'SECCIÓN']],
    ['La escalera judicial', ['JUZGADO DE PAZ', 'JUZGADO LETRADO', 'TRIBUNAL DE APELACIONES', 'SUPREMA CORTE']],
    ['Leyes famosas por número', ['19.580', '17.250', '16.060', '9.739']],
  ],
];
const START_DAY = Math.floor(Date.UTC(2026, 8, 28) / 86400000); // 28/09/2026: primer acertijo
const DAY_MS = 86400000;
function montevideoDay(now) { return Math.floor((now - 3 * 3600000) / DAY_MS); }
function dayLabel(day) { return new Date(day * DAY_MS).toISOString().slice(0, 10); }
function puzzleFor(now) { const day = Math.max(START_DAY, montevideoDay(now)); const n = day - START_DAY; return { day, n, groups: POOL[n % POOL.length] }; }
function puzzleData(groups) {
  return { groups: groups.map(([name, terms], difficulty) => ({ name, terms, difficulty })) };
}
async function handleToday() {
  const { day, n, groups } = puzzleFor(Date.now());
  const seconds = Math.min(3600, Math.max(1, Math.ceil(((day + 1) * DAY_MS + 3 * 3600000 - Date.now()) / 1000)));
  return Response.json({ ...puzzleData(groups), id: String(n + 1).padStart(3, '0'), date: dayLabel(day) }, { headers: { 'Cache-Control': `public, max-age=${seconds}` } });
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/conexiones') return Response.redirect(url.origin + '/conexiones/', 308);
    if (url.pathname === '/conexiones/api/today') return handleToday();
    if (url.pathname.startsWith('/conexiones/api/')) return Response.json({ error: 'Ruta desconocida.' }, { status: 404 });
    return env.ASSETS.fetch(request);
  },
};
export { POOL, puzzleFor, montevideoDay };
