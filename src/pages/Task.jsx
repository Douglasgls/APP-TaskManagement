import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AlertDialogSlide from "../components/DialogDeleteTask"
import AlertDialogSlideUpdate from '../components/DialogUpdateTask';
import AlertCreateTask from '../components/DialogCreatedTask';
import api from '../axiosConfig'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import AlertNotify from '../components/alertNotify';

export default function Task() {
    const { handleLoading } = useOutletContext();
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openCreate, setOpenCreate] = React.useState(false);
    const [openNotify, setOpenNotify] = React.useState(false);
    const [alertConfig, setAlertConfig] = React.useState({
        message: '',
        severity: '',
    })

    const [id, setId] = React.useState('');
    const [rows, setRows] = React.useState([]);

    const [currentRow, setCurrentRow] = React.useState(
        {
            id: '',
            title: '',
            description: '',
            state: '',
        }
    );

    const handleClickCreate = (id) => {
        setId(id);
        setOpenCreate(true);
    }

    const handleCloseCreate = () => {
        setOpenCreate(false);
    }

    const handleClickUpdate = (row) => {
        setId(row.id);
        setOpenUpdate(true);
        setCurrentRow(row);
    }

    const handleCloseUpdate = () => {
        setOpenUpdate(false);
        setCurrentRow(null);
    }

    const handleClickDelete = (id) => {
        setId(id);
        setOpenDelete(true);
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);
    }

    const handleSubmitList = async () => {
        console.log('entrou');
        try {
          handleLoading(true);
          const response = await api.get('/todos', {
            headers: {
              'Accept': 'application/json',
            }
          });
          if (response.status === 200) {
            setRows(response.data.todos);
          }
          
          setAlertConfig({
            message: 'Tarefas carregadas com sucesso',
            severity: 'success',
          })
          setOpenNotify(true);
        } catch (error) {
          console.log(error);
          setAlertConfig({
            message: error.response.data.detail + '. status: ' + error.response.status || 'Erro ao carregar as tarefas',
            severity: 'error',
          });
          setOpenNotify(true);
        } finally {
            setTimeout(() => {
                handleLoading(false);
            }, 1400);
        }
    };

    React.useEffect(() => {
    handleSubmitList();
    }, []);
    
    return (
        <div className="flex flex-col justify-center items-center p-4">
            <div className="relative w-full flex justify-between items-center mb-4">
                <Button 
                    sx={{ 
                        position: 'relative', 
                        marginLeft: '20px',
                        marginRight: 'auto',
                        bottom: 'unset'
                    }} 
                    variant="outlined" 
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => handleClickCreate()}
                >
                    Adicionar Tarefa
                </Button>
                <AlertCreateTask open={openCreate} onClose={handleCloseCreate} id={id} handleSubmitList={handleSubmitList} />
            </div>
    
            <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }} >
                <Table sx={{ minWidth: 650 }} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'gray' }} align="center">ID</TableCell>
                            <TableCell sx={{ color: 'gray' }} align="center">Título</TableCell>
                            <TableCell sx={{ color: 'gray' }} align="center">Descrição</TableCell>
                            <TableCell sx={{ color: 'gray' }} align="center">Status</TableCell>
                            <TableCell sx={{ color: 'gray' }} align="center">Data Início</TableCell>
                            <TableCell sx={{ color: 'gray' }} align="center">Ação</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    Nenhuma tarefa encontrada
                                </TableCell>
                            </TableRow>
                        )}
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell sx={{ color: 'white' }} align="center">{row.id}</TableCell>
                                <TableCell sx={{ color: 'white' }} align="center">{row.title}</TableCell>
                                <TableCell sx={{ color: 'white' }} align="center">{row.description}</TableCell>
                                <TableCell sx={{ color: 'white' }} align="center">{row.state}</TableCell>
                                <TableCell sx={{ color: 'white' }} align="center">{(new Date(row.created_at)).toDateString()}</TableCell>
                                <TableCell sx={{ color: 'white' }} align="center">
                                    <div className='flex gap-1 justify-center'>
                                        <Stack>
                                            <IconButton aria-label="edit" size="small" onClick={() => handleClickUpdate(row)}>
                                                <EditNoteIcon />
                                            </IconButton>
                                            <AlertDialogSlideUpdate 
                                                open={openUpdate}
                                                onClose={handleCloseUpdate}
                                                id={id}
                                                getData={currentRow}
                                                handleSubmitList={handleSubmitList}
                                            />
                                        </Stack>
                                        <Stack>
                                            <IconButton aria-label="delete" size="small" onClick={() => handleClickDelete(row.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <AlertDialogSlide open={openDelete} onClose={handleCloseDelete} id={id} handleSubmitList={handleSubmitList} />
                                        </Stack>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AlertNotify open={openNotify} handleClose={setOpenNotify} config={alertConfig}/>
        </div>
    );
}

