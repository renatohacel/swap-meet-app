/* eslint-disable react-hooks/exhaustive-deps */
import toast from "react-hot-toast"
import Table from "../../ui/components/table/Table"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { useGenLoteTarjetas } from "./hooks/useGenLoteTarjetas"
import Loader from "../../ui/components/Loader"
import { CardMain } from "../../ui/components/cards/CardMain"
import { usePermissions } from "../../auth/hooks/usePermissions"
import { usePolling } from "../../ui/hooks/usePolling"
import { Modal } from "antd"
import Spinner from "../../ui/components/Spinner"

const COLUMNS = ['ID', 'FECHA DE CREACIÓN', 'USUARIO RESPONSABLE', 'COMENTARIO', 'TARJETAS GENERADAS']
const FIELDS = ['id', 'fecha', 'usuario', 'comentario', 'tarjetas']


const GeneracionTarjetas = () => {
  const location = useLocation()
  const { can } = usePermissions();


  const canCreateLotes = can('admin', 'create', 'generacion_tarjetas');
  const canPrintLotes = can('admin', 'print', 'generacion_tarjetas');

  const { lotes, getLotes, loading, editNavigate, viewNavigate, isInitialLoad, printLote, printing } = useGenLoteTarjetas();
  const [lotesCleaned, setLotesCleaned] = useState([])

  useEffect(() => {
    getLotes();
  }, [])

  usePolling(() => getLotes(true), 10000);

  useEffect(() => {
    if (location.state?.toast) {
      const { type, message } = location.state.toast;
      toast[type](message, {
        position: "top-center",
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
      {(loading && isInitialLoad) ? (
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
          details={true}
          showNuevo={canCreateLotes}
          viewFunction={viewNavigate}
          showPrint={canPrintLotes}
          printFunction={printLote}
        />
      )}

      <Modal
        title={
          <div>
            Generando archivo de impresión<br />
            Espere...
          </div>
        }
        open={printing}
        onCancel={() => { }}
        closable={false}
        footer={[]}
        width={300}
        style={{ 
          fontFamily: 'var(--font-family-primary)',
          top: '40%'
        }}
        styles={{
          header: {
            textAlign: 'center'
          },
          body: {
            padding: '40px 20px',
            textAlign: 'center',
            minHeight: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }}
      >
        <Spinner className="w-18 text-primary" />
      </Modal>

    </CardMain>
  )
}

export default GeneracionTarjetas