import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import api from '../axiosConfig'
import Grid from '@mui/material/Grid2';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

const TaskCard = ({ id, title, description, status, created_at, setOpenDialog, setSelectedTask, showFullDescription,getShortDescription  }) => (
    <React.Fragment>
    <div>
    <Card 
        variant='outlined' 
        sx={{
            backgroundColor: 
                status === 'draft' ? '#708090' : // Cor cinza claro para "draft"
                status === 'todo' ? '#4682B4' : // Cor azul clara para "todo"
                status === 'doing' ? '#FF7F50' : // Cor laranja clara para "doing"
                status === 'done' ? '#008000' : // Cor verde clara para "done"
                status === 'trash' ? '#8B0000' : // Cor vermelha clara para "trash"
                '#ffffff', 
            borderColor: 
                status === 'draft' ? '#bdbdbd' : 
                status === 'todo' ? '#90caf9' : 
                status === 'doing' ? '#ffb74d' : 
                status === 'done' ? '#66bb6a' : 
                status === 'trash' ? '#ef5350' : 
                '#e0e0e0',
            maxWidth: '100%',
            minWidth: '100%',
        }}
        >
      <CardContent>
        <div className='flex justify-between'>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14,marginLeft:2.4 }}>
           ID:{id}
        </Typography>
        </div>
        <Divider />
        <div className='flex mt-4 mb-2'>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {showFullDescription ? description : getShortDescription(description)}
        </Typography>
        </div>
 
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {new Date(created_at).toLocaleString()}
        </Typography>

      </CardContent>    
      <CardActions sx={{ justifyContent: 'flex-end', display: 'flex', }}>
        <Button size="small" onClick={() => {
          setSelectedTask({ id, title, description, status, created_at });
          setOpenDialog(true);
        }}>Open</Button>
      </CardActions>
    </Card>
    </div>
    </React.Fragment>
)

const TaskCardDialog = (selectedTask, openDialog, setOpenDialog) => (
    <React.Fragment>
    <div className='hover:cursor-pointer'>
    <Dialog 
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md" 
        fullWidth
        PaperProps={{
            sx: {
                borderRadius: 3,
                boxShadow: 5, 
                bgcolor: 'darkslategrey',
            }
        }}
        >
        {selectedTask && (
            <>
        <div>
        <DialogTitle 
        sx={{ 
            textAlign: 'center',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent:'space-between'
            }}>
            <div className='text-lg flex justify-between w-full'>
            <Typography variant='h5' sx={{ color: 'white' }}>
                {selectedTask.title}
            </Typography> 
            <Typography variant='caption' sx={{ color: 'text.secondary' }}>id: <span className='text-sm'>{selectedTask.id}</span></Typography>
            </div> 
        </DialogTitle>
        <Divider />
        </div>
        <DialogContent>
                <div className='w-full'>

                <TextareaAutosize
                    className="text-sm w-full font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md bg-zinc-800"
                    value={selectedTask.description}
                    disabled
                    aria-label="Demo input"
                    placeholder="Empty"
                    minRows={2}
                />
                </div>
                
            <div className='mt-4 text-gray-300 columns-4 justify-between '>
                <Typography variant="body2">
                    Status: <Chip 
                        label={selectedTask.status} 
                        variant='outlined' 
                        size='small'
                        color={
                            selectedTask.status === 'draft' ? 'default' :
                            selectedTask.status === 'todo' ? 'info' :
                            selectedTask.status === 'doing' ? 'warning' :
                            selectedTask.status === 'done' ? 'success' :
                            selectedTask.status === 'trash' ? 'error' :
                            'default'
                        } />
                        
                </Typography>
            </div>
            <div className='mt-4 text-gray-300  '>
                <Typography variant="body2">
                    created_at: {new Date(selectedTask.created_at).toLocaleString()}
                </Typography>
            </div>
        </DialogContent>
        <DialogActions>
            <Button
            onClick={() => setOpenDialog(false)}
            sx={{ 
                textTransform: 'none', 
                fontWeight: 'bold', 
                px: 4,
                py: 1,
                borderRadius: 3,
                color: 'white',
            }}
                
            >Close</Button>
        </DialogActions>
            </>
        )}
    </Dialog>
    </div>
    </React.Fragment>
)

const TaskWell = () => {
    const [configs, setConfigs] = React.useState([]);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedTask, setSelectedTask] = React.useState(null);
    const [showFullDescription, setShowFullDescription] = React.useState(false);

    const getShortDescription = (description) => {
        if (description.length <= 25) {
            return description;
        } else {
            return description.slice(0, 25) + '...';
        }
    };
    
    React.useEffect(() => {
      (async () => {
        const response = await api.get('/todos');
        if (response.status === 200) {
          setConfigs(response.data.todos);
        }
      })();
    }, []);

    return (
        <div className='flex m-20 w-full' >
            <Box sx={{ minWidth: '100%' }}>
                {configs.length === 0 && (
                    <h1 className='text-6xl '>Tasks not found </h1>
                )}
                <Grid container spacing={4}>
                    {configs.map((config) => (
                    <Grid item key={config.id} sx={{ minWidth: '19%' }}>
                        <TaskCard
                            key={config.id}
                            id={config.id}
                            title={config.title}
                            description={config.description}
                            status={config.state}
                            created_at={config.created_at}
                            setOpenDialog={setOpenDialog}
                            setSelectedTask={setSelectedTask}
                            showFullDescription={showFullDescription}
                            getShortDescription={getShortDescription}

                        />
                    </Grid>
                    ))}
                </Grid>
                {openDialog && (TaskCardDialog(selectedTask, openDialog, setOpenDialog))}
            </Box>
        </div>
    );
  };
  
  export default TaskWell;