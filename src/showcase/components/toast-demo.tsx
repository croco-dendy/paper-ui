import { Button } from '../../components/button';
import { ToastProvider, useToast } from '../../components/toast';

interface ToastButtonsProps {
  surface: 'paper' | 'chalkboard';
}

function ToastButtons({ surface }: ToastButtonsProps) {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="secondary"
        surface={surface}
        onClick={() => toast({ variant: 'info', title: 'Tip', description: 'Autosave is on.' })}
      >
        Info
      </Button>
      <Button
        variant="secondary"
        surface={surface}
        onClick={() =>
          toast({ variant: 'success', title: 'Published', description: 'Your article is live.' })
        }
      >
        Success
      </Button>
      <Button
        variant="secondary"
        surface={surface}
        onClick={() =>
          toast({ variant: 'warning', title: 'Draft', description: 'Not reviewed yet.' })
        }
      >
        Warning
      </Button>
      <Button
        variant="secondary"
        surface={surface}
        onClick={() =>
          toast({ variant: 'error', title: 'Failed', description: 'Could not save changes.' })
        }
      >
        Error
      </Button>
    </div>
  );
}

export interface ToastDemoProps {
  surface: 'paper' | 'chalkboard';
}

export function ToastDemo({ surface }: ToastDemoProps) {
  return (
    <ToastProvider position="bottom-right" surface={surface}>
      <ToastButtons surface={surface} />
    </ToastProvider>
  );
}
