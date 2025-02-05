interface Button{
    render():string;
    onClick(mensaje: string):string;
}


class WindowsButton implements Button{
    render():string{
        return 'Method render in WindowsButton';
    }
    onClick(mensaje: string):string{
        console.log('Mensaje recibido: ', mensaje);
        return 'Method OnClik in WindowsButton';
    }
}

class HTMLButton implements Button{
    render():string{
        return 'Method render in HTMLButton';
    }
    onClick(mensaje: string):string{
        console.log('Mensaje recibido: ', mensaje);
        return 'Method OnClik in HTMLButton';
    }
}


abstract class Dialog{
    
    public render(): void {
        const okButton = this.createButton();
        console.log(okButton.onClick('Dialog Closed'));
        console.log(okButton.render());
    }
    abstract createButton():Button;
}

class WindowsDialog extends Dialog{
    createButton():Button{
        return new WindowsButton();
    }
}

class HTMLDialog extends Dialog{
    createButton():Button{
        return new HTMLButton();
    }
}

function ClientCode(dialog: Dialog){
    console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
    dialog.render(); // call someOperation()
}


console.log('App: Launched with the WindowsDialog.');
ClientCode(new WindowsDialog());
console.log('');

console.log('App: Launched with the WebDialog.');
ClientCode(new HTMLDialog());
console.log('');