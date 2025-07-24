import { useState, useEffect } from "react";

// Convierte "dd/mm/yyyy, hh:mm" o "dd/mm/yyyy" a Date
function parseEsMxDate(str) {
  if (!str) return null;
  // Ejemplo: "24/07/2025, 13:45"
  let match = str.match(/^(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2})/);
  if (match) {
    const [, day, month, year] = match;
    return new Date(`${year}-${month}-${day}T00:00:00`);
  }
  // Ejemplo: "24/07/2025"
  match = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (match) {
    const [, day, month, year] = match;
    return new Date(`${year}-${month}-${day}T00:00:00`);
  }
  // fallback para otros formatos
  return new Date(str);
}

// Compara solo la fecha (sin tiempo)
function isDateInRange(date, start, end) {
  // Asegura que sean objetos Date
  const d = date instanceof Date ? date : new Date(date);
  const s = start instanceof Date ? start : new Date(start);
  const e = end instanceof Date ? end : new Date(end);

  // Si alguno es inválido, no filtra
  if (isNaN(d.getTime()) || isNaN(s.getTime()) || isNaN(e.getTime())) return false;

  // Ignora la hora
  const dDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const sDay = new Date(s.getFullYear(), s.getMonth(), s.getDate());
  const eDay = new Date(e.getFullYear(), e.getMonth(), e.getDate());
  return dDay >= sDay && dDay <= eDay;
}

export const useFilter = (data, searchText, fields, dateRange = [null, null], dateField = null) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    let records = [...data];

    // Filtrar por texto
    if (searchText.trim() !== "") {
      records = records.filter((record) =>
        fields.some((field) =>
          record[field]
            ?.toString()
            .toLowerCase()
            .includes(searchText.toLowerCase())
        )
      );
    }

    // Filtrar solo por fecha (sin tiempo)
    if (
      dateField &&
      Array.isArray(dateRange) &&
      dateRange[0] &&
      dateRange[1]
    ) {
      let start = dateRange[0]._isAMomentObject ? dateRange[0].toDate() : dateRange[0];
      let end = dateRange[1]._isAMomentObject ? dateRange[1].toDate() : dateRange[1];

      start = typeof start === "string" ? new Date(start) : start;
      end = typeof end === "string" ? new Date(end) : end;

      records = records.filter((record) => {
        const value = record[dateField];
        if (!value) return false;
        const rowDate = parseEsMxDate(value);
        if (!rowDate || isNaN(rowDate.getTime())) return false;
        return isDateInRange(rowDate, start, end);
      });
    }

    setFilteredData(records);
  }, [data, searchText, fields, dateRange, dateField]);

  return {
    filteredData,
  };
};