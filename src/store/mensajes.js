import {create} from 'zustand';

export const useMensajesStore = create((set) => ({
  errores: [],
  aciertos: [],
  agregarAcierto: (mensajeAcierto) => {
    let newId = 0;
    set((state) => {
      newId = state.aciertos.length > 0 ? Math.max(...state.aciertos.map(acierto => acierto.id)) : 0;
      return {
        aciertos: [
          ...state.aciertos,
          { id: newId, mensaje: mensajeAcierto, visible: true } 
        ]
      };
    }, );
    return newId
  },
  esconderAcierto: (id) => {
    set((state) => ({
      aciertos: state.aciertos.map(acierto => 
        acierto.id === id ? { ...acierto, visible: false } : acierto
      )
    }));
  },
  agregarError: (mensajeError) => {
    set((state) => {
      const maxId = state.errores.length > 0 ? Math.max(...state.errores.map(error => error.id)) : 0;
      return {
        errores: [
          ...state.errores,
          { id: maxId + 1, mensaje: mensajeError, visible: true } 
        ],
        loading: false
      };
    }, );
  },
  esconderError: (id) => {
    set((state) => ({
      errores: state.errores.map(error => 
        error.id === id ? { ...error, visible: false } : error
      )
    }));
  }
}));
