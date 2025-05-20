import toast, { Toaster } from "react-hot-toast"
import Table from "../../ui/components/table/Table"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { useGenLoteTarjetas } from "./hooks/useGenLoteTarjetas"
import Loader from "../../ui/components/Loader"

const COLUMNS = ['ID', 'FECHA DE CREACIÓN', 'USUARIO RESPONSABLE', 'COMENTARIO', 'TARJETAS GENERADAS']
const FIELDS = ['id', 'fecha', 'usuario', 'comentario', 'tarjetas']


const GeneracionTarjetas = () => {

  const location = useLocation()
  const { lotes, getLotes, loading, editNavigate } = useGenLoteTarjetas();
  const [lotesCleaned, setLotesCleaned] = useState([])

  useEffect(() => {
    getLotes();
  }, [])

  useEffect(() => {
    if (location.state?.toast) {
      const { type, message } = location.state.toast;
      toast[type](message, {
        position: "top-right",
        duration: 1500,
      });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (lotes.length > 0) {
      const cleanedLotes = lotes.map((lote) => ({
        id: lote.IdLote,
        fecha: new Date(lote.FechaRegistro).toLocaleString('es-MX', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        usuario: lote.Usuario,
        comentario: lote.Comentario,
        tarjetas: lote.TarjetasGeneradas
      }));
      setLotesCleaned(cleanedLotes);
    }
  }, [lotes]);

  return (
    <section>
      <Toaster />
      <h1 className="text-primary text-3xl sm:text-5xl font-bold mb-5">
        GENERACIÓN DE TARJETAS
      </h1>
      <hr className="mb-12 text-primary/30 border-1" />

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="w-32 opacity-60 text-primary" />
        </div>
      ) : (
        <Table
          columns={COLUMNS}
          data={lotesCleaned}
          filterFields={FIELDS}
          addLink={"add"}
          editFunction={editNavigate}
        />
      )}

    </section>
  )
}

export default GeneracionTarjetas