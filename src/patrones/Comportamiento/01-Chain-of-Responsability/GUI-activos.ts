interface ComponentWithContextualHelp {
    setNext(handler: ComponentWithContextualHelp): void;
    showHelp(): void;
}

class Container implements ComponentWithContextualHelp {
    private children: ComponentWithContextualHelp[] = [];
    private tooltipText: string | null = null;
    private nextHandler: ComponentWithContextualHelp | null = null;

    constructor(tooltipText: string | null) {
        this.tooltipText = tooltipText;
    }

    add(child: ComponentWithContextualHelp): void {
        this.children.push(child);
    }

    setNext(handler: ComponentWithContextualHelp): void {
        this.nextHandler = handler;
    }

    showHelp(): void {
        if (this.tooltipText) {
            console.log(this.tooltipText); // Mostrar descripción
        } else {
            for (const child of this.children) {
                child.showHelp(); // Intentar mostrar ayuda de los hijos
            }
        }

        // Si no hay ayuda disponible, pasar la responsabilidad al siguiente
        if (!this.tooltipText && this.nextHandler) {
            this.nextHandler.showHelp();
        }
    }
}

class Button implements ComponentWithContextualHelp {
    private container: Container;
    private tooltipText: string | null;
    private nextHandler: ComponentWithContextualHelp | null = null;

    constructor(container: Container, tooltipText: string | null) {
        this.container = container;
        this.tooltipText = tooltipText;
        this.container.add(this);
    }

    setNext(handler: ComponentWithContextualHelp): void {
        this.nextHandler = handler;
    }

    showHelp(): void {
        if (this.tooltipText) {
            console.log(this.tooltipText); // Mostrar descripción
        } else if (this.nextHandler) {
            this.nextHandler.showHelp(); // Pasar la responsabilidad
        }
    }
}

class Panel implements ComponentWithContextualHelp {
    private modalHelpText: string | null;
    private nextHandler: ComponentWithContextualHelp | null = null;

    constructor(modalHelpText: string | null) {
        this.modalHelpText = modalHelpText;
    }

    setNext(handler: ComponentWithContextualHelp): void {
        this.nextHandler = handler;
    }

    showHelp(): void {
        if (this.modalHelpText) {
            console.log(this.modalHelpText); // Mostrar ayuda modal
        } else if (this.nextHandler) {
            this.nextHandler.showHelp(); // Pasar la responsabilidad
        }
    }
}

class Dialog_GUI implements ComponentWithContextualHelp {
    private wikiPageURL: string | null;
    private nextHandler: ComponentWithContextualHelp | null = null;

    constructor(wikiPageURL: string | null) {
        this.wikiPageURL = wikiPageURL;
    }

    setNext(handler: ComponentWithContextualHelp): void {
        this.nextHandler = handler;
    }

    showHelp(): void {
        if (this.wikiPageURL) {
            console.log(`Abriendo página wiki: ${this.wikiPageURL}`); // Abrir página wiki
        } else if (this.nextHandler) {
            this.nextHandler.showHelp(); // Pasar la responsabilidad
        }
    }
}


// Crear instancias de los componentes
const container = new Container(null);
const button = new Button(container, null); // Botón sin tooltip
const panel = new Panel("Ayuda del panel"); // Panel con ayuda
const dialog = new Dialog_GUI(null); // Diálogo sin URL

// Establecer la cadena de responsabilidad
button.setNext(panel);
panel.setNext(dialog);

// Agregar el botón al contenedor
container.add(button);

// Llamar al método showHelp en el botón
container.showHelp();