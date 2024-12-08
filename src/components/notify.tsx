import { enqueueSnackbar } from 'notistack';

export function notify(message: string | undefined, type: string = 'error') {
    console.log(message,"message");
    
    enqueueSnackbar(message, {
        variant: type,
        anchorOrigin: {
            vertical: "top",
            horizontal: "right",
        },
    });
}
