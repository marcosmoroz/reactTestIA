import { useState } from 'react';

const useCostos = () => {
  const [costoMateriales, setCostoMateriales] = useState(0);
  const [costoManoObra, setCostoManoObra] = useState(0);
  const [costoTotal, setCostoTotal] = useState(0);

  const calcularCostoTotal = () => {
    const total = costoMateriales + costoManoObra;
    setCostoTotal(total);
  };

  return {
    costoMateriales,
    setCostoMateriales,
    costoManoObra,
    setCostoManoObra,
    costoTotal,
    calcularCostoTotal
  };
};

export default useCostos;
