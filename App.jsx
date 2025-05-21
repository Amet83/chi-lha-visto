
import { useState } from "react";

const partecipanti = [
  "FABRIZIO BENEDINI", "SAMUELE BERTACCHINI", "MATTIA BONATI", "ALESSANDRO BOTTI", "GIULIA CANNONE",
  "ELISA CARRITIELLO", "SOPHIA CASOLA", "GABRIELE CORNACCHIA", "BIANCA CUCINIELLO", "GINEVRA CURATI",
  "MATTIA GENNA", "ANDREA GRAZIOLI", "CELESTE GUARNIERI", "LORENZO LABELLAARTE", "ALICE OPPICI",
  "ACHILLE RAINIERI", "ANNA SAGLIA", "MARTA SAGLIA", "GLORIA TURCI", "ALICE ZANRE",
  "ALESSANDRO BONATI", "EDOARDO CARRITIELLO", "TIAGO DA CRUZ SANCHES", "ANNA DEL GROSSO",
  "LINDA FOTI", "LUCIA FOTI", "DAVIDE GRAZIOLI", "LEVANTE GUARNIERI", "SOFIA LAPIETRA",
  "PAOLO PASCARELLA", "MARCO RICCI", "CHIARA RUGGERI", "GABRIELE SIGNIFREDI", "ANGELICA STOCCHI",
  "FRANCESCO ZANON", "ELEONORA BOTTARINI", "MICHELA BRUSCHI", "MARGHERITA CUCINIELLO",
  "SARA DALL’AGLIO", "LAVINIA LA ROSA", "PIERANGELA RICCI", "GIOVANNI ZANON",
  "MATTEO BERTOZZI", "ALICE BARBIERI", "GIORGIA BALESTRIERI", "MATTIA LA ROSA", "LINDA SCHIARETTI",
  "EUGENIA ZANON", "SAMUELE RAINIERI", "SARA VALENTI", "ELA CIRONTI", "SIMONE CARACCIOLO"
];

const penalitaOggetti = {
  "Fazzolettone": -100,
  "Zaino": -100,
  "Camicia": -50,
  "Cellulare (di nascosto)": -100,
  "Macchina del capo": -1000,
  "Cintura": -10,
  "K-way": -30,
  "Torcia frontale": -25,
  "Gavetta": -30,
  "Coltellino multiuso": -50,
  "Tesserino AGESCI": -25,
  "Bandiera di squadriglia": -50
  // Aggiungi gli altri se vuoi
};

export default function App() {
  const [oggetti, setOggetti] = useState([]);
  const [nomeOggetto, setNomeOggetto] = useState("Fazzolettone");
  const [luogo, setLuogo] = useState("");
  const [proprietario, setProprietario] = useState(partecipanti[0]);
  const [punti, setPunti] = useState({});
  const [voti, setVoti] = useState({});

  const segnala = () => {
    const penalita = penalitaOggetti[nomeOggetto] || 0;
    const nuovo = {
      id: Date.now(),
      nome: nomeOggetto,
      luogo,
      proprietario,
      penalita,
      votanti: []
    };
    setOggetti([nuovo, ...oggetti]);
    setPunti(p => ({ ...p, [proprietario]: (p[proprietario] || 0) + penalita }));
  };

  const vota = (id) => {
    setOggetti(oggetti.map(o => {
      if (o.id === id && !o.votanti.includes("tu")) {
        const nuovi = [...o.votanti, "tu"];
        setPunti(p => ({ ...p, [o.proprietario]: (p[o.proprietario] || 0) - 5 }));
        return { ...o, votanti: nuovi };
      }
      return o;
    }));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Chi l'ha visto? - Scout Edition</h1>
      <div>
        <select value={nomeOggetto} onChange={e => setNomeOggetto(e.target.value)}>
          {Object.keys(penalitaOggetti).map(o => <option key={o}>{o}</option>)}
        </select>
        <input placeholder="Luogo" value={luogo} onChange={e => setLuogo(e.target.value)} />
        <select value={proprietario} onChange={e => setProprietario(e.target.value)}>
          {partecipanti.map(p => <option key={p}>{p}</option>)}
        </select>
        <button onClick={segnala}>Segnala oggetto</button>
      </div>

      <h2>Bacheca</h2>
      {oggetti.map(o => (
        <div key={o.id} style={{ border: '1px solid black', padding: 10, margin: 5 }}>
          <strong>{o.nome}</strong> perso da <em>{o.proprietario}</em> in {o.luogo}
          <br />
          Penalità: {o.penalita} pt – {o.votanti.length} voti
          <br />
          <button disabled={o.votanti.includes("tu")} onClick={() => vota(o.id)}>
            {o.votanti.includes("tu") ? "Hai già votato" : "+1 Voto allo sbadato"}
          </button>
        </div>
      ))}

      <h2>Classifica</h2>
      {Object.entries(punti).sort((a, b) => b[1] - a[1]).map(([nome, pt]) => (
        <div key={nome}>{nome}: {pt} pt</div>
      ))}
    </div>
  );
}
