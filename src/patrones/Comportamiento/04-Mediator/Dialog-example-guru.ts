interface Mediator_Dialog {
    notify(sender: Componente_Dialog, event: string): void;
}

class AuthenticationDialog implements Mediator_Dialog {
    private loginorRegister: Checkbox_Dialog;
    private loginUsername: Textbox_Dialog;
    private ok: Button_Dialog;

    constructor(c1: Button_Dialog, c2: Checkbox_Dialog, c3: Textbox_Dialog) {
        this.loginorRegister = c2;
        this.loginorRegister.setMediator(this);
        this.loginUsername = c3;
        this.loginUsername.setMediator(this);
        this.ok = c1;
        this.ok.setMediator(this);
    }

    notify(sender: Componente_Dialog, event: string): void {
        if (sender === this.loginUsername && event === 'keypress') {
            console.log('loginUsername keypress');
            // Realiza alguna acción específica para el evento keypress
        }
        if (sender === this.loginorRegister && event === 'check') {
            console.log('loginorRegister check');
            // Realiza alguna acción específica para el evento check
        }
        if (sender === this.ok && event === 'click') {
            console.log('ok click');
            // Realiza alguna acción específica para el evento click
        }
    }
}

class Componente_Dialog {
    protected dialog: Mediator_Dialog;

    constructor(mediator?: Mediator_Dialog) {
        this.dialog = mediator!;
    }

    public setMediator(mediator: Mediator_Dialog): void {
        this.dialog = mediator;
    }
}

class Checkbox_Dialog extends Componente_Dialog {
    check(): void {
        console.log('Checkbox check');
        this.dialog.notify(this, 'check');
    }
}

class Button_Dialog extends Componente_Dialog {
    click(): void {
        console.log('Button click');
        this.dialog.notify(this, 'click');
    }
}

class Textbox_Dialog extends Componente_Dialog {
    keypress(): void {
        console.log('Textbox keypress');
        this.dialog.notify(this, 'keypress');
    }
}

// Ejemplo de uso
const checkbox = new Checkbox_Dialog();
const button_di = new Button_Dialog();
const textbox = new Textbox_Dialog();

const dialog_ex = new AuthenticationDialog(button_di, checkbox, textbox);

// Simular eventos
textbox.keypress();
checkbox.check();
button_di.click();