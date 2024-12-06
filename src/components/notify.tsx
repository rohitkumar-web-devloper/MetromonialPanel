import { enqueueSnackbar } from 'notistack';

export function notify(message: string | undefined, type: string = 'error') {
    enqueueSnackbar(message, {
        variant: type,
        anchorOrigin: {
            vertical: "top",
            horizontal: "right",
        },
    });
}
