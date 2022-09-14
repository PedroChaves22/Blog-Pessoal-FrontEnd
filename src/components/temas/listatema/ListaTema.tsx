import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core'
import { Box } from '@mui/material'
import './ListaTema.css'
import { busca } from '../../../services/Service'
import Tema from '../../../models/Tema'
import { useSelector } from 'react-redux'
import { TokenState } from '../../../store/tokens/actions'
import {toast} from 'react-toastify'


function ListaTema() {

    const [temas, setTemas] = useState<Tema[]>([])
    let navigate = useNavigate()

    const token = useSelector<TokenState, TokenState['tokens']>(
        (state) => state.tokens
      )

    useEffect(() => {
        if (token === '') {
            toast.error('Você precisa estar logado', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: 'colored',
                progress: undefined,
              })
            navigate("/login")
        }
    }, [token])

    async function getTemas() {
        await busca("/temas", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {
        getTemas()
    }, [temas.length])


    return (
        <>
            {
                temas.map(tema => (
                    <Box m={2} key={tema.id}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Tema
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {tema.descricao}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Box display="flex" justifyContent="center" mb={1.5} >
                                    <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
                                        <Box mx={1}>
                                            <Button variant="contained" className="bt" size='small' color="primary">
                                                atualizar
                                            </Button>
                                        </Box>
                                    </Link>
                                    <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
                                        <Box mx={1}>
                                            <Button className="bt2" variant="contained" size='small' color="secondary">
                                                deletar
                                            </Button>
                                        </Box>
                                    </Link>
                                </Box>
                            </CardActions>
                        </Card>
                    </Box>
                ))
            }
        </>
    );

}
export default ListaTema;