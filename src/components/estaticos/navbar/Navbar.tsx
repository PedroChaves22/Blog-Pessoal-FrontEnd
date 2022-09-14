import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Box } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { TokenState } from '../../../store/tokens/actions';
import { addToken } from '../../../store/tokens/tokensReducer';
import {toast} from 'react-toastify';

import './Navbar.css'

function Navbar() {

  let navigate = useNavigate()

  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  )

  const dispatch = useDispatch()

  function goLogout() {
    dispatch(addToken(''))
    toast.info('Usuário deslogado', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: 'colored',
      progress: undefined,
    })
    navigate('/login')
  }

  var navBarComponent;

  if (token !== '') {
    navBarComponent =
      <AppBar position="static" className="appBar">
        <Toolbar variant="dense">

        <Box mx={1} className='cursor'>
                <Typography variant="h6" color="inherit">
                <img src="https://logodetimes.com/times/sao-paulo/logo-sao-paulo-1024.png" alt="" width="50px" height="50px" />
                </Typography>
              </Box>

          <Box className='bg' >
            <Typography variant="h5" color="inherit">
              Blog Pessoal
            </Typography>
          </Box>
          <Box display="flex" justifyContent="start">
            <Link to='/home' className='text-decorator-none'>
              <Box mx={1} className='cursor'>
                <Typography variant="h6" color="inherit">
                  Home
                </Typography>
              </Box>
            </Link>
            <Link to={"/posts"} className='text-decorator-none'>
              <Box mx={1} className='cursor'>
                <Typography variant="h6" color="inherit">
                  Postagens
                </Typography>
              </Box>
            </Link>
            <Link to={"/temas"} className='text-decorator-none'>
              <Box mx={1} className='cursor'>
                <Typography variant="h6" color="inherit">
                  Temas
                </Typography>
              </Box>
            </Link>
            <Link to={"/formularioTema"} className='text-decorator-none'>
              <Box mx={1} className='cursor'>
                <Typography variant="h6" color="inherit">
                  Cadastrar Tema
                </Typography>
              </Box>
            </Link>

            <Box mx={1} className='cursor' onClick={goLogout}>
              <Typography variant="h6" color="inherit">
                Logout
              </Typography>
            </Box>

          </Box>
        </Toolbar>
      </AppBar>
  }


  return (
    <>
      {navBarComponent}
    </>
  )
}

export default Navbar