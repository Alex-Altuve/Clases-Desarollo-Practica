// Interfaz Command
interface Command {
    execute(): void;
    undo(): void;
}

// Clase Editor (Receiver)
class Editor {
    private text: string = '';

    getText(): string {
        return this.text;
    }

    deleteSelection(selection: string): void {
        this.text = this.text.replace(selection, '');
    }

    replaceSelection(newText: string): void {
        this.text += newText;
    }

    setText(text: string): void {
        this.text = text;
    }
}

// Comando para copiar texto
class CopyCommand implements Command {
    private editor: Editor;
    private backup: string;

    constructor(editor: Editor) {
        this.editor = editor;
        this.backup = editor.getText();
    }

    execute(): void {
        console.log("Texto copiado:", this.backup);
    }

    undo(): void {
        console.log("Restaurar texto a:", this.backup);
        this.editor.setText(this.backup);
    }
}

// Comando para cortar texto
class CutCommand implements Command {
    private editor: Editor;
    private backup: string;
    private selection: string;

    constructor(editor: Editor, selection: string) {
        this.editor = editor;
        this.selection = selection;
        this.backup = editor.getText();
    }

    execute(): void {
        this.editor.deleteSelection(this.selection);
        console.log("Texto cortado:", this.selection);
    }

    undo(): void {
        console.log("Restaurar texto:", this.selection);
        this.editor.replaceSelection(this.selection);
    }
}

// Comando para pegar texto
class PasteCommand implements Command {
    private editor: Editor;
    private text: string;

    constructor(editor: Editor, text: string) {
        this.editor = editor;
        this.text = text;
    }

    execute(): void {
        this.editor.replaceSelection(this.text);
        console.log("Texto pegado:", this.text);
    }

    undo(): void {
        console.log("Deshacer pega de:", this.text);
        this.editor.deleteSelection(this.text);
    }
}

// Clase para manejar el historial de comandos
class Command_History {
    private commands: Command[] = [];

    push(command: Command): void {
        this.commands.push(command);
    }

    pop(): Command | null {
        return this.commands.pop() || null;
    }
}

// Clase Application
class Layer_Application {
    private editor: Editor;
    private history: Command_History;

    constructor() {
        this.editor = new Editor();
        this.history = new Command_History();
    }

    createUI(): void {
        // Simulación de botones
        const copyButton = new CopyCommand(this.editor);
        const cutButton = new CutCommand(this.editor, "texto a cortar");
        const pasteButton = new PasteCommand(this.editor, "texto pegado");

        // Ejecutar comandos
        copyButton.execute();
        this.history.push(copyButton);

        cutButton.execute();
        this.history.push(cutButton);

        pasteButton.execute();
        this.history.push(pasteButton);

        // Deshacer último comando
        const lastCommand = this.history.pop();
        if (lastCommand) {
            lastCommand.undo();
        }
    }
}

// Uso del patrón Command
const app_v1 = new Layer_Application();
app_v1.createUI();