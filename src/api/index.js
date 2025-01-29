export const getArticulos = async () => {
    try {
      const response = await fetch('http://localhost:7081/articulos/api/ObtenerArticulos', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          // Aquí puedes agregar cualquier otro encabezado necesario, como tokens de autenticación, etc.
        },
      });
  
      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de artículos');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error al obtener los artículos: ${error.message}`);
    }
};

export const agregarArticulo = async (nuevoArticulo) => {
  try {
      const response = await fetch('http://localhost:7081/articulos/api/AgregarArticulo', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              // Aquí puedes agregar cualquier otro encabezado necesario, como tokens de autenticación, etc.
          },
          body: JSON.stringify(nuevoArticulo),
      });

      console.log(response)

      if (!response.ok) {
          throw new Error('No se pudo agregar el artículo');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      throw new Error(`Error al agregar el artículo: ${error.message}`);
  }
};

export const modificarArticulo = async (id, articuloModificado) => {
  try {
    const response = await fetch(`http://localhost:7081/articulos/api/ModificarArticulo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Aquí puedes agregar cualquier otro encabezado necesario, como tokens de autenticación, etc.
      },
      body: JSON.stringify(articuloModificado),
    });

    if (!response.ok) {
      throw new Error('No se pudo modificar el artículo');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al modificar el artículo: ${error.message}`);
  }
};

export const eliminarArticulo = async (id) => {
  try {
    const response = await fetch(`http://localhost:7081/articulos/api/EliminarArticulo/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        // Aquí puedes agregar cualquier otro encabezado necesario, como tokens de autenticación, etc.
      },
    });

    if (!response.ok) {
      throw new Error('No se pudo eliminar el artículo');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al eliminar el artículo: ${error.message}`);
  }
};

export const getProductos = async () => {
  try {
    const response = await fetch('http://localhost:7080/productos/api/ObtenerComposicionProductos', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        // Aquí puedes agregar cualquier otro encabezado necesario, como tokens de autenticación, etc.
      },
    });

    if (!response.ok) {
      throw new Error('No se pudo obtener la lista de productos');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al obtener los productos: ${error.message}`);
  }
};

export const getComposicionProducto = async (id) => {
  try {
    const response = await fetch(`http://localhost:7080/productos/api/ObtenerComposicionProducto/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        // Aquí puedes agregar cualquier otro encabezado necesario, como tokens de autenticación, etc.
      }
    });

    if (!response.ok) {
      throw new Error('No se pudo obtener la lista de productos');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al obtener los productos: ${error.message}`);
  }
};

export const agregarProducto = async (nuevoProducto) => {
  try {
    const response = await fetch('http://localhost:7080/productos/api/AgregarProducto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Aquí puedes agregar cualquier otro encabezado necesario, como tokens de autenticación, etc.
      },
      body: JSON.stringify(nuevoProducto),
    });

    

    if (!response.ok) {
      throw new Error('No se pudo agregar el producto');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al agregar el producto: ${error.message}`);
  }
};

export const modificarProducto = async (id, productoModificado) => {
  try {
    const response = await fetch(`http://localhost:7080/productos/api/ModificarProducto/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Aquí puedes agregar cualquier otro encabezado necesario, como tokens de autenticación, etc.
      },
      body: JSON.stringify(productoModificado),
    });

    

    if (!response.ok) {
      throw new Error('No se pudo modificar el artículo');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al modificar el artículo: ${error.message}`);
  }
};

export const eliminarProducto = async (id) => {
  try {
    const response = await fetch(`http://localhost:7080/productos/api/EliminarProducto/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        // Aquí puedes agregar cualquier otro encabezado necesario, como tokens de autenticación, etc.
      },
    });
  
    if (!response.ok) {
      throw new Error('No se pudo eliminar el producto');
    }
  
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al eliminar producto: ${error.message}`);
  }
  };

export const modificarRelacion = async (relacionModificada) => {
  try {
    const response = await fetch(`http://localhost:7080/productos/api/ModificarRelacion`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Aquí puedes agregar cualquier otro encabezado necesario, como tokens de autenticación, etc.
      },
      body: JSON.stringify(relacionModificada),
    });

    

    if (!response.ok) {
      throw new Error('No se pudo modificar la relación entre los artículos y el producto');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al modificar el artículo: ${error.message}`);
  }
};

export const getCategorias = async () => {
  try {
    const response = await fetch('http://localhost:7082/categorias/api/ObtenerCategorias', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        // Aquí puedes agregar cualquier otro encabezado necesario, como tokens de autenticación, etc.
      },
    });

    if (!response.ok) {
      throw new Error('No se pudo obtener la lista de artículos');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al obtener los artículos: ${error.message}`);
  }
};

export const agregarCategoria = async (categoriaDescripcion) => {
try {
    const response = await fetch(`http://localhost:7082/categorias/api/AgregarCategoria?descripcion=${encodeURIComponent(categoriaDescripcion)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Aquí puedes agregar cualquier otro encabezado necesario, como tokens de autenticación, etc.
        }
    });

    if (!response.ok) {
        throw new Error('No se pudo agregar el artículo');
    }

    const data = await response.json();
    return data;
} catch (error) {
    throw new Error(`Error al agregar el artículo: ${error.message}`);
}
};

export const modificarCategoria = async (id, nuevoNombreCategoria) => {
try {
  
  const response = await fetch(`http://localhost:7082/categorias/api/ModificarCategoria/${id}?descripcion=${encodeURIComponent(nuevoNombreCategoria)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // Aquí puedes agregar cualquier otro encabezado necesario, como tokens de autenticación, etc.
    }
  });

  

  if (!response.ok) {
    throw new Error('No se pudo modificar el artículo');
  }

  const data = await response.json();
  console.log(data);
  return data;
} catch (error) {
  throw new Error(`Error al modificar el artículo: ${error.message}`);
}
};

export const eliminarCategoria = async (id) => {
try {
  const response = await fetch(`http://localhost:7082/categorias/api/EliminarCategoria/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      // Aquí puedes agregar cualquier otro encabezado necesario, como tokens de autenticación, etc.
    },
  });

 

  if (!response.ok) {
    throw new Error('No se pudo eliminar el artículo');
  }

  const data = await response.json();
  return data;
} catch (error) {
  throw new Error(`Error al eliminar el artículo: ${error.message}`);
}
};

export const getUnidades = async () => {
  try {
    const response = await fetch('http://localhost:7083/unidades/api/ObtenerUnidades', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        // Aquí puedes agregar cualquier otro encabezado necesario, como tokens de autenticación, etc.
      },
    });

    if (!response.ok) {
      throw new Error('No se pudo obtener la lista de unidades');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al obtener las unidades: ${error.message}`);
  }
};

export const agregarUnidad = async (nuevaUnidad) => {
try {
    const response = await fetch(`http://localhost:7083/unidades/api/AgregarUnidad?descripcion=${encodeURIComponent(nuevaUnidad)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Aquí puedes agregar cualquier otro encabezado necesario, como tokens de autenticación, etc.
        }
    });

    if (!response.ok) {
        throw new Error('No se pudo agregar la unidad');
    }

    const data = await response.json();
    return data;
} catch (error) {
    throw new Error(`Error al agregar la unidad: ${error.message}`);
}
};

export const modificarUnidad = async (id, nuevoNombreUnidad) => {
try {
  const response = await fetch(`http://localhost:7083/unidades/api/ModificarUnidad/${id}?descripcion=${encodeURIComponent(nuevoNombreUnidad)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // Aquí puedes agregar cualquier otro encabezado necesario, como tokens de autenticación, etc.
    }
  });

  if (!response.ok) {
    throw new Error('No se pudo modificar la unidad')
  }

  const data = await response.json();
  return data;
} catch (error) {
  throw new Error(`Error al modificar la unidad: ${error.message}`);
}
};

export const eliminarUnidad = async (id) => {
  try {
    const response = await fetch(`http://localhost:7083/unidades/api/EliminarUnidad/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        // Aquí puedes agregar cualquier otro encabezado necesario, como tokens de autenticación, etc.
      },
    });
  
  
  
    if (!response.ok) {
      throw new Error('No se pudo eliminar la unidad');
    }
  
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al eliminar la unidad: ${error.message}`);
  }
  };
