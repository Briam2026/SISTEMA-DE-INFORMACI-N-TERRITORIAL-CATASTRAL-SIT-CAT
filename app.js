(() => {
  const storeKey = "geocat_records_v1";
  const schemas = {
    predios: {title:"Predios",kind:"Predio",fields:[["codigo","Código catastral"],["zona","Zona / comunidad"],["tipo","Clasificación"],["superficie","Superficie (m²)"],["uso","Uso actual"],["estado","Estado"]],rows:[{codigo:"CC-04-012-0087",zona:"Zona Central",tipo:"Urbano",superficie:"360",uso:"Vivienda",estado:"Activo"},{codigo:"CC-04-021-0031",zona:"San Isidro",tipo:"Rural",superficie:"12500",uso:"Agropecuario",estado:"En revisión"},{codigo:"CC-04-008-0152",zona:"Villa Esperanza",tipo:"Urbano",superficie:"420",uso:"Comercial",estado:"Activo"}]},
    propietarios:{title:"Propietarios y derechos",kind:"Propietario",fields:[["nombre","Nombre / razón social"],["documento","CI / NIT"],["tipo","Tipo de persona"],["predio","Código de predio"],["derecho","Tipo de derecho"],["porcentaje","Derecho (%)"]],rows:[{nombre:"María Elena Rojas",documento:"6352841 SC",tipo:"Natural",predio:"CC-04-012-0087",derecho:"Propietaria",porcentaje:"100"},{nombre:"Agropecuaria El Trigal SRL",documento:"1029483021",tipo:"Jurídica",predio:"CC-04-021-0031",derecho:"Propietaria",porcentaje:"100"}]},
    construcciones:{title:"Construcciones y mejoras",kind:"Construcción",fields:[["predio","Código de predio"],["bloque","Bloque / unidad"],["pisos","Pisos"],["superficie","Superficie construida (m²)"],["material","Estructura"],["estado","Conservación"]],rows:[{predio:"CC-04-012-0087",bloque:"Bloque A",pisos:"1",superficie:"145",material:"Hormigón armado",estado:"Bueno"},{predio:"CC-04-008-0152",bloque:"Local 1",pisos:"2",superficie:"280",material:"Ladrillo",estado:"Regular"}]},
    tramites:{title:"Trámites catastrales",kind:"Trámite",fields:[["numero","N.º de trámite"],["tipo","Tipo de trámite"],["predio","Código de predio"],["responsable","Responsable"],["plazo","Fecha límite"],["estado","Estado"]],rows:[{numero:"TR-2026-184",tipo:"Transferencia",predio:"CC-04-012-0087",responsable:"María Rojas",plazo:"2026-11-17",estado:"Por vencer"},{numero:"TR-2026-179",tipo:"Actualización",predio:"CC-04-021-0031",responsable:"Carlos Peña",plazo:"2026-11-19",estado:"En revisión"},{numero:"TR-2026-176",tipo:"Certificado",predio:"CC-04-008-0152",responsable:"Ana Flores",plazo:"2026-11-20",estado:"En proceso"}]},
    correspondencia:{title:"Correspondencia y documentos",kind:"Documento",fields:[["hoja","Hoja de ruta"],["fecha","Fecha de recepción"],["remitente","Remitente"],["asunto","Asunto"],["unidad","Unidad destino"],["estado","Estado"]],rows:[{hoja:"HR-2026-341",fecha:"2026-11-17",remitente:"María Elena Rojas",asunto:"Solicitud de transferencia",unidad:"Plataforma catastral",estado:"En proceso"},{hoja:"HR-2026-338",fecha:"2026-11-16",remitente:"Dirección Jurídica",asunto:"Informe de colindancias",unidad:"Técnica",estado:"Derivado"}]},
    campo:{title:"Levantamiento de campo",kind:"Asignación de campo",fields:[["brigada","Brigada"],["zona","Zona asignada"],["asignados","Predios asignados"],["completados","Verificados"],["fecha","Fecha de salida"],["estado","Estado"]],rows:[{brigada:"Brigada Norte",zona:"San Isidro",asignados:"510",completados:"418",fecha:"2026-11-17",estado:"En curso"},{brigada:"Brigada Centro",zona:"Zona Central",asignados:"500",completados:"336",fecha:"2026-11-17",estado:"En curso"}]},
    reportes:{title:"Reportes y avalúos",kind:"Avalúo",fields:[["predio","Código de predio"],["gestion","Gestión"],["terreno","Valor terreno (Bs)"],["construccion","Valor construcción (Bs)"],["total","Avalúo total (Bs)"],["estado","Estado"]],rows:[{predio:"CC-04-012-0087",gestion:"2026",terreno:"86.400",construccion:"145.000",total:"231.400",estado:"Vigente"},{predio:"CC-04-008-0152",gestion:"2026",terreno:"126.000",construccion:"252.000",total:"378.000",estado:"Vigente"}]},
    calidad:{title:"Control de calidad",kind:"Incidencia",fields:[["codigo","Código / referencia"],["regla","Regla de validación"],["zona","Zona"],["asignado","Asignado a"],["fecha","Detectado"],["estado","Estado"]],rows:[{codigo:"CC-04-021-0031",regla:"Verificar superficie registrada",zona:"San Isidro",asignado:"Carlos Peña",fecha:"2026-11-16",estado:"Pendiente"},{codigo:"CC-04-009-0042",regla:"Completar titular del predio",zona:"Zona Norte",asignado:"Ana Flores",fecha:"2026-11-15",estado:"En revisión"}]},
    mapa: {title:"Cartografía y WebGIS",kind:"Capa territorial",fields:[["nombre","Nombre de capa"],["tipo","Tipo de entidad"],["zona","Zona / comunidad"],["fuente","Fuente de datos"],["estado","Estado"]],rows:[{nombre:"Predios urbanos",tipo:"Predios",zona:"Zona Central",fuente:"Cartografía municipal",estado:"Visible"},{nombre:"Red vial",tipo:"Infraestructura",zona:"Todo el municipio",fuente:"GAM Cuatro Cañadas",estado:"Visible"}]},
    tributacion: {title:"Integración tributaria · IPBI",kind:"Cuenta tributaria",fields:[["predio","Código de predio"],["gestion","Gestión"],["base","Base imponible (Bs)"],["impuesto","IPBI calculado (Bs)"],["pago","Estado de pago"],["estado","Estado de cuenta"]],rows:[{predio:"CC-04-012-0087",gestion:"2026",base:"231400",impuesto:"694",pago:"Pendiente",estado:"Vigente"}]},
    certificados: {title:"Certificados y reportes oficiales",kind:"Certificado",fields:[["numero","N.º de documento"],["tipo","Tipo de certificado"],["predio","Código de predio"],["solicitante","Solicitante"],["fecha","Fecha de emisión"],["estado","Estado"]],rows:[{numero:"CC-2026-092",tipo:"Certificado catastral",predio:"CC-04-012-0087",solicitante:"María Elena Rojas",fecha:"2026-11-17",estado:"Emitido"}]},
    portal: {title:"Portal del ciudadano",kind:"Solicitud ciudadana",fields:[["codigo","N.º de solicitud"],["ciudadano","Ciudadano"],["servicio","Servicio solicitado"],["predio","Código de predio"],["fecha","Fecha"],["estado","Estado"]],rows:[{codigo:"SOL-2026-044",ciudadano:"María Elena Rojas",servicio:"Certificado catastral",predio:"CC-04-012-0087",fecha:"2026-11-17",estado:"En revisión"}]},
    pagos: {title:"Pagos y tasas en línea",kind:"Pago",fields:[["referencia","Referencia de pago"],["concepto","Concepto"],["solicitante","Solicitante"],["monto","Monto (Bs)"],["fecha","Fecha"],["estado","Estado"]],rows:[{referencia:"PAG-2026-031",concepto:"Certificado catastral",solicitante:"María Elena Rojas",monto:"35",fecha:"2026-11-17",estado:"Pendiente"}]},
    ordenamiento: {title:"Planificación y ordenamiento territorial",kind:"Zona de planificación",fields:[["nombre","Nombre de zona"],["uso","Uso de suelo"],["instrumento","Instrumento vigente"],["superficie","Superficie (ha)"],["riesgo","Riesgo / afectación"],["estado","Estado"]],rows:[{nombre:"Centro urbano",uso:"Residencial mixto",instrumento:"PLOT 2024",superficie:"126",riesgo:"Sin afectación",estado:"Vigente"}]},
    interoperabilidad: {title:"Interoperabilidad y API",kind:"Integración",fields:[["sistema","Sistema conectado"],["tipo","Tipo de integración"],["responsable","Responsable"],["ultima","Última sincronización"],["frecuencia","Frecuencia"],["estado","Estado"]],rows:[{sistema:"Recaudaciones GAM",tipo:"API REST",responsable:"Unidad de Sistemas",ultima:"2026-11-17 08:30",frecuencia:"Diaria",estado:"Activo"}]},
    municipios: {title:"Gestión multi-municipio",kind:"Municipio",fields:[["nombre","Municipio"],["codigo","Código"],["departamento","Departamento"],["admin","Administrador"],["predios","Predios registrados"],["estado","Estado"]],rows:[{nombre:"Cuatro Cañadas",codigo:"0703",departamento:"Santa Cruz",admin:"Javier Mendoza",predios:"2,486",estado:"Activo"}]},    configuracion:{title:"Administración y seguridad",kind:"Usuario",fields:[["nombre","Nombre"],["usuario","Usuario"],["rol","Rol"],["unidad","Unidad"],["municipio","Municipio"],["estado","Estado"]],rows:[{nombre:"Javier Mendoza",usuario:"jmendoza",rol:"Administrador",unidad:"Dirección de Catastro",municipio:"Cuatro Cañadas",estado:"Activo"},{nombre:"María Rojas",usuario:"mrojas",rol:"Técnico catastral",unidad:"Plataforma",municipio:"Cuatro Cañadas",estado:"Activo"}]}
  };
  let db = {};
  try { db = JSON.parse(localStorage.getItem(storeKey) || "{}"); } catch (_) { db = {}; }
  db._audit = Array.isArray(db._audit) ? db._audit : [];
  db._history = db._history && typeof db._history === "object" ? db._history : {};
  const makeId = () => "gc-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2,8);
  const isoNow = () => new Date().toISOString();
  Object.keys(schemas).forEach(k => {
    if (!Array.isArray(db[k])) db[k] = schemas[k].rows;
    db[k] = db[k].map(r => ({...r, _id:r._id||makeId(), _version:r._version||1, _createdAt:r._createdAt||isoNow(), _updatedAt:r._updatedAt||isoNow(), _municipioId:k==="municipios"?"*":(r._municipioId||"0703"), _archived:!!r._archived}));
  });
  let activeMunicipality = localStorage.getItem("geocat_active_municipality") || "0703";
  const save = () => localStorage.setItem(storeKey, JSON.stringify(db));
  const audit = (action,key,record,before=null) => {
    const user = localStorage.getItem("geocat_demo_user") || "Javier Mendoza · Administrador";
    const entry = {id:makeId(), action, module:schemas[key]?.title||key, moduleKey:key, recordId:record?._id||"", reference:record?.codigo||record?.numero||record?.hoja||record?.nombre||record?.predio||"", actor:user, at:isoNow(), municipality:activeMunicipality, before:before?JSON.parse(JSON.stringify(before)):null, after:record?JSON.parse(JSON.stringify(record)):null};
    db._audit.unshift(entry); if(db._audit.length>5000)db._audit.length=5000;
    if(record){db._history[record._id]=db._history[record._id]||[];db._history[record._id].unshift(entry);}
  };
  const host = document.querySelector("#other .panel");
  if (!host) return;
  host.innerHTML = '<div class="panelhead"><div><h2 id="moduleHeading"></h2><p id="moduleSub"></p></div><div style="display:flex;gap:7px;flex-wrap:wrap"><button class="select" id="auditButton">◷ Bitácora</button><button class="select" id="backupButton">↓ Respaldo</button><button class="select" id="newRecord" style="background:#1b5945;color:white;border-color:#1b5945">＋ Nuevo registro</button></div></div><div class="notice" style="padding:14px 18px 0"><div style="display:flex;gap:9px;flex-wrap:wrap;align-items:center"><input id="moduleSearch" placeholder="Buscar en este módulo…" style="border:1px solid #e7ece8;border-radius:8px;padding:9px 11px;min-width:220px;flex:1"><select id="moduleFilter" class="select"><option value="">Todos los estados</option></select><label style="font-size:10px;color:#627168"><input type="checkbox" id="showArchived"> Incluir archivados</label><button class="select" id="exportCsv">↓ CSV</button></div></div><div id="moduleTable" style="overflow:auto;padding:9px 0 12px"></div><input type="file" id="restoreFile" accept="application/json" hidden>';
  const otherSection = document.getElementById("other");
  otherSection.insertAdjacentHTML("beforeend", '<div class="panel" id="qualitySummary" style="margin-top:16px;display:none"></div>');
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const toast = msg => { const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2500); };
  let current = "predios", modal;
  const municipalityBox=document.querySelector(".municipality");
  municipalityBox.innerHTML='<small>Municipio activo</small><select id="activeMunicipality" style="display:block;width:100%;margin-top:6px;background:transparent;color:#fff;border:0;font-weight:700;font-size:13px;outline:0"></select>';
  function fillMunicipalities(){
    const sel=document.getElementById("activeMunicipality");
    const options=db.municipios.filter(m=>m.estado!=="Archivado"&&m.codigo).map(m=>({id:String(m.codigo),name:m.nombre||m.codigo}));
    if(!options.some(m=>m.id==="0703"))options.unshift({id:"0703",name:"Cuatro Cañadas"});
    if(!options.some(m=>m.id===activeMunicipality))activeMunicipality=options[0]?.id||"0703";
    sel.innerHTML=options.map(m=>'<option value="'+esc(m.id)+'">'+esc(m.name)+'</option>').join('');
    sel.value=activeMunicipality;sel.onchange=()=>{activeMunicipality=sel.value;localStorage.setItem("geocat_active_municipality",activeMunicipality);draw(current);toast("Municipio activo actualizado");};
  }
  fillMunicipalities(); save();
  function scoped(key){return db[key].filter(r=>key==="municipios"||r._municipioId===activeMunicipality);}
  function showModal(title,body){
    if(modal)modal.remove();
    modal=document.createElement("div");modal.style.cssText="position:fixed;inset:0;background:#12251d99;z-index:30;display:grid;place-items:center;padding:18px";
    modal.innerHTML='<div style="background:white;border-radius:14px;padding:22px;width:min(760px,100%);max-height:88vh;overflow:auto;box-shadow:0 20px 70px #0003"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><div><div class="eyebrow">GEOCAT · Trazabilidad</div><h2 style="margin:5px 0;font-size:18px">'+esc(title)+'</h2></div><button class="select" id="closeTrace">Cerrar</button></div>'+body+'</div>';
    document.body.appendChild(modal);modal.querySelector("#closeTrace").onclick=()=>modal.remove();
  }
  function showHistory(record){
    const entries=db._history[record._id]||[];
    const body=entries.length?'<div style="display:grid;gap:9px">'+entries.map(e=>'<div style="border:1px solid #e7ece8;border-radius:9px;padding:11px"><b style="font-size:11px">'+esc(e.action)+'</b><span style="float:right;color:#849188;font-size:10px">'+esc(new Date(e.at).toLocaleString("es-BO"))+'</span><div style="font-size:10px;color:#627168;margin-top:4px">'+esc(e.actor)+' · '+esc(e.module)+'</div><details style="margin-top:8px"><summary style="font-size:10px;cursor:pointer">Ver datos del cambio</summary><pre style="white-space:pre-wrap;font-size:9px;background:#f5f7f5;padding:9px;border-radius:6px;max-height:220px;overflow:auto">'+esc(JSON.stringify({antes:e.before,despues:e.after},null,2))+'</pre></details></div>').join('')+'</div>':'<div class="notice">Todavía no hay cambios registrados para este elemento.</div>';
    showModal("Historial de versiones",body);
  }
  function showAudit(){
    const entries=db._audit.slice(0,200);
    const body=entries.length?'<div style="overflow:auto"><table class="table"><thead><tr><th>Fecha y hora</th><th>Usuario</th><th>Acción</th><th>Módulo</th><th>Referencia</th><th>Municipio</th></tr></thead><tbody>'+entries.map(e=>'<tr><td>'+esc(new Date(e.at).toLocaleString("es-BO"))+'</td><td>'+esc(e.actor)+'</td><td>'+esc(e.action)+'</td><td>'+esc(e.module)+'</td><td>'+esc(e.reference||"—")+'</td><td>'+esc(e.municipality)+'</td></tr>').join('')+'</tbody></table></div>':'<div class="notice">La bitácora se llenará con los cambios hechos desde esta versión.</div>';
    showModal("Bitácora de auditoría",body);
  }
  function updateDashboard(){
    const metrics=document.querySelectorAll("#inicio .metric");
    if(metrics.length<4)return;
    const parcels=scoped("predios").filter(r=>!r._archived);
    const cases=scoped("tramites").filter(r=>!r._archived&&!["Atendido","Cerrado","Resuelto"].includes(r.estado));
    const crews=scoped("campo").filter(r=>!r._archived);
    const assigned=crews.reduce((n,r)=>n+(Number(r.asignados)||0),0), completed=crews.reduce((n,r)=>n+(Number(r.completados)||0),0);
    const verified=parcels.filter(r=>r.codigo&&r.zona&&Number(r.superficie)>0).length;
    const quality=parcels.length?Math.round(verified/parcels.length*100):0;
    const strong=[...document.querySelectorAll("#inicio .metric strong")];
    if(strong.length>=4){strong[0].textContent=parcels.length.toLocaleString("es-BO");strong[1].textContent=cases.length.toLocaleString("es-BO");strong[2].innerHTML=(assigned?Math.round(completed/assigned*100):0)+'<span style="font-size:16px">%</span>';strong[3].innerHTML=quality+'<span style="font-size:16px">%</span>';}
    const foot=metrics.map(m=>m.querySelector(".metricfoot"));
    if(foot.length>=4){foot[0].textContent="Municipio "+activeMunicipality+" · registros activos";foot[1].textContent=cases.length+" trámites abiertos en el municipio";foot[2].textContent=completed.toLocaleString("es-BO")+" de "+assigned.toLocaleString("es-BO")+" visitas verificadas";foot[3].textContent=verified+" de "+parcels.length+" predios con datos básicos completos";}
  }  function draw(key) {
    current=key; const s=schemas[key]; if(!s) return; updateDashboard();
    document.getElementById("moduleHeading").textContent=s.title; document.getElementById("crumb").textContent=s.title; document.getElementById("pageTitle").textContent=s.title;
    let all=scoped(key), includeArchived=document.getElementById("showArchived").checked;
    const active=all.filter(r=>!r._archived), archived=all.filter(r=>r._archived);
    document.getElementById("moduleSub").textContent=active.length+" registros activos · "+archived.length+" archivados · historial y bitácora · datos locales del navegador";
    const filter=document.getElementById("moduleFilter"), old=filter.value;
    const states=[...new Set(all.filter(r=>includeArchived||!r._archived).map(r=>r.estado).filter(Boolean))];
    filter.innerHTML='<option value="">Todos los estados</option>'+states.map(v=>'<option value="'+esc(v)+'">'+esc(v)+'</option>').join('');
    if(states.includes(old))filter.value=old;
    const q=document.getElementById("moduleSearch").value.toLowerCase(), f=filter.value;
    const rows=all.map(r=>({...r,__i:db[key].findIndex(x=>x._id===r._id)})).filter(r=>includeArchived||!r._archived).filter(r=>!f||r.estado===f).filter(r=>!q||s.fields.some(([id])=>String(r[id]||"").toLowerCase().includes(q)));
    document.getElementById("moduleTable").innerHTML=rows.length?'<table class="table"><thead><tr>'+s.fields.map(x=>'<th>'+esc(x[1])+'</th>').join('')+'<th>Acciones</th></tr></thead><tbody>'+rows.map(r=>'<tr>'+s.fields.map(([id])=>'<td>'+esc(r[id]||"—")+'</td>').join('')+'<td style="white-space:nowrap"><button class="select rowedit" data-i="'+r.__i+'">Editar</button> <button class="select rowhistory" data-i="'+r.__i+'">Historial</button> <button class="select rowarchive" data-i="'+r.__i+'">'+(r._archived?"Restaurar":"Archivar")+'</button></td></tr>').join('')+'</tbody></table>':'<div class="notice">No hay registros que coincidan. Usa “Nuevo registro” para agregar uno.</div>';
    document.querySelectorAll(".rowedit").forEach(b=>b.onclick=()=>form(key,+b.dataset.i));
    document.querySelectorAll(".rowhistory").forEach(b=>b.onclick=()=>showHistory(db[key][+b.dataset.i]));
    document.querySelectorAll(".rowarchive").forEach(b=>b.onclick=()=>{const r=db[key][+b.dataset.i];if(!r)return;const restore=!!r._archived;if(!restore&&!confirm("Se archivará el registro y seguirá disponible en el historial. ¿Continuar?"))return;const before=JSON.parse(JSON.stringify(r));r._archived=!restore;r._updatedAt=isoNow();r._version=(r._version||1)+1;audit(restore?"Restauración":"Archivo lógico",key,r,before);save();draw(key);updateDashboard();toast(restore?"Registro restaurado":"Registro archivado; se conservó el historial");});
    const qs=document.getElementById("qualitySummary");
    if(key==="calidad"){qs.style.display="block";const p=scoped("predios").filter(r=>!r._archived);const missing=p.filter(r=>!r.codigo||!r.zona||!Number(r.superficie)||Number(r.superficie)<=0).length;const pending=scoped("calidad").filter(r=>!r._archived&&r.estado!=="Resuelto").length;qs.innerHTML='<div class="panelhead"><div><h2>Resumen de validación</h2><p>'+esc(activeMunicipality)+' · reglas de consistencia iniciales</p></div></div><div class="notice"><strong>'+pending+' incidencias abiertas · '+missing+' predios con campos catastrales incompletos o superficie inválida</strong>Corrige el registro de origen y deja trazabilidad de la resolución.</div>';} else qs.style.display="none";
  }
  function validate(key,rec,index){
    const active=scoped(key).filter(r=>!r._archived&&r._id!==(index>=0?db[key][index]?._id:""));
    if(key==="predios"){
      if(!rec.codigo?.trim()||!rec.zona?.trim()||!rec.superficie) return "Código, zona y superficie son obligatorios.";
      const area=Number(String(rec.superficie).replace(",","."));
      if(!Number.isFinite(area)||area<=0)return "La superficie debe ser un número mayor que cero.";
      if(active.some(r=>String(r.codigo).trim().toUpperCase()===rec.codigo.trim().toUpperCase()))return "Ya existe ese código catastral en el municipio activo.";
    }
    if(key==="propietarios"){
      if(!rec.nombre?.trim()||!rec.documento?.trim())return "Nombre y documento de identidad son obligatorios.";
      if(active.some(r=>String(r.documento).trim().toLowerCase()===rec.documento.trim().toLowerCase()))return "Ya existe una persona con ese CI o NIT en este municipio.";
      const predio=scoped("predios").find(r=>!r._archived&&r.codigo===rec.predio);
      if(rec.predio&&!predio)return "El código de predio no existe en el municipio activo.";
      if(rec.porcentaje){const share=Number(String(rec.porcentaje).replace(",","."));if(!Number.isFinite(share)||share<=0||share>100)return "El porcentaje de derecho debe estar entre 0 y 100.";const other=scoped(key).filter(r=>!r._archived&&r._id!==(index>=0?db[key][index]?._id:"")&&r.predio===rec.predio).reduce((sum,r)=>sum+(Number(r.porcentaje)||0),0);if(other+share>100.0001)return "La suma de derechos del predio no puede superar el 100%.";}
    }
    if(key==="construcciones"&&rec.predio&&!scoped("predios").some(r=>!r._archived&&r.codigo===rec.predio))return "El código de predio no existe en el municipio activo.";
    if(key==="construcciones"&&rec.superficie&&(!Number.isFinite(Number(String(rec.superficie).replace(",", ".")))||Number(String(rec.superficie).replace(",", "."))<=0))return "La superficie construida debe ser mayor que cero.";
    if(key==="tramites"&&rec.predio&&!scoped("predios").some(r=>!r._archived&&r.codigo===rec.predio))return "El código de predio no existe en el municipio activo.";
    if(key==="tramites"&&rec.numero&&active.some(r=>r.numero===rec.numero))return "Ya existe ese número de trámite.";
    if(key==="municipios"&&rec.codigo&&db.municipios.some((r,i)=>i!==index&&r.codigo===rec.codigo))return "El código municipal ya está registrado.";
    return "";
  }
  function form(key,index=-1){
    const s=schemas[key], data=index>=0?db[key][index]:{};
    if(modal)modal.remove();
    modal=document.createElement("div");modal.style.cssText="position:fixed;inset:0;background:#12251d88;z-index:20;display:grid;place-items:center;padding:18px";
    modal.innerHTML='<form style="background:#fff;border-radius:14px;padding:22px;width:min(560px,100%);max-height:90vh;overflow:auto;box-shadow:0 20px 70px #0003"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px"><div><div class="eyebrow">'+(index<0?"Nuevo registro":"Editar registro")+'</div><h2 style="margin:5px 0;font-size:19px">'+esc(s.kind)+'</h2></div><button type="button" class="select" id="closeModal">Cerrar</button></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+s.fields.map(([id,label])=>'<label style="font-size:11px;color:#627168">'+esc(label)+'<input name="'+esc(id)+'" value="'+esc(data[id]||"")+'" style="display:block;width:100%;margin-top:5px;border:1px solid #e2e9e3;border-radius:8px;padding:10px;color:#17251f"></label>').join('')+'</div><div style="display:flex;justify-content:flex-end;gap:8px;margin-top:18px"><button type="button" class="select" id="cancelModal">Cancelar</button><button class="select" style="background:#1b5945;color:white;border-color:#1b5945">Guardar registro</button></div></form>';
    document.body.appendChild(modal);modal.querySelector("#closeModal").onclick=()=>modal.remove();modal.querySelector("#cancelModal").onclick=()=>modal.remove();
    modal.querySelector("form").onsubmit=e=>{
      e.preventDefault();const rec=Object.fromEntries(new FormData(e.target).entries());
      const error=validate(key,rec,index);if(error){toast(error);return;}
      if(index<0){rec._id=makeId();rec._version=1;rec._municipioId=key==="municipios"?"*":activeMunicipality;rec._createdAt=isoNow();rec._updatedAt=rec._createdAt;rec._archived=false;db[key].unshift(rec);audit("Creación",key,rec);}
      else{const before=JSON.parse(JSON.stringify(db[key][index]));Object.assign(rec,{_id:before._id,_municipioId:before._municipioId,_createdAt:before._createdAt,_version:(before._version||1)+1,_updatedAt:isoNow(),_archived:before._archived});db[key][index]=rec;audit("Actualización",key,rec,before);}
      save();modal.remove();fillMunicipalities();draw(key);updateDashboard();toast("Registro guardado con historial de versión");
    };
  }
  document.getElementById("newRecord").onclick=()=>form(current);
  document.getElementById("auditButton").onclick=showAudit;
  document.getElementById("moduleSearch").oninput=()=>draw(current);
  document.getElementById("moduleFilter").onchange=()=>draw(current);
  document.getElementById("showArchived").onchange=()=>draw(current);
  document.getElementById("backupButton").onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify({format:"GEOCAT-LOCAL-1",exportedAt:isoNow(),data:db},null,2)],{type:"application/json"}));a.download="geocat-respaldo-"+activeMunicipality+"-"+new Date().toISOString().slice(0,10)+".json";a.click();URL.revokeObjectURL(a.href);toast("Respaldo descargado");};
  document.getElementById("exportCsv").onclick=()=>{const s=schemas[current],visible=scoped(current).filter(r=>!r._archived),lines=[s.fields.map(x=>x[1]).join(","),...visible.map(r=>s.fields.map(([id])=>'"'+String(r[id]||"").replace(/"/g,'""')+'"').join(","))].join("\r\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["\ufeff"+lines],{type:"text/csv;charset=utf-8"}));a.download=current+"-"+activeMunicipality+"-geocat.csv";a.click();URL.revokeObjectURL(a.href);toast("CSV exportado");};
  document.getElementById("restoreFile").onchange=async e=>{const file=e.target.files[0];if(!file)return;try{const parsed=JSON.parse(await file.text()),incoming=parsed.data||parsed;if(!schemas.predios||!Array.isArray(incoming.predios))throw Error("Formato inválido");if(!confirm("La restauración reemplazará los datos locales visibles en esta sesión. ¿Deseas continuar?"))return;Object.keys(schemas).forEach(k=>{if(Array.isArray(incoming[k]))db[k]=incoming[k];});db._audit=Array.isArray(incoming._audit)?incoming._audit:db._audit;db._history=incoming._history||db._history;save();location.reload();}catch(err){toast("No se pudo restaurar: archivo inválido");}finally{e.target.value="";}};
  document.querySelectorAll(".nav button").forEach(b=>b.addEventListener("click",()=>{if(schemas[b.dataset.page])draw(b.dataset.page);}));
  draw("predios");
})();




