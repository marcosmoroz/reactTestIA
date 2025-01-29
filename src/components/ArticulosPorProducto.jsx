import { DataGrid } from "@mui/x-data-grid";
import { propsDataGrid } from "../local-string";

const ArticulosPorProducto = ({articulosSeleccionados, articulosConCantidad, setArticulosConCantidad, setArticulosSeleccionados}) => {
    const columns = [
        { field: "id", headerName: "ID", headerClassName: 'header-data-grid', cellClassName: "cell-data-grid" },
        {
            field: "articulo_descripcion",
            headerName: "Descripción",
            flex: 1,
            cellClassName: "name-column--cell",
            headerClassName: 'header-data-grid',
            cellClassName: "cell-data-grid",
        },
        {
            field: "unidad",
            headerName: "Unidad",
            headerClassName: 'header-data-grid',
            type: "text",
            headerAlign: "left",
            align: "left",
            cellClassName: "cell-data-grid",
            headerClassName: 'header-data-grid',
            valueGetter: (params) => params.row.unidad?.unidad_descripcion || "Sin unidad",
            flex: 1,
            cellClassName: "cell-data-grid",
        },
        {
            field: "precioUnitario",
            headerClassName: 'header-data-grid',
            headerName: "Precio Unitario",
            flex: 1,
            cellClassName: "cell-data-grid",
        },
        {
            field: "cantidad",
            headerClassName: 'header-data-grid',
            headerName: "Cantidad",
            flex: 1,
            cellClassName: "cell-data-grid",
            editable: true
        }
    ];

    const handleProcessRowUpdateError = (error) => {
        console.error(error)
    }

    return (
        <>
            <DataGrid
                style={{maxHeight: '400px'}}
                editMode="row"
                rowSelectionModel={articulosSeleccionados}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    //console.log(newRowSelectionModel)
                    // Actualizar `articulosSeleccionados` con los IDs de los artículos seleccionados
                    setArticulosSeleccionados(newRowSelectionModel);
                }}
                checkboxSelection rows={articulosConCantidad} columns={columns}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                processRowUpdate={(updatedRow) => {
                    // Parseamos la cantidad a entero
                    updatedRow.cantidad = parseInt(updatedRow.cantidad);

                    // Encontramos el índice del artículo actualizado en el estado articulosConCantidad
                    const updatedIndex = articulosConCantidad.findIndex(row => row.id === updatedRow.id);
                    if (updatedIndex !== -1) {
                        // Si encontramos el artículo en el estado, actualizamos su cantidad
                        const newArticulosConCantidad = [...articulosConCantidad];
                        newArticulosConCantidad[updatedIndex].cantidad = updatedRow.cantidad;
                        setArticulosConCantidad(newArticulosConCantidad);
                    }

                    // Devolvemos la fila actualizada
                    return updatedRow;
                }
                }
                localeText={propsDataGrid}
            />
    </>
  );
};

export default ArticulosPorProducto;