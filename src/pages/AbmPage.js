import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { APIPrivate } from "../utils/constants";
import { openToaster } from "../redux/hooks/toaster";
import { closeLoading, openLoading } from "../redux/hooks/loading";
import StaffPage from "./StaffPage";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { validate } from "../utils/functions";

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1em',
        marginTop: '2em'
    },
    root: {
        width: '50vw',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 10px 10px 10px',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75em'
    },
    child: {},
}));

const requiredfields = {
    staff: [
        {name: 'name', caption: 'Nombre'} ,
        {name: 'lastname', caption: 'Apellido'} ,
        {name: 'email', caption: 'Email'} ,
        {name: 'role', caption: 'Rol'} ,
        {name: 'description', caption: 'Descripcion'} ,
        {name: 'image', caption: 'Imagen'},
    ],
}

function AbmPage(props) {
    const classes = useStyles();
    const loaded = useRef(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [body, setBody] = useState(undefined);

    const createBody = (abm, fields) => {
        let newBody = {};
        if (Array.isArray(fields[abm]) && fields[abm].length > 0) {
            fields[abm].forEach(field => {
                newBody[field.name] = "";
            })
        }
        return newBody;
    }

    useEffect(() => {
        if (props.abm) {
            const defaultBody = createBody(props.abm, requiredfields);
            setBody(defaultBody);
        }
    },[props])

    useEffect(() => {
        if (reload) {
            setReload(false);
            loaded.current = false;
            setLoading(true);
        }
        if (loaded.current) return;
        loaded.current = true;
        setLoading(true);
        axios.get(`${APIPrivate}/${props.abm}`)
        .then(res => {
            setItems(res?.data || []);
            setLoading(false);
        })
        .catch(err => {
            console.error(err)
            setLoading(false);
            openToaster({message: "Error al obtener elementos", type: "error"});
        });
    }, [props, reload]);

    useEffect(() => {
        if (loading) {
            openLoading({message: 'Cargando elementos, espere por favor...'});
        } else {
            closeLoading();
        }
    }, [loading])

    const onDelete = (id) => {
        openLoading({message: 'Eliminando elemento, espere por favor...'});
        axios.delete(`${APIPrivate}/${props.abm}/${id}`)
        .then(res => {
            if (res.status === 204) {
                openToaster({message: "Elemento eliminado", type: "success"});
                setReload(true);
                closeLoading();
            }
        })
        .catch(err => {
            console.error(err)
            openToaster({message: "Error al eliminar elemento", type: "error"});
            closeLoading();
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = validate([body], requiredfields);
        if (!isValid) {
            openToaster({
                message: `Error, revise los campos requeridos de ${props.abm}: ${requiredfields.join(', ')}`, 
                type: "error"
            });
            return;
        }
        openLoading({message: 'Creando elemento, espere por favor...'});
        axios.post(`${APIPrivate}/${props.abm}`, body)
        .then(res => {
            if (res.status === 204) {
                openToaster({message: "Elemento creado", type: "success"});
                setReload(true);
                closeLoading();
            }
        })
        .catch(err => {
            console.error(err)
            openToaster({message: "Error al crear elemento", type: "error"});
            closeLoading();
        })
    }

    const onUpdate = (e, id) => {
        e.preventDefault();
        const isValid = validate([body], requiredfields);
        if (!isValid) {
            openToaster({
                message: `Error, revise los campos requeridos de ${props.abm}: ${requiredfields.join(', ')}`, 
                type: "error"
            });
            return;
        }
        openLoading({message: 'Actualizando elemento, espere por favor...'});
        axios.put(`${APIPrivate}/${props.abm}/${id}`, body)
        .then(res => {
            if (res.status === 204) {
                openToaster({message: "Elemento actualizado", type: "success"});
                setReload(true);
                closeLoading();
            }
        })
        .catch(err => {
            console.error(err)
            openToaster({message: "Error al atualizar elemento", type: "error"});
            closeLoading();
        })
    }

    const onChangeValue = (key, value) => setBody({...body, [key]: value});

    return (
        <main className={classes.main}>
            {body && props.abm &&
            <Paper>
                <form className={classes.root}>
                    <Typography gutterBottom variant="h5">
                        {props?.abm[0].toUpperCase() + props?.abm.slice(1) || ""}
                    </Typography>
                    {Array.isArray(requiredfields[props.abm]) && requiredfields[props.abm].length > 0 &&
                        requiredfields[props.abm].map((item, index) => (
                            <TextField
                                fullWidth
                                className={classes.child}
                                key={index}
                                type={"text"}
                                label={item.caption}
                                variant="outlined"
                                onChange={e => onChangeValue(item.name, e.target.value)}
                            />
                        ))
                    }
                    <Button type="submit" variant="contained" color="primary" onClick={onSubmit}>Enviar</Button>
                </form>
            </Paper>
            }
            {items && items.length > 0 && <StaffPage items={items} onDelete={onDelete} onUpdate={onUpdate} />}
        </main>
    );
}

export default AbmPage;
