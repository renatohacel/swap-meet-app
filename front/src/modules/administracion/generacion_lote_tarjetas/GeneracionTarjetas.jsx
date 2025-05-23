import toast from "react-hot-toast"
import Table from "../../ui/components/table/Table"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { useGenLoteTarjetas } from "./hooks/useGenLoteTarjetas"
import Loader from "../../ui/components/Loader"
import { CardMain } from "../../ui/components/cards/CardMain"

const COLUMNS = ['ID', 'FECHA DE CREACIÓN', 'USUARIO RESPONSABLE', 'COMENTARIO', 'TARJETAS GENERADAS']
const FIELDS = ['id', 'fecha', 'usuario', 'comentario', 'tarjetas']


const GeneracionTarjetas = () => {
  const location = useLocation()
  const { lotes, getLotes, loading, editNavigate, viewNavigate } = useGenLoteTarjetas();
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
        }),
        usuario: lote.Usuario,
        comentario: lote.Comentario,
        tarjetas: lote.TarjetasGeneradas
      }));
      setLotesCleaned(cleanedLotes);
    }
  }, [lotes]);

  return (
    <CardMain title="GENERACIÓN DE TARJETAS">
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="w-32 opacity-60 text-primary" />
        </div>
      ) : (
        <Table
          columns={COLUMNS}
          data={lotesCleaned}
          filterFields={FIELDS}
          addLink={""}
          editFunction={editNavigate}
          details={true}
          viewFunction={viewNavigate}
        />
      )}
    </CardMain>
  )
}

export default GeneracionTarjetas