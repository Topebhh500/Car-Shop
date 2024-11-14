import { useState, useEffect } from "react";
import { fetchCars, deleteCar } from "../carapi";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import AddCar from "./AddCar";
import EditCar from "./EditCar";

function CarList() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [carToEdit, setCarToEdit] = useState(null);
    
    const [colDefs] = useState([
        { field: "brand", filter: true, sortable: true, flex: 1.5 },
        { field: "model", filter: true, sortable: true, flex: 1 },
        { field: "color", filter: true, sortable: true, flex: 1 },
        { field: "fuel", filter: true, sortable: true, flex: 1 },
        { field: "modelYear", filter: true, sortable: true, flex: 1 },
        { field: "price", filter: true, sortable: true, flex: 1,
          valueFormatter: params => `${params.value}€` },
        {
            headerName: 'Actions',
            flex: 1.5,
            cellRenderer: params => (
                <div>
                    <Button
                        variant="outlined" 
                        color="primary"
                        size="small"
                        onClick={() => setCarToEdit(params.data)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined" 
                        color="error"
                        size="small"
                        onClick={() => handleDelete(params.data._links.self.href)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        }
    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchCars()
            .then(data => setCars(data._embedded.cars))
            .catch(err => {
                console.error(err);
                setMsg('Error fetching cars');
                setOpen(true);
            });
    };

    const handleDelete = (url) => {
        if (window.confirm("Are you sure you want to delete this car?")) {
            deleteCar(url)
                .then(() => {
                    handleFetch();
                    setMsg('Car deleted successfully');
                    setOpen(true);
                })
                .catch(err => {
                    console.error(err);
                    setMsg('Error deleting car');
                    setOpen(true);
                });
        }
    };

    return (
        <>
            <AddCar handleFetch={handleFetch} />
            {carToEdit && (
                <EditCar
                    car={carToEdit}
                    handleFetch={handleFetch}
                    onClose={() => setCarToEdit(null)}
                />
            )}
            <div
                className="ag-theme-material"
                style={{ height: 600, width: '100%', marginTop: 20 }}
            >
                <AgGridReact
                    rowData={cars}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={10}
                    animateRows={true}
                    suppressCellFocus={true}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={msg}
            />
        </>
    );
}

export default CarList;