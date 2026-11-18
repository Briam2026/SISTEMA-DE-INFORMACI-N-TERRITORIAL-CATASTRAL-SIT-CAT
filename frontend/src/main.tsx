import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const groups = [
  { label: "ESPACIO TERRITORIAL", items: [["▦", "Panel principal", "panel"], ["⌖", "Predios", "predios"], ["◈", "Visor cartográfico", "visor"], ["♙", "Propietarios", "propietarios"], ["▤", "Construcciones", "construcciones"]] },
  { label: "GESTIÓN MUNICIPAL", items: [["⇄", "Trámites", "tramites"], ["✉", "Correspondencia", "correspondencia"], ["◎", "Trabajo de campo", "campo"], ["▥", "Reportes y avalúos", "reportes"], ["✓", "Calidad de datos", "calidad"]] },
];
const moduleNames: Record<string,string> = {
  panel:"Panel principal", predios:"Núcleo catastral", visor:"Visor cartográfico",
  propietarios:"Propietarios y derechos", construcciones:"Construcciones y mejoras",
  tramites:"Trámites catastrales", correspondencia:"Correspondencia y documentos",
  campo:"Levantamiento de campo", reportes:"Reportes y avalúos", calidad:"Control de calidad",
  config:"Administración y seguridad",
};
const events = [
  ["⌖","Ficha catastral actualizada","CC-04-012-0087 · Zona Central","10:42","mint"],
  ["⇄","Nuevo trámite recibido","Transferencia · TR-2026-184","09:58","sand"],
  ["◎","Inspección de campo completada","Brigada Norte · Manzano 021","09:16","blue"],
  ["✓","Documento validado","Certificado catastral · CC-2026-092","Ayer","lilac"],
];
const requests = [
  ["TR-2026-184","Transferencia de propiedad","CC-04-012-0087","María Elena Rojas","Hoy","Por vencer","warning"],
  ["TR-2026-179","Actualización de ficha","CC-04-021-0031","Carlos Peña","20 nov","En revisión","review"],
  ["TR-2026-176","Certificado catastral","CC-04-008-0152","Ana Flores","21 nov","En proceso","progress"],
];

function App() {
  const [page,setPage]=React.useState("panel");
  const [health,setHealth]=React.useState("consultando");
  const [search,setSearch]=React.useState("");
  const [modal,setModal]=React.useState(false);
  const [toast,setToast]=React.useState("");
  const [layer,setLayer]=React.useState(true);
  React.useEffect(()=>{let alive=true;fetch("/api/v1/health").then(r=>r.json().then(data=>({r,data}))).then(({r,data})=>{if(alive)setHealth(r.ok&&data.status==="ok"?"operativo":"degradado");}).catch(()=>alive&&setHealth("sin conexión"));return()=>{alive=false;};},[]);
  React.useEffect(()=>{if(!toast)return;const timer=window.setTimeout(()=>setToast(""),2400);return()=>window.clearTimeout(timer);},[toast]);
  const title=moduleNames[page]||"Panel principal";
  const today=new Intl.DateTimeFormat("es-BO",{weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(new Date());
  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">⌖</span><span><b>SIT-CAT</b><small>GESTIÓN TERRITORIAL</small></span></div>
      <button className="municipality" onClick={()=>setToast("Selector multi-municipio en preparación")}><span className="muni-icon">◈</span><span><small>MUNICIPIO ACTIVO</small><b>Cuatro Cañadas</b></span><i>⌄</i></button>
      {groups.map(g=><nav className="nav-group" key={g.label}><div className="nav-caption">{g.label}</div>{g.items.map(([icon,label,id])=><button key={id} className={"nav-link "+(page===id?"active":"")} onClick={()=>setPage(id)}><span className="nav-icon">{icon}</span><span>{label}</span>{id==="predios"&&<small>2.486</small>}{id==="tramites"&&<small>12</small>}</button>)}</nav>)}
      <div className="sidebar-fill"/>
      <nav className="nav-group"><div className="nav-caption">ADMINISTRACIÓN</div><button className={"nav-link "+(page==="config"?"active":"")} onClick={()=>setPage("config")}><span className="nav-icon">⚙</span><span>Configuración</span></button></nav>
      <div className="sys-status"><span className={"status-dot "+(health==="operativo"?"good":health==="sin conexión"?"bad":"")}/><span><b>Sistema {health}</b><small>API SIT-CAT · v0.1</small></span><span className="sys-shield">⬡</span></div>
      <div className="user"><span className="avatar">JM</span><span><b>Javier Mendoza</b><small>Administrador municipal</small></span><i>•••</i></div>
    </aside>
    <main className="main">
      <header className="topbar"><div className="crumb">Inicio <span>/</span> <b>{title}</b></div><div className="top-actions"><label className="search"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar código, propietario, trámite…"/><kbd>⌘ K</kbd></label><button className="head-icon" onClick={()=>setToast("Centro de ayuda en preparación")} aria-label="Ayuda">?</button><button className="head-icon bell" onClick={()=>setToast("Tienes 3 notificaciones pendientes")} aria-label="Notificaciones">♧<i/></button><span className="head-divider"/><span className="avatar light">JM</span></div></header>
      {page==="panel"?<div className="content">
        <div className="welcome"><div><div className="eyebrow">{today}</div><h1>Panel de gestión catastral</h1><p>Resumen del territorio y las operaciones municipales.</p></div><div className="welcome-tools"><button className="period">Gestión 2026 <span>⌄</span></button><button className="primary" onClick={()=>setModal(true)}>＋ <span>Nuevo trámite</span></button></div></div>
        <section className="metrics">
          <article className="metric"><div className="metric-top">Predios registrados <span className="metric-icon green">⌖</span></div><strong>2.486</strong><div className="metric-foot"><b>↗ 4,8%</b> vs. mes anterior</div><div className="spark green-spark">{[5,8,6,12,9,15,12,18,14,20,24].map((n,i)=><i key={i} style={{height:n}}/>)}</div></article>
          <article className="metric"><div className="metric-top">Trámites en curso <span className="metric-icon amber">⇄</span></div><strong>38</strong><div className="metric-foot"><b className="warn">12 por vencer</b> próximos 7 días</div><div className="spark amber-spark">{[7,10,8,14,11,17,13,16,19,17,23].map((n,i)=><i key={i} style={{height:n}}/>)}</div></article>
          <article className="metric"><div className="metric-top">Avance de levantamiento <span className="metric-icon blue">◎</span></div><strong>68<span className="percent">%</span></strong><div className="metric-foot">1.692 de 2.486 predios verificados</div><div className="track"><i style={{width:"68%"}}/></div></article>
          <article className="metric"><div className="metric-top">Calidad de información <span className="metric-icon lilac">✓</span></div><strong>92<span className="percent">%</span></strong><div className="metric-foot"><b>+3,2 pts</b> en los últimos 30 días</div><div className="track purple"><i style={{width:"92%"}}/></div></article>
        </section>
        <section className="primary-grid">
          <article className="panel map-panel"><div className="panel-head"><div><b>Territorio catastral</b><small>Distribución de predios y avance de verificación</small></div><button className="soft-button" onClick={()=>setToast("Capas: predios, vías y equipamientos")}>▤ &nbsp;Capas</button></div>
            <div className="map"><div className="map-grid"/><svg viewBox="0 0 800 330" preserveAspectRatio="xMidYMid slice" aria-label="Mapa ilustrativo de manzanos"><path d="M-20 265 C130 220 170 300 290 258 S490 225 820 265" fill="none" stroke="#b2ccbd" strokeWidth="18"/><path d="M-10 72 C160 105 260 45 410 80 S650 110 820 55" fill="none" stroke="#c3d9df" strokeWidth="14"/><g stroke="#fbfcf9" strokeWidth="5"><path fill="#88b69a" d="M80 85h92v55H80z"/><path fill="#dfc37a" d="M179 85h82v55h-82z"/><path fill="#93bea0" d="M268 85h96v55h-96z"/><path fill="#8cb798" d="M371 85h86v55h-86z"/><path fill="#c3d0c5" d="M464 85h106v55H464z"/><path fill="#80ae8e" d="M577 85h91v55h-91z"/><path fill="#97bda1" d="M80 147h92v61H80z"/><path fill="#87b592" d="M179 147h82v61h-82z"/><path fill="#dec47b" d="M268 147h96v61h-96z"/><path fill="#83b18f" d="M371 147h86v61h-86z"/><path fill="#95bda0" d="M464 147h106v61H464z"/><path fill="#87b492" d="M577 147h91v61h-91z"/><path fill="#c4d2c6" d="M80 215h92v55H80z"/><path fill="#8bb795" d="M179 215h82v55h-82z"/><path fill="#93bd9e" d="M268 215h96v55h-96z"/><path fill="#dfc57e" d="M371 215h86v55h-86z"/><path fill="#8ab695" d="M464 215h106v55H464z"/><path fill="#bfcfc2" d="M577 215h91v55h-91z"/></g><g fill="#446952" fontSize="9" fontFamily="system-ui"><text x="99" y="116">MZ 014</text><text x="193" y="116">MZ 015</text><text x="290" y="116">MZ 016</text><text x="393" y="116">MZ 017</text><text x="490" y="116">MZ 018</text><text x="600" y="116">MZ 019</text><text x="99" y="181">MZ 021</text><text x="193" y="181">MZ 022</text><text x="290" y="181">MZ 023</text><text x="393" y="181">MZ 024</text><text x="490" y="181">MZ 025</text><text x="600" y="181">MZ 026</text></g></svg><span className="map-stamp"><i/>Cuatro Cañadas <small>· Santa Cruz</small></span><div className="map-tools"><button>＋</button><button>−</button><button onClick={()=>setToast("Centrando en el municipio")}>⌖</button></div><div className="legend"><span><i className="v"/> Verificado</span><span><i className="r"/> En revisión</span><span><i className="p"/> Pendiente</span></div><small className="map-scale">Vista ilustrativa · UTM 20S</small></div>
            <div className="map-foot"><span><button className={"toggle "+(layer?"on":"")} onClick={()=>setLayer(!layer)}><i/></button> Capa de predios <small>2.486 elementos</small></span><button className="link" onClick={()=>setPage("visor")}>Abrir visor completo →</button></div>
          </article>
          <article className="panel activity"><div className="panel-head"><div><b>Actividad reciente</b><small>Movimientos del sistema</small></div><button className="more" onClick={()=>setToast("Actividad de hoy")}>•••</button></div><div className="events">{events.map(e=><div className="event" key={e[1]}><span className={"event-icon "+e[4]}>{e[0]}</span><span className="event-copy"><b>{e[1]}</b><small>{e[2]}</small></span><time>{e[3]}</time></div>)}</div><button className="activity-link" onClick={()=>setToast("Bitácora en preparación")}>Ver toda la actividad →</button></article>
        </section>
        <section className="bottom-grid">
          <article className="panel case-panel"><div className="panel-head"><div><b>Trámites que requieren atención</b><small>Prioridad y vencimientos próximos</small></div><button className="link" onClick={()=>setPage("tramites")}>Ver bandeja →</button></div><div className="table-wrap"><table><thead><tr><th>N.º de trámite</th><th>Tipo de solicitud</th><th>Predio</th><th>Responsable</th><th>Plazo</th><th>Estado</th></tr></thead><tbody>{requests.filter(row=>!search||row.join(" ").toLowerCase().includes(search.toLowerCase())).map(r=><tr key={r[0]}><td className="code">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td><span className="owner"><i>{r[3].split(" ").map(n=>n[0]).slice(0,2).join("")}</i>{r[3]}</span></td><td>{r[4]}</td><td><span className={"pill "+r[6]}>{r[5]}</span></td></tr>)}</tbody></table></div></article>
          <article className="panel crews"><div className="panel-head"><div><b>Avance por brigada</b><small>Levantamiento · noviembre</small></div><button className="more" onClick={()=>setPage("campo")}>•••</button></div>{[["Brigada Norte","82% · 418 / 510","82%","forest"],["Brigada Centro","67% · 336 / 500","67%","blue"],["Brigada Sur","54% · 270 / 500","54%","gold"]].map(row=><div className="crew" key={row[0]}><div><b><i className={row[3]}/>{row[0]}</b><small>{row[1]}</small></div><span className={"crew-track "+row[3]}><i style={{width:row[2]}}/></span></div>)}<button className="activity-link" onClick={()=>setPage("campo")}>Ver seguimiento de campo →</button></article>
        </section>
        <footer className="footer"><span>SIT-CAT · Sistema de Información Territorial Catastral</span><span>Prototipo piloto · Cuatro Cañadas</span></footer>
      </div>:<div className="content module-content"><div className="welcome"><div><div className="eyebrow">SIT-CAT / GESTIÓN MUNICIPAL</div><h1>{title}</h1><p>Espacio de trabajo territorial de Cuatro Cañadas.</p></div><button className="primary" onClick={()=>setModal(true)}>＋ <span>Nuevo registro</span></button></div><div className="module-banner"><span>◈</span><div><b>{title}</b><small>Sección preparada para conectarse con la API y los datos oficiales del municipio.</small></div><i>MÓDULO INICIAL</i></div><article className="panel empty-state"><span>⌖</span><h2>Tu espacio de trabajo</h2><p>El siguiente paso es incorporar los flujos operativos y los datos verificados de este módulo.</p><button className="soft-button" onClick={()=>setToast("API SIT-CAT: "+health)}>Estado de API: {health}</button></article></div>}
    </main>
    {modal&&<div className="scrim" onMouseDown={e=>{if(e.target===e.currentTarget)setModal(false);}}><form className="modal" onSubmit={e=>{e.preventDefault();setModal(false);setToast("Solicitud registrada en el prototipo");}}><div className="modal-head"><div><div className="eyebrow">GESTIÓN MUNICIPAL</div><h2>Nuevo trámite</h2></div><button type="button" onClick={()=>setModal(false)}>×</button></div><label>Tipo de solicitud<select required defaultValue=""><option value="" disabled>Selecciona un trámite</option><option>Actualización de ficha</option><option>Transferencia de propiedad</option><option>Certificado catastral</option><option>Subdivisión de predio</option></select></label><label>Código catastral<input required placeholder="Ej. CC-04-012-0087"/></label><label>Solicitante<input required placeholder="Nombre completo"/></label><div className="modal-actions"><button type="button" className="soft-button" onClick={()=>setModal(false)}>Cancelar</button><button className="primary">Guardar solicitud</button></div><small>Demostración visual · no envía datos al servidor.</small></form></div>}
    {toast&&<div className="toast" role="status">{toast}</div>}
  </div>;
}
ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode><App/></React.StrictMode>);
