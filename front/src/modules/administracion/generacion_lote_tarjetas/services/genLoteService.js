import { axiosInstance } from "../../../../utils/axiosInstance";

export const getLotesService = async () => {
  const response = await axiosInstance.get("/generacion-lotes");
  return response.data;
};

export const getTarjetasGService = async (id) => {
  const response = await axiosInstance.get(`/generacion-lotes/${id}`);
  return response.data;
};

export const insertLoteService = async (newLote) => {
  const response = await axiosInstance.post("/generacion-lotes", newLote);
  return response.data;
}

export const deleteLoteService = async (id) => {
  const response = await axiosInstance.delete(`/generacion-lotes/${id}`);
  return response.data;
}

export const printLoteService = async (id) => {
  try {
    const response = await axiosInstance.get(`/generacion-lotes/print/${id}`, {
      responseType: "blob",
      timeout: 300000, // 5 minutos timeout
    });

    // Verifica si el tipo de contenido es PDF
    const contentType = response.headers["content-type"];
    
    if (contentType && contentType.includes("application/pdf")) {
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      
      // Intenta abrir en nueva pestaña
      const newWindow = window.open(url, "_blank");
      
      // Verifica si se abrió correctamente (bloqueador de pop-ups)
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // Si falló, crear enlace de descarga como fallback
        console.warn("Pop-up bloqueado, usando descarga automática");
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `tarjetas-lote-${id}.pdf`;
        link.target = '_blank';
        
        // Simular click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      // Limpiar URL después de un tiempo
      setTimeout(() => window.URL.revokeObjectURL(url), 15000);
      
      return { success: true };
    } else {
      // Si no es PDF, manejar error
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = () => {
          reject(new Error(reader.result || "Error desconocido al generar PDF"));
        };
        reader.onerror = () => {
          reject(new Error("Error al leer la respuesta del servidor"));
        };
        reader.readAsText(response.data);
      });
    }
  } catch (error) {
    console.error("Error en printLoteService:", error);
    
    // Manejo específico de errores
    if (error.code === 'ECONNABORTED') {
      throw new Error("Timeout: La generación del PDF está tomando demasiado tiempo");
    }
    
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 404:
          throw new Error("Lote no encontrado");
        case 500:
          throw new Error("Error interno del servidor al generar PDF");
        case 408:
          throw new Error("Timeout del servidor al generar PDF");
        default:
          throw new Error(`Error HTTP ${status}: ${error.response.statusText}`);
      }
    }
    
    throw error;
  }
}

