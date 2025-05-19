import { Toaster } from "react-hot-toast"
import Table from "../ui/components/table/Table"

const GeneracionTarjetas = () => {
  return (
    <section>
      <Toaster />
      <h1 className="text-primary text-3xl sm:text-5xl font-bold mb-5">
        GENERACIÓN DE TARJETAS
      </h1>
      <hr className="mb-12 text-primary/30 border-1" />

      <Table
        columns={[]}
        data={[]}
        filterFields={[]}
        addLink={"add"}
      // editFunction={''}
      />
    </section>
  )
}

export default GeneracionTarjetas